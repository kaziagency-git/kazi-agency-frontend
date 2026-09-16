import { ok, route } from '@/lib/server/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async () => ok('Logged out'), { db: false });
