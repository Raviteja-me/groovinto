import { NextResponse } from 'next/server';
import { COURSE } from '../../../lib/course';
import { createOrder, getRazorpayKeys } from '../../../lib/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 120) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  try {
    const { keyId, configured } = getRazorpayKeys();
    if (!configured) {
      return NextResponse.json(
        { error: 'Payments are not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.' },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone, 20).replace(/[^\d+]/g, '');
    const city = clean(body.city, 80);
    const goal = clean(body.goal, 80);

    if (name.length < 2) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    if (phone.replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    // The amount is decided on the server so it can never be tampered with from the browser.
    const amountPaise = COURSE.price * 100;
    const receipt = `grv_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    const order = await createOrder({
      amountPaise,
      currency: COURSE.currency,
      receipt,
      notes: { name, email, phone, city, goal, course: COURSE.id }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      courseName: COURSE.name
    });
  } catch (err: any) {
    console.error('[create-order]', err?.message || err);
    const status = err?.status === 401 ? 401 : 500;
    const message =
      status === 401
        ? 'Razorpay rejected the API keys. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
        : 'Could not start the payment. Please try again.';
    return NextResponse.json({ error: message }, { status });
  }
}
