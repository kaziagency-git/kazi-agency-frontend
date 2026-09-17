import { z } from 'zod';
import {
  ACC_NOTIFICATION_CHANNELS,
  ACC_NOTIFICATION_REF_COLLECTIONS,
} from '@/lib/accounting/constants';
import { objectIdSchema, dateSchema } from './acc-common.schema';

/**
 * Payloads for the n8n integration endpoints.
 *
 * These come from outside the app, so money arrives as DOLLARS (that is what
 * GoHighLevel and a Telegram message carry) and is converted to integer cents
 * on the way in by `toCents()`.
 */

/** A dollar amount as sent by an external system. */
const dollarsSchema = z.union([z.number(), z.string()]);

export const ghlPaymentSchema = z.object({
  ghlPaymentId: z.string().min(1, 'ghlPaymentId is required').max(200),
  ghlInvoiceId: z.string().max(200).nullable().optional(),
  ghlContactId: z.string().max(200).nullable().optional(),
  amount: dollarsSchema,
  paidAt: dateSchema.optional(),
  invoiceNumber: z.string().max(60).optional(),
  title: z.string().max(250).optional(),
});

export const ghlInvoiceSchema = z.object({
  ghlInvoiceId: z.string().min(1, 'ghlInvoiceId is required').max(200),
  status: z.enum(['sent', 'void']),
  ghlContactId: z.string().max(200).nullable().optional(),
  clientId: objectIdSchema.optional(),
  invoiceNumber: z.string().max(60).optional(),
  title: z.string().max(250).optional(),
  amount: dollarsSchema.optional(),
  issueDate: dateSchema.optional(),
  dueDate: dateSchema.nullable().optional(),
  billingType: z.enum(['retainer', 'project', 'hourly', 'other']).optional(),
  milestoneLabel: z.string().max(200).nullable().optional(),
});

export const notificationLogSchema = z.object({
  type: z.string().min(1, 'type is required').max(80),
  refCollection: z.enum(ACC_NOTIFICATION_REF_COLLECTIONS),
  refId: objectIdSchema,
  channel: z.enum(ACC_NOTIFICATION_CHANNELS),
  sentAt: dateSchema.optional(),
});

export const telegramExpenseSchema = z.object({
  amount: dollarsSchema,
  category: z.string().min(1, 'category is required').max(80),
  vendor: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  date: dateSchema.optional(),
  accountId: objectIdSchema.nullable().optional(),
});

export const domainVerifySchema = z
  .object({
    // Either identifier works — n8n usually has the hostname, not our id.
    domain: z.string().max(253).optional(),
    id: objectIdSchema.optional(),
    expiryDate: dateSchema,
    status: z.enum(['active', 'expired', 'transferred', 'cancelled']).optional(),
    autoRenew: z.boolean().optional(),
  })
  .refine((v) => Boolean(v.domain || v.id), {
    message: 'Provide either "domain" or "id"',
  });

export const dueAlertsQuerySchema = z.object({
  channel: z.enum(ACC_NOTIFICATION_CHANNELS).default('telegram'),
});

export type GhlPaymentInput = z.infer<typeof ghlPaymentSchema>;
export type GhlInvoiceInput = z.infer<typeof ghlInvoiceSchema>;
export type NotificationLogInput = z.infer<typeof notificationLogSchema>;
export type TelegramExpenseInput = z.infer<typeof telegramExpenseSchema>;
export type DomainVerifyInput = z.infer<typeof domainVerifySchema>;
