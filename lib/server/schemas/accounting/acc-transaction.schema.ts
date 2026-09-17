import { z } from 'zod';
import { ACC_TRANSACTION_TYPES, ACC_TRANSACTION_SOURCES } from '@/lib/accounting/constants';
import { objectIdSchema, positiveCentsSchema, dateSchema } from './acc-common.schema';

export const createAccTransactionSchema = z.object({
  date: dateSchema,
  type: z.enum(ACC_TRANSACTION_TYPES),
  amountCents: positiveCentsSchema,
  categoryId: objectIdSchema,
  accountId: objectIdSchema.nullable().optional(),
  clientId: objectIdSchema.nullable().optional(),
  vendor: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  receiptUrl: z.string().url('Must be a valid URL').max(500).nullable().optional(),
  source: z.enum(ACC_TRANSACTION_SOURCES).optional(),
  externalId: z.string().max(200).nullable().optional(),
  invoiceId: objectIdSchema.nullable().optional(),
  subscriptionId: objectIdSchema.nullable().optional(),
});

export const updateAccTransactionSchema = createAccTransactionSchema
  .partial()
  .extend({ isArchived: z.boolean().optional() });

export type CreateAccTransactionInput = z.infer<typeof createAccTransactionSchema>;
export type UpdateAccTransactionInput = z.infer<typeof updateAccTransactionSchema>;
