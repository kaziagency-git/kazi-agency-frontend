import { z } from 'zod';
import { ACC_INVOICE_BILLING_TYPES, ACC_INVOICE_STATUSES } from '@/lib/accounting/constants';
import {
  objectIdSchema,
  nonNegativeCentsSchema,
  dateSchema,
} from './acc-common.schema';

export const createAccInvoiceSchema = z.object({
  clientId: objectIdSchema,
  ghlInvoiceId: z.string().max(200).nullable().optional(),
  invoiceNumber: z.string().min(1, 'Invoice number is required').max(60),
  billingType: z.enum(ACC_INVOICE_BILLING_TYPES).optional(),
  title: z.string().max(250).optional(),
  amountCents: nonNegativeCentsSchema,
  issueDate: dateSchema,
  dueDate: dateSchema.nullable().optional(),
  status: z.enum(ACC_INVOICE_STATUSES).optional(),
  paidAt: dateSchema.nullable().optional(),
  paidAmountCents: nonNegativeCentsSchema.optional(),
  milestoneLabel: z.string().max(200).nullable().optional(),
  notes: z.string().max(5000).optional(),
});

export const updateAccInvoiceSchema = createAccInvoiceSchema.partial();

export type CreateAccInvoiceInput = z.infer<typeof createAccInvoiceSchema>;
export type UpdateAccInvoiceInput = z.infer<typeof updateAccInvoiceSchema>;
