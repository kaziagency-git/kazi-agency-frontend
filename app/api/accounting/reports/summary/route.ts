import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { parseBoundary } from '@/lib/accounting/date';
import { requireAdmin } from '@/lib/server/auth';
import { searchParams } from '@/lib/server/http';
import { getSummaryReport } from '@/lib/server/services/accounting/report.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = accRoute(async (req) => {
  requireAdmin(req);
  const qs = searchParams(req);

  const from = qs.get('from');
  const to = qs.get('to');

  const report = await getSummaryReport(
    from ? parseBoundary(from, false) : null,
    to ? parseBoundary(to, true) : null
  );

  return accOk(report);
});
