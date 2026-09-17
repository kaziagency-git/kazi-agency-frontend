import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_INVOICE_BILLING_TYPES,
  ACC_INVOICE_STATUSES,
  AccInvoiceBillingType,
  AccInvoiceStatus,
} from '@/lib/accounting/constants';
import { centsField } from './acc-fields';

/**
 * An invoice. Invoices are authored and sent from GoHighLevel; this is the
 * local mirror that n8n keeps in sync, so `ghlInvoiceId` is the join key.
 */
export interface IAccInvoice extends Document {
  clientId: Types.ObjectId;
  ghlInvoiceId: string | null;
  invoiceNumber: string;
  billingType: AccInvoiceBillingType;
  title: string;
  amountCents: number;
  issueDate: Date;
  dueDate: Date | null;
  status: AccInvoiceStatus;
  paidAt: Date | null;
  paidAmountCents: number;
  milestoneLabel: string | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const accInvoiceSchema = new Schema<IAccInvoice>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    ghlInvoiceId: { type: String, default: null, trim: true },
    invoiceNumber: { type: String, required: true, trim: true, maxlength: 60 },
    billingType: {
      type: String,
      enum: [...ACC_INVOICE_BILLING_TYPES],
      default: 'other',
    },
    title: { type: String, default: '', trim: true, maxlength: 250 },
    amountCents: centsField({ required: true, min: 0 }),
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, default: null, index: true },
    status: {
      type: String,
      enum: [...ACC_INVOICE_STATUSES],
      default: 'draft',
      index: true,
    },
    paidAt: { type: Date, default: null },
    paidAmountCents: centsField(),
    // Used by project-billed clients to name the milestone being invoiced.
    milestoneLabel: { type: String, default: null, trim: true, maxlength: 200 },
    notes: { type: String, default: '', maxlength: 5000 },
  },
  { timestamps: true, collection: 'acc_invoices' }
);

// Keeps the GHL sync idempotent without blocking locally-created invoices,
// which carry no GHL id at all.
accInvoiceSchema.index(
  { ghlInvoiceId: 1 },
  { unique: true, partialFilterExpression: { ghlInvoiceId: { $type: 'string' } } }
);

export const AccInvoice: mongoose.Model<IAccInvoice> =
  (mongoose.models.AccInvoice as mongoose.Model<IAccInvoice>) ??
  mongoose.model<IAccInvoice>('AccInvoice', accInvoiceSchema);
