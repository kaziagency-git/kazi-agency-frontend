import { z } from 'zod';
import { ACC_CATEGORY_TYPES } from '@/lib/accounting/constants';

export const createAccCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(80),
  type: z.enum(ACC_CATEGORY_TYPES),
  color: z.string().max(30).nullable().optional(),
  isActive: z.boolean().optional(),
});

// `type` stays editable so a miscategorised row can be corrected, but the
// (name, type) unique index still applies.
export const updateAccCategorySchema = createAccCategorySchema.partial();

export type CreateAccCategoryInput = z.infer<typeof createAccCategorySchema>;
export type UpdateAccCategoryInput = z.infer<typeof updateAccCategorySchema>;
