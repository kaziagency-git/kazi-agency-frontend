import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { addServiceMilestoneSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; serviceId: string }> };

export const POST = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id, serviceId } = await params;
  const body = addServiceMilestoneSchema.parse(await jsonBody(req));
  const client = await svc.addServiceMilestone(id, serviceId, body);
  return ok('Milestone added', client, 201);
});
