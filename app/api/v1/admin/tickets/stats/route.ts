import { ok, route } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import * as svc from '@/lib/server/services/ticket.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const stats = await svc.getTicketStats();
  return ok('OK', stats);
});
