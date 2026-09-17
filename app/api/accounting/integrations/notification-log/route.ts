import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { jsonBody } from '@/lib/server/http';
import { notificationLogSchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { recordNotification } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = accRoute(async (req) => {
  requireApiKey(req);
  const body = notificationLogSchema.parse(await jsonBody(req));
  const result = await recordNotification(body);
  return accOk(result, result.status === 'logged' ? 201 : 200);
});
