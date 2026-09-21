"use client";

import { useState } from 'react';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Groovinto',
        description: 'Test Transaction',
        order_id: data.order_id,
        handler: async function (response: any) {
          // Send to verify endpoint
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            alert('Payment verified successfully');
          } else {
            alert('Payment verification failed');
          }
        },
        modal: {
          ondismiss: function () {
            alert('Payment popup closed');
          },
        },
      } as any;

      // Load Razorpay script if not present
      if (!(window as any).Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="button-glow rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-light shadow-glow transition hover:scale-105"
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
