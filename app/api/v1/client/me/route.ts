import { ok, fail, route } from '@/lib/server/http';
import { requireClient } from '@/lib/server/auth';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  const { id } = requireClient(req);
  const client = await svc.getClientById(id);
  if (!client) return fail('Client not found', 404);
  return ok('OK', client);
});
