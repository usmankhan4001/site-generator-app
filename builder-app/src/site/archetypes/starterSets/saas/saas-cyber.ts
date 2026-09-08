/**
 * Starter content set — `saas-cyber`: Bulwark — enterprise security & GRC platform.
 * Hand-written. Authentic copy for unified vulnerability management, continuous
 * compliance, security awareness, and one dashboard showing the whole attack surface.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const saasCyber: StarterContentSet = {
  id: 'saas-cyber-grc',
  archetype: 'saas',
  name: 'Bulwark',
  description:
    'A continuous security and compliance platform — unifies vulnerability scanning, policy, evidence collection, and audit-readiness in one place.',
  niche: 'Enterprise security, risk & compliance',
  tags: ['cybersecurity', 'grc', 'vulnerability-management', 'iso27001', 'soc2', 'compliance-automation', 'risk'],
  needsPersonalization: false,
  themeId: 'carbon-defense',
  accent: '#06b6d4',
  business: {
    name: 'Bulwark',
    legalName: 'Bulwark Security Technologies, Inc.',
    shortName: 'Bulwark',
    registrationNumber: 'DE-7711402',
    jurisdiction: 'Delaware, USA (SOC 2 Type II)',
    governingLaw: 'the laws of the State of California',
    registeredAddress: 'Slate Street, Suite 1200, Austin, TX 78701, USA',
    email: 'security@bulwarksec.example',
    phone: '+1 (512) 555-0192',
    website: 'bulwarksec.example',
    supportHours: '24/7 Security Operations Center coverage for Enterprise',
  },
  brand: { logoText: 'Bulwark' },
  meta: {
    title: 'Bulwark — continuous security & compliance automation',
    description:
      'See every vulnerability, policy drift, and control gap from one pane of glass, and turn recurring audit prep into a continuous export your assessors can trust.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Continuous security & GRC',
        headline: 'All your risk in one pane,',
        accentText: 'audit-ready every day',
        subtitle:
          'Bulwark unifies vulnerability scanning, CSPM, evidence capture, and security training into a single continuous posture. Stop assembling audit decks from twelve tools and export a live readiness report instead.',
        primaryCta: { label: 'Start free assessment', href: '/pricing' },
        secondaryCta: { label: 'See the platform', href: '/about' },
        image: 'seed',
        trustBadges: ['SOC 2 Type II', 'GDPR / CCPA ready', 'Continuous readiness'],
      },
      trust: {
        variant: 'logos',
        title: 'Keeping compliant teams racing software at',
        items: [
          { name: 'Meridian Bank', domain: 'meridianbank.example' },
          { name: 'Klovia Health', domain: 'kloviahealth.example' },
          { name: 'Foundry Cloud', domain: 'foundry.cloud' },
          { name: 'Arc & Co', domain: 'arcandco.example' },
          { name: 'Summitboard', domain: 'summitboard.example' },
        ],
      },
      features: {
        eyebrow: 'Coverage',
        title: 'Every control, connected',
        description:
          'Stop stitching five point tools into an audit story. Bulwark wires detections and evidence into the framework controls it maps to.',
        items: [
          {
            icon: 'ScanSearch',
            title: 'Unified attack surface scanning',
            description:
              'DAST, container, IaC, and dependency scanning fold into a single criticality-ranked queue, so you remediate what matters first instead of the loudest alert.',
          },
          {
            icon: 'FileCheck2',
            title: 'Continuous control evidence',
            description:
              'Automated evidence collection maps to ISO 27001, SOC 2, and HIPAA controls. No more screenshots — every control has fresh, timestamped proof.',
          },
          {
            icon: 'Puzzle',
            title: 'Asset-aware policy engine',
            description:
              'Policies that follow the asset, not a static checklist. Web apps, services, and endpoints each get the rules that apply to them, auto-updated as they change.',
          },
          {
            icon: 'Waypoints',
            title: 'Board-ready risk reporting',
            description:
              'Risk registers, heat maps, and trend graphs that update live, so the deck you put in front of your board is the same one your auditor sees.',
          },
        ],
      },
      stats: {
        items: [
          { value: '6 wks', label: 'Median first-audit cycle reduction' },
          { value: '72%', label: 'Fewer manual audit prep hours' },
          { value: '23m', label: 'Assets and endpoints continuously evaluated' },
          { value: '98%', label: 'Control evidence automation rate' },
        ],
      },
      pricing: {
        eyebrow: 'Pricing',
        title: 'Security that scales with your post',
        description:
          'Starts free for small teams. Paid plans scale by assessed assets, not seats or per-scan limits.',
        currency: 'USD',
        billingIntervals: ['monthly', 'annually'],
        tiers: [
          {
            id: 'guard',
            name: 'Guard',
            price: 0,
            priceUnit: '/mo',
            description: 'For small teams protecting their first production surfaces.',
            features: [
              'Up to 50 assessed assets',
              'Unified scanner dashboards',
              'Priority 7-day disclosure feed',
              'Community support',
            ],
          },
          {
            id: 'posture',
            name: 'Posture',
            price: 240,
            priceUnit: '/mo',
            description: 'For growing product teams that need automated controls.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Up to 2,500 assessed assets',
              'Automated ISO 27001 / SOC 2 mapping',
              'Continuous evidence vault',
              'SSO & RBAC',
              'Priority support, 4h SLA',
            ],
          },
          {
            id: 'command',
            name: 'Command',
            price: 0,
            priceUnit: 'Custom',
            description: 'For regulated enterprises with bespoke needs.',
            features: [
              'Unlimited asset scopes',
              'Custom frameworks & DPA',
              'On-prem or air-gapped option',
              'Dedicated security advisor',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'Customers',
        title: 'Security leaders who stopped scrambling',
        items: [
          {
            name: 'Anjali Mehra',
            role: 'CISO',
            company: 'Klovia Health',
            rating: 5,
            text: 'We passed our first HIPAA external audit without a single corrective action. Bulwark’s evidence vault took a week of deck time and made it seconds.',
          },
          {
            name: 'Dan Whitaker',
            role: 'Head of GRC',
            company: 'Meridian Bank',
            rating: 5,
            text: 'The asset-scoped policy engine is the real differentiator — controls follow our infrastructure instead of us chasing a static checklist across six systems.',
          },
          {
            name: 'Claire Rousseau',
            role: 'VP Engineering',
            company: 'Summitboard',
            rating: 5,
            text: 'We finally have one number for ‘are we compromised two minutes ago?’. The board deck writes itself now.',
          },
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Common questions',
        items: [
          {
            q: 'Does Bulwark replace our existing scanners?',
            a: 'It can, or it can ingest them. Native DAST and container scanning are included, but Bulwark also connects to common third-party tools and folds their findings into the same risk ledger.',
          },
          {
            q: 'Will this work if we already run a manual audit program?',
            a: 'Yes. Automated controls run alongside your existing program, and every piece of collected evidence is exportable. You can adopt module by module rather than all at once.',
          },
          {
            q: 'How does pricing map to framework scope?',
            a: 'Modules for each framework (ISO, SOC 2, HIPAA) apply on top of the base asset tier, so you only pay for the scopes your company actually needs.',
          },
          {
            q: 'Is there an air-gapped deployment?',
            a: 'Yes. The Command plan sells a fully air-gapped or private-VPC deployment for regulated industries where data cannot leave your boundary.',
          },
        ],
      },
      cta: {
        headline: 'Know your posture before your auditor does',
        subtitle:
          'Connect your first asset and get a live risk and readiness readout. Free tier keeps working after the call.',
        primaryCta: { label: 'Start free assessment', href: '/pricing' },
        secondaryCta: { label: 'Request a demo', href: '/contact' },
        guarantee: 'Free tier never expires; no payment to begin',
      },
    },
  },
};

export default saasCyber;