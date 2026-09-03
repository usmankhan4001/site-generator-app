/**
 * Starter content set — `agency-growth`: performance marketing & growth consultancy.
 * Authentic copy for paid acquisition, conversion rate optimization (CRO), and lifecycle retention.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const agencyGrowth: StarterContentSet = {
  id: 'agency-growth',
  archetype: 'agency',
  name: 'Performance Growth Consultancy',
  description:
    'Scientific growth marketing, paid media scaling, programmatic SEO, and full-funnel CRO for high-velocity B2B and DTC brands.',
  niche: 'Performance marketing & growth consultancy',
  tags: ['growth-marketing', 'performance-media', 'cro', 'paid-search', 'paid-social', 'retention'],
  needsPersonalization: false,
  themeId: 'cyber-slate-volt',
  business: {
    name: 'NorthScale Growth Partners Pte. Ltd.',
    shortName: 'NorthScale',
    registrationNumber: '202108924K',
    jurisdiction: 'Singapore (ACRA)',
    governingLaw: 'the laws of Singapore',
    registeredAddress: '71 Robinson Road, #14-01, Singapore 068895',
    email: 'growth@northscale.example',
    phone: '+65 6720 1840',
    website: 'northscale.example',
    supportHours: 'Monday – Friday, 09:00 – 18:00 (SGT / GMT+8)',
  },
  brand: { logoText: 'NorthScale' },
  meta: {
    title: 'NorthScale — Data-Driven Performance Marketing & Growth Advisory',
    description:
      'We scale paid acquisition, engineer rigorous conversion funnels, and maximize customer lifetime value with algorithmic precision.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Growth Architecture & Performance Media',
        headline: 'Predictable customer acquisition at',
        accentText: 'enterprise scale',
        subtitle:
          'NorthScale combines quantitative media buying, statistical CRO testing, and predictive lifecycle modeling to turn capital into compounding revenue.',
        primaryCta: { label: 'Request Growth Audit', href: '/contact' },
        secondaryCta: { label: 'Explore Case Studies', href: '/services' },
        trustBadges: ['$140M+ Managed Spend', 'Meta & Google Premier Partner', '4.2x Median Blended ROAS'],
      },
      clients: {
        variant: 'logos',
        title: 'Scaling acquisition for industry leaders across APAC & US',
        items: ['OmniPay Global', 'Volt Mobility', 'Synthetix Bio', 'Helix Commerce', 'Zeta Robotics'],
      },
      capabilities: {
        eyebrow: 'Our Practice',
        title: 'Full-funnel growth mechanics',
        description:
          'We replace vanity metrics with auditable contribution margin and incremental customer revenue.',
        items: [
          {
            icon: 'TrendingUp',
            title: 'Algorithmic Paid Media',
            description:
              'Cross-channel media execution on Meta, Google Ads, LinkedIn, and TikTok using first-party data attribution and server-side tracking (CAPI).',
          },
          {
            icon: 'FlaskConical',
            title: 'Scientific CRO & Landing Page Engines',
            description:
              'Rapid multivariate testing, personalized landing page experiences, and checkout funnel optimization engineered to double visitor conversion.',
          },
          {
            icon: 'Repeat',
            title: 'Lifecycle & Retention Systems',
            description:
              'Klaviyo and Customer.io automated journeys, predictive churn interventions, and referral loops that lift 90-day LTV.',
          },
          {
            icon: 'BarChart3',
            title: 'Marketing Data Engineering',
            description:
              'Custom MMM (Marketing Mix Modeling), incrementality testing, and real-time contribution margin dashboards linked directly to your warehouse.',
          },
        ],
      },
      process: {
        eyebrow: 'Execution Sprint',
        title: 'How we engineer hyper-growth',
        description:
          'Our systematic playbook eliminates guesswork and establishes compounding acquisition loops.',
        steps: [
          {
            step: '01',
            title: 'Growth Diagnostic & Tracking Audit',
            description:
              'We audit your historical unit economics, pixel hygiene, ad account structures, and drop-off points to isolate high-leverage growth bottlenecks.',
            duration: 'Days 1–7',
          },
          {
            step: '02',
            title: 'Hypothesis Roadmap & Creative Sprint',
            description:
              'We build a backlog of statistical experiment hypotheses and produce 20+ bespoke ad creatives and high-intent landing page variants.',
            duration: 'Days 8–14',
          },
          {
            step: '03',
            title: 'Live Controlled Testing & Media Scaling',
            description:
              'We deploy rigorous A/B splits, scale winning angles aggressively, and prune unprofitable segment spend in real time.',
            duration: 'Ongoing Sprints',
          },
          {
            step: '04',
            title: 'Retention & LTV Optimization',
            description:
              'We close the loop with post-purchase workflows, VIP ascension programs, and automated SMS/email win-back sequences.',
            duration: 'Ongoing',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Proof of Impact',
        title: 'Measurable outcomes from our partners',
        items: [
          {
            name: 'Li Wei Tan',
            role: 'Chief Marketing Officer',
            company: 'OmniPay Global',
            rating: 5,
            text: 'NorthScale cut our Customer Acquisition Cost by 41% while increasing monthly new funded accounts from 1,200 to over 5,500 in 6 months.',
          },
          {
            name: 'Brett Callaghan',
            role: 'VP Growth',
            company: 'Volt Mobility',
            rating: 5,
            text: 'Their CRO sprint alone paid for their annual retainer in 3 weeks. They rebuilt our quote flow and bumped overall checkout completion by 28%.',
          },
          {
            name: 'Ananya Sharma',
            role: 'Co-Founder & COO',
            company: 'Helix Commerce',
            rating: 5,
            text: 'The best media team we have worked with. Complete financial transparency, flawless CAPI tracking, and relentless weekly creative testing.',
          },
        ],
      },
      'track-record': {
        eyebrow: 'Milestones',
        title: 'Quantifiable growth track record',
        description: 'Aggregate revenue and spend scaled across global campaigns.',
        milestones: [
          {
            year: '2021',
            title: 'Consultancy Inception',
            description: 'Founded in Singapore by ex-tech growth leaders to bring programmatic rigor to agency media.',
          },
          {
            year: '2022',
            title: '$50M Managed Spend Milestone',
            description: 'Scaled APAC and North American campaigns across B2B SaaS and high-AOV retail brands.',
          },
          {
            year: '2023',
            title: 'Proprietary Attribution Engine',
            description: 'Shipped server-side tracking architecture providing 99.4% signal recovery post-iOS14 changes.',
          },
          {
            year: '2024',
            title: '$140M+ Spend & $500M+ Attributed Revenue',
            description: 'Recognized as Top Growth Agency by APAC Digital Marketing Summit.',
          },
        ],
      },
      cta: {
        headline: 'Ready to scale your acquisition profitably?',
        subtitle:
          'Book a confidential 30-minute growth assessment with our Managing Directors. We review your ad accounts and unit economics live.',
        primaryCta: { label: 'Claim Your Growth Audit', href: '/contact' },
        secondaryCta: { label: 'Review Retainers', href: '/services' },
        guarantee: 'Strict NDA guaranteed • Custom financial modeling provided free of charge',
      },
    },
  },
};

export default agencyGrowth;
