import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateTicketStatusSchema } from '@/lib/server/schemas/ticket.schema';
import * as svc from '@/lib/server/services/ticket.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const { status } = updateTicketStatusSchema.parse(await jsonBody(req));
  const ticket = await svc.updateTicketStatus(id, status);
  return ok('Status updated', ticket);
});
