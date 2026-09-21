import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
  try {
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

    const order = await razorpay.orders.create(options as any);

    return NextResponse.json({ order_id: order.id, amount: order.amount, currency: order.currency });
  } catch (err: any) {
    if (err && err.statusCode === 401) {
      return NextResponse.json({ error: 'Auth failed with Razorpay' }, { status: 401 });
    }
    console.error('create-order error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
