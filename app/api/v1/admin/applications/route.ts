import { ok, route, searchParams } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import type { ApplicationStatus } from '@/lib/server/models/application.model';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const qs = searchParams(req);

  const applications = await appService.getAllApplications({
    status: (qs.get('status') as ApplicationStatus | null) ?? undefined,
    jobId: qs.get('jobId') ?? undefined,
    search: qs.get('search') ?? undefined,
  });

  return ok('Applications retrieved', applications);
});
