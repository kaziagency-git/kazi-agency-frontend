import { z } from 'zod';
import { objectIdSchema, nonNegativeCentsSchema, dateSchema } from './acc-common.schema';

export const createAccTimeLogSchema = z.object({
  clientId: objectIdSchema,
  date: dateSchema,
  hours: z.number().min(0, 'Hours cannot be negative').max(24, 'Use one entry per day'),
  description: z.string().max(2000).optional(),
  // Omitted on create, the client profile's current hourlyRateCents is used.
  rateCents: nonNegativeCentsSchema.optional(),
  invoiced: z.boolean().optional(),
  invoiceId: objectIdSchema.nullable().optional(),
});

export const updateAccTimeLogSchema = createAccTimeLogSchema.omit({ clientId: true }).partial();

export type CreateAccTimeLogInput = z.infer<typeof createAccTimeLogSchema>;
export type UpdateAccTimeLogInput = z.infer<typeof updateAccTimeLogSchema>;
