import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { updateOnboardingSchema } from '@/lib/server/schemas/onboarding.schema';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ token: string }> };

export const GET = route<Ctx>(async (_req, { params }) => {
  const { token } = await params;
  const form = await svc.getFormByToken(token);
  if (!form) return fail('Form not found', 404);
  return ok('OK', { form });
});

export const PATCH = route<Ctx>(async (req, { params }) => {
  const { token } = await params;
  const body = updateOnboardingSchema.parse(await jsonBody(req));
  const form = await svc.updateFormByToken(token, body);
  if (!form) return fail('Form not found', 404);
  return ok('Saved', { form });
});
