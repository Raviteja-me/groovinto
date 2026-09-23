// Storage used until a real database is attached. No external service needed.
//  - On Netlify: Netlify Blobs (built in, zero config, persists across deploys).
//  - Locally:    JSON files in ./data (or DATA_DIR).
// Paid registrations are ALSO read straight from Razorpay in the admin panel,
// so a payment is never lost even if storage fails.
import fs from 'fs/promises';
import path from 'path';

export type Collection = 'registrations' | 'enquiries' | 'subscribers' | 'payment_failures';
type Row = Record<string, any> & { id: string };

const onNetlify = Boolean(process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY || process.env.NETLIFY_LOCAL);

async function blobStore() {
  const { getStore } = await import('@netlify/blobs');
  return getStore({ name: 'groovinto', consistency: 'strong' });
}

const safeKey = (id: string) => id.replace(/[^a-zA-Z0-9_.@-]/g, '_');

/* ---------- Netlify Blobs: one blob per record, so concurrent writes never collide ---------- */
async function blobReadAll(name: Collection): Promise<Row[]> {
  const store = await blobStore();
  const { blobs } = await store.list({ prefix: `${name}/` });
  const rows = await Promise.all(blobs.map((b) => store.get(b.key, { type: 'json' }) as Promise<Row | null>));
  return rows.filter(Boolean) as Row[];
}

async function blobInsert(name: Collection, row: Row) {
  const store = await blobStore();
  const key = `${name}/${safeKey(row.id)}`;
  if (await store.get(key)) return false;
  await store.setJSON(key, row);
  return true;
}

/* ---------- Local JSON files ---------- */
const DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
let queue: Promise<unknown> = Promise.resolve();

async function fileRead(name: Collection): Promise<Row[]> {
  try {
    const data = JSON.parse(await fs.readFile(path.join(DIR, `${name}.json`), 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function fileInsert(name: Collection, row: Row) {
  const run = async () => {
    const rows = await fileRead(name);
    if (rows.some((r) => r.id === row.id)) return false;
    rows.push(row);
    await fs.mkdir(DIR, { recursive: true });
    const file = path.join(DIR, `${name}.json`);
    const tmp = `${file}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(rows, null, 2));
    await fs.rename(tmp, file);
    return true;
  };
  const p = queue.then(run, run);
  queue = p.catch(() => undefined);
  return p;
}

/* ---------- Public API ---------- */
export async function readAll<T = any>(name: Collection): Promise<T[]> {
  let rows: Row[] = [];
  try {
    rows = onNetlify ? await blobReadAll(name) : await fileRead(name);
  } catch (err: any) {
    console.error(`[store] read ${name} failed:`, err?.message);
  }
  return rows.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))) as T[];
}

/** Adds a record; does nothing if the id already exists. Returns true when created. */
export async function insert(name: Collection, record: Row): Promise<boolean> {
  const row = { createdAt: new Date().toISOString(), ...record };
  return onNetlify ? blobInsert(name, row) : fileInsert(name, row);
}

export function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export const storageMode = onNetlify ? 'netlify-blobs' : 'local-file';
