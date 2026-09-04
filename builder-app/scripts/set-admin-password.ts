import 'dotenv/config';
import { auth } from '../src/lib/auth';
import { prisma } from '../src/lib/db';

async function main() {
  const email = (process.env.SUPER_ADMIN_EMAIL || 'quraninstitute.isb@gmail.com').trim().toLowerCase();
  const password = process.argv[2] || 'Admin@12345678';

  console.log(`Setting password for super admin: ${email}`);

  // Delete existing auth records for this email
  await prisma.session.deleteMany({ where: { user: { email } } });
  await prisma.account.deleteMany({ where: { user: { email } } });
  await prisma.user.deleteMany({ where: { email } });

  // Sign up super admin fresh via Better Auth
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name: 'Super Admin',
    },
  });

  // Promote to admin
  await prisma.user.update({
    where: { email },
    data: { role: 'admin' },
  });

  console.log(`\n🎉 Super admin credentials set successfully:`);
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role:     admin\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Error setting admin credentials:', err);
  process.exit(1);
});
