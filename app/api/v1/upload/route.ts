import { ok, fail, route } from '@/lib/server/http';
import { uploadToCloudinary } from '@/lib/server/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILES = 10;
const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB, matching the Express limit

export const POST = route(async (req) => {
  const form = await req.formData();

  const files = form
    .getAll('files')
    .filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) return fail('No files provided', 400);
  if (files.length > MAX_FILES) return fail(`At most ${MAX_FILES} files per upload`, 400);

  const oversized = files.find((f) => f.size > MAX_FILE_BYTES);
  if (oversized) return fail(`"${oversized.name}" exceeds the 20 MB limit`, 400);

  const results = await Promise.all(files.map((f) => uploadToCloudinary(f, 'kazi-agency/tickets')));

  return ok('Uploaded', results);
}, { db: false });
