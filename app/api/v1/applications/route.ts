import { ok, route, jsonBody } from '@/lib/server/http';
import { NextResponse } from 'next/server';
import { submitApplicationSchema } from '@/lib/server/schemas/application.schema';
import * as appService from '@/lib/server/services/application.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const contentType = req.headers.get('content-type') ?? '';

  let raw: Record<string, unknown>;
  let resumeFileName: string | null = null;

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData();
    raw = {};
    for (const [key, value] of form.entries()) {
      if (key === 'resume') continue;
      raw[key] = value;
    }
    const resume = form.get('resume');
    if (resume instanceof File && resume.size > 0) resumeFileName = resume.name;
  } else {
    raw = (await jsonBody(req)) as Record<string, unknown>;
    resumeFileName = typeof raw.resumeFileName === 'string' ? raw.resumeFileName : null;
  }

  const parsed = submitApplicationSchema.safeParse({ ...raw, resumeFileName });
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Validation error', errors: parsed.error.errors },
      { status: 400 }
    );
  }

  const application = await appService.submitApplication({ ...parsed.data, resumeFileName });
  return ok('Application submitted successfully', { id: application._id }, 201);
});
