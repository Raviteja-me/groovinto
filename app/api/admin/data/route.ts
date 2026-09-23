import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../../../lib/admin-auth';
import { readAll, storageMode } from '../../../../lib/store';
import { getRazorpayKeys, listPayments } from '../../../../lib/razorpay';
import { COURSE } from '../../../../lib/course';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isAdminRequest()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const [local, enquiries, subscribers, failures] = await Promise.all([
    readAll('registrations'),
    readAll('enquiries'),
    readAll('subscribers'),
    readAll('payment_failures')
  ]);

  // Merge in payments straight from Razorpay so nothing is missed even if the
  // local file was wiped (e.g. a redeploy) or the customer closed the tab early.
  let razorpayOk = false;
  let razorpayError: string | null = null;
  const byId = new Map<string, any>(local.map((r: any) => [r.id, { ...r, inRazorpay: false }]));
  try {
    const payments = await listPayments();
    razorpayOk = getRazorpayKeys().configured;
    for (const p of payments) {
      if ((p.notes?.course || '') !== COURSE.id) continue;
      const status = p.status === 'captured' ? 'paid' : p.status === 'authorized' ? 'authorized' : p.status;
      const existing = byId.get(p.id);
      if (existing) {
        byId.set(p.id, { ...existing, status, method: existing.method || p.method, inRazorpay: true });
      } else {
        byId.set(p.id, {
          id: p.id,
          name: p.notes?.name || '',
          email: p.email || p.notes?.email || '',
          phone: p.contact || p.notes?.phone || '',
          city: p.notes?.city || '',
          goal: p.notes?.goal || '',
          amount: p.amount / 100,
          currency: p.currency,
          orderId: p.order_id,
          paymentId: p.id,
          status,
          method: p.method || '',
          source: 'razorpay',
          reason: p.error_description || '',
          createdAt: new Date(p.created_at * 1000).toISOString(),
          inRazorpay: true
        });
      }
    }
  } catch (err: any) {
    razorpayError = err?.message || 'Could not reach Razorpay';
  }

  const registrations = Array.from(byId.values()).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

  return NextResponse.json({
    registrations,
    enquiries,
    subscribers,
    failures,
    razorpay: { connected: razorpayOk, error: razorpayError, mode: (getRazorpayKeys().keyId || '').startsWith('rzp_live') ? 'live' : 'test' },
    storage: storageMode,
    course: { name: COURSE.name, price: COURSE.price }
  });
}
