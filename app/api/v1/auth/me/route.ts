import { ok, route } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = route(async (req) => {
  const admin = requireAdmin(req);
  return ok('Authenticated', { email: admin.email, role: admin.role });
}, { db: false });
