import { ok, fail, route } from '@/lib/server/http';
import { requireAdmin } from '@/lib/server/auth';
import { onboardingShareLink } from '@/lib/server/onboarding-link';
import * as svc from '@/lib/server/services/onboarding.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export const POST = route<Ctx>(async (req, { params }) => {
  requireAdmin(req);
  const { id } = await params;
  const form = await svc.regenerateToken(id);
  if (!form) return fail('Form not found', 404);
  return ok('Share link regenerated', { shareLink: onboardingShareLink(form.shareToken) });
});
