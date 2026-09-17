import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { jsonBody } from '@/lib/server/http';
import { ghlPaymentSchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { recordGhlPayment } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = accRoute(async (req) => {
  requireApiKey(req);
  const body = ghlPaymentSchema.parse(await jsonBody(req));
  const result = await recordGhlPayment(body);
  // 200 either way: a retry is a success from the caller's point of view.
  return accOk(result, 200);
});
