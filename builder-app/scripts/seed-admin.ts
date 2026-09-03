import { auth } from '../src/lib/auth';
import { prisma } from '../src/lib/db';

async function main() {
  const adminEmail = (process.env.SUPER_ADMIN_EMAIL || 'quraninstitute.isb@gmail.com').trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD || 'AdminPassword123!';

  console.log(`Seeding super admin user: ${adminEmail}`);

  // Delete existing if any to ensure clean credentials
  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
    include: { accounts: true },
  });

  if (existingUser) {
    console.log(`Existing user found. Resetting password and ensuring admin role...`);
    await prisma.user.delete({
      where: { id: existingUser.id },
    });
  }

  // Create via Better Auth API
  await auth.api.signUpEmail({
    body: {
      email: adminEmail,
      password: password,
      name: 'Super Admin',
    },
  });

  // Ensure role is explicitly set to admin
  await prisma.user.update({
    where: { email: adminEmail },
    data: { role: 'admin' },
  });

  console.log(`Successfully seeded super admin: ${adminEmail}`);
}

main()
  .catch((e) => {
    console.error('Failed to seed admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
