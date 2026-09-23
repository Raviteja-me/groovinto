// Server-only Razorpay helpers. Never import this from a client component.
import crypto from 'crypto';

const API_BASE = 'https://api.razorpay.com/v1';

export function getRazorpayKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
  return { keyId, keySecret, configured: Boolean(keyId && keySecret) };
}

function authHeader() {
  const { keyId, keySecret } = getRazorpayKeys();
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;
}

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
  notes?: Record<string, string>;
};

export type RazorpayPayment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: 'created' | 'authorized' | 'captured' | 'refunded' | 'failed';
  method?: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
};

export async function createOrder(input: { amountPaise: number; currency?: string; receipt: string; notes?: Record<string, string> }) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: input.currency || 'INR',
      receipt: input.receipt.slice(0, 40),
      payment_capture: 1,
      notes: input.notes || {}
    }),
    cache: 'no-store'
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.description || 'Razorpay rejected the order request';
    const err = new Error(message) as Error & { status?: number };
    err.status = res.status;
    throw err;
  }
  return data as RazorpayOrder;
}

export async function fetchPayment(paymentId: string) {
  const res = await fetch(`${API_BASE}/payments/${paymentId}`, {
    headers: { Authorization: authHeader() },
    cache: 'no-store'
  });
  if (!res.ok) return null;
  return (await res.json()) as RazorpayPayment;
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Verifies the signature Razorpay Checkout returns after a successful payment. */
export function verifyPaymentSignature(input: { orderId: string; paymentId: string; signature: string }) {
  const { keySecret } = getRazorpayKeys();
  if (!keySecret) return false;
  const expected = crypto.createHmac('sha256', keySecret).update(`${input.orderId}|${input.paymentId}`).digest('hex');
  return safeEqual(expected, input.signature);
}

/** Verifies the X-Razorpay-Signature header on a webhook request. */
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return safeEqual(expected, signature);
}

export type RazorpayPaymentFull = RazorpayPayment & { created_at: number; error_description?: string };

/** Lists recent payments straight from Razorpay (newest first). Used by the admin panel. */
export async function listPayments(max = 300): Promise<RazorpayPaymentFull[]> {
  const { configured } = getRazorpayKeys();
  if (!configured) return [];
  const out: RazorpayPaymentFull[] = [];
  for (let skip = 0; skip < max; skip += 100) {
    const res = await fetch(`${API_BASE}/payments?count=100&skip=${skip}`, {
      headers: { Authorization: authHeader() },
      cache: 'no-store'
    });
    if (!res.ok) break;
    const data = await res.json();
    const items: RazorpayPaymentFull[] = data?.items || [];
    out.push(...items);
    if (items.length < 100) break;
  }
  return out;
}
