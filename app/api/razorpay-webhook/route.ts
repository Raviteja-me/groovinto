import { NextResponse } from 'next/server';
import { COURSE } from '../../../lib/course';
import { verifyWebhookSignature } from '../../../lib/razorpay';
import { insert } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Optional Razorpay webhook (Dashboard -> Settings -> Webhooks):
 *   URL: https://<domain>/api/razorpay-webhook, Secret: RAZORPAY_WEBHOOK_SECRET,
 *   Events: payment.captured, payment.failed
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 503 });
  }
  if (!verifyWebhookSignature(rawBody, req.headers.get('x-razorpay-signature') || '')) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const p = event?.payload?.payment?.entity;
  if (!p?.id) return NextResponse.json({ ok: true, ignored: true });
  const notes = p.notes || {};

  try {
    if (event.event === 'payment.captured' && (notes.course || COURSE.id) === COURSE.id) {
      await insert('registrations', {
        id: p.id,
        name: notes.name || '',
        email: (p.email || notes.email || '').toLowerCase(),
        phone: p.contact || notes.phone || '',
        city: notes.city || '',
        goal: notes.goal || '',
        course: COURSE.id,
        amount: p.amount / 100,
        currency: p.currency,
        orderId: p.order_id || '',
        paymentId: p.id,
        status: 'paid',
        method: p.method || '',
        source: 'webhook'
      });
    } else if (event.event === 'payment.failed') {
      await insert('payment_failures', {
        id: p.id,
        orderId: p.order_id || '',
        email: p.email || '',
        phone: p.contact || '',
        amount: p.amount / 100,
        reason: p.error_description || p.error_reason || 'unknown'
      });
    }
  } catch (err: any) {
    console.error('[razorpay-webhook]', err?.message || err);
  }
  return NextResponse.json({ ok: true });
}
