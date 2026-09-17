import { z } from 'zod';
import { ACC_HOSTING_STATUSES } from '@/lib/accounting/constants';
import { objectIdSchema, nonNegativeCentsSchema, dateSchema } from './acc-common.schema';

export const createAccHostingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(150),
  clientId: objectIdSchema.nullable().optional(),
  provider: z.string().max(120).optional(),
  plan: z.string().max(120).optional(),
  relatedDomains: z.array(z.string().max(253)).max(200).optional(),
  startDate: dateSchema.nullable().optional(),
  expiryDate: dateSchema,
  costCents: nonNegativeCentsSchema.optional(),
  chargeCents: nonNegativeCentsSchema.optional(),
  autoRenew: z.boolean().optional(),
  status: z.enum(ACC_HOSTING_STATUSES).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateAccHostingSchema = createAccHostingSchema
  .partial()
  .extend({ isArchived: z.boolean().optional() });

export type CreateAccHostingInput = z.infer<typeof createAccHostingSchema>;
export type UpdateAccHostingInput = z.infer<typeof updateAccHostingSchema>;
