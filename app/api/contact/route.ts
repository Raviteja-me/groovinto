import { NextResponse } from 'next/server';
import { insert, newId } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const s = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = s(b.name);
  const email = s(b.email).toLowerCase();
  const message = s(b.message, 3000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: 'Please fill in name, a valid email and your message.' }, { status: 400 });
  }
  try {
    await insert('enquiries', { id: newId('enq'), name, email, phone: s(b.phone, 20), company: s(b.company), budget: s(b.budget, 40), message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Could not save your message.' }, { status: 500 });
  }
}
