import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { addServiceProjectSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const POST = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const body = addServiceProjectSchema.parse(await jsonBody(req));
  const client = await svc.addServiceProject(id, body);
  return ok('Service project added', client, 201);
});
