import { ok, route } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  requireAdmin(req);
  const stats = await appService.getApplicationStats();
  return ok('Stats retrieved', stats);
});
