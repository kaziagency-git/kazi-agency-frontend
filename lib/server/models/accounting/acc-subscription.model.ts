import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_BILLING_CYCLES,
  ACC_SUBSCRIPTION_STATUSES,
  AccBillingCycle,
  AccSubscriptionStatus,
} from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/**
 * A recurring tool/software cost.
 *
 * NOTE: this collection never stores passwords or API keys — `loginEmail` is
 * kept only so the right mailbox can be checked at renewal time.
 */
export interface IAccSubscription extends Document {
  toolName: string;
  plan: string;
  costCents: number;
  billingCycle: AccBillingCycle;
  nextBillingDate: Date | null;
  accountId: Types.ObjectId | null;
  isBillableToClient: boolean;
  clientId: Types.ObjectId | null;
  status: AccSubscriptionStatus;
  loginEmail: string | null;
  url: string | null;
  notes: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accSubscriptionSchema = new Schema<IAccSubscription>(
  {
    toolName: { type: String, required: true, trim: true, maxlength: 150 },
    plan: { type: String, default: '', trim: true, maxlength: 120 },
    costCents: centsField({ required: true, min: 0 }),
    billingCycle: {
      type: String,
      enum: [...ACC_BILLING_CYCLES],
      default: 'monthly',
      index: true,
    },
    // Null for a one_time purchase that will not renew.
    nextBillingDate: { type: Date, default: null, index: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'AccAccount', default: null },
    isBillableToClient: { type: Boolean, default: false },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', default: null, index: true },
    status: {
      type: String,
      enum: [...ACC_SUBSCRIPTION_STATUSES],
      default: 'active',
      index: true,
    },
    loginEmail: { type: String, default: null, lowercase: true, trim: true },
    url: { type: String, default: null, trim: true },
    notes: { type: String, default: '', maxlength: 5000 },
    isArchived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: 'acc_subscriptions' }
);

export const AccSubscription: mongoose.Model<IAccSubscription> =
  (mongoose.models.AccSubscription as mongoose.Model<IAccSubscription>) ??
  mongoose.model<IAccSubscription>('AccSubscription', accSubscriptionSchema);
