import { auth } from '../src/lib/auth';
import { prisma } from '../src/lib/db';

async function main() {
  const adminEmail = process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!adminEmail) throw new Error('SUPER_ADMIN_EMAIL must be set — no hardcoded default.');
  if (!password || password.length < 12) {
    throw new Error(
      'SUPER_ADMIN_PASSWORD must be set to a real secret (12+ chars) — no hardcoded default. ' +
        'Generate one, e.g.: node -e "console.log(require(\'crypto\').randomBytes(18).toString(\'base64url\'))"',
    );
  }

  console.log(`Seeding super admin user: ${adminEmail}`);

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
    include: { accounts: true },
  });

  if (existingUser) {
    const ownedProjects = await prisma.project.count({ where: { ownerId: existingUser.id } });
    if (ownedProjects > 0) {
      throw new Error(
        `Refusing to reset: ${adminEmail} owns ${ownedProjects} project(s). Deleting this user ` +
          `cascade-deletes them. Reassign or back up those projects first, or reset the password ` +
          `directly via better-auth instead of this script.`,
      );
    }
    console.log(`Existing user found with no owned projects. Resetting password and role...`);
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
