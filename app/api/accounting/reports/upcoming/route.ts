import { accOk, accFail } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { searchParams } from '@/lib/server/http';
import { getUpcomingReport } from '@/lib/server/services/accounting/report.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = accRoute(async (req) => {
  requireAdmin(req);

  const raw = searchParams(req).get('days');
  const days = raw ? Number(raw) : 30;

  if (!Number.isInteger(days) || days < 1 || days > 365) {
    return accFail('days must be an integer between 1 and 365', 400);
  }

  return accOk(await getUpcomingReport(days));
});
