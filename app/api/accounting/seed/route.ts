import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { seedDefaultCategories } from '@/lib/server/services/accounting/seed.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Runs the default-category seed. Admin-only and safe to call repeatedly —
 * the seed is upsert-only and never touches existing rows.
 *
 * The project has no ts-node/tsx, so this route is the seed's runner rather
 * than a standalone script (which would have meant a new dev dependency).
 */
export const POST = accRoute(async (req) => {
  requireAdmin(req);
  const result = await seedDefaultCategories();
  return accOk(result);
});
