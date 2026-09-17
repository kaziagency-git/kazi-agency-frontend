import { NextResponse } from 'next/server';

/**
 * Every accounting endpoint answers with the same envelope:
 *
 *   { success: true,  data: <payload>, error: null }
 *   { success: false, data: null,      error: "<message>" }
 *
 * This differs from the `{ success, message, data }` shape the rest of the
 * API uses — it is the shape specified for this module, so the accounting
 * routes use `accRoute()` rather than the shared `route()` wrapper.
 */
export interface AccEnvelope<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export interface AccListPayload<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function accOk<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data, error: null }, { status });
}

export function accFail(error: string, status = 400, data: unknown = null): NextResponse {
  return NextResponse.json({ success: false, data, error }, { status });
}
