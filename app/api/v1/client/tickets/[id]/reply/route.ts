import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireClient } from '@/lib/server/auth';
import { replyTicketSchema } from '@/lib/server/schemas/ticket.schema';
import * as svc from '@/lib/server/services/ticket.service';
import { getClientById } from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const POST = route<Ctx>(async (req, { params }) => {
  const auth = requireClient(req);
  const { id } = await params;

  const client = await getClientById(auth.id);
  if (!client) return fail('Client not found', 404);

  const { content, attachments } = replyTicketSchema.parse(await jsonBody(req));
  const ticket = await svc.clientReply(auth.id, id, client.name, content, attachments);

  return ok('Reply sent', ticket);
});
