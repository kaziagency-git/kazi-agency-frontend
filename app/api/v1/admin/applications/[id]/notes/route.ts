import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateAdminNotesSchema } from '@/lib/server/schemas/application.schema';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;

  const parsed = updateAdminNotesSchema.safeParse(await jsonBody(req));
  if (!parsed.success) return fail('adminNotes field is required', 400);

  const application = await appService.updateAdminNotes(id, parsed.data.adminNotes);
  if (!application) return fail('Application not found', 404);

  return ok('Notes updated', application);
});
