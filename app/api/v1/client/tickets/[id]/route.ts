import { ok, route } from '@/lib/server/http';
import { requireClient } from '@/lib/server/auth';
import * as svc from '@/lib/server/services/ticket.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const GET = route<Ctx>(async (req, { params }) => {
  const client = requireClient(req);
  const { id } = await params;
  const ticket = await svc.getClientTicket(client.id, id);
  return ok('OK', ticket);
});
