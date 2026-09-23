import { NextResponse } from 'next/server';
import { insert } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase().slice(0, 200) : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  try {
    await insert('subscribers', { id: `sub_${email}`, email });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not subscribe' }, { status: 500 });
  }
}
