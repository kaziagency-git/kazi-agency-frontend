import { z } from 'zod';
import { isValidObjectId } from 'mongoose';
import { parseBoundary } from '@/lib/accounting/date';

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

/**
 * Accepts an ISO string or a Date and yields a Date.
 *
 * A bare `YYYY-MM-DD` — what every `<input type="date">` in the dashboard sends
 * — means that calendar day in the agency's timezone, so it is read as midnight
 * in New York rather than midnight UTC. Stored as UTC midnight it would render
 * as the PREVIOUS day everywhere the books are read (`toYmdNY`, `formatDateNY`),
 * and every edit would round-trip another day off the date.
 */
export const dateSchema = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  try {
    return parseBoundary(value);
  } catch {
    // Leave it be so `z.coerce.date()` reports a validation error, not a throw.
    return value;
  }
}, z.coerce.date());

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
