import 'server-only';
import { Model } from 'mongoose';
import { AccResourceConfig } from '@/lib/accounting/crud';
import {
  AccAccount,
  AccCategory,
  AccClientProfile,
  AccDomain,
  AccHosting,
  AccInvoice,
  AccSubscription,
  AccTimeLog,
  AccTransaction,
} from '../../models/accounting';
import {
  createAccAccountSchema,
  updateAccAccountSchema,
} from '../../schemas/accounting/acc-account.schema';
import {
  createAccCategorySchema,
  updateAccCategorySchema,
} from '../../schemas/accounting/acc-category.schema';
import {
  createAccClientProfileSchema,
  updateAccClientProfileSchema,
} from '../../schemas/accounting/acc-client-profile.schema';
import {
  createAccDomainSchema,
  updateAccDomainSchema,
} from '../../schemas/accounting/acc-domain.schema';
import {
  createAccHostingSchema,
  updateAccHostingSchema,
} from '../../schemas/accounting/acc-hosting.schema';
import {
  createAccInvoiceSchema,
  updateAccInvoiceSchema,
} from '../../schemas/accounting/acc-invoice.schema';
import {
  createAccSubscriptionSchema,
  updateAccSubscriptionSchema,
} from '../../schemas/accounting/acc-subscription.schema';
import {
  createAccTimeLogSchema,
  updateAccTimeLogSchema,
} from '../../schemas/accounting/acc-time-log.schema';
import {
  createAccTransactionSchema,
  updateAccTransactionSchema,
} from '../../schemas/accounting/acc-transaction.schema';

/**
 * Per-resource CRUD configuration consumed by `collectionHandlers()` and
 * `itemHandlers()`. Keeping every config in one file makes the filter and
 * sort surface of the whole module reviewable at a glance.
 */

// The CRUD helper is deliberately model-agnostic; each concrete model is
// narrowed back to the shared shape here rather than in every route file.
const asModel = (model: unknown) => model as Model<Record<string, unknown>>;

/** Client fields safe to expose alongside accounting rows. */
const CLIENT_POPULATE = { path: 'clientId', select: 'name email company status' } as const;

export const accountsResource: AccResourceConfig = {
  label: 'Account',
  model: asModel(AccAccount),
  createSchema: createAccAccountSchema,
  updateSchema: updateAccAccountSchema,
  dateField: 'createdAt',
  defaultSortBy: 'name',
  sortable: ['name', 'type', 'createdAt', 'updatedAt'],
  stringFilters: ['type'],
  booleanFilters: ['isActive'],
  searchable: ['name'],
  softDelete: { field: 'isActive', value: false },
};

export const categoriesResource: AccResourceConfig = {
  label: 'Category',
  model: asModel(AccCategory),
  createSchema: createAccCategorySchema,
  updateSchema: updateAccCategorySchema,
  dateField: 'createdAt',
  defaultSortBy: 'name',
  sortable: ['name', 'type', 'createdAt', 'updatedAt'],
  stringFilters: ['type'],
  booleanFilters: ['isActive'],
  searchable: ['name'],
  softDelete: { field: 'isActive', value: false },
};

export const clientProfilesResource: AccResourceConfig = {
  label: 'Client profile',
  model: asModel(AccClientProfile),
  createSchema: createAccClientProfileSchema,
  updateSchema: updateAccClientProfileSchema,
  dateField: 'createdAt',
  defaultSortBy: 'createdAt',
  sortable: ['createdAt', 'updatedAt', 'billingType', 'monthlyFeeCents', 'hourlyRateCents'],
  objectIdFilters: ['clientId'],
  stringFilters: ['billingType'],
  booleanFilters: ['isActive'],
  searchable: ['ghlContactId', 'notes'],
  softDelete: { field: 'isActive', value: false },
  populate: [CLIENT_POPULATE],
};

export const transactionsResource: AccResourceConfig = {
  label: 'Transaction',
  model: asModel(AccTransaction),
  createSchema: createAccTransactionSchema,
  updateSchema: updateAccTransactionSchema,
  dateField: 'date',
  defaultSortBy: 'date',
  sortable: ['date', 'amountCents', 'type', 'createdAt', 'updatedAt'],
  objectIdFilters: ['categoryId', 'clientId', 'accountId', 'invoiceId', 'subscriptionId'],
  stringFilters: ['type', 'source'],
  booleanFilters: ['isArchived'],
  searchable: ['vendor', 'description'],
  softDelete: { field: 'isArchived', value: true },
  populate: [
    CLIENT_POPULATE,
    { path: 'categoryId', select: 'name type color' },
    { path: 'accountId', select: 'name type last4' },
  ],
};

export const invoicesResource: AccResourceConfig = {
  label: 'Invoice',
  model: asModel(AccInvoice),
  createSchema: createAccInvoiceSchema,
  updateSchema: updateAccInvoiceSchema,
  dateField: 'issueDate',
  defaultSortBy: 'issueDate',
  sortable: ['issueDate', 'dueDate', 'amountCents', 'status', 'createdAt', 'updatedAt'],
  objectIdFilters: ['clientId'],
  stringFilters: ['status', 'billingType'],
  searchable: ['invoiceNumber', 'title', 'milestoneLabel'],
  // DELETE voids an invoice rather than archiving it — "void" is the real
  // accounting state, and void invoices must stay visible in listings.
  softDelete: { field: 'status', value: 'void' },
  hideRetiredByDefault: false,
  populate: [CLIENT_POPULATE],
};

export const timeLogsResource: AccResourceConfig = {
  label: 'Time log',
  model: asModel(AccTimeLog),
  createSchema: createAccTimeLogSchema,
  updateSchema: updateAccTimeLogSchema,
  dateField: 'date',
  defaultSortBy: 'date',
  sortable: ['date', 'hours', 'createdAt', 'updatedAt'],
  objectIdFilters: ['clientId', 'invoiceId'],
  booleanFilters: ['invoiced'],
  searchable: ['description'],
  // No archive field on this model: an unbilled entry logged by mistake is
  // removed outright.
  softDelete: null,
  populate: [CLIENT_POPULATE],
};

export const domainsResource: AccResourceConfig = {
  label: 'Domain',
  model: asModel(AccDomain),
  createSchema: createAccDomainSchema,
  updateSchema: updateAccDomainSchema,
  dateField: 'expiryDate',
  defaultSortBy: 'expiryDate',
  sortable: ['expiryDate', 'domain', 'purchaseDate', 'costCents', 'createdAt', 'updatedAt'],
  objectIdFilters: ['clientId'],
  stringFilters: ['status', 'registrar'],
  booleanFilters: ['autoRenew', 'isArchived'],
  searchable: ['domain', 'notes'],
  softDelete: { field: 'isArchived', value: true },
  populate: [CLIENT_POPULATE],
};

export const hostingsResource: AccResourceConfig = {
  label: 'Hosting',
  model: asModel(AccHosting),
  createSchema: createAccHostingSchema,
  updateSchema: updateAccHostingSchema,
  dateField: 'expiryDate',
  defaultSortBy: 'expiryDate',
  sortable: ['expiryDate', 'name', 'startDate', 'costCents', 'createdAt', 'updatedAt'],
  objectIdFilters: ['clientId'],
  stringFilters: ['status', 'provider'],
  booleanFilters: ['autoRenew', 'isArchived'],
  searchable: ['name', 'plan', 'relatedDomains', 'notes'],
  softDelete: { field: 'isArchived', value: true },
  populate: [CLIENT_POPULATE],
};

export const subscriptionsResource: AccResourceConfig = {
  label: 'Subscription',
  model: asModel(AccSubscription),
  createSchema: createAccSubscriptionSchema,
  updateSchema: updateAccSubscriptionSchema,
  dateField: 'nextBillingDate',
  defaultSortBy: 'nextBillingDate',
  sortable: ['nextBillingDate', 'toolName', 'costCents', 'createdAt', 'updatedAt'],
  objectIdFilters: ['clientId', 'accountId'],
  stringFilters: ['status', 'billingCycle'],
  booleanFilters: ['isBillableToClient', 'isArchived'],
  searchable: ['toolName', 'plan', 'notes'],
  softDelete: { field: 'isArchived', value: true },
  populate: [CLIENT_POPULATE, { path: 'accountId', select: 'name type last4' }],
};
