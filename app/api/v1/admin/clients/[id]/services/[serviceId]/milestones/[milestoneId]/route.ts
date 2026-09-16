import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateServiceMilestoneSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; serviceId: string; milestoneId: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id, serviceId, milestoneId } = await params;
  const body = updateServiceMilestoneSchema.parse(await jsonBody(req));
  const client = await svc.updateServiceMilestone(id, serviceId, milestoneId, body);
  return ok('Milestone updated', client);
});

export const DELETE = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id, serviceId, milestoneId } = await params;
  const client = await svc.deleteServiceMilestone(id, serviceId, milestoneId);
  return ok('Milestone deleted', client);
});
