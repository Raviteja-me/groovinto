// File-based storage used until a real database is attached.
// Records are JSON arrays in ./data (or DATA_DIR). If that folder is read-only
// (for example on some serverless hosts) it falls back to the OS temp folder.
// Paid registrations are ALSO always readable from Razorpay itself, so no payment is lost.
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const PRIMARY = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FALLBACK = path.join(os.tmpdir(), 'groovinto-data');

export type Collection = 'registrations' | 'enquiries' | 'subscribers' | 'payment_failures';

async function readFrom(dir: string, name: Collection): Promise<any[]> {
  try {
    const raw = await fs.readFile(path.join(dir, `${name}.json`), 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function writeTo(dir: string, name: Collection, rows: any[]) {
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${name}.json`);
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(rows, null, 2));
  await fs.rename(tmp, file);
}

export async function readAll<T = any>(name: Collection): Promise<T[]> {
  const [a, b] = await Promise.all([readFrom(PRIMARY, name), readFrom(FALLBACK, name)]);
  const seen = new Set<string>();
  const out: any[] = [];
  for (const row of [...a, ...b]) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    out.push(row);
  }
  return out.sort((x, y) => String(y.createdAt).localeCompare(String(x.createdAt)));
}

// Serialise writes inside one process so concurrent requests do not clobber the file.
let queue: Promise<unknown> = Promise.resolve();

/** Adds a record. If `id` already exists nothing is written. Returns true when created. */
export function insert(name: Collection, record: Record<string, any> & { id: string }): Promise<boolean> {
  const run = async () => {
    const row = { createdAt: new Date().toISOString(), ...record };
    for (const dir of [PRIMARY, FALLBACK]) {
      try {
        const rows = await readFrom(dir, name);
        if (rows.some((r) => r.id === row.id)) return false;
        rows.push(row);
        await writeTo(dir, name, rows);
        return true;
      } catch (err: any) {
        console.warn(`[store] could not write ${name} to ${dir}:`, err?.message);
      }
    }
    throw new Error('No writable data directory');
  };
  const p = queue.then(run, run);
  queue = p.catch(() => undefined);
  return p;
}

export function newId(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
