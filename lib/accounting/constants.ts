/**
 * Accounting module — single source of truth for enums, thresholds and
 * display settings. Pure constants only: this file is imported by both the
 * Mongoose models (server) and the admin UI (client), so it must stay free
 * of any server-only import.
 */

// ── Currency & timezone ────────────────────────────────────────────────────

/** The agency bills in USD only. Money is always stored as integer cents. */
export const ACC_CURRENCY = 'USD' as const;

/** Everything is stored in UTC and rendered in this zone. Change it here only. */
export const ACC_DISPLAY_TIMEZONE = 'America/New_York' as const;

export const ACC_LOCALE = 'en-US' as const;

// ── Defaults ───────────────────────────────────────────────────────────────

export const ACC_DEFAULT_REGISTRAR = 'Namecheap' as const;
export const ACC_DEFAULT_HOSTING_PROVIDER = 'Hostinger' as const;

// ── Enums ──────────────────────────────────────────────────────────────────

/** How a client is billed (`mixed` = more than one arrangement in parallel). */
export const ACC_BILLING_TYPES = ['retainer', 'project', 'hourly', 'mixed'] as const;
export type AccBillingType = (typeof ACC_BILLING_TYPES)[number];

/** Billing basis recorded on an individual invoice. */
export const ACC_INVOICE_BILLING_TYPES = ['retainer', 'project', 'hourly', 'other'] as const;
export type AccInvoiceBillingType = (typeof ACC_INVOICE_BILLING_TYPES)[number];

export const ACC_ACCOUNT_TYPES = ['bank', 'stripe', 'card', 'paypal', 'cash', 'other'] as const;
export type AccAccountType = (typeof ACC_ACCOUNT_TYPES)[number];

export const ACC_CATEGORY_TYPES = ['income', 'expense'] as const;
export type AccCategoryType = (typeof ACC_CATEGORY_TYPES)[number];

/** `in` = money received, `out` = money spent. */
export const ACC_TRANSACTION_TYPES = ['in', 'out'] as const;
export type AccTransactionType = (typeof ACC_TRANSACTION_TYPES)[number];

export const ACC_TRANSACTION_SOURCES = ['manual', 'ghl', 'import', 'telegram'] as const;
export type AccTransactionSource = (typeof ACC_TRANSACTION_SOURCES)[number];

export const ACC_INVOICE_STATUSES = ['draft', 'sent', 'paid', 'overdue', 'void'] as const;
export type AccInvoiceStatus = (typeof ACC_INVOICE_STATUSES)[number];

export const ACC_DOMAIN_STATUSES = ['active', 'expired', 'transferred', 'cancelled'] as const;
export type AccDomainStatus = (typeof ACC_DOMAIN_STATUSES)[number];

export const ACC_HOSTING_STATUSES = ['active', 'expired', 'transferred', 'cancelled'] as const;
export type AccHostingStatus = (typeof ACC_HOSTING_STATUSES)[number];

export const ACC_SUBSCRIPTION_STATUSES = ['active', 'paused', 'cancelled'] as const;
export type AccSubscriptionStatus = (typeof ACC_SUBSCRIPTION_STATUSES)[number];

export const ACC_BILLING_CYCLES = ['monthly', 'yearly', 'one_time'] as const;
export type AccBillingCycle = (typeof ACC_BILLING_CYCLES)[number];

export const ACC_NOTIFICATION_CHANNELS = ['telegram', 'email'] as const;
export type AccNotificationChannel = (typeof ACC_NOTIFICATION_CHANNELS)[number];

/** Collections a notification log entry may point at. */
export const ACC_NOTIFICATION_REF_COLLECTIONS = [
  'acc_domains',
  'acc_hostings',
  'acc_subscriptions',
  'acc_invoices',
] as const;
export type AccNotificationRefCollection = (typeof ACC_NOTIFICATION_REF_COLLECTIONS)[number];

// ── Alert thresholds ───────────────────────────────────────────────────────

/** Days before expiry at which a domain/hosting renewal alert fires. */
export const ACC_EXPIRY_ALERT_DAYS = [30, 15, 7] as const;

/** Days before `nextBillingDate` at which a subscription reminder fires. */
export const ACC_SUBSCRIPTION_REMINDER_DAYS = 5 as const;

/** Builds the notification `type` key that keeps alerts de-duplicated. */
export function accExpiryAlertType(kind: 'domain' | 'hosting', days: number): string {
  return `${kind}_expiry_${days}`;
}

export const ACC_NOTIFICATION_TYPE_SUBSCRIPTION_RENEWAL = 'subscription_renewal' as const;
export const ACC_NOTIFICATION_TYPE_INVOICE_OVERDUE = 'invoice_overdue' as const;

// ── Seed data ──────────────────────────────────────────────────────────────

export const ACC_DEFAULT_EXPENSE_CATEGORIES = [
  { name: 'Salary', color: '#ef4444' },
  { name: 'Ads', color: '#f97316' },
  { name: 'Software', color: '#8b5cf6' },
  { name: 'Hosting', color: '#0ea5e9' },
] as const;

export const ACC_DEFAULT_INCOME_CATEGORIES = [
  { name: 'Client Payment', color: '#10b981' },
  { name: 'Other Income', color: '#64748b' },
] as const;
