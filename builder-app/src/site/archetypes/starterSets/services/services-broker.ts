/**
 * Starter content set — `services-broker`: Verus — commercial insurance & risk brokerage.
 * Hand-written. Authentic copy for SME and mid-market liability, property, D&O,
 * and specialty placement with claims advocacy.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const servicesBrokerage: StarterContentSet = {
  id: 'services-insurance-broker',
  archetype: 'services',
  name: 'Verus',
  description:
    'An independent commercial insurance brokerage placing liability, property, D&O, cyber, and group health cover, with claims advocacy that actually shows up.',
  niche: 'Commercial insurance & risk brokerage',
  tags: ['insurance-broker', 'risk-management', 'commercial-insurance', 'd-and-o', 'cyber-insurance', 'claims-advocacy', 'employee-benefits'],
  needsPersonalization: false,
  themeId: 'sunset-amber',
  accent: '#d97706',
  business: {
    name: 'Verus',
    legalName: 'Verus Risk & Insurance Brokers Inc.',
    shortName: 'Verus',
    registrationNumber: 'DE-3981407',
    jurisdiction: 'Delaware, USA (Licensed broker, all 50 states)',
    governingLaw: 'the laws of the State of New York',
    registeredAddress: '530 Market Street, Suite 600, San Francisco, CA 94105, USA',
    email: 'team@verusbroker.example',
    phone: '+1 (415) 555-0146',
    website: 'verusbroker.example',
    supportHours: 'Monday – Friday, 07:30 – 19:00 (PT); 24/7 claims line',
  },
  brand: { logoText: 'Verus' },
  meta: {
    title: 'Verus — Commercial insurance & risk brokerage',
    description:
      'Independent brokers placing commercial insurance with 40+ A-rated carriers, and a claims team that fights for you note-for-note.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Independent • 40+ Carriers • Claims Advocate',
        headline: 'Insurance you understand,',
        accentText: 'claims we never abandon',
        subtitle:
          'Verus shops your commercial insurance across 40+ rated carriers, negotiates terms in plain English, and assigns an actual claims advocate the day you need one. We work for you, not the insurer.',
        primaryCta: { label: 'Get a Comparative Quote', href: '/services' },
        secondaryCta: { label: 'Talk to a Broker', href: '/contact' },
        trustBadges: ['Licensed in 50 States', '40+ Carrier Markets', 'In-House Claims Advocacy'],
      },
      stats: {
        items: [
          { value: '$1.2B', label: 'Insured limits placed for clients' },
          { value: '540+', label: 'Businesses protected nationwide' },
          { value: '31%', label: 'Average premium saved on renewal' },
          { value: '96%', label: 'Claims resolved in the client’s favor' },
        ],
      },
      principles: {
        eyebrow: 'Coverage Lines',
        title: 'Protection across the whole business',
        description:
          'One relationship that sweeps in every policy your company actually needs.',
        items: [
          {
            icon: 'Building2',
            title: 'General & Professional Liability',
            description:
              'GL and E&O built to the real exposure of your trade — from software to construction — not a one-size paper.',
          },
          {
            icon: 'Laptop',
            title: 'Cyber & Technology',
            description:
              'Breach response, legal defense, and business interruption cover that matches how you actually hold data.',
          },
          {
            icon: 'Users',
            title: 'Directors & Officers (D&O)',
            description:
              'Personal-asset protection for your leadership team, tuned to your cap table and growth stage.',
          },
          {
            icon: 'HeartPulse',
            title: 'Group Health & Benefits',
            description:
              'Self-funded or fully insured medical, dental, and voluntary benefits that make a workforce stick.',
          },
        ],
      },
      engagements: {
        eyebrow: 'Engagement Models',
        title: 'The Verus difference',
        description:
          'Fees are transparent and must be disclosed by law — you always know exactly what we earn and why.',
        currency: 'USD',
        tiers: [
          {
            id: 'compare',
            name: 'Comparative Placement',
            price: 0,
            priceUnit: ' up front',
            description: 'We benchmark your current cover across 5+ carriers and negotiate a better premium.',
            features: [
              'Full-risk exposure review',
              '5–8 carrier competitive quotes',
              'Plain-language coverage summary',
              'We earn a disclosed commission only',
            ],
          },
          {
            id: 'retained',
            name: 'Retained Broker Mentorship',
            price: 1200,
            priceUnit: '/mo',
            description: 'Ongoing program management, annual renewals, and a dedicated account team.',
            popular: true,
            badge: 'Most Requested',
            features: [
              'Dedicated broker & claims advocate',
              'Renewal negotiation on all lines',
              'Quarterly risk & limits review',
              'New-entity and acquisition cover',
            ],
          },
          {
            id: 'captive',
            name: 'Captive & Program',
            price: 0,
            priceUnit: ' Custom',
            description: 'For mid-market and specialty organizations with bespoke risk programs.',
            features: [
              'Captive or alternative risk study',
              'Program-specific underwriting talks',
              'Loss-cost analytics',
              'Multi-year rate guarantees where possible',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'How We Work',
        title: 'From quote to claims, one path',
        description:
          'A disciplined, documented process so coverage deepens with time rather than lapsing quietly.',
        steps: [
          {
            step: '01',
            title: 'Exposure discovery',
            description:
              'Deep dive into revenue, operations, contracts, and claims history to map true exposure — not just copy your old policy.',
            duration: 'Week 1',
          },
          {
            step: '02',
            title: 'Multi-carrier placement',
            description:
              'We shop your profile across A-rated carriers and negotiate terms, deductibles, and premium on your behalf.',
            duration: 'Weeks 2–3',
          },
          {
            step: '03',
            title: 'Proposal & plain-language review',
            description:
              'We translate each quote into what it actually covers, in writing, and walk the board through it.',
            duration: 'Week 4',
          },
          {
            step: '04',
            title: 'Serve & claims advocacy',
            description:
              'At binds we assign your account team. When a claim lands, an advocate marshals evidence, experts, and the carrier to a fair outcome.',
            duration: 'Ongoing',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Clients',
        title: 'Brokers that pick up the phone',
        items: [
          {
            name: 'Rebecca Lin',
            role: 'COO',
            company: 'Northline Logistics',
            rating: 5,
            text: 'Our freight claim nearly ended the year. Verus’s advocate did what our last broker never did — actually go to battle with the adjuster and get us paid in three weeks.',
          },
          {
            name: 'Marcus Hale',
            role: 'Founder',
            company: 'Revv Software',
            rating: 5,
            text: 'They rebuilt our D&O for our Series B and explained every clause in English. On renewal they beat our prior premium by 34%.',
          },
          {
            name: 'Sofia Garza',
            role: 'Finance Director',
            company: 'Meridian Bakery Group',
            rating: 5,
            text: 'From bakery liability to group health for 300 staff, Verus runs it like our in-house risk department. Claims are actually answered.',
          },
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Brokerage, in plain terms',
        items: [
          {
            q: 'Do brokers charge a fee on top of my premium?',
            a: 'We are required to disclose every dollar we earn. In most cases we are paid a carrier commission and you pay no extra fee; where fees apply they are stated up front in writing.',
          },
          {
            q: 'Do I have to switch coverage to work with you?',
            a: 'No. We will review your existing policies and only change what genuinely improves your position. If your current cover is best-in-class, we tell you that too.',
          },
          {
            q: 'What happens when I have a claim?',
            a: 'You call one 24/7 line. We assign a claims advocate who notifies carrier, works with adjusters, secures experts, and negotiates on your side — the opposite of a mailbox that forwards.',
          },
          {
            q: 'Which states do you cover?',
            a: 'We are licensed as a broker in all 50 US states and most US territories, and we run coordinated programs for multinational clients as well.',
          },
        ],
      },
      cta: {
        headline: 'Stop paying for paper protection',
        subtitle:
          'Get a comparative quote against your current program, in plain language, with a broker who returns calls.',
        primaryCta: { label: 'Get a Comparative Quote', href: '/contact' },
        secondaryCta: { label: 'See Our Lines & Carriers', href: '/services' },
        guarantee: 'A named broker, not a call center — from day one',
      },
    },
  },
};

export default servicesBrokerage;