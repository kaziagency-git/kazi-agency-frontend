import { accOk } from '@/lib/accounting/api-response';
import { accRoute } from '@/lib/accounting/api-route';
import { requireApiKey } from '@/lib/accounting/api-key';
import { jsonBody } from '@/lib/server/http';
import { telegramExpenseSchema } from '@/lib/server/schemas/accounting/acc-integration.schema';
import { createTelegramExpense } from '@/lib/server/services/accounting/integration.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = accRoute(async (req) => {
  requireApiKey(req);
  const body = telegramExpenseSchema.parse(await jsonBody(req));
  return accOk(await createTelegramExpense(body), 201);
});
