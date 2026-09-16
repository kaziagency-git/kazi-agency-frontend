import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { updateOnboardingSchema } from '@/lib/server/schemas/onboarding.schema';
import { onboardingShareLink } from '@/lib/server/onboarding-link';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const GET = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const form = await svc.getFormById(id);
  if (!form) return fail('Form not found', 404);
  return ok('OK', { form, shareLink: onboardingShareLink(form.shareToken) });
});

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const body = updateOnboardingSchema.parse(await jsonBody(req));
  const form = await svc.updateFormById(id, body, 'admin');
  if (!form) return fail('Form not found', 404);
  return ok('Form updated', { form });
});

export const DELETE = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  await svc.deleteForm(id);
  return ok('Form deleted');
});
