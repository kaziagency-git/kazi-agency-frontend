import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { onboardingShareLink } from '@/lib/server/onboarding-link';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  requireAdmin(req);

  const { email, clientId } = (await jsonBody(req)) as { email?: string; clientId?: string };
  if (!email) return fail('email is required', 400);

  const { form, created } = await svc.findOrCreateForm(email, clientId);

  return ok(
    created ? 'Form created' : 'Form found',
    { form, shareLink: onboardingShareLink(form.shareToken) },
    created ? 201 : 200
  );
});
