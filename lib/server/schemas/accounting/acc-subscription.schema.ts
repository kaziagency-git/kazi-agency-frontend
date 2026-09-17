import { z } from 'zod';
import { ACC_BILLING_CYCLES, ACC_SUBSCRIPTION_STATUSES } from '@/lib/accounting/constants';
import { objectIdSchema, nonNegativeCentsSchema, dateSchema } from './acc-common.schema';

export const createAccSubscriptionSchema = z.object({
  toolName: z.string().min(1, 'Tool name is required').max(150),
  plan: z.string().max(120).optional(),
  costCents: nonNegativeCentsSchema,
  billingCycle: z.enum(ACC_BILLING_CYCLES).optional(),
  nextBillingDate: dateSchema.nullable().optional(),
  accountId: objectIdSchema.nullable().optional(),
  isBillableToClient: z.boolean().optional(),
  clientId: objectIdSchema.nullable().optional(),
  status: z.enum(ACC_SUBSCRIPTION_STATUSES).optional(),
  loginEmail: z.string().email('Must be a valid email').nullable().optional(),
  url: z.string().url('Must be a valid URL').max(500).nullable().optional(),
  notes: z.string().max(5000).optional(),
  // Passwords are deliberately absent — this collection never stores them.
});

export const updateAccSubscriptionSchema = createAccSubscriptionSchema
  .partial()
  .extend({ isArchived: z.boolean().optional() });

export type CreateAccSubscriptionInput = z.infer<typeof createAccSubscriptionSchema>;
export type UpdateAccSubscriptionInput = z.infer<typeof updateAccSubscriptionSchema>;
