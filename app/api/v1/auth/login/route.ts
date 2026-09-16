import bcrypt from 'bcryptjs';
import { ok, fail, route, jsonBody } from '@/lib/server/http';
import { signTokenPair } from '@/lib/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const POST = route(async (req) => {
  const { email, password } = (await jsonBody(req)) as { email?: string; password?: string };

  if (!email || !password) return fail('Email and password are required', 400);

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return fail('Admin credentials not configured', 500);
  if (email !== adminEmail) return fail('Invalid credentials', 401);

  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;

  let passwordValid = false;
  if (adminPasswordHash) {
    passwordValid = await bcrypt.compare(password, adminPasswordHash);
  } else if (adminPassword) {
    passwordValid = password === adminPassword;
  }

  if (!passwordValid) return fail('Invalid credentials', 401);

  const tokens = signTokenPair({ id: 'admin', email: adminEmail, role: 'admin' });
  return ok('Login successful', tokens);
}, { db: false });
