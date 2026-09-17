import { revalidatePath } from 'next/cache';
import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { publishJobSchema } from '@/lib/server/schemas/job.schema';
import * as jobService from '@/lib/server/services/job.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const PATCH = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;

  const parsed = publishJobSchema.safeParse(await jsonBody(req));
  if (!parsed.success) return fail('isPublished (boolean) is required', 400);

  const job = await jobService.togglePublish(id, parsed.data.isPublished);
  if (!job) return fail('Job not found', 404);

  // The careers list is cached; without this the change stays invisible there
  // until the next revalidation window.
  revalidatePath('/careers');

  return ok(`Job ${job.isPublished ? 'published' : 'unpublished'}`, job);
});
