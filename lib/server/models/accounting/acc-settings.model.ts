import mongoose, { Document, Schema } from 'mongoose';
import {
  ACC_DEFAULT_ALERT_TIMEZONE,
  ACC_DEFAULT_DOMAIN_ALERT_DAYS,
  ACC_DEFAULT_HOSTING_ALERT_DAYS,
  ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS,
  ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS,
} from '@/lib/accounting/constants';
import {
  isValidTimeZone,
  normalizeAlertDays,
  validateAlertDays,
} from '@/lib/accounting/alert-days';

/**
 * Module-wide accounting settings — a singleton, always `_id: "global"`.
 *
 * Kept as one document rather than a row per key so a save is atomic and a
 * read is a single lookup that `getAlertSettings()` can cache wholesale.
 */

export const ACC_SETTINGS_ID = 'global' as const;

export interface IAccSettings extends Document<string> {
  _id: string;
  domainAlertDays: number[];
  hostingAlertDays: number[];
  subscriptionAlertDays: number[];
  invoiceOverdueAlertDays: number[];
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Same rules the API and the form apply, enforced once more at the DB edge. */
function alertDaysField(defaults: readonly number[]) {
  return {
    type: [Number],
    default: () => normalizeAlertDays(defaults),
    // `set` keeps the stored order canonical (descending, no duplicates) no
    // matter which way in the value arrived.
    set: (value: number[]) => (Array.isArray(value) ? normalizeAlertDays(value) : value),
    validate: {
      validator: (value: number[]) => validateAlertDays(value) === null,
      message: (props: { path: string; value: number[] }) =>
        `${props.path}: ${validateAlertDays(props.value) ?? 'invalid'}`,
    },
  };
}

const accSettingsSchema = new Schema<IAccSettings>(
  {
    _id: { type: String, default: ACC_SETTINGS_ID },
    domainAlertDays: alertDaysField(ACC_DEFAULT_DOMAIN_ALERT_DAYS),
    hostingAlertDays: alertDaysField(ACC_DEFAULT_HOSTING_ALERT_DAYS),
    subscriptionAlertDays: alertDaysField(ACC_DEFAULT_SUBSCRIPTION_ALERT_DAYS),
    invoiceOverdueAlertDays: alertDaysField(ACC_DEFAULT_INVOICE_OVERDUE_ALERT_DAYS),
    timezone: {
      type: String,
      default: ACC_DEFAULT_ALERT_TIMEZONE,
      trim: true,
      validate: {
        validator: (value: string) => isValidTimeZone(value),
        message: (props: { value: string }) => `"${props.value}" is not a known timezone`,
      },
    },
  },
  { timestamps: true, collection: 'acc_settings', versionKey: false }
);

export const AccSettings: mongoose.Model<IAccSettings> =
  (mongoose.models.AccSettings as mongoose.Model<IAccSettings>) ??
  mongoose.model<IAccSettings>('AccSettings', accSettingsSchema);
