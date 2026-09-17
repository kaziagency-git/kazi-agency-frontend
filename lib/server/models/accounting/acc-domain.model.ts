import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_DEFAULT_REGISTRAR,
  ACC_DOMAIN_STATUSES,
  AccDomainStatus,
} from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/**
 * A registered domain. `clientId: null` means the agency owns it;
 * `costCents` is what we pay the registrar, `chargeCents` what the client pays.
 */
export interface IAccDomain extends Document {
  domain: string;
  clientId: Types.ObjectId | null;
  registrar: string;
  purchaseDate: Date | null;
  expiryDate: Date;
  costCents: number;
  chargeCents: number;
  autoRenew: boolean;
  lastVerifiedAt: Date | null;
  status: AccDomainStatus;
  notes: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accDomainSchema = new Schema<IAccDomain>(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 253,
    },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', default: null, index: true },
    registrar: { type: String, default: ACC_DEFAULT_REGISTRAR, trim: true, maxlength: 120 },
    purchaseDate: { type: Date, default: null },
    expiryDate: { type: Date, required: true, index: true },
    costCents: centsField(),
    chargeCents: centsField(),
    autoRenew: { type: Boolean, default: true },
    // Set when the expiry date was last confirmed against the registrar.
    lastVerifiedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: [...ACC_DOMAIN_STATUSES],
      default: 'active',
      index: true,
    },
    notes: { type: String, default: '', maxlength: 5000 },
    isArchived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: 'acc_domains' }
);

export const AccDomain: mongoose.Model<IAccDomain> =
  (mongoose.models.AccDomain as mongoose.Model<IAccDomain>) ??
  mongoose.model<IAccDomain>('AccDomain', accDomainSchema);
