import 'server-only';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/server/db';
import { HttpError } from '@/lib/server/http';
import { accFail } from './api-response';

/**
 * Route wrapper for the accounting module.
 *
 * Reuses the shared `connectDB()` and `HttpError` so there is exactly one
 * Mongoose connection in the app; only the error envelope differs from
 * `lib/server/http.ts` (`error` instead of `message`).
 */
export function accRoute<Ctx = unknown>(
  handler: (req: Request, ctx: Ctx) => Promise<NextResponse>,
  opts: { db?: boolean } = {}
): (req: Request, ctx: Ctx) => Promise<NextResponse> {
  const needsDb = opts.db !== false;

  return async (req, ctx) => {
    try {
      if (needsDb) await connectDB();
      return await handler(req, ctx);
    } catch (err) {
      if (err instanceof ZodError) {
        const detail = err.errors
          .map((e) => `${e.path.join('.') || 'body'}: ${e.message}`)
          .join('; ');
        return accFail(`Validation error — ${detail}`, 400);
      }

      if (err instanceof HttpError) return accFail(err.message, err.status);

      if (err instanceof mongoose.Error.ValidationError) {
        const detail = Object.values(err.errors).map((e) => e.message).join('; ');
        return accFail(`Validation error — ${detail}`, 400);
      }

      if (err instanceof mongoose.Error.CastError) {
        return accFail(`Invalid value for "${err.path}"`, 400);
      }

      if (isDuplicateKeyError(err)) {
        return accFail('A record with these unique values already exists', 409);
      }

      console.error('[accounting]', req.method, new URL(req.url).pathname, err);
      return accFail('Internal server error', 500);
    }
  };
}

/** MongoDB duplicate-key violation (unique index). */
export function isDuplicateKeyError(err: unknown): boolean {
  return typeof err === 'object' && err !== null && (err as { code?: number }).code === 11000;
}
