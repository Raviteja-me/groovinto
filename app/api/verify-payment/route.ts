import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Signature mismatch' }, { status: 400 });
  } catch (err) {
    console.error('verify-payment error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
