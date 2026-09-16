import { ok, route, jsonBody } from '@/lib/server/http';
import { signTokenPair } from '@/lib/server/auth';
import { setPasswordSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const { token, password } = setPasswordSchema.parse(await jsonBody(req));
  const client = await svc.setClientPassword(token, password);
  const tokens = signTokenPair({
    id: client._id.toString(),
    email: client.email,
    role: 'client',
  });
  return ok('Password set successfully', tokens);
});
