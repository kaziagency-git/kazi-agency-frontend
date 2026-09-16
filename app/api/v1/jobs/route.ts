import { ok, route } from '@/lib/server/http';
import * as jobService from '@/lib/server/services/job.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async () => {
  const jobs = await jobService.getPublishedJobs();
  return ok('Jobs retrieved', jobs);
});
