import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { jsonBody } from '@/lib/server/http';
import { updateAccSettingsSchema } from '@/lib/server/schemas/accounting/acc-settings.schema';
import { getAlertSettings, updateAlertSettings } from '@/lib/accounting/settings';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Reads and writes the configurable alert thresholds.
 *
 * Admin-only, like the rest of the accounting dashboard. `accRoute()` turns a
 * ZodError into `Validation error — domainAlertDays: Add at least one day`,
 * which is what the settings form shows against the offending type.
 */

export const GET = accRoute(async (req) => {
  requireAdmin(req);
  return accOk(await getAlertSettings());
});

export const PUT = accRoute(async (req) => {
  requireAdmin(req);
  const patch = updateAccSettingsSchema.parse(await jsonBody(req));
  return accOk(await updateAlertSettings(patch));
});
