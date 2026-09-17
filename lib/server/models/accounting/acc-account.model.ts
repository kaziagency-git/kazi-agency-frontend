import mongoose, { Document, Schema } from 'mongoose';
import { ACC_ACCOUNT_TYPES, AccAccountType } from '@/lib/accounting/constants';

/**
 * A payment account (Bank, Stripe, Card, PayPal, …). Editable from the UI —
 * the list is deliberately not hard-coded anywhere.
 */
export interface IAccAccount extends Document {
  name: string;
  type: AccAccountType;
  last4: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accAccountSchema = new Schema<IAccAccount>(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    type: { type: String, enum: [...ACC_ACCOUNT_TYPES], required: true, index: true },
    // Display aid only — never a full card number.
    last4: {
      type: String,
      default: null,
      trim: true,
      match: [/^\d{4}$/, 'last4 must be exactly 4 digits'],
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: 'acc_accounts' }
);

export const AccAccount: mongoose.Model<IAccAccount> =
  (mongoose.models.AccAccount as mongoose.Model<IAccAccount>) ??
  mongoose.model<IAccAccount>('AccAccount', accAccountSchema);
