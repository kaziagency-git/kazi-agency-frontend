import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireClient } from '@/lib/server/auth';
import { createTicketSchema } from '@/lib/server/schemas/ticket.schema';
import * as svc from '@/lib/server/services/ticket.service';
import { getClientById } from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  const { id } = requireClient(req);
  const tickets = await svc.getClientTickets(id);
  return ok('OK', tickets);
});

export const POST = route(async (req) => {
  const { id } = requireClient(req);

  const client = await getClientById(id);
  if (!client) return fail('Client not found', 404);

  const body = createTicketSchema.parse(await jsonBody(req));
  const ticket = await svc.createTicket(
    client._id.toString(),
    client.name,
    client.email,
    body
  );

  return ok('Ticket created', ticket, 201);
});
