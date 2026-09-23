/**
 * Smoke test for the payment API without a browser.
 *   1. npm run dev
 *   2. node scripts/test_razorpay.js
 * Creates a real (test-mode) order, then checks that signature verification
 * accepts a correctly signed payload and rejects a tampered one.
 */
const crypto = require('crypto');
const fs = require('fs');

const BASE = process.env.BASE_URL || 'http://localhost:3000';

function readSecret() {
  if (process.env.RAZORPAY_KEY_SECRET) return process.env.RAZORPAY_KEY_SECRET;
  for (const file of ['.env.local', '.env']) {
    try {
      const m = fs.readFileSync(file, 'utf8').match(/^RAZORPAY_KEY_SECRET=(.*)$/m);
      if (m && m[1].trim()) return m[1].trim();
    } catch {}
  }
  return '';
}

(async () => {
  const secret = readSecret();
  if (!secret) {
    console.error('RAZORPAY_KEY_SECRET not found in .env / .env.local');
    process.exit(1);
  }

  console.log('1) create-order');
  const res = await fetch(`${BASE}/api/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', phone: '9999999999', city: 'Bengaluru', goal: 'Testing' })
  });
  const data = await res.json();
  console.log('   ->', res.status, data);
  if (!data.orderId) process.exit(1);

  const paymentId = 'pay_test_' + Date.now();
  const sig = crypto.createHmac('sha256', secret).update(`${data.orderId}|${paymentId}`).digest('hex');

  console.log('2) verify-payment with a valid signature (payment lookup will fail because the payment id is fake, which is expected)');
  const ok = await fetch(`${BASE}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id: data.orderId, razorpay_payment_id: paymentId, razorpay_signature: sig, name: 'Test User', email: 'test@example.com', phone: '9999999999' })
  });
  console.log('   ->', ok.status, await ok.json());

  console.log('3) verify-payment with a tampered signature (must be rejected)');
  const bad = await fetch(`${BASE}/api/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id: data.orderId, razorpay_payment_id: paymentId, razorpay_signature: 'deadbeef' })
  });
  console.log('   ->', bad.status, await bad.json());
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
