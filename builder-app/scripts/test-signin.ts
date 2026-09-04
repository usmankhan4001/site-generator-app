import 'dotenv/config';
import { auth } from '../src/lib/auth';
import { prisma } from '../src/lib/db';

async function main() {
  const email = 'quraninstitute.isb@gmail.com';
  const password = 'Admin@12345678';

  console.log(`Testing auth sign in for: ${email}`);

  const user = await prisma.user.findUnique({ where: { email } });
  console.log('User in DB:', user ? { id: user.id, email: user.email, role: user.role } : 'NOT FOUND');

  const account = await prisma.account.findFirst({ where: { userId: user?.id } });
  console.log('Account in DB:', account ? { id: account.id, providerId: account.providerId, hasPassword: !!account.password } : 'NOT FOUND');

  try {
    const res = await auth.api.signInEmail({
      body: { email, password },
    });
    console.log('Sign in success! Response token/user:', res ? { user: res.user?.email, token: res.token } : res);
  } catch (err: any) {
    console.error('Sign in failed with error:', err?.message || err);
  }

  process.exit(0);
}

main().catch(console.error);
