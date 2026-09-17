import 'server-only';
import crypto from 'crypto';
import { HttpError } from '@/lib/server/http';

/**
 * Guard for the n8n integration endpoints. These carry no user session, so
 * they authenticate with a shared secret in the `x-api-key` header.
 *
 * Both sides are SHA-256 hashed before comparison: that equalises length
 * (`timingSafeEqual` throws on a length mismatch, which would itself leak the
 * expected key's length) and keeps the comparison constant-time.
 */
export function requireApiKey(req: Request): void {
  const expected = process.env.ACCOUNTING_API_KEY;
  if (!expected) throw new HttpError('ACCOUNTING_API_KEY is not configured', 500);

  const provided = req.headers.get('x-api-key');
  if (!provided) throw new HttpError('Unauthorized', 401);

  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();

  if (!crypto.timingSafeEqual(a, b)) throw new HttpError('Unauthorized', 401);
}
