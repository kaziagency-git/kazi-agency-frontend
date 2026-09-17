import mongoose, { Document, Schema, Types } from 'mongoose';
import {
  ACC_NOTIFICATION_CHANNELS,
  ACC_NOTIFICATION_REF_COLLECTIONS,
  AccNotificationChannel,
  AccNotificationRefCollection,
} from '@/lib/accounting/constants';

/**
 * One row per alert actually delivered. n8n writes here after sending, and the
 * unique index below is what stops a re-run from alerting the same expiry twice.
 */
export interface IAccNotificationLog extends Document {
  type: string;
  refCollection: AccNotificationRefCollection;
  refId: Types.ObjectId;
  channel: AccNotificationChannel;
  sentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const accNotificationLogSchema = new Schema<IAccNotificationLog>(
  {
    // e.g. domain_expiry_30, hosting_expiry_7, subscription_renewal,
    // invoice_overdue — built by accExpiryAlertType() and friends.
    type: { type: String, required: true, trim: true, maxlength: 80, index: true },
    refCollection: {
      type: String,
      enum: [...ACC_NOTIFICATION_REF_COLLECTIONS],
      required: true,
    },
    refId: { type: Schema.Types.ObjectId, required: true, index: true },
    channel: { type: String, enum: [...ACC_NOTIFICATION_CHANNELS], required: true },
    sentAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true, collection: 'acc_notification_logs' }
);

accNotificationLogSchema.index({ type: 1, refId: 1, channel: 1 }, { unique: true });

export const AccNotificationLog: mongoose.Model<IAccNotificationLog> =
  (mongoose.models.AccNotificationLog as mongoose.Model<IAccNotificationLog>) ??
  mongoose.model<IAccNotificationLog>('AccNotificationLog', accNotificationLogSchema);
