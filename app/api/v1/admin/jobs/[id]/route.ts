import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateJobSchema } from '@/lib/server/schemas/job.schema';
import * as jobService from '@/lib/server/services/job.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const GET = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const job = await jobService.getJobByIdAdmin(id);
  if (!job) return fail('Job not found', 404);
  return ok('Job retrieved', job);
});

export const PUT = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const body = updateJobSchema.parse(await jsonBody(req));
  const job = await jobService.updateJob(id, body);
  if (!job) return fail('Job not found', 404);
  return ok('Job updated', job);
});

export const DELETE = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const job = await jobService.deleteJob(id);
  if (!job) return fail('Job not found', 404);
  return ok('Job deleted');
});
