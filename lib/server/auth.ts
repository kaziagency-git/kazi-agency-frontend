import jwt from 'jsonwebtoken';
import { HttpError } from './http';

export interface AdminPayload {
  id: string;
  email: string;
  role: 'admin';
}

export interface ClientPayload {
  id: string;
  email: string;
}

interface TokenClaims {
  id: string;
  email: string;
  role: string;
  type?: string;
}

function secret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new HttpError('JWT_SECRET not configured', 500);
  return s;
}

function verifyBearer(req: Request): TokenClaims {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError('Authorization token required', 401);
  }

  const token = header.slice('Bearer '.length);

  let claims: TokenClaims;
  try {
    claims = jwt.verify(token, secret()) as TokenClaims;
  } catch {
    throw new HttpError('Invalid or expired token', 401);
  }

  // Refresh tokens must never be accepted as access tokens.
  if (claims.type === 'refresh') throw new HttpError('Invalid token type', 401);

  return claims;
}

export function requireAdmin(req: Request): AdminPayload {
  const claims = verifyBearer(req);
  // A client portal token is a valid signature too — without this check any
  // logged-in client could call every /admin endpoint.
  if (claims.role !== 'admin') throw new HttpError('Access denied', 403);
  return { id: claims.id, email: claims.email, role: 'admin' };
}

export function requireClient(req: Request): ClientPayload {
  const claims = verifyBearer(req);
  if (claims.role !== 'client') throw new HttpError('Access denied', 403);
  return { id: claims.id, email: claims.email };
}

export const ACCESS_EXPIRES_IN = '1h';
export const REFRESH_EXPIRES_IN = '7d';

export function signTokenPair(payload: { id: string; email: string; role: 'admin' | 'client' }) {
  const s = secret();
  const accessToken = jwt.sign(payload, s, { expiresIn: ACCESS_EXPIRES_IN });
  const refreshToken = jwt.sign({ ...payload, type: 'refresh' }, s, {
    expiresIn: REFRESH_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}

export function signAccessToken(payload: { id: string; email: string; role: 'admin' | 'client' }) {
  return jwt.sign(payload, secret(), { expiresIn: ACCESS_EXPIRES_IN });
}

export function verifyRefreshToken(token: string, expectedRole?: 'admin' | 'client'): TokenClaims {
  let claims: TokenClaims;
  try {
    claims = jwt.verify(token, secret()) as TokenClaims;
  } catch {
    throw new HttpError('Invalid or expired refresh token', 401);
  }

  if (claims.type !== 'refresh') throw new HttpError('Invalid token type', 401);
  if (expectedRole && claims.role !== expectedRole) throw new HttpError('Invalid token', 401);

  return claims;
}
