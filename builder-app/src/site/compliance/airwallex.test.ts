/**
 * Quick behavioural test for the Airwallex readiness auditor.
 * Run: npx tsx src/site/compliance/airwallex.test.ts
 */
import { auditAirwallexReadiness } from './airwallex';
import { NORMALIZED_TEMPLATES } from '@/lib/normalizeTemplates';
import type { SiteContent } from '@/site/schema';

function makeContent(overrides: Partial<SiteContent> = {}): SiteContent {
  const base = JSON.parse(
    JSON.stringify(NORMALIZED_TEMPLATES[0]),
  ) as SiteContent;
  return { ...base, ...overrides };
}

let failures = 0;
function expect(cond: boolean, msg: string) {
  if (cond) {
    console.log('  ✓ ' + msg);
  } else {
    failures++;
    console.error('  ✗ ' + msg);
  }
}

// 1. A well-formed ecommerce site (with shipping policy + checkout URL) should be ready.
const good = makeContent({ mode: 'ecommerce', airwallexCheckoutUrl: 'https://checkout.airwallex.com/pay/abc' });
if (!good.pages.some((p) => p.path === '/policies/shipping')) {
  good.pages.push({
    ...JSON.parse(JSON.stringify(good.pages.find((p) => p.path === '/policies/refund')!)),
    key: 'policy:shipping',
    path: '/policies/shipping',
    title: 'Shipping Policy',
  });
}
const goodAudit = auditAirwallexReadiness(good);
console.log('\n[1] Complete ecommerce site');
expect(goodAudit.failCount === 0, `no failures (got ${goodAudit.failCount}: ${goodAudit.checks.filter(c => c.status === 'fail').map(c => c.id).join(', ')})`);
expect(goodAudit.ready, 'audit.ready === true');

// 2. Missing checkout URL in ecommerce mode must fail.
const noUrl = makeContent({ mode: 'ecommerce' });
delete (noUrl as Partial<SiteContent>).airwallexCheckoutUrl;
const noUrlAudit = auditAirwallexReadiness(noUrl);
console.log('\n[2] Ecommerce without Airwallex URL');
expect(noUrlAudit.checks.some((c) => c.id === 'checkout.liveUrl' && c.status === 'fail'), 'checkout.liveUrl fails');
expect(!noUrlAudit.ready, 'audit.ready === false');

// 3. Non-Airwallex checkout URL should warn (external redirection risk).
const stripeUrl = makeContent({ mode: 'ecommerce', airwallexCheckoutUrl: 'https://checkout.stripe.com/pay/abc' });
const stripeAudit = auditAirwallexReadiness(stripeUrl);
console.log('\n[3] External (non-Airwallex) checkout URL');
expect(stripeAudit.checks.some((c) => c.id === 'checkout.liveUrl' && c.status === 'warn'), 'checkout.liveUrl warns');

// 4. Removing a policy page must fail.
const noPrivacy = makeContent();
noPrivacy.pages = noPrivacy.pages.filter((p) => p.path !== '/policies/privacy');
const noPrivacyAudit = auditAirwallexReadiness(noPrivacy);
console.log('\n[4] Missing privacy policy');
expect(noPrivacyAudit.checks.some((c) => c.id === 'policy./policies/privacy' && c.status === 'fail'), 'policy./policies/privacy fails');
expect(!noPrivacyAudit.ready, 'audit.ready === false');

// 5. Missing About page must fail.
const noAbout = makeContent();
noAbout.pages = noAbout.pages.filter((p) => p.path !== '/about');
const noAboutAudit = auditAirwallexReadiness(noAbout);
console.log('\n[5] Missing about page');
expect(noAboutAudit.checks.some((c) => c.id === 'pages.about' && c.status === 'fail'), 'pages.about fails');

// 6. Free-webmail contact should warn.
const gmail = makeContent();
gmail.business.email = 'support@gmail.com';
const gmailAudit = auditAirwallexReadiness(gmail);
console.log('\n[6] Free-webmail contact email');
expect(gmailAudit.checks.some((c) => c.id === 'business.emailDomain' && c.status === 'warn'), 'business.emailDomain warns');

// 7. Governing-law mismatch should fail: change jurisdiction so the terms
//    body (which names the original jurisdiction) no longer matches.
const mismatch = makeContent();
mismatch.business.jurisdiction = 'Singapore';
mismatch.business.governingLaw = 'the laws of Singapore';
const mismatchAudit = auditAirwallexReadiness(mismatch);
console.log('\n[7] Governing-law / jurisdiction mismatch');
expect(
  mismatchAudit.checks.some((c) => c.id === 'policy.governingLaw' && c.status === 'fail'),
  'policy.governingLaw fails when jurisdiction does not match terms body',
);

console.log(
  failures === 0 ? '\n🎉 AIRWALLEX AUDITOR TEST PASSED' : `\n❌ ${failures} AUDITOR TEST(S) FAILED`,
);
if (failures > 0) process.exit(1);
