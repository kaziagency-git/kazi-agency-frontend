import 'server-only';
import { Types } from 'mongoose';
import {
  AccCategory,
  AccClientProfile,
  AccDomain,
  AccHosting,
  AccInvoice,
  AccNotificationLog,
  AccSubscription,
  AccTransaction,
} from '../../models/accounting';
import {
  AccAlertKind,
  AccNotificationChannel,
  AccNotificationRefCollection,
  accAlertType,
} from '@/lib/accounting/constants';
import { addDays, daysUntil, daysUntilInZone, toYmdNY } from '@/lib/accounting/date';
import { getAlertSettings } from '@/lib/accounting/settings';
import { toCents } from '@/lib/accounting/money';
import { isDuplicateKeyError } from '@/lib/accounting/api-route';
import { HttpError } from '@/lib/server/http';
import {
  DomainVerifyInput,
  GhlInvoiceInput,
  GhlPaymentInput,
  NotificationLogInput,
  TelegramExpenseInput,
} from '../../schemas/accounting/acc-integration.schema';

/** Case-insensitive lookup so "client payment" and "Client Payment" match. */
const CI = { locale: 'en', strength: 2 } as const;

// ── GHL payment ────────────────────────────────────────────────────────────

export interface GhlPaymentResult {
  status: 'processed' | 'already_processed';
  transactionId: string;
  invoiceId: string | null;
  clientId: string | null;
  clientMatched: boolean;
  /** Set when the payment could not be tied to a client — needs manual review. */
  warning?: string;
}

/**
 * Records a GoHighLevel payment.
 *
 * Idempotent on `ghlPaymentId`: the unique partial index on
 * `acc_transactions.externalId` is the source of truth, so a webhook retry —
 * even one racing the original — resolves to `already_processed` rather than a
 * second entry in the books.
 */
export async function recordGhlPayment(input: GhlPaymentInput): Promise<GhlPaymentResult> {
  const existing = await AccTransaction.findOne({ externalId: input.ghlPaymentId }).lean();
  if (existing) {
    return {
      status: 'already_processed',
      transactionId: existing._id.toString(),
      invoiceId: existing.invoiceId ? existing.invoiceId.toString() : null,
      clientId: existing.clientId ? existing.clientId.toString() : null,
      clientMatched: existing.clientId !== null,
    };
  }

  const amountCents = toCents(input.amount);
  if (amountCents <= 0) throw new HttpError('amount must be greater than zero', 400);

  const paidAt = input.paidAt ?? new Date();

  // Resolve the client through the billing profile's GHL contact id — the
  // existing Client collection has no GHL field and is not touched.
  let clientId: Types.ObjectId | null = null;
  if (input.ghlContactId) {
    const profile = await AccClientProfile.findOne({ ghlContactId: input.ghlContactId })
      .select('clientId')
      .lean();
    clientId = profile?.clientId ?? null;
  }

  // acc_invoices.clientId is required, so an unmatched payment gets no
  // invoice row; the transaction below still lands and carries the flag.
  let invoiceId: Types.ObjectId | null = null;
  if (input.ghlInvoiceId && clientId) {
    const invoice = await AccInvoice.findOneAndUpdate(
      { ghlInvoiceId: input.ghlInvoiceId },
      {
        $set: {
          status: 'paid',
          paidAt,
          paidAmountCents: amountCents,
          ...(input.title ? { title: input.title } : {}),
        },
        $setOnInsert: {
          ghlInvoiceId: input.ghlInvoiceId,
          clientId,
          invoiceNumber: input.invoiceNumber ?? input.ghlInvoiceId,
          amountCents,
          issueDate: paidAt,
          billingType: 'other',
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    invoiceId = invoice._id;
  }

  const category = await findOrCreateCategory('Client Payment', 'income');

  try {
    const transaction = await AccTransaction.create({
      date: paidAt,
      type: 'in',
      amountCents,
      categoryId: category._id,
      clientId,
      invoiceId,
      source: 'ghl',
      externalId: input.ghlPaymentId,
      description: input.title ?? `GHL payment ${input.ghlPaymentId}`,
    });

    return {
      status: 'processed',
      transactionId: transaction._id.toString(),
      invoiceId: invoiceId ? invoiceId.toString() : null,
      clientId: clientId ? clientId.toString() : null,
      clientMatched: clientId !== null,
      ...(clientId
        ? {}
        : {
            warning: input.ghlContactId
              ? `No client profile matches ghlContactId "${input.ghlContactId}" — transaction recorded unlinked`
              : 'No ghlContactId supplied — transaction recorded unlinked',
          }),
    };
  } catch (err) {
    // A concurrent retry won the unique index; report its result instead.
    if (isDuplicateKeyError(err)) {
      const winner = await AccTransaction.findOne({ externalId: input.ghlPaymentId }).lean();
      if (winner) {
        return {
          status: 'already_processed',
          transactionId: winner._id.toString(),
          invoiceId: winner.invoiceId ? winner.invoiceId.toString() : null,
          clientId: winner.clientId ? winner.clientId.toString() : null,
          clientMatched: winner.clientId !== null,
        };
      }
    }
    throw err;
  }
}

/**
 * Looks a category up case-insensitively, creating it if it is missing, so an
 * integration never fails because someone renamed or removed a category.
 */
async function findOrCreateCategory(name: string, type: 'income' | 'expense') {
  const found = await AccCategory.findOne({ name, type }).collation(CI);
  if (found) return found;

  try {
    return await AccCategory.create({ name, type, isActive: true });
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      const raced = await AccCategory.findOne({ name, type }).collation(CI);
      if (raced) return raced;
    }
    throw err;
  }
}

// ── GHL invoice ────────────────────────────────────────────────────────────

export interface GhlInvoiceResult {
  status: 'updated' | 'created';
  invoiceId: string;
  invoiceStatus: string;
}

/** Upserts an invoice's status (sent/void) by its GoHighLevel id. */
export async function upsertGhlInvoice(input: GhlInvoiceInput): Promise<GhlInvoiceResult> {
  const update: Record<string, unknown> = { status: input.status };
  if (input.invoiceNumber) update.invoiceNumber = input.invoiceNumber;
  if (input.title) update.title = input.title;
  if (input.amount !== undefined) update.amountCents = toCents(input.amount);
  if (input.issueDate) update.issueDate = input.issueDate;
  if (input.dueDate !== undefined) update.dueDate = input.dueDate;
  if (input.billingType) update.billingType = input.billingType;
  if (input.milestoneLabel !== undefined) update.milestoneLabel = input.milestoneLabel;

  const existing = await AccInvoice.findOneAndUpdate(
    { ghlInvoiceId: input.ghlInvoiceId },
    { $set: update },
    { new: true, runValidators: true }
  );

  if (existing) {
    return { status: 'updated', invoiceId: existing._id.toString(), invoiceStatus: existing.status };
  }

  // Nothing local yet — create it, but only with enough data to be valid.
  const clientId = await resolveClientId(input.clientId, input.ghlContactId);
  if (!clientId) {
    throw new HttpError(
      'Invoice not found locally and no client could be resolved — send clientId or a ghlContactId that matches a billing profile',
      404
    );
  }
  if (input.amount === undefined) {
    throw new HttpError('Invoice not found locally — "amount" is required to create it', 400);
  }

  const created = await AccInvoice.create({
    ghlInvoiceId: input.ghlInvoiceId,
    clientId,
    invoiceNumber: input.invoiceNumber ?? input.ghlInvoiceId,
    title: input.title ?? '',
    amountCents: toCents(input.amount),
    issueDate: input.issueDate ?? new Date(),
    dueDate: input.dueDate ?? null,
    status: input.status,
    billingType: input.billingType ?? 'other',
    milestoneLabel: input.milestoneLabel ?? null,
  });

  return { status: 'created', invoiceId: created._id.toString(), invoiceStatus: created.status };
}

async function resolveClientId(
  clientId?: string,
  ghlContactId?: string | null
): Promise<Types.ObjectId | null> {
  if (clientId) return new Types.ObjectId(clientId);
  if (!ghlContactId) return null;
  const profile = await AccClientProfile.findOne({ ghlContactId }).select('clientId').lean();
  return profile?.clientId ?? null;
}

// ── Due alerts ─────────────────────────────────────────────────────────────

export interface DueAlert {
  /** Value to store in `acc_notification_logs.type` — includes the cycle date. */
  type: string;
  /** Base alert name for message templating, e.g. `domain_15` or `domain_expired`. */
  baseType: string;
  /** Which of the four configurable kinds this row came from. */
  itemType: AccAlertKind;
  refCollection: AccNotificationRefCollection;
  refId: string;
  /** Id of the underlying record — same value as `refId`. */
  id: string;
  channel: AccNotificationChannel;
  label: string;
  /** Human name of the item: the tool, domain, plan or invoice number. */
  name: string;
  clientName: string | null;
  date: string;
  daysRemaining: number;
  /** Whole days left in the configured zone; negative once the date has passed. */
  daysLeft: number;
  /** The configured day that fired, or 0 for the expired/overdue alert. */
  threshold: number;
  amountCents: number;
  /** Cost of the item in cents — same value as `amountCents`. */
  costCents: number;
}

/**
 * Alerts that should go out now and have not been logged yet.
 *
 * Thresholds come from `acc_settings` via `getAlertSettings()`, never from
 * constants, and firing is an EXACT match: with `[15, 7, 3, 1]` a subscription
 * alerts on the day it is 15, 7, 3 and 1 days out, and on no other day.
 * `daysLeft` counts whole calendar days in the configured zone, so the hour the
 * workflow runs does not matter — but the workflow does have to run every day
 * or a threshold is simply missed.
 *
 * On top of the configured days, anything already at or past its date raises a
 * single `*_expired` alert. Invoice days count FORWARD from the due date, so
 * for those the expired alert is the due date itself and `[1, 3, 7]` fires on
 * the first, third and seventh day after it.
 *
 * The dedupe key carries the cycle date (`domain_15@2027-05-14`) because
 * domains renew yearly and subscriptions monthly — a bare `domain_15` would be
 * logged once and then suppress every future renewal for that same record.
 */
export async function getDueAlerts(channel: AccNotificationChannel): Promise<DueAlert[]> {
  const settings = await getAlertSettings();
  const { timezone } = settings;
  const now = new Date();

  // The widest configured day per kind decides how far ahead to look. Items
  // already past their date are in range too, hence the open lower bound.
  const domainHorizon = addDays(Math.max(...settings.domainAlertDays), now);
  const hostingHorizon = addDays(Math.max(...settings.hostingAlertDays), now);
  const subscriptionHorizon = addDays(Math.max(...settings.subscriptionAlertDays), now);

  const [domains, hostings, subscriptions, invoices] = await Promise.all([
    AccDomain.find({
      isArchived: { $ne: true },
      status: 'active',
      expiryDate: { $lte: domainHorizon },
    })
      .populate('clientId', 'name')
      .lean(),
    AccHosting.find({
      isArchived: { $ne: true },
      status: 'active',
      expiryDate: { $lte: hostingHorizon },
    })
      .populate('clientId', 'name')
      .lean(),
    AccSubscription.find({
      isArchived: { $ne: true },
      status: 'active',
      nextBillingDate: { $ne: null, $lte: subscriptionHorizon },
    })
      .populate('clientId', 'name')
      .lean(),
    // Invoice days count forward from the due date, so only invoices that have
    // already come due can alert at all.
    AccInvoice.find({ status: { $in: ['sent', 'overdue'] }, dueDate: { $ne: null, $lte: now } })
      .populate('clientId', 'name')
      .lean(),
  ]);

  const candidates: DueAlert[] = [];

  for (const domain of domains) {
    const hit = matchBeforeThreshold(domain.expiryDate, settings.domainAlertDays, timezone, now);
    if (!hit) continue;
    candidates.push(
      buildDueAlert('domain', hit, {
        refCollection: 'acc_domains',
        refId: domain._id.toString(),
        channel,
        name: domain.domain,
        clientName: nameOf(domain.clientId),
        costCents: domain.costCents,
      })
    );
  }

  for (const hosting of hostings) {
    const hit = matchBeforeThreshold(hosting.expiryDate, settings.hostingAlertDays, timezone, now);
    if (!hit) continue;
    candidates.push(
      buildDueAlert('hosting', hit, {
        refCollection: 'acc_hostings',
        refId: hosting._id.toString(),
        channel,
        name: hosting.name,
        clientName: nameOf(hosting.clientId),
        costCents: hosting.costCents,
      })
    );
  }

  for (const sub of subscriptions) {
    const due = sub.nextBillingDate as Date;
    const hit = matchBeforeThreshold(due, settings.subscriptionAlertDays, timezone, now);
    if (!hit) continue;
    candidates.push(
      buildDueAlert('subscription', hit, {
        refCollection: 'acc_subscriptions',
        refId: sub._id.toString(),
        channel,
        name: sub.toolName,
        clientName: nameOf(sub.clientId),
        costCents: sub.costCents,
      })
    );
  }

  for (const invoice of invoices) {
    const due = invoice.dueDate as Date;
    const hit = matchOverdueThreshold(due, settings.invoiceOverdueAlertDays, timezone, now);
    if (!hit) continue;
    candidates.push(
      buildDueAlert('invoice', hit, {
        refCollection: 'acc_invoices',
        refId: invoice._id.toString(),
        channel,
        name: invoice.invoiceNumber,
        clientName: nameOf(invoice.clientId),
        costCents: invoice.amountCents,
      })
    );
  }

  if (candidates.length === 0) return [];

  const alreadySent = await AccNotificationLog.find({
    channel,
    type: { $in: candidates.map((c) => c.type) },
    refId: { $in: candidates.map((c) => new Types.ObjectId(c.refId)) },
  })
    .select('type refId')
    .lean();

  const sentKeys = new Set(alreadySent.map((log) => `${log.type}|${log.refId.toString()}`));

  return candidates
    .filter((c) => !sentKeys.has(`${c.type}|${c.refId}`))
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

interface ThresholdHit {
  daysLeft: number;
  threshold: number;
  date: Date;
}

/**
 * Days configured BEFORE the date — domains, hosting and subscriptions.
 * Exact match only, plus one alert once the date has arrived or passed.
 */
function matchBeforeThreshold(
  date: Date,
  configured: readonly number[],
  timezone: string,
  now: Date
): ThresholdHit | null {
  const daysLeft = daysUntilInZone(date, timezone, now);
  if (daysLeft <= 0) return { daysLeft, threshold: 0, date };
  return configured.includes(daysLeft) ? { daysLeft, threshold: daysLeft, date } : null;
}

/**
 * Days configured AFTER the due date — overdue invoices. `[1, 3, 7]` fires on
 * the first, third and seventh day past due; the due date itself is day 0 and
 * raises the expired alert.
 */
function matchOverdueThreshold(
  dueDate: Date,
  configured: readonly number[],
  timezone: string,
  now: Date
): ThresholdHit | null {
  const daysLeft = daysUntilInZone(dueDate, timezone, now);
  if (daysLeft > 0) return null;

  const daysOverdue = -daysLeft;
  if (daysOverdue === 0) return { daysLeft, threshold: 0, date: dueDate };

  return configured.includes(daysOverdue)
    ? { daysLeft, threshold: daysOverdue, date: dueDate }
    : null;
}

function buildDueAlert(
  itemType: AccAlertKind,
  hit: ThresholdHit,
  item: {
    refCollection: AccNotificationRefCollection;
    refId: string;
    channel: AccNotificationChannel;
    name: string;
    clientName: string | null;
    costCents: number;
  }
): DueAlert {
  const baseType = accAlertType(itemType, hit.threshold);

  return {
    // The cycle suffix stays in the display zone so a key written before this
    // feature keeps matching the one written after it.
    type: `${baseType}@${toYmdNY(hit.date)}`,
    baseType,
    itemType,
    refCollection: item.refCollection,
    refId: item.refId,
    id: item.refId,
    channel: item.channel,
    label: item.name,
    name: item.name,
    clientName: item.clientName,
    date: hit.date.toISOString(),
    daysRemaining: hit.daysLeft,
    daysLeft: hit.daysLeft,
    threshold: hit.threshold,
    amountCents: item.costCents,
    costCents: item.costCents,
  };
}

function nameOf(value: unknown): string | null {
  if (!value) return null;
  return (value as { name?: string }).name ?? null;
}

// ── Notification log ───────────────────────────────────────────────────────

export interface NotificationLogResult {
  status: 'logged' | 'already_logged';
  logId: string;
}

/** Records a delivered alert. Idempotent on (type, refId, channel). */
export async function recordNotification(
  input: NotificationLogInput
): Promise<NotificationLogResult> {
  try {
    const log = await AccNotificationLog.create({
      type: input.type,
      refCollection: input.refCollection,
      refId: input.refId,
      channel: input.channel,
      sentAt: input.sentAt ?? new Date(),
    });
    return { status: 'logged', logId: log._id.toString() };
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      const existing = await AccNotificationLog.findOne({
        type: input.type,
        refId: input.refId,
        channel: input.channel,
      }).lean();
      if (existing) return { status: 'already_logged', logId: existing._id.toString() };
    }
    throw err;
  }
}

// ── Mark overdue ───────────────────────────────────────────────────────────

export interface MarkOverdueResult {
  updated: number;
  invoices: {
    _id: string;
    invoiceNumber: string;
    clientId: string;
    amountCents: number;
    dueDate: string | null;
    daysOverdue: number;
  }[];
}

/**
 * Flips sent invoices past their due date to `overdue`.
 *
 * The ids are selected first and the update is scoped to exactly those, so
 * the write can never touch a row that was not inspected.
 */
export async function markInvoicesOverdue(): Promise<MarkOverdueResult> {
  const now = new Date();

  const due = await AccInvoice.find({ status: 'sent', dueDate: { $ne: null, $lt: now } })
    .select('_id invoiceNumber clientId amountCents dueDate')
    .lean();

  if (due.length === 0) return { updated: 0, invoices: [] };

  const ids = due.map((inv) => inv._id);
  const res = await AccInvoice.updateMany({ _id: { $in: ids } }, { $set: { status: 'overdue' } });

  return {
    updated: res.modifiedCount,
    invoices: due.map((inv) => ({
      _id: inv._id.toString(),
      invoiceNumber: inv.invoiceNumber,
      clientId: inv.clientId.toString(),
      amountCents: inv.amountCents,
      dueDate: inv.dueDate ? inv.dueDate.toISOString() : null,
      daysOverdue: inv.dueDate ? -daysUntil(inv.dueDate, now) : 0,
    })),
  };
}

// ── Telegram expense ───────────────────────────────────────────────────────

export interface TelegramExpenseResult {
  transactionId: string;
  categoryId: string;
  categoryName: string;
  amountCents: number;
}

/** Creates an expense from a Telegram message. */
export async function createTelegramExpense(
  input: TelegramExpenseInput
): Promise<TelegramExpenseResult> {
  const amountCents = toCents(input.amount);
  if (amountCents <= 0) throw new HttpError('amount must be greater than zero', 400);

  const category = await AccCategory.findOne({ name: input.category, type: 'expense' })
    .collation(CI)
    .lean();

  if (!category) {
    // Listing the valid names back makes a typo self-correcting in Telegram,
    // and stops junk categories being created from misspelled messages.
    const available = await AccCategory.find({ type: 'expense', isActive: true })
      .select('name')
      .sort({ name: 1 })
      .lean();
    throw new HttpError(
      `Unknown expense category "${input.category}". Available: ${available.map((c) => c.name).join(', ') || 'none'}`,
      400
    );
  }

  const transaction = await AccTransaction.create({
    date: input.date ?? new Date(),
    type: 'out',
    amountCents,
    categoryId: category._id,
    accountId: input.accountId ?? null,
    vendor: input.vendor ?? '',
    description: input.description ?? '',
    source: 'telegram',
  });

  return {
    transactionId: transaction._id.toString(),
    categoryId: category._id.toString(),
    categoryName: category.name,
    amountCents,
  };
}

// ── Domain verification ────────────────────────────────────────────────────

export interface DomainVerifyResult {
  _id: string;
  domain: string;
  expiryDate: string;
  lastVerifiedAt: string;
  status: string;
  daysRemaining: number;
}

/** Refreshes a domain's expiry date after a registrar lookup. */
export async function verifyDomain(input: DomainVerifyInput): Promise<DomainVerifyResult> {
  const filter = input.id
    ? { _id: input.id }
    : { domain: (input.domain as string).toLowerCase().trim() };

  const now = new Date();
  const update: Record<string, unknown> = {
    expiryDate: input.expiryDate,
    lastVerifiedAt: now,
  };
  if (input.status) update.status = input.status;
  if (input.autoRenew !== undefined) update.autoRenew = input.autoRenew;

  const domain = await AccDomain.findOneAndUpdate(
    filter,
    { $set: update },
    { new: true, runValidators: true }
  );

  if (!domain) throw new HttpError('Domain not found', 404);

  return {
    _id: domain._id.toString(),
    domain: domain.domain,
    expiryDate: domain.expiryDate.toISOString(),
    lastVerifiedAt: (domain.lastVerifiedAt ?? now).toISOString(),
    status: domain.status,
    daysRemaining: daysUntil(domain.expiryDate, now),
  };
}
