import { z } from 'zod';
import { ACC_DOMAIN_STATUSES } from '@/lib/accounting/constants';
import { objectIdSchema, nonNegativeCentsSchema, dateSchema } from './acc-common.schema';

export const createAccDomainSchema = z.object({
  domain: z
    .string()
    .min(3, 'Domain is required')
    .max(253)
    .regex(/^[a-z0-9.-]+\.[a-z]{2,}$/i, 'Must be a valid domain name'),
  clientId: objectIdSchema.nullable().optional(),
  registrar: z.string().max(120).optional(),
  purchaseDate: dateSchema.nullable().optional(),
  expiryDate: dateSchema,
  costCents: nonNegativeCentsSchema.optional(),
  chargeCents: nonNegativeCentsSchema.optional(),
  autoRenew: z.boolean().optional(),
  lastVerifiedAt: dateSchema.nullable().optional(),
  status: z.enum(ACC_DOMAIN_STATUSES).optional(),
  notes: z.string().max(5000).optional(),
});

export const updateAccDomainSchema = createAccDomainSchema
  .partial()
  .extend({ isArchived: z.boolean().optional() });

export type CreateAccDomainInput = z.infer<typeof createAccDomainSchema>;
export type UpdateAccDomainInput = z.infer<typeof updateAccDomainSchema>;
