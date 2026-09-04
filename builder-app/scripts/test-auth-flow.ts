import 'dotenv/config';
import { auth } from '../src/lib/auth';
import { prisma } from '../src/lib/db';

// Helper assertion function
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[ASSERTION FAILED] ${message}`);
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('  STARTING END-TO-END AUTH FLOW TEST SUITE');
  console.log('='.repeat(60));

  let passedTests = 0;
  const totalTests = 3;

  // -------------------------------------------------------------------------
  // TEST 1: Super Admin Sign-In
  // -------------------------------------------------------------------------
  console.log('\n[TEST 1] Testing Super Admin sign-in...');
  const adminEmail = 'quraninstitute.isb@gmail.com';
  const adminPassword = 'Admin@12345678';

  const adminResponse = await auth.api.signInEmail({
    body: {
      email: adminEmail,
      password: adminPassword,
    },
    asResponse: true,
  });

  assert(adminResponse.ok, 'Admin sign-in HTTP response should be OK');
  const adminSetCookie = adminResponse.headers.get('set-cookie') || '';
  const adminCookiePair = adminSetCookie.split(';')[0];
  const adminBody = (await adminResponse.json()) as { token: string; user: { email: string } };

  assert(!!adminBody.token, 'Admin sign-in should return a session token');
  assert(adminBody.user?.email === adminEmail, `Admin email should match ${adminEmail}`);

  // Verify role in database
  const adminDbUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  assert(adminDbUser !== null, 'Admin user must exist in database');
  assert(adminDbUser.role === 'admin', `Admin role must be 'admin', got '${adminDbUser.role}'`);

  // Verify session in database
  const adminDbSession = await prisma.session.findUnique({
    where: { token: adminBody.token },
  });
  assert(adminDbSession !== null, 'Admin session must exist in database');
  assert(adminDbSession.userId === adminDbUser.id, 'Admin session userId must match admin user id');
  assert(new Date(adminDbSession.expiresAt) > new Date(), 'Admin session must not be expired');

  // When using cookies in Next.js / Better Auth, headers contain signed session token
  const adminSessionResolved = await auth.api.getSession({
    headers: new Headers({
      cookie: adminCookiePair,
    }),
  });
  assert(adminSessionResolved !== null, 'getSession with cookie should resolve admin session');
  assert(adminSessionResolved.user.email === adminEmail, 'Resolved session email must match admin');

  console.log('  ✓ Super admin signed in successfully');
  console.log(`  ✓ Verified email: ${adminDbUser.email}`);
  console.log(`  ✓ Verified role: '${adminDbUser.role}'`);
  console.log(`  ✓ Verified active DB session: ${adminDbSession.token.slice(0, 8)}...`);
  console.log('  [PASS] Test 1: Super Admin Sign-In passed.');
  passedTests++;

  // -------------------------------------------------------------------------
  // TEST 2: Direct User Sign-Up, Role Verification, and Session Creation
  // -------------------------------------------------------------------------
  console.log('\n[TEST 2] Testing User sign-up, role verification, and session creation...');
  const testUserEmail = 'testuser@example.com';
  const testUserPassword = 'TestUser@123456';
  const testUserName = 'Test User';

  // Clean up any pre-existing test user from previous runs to ensure fresh state
  const existingTestUser = await prisma.user.findUnique({
    where: { email: testUserEmail },
  });
  if (existingTestUser) {
    await prisma.user.delete({
      where: { id: existingTestUser.id },
    });
    console.log('  (Cleaned up previous testuser from database)');
  }

  // Perform sign-up with asResponse: true to capture signed Set-Cookie
  const signUpResponse = await auth.api.signUpEmail({
    body: {
      email: testUserEmail,
      password: testUserPassword,
      name: testUserName,
    },
    asResponse: true,
  });

  assert(signUpResponse.ok, 'Sign-up HTTP response should be OK');
  const userSetCookie = signUpResponse.headers.get('set-cookie') || '';
  const userCookiePair = userSetCookie.split(';')[0];
  const signUpBody = (await signUpResponse.json()) as { token: string; user: { email: string } };

  assert(!!signUpBody.token, 'Sign-up should return a session token');
  assert(signUpBody.user?.email === testUserEmail, `Sign-up email should match ${testUserEmail}`);

  const userToken = signUpBody.token;

  // Verify user in database and verify role is 'user'
  const userDb = await prisma.user.findUnique({
    where: { email: testUserEmail },
  });
  assert(userDb !== null, 'Test user must exist in database');
  assert(userDb.role === 'user', `User role must be 'user', got '${userDb.role}'`);
  assert(userDb.name === testUserName, `User name must match '${testUserName}'`);

  // Verify session in database
  const userDbSession = await prisma.session.findUnique({
    where: { token: userToken },
  });
  assert(userDbSession !== null, 'User session must exist in database');
  assert(userDbSession.userId === userDb.id, 'Session userId must match test user id');
  assert(new Date(userDbSession.expiresAt) > new Date(), 'User session must not be expired');

  // Verify getSession retrieves user correctly via cookie
  const userSessionResolved = await auth.api.getSession({
    headers: new Headers({
      cookie: userCookiePair,
    }),
  });
  assert(userSessionResolved !== null, 'getSession with cookie should resolve user session');
  assert(userSessionResolved.user.email === testUserEmail, 'Resolved session email must match test user');

  console.log('  ✓ User signed up successfully');
  console.log(`  ✓ Verified email: ${userDb.email}`);
  console.log(`  ✓ Verified role is 'user': ${userDb.role}`);
  console.log(`  ✓ Verified active session in DB: ${userDbSession.token.slice(0, 8)}...`);
  console.log('  [PASS] Test 2: User Sign-Up & Session Creation passed.');
  passedTests++;

  // -------------------------------------------------------------------------
  // TEST 3: Sign-Out and Session Destruction
  // -------------------------------------------------------------------------
  console.log('\n[TEST 3] Testing Sign-out and session destruction...');

  // Sign out / revoke session
  await auth.api.signOut({
    headers: new Headers({
      cookie: userCookiePair,
    }),
  });

  // Verify session is destroyed in DB
  const destroyedDbSession = await prisma.session.findUnique({
    where: { token: userToken },
  });
  assert(
    destroyedDbSession === null,
    'Session must be completely deleted from database after sign-out'
  );

  // Verify getSession no longer resolves the session
  const postSignOutSession = await auth.api.getSession({
    headers: new Headers({
      cookie: userCookiePair,
    }),
  });
  assert(
    postSignOutSession === null,
    'getSession must return null for a destroyed session'
  );

  // Cleanup test user to leave DB clean
  await prisma.user.delete({
    where: { id: userDb.id },
  });
  console.log('  ✓ Test user signed out successfully');
  console.log('  ✓ Verified session token was removed from DB');
  console.log('  ✓ Verified getSession returned null for destroyed session');
  console.log('  ✓ Cleaned up test user record from database');
  console.log('  [PASS] Test 3: Sign-out & Session Destruction passed.');
  passedTests++;

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------
  console.log('\n' + '='.repeat(60));
  console.log(`  TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED (100%)`);
  console.log('='.repeat(60) + '\n');
}

runTests()
  .catch((err) => {
    console.error('\n❌ TEST SUITE FAILED with error:\n', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
