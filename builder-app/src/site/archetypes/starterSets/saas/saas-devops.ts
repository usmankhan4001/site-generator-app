/**
 * Starter content set — `saas-devops`: a CI/CD delivery platform.
 * Hand-written (not mined). `needsPersonalization: false` — the copy reads as a
 * finished site, only the legal entity needs swapping.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const saasDevops: StarterContentSet = {
  id: 'saas-devops',
  archetype: 'saas',
  name: 'DevOps / CI-CD platform',
  description:
    'A build-test-deploy pipeline product — ephemeral runners, caching and one-click rollbacks.',
  niche: 'CI/CD platform',
  tags: ['devops', 'ci-cd', 'developer-tools', 'platform', 'automation'],
  needsPersonalization: false,
  themeId: 'indigo-enterprise',
  business: {
    name: 'PipelineForge Technologies, Inc.',
    shortName: 'PipelineForge',
    registrationNumber: 'DE-7742119',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of Delaware',
    registeredAddress: '251 Little Falls Drive, Wilmington, DE 19808, USA',
    email: 'hello@pipelineforge.example',
    phone: '+1 (415) 555-0142',
    website: 'pipelineforge.example',
    supportHours: 'Monday – Friday, 08:00 – 20:00 (ET)',
  },
  brand: { logoText: 'PipelineForge' },
  meta: {
    title: 'PipelineForge — ship every commit with confidence',
    description:
      'PipelineForge runs your builds, tests and deploys on ephemeral runners that start in seconds, with caching that works and rollbacks that take one click.',
  },
  slots: {
    home: {
      hero: {
        badge: 'CI/CD platform',
        headline: 'Ship every commit with confidence',
        accentText: '— in minutes, not hours',
        subtitle:
          'PipelineForge runs your builds, tests and deploys on ephemeral runners that spin up in seconds. Layer caching that actually hits, parallelism without YAML gymnastics, and a rollback that is genuinely one click.',
        primaryCta: { label: 'Start free trial', href: '/pricing' },
        secondaryCta: { label: 'View the docs', href: '/about' },
        image: 'seed',
        trustBadges: ['SOC 2 Type II', '99.98% uptime', 'No credit card to start'],
      },
      trust: {
        variant: 'logos',
        title: 'Powering delivery for engineering teams at',
        items: ['Northwave', 'Kettle & Co', 'Arcadia Labs', 'Bytemark', 'Fielded'],
      },
      features: {
        eyebrow: 'Platform',
        title: 'Everything a delivery pipeline needs',
        description:
          'One config file. Every stage observable. No plugin zoo to keep patched.',
        items: [
          {
            icon: 'Zap',
            title: 'Ephemeral runners',
            description:
              'Every job gets a clean machine that boots in under three seconds and is destroyed the moment it finishes. No stateful runner rot.',
          },
          {
            icon: 'Database',
            title: 'Caching that hits',
            description:
              'Content-addressed layer and dependency caching shared across branches — most teams see build times fall by half in the first week.',
          },
          {
            icon: 'GitBranch',
            title: 'Preview environments',
            description:
              'Each pull request gets a full, isolated environment with its own URL, seeded data and teardown on merge.',
          },
          {
            icon: 'Undo2',
            title: 'One-click rollback',
            description:
              'Every deploy is immutable and addressable. Roll back to any previous release from the dashboard or the CLI in one step.',
          },
        ],
      },
      stats: {
        items: [
          { value: '2.4s', label: 'Median runner cold start' },
          { value: '54%', label: 'Average drop in build time' },
          { value: '18k', label: 'Deploys shipped daily' },
          { value: '99.98%', label: 'Control-plane uptime' },
        ],
      },
      pricing: {
        eyebrow: 'Pricing',
        title: 'Start free, scale when the team does',
        description:
          'Every plan includes unlimited projects, preview environments and rollbacks. You pay for build minutes and concurrency.',
        currency: 'USD',
        tiers: [
          {
            id: 'starter',
            name: 'Starter',
            price: 0,
            priceUnit: '/mo',
            description: 'For side projects and evaluation.',
            features: [
              '2,000 build minutes / month',
              '1 concurrent pipeline',
              'Community support',
              '7-day build history',
            ],
          },
          {
            id: 'team',
            name: 'Team',
            price: 40,
            priceUnit: '/mo',
            description: 'For teams shipping to production every day.',
            popular: true,
            features: [
              '25,000 build minutes / month',
              '8 concurrent pipelines',
              'Preview environments',
              'SSO and audit log',
              'Priority email support',
            ],
          },
          {
            id: 'scale',
            name: 'Scale',
            price: 0,
            description: 'For regulated and high-volume delivery.',
            features: [
              'Unlimited build minutes',
              'Custom concurrency',
              'Self-hosted runners',
              'SOC 2 report and DPA',
              'Dedicated support engineer',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'From the teams',
        title: 'What engineering leads tell us',
        items: [
          {
            name: 'Priya Nadkarni',
            role: 'VP Engineering',
            company: 'Arcadia Labs',
            rating: 5,
            text: 'We cut our merge-to-production time from 40 minutes to under 9. The preview environments alone paid for the plan in the first sprint.',
          },
          {
            name: 'Tom Iversen',
            role: 'Staff Platform Engineer',
            company: 'Bytemark',
            rating: 5,
            text: 'The rollback is the real thing — immutable releases, one command, done. We stopped writing our own deploy tooling.',
          },
          {
            name: 'Dana Okafor',
            role: 'Head of Infrastructure',
            company: 'Fielded',
            rating: 5,
            text: 'Runner cold starts are genuinely a couple of seconds. Our CI queue disappeared the day we switched.',
          },
        ],
      },
      faq: {
        eyebrow: 'Questions',
        title: 'Before you switch',
        items: [
          {
            q: 'Can we bring our own runners?',
            a: 'Yes. On the Team and Scale plans you can register self-hosted runners for jobs that need specific hardware, a private network or a compliance boundary. They appear alongside the managed pool.',
          },
          {
            q: 'How does migration from our current CI work?',
            a: 'Most pipelines port in an afternoon. We ship an importer for the common YAML formats, and the Scale plan includes a migration engineer who does it with you.',
          },
          {
            q: 'What counts as a build minute?',
            a: 'Wall-clock time a job spends on a runner, billed per second. Time spent waiting in the queue or restoring cache is not billed.',
          },
          {
            q: 'Where does the build cache live?',
            a: 'In the region you pick for the project, encrypted at rest. Cache is content-addressed and scoped to your organisation — it is never shared across tenants.',
          },
        ],
      },
      cta: {
        headline: 'Point your next pipeline at PipelineForge',
        subtitle:
          'Connect a repository and watch the first build run. No card, no sales call.',
        primaryCta: { label: 'Start free trial', href: '/pricing' },
        secondaryCta: { label: 'Talk to us', href: '/contact' },
        guarantee: 'Free tier stays free — no time limit.',
      },
    },
  },
};

export default saasDevops;
