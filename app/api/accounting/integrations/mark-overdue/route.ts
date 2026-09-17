import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { markInvoicesOverdue } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = accRoute(async (req) => {
  requireApiKey(req);
  return accOk(await markInvoicesOverdue());
});
