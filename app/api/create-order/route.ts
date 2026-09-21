import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
// Use direct REST API call to avoid SDK auth complexities in this environment

export async function POST(req: Request) {
  try {
    // Log whether environment variables are present (do not print secrets)
    console.debug('RAZORPAY_KEY_ID present:', !!process.env.RAZORPAY_KEY_ID || !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
    console.debug('RAZORPAY_KEY_SECRET present:', !!process.env.RAZORPAY_KEY_SECRET);
    const body = await req.json();
    const amount = Number(body.amount);

    if (!amount || isNaN(amount) || amount < 100) {
      return NextResponse.json({ error: 'Amount must be at least 100 paise' }, { status: 400 });
    }

    const options = {
      amount: amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    // call Razorpay REST API
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const resp = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(options),
    });

    const order = await resp.json();

    if (!resp.ok) {
      console.error('Razorpay API error creating order', order);
      if (resp.status === 401) {
        return NextResponse.json({ error: 'Auth failed with Razorpay' }, { status: 401 });
      }
      return NextResponse.json({ error: 'Razorpay API error' }, { status: 500 });
    }

    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (err: any) {
    // Detailed logging for debugging auth issues
    console.error('create-order error', err && err.message ? err.message : err);
    if (err && (err.statusCode === 401 || (err.error && err.error.code === 'BAD_REQUEST_ERROR'))) {
      return NextResponse.json({ error: 'Auth failed with Razorpay' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
