import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { auth } from '../src/lib/auth';

async function main() {
  const jarPath = process.argv[1];
  const raw = await readFile(jarPath, 'utf8');
  const line = raw.split('\n').find((l) => l.includes('better-auth.session_token'));
  console.log('jar line:', line ? line.slice(0, 60) + '...' : '(not found)');
  const cookie = line ? line.split('\t').pop() : '';
  try {
    const session = await auth.api.getSession({
      headers: new Headers({ cookie: `better-auth.session_token=${cookie}` }),
    });
    console.log('session:', session ? JSON.stringify({ user: session.user?.email, role: session.user?.role }) : 'NULL');
  } catch (err: any) {
    console.error('getSession threw:', err?.message || err);
  }
  process.exit(0);
}

main().catch(console.error);