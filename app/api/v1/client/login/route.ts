import { ok, route, jsonBody } from '@/lib/server/http';
import { signTokenPair } from '@/lib/server/auth';
import { clientLoginSchema } from '@/lib/server/schemas/client.schema';
import * as svc from '@/lib/server/services/client.service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const { email, password } = clientLoginSchema.parse(await jsonBody(req));
  const client = await svc.verifyClientPassword(email, password);
  const tokens = signTokenPair({
    id: client._id.toString(),
    email: client.email,
    role: 'client',
  });
  return ok('Login successful', tokens);
});
