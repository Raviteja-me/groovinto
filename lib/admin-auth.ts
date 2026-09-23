import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'grv_admin';
const MAX_AGE = 60 * 60 * 12; // 12 hours

// Test credentials. Override in .env with ADMIN_USERNAME / ADMIN_PASSWORD before going live.
export function adminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'groovinto@123'
  };
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.RAZORPAY_KEY_SECRET || 'groovinto-dev-session-secret';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export function checkCredentials(username: string, password: string) {
  const c = adminCredentials();
  return safeEqual(username, c.username) && safeEqual(password, c.password);
}

export function createSessionToken(username: string) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${username}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function isAdminRequest() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [user, exp, sig] = parts;
  if (!safeEqual(sign(`${user}.${exp}`), sig)) return false;
  return Number(exp) > Date.now() / 1000;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE
};
