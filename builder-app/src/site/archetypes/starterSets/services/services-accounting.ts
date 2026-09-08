/**
 * Starter content set — `services-accounting`: Ledger — chartered accountancy & tax advisory.
 * Hand-written. Authentic copy for SME compliance, tax strategy, bookkeeping, and
 * audit readiness for growing and mid-market businesses.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const servicesAccountingFirm: StarterContentSet = {
  id: 'services-accounting-firm',
  archetype: 'services',
  name: 'Ledger',
  description:
    'A chartered accountancy firm delivering statutory compliance, tax strategy, cloud bookkeeping, and audit readiness for ambitious SMEs and mid-market businesses.',
  niche: 'Chartered accountancy & tax advisory',
  tags: ['accounting', 'tax-advisory', 'bookkeeping', 'audit', 'vat', 'payroll', 'chartered-accountants'],
  needsPersonalization: false,
  themeId: 'titanium-gray',
  accent: '#475569',
  business: {
    name: 'Ledger',
    legalName: 'Ledger Chartered Accountants LLP',
    shortName: 'Ledger',
    registrationNumber: 'OC419531',
    jurisdiction: 'England & Wales (ICAEW registered firm)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '76 King William Street, London EC4N 7HR, United Kingdom',
    email: 'partner@ledger-accountants.example',
    phone: '+44 20 7333 0550',
    website: 'ledger-accountants.example',
    supportHours: 'Monday – Friday, 08:30 – 18:00 (GMT)',
  },
  brand: { logoText: 'Ledger' },
  meta: {
    title: 'Ledger — Chartered accountants for growing businesses',
    description:
      'Clear statutory reporting, smart tax planning, and bookkeeping that gives founders their week back — without indecipherable jargon.',
  },
  slots: {
    home: {
      hero: {
        badge: 'ICAEW Chartered • London Listed',
        headline: 'Accounting that pays for itself',
        accentText: 'every month of the year',
        subtitle:
          'Ledger pairs mid-market and growing businesses with a dedicated chartered accountant — statutory compliance nailed, tax planned forward, bookkeeping automated, and one clear person who answers.',
        primaryCta: { label: 'Book a Free Review', href: '/services' },
        secondaryCta: { label: 'Meet the Partners', href: '/about' },
        trustBadges: ['ICAEW Registered', 'Xero & QuickBooks Platinum', '500+ SME clients'],
      },
      stats: {
        items: [
          { value: '£410m', label: 'Client revenue we help report annually' },
          { value: '£8.2m', label: 'Effective tax saved across planning mandates' },
          { value: '97%', label: 'Client retention across 5+ years' },
          { value: '9 days', label: 'Median time to close full-year accounts' },
        ],
      },
      principles: {
        eyebrow: 'Specialisms',
        title: 'Where we add the most value',
        description:
          'Compliance is the baseline; judgment is where we earn our keep.',
        items: [
          {
            icon: 'Calculator',
            title: 'Statutory & Management Reporting',
            description:
              'Annual accounts, Companies House filings, and digestible monthly management packs with commentary your board actually reads.',
          },
          {
            icon: 'PiggyBank',
            title: 'Tax Planning & Structuring',
            description:
              'Forward-looking CT, VAT, and personal tax structuring so you keep more of what you grow — and stay off HMRC’s radar by being boringly compliant.',
          },
          {
            icon: 'CloudCog',
            title: 'Cloud Bookkeeping',
            description:
              'We run clean daily bookkeeping in Xero and QuickBooks, so your numbers are never 6 weeks stale when a lender or investor asks.',
          },
          {
            icon: 'HandCoins',
            title: 'Audit & Due Diligence Readiness',
            description:
              'Clean books mean faster diligence. We prepare cleanable audit-ready data packs and support fundraising with real-time reporting.',
          },
        ],
      },
      engagements: {
        eyebrow: 'Services & Pricing',
        title: 'Fee certainty from day one',
        description:
          'Transparent tiered packages with fixed fees — no surprise invoices, no hourly mystery.',
        currency: 'GBP',
        tiers: [
          {
            id: 'essential',
            name: 'Essential',
            price: 195,
            priceUnit: '/mo',
            description: 'For lean sole traders and new micro-businesses.',
            features: [
              'Monthly bookkeeping & MTD VAT',
              'Annual accounts & self-assessment',
              'Online ask-a-question portal',
              'Cloud software discounts passed on',
            ],
          },
          {
            id: 'growth',
            name: 'Growth',
            price: 460,
            priceUnit: '/mo',
            description: 'For revenue-stage SMEs with a payroll and a team.',
            popular: true,
            badge: 'Most Requested',
            features: [
              'Everything in Essential',
              'Quarterly management accounts',
              'Payroll & auto-enrolment',
              'Forward-tax planning reviews',
              'Dedicated partner, direct line',
            ],
          },
          {
            id: 'scale',
            name: 'Scale',
            price: 950,
            priceUnit: '/mo',
            description: 'For mid-market operators eyeing funding or exit.',
            features: [
              'Everything in Growth',
              'Monthly board pack & KPIs',
              'Corporate finance & diligence support',
              'Group-structure & exit planning',
              'Consortium of specialists on call',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'How We Onboard',
        title: 'From handover to harmony in a month',
        description:
          'A proven migration that keeps you compliant through the transition.',
        steps: [
          {
            step: '01',
            title: 'Free diagnostic review',
            description:
              'We unpack your current bookkeeping, tax position, and filing dates — and show you where each is costing you money.',
            duration: 'Week 1',
          },
          {
            step: '02',
            title: 'Data & cloud migration',
            description:
              'We move your records into Xero or QuickBooks, reconcile legacy ledgers, and set up payroll and VAT with zero-stasis.',
            duration: 'Weeks 2–3',
          },
          {
            step: '03',
            title: 'Fixed-fee agreement',
            description:
              'You get a signed, fixed monthly fee and a named chartered accountant — no hourly billing, no hidden surprises.',
            duration: 'Week 4',
          },
          {
            step: '04',
            title: 'Ongoing proactive advice',
            description:
              'Quarterly planning conversations and a transparent dashboard, so you are ahead of deadlines rather than chasing them.',
            duration: 'Ongoing',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Clients',
        title: 'From spreadsheets to confidence',
        items: [
          {
            name: 'Freddie Okafor',
            role: 'Founder',
            company: 'Nimbus Freight',
            rating: 5,
            text: 'Ledger gave me back my weekends. For the first time I receive a management pack I understand, and my last submission passed without a single query.',
          },
          {
            name: 'Harriet Clarke',
            role: 'CFO',
            company: 'Uncommon Works',
            rating: 5,
            text: 'Their diligence pack saved us from two weeks of scrambling during our Series A. The reviewer kept asking how our books were this clean.',
          },
          {
            name: 'Tomás Rivera',
            role: 'Director',
            company: 'Lume Consulting',
            rating: 5,
            text: 'The tax planning review paid for the entire annual fee in the first quarter. Real money on the table we had been leaving, recovered without a single gray area.',
          },
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Working with Ledger',
        items: [
          {
            q: 'Are you regulated chartered accountants?',
            a: 'Yes — we are registered with ICAEW (Institute of Chartered Accountants in England and Wales) and hold the professional indemnity cover of a regulated firm.',
          },
          {
            q: 'Do you work with businesses outside the UK?',
            a: 'Increasingly. For exporting and international owner-managers we coordinate local statutory reporting across partner firms while keeping one clean, central financial picture.',
          },
          {
            q: 'What if my accounts are already months behind?',
            a: 'That is why we exist. Migration starts with stabilization — we reconcile, file and bring you compliant before any deeper planning begins.',
          },
          {
            q: 'Can you support a funding round?',
            a: 'Yes. We prepare data-room-ready financials, virtual and physical due diligence rooms, and investor-ready monthly reporting as part of the Scale tier.',
          },
        ],
      },
      cta: {
        headline: 'Start the year in someone else’s good books',
        subtitle:
          'Book a free diagnostic review and see exactly what your current setup is costing you — no jargon, no obligation.',
        primaryCta: { label: 'Book a Free Review', href: '/contact' },
        secondaryCta: { label: 'See Services & Pricing', href: '/services' },
        guarantee: 'Free 45-minute review with a partner, not a pitch',
      },
    },
  },
};

export default servicesAccountingFirm;