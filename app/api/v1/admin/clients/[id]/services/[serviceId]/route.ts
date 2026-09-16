import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateServiceProjectSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; serviceId: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id, serviceId } = await params;
  const body = updateServiceProjectSchema.parse(await jsonBody(req));
  const client = await svc.updateServiceProject(id, serviceId, body);
  return ok('Service project updated', client);
});

export const DELETE = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id, serviceId } = await params;
  const client = await svc.deleteServiceProject(id, serviceId);
  return ok('Service project deleted', client);
});
