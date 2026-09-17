import 'server-only';
import { Types } from 'mongoose';
import {
  AccDomain,
  AccHosting,
  AccInvoice,
  AccSubscription,
  AccTransaction,
} from '../../models/accounting';
import { ACC_DISPLAY_TIMEZONE } from '@/lib/accounting/constants';
import { addDays, daysUntil, startOfYearNY } from '@/lib/accounting/date';

/**
 * Reporting queries. All figures are integer cents; the aggregations sum
 * cents directly so no rounding happens until a value is formatted.
 *
 * Month bucketing passes `timezone` to `$month`, so a payment at 8pm on the
 * 31st in New York lands in that month rather than the next one in UTC.
 */

// ── Summary ────────────────────────────────────────────────────────────────

export interface CategoryBreakdownRow {
  categoryId: string | null;
  name: string;
  type: 'income' | 'expense';
  color: string | null;
  totalCents: number;
  count: number;
}

export interface ClientBreakdownRow {
  clientId: string;
  name: string;
  company: string;
  incomeCents: number;
  expenseCents: number;
  netCents: number;
  count: number;
}

export interface SummaryReport {
  from: string | null;
  to: string | null;
  totalIncomeCents: number;
  totalExpenseCents: number;
  netProfitCents: number;
  transactionCount: number;
  byCategory: CategoryBreakdownRow[];
  byClient: ClientBreakdownRow[];
}

interface TotalsRow {
  _id: 'in' | 'out';
  totalCents: number;
  count: number;
}

interface RawCategoryRow {
  _id: Types.ObjectId | null;
  totalCents: number;
  count: number;
  category: { name?: string; type?: 'income' | 'expense'; color?: string | null }[];
}

interface RawClientRow {
  _id: Types.ObjectId;
  incomeCents: number;
  expenseCents: number;
  count: number;
  client: { name?: string; company?: string }[];
}

export async function getSummaryReport(from: Date | null, to: Date | null): Promise<SummaryReport> {
  const match: Record<string, unknown> = { isArchived: { $ne: true } };
  if (from || to) {
    const range: Record<string, Date> = {};
    if (from) range.$gte = from;
    if (to) range.$lte = to;
    match.date = range;
  }

  const [facet] = await AccTransaction.aggregate<{
    totals: TotalsRow[];
    byCategory: RawCategoryRow[];
    byClient: RawClientRow[];
  }>([
    { $match: match },
    {
      $facet: {
        totals: [
          { $group: { _id: '$type', totalCents: { $sum: '$amountCents' }, count: { $sum: 1 } } },
        ],
        byCategory: [
          {
            $group: {
              _id: '$categoryId',
              totalCents: { $sum: '$amountCents' },
              count: { $sum: 1 },
            },
          },
          {
            $lookup: {
              from: 'acc_categories',
              localField: '_id',
              foreignField: '_id',
              as: 'category',
              pipeline: [{ $project: { name: 1, type: 1, color: 1 } }],
            },
          },
          { $sort: { totalCents: -1 } },
        ],
        byClient: [
          { $match: { clientId: { $ne: null } } },
          {
            $group: {
              _id: '$clientId',
              incomeCents: {
                $sum: { $cond: [{ $eq: ['$type', 'in'] }, '$amountCents', 0] },
              },
              expenseCents: {
                $sum: { $cond: [{ $eq: ['$type', 'out'] }, '$amountCents', 0] },
              },
              count: { $sum: 1 },
            },
          },
          {
            $lookup: {
              from: 'clients',
              localField: '_id',
              foreignField: '_id',
              as: 'client',
              pipeline: [{ $project: { name: 1, company: 1 } }],
            },
          },
          { $sort: { incomeCents: -1 } },
        ],
      },
    },
  ]);

  const totals = facet?.totals ?? [];
  const totalIncomeCents = totals.find((t) => t._id === 'in')?.totalCents ?? 0;
  const totalExpenseCents = totals.find((t) => t._id === 'out')?.totalCents ?? 0;
  const transactionCount = totals.reduce((sum, t) => sum + t.count, 0);

  return {
    from: from ? from.toISOString() : null,
    to: to ? to.toISOString() : null,
    totalIncomeCents,
    totalExpenseCents,
    netProfitCents: totalIncomeCents - totalExpenseCents,
    transactionCount,
    byCategory: (facet?.byCategory ?? []).map((row) => ({
      categoryId: row._id ? row._id.toString() : null,
      name: row.category[0]?.name ?? 'Uncategorised',
      type: row.category[0]?.type ?? 'expense',
      color: row.category[0]?.color ?? null,
      totalCents: row.totalCents,
      count: row.count,
    })),
    byClient: (facet?.byClient ?? []).map((row) => ({
      clientId: row._id.toString(),
      name: row.client[0]?.name ?? 'Unknown client',
      company: row.client[0]?.company ?? '',
      incomeCents: row.incomeCents,
      expenseCents: row.expenseCents,
      netCents: row.incomeCents - row.expenseCents,
      count: row.count,
    })),
  };
}

// ── Monthly ────────────────────────────────────────────────────────────────

export interface MonthlyRow {
  month: number;
  label: string;
  incomeCents: number;
  expenseCents: number;
  netCents: number;
}

export interface MonthlyReport {
  year: number;
  timezone: string;
  months: MonthlyRow[];
  totalIncomeCents: number;
  totalExpenseCents: number;
  netProfitCents: number;
}

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export async function getMonthlyReport(year: number): Promise<MonthlyReport> {
  const start = startOfYearNY(year);
  const end = startOfYearNY(year + 1);

  const rows = await AccTransaction.aggregate<{
    _id: number;
    incomeCents: number;
    expenseCents: number;
  }>([
    { $match: { isArchived: { $ne: true }, date: { $gte: start, $lt: end } } },
    {
      $group: {
        _id: { $month: { date: '$date', timezone: ACC_DISPLAY_TIMEZONE } },
        incomeCents: { $sum: { $cond: [{ $eq: ['$type', 'in'] }, '$amountCents', 0] } },
        expenseCents: { $sum: { $cond: [{ $eq: ['$type', 'out'] }, '$amountCents', 0] } },
      },
    },
  ]);

  const byMonth = new Map(rows.map((r) => [r._id, r]));

  // Always 12 rows, so a chart never has to fill gaps itself.
  const months: MonthlyRow[] = MONTH_LABELS.map((label, index) => {
    const row = byMonth.get(index + 1);
    const incomeCents = row?.incomeCents ?? 0;
    const expenseCents = row?.expenseCents ?? 0;
    return {
      month: index + 1,
      label,
      incomeCents,
      expenseCents,
      netCents: incomeCents - expenseCents,
    };
  });

  const totalIncomeCents = months.reduce((sum, m) => sum + m.incomeCents, 0);
  const totalExpenseCents = months.reduce((sum, m) => sum + m.expenseCents, 0);

  return {
    year,
    timezone: ACC_DISPLAY_TIMEZONE,
    months,
    totalIncomeCents,
    totalExpenseCents,
    netProfitCents: totalIncomeCents - totalExpenseCents,
  };
}

// ── Upcoming ───────────────────────────────────────────────────────────────

export interface UpcomingItem {
  _id: string;
  label: string;
  clientId: string | null;
  clientName: string | null;
  date: string;
  daysRemaining: number;
  costCents: number;
  chargeCents: number;
  autoRenew: boolean | null;
}

export interface UpcomingReport {
  days: number;
  until: string;
  domains: UpcomingItem[];
  hostings: UpcomingItem[];
  subscriptions: UpcomingItem[];
  overdueInvoices: {
    _id: string;
    invoiceNumber: string;
    title: string;
    clientId: string | null;
    clientName: string | null;
    amountCents: number;
    dueDate: string | null;
    daysOverdue: number;
    status: string;
  }[];
}

interface PopulatedClient {
  _id: Types.ObjectId;
  name?: string;
  company?: string;
}

function clientOf(value: unknown): { id: string | null; name: string | null } {
  if (!value) return { id: null, name: null };
  const client = value as PopulatedClient;
  return { id: client._id?.toString() ?? null, name: client.name ?? null };
}

export async function getUpcomingReport(days: number): Promise<UpcomingReport> {
  const now = new Date();
  const until = addDays(days, now);

  const [domains, hostings, subscriptions, invoices] = await Promise.all([
    AccDomain.find({ isArchived: { $ne: true }, status: 'active', expiryDate: { $lte: until } })
      .sort({ expiryDate: 1 })
      .populate('clientId', 'name company')
      .lean(),
    AccHosting.find({ isArchived: { $ne: true }, status: 'active', expiryDate: { $lte: until } })
      .sort({ expiryDate: 1 })
      .populate('clientId', 'name company')
      .lean(),
    AccSubscription.find({
      isArchived: { $ne: true },
      status: 'active',
      nextBillingDate: { $ne: null, $lte: until },
    })
      .sort({ nextBillingDate: 1 })
      .populate('clientId', 'name company')
      .lean(),
    AccInvoice.find({
      status: { $in: ['sent', 'overdue'] },
      dueDate: { $ne: null, $lt: now },
    })
      .sort({ dueDate: 1 })
      .populate('clientId', 'name company')
      .lean(),
  ]);

  return {
    days,
    until: until.toISOString(),
    domains: domains.map((d) => {
      const client = clientOf(d.clientId);
      return {
        _id: d._id.toString(),
        label: d.domain,
        clientId: client.id,
        clientName: client.name,
        date: d.expiryDate.toISOString(),
        daysRemaining: daysUntil(d.expiryDate, now),
        costCents: d.costCents,
        chargeCents: d.chargeCents,
        autoRenew: d.autoRenew,
      };
    }),
    hostings: hostings.map((h) => {
      const client = clientOf(h.clientId);
      return {
        _id: h._id.toString(),
        label: h.name,
        clientId: client.id,
        clientName: client.name,
        date: h.expiryDate.toISOString(),
        daysRemaining: daysUntil(h.expiryDate, now),
        costCents: h.costCents,
        chargeCents: h.chargeCents,
        autoRenew: h.autoRenew,
      };
    }),
    subscriptions: subscriptions.map((s) => {
      const client = clientOf(s.clientId);
      return {
        _id: s._id.toString(),
        label: s.toolName,
        clientId: client.id,
        clientName: client.name,
        date: (s.nextBillingDate as Date).toISOString(),
        daysRemaining: daysUntil(s.nextBillingDate as Date, now),
        costCents: s.costCents,
        chargeCents: 0,
        autoRenew: null,
      };
    }),
    overdueInvoices: invoices.map((inv) => {
      const client = clientOf(inv.clientId);
      return {
        _id: inv._id.toString(),
        invoiceNumber: inv.invoiceNumber,
        title: inv.title,
        clientId: client.id,
        clientName: client.name,
        amountCents: inv.amountCents,
        dueDate: inv.dueDate ? inv.dueDate.toISOString() : null,
        daysOverdue: inv.dueDate ? -daysUntil(inv.dueDate, now) : 0,
        status: inv.status,
      };
    }),
  };
}

// ── Subscription totals ────────────────────────────────────────────────────

export interface SubscriptionTotalsReport {
  monthlyEquivalentCents: number;
  yearlyTotalCents: number;
  byCycle: {
    billingCycle: string;
    totalCents: number;
    count: number;
    monthlyEquivalentCents: number;
  }[];
  billableToClientsCents: number;
  agencyOwnCents: number;
  oneTimeTotalCents: number;
  activeCount: number;
}

export async function getSubscriptionTotals(): Promise<SubscriptionTotalsReport> {
  const rows = await AccSubscription.aggregate<{
    _id: string;
    totalCents: number;
    count: number;
    billableCents: number;
  }>([
    { $match: { isArchived: { $ne: true }, status: 'active' } },
    {
      $group: {
        _id: '$billingCycle',
        totalCents: { $sum: '$costCents' },
        count: { $sum: 1 },
        billableCents: {
          $sum: { $cond: ['$isBillableToClient', '$costCents', 0] },
        },
      },
    },
  ]);

  const cycle = (name: string) => rows.find((r) => r._id === name);
  const monthlyCents = cycle('monthly')?.totalCents ?? 0;
  const yearlyCents = cycle('yearly')?.totalCents ?? 0;
  const oneTimeTotalCents = cycle('one_time')?.totalCents ?? 0;

  // A yearly plan's monthly equivalent is its cost / 12, rounded to the cent.
  // One-time purchases are not recurring, so they stay out of both totals.
  const monthlyEquivalentCents = monthlyCents + Math.round(yearlyCents / 12);
  const yearlyTotalCents = monthlyCents * 12 + yearlyCents;

  const billableToClientsCents = rows.reduce(
    (sum, r) => (r._id === 'one_time' ? sum : sum + r.billableCents),
    0
  );
  const recurringTotalCents = monthlyCents + yearlyCents;

  return {
    monthlyEquivalentCents,
    yearlyTotalCents,
    byCycle: rows.map((r) => ({
      billingCycle: r._id,
      totalCents: r.totalCents,
      count: r.count,
      monthlyEquivalentCents:
        r._id === 'monthly'
          ? r.totalCents
          : r._id === 'yearly'
            ? Math.round(r.totalCents / 12)
            : 0,
    })),
    billableToClientsCents,
    agencyOwnCents: recurringTotalCents - billableToClientsCents,
    oneTimeTotalCents,
    activeCount: rows.reduce((sum, r) => sum + r.count, 0),
  };
}
