import { z } from 'zod';
import { ACC_BILLING_TYPES } from '@/lib/accounting/constants';
import { objectIdSchema, nonNegativeCentsSchema } from './acc-common.schema';

export const createAccClientProfileSchema = z.object({
  clientId: objectIdSchema,
  billingType: z.enum(ACC_BILLING_TYPES),
  monthlyFeeCents: nonNegativeCentsSchema.optional(),
  hourlyRateCents: nonNegativeCentsSchema.optional(),
  billingDayOfMonth: z.number().int().min(1).max(28).optional(),
  ghlContactId: z.string().max(120).nullable().optional(),
  notes: z.string().max(5000).optional(),
  isActive: z.boolean().optional(),
});

// clientId is the link to the existing Client and is never re-pointed.
export const updateAccClientProfileSchema = createAccClientProfileSchema.omit({ clientId: true }).partial();

export type CreateAccClientProfileInput = z.infer<typeof createAccClientProfileSchema>;
export type UpdateAccClientProfileInput = z.infer<typeof updateAccClientProfileSchema>;
