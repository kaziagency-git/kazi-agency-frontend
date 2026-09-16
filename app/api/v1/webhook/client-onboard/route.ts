import { ok, route, jsonBody } from '@/lib/server/http';
import { webhookClientSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const body = webhookClientSchema.parse(await jsonBody(req));
  const { client, setupLink } = await svc.createClientFromWebhook(body);
  return ok('Client onboarded', { client, setupLink }, 201);
});
