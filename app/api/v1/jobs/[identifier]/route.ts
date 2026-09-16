import { ok, fail, route } from '@/lib/server/http';
import * as jobService from '@/lib/server/services/job.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ identifier: string }> };

export const GET = route<Ctx>(async (_req, { params }) => {
  const { identifier } = await params;
  const job = await jobService.getJobByIdOrSlug(identifier);
  if (!job) return fail('Job not found', 404);
  return ok('Job retrieved', job);
});
