import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { signAccessToken, verifyRefreshToken } from '@/lib/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const { refreshToken } = (await jsonBody(req)) as { refreshToken?: string };
  if (!refreshToken) return fail('Refresh token required', 401);

  const claims = verifyRefreshToken(refreshToken, 'client');

  const accessToken = signAccessToken({
    id: claims.id,
    email: claims.email,
    role: 'client',
  });

  return ok('Token refreshed', { accessToken });
}, { db: false });
