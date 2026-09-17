import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_TRANSACTION_TYPES,
  ACC_TRANSACTION_SOURCES,
  AccTransactionType,
  AccTransactionSource,
} from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/** A single money movement. `in` = received, `out` = spent. Stored in UTC. */
export interface IAccTransaction extends Document {
  date: Date;
  type: AccTransactionType;
  amountCents: number;
  categoryId: Types.ObjectId;
  accountId: Types.ObjectId | null;
  clientId: Types.ObjectId | null;
  vendor: string;
  description: string;
  receiptUrl: string | null;
  source: AccTransactionSource;
  externalId: string | null;
  invoiceId: Types.ObjectId | null;
  subscriptionId: Types.ObjectId | null;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accTransactionSchema = new Schema<IAccTransaction>(
  {
    date: { type: Date, required: true, index: true },
    type: { type: String, enum: [...ACC_TRANSACTION_TYPES], required: true, index: true },
    amountCents: centsField({ required: true, min: 1 }),
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'AccCategory',
      required: true,
      index: true,
    },
    accountId: { type: Schema.Types.ObjectId, ref: 'AccAccount', default: null },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', default: null, index: true },
    vendor: { type: String, default: '', trim: true, maxlength: 200 },
    description: { type: String, default: '', maxlength: 2000 },
    receiptUrl: { type: String, default: null, trim: true },
    source: {
      type: String,
      enum: [...ACC_TRANSACTION_SOURCES],
      default: 'manual',
      index: true,
    },
    // Upstream id (e.g. a GHL payment id). The unique index below is what
    // makes the n8n payment webhook safe to retry.
    externalId: { type: String, default: null, trim: true },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'AccInvoice', default: null },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'AccSubscription', default: null },
    isArchived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: 'acc_transactions' }
);

// Unique only across documents that actually carry an externalId. A plain
// `sparse` index would not do: `externalId: null` is a stored value, so the
// second manual entry would collide. The $type predicate skips those.
accTransactionSchema.index(
  { externalId: 1 },
  { unique: true, partialFilterExpression: { externalId: { $type: 'string' } } }
);

export const AccTransaction: mongoose.Model<IAccTransaction> =
  (mongoose.models.AccTransaction as mongoose.Model<IAccTransaction>) ??
  mongoose.model<IAccTransaction>('AccTransaction', accTransactionSchema);
