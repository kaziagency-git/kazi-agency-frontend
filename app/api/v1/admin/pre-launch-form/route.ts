import { ok, route, jsonBody, searchParams } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { createOnboardingSchema } from '@/lib/server/schemas/onboarding.schema';
import { onboardingShareLink } from '@/lib/server/onboarding-link';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const qs = searchParams(req);

  const page = qs.get('page');
  const limit = qs.get('limit');

  const result = await svc.listForms({
    search: qs.get('search') || undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  return ok('OK', result);
});

export const POST = route(async (req) => {
  requireAdmin(req);
  const body = createOnboardingSchema.parse(await jsonBody(req));
  const form = await svc.createForm(body);
  return ok('Onboarding form created', { form, shareLink: onboardingShareLink(form.shareToken) }, 201);
});
