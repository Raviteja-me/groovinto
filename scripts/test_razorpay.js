const fs = require('fs');

(async () => {
  try {
    const env = fs.readFileSync('.env', 'utf8');
    const secretMatch = env.match(/RAZORPAY_KEY_SECRET=(.*)/);
    const secret = (secretMatch && secretMatch[1]) || process.env.RAZORPAY_KEY_SECRET || '';

    const fetch = globalThis.fetch || (await import('node-fetch')).default;

    console.log('Creating order...');
    const res = await fetch('http://localhost:3000/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }),
    });
    const data = await res.json();
    console.log('create-order response:', data);
    if (!data.order_id) {
      console.error('No order_id returned');
      process.exit(1);
    }

    const order_id = data.order_id;
    const payment_id = 'pay_test_123456';

    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secret).update(`${order_id}|${payment_id}`).digest('hex');

    console.log('Verifying payment with fake payment id and generated signature...');
    const verifyRes = await fetch('http://localhost:3000/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ razorpay_order_id: order_id, razorpay_payment_id: payment_id, razorpay_signature: signature }),
    });
    const verifyData = await verifyRes.json();
    console.log('verify-payment response:', verifyData);
  } catch (err) {
    console.error('Test script error:', err);
    process.exit(1);
  }
})();
