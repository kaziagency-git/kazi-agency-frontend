import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { connectDB } from './db';

export class HttpError extends Error {
  readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function ok<T>(message: string, data?: T, status = 200): NextResponse {
  const body = data === undefined
    ? { success: true, message }
    : { success: true, message, data };
  return NextResponse.json(body, { status });
}

export function fail(message: string, status = 400): NextResponse {
  return NextResponse.json({ success: false, message }, { status });
}

/**
 * Wraps a route handler: opens the DB connection first, then maps thrown
 * errors onto the same response shape the Express errorHandler produced.
 *
 * Pass `{ db: false }` for handlers that touch no collection (admin login,
 * token refresh) so a database outage cannot take them down with it.
 */
export function route<Ctx>(
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
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
          },
          { status: 400 }
        );
      }

      if (err instanceof HttpError) return fail(err.message, err.status);

      if (err instanceof Error) {
        const status = (err as { status?: number }).status ?? 500;
        if (status >= 500) console.error('[api]', req.method, new URL(req.url).pathname, err);
        return fail(err.message, status);
      }

      console.error('[api] unknown error', err);
      return fail('Internal server error', 500);
    }
  };
}

/** Parses a JSON body, treating an absent/!malformed body as `{}`. */
export async function jsonBody(req: Request): Promise<unknown> {
  try {
    const text = await req.text();
    return text ? JSON.parse(text) : {};
  } catch {
    throw new HttpError('Invalid JSON body', 400);
  }
}

export function searchParams(req: Request): URLSearchParams {
  return new URL(req.url).searchParams;
}
