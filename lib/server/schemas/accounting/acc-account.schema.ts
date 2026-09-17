import { z } from 'zod';
import { ACC_ACCOUNT_TYPES } from '@/lib/accounting/constants';

export const createAccAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  type: z.enum(ACC_ACCOUNT_TYPES),
  last4: z.string().regex(/^\d{4}$/, 'last4 must be exactly 4 digits').nullable().optional(),
  isActive: z.boolean().optional(),
});

export const updateAccAccountSchema = createAccAccountSchema.partial();

export type CreateAccAccountInput = z.infer<typeof createAccAccountSchema>;
export type UpdateAccAccountInput = z.infer<typeof updateAccAccountSchema>;
