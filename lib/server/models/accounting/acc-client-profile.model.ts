import mongoose, { Document, Schema, Types } from 'mongoose';
import { ACC_BILLING_TYPES, AccBillingType } from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/**
 * Billing details for an existing client.
 *
 * The Client model is NOT extended: this collection holds the accounting-only
 * fields and points at the client through its existing `_id`.
 */
export interface IAccClientProfile extends Document {
  clientId: Types.ObjectId;
  billingType: AccBillingType;
  monthlyFeeCents: number;
  hourlyRateCents: number;
  billingDayOfMonth: number;
  ghlContactId: string | null;
  notes: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accClientProfileSchema = new Schema<IAccClientProfile>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
      unique: true,
    },
    billingType: {
      type: String,
      enum: [...ACC_BILLING_TYPES],
      required: true,
      index: true,
    },
    monthlyFeeCents: centsField(),
    hourlyRateCents: centsField(),
    // Capped at 28 so a monthly cycle lands on a real date in February too.
    billingDayOfMonth: { type: Number, default: 1, min: 1, max: 28 },
    ghlContactId: { type: String, default: null, trim: true },
    notes: { type: String, default: '', maxlength: 5000 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: 'acc_client_profiles' }
);

// Sparse-by-predicate: many profiles may have no GHL contact yet, but a given
// GHL contact must not map to two clients.
accClientProfileSchema.index(
  { ghlContactId: 1 },
  { unique: true, partialFilterExpression: { ghlContactId: { $type: 'string' } } }
);

export const AccClientProfile: mongoose.Model<IAccClientProfile> =
  (mongoose.models.AccClientProfile as mongoose.Model<IAccClientProfile>) ??
  mongoose.model<IAccClientProfile>('AccClientProfile', accClientProfileSchema);
