import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateApplicationStatusSchema } from '@/lib/server/schemas/application.schema';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;

  const parsed = updateApplicationStatusSchema.safeParse(await jsonBody(req));
  if (!parsed.success) return fail('Valid status is required', 400);

  const application = await appService.updateStatus(id, parsed.data.status);
  if (!application) return fail('Application not found', 404);

  return ok('Status updated', application);
});
