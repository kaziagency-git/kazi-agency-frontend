import { ok, route, jsonBody, searchParams } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { createClientSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const qs = searchParams(req);

  const page = qs.get('page');
  const limit = qs.get('limit');

  const result = await svc.getAllClients({
    search: qs.get('search') ?? undefined,
    status: qs.get('status') ?? undefined,
    page: page ? parseInt(page, 10) : 1,
    limit: limit ? parseInt(limit, 10) : 20,
  });

  return ok('OK', result);
});

export const POST = route(async (req) => {
  requireAdmin(req);
  const body = createClientSchema.parse(await jsonBody(req));
  const { client, setupLink } = await svc.createClient(body);
  return ok('Client created', { client, setupLink }, 201);
});
