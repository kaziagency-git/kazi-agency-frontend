import { ok, route, jsonBody } from '@/lib/server/http';
import { requireClient } from '@/lib/server/auth';
import { updateOnboardingSchema } from '@/lib/server/schemas/onboarding.schema';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  const client = requireClient(req);
  const { form } = await svc.findOrCreateForm(client.email, client.id);
  return ok('OK', { form });
});

export const PATCH = route(async (req) => {
  const client = requireClient(req);
  await svc.findOrCreateForm(client.email, client.id);

  const body = updateOnboardingSchema.parse(await jsonBody(req));
  const form = await svc.updateFormByEmail(client.email, body);

  return ok('Saved', { form });
});
