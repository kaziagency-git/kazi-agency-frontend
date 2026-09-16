import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { replyTicketSchema } from '@/lib/server/schemas/ticket.schema';
import * as svc from '@/lib/server/services/ticket.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const POST = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const { content, attachments } = replyTicketSchema.parse(await jsonBody(req));
  const ticket = await svc.adminReply(id, content, attachments);
  return ok('Reply sent', ticket);
});
