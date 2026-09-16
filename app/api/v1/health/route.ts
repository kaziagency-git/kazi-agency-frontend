import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/server/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const timestamp = new Date().toISOString();
  try {
    await connectDB();
    return NextResponse.json({ status: 'ok', db: 'connected', timestamp });
  } catch (err) {
    return NextResponse.json(
      {
        status: 'degraded',
        db: 'disconnected',
        message: err instanceof Error ? err.message : String(err),
        timestamp,
      },
      { status: 503 }
    );
  }
}
