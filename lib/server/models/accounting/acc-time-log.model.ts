import mongoose, { Document, Schema, Types } from 'mongoose';
import { centsField } from './acc-fields';

/** Billable hours for hourly clients. */
export interface IAccTimeLog extends Document {
  clientId: Types.ObjectId;
  date: Date;
  hours: number;
  description: string;
  rateCents: number;
  invoiced: boolean;
  invoiceId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const accTimeLogSchema = new Schema<IAccTimeLog>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    date: { type: Date, required: true, index: true },
    hours: { type: Number, required: true, min: 0 },
    description: { type: String, default: '', maxlength: 2000 },
    // Snapshot of the client's hourly rate when the entry was logged, so a
    // later rate change never rewrites the value of past work.
    rateCents: centsField({ required: true, min: 0 }),
    invoiced: { type: Boolean, default: false, index: true },
    invoiceId: { type: Schema.Types.ObjectId, ref: 'AccInvoice', default: null },
  },
  { timestamps: true, collection: 'acc_time_logs' }
);

export const AccTimeLog: mongoose.Model<IAccTimeLog> =
  (mongoose.models.AccTimeLog as mongoose.Model<IAccTimeLog>) ??
  mongoose.model<IAccTimeLog>('AccTimeLog', accTimeLogSchema);
