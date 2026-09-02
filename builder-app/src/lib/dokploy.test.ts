import { DokployClient } from './dokploy';

async function testDokployProbe() {
  console.log('🧪 Testing DokployClient.verifyLiveEndpoint...');

  const dokploy = new DokployClient();

  const result = await dokploy.verifyLiveEndpoint({
    domain: 'paas.usmankhan.xyz',
    routes: ['/', '/about', '/services', '/contact'],
    maxRetries: 1,
    timeoutMs: 3000,
    onLog: (msg, lvl) => console.log(`[${lvl || 'info'}] ${msg}`),
  });

  console.log('\nProbe Result:');
  console.log('Verified:', result.verified);
  console.log('Base URL:', result.baseUrl);
  console.log('Routes verified:', Object.keys(result.verifiedRoutes));

  if (result.verified && Object.keys(result.verifiedRoutes).length === 4) {
    console.log('🎉 DOKPLOY LIVE ENDPOINT VERIFICATION TEST PASSED!');
  } else {
    console.error('❌ Test failed');
    process.exit(1);
  }
}

testDokployProbe().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
