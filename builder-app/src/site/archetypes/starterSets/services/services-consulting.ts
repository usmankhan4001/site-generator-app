/**
 * Starter content set — `services-consulting`: strategic management & corporate advisory firm.
 * Authentic copy for M&A due diligence, corporate restructuring, and enterprise transformation.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const servicesConsulting: StarterContentSet = {
  id: 'services-consulting',
  archetype: 'services',
  name: 'Management & Corporate Advisory',
  description:
    'Board-level strategic advisory, operational restructuring, cross-border M&A diligence, and value-creation programs for mid-market and enterprise leadership.',
  niche: 'Strategic management & corporate advisory',
  tags: ['management-consulting', 'corporate-advisory', 'strategy', 'm-and-a', 'transformation', 'restructuring'],
  needsPersonalization: false,
  themeId: 'blueprint-navy',
  business: {
    name: 'Stratford Advisory Group LLC',
    shortName: 'Stratford Advisory',
    registrationNumber: 'DE-6892415',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of New York',
    registeredAddress: '200 Park Avenue, 17th Floor, New York, NY 10166, USA',
    email: 'advisory@stratfordadvisory.example',
    phone: '+1 (212) 555-0174',
    website: 'stratfordadvisory.example',
    supportHours: 'Monday – Friday, 08:30 – 19:00 (EST)',
  },
  brand: { logoText: 'Stratford Advisory' },
  meta: {
    title: 'Stratford Advisory Group — Strategic Management & Corporate Advisory',
    description:
      'We advise executive boards and private equity sponsors on high-stakes strategic turnarounds, transaction diligence, and organizational performance.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Executive Advisory & Value Creation',
        headline: 'Decisive strategic counsel for',
        accentText: 'pivotal corporate moments',
        subtitle:
          'Stratford Advisory partners with CEOs, boards of directors, and private equity sponsors to navigate complex transactions, accelerate EBITDA expansion, and execute organizational transformation.',
        primaryCta: { label: 'Explore Advisory Practices', href: '/services' },
        secondaryCta: { label: 'Schedule Partner Briefing', href: '/contact' },
        trustBadges: ['Senior-Partner Led', '$18B+ Transaction Value Advised', 'Zero Junior Leverage Model'],
      },
      stats: {
        items: [
          { value: '$18.4B', label: 'Cumulative transaction volume advised' },
          { value: '3.8x', label: 'Average client EBITDA expansion' },
          { value: '140+', label: 'Engagements delivered globally' },
          { value: '96%', label: 'Executive retention & repeat mandate rate' },
        ],
      },
      principles: {
        eyebrow: 'Advisory Pillars',
        title: 'Core practice disciplines',
        description:
          'Direct, uncompromised counsel focused exclusively on measurable commercial and shareholder outcomes.',
        items: [
          {
            icon: 'Briefcase',
            title: 'M&A & Commercial Diligence',
            description:
              'Rigorous buy-side and sell-side diligence, target synergy validation, customer telemetry audits, and post-merger integration roadmaps.',
          },
          {
            icon: 'TrendingUp',
            title: 'Performance & EBITDA Optimization',
            description:
              'Root-cause cost rationalization, pricing architecture redesign, working capital release, and supply chain re-anchoring.',
          },
          {
            icon: 'Compass',
            title: 'Corporate Strategy & Market Entry',
            description:
              'Quantitative market sizing, competitive positioning, organic vs. programmatic M&A modeling, and board-level scenario planning.',
          },
          {
            icon: 'Users',
            title: 'Organizational Architecture',
            description:
              'Executive governance structures, incentive alignment, headcount rationalization, and operating model redesign for post-growth stages.',
          },
        ],
      },
      engagements: {
        eyebrow: 'Engagement Models',
        title: 'Structured for alignment and accountability',
        description:
          'We engage through focused diagnostic sprints, dedicated transaction mandates, or retained senior advisory retainers.',
        currency: 'USD',
        tiers: [
          {
            id: 'diagnostic',
            name: 'Strategic Diagnostic Sprint',
            price: 45000,
            priceUnit: ' one-off',
            description: 'Rapid 4-week executive assessment of corporate strategy, unit economics, and operational drag.',
            features: [
              'Comprehensive balance sheet & EBITDA baseline audit',
              'Internal stakeholder & leadership depth interviews',
              'External customer & competitor benchmark analysis',
              'Actionable 100-day value creation roadmap presentation',
            ],
          },
          {
            id: 'mandate',
            name: 'Transaction / Diligence Mandate',
            price: 95000,
            priceUnit: ' /mandate',
            description: 'Dedicated buy-side/sell-side transaction support, synergy modeling, and closing support.',
            popular: true,
            badge: 'Most Requested',
            features: [
              'Deep-dive commercial & technical diligence',
              'Financial synergy & operational risk matrix modeling',
              'Executive committee & board representation',
              'Post-closing Day-1 and Day-100 execution framework',
            ],
          },
          {
            id: 'retainer',
            name: 'Board Advisory & Transformation',
            price: 25000,
            priceUnit: '/mo',
            description: 'Ongoing senior partner governance, quarterly strategic reviews, and transformation oversight.',
            features: [
              'Bi-weekly CEO / C-Suite advisory sessions',
              'Quarterly board meeting attendance & prep',
              'Direct escalation access to senior managing partners',
              'Interim steering committee leadership',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Our Framework',
        title: 'Disciplined diagnostic to sustainable execution',
        description:
          'We eliminate theoretical slideware in favor of concrete operational changes and board-level deliverables.',
        steps: [
          {
            step: '01',
            title: 'Baseline Diagnostic & Data Ingestion',
            description:
              'Rapid quantitative analysis of financial performance, operational unit economics, client concentration, and organizational bottlenecks.',
            duration: 'Weeks 1–2',
          },
          {
            step: '02',
            title: 'Opportunity Sizing & Strategic Blueprint',
            description:
              'Financial quantification of EBITDA initiatives, risk mitigation matrices, and prioritized board-level strategic options.',
            duration: 'Weeks 3–4',
          },
          {
            step: '03',
            title: 'PMO Setup & Executive Alignment',
            description:
              'Establishment of cross-functional transformation PMO, KPI telemetry dashboards, and clear management accountabilities.',
            duration: 'Weeks 5–6',
          },
          {
            step: '04',
            title: 'Execution Governance & Value Realization',
            description:
              'Weekly milestone tracking, barrier resolution sprints, and verified bottom-line realization audits.',
            duration: 'Months 2–6',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Client Perspectives',
        title: 'Trusted by boardrooms and PE sponsors',
        items: [
          {
            name: 'Robert H. MacIntyre',
            role: 'Managing Partner',
            company: 'Beacon Crest Capital',
            rating: 5,
            text: 'Stratford led the commercial diligence on our $320M industrial tech platform acquisition. Their team identified a hidden churn vulnerability that allowed us to renegotiate valuation by $18M.',
          },
          {
            name: 'Eleanor Vance-Sterling',
            role: 'Chief Executive Officer',
            company: 'Vanguard Logistics Group',
            rating: 5,
            text: 'The EBITDA optimization sprint transformed our margin profile in under 90 days. They worked shoulder-to-shoulder with our division presidents without disrupting operations.',
          },
          {
            name: 'Dr. Arthur Pendelton',
            role: 'Board Chairman',
            company: 'AeroDynamics International',
            rating: 5,
            text: 'Unlike typical consulting giants that staff engagements with recent graduates, Stratford deployed seasoned partners who understood our boardroom dynamics from day one.',
          },
        ],
      },
      faq: {
        eyebrow: 'Advisory Inquiries',
        title: 'Engaging Stratford Advisory',
        items: [
          {
            q: 'How does Stratford Advisory staff client engagements?',
            a: 'Every engagement is directly led and executed by senior Managing Partners with at least 15 years of operating or top-tier consulting experience. We maintain a zero-junior leverage model to ensure high-stakes precision.',
          },
          {
            q: 'Do you structure performance-linked advisory fees?',
            a: 'Yes. For transformation and EBITDA expansion mandates, we frequently align interests by coupling a reduced base retainer with success milestones tied to audited cash-flow improvements.',
          },
          {
            q: 'How quickly can your diligence team deploy on an active transaction?',
            a: 'Our transaction diligence practice can mobilize on-site within 48 to 72 hours of executed mutual non-disclosure agreements.',
          },
          {
            q: 'Do you work with international or cross-border organizations?',
            a: 'Yes. We routinely lead cross-border mandates across North America, the United Kingdom, Western Europe, and Southeast Asia with localized regulatory and cultural nuance.',
          },
        ],
      },
      cta: {
        headline: 'Navigate your next strategic inflection with confidence',
        subtitle:
          'Contact our Managing Partners for a confidential preliminary briefing regarding transactions, transformation, or board advisory.',
        primaryCta: { label: 'Request Partner Briefing', href: '/contact' },
        secondaryCta: { label: 'Review Practice Areas', href: '/services' },
        guarantee: 'All inquiries governed by strict institutional confidentiality and rapid partner response.',
      },
    },
  },
};

export default servicesConsulting;
