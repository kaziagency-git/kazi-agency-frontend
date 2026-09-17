import { combineReducers } from '@reduxjs/toolkit';
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
  accountsApi,
  categoriesApi,
  clientProfilesApi,
  domainsApi,
  hostingsApi,
  invoicesApi,
  subscriptionsApi,
  timeLogsApi,
  transactionsApi,
} from '@/lib/accounting/api';
import { createListSlice } from './createListSlice';
import referenceReducer from './referenceSlice';

/**
 * All accounting state lives under a single `accounting` key in the store, so
 * wiring the module into `store/index.ts` is one reducer, not nine.
 */

const accounts = createListSlice<AccAccount>('accounts', accountsApi.list);
const categories = createListSlice<AccCategory>('categories', categoriesApi.list);
const clientProfiles = createListSlice<AccClientProfile>('clientProfiles', clientProfilesApi.list);
const transactions = createListSlice<AccTransaction>('transactions', transactionsApi.list);
const invoices = createListSlice<AccInvoice>('invoices', invoicesApi.list);
const timeLogs = createListSlice<AccTimeLog>('timeLogs', timeLogsApi.list);
const domains = createListSlice<AccDomain>('domains', domainsApi.list);
const hostings = createListSlice<AccHosting>('hostings', hostingsApi.list);
const subscriptions = createListSlice<AccSubscription>('subscriptions', subscriptionsApi.list);

export const fetchAccAccounts = accounts.fetchList;
export const fetchAccCategories = categories.fetchList;
export const fetchAccClientProfiles = clientProfiles.fetchList;
export const fetchAccTransactions = transactions.fetchList;
export const fetchAccInvoices = invoices.fetchList;
export const fetchAccTimeLogs = timeLogs.fetchList;
export const fetchAccDomains = domains.fetchList;
export const fetchAccHostings = hostings.fetchList;
export const fetchAccSubscriptions = subscriptions.fetchList;

export const accountingReducer = combineReducers({
  reference: referenceReducer,
  accounts: accounts.reducer,
  categories: categories.reducer,
  clientProfiles: clientProfiles.reducer,
  transactions: transactions.reducer,
  invoices: invoices.reducer,
  timeLogs: timeLogs.reducer,
  domains: domains.reducer,
  hostings: hostings.reducer,
  subscriptions: subscriptions.reducer,
});

export default accountingReducer;
export { fetchAccReference } from './referenceSlice';
