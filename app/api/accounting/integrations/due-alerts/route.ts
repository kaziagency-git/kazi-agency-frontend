import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { searchParams } from '@/lib/server/http';
import { dueAlertsQuerySchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { getDueAlerts } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = accRoute(async (req) => {
  requireApiKey(req);
  const { channel } = dueAlertsQuerySchema.parse(Object.fromEntries(searchParams(req)));
  const alerts = await getDueAlerts(channel);
  return accOk({ channel, count: alerts.length, alerts });
});
