// extracted from normalizeTemplates.ts — that file retires in 5.4-E; this is the surviving copy

/**
 * Policy prose generation + page builder.
 *
 * Ported verbatim from `src/lib/normalizeTemplates.ts` (originally adapted from
 * `template/src/lib/constants.ts`): the four policy generators, the `## `-heading
 * splitter, and `buildPolicyPage`. The archetype composer calls `buildPolicyPage`
 * for every slug in an archetype's `composition.policies`.
 */

import type { BusinessInfo, PolicyBlock, Section, SitePage } from '@/site/schema';

export function getPrivacyPolicy(b: BusinessInfo): string {
  return `
# Privacy Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

This Privacy Policy describes how **${b.name}** ("we," "our," or "us"), registered in ${b.jurisdiction} (Registration No. ${b.registrationNumber}), collects, uses, and protects your personal information when you visit our website (${b.website}) or engage our services.

## 1. Information We Collect
- **Contact Details:** Name, business email, telephone number, job title, and company name.
- **Billing Information:** Invoicing address, tax identification numbers, and payment details processed via secure, PCI-DSS compliant payment gateways.
- **Technical Telemetry:** IP address, browser type, device identifiers, and website usage telemetry collected via secure cookies.

## 2. How We Use Your Information
- To deliver, maintain, and optimize our services and deliverables.
- To execute contracts, invoice services, and comply with statutory financial auditing obligations under ${b.governingLaw}.
- To communicate project milestones, service updates, and security notices.

## 3. Data Protection & Security
We employ industry-standard 256-bit SSL encryption, role-based access control (RBAC), and SOC2-compliant cloud storage to safeguard your data against unauthorized access, alteration, or disclosure.

## 4. Third-Party Disclosures
We do not sell, rent, or trade your personal data. Data is shared strictly with essential service partners bound by strict confidentiality agreements.

## 5. Your Rights
Under applicable data protection laws, you have the right to access, rectify, or request deletion of your personal information. Contact our Data Protection Officer at **${b.email}**.

## 6. Contact Information
**${b.name}** — Business Registration No. ${b.registrationNumber}. Registered Address: ${b.registeredAddress}. Email: ${b.email} | Phone: ${b.phone}.
`.trim();
}

export function getTermsConditions(b: BusinessInfo): string {
  return `
# Terms and Conditions of Service

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

These Terms and Conditions ("Terms") constitute a legally binding agreement between the client ("you") and **${b.name}** ("we," "us"), registered under the laws of ${b.jurisdiction} (Registration No. ${b.registrationNumber}).

## 1. Services & Deliverables
We provide professional technology, retail, or infrastructure services as described in the service tier, catalogue, or agreed Scope of Work (SOW). All deliverables are produced to professional commercial standards.

## 2. Payment Terms
- All fees are quoted in the currency indicated on our website or order confirmation.
- Payments may be remitted via corporate bank transfer, credit card, or authorized invoice gateway.
- Invoices are due upon receipt unless agreed otherwise in writing.

## 3. Intellectual Property Rights
Upon full payment of all fees due, all custom code, configurations, and deliverables developed specifically for the client shall become the exclusive intellectual property of the client. Pre-existing frameworks and reusable libraries remain the property of ${b.name}.

## 4. Limitation of Liability
To the maximum extent permitted by ${b.governingLaw}, our maximum aggregate liability arising out of or related to our services shall not exceed the total fees paid by the client in the preceding three (3) months.

## 5. Governing Law & Jurisdiction
These Terms shall be governed by and construed in accordance with **${b.governingLaw}**. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of ${b.jurisdiction}.

## 6. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Email: ${b.email} | Phone: ${b.phone}.
`.trim();
}

export function getRefundPolicy(b: BusinessInfo): string {
  return `
# Refund and Cancellation Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

At **${b.name}**, we are committed to delivering the highest caliber of service. This policy outlines our refund and cancellation terms in accordance with consumer protection standards and payment card network requirements.

## 1. Professional Engagements & Products
- If you request cancellation before project initiation, you are entitled to a **100% full refund**.
- If you are dissatisfied with an initial milestone delivery within **14 calendar days**, contact our support team to request a review or prorated refund for unperformed scope.

## 2. Managed & Subscription Services
- Monthly support retainers may be cancelled at any time with 30 days written notice prior to the next billing cycle.
- Annual commitments cancelled within the first 30 days are eligible for a prorated refund of unused months.

## 3. Physical Product / Hardware Purchases
- Physical items may be returned in original, unopened packaging within **30 days of delivery** for a full refund.
- Defective items will be replaced immediately with express shipping at our expense.

## 4. Refund Processing Time
Approved refunds are processed to the original payment method (bank account or credit card) within **5 to 10 business days**.

## 5. How to Request a Refund
Please email **${b.email}** with your Order ID, invoice number, and reason for the request. Our management team responds within 2 business days.

## 6. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Governed by ${b.governingLaw}.
`.trim();
}

export function getShippingPolicy(b: BusinessInfo): string {
  return `
# Shipping and Delivery Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

## 1. Digital Service Delivery
- **Instant Delivery:** Digital software access, account credentials, and platform provisioning are initiated within **1 to 24 hours** of confirmed payment.
- **Consulting Engagements:** Project kickoff and onboarding materials are delivered electronically via secure client portal within 1 business day.

## 2. Physical Deliveries (Hardware & Goods)
- **Courier Partners:** We dispatch physical goods via DHL Express, FedEx, and regional freight carriers.
- **Estimated Transit Times:** Domestic / regional delivery **1 - 3 business days**; international express delivery **3 - 7 business days**.
- **Tracking:** Real-time tracking numbers are automatically emailed upon parcel dispatch.

## 3. Customs, Duties & Insurance
International shipments may be subject to import duties and taxes determined by the destination customs authority. All parcels are insured against loss or transit damage until signed for by the recipient.

## 4. Contact for Shipping Inquiries
For questions regarding digital provisioning or parcel dispatch, contact **${b.email}** or call **${b.phone}**.

## 5. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Governed by ${b.governingLaw}.
`.trim();
}

const POLICY_TITLE: Record<string, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  refund: 'Refund & Cancellation Policy',
  shipping: 'Shipping & Delivery Policy',
};

/** Split policy markdown into `{ title, lastUpdated, blocks[] }` on `## ` headings. */
export function splitPolicy(md: string, slug: string): {
  title: string;
  lastUpdated: string;
  blocks: PolicyBlock[];
} {
  const lines = md.split('\n');
  let title = POLICY_TITLE[slug] || 'Policy';
  let lastUpdated = '';
  const blocks: PolicyBlock[] = [];
  let heading = 'Overview';
  let body: string[] = [];

  const flush = () => {
    const text = body.join('\n').trim();
    if (text) blocks.push({ heading, body: text });
    body = [];
  };

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    if (h1) {
      title = h1[1].trim();
      continue;
    }
    if (h2) {
      flush();
      heading = h2[1].trim();
      continue;
    }
    const lu = line.match(/\*\*Last Updated:\*\*\s*(.+)/i);
    if (lu) {
      lastUpdated = lu[1].trim();
      continue;
    }
    if (/\*\*Effective Date:\*\*/i.test(line)) continue;
    body.push(line);
  }
  flush();

  return { title, lastUpdated: lastUpdated || 'August 1, 2026', blocks };
}

export function buildPolicyPage(slug: string, business: BusinessInfo): SitePage {
  const md =
    slug === 'privacy'
      ? getPrivacyPolicy(business)
      : slug === 'terms'
        ? getTermsConditions(business)
        : slug === 'refund'
          ? getRefundPolicy(business)
          : getShippingPolicy(business);

  const { title, lastUpdated, blocks } = splitPolicy(md, slug);

  const section = {
    id: `policy-${slug}-policyDocument-0`,
    enabled: true,
    type: 'policyDocument',
    props: { title, lastUpdated, sections: blocks },
  } as unknown as Section;

  return {
    key: `policy:${slug}`,
    path: `/policies/${slug}`,
    title,
    navLabel: title,
    nav: false,
    sections: [section],
  };
}
