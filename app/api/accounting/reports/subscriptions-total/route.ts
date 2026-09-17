import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { getSubscriptionTotals } from '@/lib/server/services/accounting/report.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = accRoute(async (req) => {
  requireAdmin(req);
  return accOk(await getSubscriptionTotals());
});
