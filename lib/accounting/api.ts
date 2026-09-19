import { getToken, getRefreshToken, setTokens, clearTokens } from '@/lib/admin-auth';
import {
  AccAccountType,
  AccBillingCycle,
  AccBillingType,
  AccCategoryType,
  AccDomainStatus,
  AccHostingStatus,
  AccInvoiceBillingType,
  AccInvoiceStatus,
  AccSubscriptionStatus,
  AccTransactionSource,
  AccTransactionType,
} from './constants';

/**
 * Browser-side client for `/api/accounting/*`.
 *
 * Reuses the admin token helpers from `lib/admin-auth.ts` (same session as the
 * rest of the dashboard) and unwraps the module's `{ success, data, error }`
 * envelope, so callers just get `data` or a thrown Error.
 */

const BASE = '/api/accounting';

// ── Shared shapes ──────────────────────────────────────────────────────────

/** A populated `clientId` comes back as an object, otherwise an id or null. */
export type ClientRef = { _id: string; name: string; email?: string; company?: string; status?: string } | string | null;

export interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AccAccount {
  _id: string;
  name: string;
  type: AccAccountType;
  last4: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccCategory {
  _id: string;
  name: string;
  type: AccCategoryType;
  color: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccClientProfile {
  _id: string;
  clientId: ClientRef;
  billingType: AccBillingType;
  monthlyFeeCents: number;
  hourlyRateCents: number;
  billingDayOfMonth: number;
  ghlContactId: string | null;
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccTransaction {
  _id: string;
  date: string;
  type: AccTransactionType;
  amountCents: number;
  categoryId: { _id: string; name: string; type: AccCategoryType; color: string | null } | string | null;
  accountId: { _id: string; name: string; type: AccAccountType; last4: string | null } | string | null;
  clientId: ClientRef;
  vendor: string;
  description: string;
  receiptUrl: string | null;
  source: AccTransactionSource;
  externalId: string | null;
  invoiceId: string | null;
  subscriptionId: string | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccInvoice {
  _id: string;
  clientId: ClientRef;
  ghlInvoiceId: string | null;
  invoiceNumber: string;
  billingType: AccInvoiceBillingType;
  title: string;
  amountCents: number;
  issueDate: string;
  dueDate: string | null;
  status: AccInvoiceStatus;
  paidAt: string | null;
  paidAmountCents: number;
  milestoneLabel: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccTimeLog {
  _id: string;
  clientId: ClientRef;
  date: string;
  hours: number;
  description: string;
  rateCents: number;
  invoiced: boolean;
  invoiceId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AccDomain {
  _id: string;
  domain: string;
  clientId: ClientRef;
  registrar: string;
  purchaseDate: string | null;
  expiryDate: string;
  costCents: number;
  chargeCents: number;
  autoRenew: boolean;
  lastVerifiedAt: string | null;
  status: AccDomainStatus;
  notes: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccHosting {
  _id: string;
  name: string;
  clientId: ClientRef;
  provider: string;
  plan: string;
  relatedDomains: string[];
  startDate: string | null;
  expiryDate: string;
  costCents: number;
  chargeCents: number;
  autoRenew: boolean;
  status: AccHostingStatus;
  notes: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccSubscription {
  _id: string;
  toolName: string;
  plan: string;
  costCents: number;
  billingCycle: AccBillingCycle;
  nextBillingDate: string | null;
  autoRenew: boolean;
  accountId: { _id: string; name: string } | string | null;
  isBillableToClient: boolean;
  clientId: ClientRef;
  status: AccSubscriptionStatus;
  loginEmail: string | null;
  url: string | null;
  notes: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Report shapes ──────────────────────────────────────────────────────────

export interface SummaryReport {
  from: string | null;
  to: string | null;
  totalIncomeCents: number;
  totalExpenseCents: number;
  netProfitCents: number;
  transactionCount: number;
  byCategory: {
    categoryId: string | null;
    name: string;
    type: AccCategoryType;
    color: string | null;
    totalCents: number;
    count: number;
  }[];
  byClient: {
    clientId: string;
    name: string;
    company: string;
    incomeCents: number;
    expenseCents: number;
    netCents: number;
    count: number;
  }[];
}

export interface MonthlyReport {
  year: number;
  timezone: string;
  months: { month: number; label: string; incomeCents: number; expenseCents: number; netCents: number }[];
  totalIncomeCents: number;
  totalExpenseCents: number;
  netProfitCents: number;
}

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

export interface SubscriptionTotalsReport {
  monthlyEquivalentCents: number;
  yearlyTotalCents: number;
  byCycle: { billingCycle: string; totalCents: number; count: number; monthlyEquivalentCents: number }[];
  billableToClientsCents: number;
  agencyOwnCents: number;
  oneTimeTotalCents: number;
  activeCount: number;
}

// ── Fetch plumbing ─────────────────────────────────────────────────────────

interface Envelope<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

/** Mirrors the refresh dance in `lib/admin-api.ts` so a 401 is retried once. */
async function attemptRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;

    const body = await res.json();
    const accessToken: string | undefined = body.data?.accessToken;
    if (!accessToken) return false;

    setTokens(accessToken, refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function accFetch<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 401 && !isRetry) {
    if (await attemptRefresh()) return accFetch<T>(path, init, true);
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  const body = (await res.json().catch(() => null)) as Envelope<T> | null;

  if (!res.ok || !body?.success) {
    throw new Error(body?.error ?? `Request failed (${res.status})`);
  }

  return body.data as T;
}

/** Drops empty values so they do not become `?status=` in the URL. */
export function toQuery(params: Record<string, string | number | boolean | undefined | null>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '' || value === 'all') continue;
    qs.set(key, String(value));
  }
  const str = qs.toString();
  return str ? `?${str}` : '';
}

export type ListParams = Record<string, string | number | boolean | undefined | null>;

/** Builds the five calls every accounting resource exposes. */
function resource<T, TInput>(path: string) {
  return {
    list: (params: ListParams = {}) => accFetch<Paged<T>>(`/${path}${toQuery(params)}`),
    get: (id: string) => accFetch<T>(`/${path}/${id}`),
    create: (body: TInput) => accFetch<T>(`/${path}`, { method: 'POST', body: JSON.stringify(body) }),
    update: (id: string, body: Partial<TInput>) =>
      accFetch<T>(`/${path}/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id: string) => accFetch<{ id: string }>(`/${path}/${id}`, { method: 'DELETE' }),
  };
}

// ── Resource inputs ────────────────────────────────────────────────────────

export interface AccAccountInput {
  name: string;
  type: AccAccountType;
  last4?: string | null;
  isActive?: boolean;
}

export interface AccCategoryInput {
  name: string;
  type: AccCategoryType;
  color?: string | null;
  isActive?: boolean;
}

export interface AccClientProfileInput {
  clientId: string;
  billingType: AccBillingType;
  monthlyFeeCents?: number;
  hourlyRateCents?: number;
  billingDayOfMonth?: number;
  ghlContactId?: string | null;
  notes?: string;
  isActive?: boolean;
}

export interface AccTransactionInput {
  date: string;
  type: AccTransactionType;
  amountCents: number;
  categoryId: string;
  accountId?: string | null;
  clientId?: string | null;
  vendor?: string;
  description?: string;
  receiptUrl?: string | null;
  source?: AccTransactionSource;
}

export interface AccInvoiceInput {
  clientId: string;
  invoiceNumber: string;
  billingType?: AccInvoiceBillingType;
  title?: string;
  amountCents: number;
  issueDate: string;
  dueDate?: string | null;
  status?: AccInvoiceStatus;
  paidAt?: string | null;
  paidAmountCents?: number;
  milestoneLabel?: string | null;
  notes?: string;
}

export interface AccTimeLogInput {
  clientId: string;
  date: string;
  hours: number;
  description?: string;
  rateCents?: number;
  invoiced?: boolean;
}

export interface AccDomainInput {
  domain: string;
  clientId?: string | null;
  registrar?: string;
  purchaseDate?: string | null;
  expiryDate: string;
  costCents?: number;
  chargeCents?: number;
  autoRenew?: boolean;
  status?: AccDomainStatus;
  notes?: string;
}

export interface AccHostingInput {
  name: string;
  clientId?: string | null;
  provider?: string;
  plan?: string;
  relatedDomains?: string[];
  startDate?: string | null;
  expiryDate: string;
  costCents?: number;
  chargeCents?: number;
  autoRenew?: boolean;
  status?: AccHostingStatus;
  notes?: string;
}

export interface AccSubscriptionInput {
  toolName: string;
  plan?: string;
  costCents: number;
  billingCycle?: AccBillingCycle;
  nextBillingDate?: string | null;
  autoRenew?: boolean;
  accountId?: string | null;
  isBillableToClient?: boolean;
  clientId?: string | null;
  status?: AccSubscriptionStatus;
  loginEmail?: string | null;
  url?: string | null;
  notes?: string;
}

// ── Public API ─────────────────────────────────────────────────────────────

export const accountsApi = resource<AccAccount, AccAccountInput>('accounts');
export const categoriesApi = resource<AccCategory, AccCategoryInput>('categories');
export const clientProfilesApi = resource<AccClientProfile, AccClientProfileInput>('client-profiles');
export const transactionsApi = resource<AccTransaction, AccTransactionInput>('transactions');
export const invoicesApi = resource<AccInvoice, AccInvoiceInput>('invoices');
export const timeLogsApi = resource<AccTimeLog, AccTimeLogInput>('time-logs');
export const domainsApi = resource<AccDomain, AccDomainInput>('domains');
export const hostingsApi = resource<AccHosting, AccHostingInput>('hostings');
export const subscriptionsApi = resource<AccSubscription, AccSubscriptionInput>('subscriptions');

export const reportsApi = {
  summary: (params: { from?: string; to?: string } = {}) =>
    accFetch<SummaryReport>(`/reports/summary${toQuery(params)}`),
  monthly: (year: number) => accFetch<MonthlyReport>(`/reports/monthly${toQuery({ year })}`),
  upcoming: (days = 30) => accFetch<UpcomingReport>(`/reports/upcoming${toQuery({ days })}`),
  subscriptionTotals: () => accFetch<SubscriptionTotalsReport>('/reports/subscriptions-total'),
};

export const seedApi = {
  run: () =>
    accFetch<{ created: string[]; existing: string[] }>('/seed', { method: 'POST' }),
};

// ── Helpers for populated refs ─────────────────────────────────────────────

export function refId(value: ClientRef | { _id: string } | string | null): string | null {
  if (!value) return null;
  return typeof value === 'string' ? value : value._id;
}

export function refName(value: ClientRef, fallback = '—'): string {
  if (!value || typeof value === 'string') return fallback;
  return value.name || fallback;
}

export function categoryName(value: AccTransaction['categoryId'], fallback = '—'): string {
  if (!value || typeof value === 'string') return fallback;
  return value.name || fallback;
}

export function categoryColor(value: AccTransaction['categoryId']): string | null {
  if (!value || typeof value === 'string') return null;
  return value.color ?? null;
}

export function accountName(value: AccTransaction['accountId'], fallback = '—'): string {
  if (!value || typeof value === 'string') return fallback;
  return value.name || fallback;
}
