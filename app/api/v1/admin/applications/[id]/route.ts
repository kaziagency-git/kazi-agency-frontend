import { ok, fail, route } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const GET = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const application = await appService.getApplicationById(id);
  if (!application) return fail('Application not found', 404);
  return ok('Application retrieved', application);
});
