import { ok, route, searchParams } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import * as svc from '@/lib/server/services/ticket.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const qs = searchParams(req);

  const tickets = await svc.getAllTickets({
    status: qs.get('status') ?? undefined,
    clientId: qs.get('clientId') ?? undefined,
  });

  return ok('OK', tickets);
});
