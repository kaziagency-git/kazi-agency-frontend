import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { seedDefaultCategories } from '@/lib/server/services/accounting/seed.service';
import { seedAlertSettings } from '@/lib/accounting/settings';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Runs the default-category seed and creates the alert-settings singleton.
 * Admin-only and safe to call repeatedly — both seeds are upsert-only and
 * never touch existing rows.
 *
 * The project has no ts-node/tsx, so this route is the seed's runner rather
 * than a standalone script (which would have meant a new dev dependency).
 */
export const POST = accRoute(async (req) => {
  requireAdmin(req);
  // Both seeds are insert-only, so this stays safe to call repeatedly.
  const [categories, settings] = await Promise.all([
    seedDefaultCategories(),
    seedAlertSettings(),
  ]);
  return accOk({ ...categories, settingsCreated: settings.created });
});
