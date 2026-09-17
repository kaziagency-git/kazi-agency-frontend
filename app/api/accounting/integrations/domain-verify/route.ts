import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { jsonBody } from '@/lib/server/http';
import { domainVerifySchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { verifyDomain } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const PATCH = accRoute(async (req) => {
  requireApiKey(req);
  const body = domainVerifySchema.parse(await jsonBody(req));
  return accOk(await verifyDomain(body));
});
