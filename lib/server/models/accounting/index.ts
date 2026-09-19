/**
 * Accounting models barrel.
 *
 * Importing this module registers every model the accounting routes need with
 * Mongoose, which matters for `populate()` across the module: a ref is only
 * resolvable once its model file has been evaluated.
 *
 * That includes `Client`, which lives outside this folder but is what every
 * `clientId` here refs. `next dev` shares one module registry across routes, so
 * a miss only shows up in production, where each route is bundled on its own
 * and a `clientId` populate then fails with MissingSchemaError.
 */
// Imported for the side effect rather than re-exported, so no bundler can
// tree-shake the registration away.
import '../client.model';

export { AccAccount, type IAccAccount } from './acc-account.model';
export { AccCategory, type IAccCategory } from './acc-category.model';
export { AccClientProfile, type IAccClientProfile } from './acc-client-profile.model';
export { AccDomain, type IAccDomain } from './acc-domain.model';
export { AccHosting, type IAccHosting } from './acc-hosting.model';
export { AccInvoice, type IAccInvoice } from './acc-invoice.model';
export { AccNotificationLog, type IAccNotificationLog } from './acc-notification-log.model';
export { AccSubscription, type IAccSubscription } from './acc-subscription.model';
export { AccTimeLog, type IAccTimeLog } from './acc-time-log.model';
export { AccTransaction, type IAccTransaction } from './acc-transaction.model';
