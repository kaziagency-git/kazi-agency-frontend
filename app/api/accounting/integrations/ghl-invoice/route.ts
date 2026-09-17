import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { jsonBody } from '@/lib/server/http';
import { ghlInvoiceSchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { upsertGhlInvoice } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = accRoute(async (req) => {
  requireApiKey(req);
  const body = ghlInvoiceSchema.parse(await jsonBody(req));
  const result = await upsertGhlInvoice(body);
  return accOk(result, result.status === 'created' ? 201 : 200);
});
