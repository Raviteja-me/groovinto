import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, checkCredentials, createSessionToken, sessionCookieOptions } from '../../../../lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { username = '', password = '' } = await req.json().catch(() => ({}));
  if (!checkCredentials(String(username), String(password))) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(String(username)), sessionCookieOptions);
  return res;
}
