import { accOk, accFail } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireAdmin } from '@/lib/server/auth';
import { searchParams } from '@/lib/server/http';
import { getMonthlyReport } from '@/lib/server/services/accounting/report.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = accRoute(async (req) => {
  requireAdmin(req);

  const raw = searchParams(req).get('year');
  const year = raw ? Number(raw) : new Date().getUTCFullYear();

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return accFail('year must be an integer between 2000 and 2100', 400);
  }

  return accOk(await getMonthlyReport(year));
});
