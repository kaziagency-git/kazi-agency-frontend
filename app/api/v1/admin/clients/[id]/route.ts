import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateClientSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const GET = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const client = await svc.getClientById(id);
  if (!client) return fail('Client not found', 404);
  return ok('OK', client);
});

export const PUT = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const body = updateClientSchema.parse(await jsonBody(req));
  const client = await svc.updateClient(id, body);
  return ok('Client updated', client);
});

export const DELETE = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  await svc.deleteClient(id);
  return ok('Client deleted');
});
