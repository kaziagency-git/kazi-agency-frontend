import {
  ACC_DEFAULT_DOMAIN_ALERT_DAYS,
  ACC_DEFAULT_HOSTING_ALERT_DAYS,
  ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS,
  ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS,
} from './constants';
import type { AccAlertKind } from './constants';

/**
 * Rules and wording for the configurable alert days.
 *
 * Pure and free of any server-only import: the Zod schema, the Mongoose
 * validator and the settings UI all validate against this one module, so the
 * API and the form can never disagree about what a valid list looks like.
 */

export const ACC_ALERT_DAY_MIN = 1;
export const ACC_ALERT_DAY_MAX = 365;
export const ACC_ALERT_DAYS_MAX = 12;

/** The `acc_settings` field each alert kind is configured through. */
export const ACC_ALERT_DAYS_FIELDS = {
  domain: 'domainAlertDays',
  hosting: 'hostingAlertDays',
  subscription: 'subscriptionAlertDays',
  invoice: 'invoiceOverdueAlertDays',
} as const satisfies Record<AccAlertKind, string>;

export type AccAlertDaysField = (typeof ACC_ALERT_DAYS_FIELDS)[AccAlertKind];

export const ACC_ALERT_DAYS_DEFAULTS: Record<AccAlertDaysField, readonly number[]> = {
  domainAlertDays: ACC_DEFAULT_DOMAIN_ALERT_DAYS,
  hostingAlertDays: ACC_DEFAULT_HOSTING_ALERT_DAYS,
  subscriptionAlertDays: ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS,
  invoiceOverdueAlertDays: ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS,
};

/**
 * Display copy for the settings form, in the order the panel renders them.
 *
 * `preview` completes the sentence "This item will alert …"; invoices count
 * FORWARD from the due date, which is why their phrasing differs.
 */
export const ACC_ALERT_TYPE_META: readonly {
  kind: AccAlertKind;
  field: AccAlertDaysField;
  label: string;
  description: string;
  preview: string;
}[] = [
  {
    kind: 'domain',
    field: 'domainAlertDays',
    label: 'Domains',
    description: 'Days before a domain expiry date to warn about the renewal.',
    preview: 'days before the domain expires',
  },
  {
    kind: 'hosting',
    field: 'hostingAlertDays',
    label: 'Hosting',
    description: 'Days before a hosting plan expiry date to warn about the renewal.',
    preview: 'days before the hosting plan expires',
  },
  {
    kind: 'subscription',
    field: 'subscriptionAlertDays',
    label: 'Subscriptions',
    description: 'Days before a tool is billed again to warn about the charge.',
    preview: 'days before the next billing date',
  },
  {
    kind: 'invoice',
    field: 'invoiceOverdueAlertDays',
    label: 'Overdue invoices',
    description: 'Days AFTER an invoice due date to chase the payment.',
    preview: 'days after the invoice was due',
  },
];

/** Deduplicated and sorted descending — the order the days are stored in. */
export function normalizeAlertDays(days: readonly number[]): number[] {
  return [...new Set(days)].sort((a, b) => b - a);
}

/**
 * Checks one value on its way in from the number input.
 * Returns an error message, or null when the value may be added.
 */
export function validateAlertDay(value: number, existing: readonly number[]): string | null {
  if (!Number.isFinite(value)) return 'Enter a number';
  if (!Number.isInteger(value)) return 'Whole days only — no decimals';
  if (value < ACC_ALERT_DAY_MIN || value > ACC_ALERT_DAY_MAX) {
    return `Must be between ${ACC_ALERT_DAY_MIN} and ${ACC_ALERT_DAY_MAX}`;
  }
  if (existing.includes(value)) return `${value} is already in the list`;
  if (existing.length >= ACC_ALERT_DAYS_MAX) {
    return `At most ${ACC_ALERT_DAYS_MAX} days — remove one first`;
  }
  return null;
}

/**
 * Checks a whole list before it is saved.
 * Returns an error message, or null when the list is valid.
 */
export function validateAlertDays(days: readonly number[]): string | null {
  if (days.length === 0) return 'Add at least one day';
  if (days.length > ACC_ALERT_DAYS_MAX) return `At most ${ACC_ALERT_DAYS_MAX} days`;

  for (const day of days) {
    if (!Number.isInteger(day)) return 'Whole days only — no decimals';
    if (day < ACC_ALERT_DAY_MIN || day > ACC_ALERT_DAY_MAX) {
      return `Every day must be between ${ACC_ALERT_DAY_MIN} and ${ACC_ALERT_DAY_MAX}`;
    }
  }

  if (new Set(days).size !== days.length) return 'The same day is listed twice';
  return null;
}

/** `[15, 7, 3, 1]` → `"15, 7, 3 and 1"`. */
export function joinDays(days: readonly number[]): string {
  if (days.length === 0) return '';
  if (days.length === 1) return String(days[0]);
  return `${days.slice(0, -1).join(', ')} and ${days[days.length - 1]}`;
}

/** The live preview line under the chips. */
export function alertDaysPreview(days: readonly number[], phrase: string): string {
  if (days.length === 0) return 'No alerts will be sent for this type.';
  return `This item will alert ${joinDays(days)} ${phrase}.`;
}

/** Common US zones offered in the settings dropdown. */
export const ACC_ALERT_TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern — America/New_York' },
  { value: 'America/Chicago', label: 'Central — America/Chicago' },
  { value: 'America/Denver', label: 'Mountain — America/Denver' },
  { value: 'America/Phoenix', label: 'Arizona (no DST) — America/Phoenix' },
  { value: 'America/Los_Angeles', label: 'Pacific — America/Los_Angeles' },
  { value: 'America/Anchorage', label: 'Alaska — America/Anchorage' },
  { value: 'Pacific/Honolulu', label: 'Hawaii — Pacific/Honolulu' },
] as const;

/** True when the runtime's Intl accepts the zone, so a bad value never throws. */
export function isValidTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}
