import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_DEFAULT_HOSTING_PROVIDER,
  ACC_HOSTING_STATUSES,
  AccHostingStatus,
} from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/** A hosting plan. `clientId: null` means it is the agency's own. */
export interface IAccHosting extends Document {
  name: string;
  clientId: Types.ObjectId | null;
  provider: string;
  plan: string;
  relatedDomains: string[];
  startDate: Date | null;
  expiryDate: Date;
  costCents: number;
  chargeCents: number;
  autoRenew: boolean;
  status: AccHostingStatus;
  notes: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accHostingSchema = new Schema<IAccHosting>(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', default: null, index: true },
    provider: { type: String, default: ACC_DEFAULT_HOSTING_PROVIDER, trim: true, maxlength: 120 },
    plan: { type: String, default: '', trim: true, maxlength: 120 },
    // Plain hostnames rather than refs: a plan often covers domains we do not
    // manage in acc_domains.
    relatedDomains: { type: [String], default: [] },
    startDate: { type: Date, default: null },
    expiryDate: { type: Date, required: true, index: true },
    costCents: centsField(),
    chargeCents: centsField(),
    autoRenew: { type: Boolean, default: true },
    status: {
      type: String,
      enum: [...ACC_HOSTING_STATUSES],
      default: 'active',
      index: true,
    },
    notes: { type: String, default: '', maxlength: 5000 },
    isArchived: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, collection: 'acc_hostings' }
);

export const AccHosting: mongoose.Model<IAccHosting> =
  (mongoose.models.AccHosting as mongoose.Model<IAccHosting>) ??
  mongoose.model<IAccHosting>('AccHosting', accHostingSchema);
