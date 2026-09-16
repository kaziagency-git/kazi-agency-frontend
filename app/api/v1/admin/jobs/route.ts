import { ok, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { createJobSchema } from '@/lib/server/schemas/job.schema';
import * as jobService from '@/lib/server/services/job.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const jobs = await jobService.getAllJobsAdmin();
  return ok('All jobs retrieved', jobs);
});

export const POST = route(async (req) => {
  requireAdmin(req);
  const body = createJobSchema.parse(await jsonBody(req));
  const job = await jobService.createJob(body);
  return ok('Job created', job, 201);
});
