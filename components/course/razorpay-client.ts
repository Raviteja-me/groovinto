'use client';

const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

export type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string; backdrop_color?: string };
  modal?: { ondismiss?: () => void; escape?: boolean; confirm_close?: boolean };
  handler: (response: RazorpaySuccess) => void;
  retry?: { enabled: boolean };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: 'payment.failed', handler: (resp: { error: { description?: string; reason?: string } }) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let loading: Promise<void> | null = null;

export function loadRazorpay(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Not in browser'));
  if (window.Razorpay) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error('Could not load Razorpay checkout. Check your connection and try again.'));
    };
    document.body.appendChild(script);
  });
  return loading;
}
