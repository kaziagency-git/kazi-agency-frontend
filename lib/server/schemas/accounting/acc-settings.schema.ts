import { z } from 'zod';
import { isValidTimeZone, validateAlertDays } from '@/lib/accounting/alert-days';

/**
 * Validation for the `acc_settings` singleton.
 *
 * The day rules are delegated wholesale to `validateAlertDays()` in
 * `lib/accounting/alert-days.ts`, the same function the settings form calls, so
 * the API and the UI cannot drift apart and the admin sees exactly one message
 * per field rather than one from Zod and another from the shared rules.
 *
 * Messages are written to be shown as-is: `accRoute()` prefixes each with its
 * field name, e.g. `Validation error — domainAlertDays: Add at least one day`.
 */

const alertDaysSchema = z
  .array(z.number({ invalid_type_error: 'Each day must be a number' }))
  .superRefine((days, ctx) => {
    const problem = validateAlertDays(days);
    if (problem) ctx.addIssue({ code: z.ZodIssueCode.custom, message: problem });
  });

export const updateAccSettingsSchema = z
  .object({
    domainAlertDays: alertDaysSchema,
    hostingAlertDays: alertDaysSchema,
    subscriptionAlertDays: alertDaysSchema,
    invoiceOverdueAlertDays: alertDaysSchema,
    timezone: z
      .string()
      .min(1, 'Pick a timezone')
      .refine(isValidTimeZone, 'Not a known timezone'),
  })
  .partial()
  .refine((body) => Object.keys(body).length > 0, { message: 'Nothing to update' });

export type UpdateAccSettingsInput = z.infer<typeof updateAccSettingsSchema>;
