/**
 * Starter content set — `saas-analytics`: product analytics & behavioral events platform.
 * Authentic copy for event collection, user funnel analysis, retention and cohort tracking.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const saasAnalytics: StarterContentSet = {
  id: 'saas-analytics',
  archetype: 'saas',
  name: 'Product Analytics Platform',
  description:
    'Full-stack product analytics, event streaming and conversion funnels with sub-second queries and privacy-first ingestion.',
  niche: 'Product analytics & behavioral events',
  tags: ['analytics', 'product-intelligence', 'events', 'funnels', 'telemetry', 'data'],
  needsPersonalization: false,
  themeId: 'electric-teal',
  business: {
    name: 'SignalTrace Technologies, Inc.',
    shortName: 'SignalTrace',
    registrationNumber: 'DE-6918234',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of Delaware',
    registeredAddress: '1209 Orange Street, Wilmington, DE 19801, USA',
    email: 'support@signaltrace.example',
    phone: '+1 (415) 555-0189',
    website: 'signaltrace.example',
    supportHours: 'Monday – Friday, 09:00 – 18:00 (PST)',
  },
  brand: { logoText: 'SignalTrace' },
  meta: {
    title: 'SignalTrace — Real-Time Product Analytics & User Journey Insights',
    description:
      'Autotrack behavioral events, isolate conversion drop-offs and measure feature adoption with sub-second query performance.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Product Analytics & Behavioral Telemetry',
        headline: 'Understand user journeys without the',
        accentText: 'SQL bottlenecks',
        subtitle:
          'SignalTrace captures client and server events with zero-lag ingestion, visual funnel diagnostics and retroactive cohort analysis. Discover where users convert, where they stall, and why.',
        primaryCta: { label: 'Start Free Trial', href: '/pricing' },
        secondaryCta: { label: 'Explore Interactive Demo', href: '/about' },
        trustBadges: ['HIPAA & SOC 2 Ready', 'Sub-second queries', 'GDPR Compliant'],
      },
      trust: {
        variant: 'logos',
        title: 'Trusted by product teams at fast-growing companies',
        items: ['HyperScale', 'Novaflow', 'DataCrest', 'Acuity', 'LuminaryHQ'],
      },
      features: {
        eyebrow: 'Capabilities',
        title: 'Built for fast-moving product & growth teams',
        description:
          'Every metric you care about — from session replay to retroactive cohort segmentation — ready out of the box.',
        items: [
          {
            icon: 'Activity',
            title: 'Sub-Second Funnel Analytics',
            description:
              'Calculate multi-step conversion paths across millions of events in milliseconds without waiting on data warehouse syncs.',
          },
          {
            icon: 'Layers',
            title: 'Retroactive Cohorting',
            description:
              'Define user cohorts at any point in time and instantly calculate historical retention without backfilling schemas.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Client-Side Privacy Controls',
            description:
              'Automated PII masking, client-side token stripping, and full EU/US data residency isolation for compliance-sensitive apps.',
          },
          {
            icon: 'Zap',
            title: 'Universal SDK & Event Pipeline',
            description:
              'Drop-in libraries for React, Next.js, iOS, Android, Node, and Go with automatic batching and zero impact on Core Web Vitals.',
          },
        ],
      },
      stats: {
        items: [
          { value: '420M+', label: 'Events processed daily' },
          { value: '< 180ms', label: 'Average query latency' },
          { value: '99.99%', label: 'Ingestion SLA guarantee' },
          { value: '4.9/5', label: 'Customer satisfaction rating' },
        ],
      },
      pricing: {
        eyebrow: 'Transparent Pricing',
        title: 'Scale your analytics as your product grows',
        description:
          'Pay based on monthly tracked users and data retention. No hidden fees or surprise egress overages.',
        currency: 'USD',
        tiers: [
          {
            id: 'starter',
            name: 'Growth',
            price: 49,
            priceUnit: '/mo',
            description: 'For early-stage startups and new product launches.',
            features: [
              'Up to 100,000 monthly tracked users',
              '12-month raw event retention',
              'Unlimited funnel & cohort queries',
              'Standard email & community support',
            ],
          },
          {
            id: 'scale',
            name: 'Scale',
            price: 189,
            priceUnit: '/mo',
            description: 'For scaling products requiring granular retention analysis.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Up to 1,000,000 monthly tracked users',
              '24-month raw event retention',
              'Session replay & crash correlation',
              'Custom webhook alerts & exports',
              'Priority 4h SLA support',
            ],
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            price: 0,
            description: 'For high-volume platforms with strict governance needs.',
            features: [
              'Unlimited monthly tracked users',
              'Dedicated Single-Tenant Ingestion',
              'SOC 2 Type II & HIPAA BAA',
              'Custom ETL connectors (Snowflake/BigQuery)',
              'Dedicated Solutions Architect',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'Customer Stories',
        title: 'How top product teams optimize activation',
        items: [
          {
            name: 'Elena Rostova',
            role: 'VP of Product',
            company: 'Novaflow',
            rating: 5,
            text: 'SignalTrace transformed our onboarding flow. We spotted a 34% drop-off on our authentication screen within 10 minutes of deploying the SDK.',
          },
          {
            name: 'Marcus Chen',
            role: 'Head of Growth',
            company: 'HyperScale',
            rating: 5,
            text: 'The query speeds are unlike anything else. Running ad-hoc 90-day cohort retention reports used to take 2 minutes on our warehouse—now it takes 200ms.',
          },
          {
            name: 'Sarah Jenkins',
            role: 'Lead Data Engineer',
            company: 'DataCrest',
            rating: 5,
            text: 'Integrating the client-side PII masking saved us weeks of compliance reviews. SignalTrace is our single source of truth for product telemetry.',
          },
        ],
      },
      faq: {
        eyebrow: 'Frequently Asked Questions',
        title: 'Everything you need to know about SignalTrace',
        items: [
          {
            q: 'How does SignalTrace impact application page load performance?',
            a: 'Our lightweight client SDK is under 8KB gzipped. It loads asynchronously and batches event dispatches via navigator.sendBeacon, resulting in zero blocking time on your main UI thread.',
          },
          {
            q: 'Can we forward raw events to our existing data lake?',
            a: 'Yes. On all paid plans, SignalTrace supports streaming raw event batches to Amazon S3, Google Cloud Storage, BigQuery, Snowflake, or custom HTTPS webhook sinks in real time.',
          },
          {
            q: 'Is SignalTrace compliant with GDPR and CCPA regulations?',
            a: 'Yes. We offer EU-only data residency, automated consent banner bridging, and programmatic APIs to execute end-user data deletion and export requests instantly.',
          },
          {
            q: 'Can we track both web and native mobile applications in a single project?',
            a: 'Absolutely. We support unified cross-platform user identity stitching across web, iOS, Android, React Native, and Flutter.',
          },
        ],
      },
      cta: {
        headline: 'Start uncovering actionable product insights today',
        subtitle:
          'Set up your project in 5 minutes with our zero-config snippet. No credit card required.',
        primaryCta: { label: 'Start Free 14-Day Trial', href: '/pricing' },
        secondaryCta: { label: 'Schedule Technical Demo', href: '/contact' },
        guarantee: '14-day full feature trial • Cancel anytime with one click',
      },
    },
  },
};

export default saasAnalytics;
