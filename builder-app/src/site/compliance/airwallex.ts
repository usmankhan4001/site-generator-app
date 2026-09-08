/**
 * Airwallex payment-method onboarding readiness audit.
 *
 * Encodes the requirements from
 * https://www.airwallex.com/docs/payments/payment-methods/payment-method-onboarding-requirement
 * (Visa / Mastercard rows) as a pure check over `SiteContent`, so the studio
 * can show a live readiness panel and the publish flow can gate on it.
 *
 * Requirements covered:
 *  1. Business identification details — company name, registration number,
 *     contact information (address, email, phone) clearly displayed.
 *  2. Industry alignment — the site must have real offer/content (cannot be
 *     verified automatically; surfaced as an operator checklist item).
 *  3. Website policies — Terms & Conditions, Shipping & Refund Policy,
 *     Privacy Policy pages must exist with content.
 *  4. Checkout experience — checkout with clear pricing and product details.
 *  5. No external redirection — checkout must not send users off-site (the
 *     Airwallex Hosted Payment Page is the sanctioned exception).
 *  6. Governing law — the terms of service must be governed by the law of the
 *     business's registered country.
 *
 * Keep this file pure (no React, no Node APIs) so it runs anywhere.
 */

import type { SiteContent } from '@/site/schema';

export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface ComplianceCheck {
  /** Stable id, e.g. 'business.registrationNumber'. */
  id: string;
  /** Which Airwallex requirement this maps to. */
  requirement:
    | 'Business identification details'
    | 'Website policies'
    | 'Checkout experience'
    | 'No external redirection'
    | 'Governing law'
    | 'Industry alignment';
  status: CheckStatus;
  /** Short human label for the checklist row. */
  label: string;
  /** What to do when not passing. */
  fix?: string;
}

export interface AirwallexAudit {
  checks: ComplianceCheck[];
  /** true when no check has status 'fail'. */
  ready: boolean;
  failCount: number;
  warnCount: number;
}

/** Hosts we consider sanctioned checkout redirects (Airwallex hosted pages). */
const AIRWALLEX_CHECKOUT_HOSTS = [
  'checkout.airwallex.com',
  'airwallex.com',
  'airwallexpayment.com',
  'checkout.airwallexpayment.com',
];

function isAirwallexUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return AIRWALLEX_CHECKOUT_HOSTS.some(
      (h) => host === h || host.endsWith(`.${h}`),
    );
  } catch {
    return false;
  }
}

function pageBody(content: SiteContent, path: string): string {
  const page = content.pages.find((p) => p.path === path);
  if (!page) return '';
  return page.sections
    .filter((s) => s.enabled)
    .map((s) => {
      const props = s.props as { body?: string; sections?: { body?: string }[] };
      let text = props.body ?? '';
      if (props.sections) {
        text += ' ' + props.sections.map((sec) => sec.body ?? '').join(' ');
      }
      return text;
    })
    .join(' ');
}

export function auditAirwallexReadiness(content: SiteContent): AirwallexAudit {
  const checks: ComplianceCheck[] = [];
  const b = content.business;
  const isEcommerce = content.mode === 'ecommerce';

  /* ── 1. Business identification details ─────────────────────────────── */

  const bizFields: { key: string; label: string; value: string | undefined }[] = [
    { key: 'legalName', label: 'Legal entity name', value: b.legalName || b.name },
    { key: 'registrationNumber', label: 'Registration number', value: b.registrationNumber },
    { key: 'registeredAddress', label: 'Registered address', value: b.registeredAddress },
    { key: 'email', label: 'Contact email', value: b.email },
    { key: 'phone', label: 'Contact phone', value: b.phone },
  ];
  for (const f of bizFields) {
    const ok = Boolean(f.value && f.value.trim());
    checks.push({
      id: `business.${f.key}`,
      requirement: 'Business identification details',
      status: ok ? 'pass' : 'fail',
      label: f.label,
      fix: ok ? undefined : `Set this in the business details form — Airwallex reviewers look for it in the footer / policy pages.`,
    });
  }

  // The footer legal bar must render these as clearly labelled, separate
  // fields — a run-on line reads as malformed data to reviewers.
  const regLooksClean = Boolean(
    b.registrationNumber && b.registeredAddress &&
    !b.registeredAddress.startsWith(b.registrationNumber),
  );
  checks.push({
    id: 'business.footerFormatting',
    requirement: 'Business identification details',
    status: regLooksClean ? 'pass' : 'warn',
    label: 'Footer legal bar is cleanly labelled',
    fix: 'Keep the registration number and address as separate labelled lines in the footer.',
  });

  /* ── 2. Website policies ────────────────────────────────────────────── */

  const policyPages: { path: string; label: string; body: string; required: boolean }[] = [
    { path: '/policies/terms', label: 'Terms & Conditions', body: pageBody(content, '/policies/terms'), required: true },
    { path: '/policies/privacy', label: 'Privacy Policy', body: pageBody(content, '/policies/privacy'), required: true },
    { path: '/policies/refund', label: 'Refund Policy', body: pageBody(content, '/policies/refund'), required: true },
    { path: '/policies/shipping', label: 'Shipping Policy', body: pageBody(content, '/policies/shipping'), required: isEcommerce },
  ];
  for (const p of policyPages) {
    const ok = p.body.trim().length > 200;
    checks.push({
      id: `policy.${p.path}`,
      requirement: 'Website policies',
      status: ok ? 'pass' : p.required ? 'fail' : 'warn',
      label: `${p.label} page has content`,
      fix: ok
        ? undefined
        : p.required
          ? `The ${p.path} page is missing or empty. Airwallex requires T&C, shipping & refund, and privacy policies.`
          : `No ${p.label} page. Required for physical-goods businesses; optional for pure services.`,
    });
  }

  /* ── 2b. Site substance (About / Contact) ───────────────────────────── */

  // Reviewers assess whether the business looks real. A thin or missing
  // About page is one of the strongest signals of a template-only site.
  const aboutBody = content.pages
    .filter((p) => p.path === '/about')
    .map((p) =>
      p.sections
        .filter((s) => s.enabled)
        .map((s) => {
          const props = s.props as { body?: string; title?: string; headline?: string };
          return `${props.title ?? ''} ${props.headline ?? ''} ${props.body ?? ''}`;
        })
        .join(' '),
    )
    .join(' ');
  checks.push({
    id: 'pages.about',
    requirement: 'Industry alignment',
    status: aboutBody.trim().length > 200 ? 'pass' : 'fail',
    label: 'About page has real substance',
    fix: 'Write a genuine About page (who the business is, what it sells, where it operates). Thin or placeholder About pages are a common rejection reason.',
  });

  const contactPage = content.pages.find((p) => p.path === '/contact');
  const contactSections = contactPage
    ? contactPage.sections.filter((s) => s.enabled)
    : [];
  const contactBody = contactSections
    .map((s) => {
      const props = s.props as { body?: string; title?: string };
      return `${props.title ?? ''} ${props.body ?? ''}`;
    })
    .join(' ');
  checks.push({
    id: 'pages.contact',
    requirement: 'Business identification details',
    status: contactSections.length > 0 ? 'pass' : 'fail',
    label: 'Contact page with support details',
    fix: 'Add a contact page with the support email, phone, and a contact form so reviewers can reach the business.',
  });

  // The footer renders the support email by construction; the real risks are
  // (a) free-webmail contact addresses, which underwriters distrust, and
  // (b) Cloudflare Email Obfuscation hiding it from static reviewers — the
  // generated DEPLOY.md carries the instruction to disable that.
  const freeMail = /@(gmail|yahoo|hotmail|outlook|live|aol|icloud|qq|163|126)\./i;
  checks.push({
    id: 'business.emailDomain',
    requirement: 'Business identification details',
    status: !b.email
      ? 'fail'
      : freeMail.test(b.email)
        ? 'warn'
        : 'pass',
    label: 'Support email on the business domain',
    fix: freeMail.test(b.email)
      ? `Contact email ${b.email} is a free-webmail address. Use an address on ${b.website || 'the business domain'} (e.g. support@…) — reviewers trust domain email far more.`
      : 'Also disable Cloudflare Email Address Obfuscation on the deployed domain so the email stays plain text for reviewers.',
  });

  /* ── 3. Governing law matches registration jurisdiction ─────────────── */

  const termsBody = policyPages[0].body.toLowerCase();
  const jurisdictionToken = b.jurisdiction.trim().toLowerCase().split(/[\s,]+/)[0];
  const mentionsJurisdiction =
    jurisdictionToken.length > 2 && termsBody.includes(jurisdictionToken);
  const mentionsGoverning = termsBody.includes('governed by');
  checks.push({
    id: 'policy.governingLaw',
    requirement: 'Governing law',
    status: mentionsGoverning && mentionsJurisdiction ? 'pass' : 'fail',
    label: `Terms governed by the law of ${b.jurisdiction}`,
    fix: mentionsGoverning
      ? `The Terms of Service must state they are governed by the laws of ${b.jurisdiction} (the business's registered country).`
      : 'Add a "Governing law" section to the Terms of Service.',
  });

  /* ── 4. Checkout experience ─────────────────────────────────────────── */

  const hasProducts = content.pages
    .flatMap((p) => p.sections)
    .some(
      (s) =>
        s.enabled &&
        ['productGrid', 'pricingTiers', 'checkout'].includes(s.type),
    );
  checks.push({
    id: 'checkout.pricing',
    requirement: 'Checkout experience',
    status: hasProducts ? 'pass' : 'fail',
    label: 'Site shows products / pricing with a checkout path',
    fix: hasProducts ? undefined : 'Add a product grid, pricing tiers, or checkout section so reviewers see clear pricing.',
  });

  if (isEcommerce) {
    const url = content.airwallexCheckoutUrl;
    if (!url) {
      checks.push({
        id: 'checkout.liveUrl',
        requirement: 'Checkout experience',
        status: 'fail',
        label: 'Live Airwallex checkout connected',
        fix: 'Paste the client’s Airwallex Hosted Payment Page / Payment Link URL in the publish panel. A demo checkout that collects card numbers but never charges will fail review.',
      });
    } else if (!isAirwallexUrl(url)) {
      checks.push({
        id: 'checkout.liveUrl',
        requirement: 'No external redirection',
        status: 'warn',
        label: 'Checkout URL is not a recognised Airwallex hosted page',
        fix: 'Airwallex requires no external redirection at checkout. Confirm the URL is the client’s Airwallex Hosted Payment Page.',
      });
    } else {
      checks.push({
        id: 'checkout.liveUrl',
        requirement: 'Checkout experience',
        status: 'pass',
        label: 'Live Airwallex hosted checkout connected',
      });
    }
  }

  /* ── 5. Industry alignment (operator judgement) ─────────────────────── */

  checks.push({
    id: 'industry.alignment',
    requirement: 'Industry alignment',
    status: 'warn',
    label: 'Site content matches the industry declared on the Airwallex application',
    fix: 'Operator check: the declared merchant category (MCC) and the site’s visible products/services must tell the same story.',
  });

  const failCount = checks.filter((c) => c.status === 'fail').length;
  const warnCount = checks.filter((c) => c.status === 'warn').length;

  return { checks, ready: failCount === 0, failCount, warnCount };
}
