import 'server-only';
import { AccSettings, ACC_SETTINGS_ID } from '@/lib/server/models/accounting/acc-settings.model';
import {
  ACC_DEFAULT_ALERT_TIMEZONE,
  ACC_DEFAULT_DOMAIN_ALERT_DAYS,
  ACC_DEFAULT_HOSTING_ALERT_DAYS,
  ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS,
  ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS,
} from './constants';
import { isValidTimeZone, normalizeAlertDays, validateAlertDays } from './alert-days';
import type { UpdateAccSettingsInput } from '@/lib/server/schemas/accounting/acc-settings.schema';

/**
 * Reader for the `acc_settings` singleton.
 *
 * Every alert threshold in the module comes from here — `constants.ts` now
 * holds fallbacks only. The document is created on first read, so a fresh
 * install needs no migration step before alerts work.
 */

export interface AccAlertSettings {
  domainAlertDays: number[];
  hostingAlertDays: number[];
  subscriptionAlertDays: number[];
  invoiceOverdueAlertDays: number[];
  timezone: string;
  updatedAt: string | null;
}

/** How long a read is reused before the document is consulted again. */
const CACHE_TTL_MS = 60_000;

interface SettingsCache {
  value: AccAlertSettings | null;
  expiresAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var _accSettingsCache: SettingsCache | undefined;
}

// On globalThis so the cache survives Next.js dev hot-reloads and serverless
// warm invocations, the same way the Mongoose connection cache does.
const cache: SettingsCache = global._accSettingsCache ?? { value: null, expiresAt: 0 };
global._accSettingsCache = cache;

export function defaultAlertSettings(): AccAlertSettings {
  return {
    domainAlertDays: normalizeAlertDays(ACC_DEFAULT_DOMAIN_ALERT_DAYS),
    hostingAlertDays: normalizeAlertDays(ACC_DEFAULT_HOSTING_ALERT_DAYS),
    subscriptionAlertDays: normalizeAlertDays(ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS),
    invoiceOverdueAlertDays: normalizeAlertDays(ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS),
    timezone: ACC_DEFAULT_ALERT_TIMEZONE,
    updatedAt: null,
  };
}

/**
 * Current settings, cached in memory for a minute.
 *
 * A field that is missing or fails validation falls back to its own default
 * without disturbing the others, so one bad array can never stop alerts for
 * the other three types.
 */
export async function getAlertSettings(): Promise<AccAlertSettings> {
  if (cache.value && Date.now() < cache.expiresAt) return cache.value;

  const doc = await ensureSettingsDoc();
  const settings = sanitize(doc);

  cache.value = settings;
  cache.expiresAt = Date.now() + CACHE_TTL_MS;
  return settings;
}

/** Applies a validated patch and returns the stored result. */
export async function updateAlertSettings(
  patch: UpdateAccSettingsInput
): Promise<AccAlertSettings> {
  await ensureSettingsDoc();

  const update: Record<string, unknown> = {};
  if (patch.domainAlertDays) update.domainAlertDays = normalizeAlertDays(patch.domainAlertDays);
  if (patch.hostingAlertDays) update.hostingAlertDays = normalizeAlertDays(patch.hostingAlertDays);
  if (patch.subscriptionAlertDays) {
    update.subscriptionAlertDays = normalizeAlertDays(patch.subscriptionAlertDays);
  }
  if (patch.invoiceOverdueAlertDays) {
    update.invoiceOverdueAlertDays = normalizeAlertDays(patch.invoiceOverdueAlertDays);
  }
  if (patch.timezone) update.timezone = patch.timezone;

  // runValidators keeps the model-level rules enforced on an update, which
  // Mongoose skips by default.
  const doc = await AccSettings.findByIdAndUpdate(ACC_SETTINGS_ID, update, {
    new: true,
    runValidators: true,
    context: 'query',
  }).lean();

  const settings = sanitize(doc);
  cache.value = settings;
  cache.expiresAt = Date.now() + CACHE_TTL_MS;
  return settings;
}

/** Drops the cached copy so the next read hits the database. */
export function invalidateAlertSettingsCache(): void {
  cache.value = null;
  cache.expiresAt = 0;
}

export interface SeedSettingsResult {
  created: boolean;
}

/**
 * Creates the singleton with the defaults if it is not there yet.
 *
 * Idempotent: `$setOnInsert` means a second run matches the existing document
 * and changes nothing, so a value the admin edited is never overwritten.
 */
export async function seedAlertSettings(): Promise<SeedSettingsResult> {
  const defaults = defaultAlertSettings();

  const res = await AccSettings.updateOne(
    { _id: ACC_SETTINGS_ID },
    {
      $setOnInsert: {
        domainAlertDays: defaults.domainAlertDays,
        hostingAlertDays: defaults.hostingAlertDays,
        subscriptionAlertDays: defaults.subscriptionAlertDays,
        invoiceOverdueAlertDays: defaults.invoiceOverdueAlertDays,
        timezone: defaults.timezone,
      },
    },
    { upsert: true }
  );

  if (res.upsertedCount > 0) invalidateAlertSettingsCache();
  return { created: res.upsertedCount > 0 };
}

// ── Internals ──────────────────────────────────────────────────────────────

type RawSettings = Partial<Record<keyof AccAlertSettings, unknown>> | null;

async function ensureSettingsDoc(): Promise<RawSettings> {
  await seedAlertSettings();
  return (await AccSettings.findById(ACC_SETTINGS_ID).lean()) as RawSettings;
}

/** Field-by-field fallback: one bad array never costs the other three. */
function sanitize(doc: RawSettings): AccAlertSettings {
  const defaults = defaultAlertSettings();
  if (!doc) return defaults;

  const days = (value: unknown, fallback: number[]): number[] => {
    if (!Array.isArray(value)) return fallback;
    const numbers = value.filter((v): v is number => typeof v === 'number');
    const normalized = normalizeAlertDays(numbers);
    return validateAlertDays(normalized) === null ? normalized : fallback;
  };

  const timezone =
    typeof doc.timezone === 'string' && isValidTimeZone(doc.timezone)
      ? doc.timezone
      : defaults.timezone;

  return {
    domainAlertDays: days(doc.domainAlertDays, defaults.domainAlertDays),
    hostingAlertDays: days(doc.hostingAlertDays, defaults.hostingAlertDays),
    subscriptionAlertDays: days(doc.subscriptionAlertDays, defaults.subscriptionAlertDays),
    invoiceOverdueAlertDays: days(doc.invoiceOverdueAlertDays, defaults.invoiceOverdueAlertDays),
    timezone,
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : null,
  };
}
