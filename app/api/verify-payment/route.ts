import { NextResponse } from 'next/server';
import { COURSE } from '../../../lib/course';
import { fetchPayment, verifyPaymentSignature } from '../../../lib/razorpay';
import { insert } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clean(value: unknown, max = 120) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const orderId = clean(body.razorpay_order_id);
    const paymentId = clean(body.razorpay_payment_id);
    const signature = clean(body.razorpay_signature, 200);

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ success: false, error: 'Missing payment details.' }, { status: 400 });
    }
    if (!verifyPaymentSignature({ orderId, paymentId, signature })) {
      console.warn('[verify-payment] signature mismatch', { orderId, paymentId });
      return NextResponse.json({ success: false, error: 'Payment signature could not be verified.' }, { status: 400 });
    }

    // Cross-check with Razorpay: order, amount and status.
    const payment = await fetchPayment(paymentId).catch(() => null);
    if (payment) {
      if (payment.order_id !== orderId) {
        return NextResponse.json({ success: false, error: 'Payment does not match the order.' }, { status: 400 });
      }
      if (payment.amount !== COURSE.price * 100) {
        return NextResponse.json({ success: false, error: 'Payment amount mismatch.' }, { status: 400 });
      }
      if (payment.status !== 'captured' && payment.status !== 'authorized') {
        return NextResponse.json({ success: false, error: `Payment is ${payment.status}.` }, { status: 400 });
      }
    }

    let saved = false;
    try {
      await insert('registrations', {
        id: paymentId,
        name: clean(body.name) || payment?.notes?.name || '',
        email: (clean(body.email) || payment?.email || payment?.notes?.email || '').toLowerCase(),
        phone: clean(body.phone, 20) || payment?.contact || payment?.notes?.phone || '',
        city: clean(body.city, 80) || payment?.notes?.city || '',
        goal: clean(body.goal, 80) || payment?.notes?.goal || '',
        course: COURSE.id,
        amount: (payment?.amount ?? COURSE.price * 100) / 100,
        currency: payment?.currency ?? COURSE.currency,
        orderId,
        paymentId,
        status: 'paid',
        method: payment?.method || '',
        source: 'checkout'
      });
      saved = true;
    } catch (err: any) {
      // Payment is verified; it will still show in admin via the Razorpay API.
      console.error('[verify-payment] could not save locally', err?.message);
    }

    return NextResponse.json({ success: true, paymentId, orderId, saved });
  } catch (err: any) {
    console.error('[verify-payment]', err?.message || err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
