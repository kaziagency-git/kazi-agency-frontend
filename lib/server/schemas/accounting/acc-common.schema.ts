import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

/** A Mongo ObjectId in string form. */
export const objectIdSchema = z
  .string()
  .refine((v) => isValidObjectId(v), { message: 'Must be a valid id' });

/** Optional ObjectId that also accepts an explicit null (to clear a link). */
export const nullableObjectIdSchema = objectIdSchema.nullable();

/** Integer cents. Floats are rejected rather than silently rounded. */
export const centsSchema = z
  .number()
  .int('Must be an integer number of cents')
  .max(Number.MAX_SAFE_INTEGER);

export const positiveCentsSchema = centsSchema.min(1, 'Must be greater than zero');
export const nonNegativeCentsSchema = centsSchema.min(0, 'Cannot be negative');

/** Accepts an ISO string or a Date and yields a Date. */
export const dateSchema = z.coerce.date();

/** Shared list-query parameters. Values arrive as strings from the URL. */
export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(20),
  sortBy: z.string().optional(),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
  from: z.string().optional(),
  to: z.string().optional(),
  search: z.string().optional(),
  includeArchived: z.coerce.boolean().default(false),
  includeInactive: z.coerce.boolean().default(false),
});

export type ListQuery = z.infer<typeof listQuerySchema>;
