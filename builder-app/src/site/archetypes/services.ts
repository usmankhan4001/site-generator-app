/**
 * Archetype — `services`: professional / B2B services (advisory, managed IT,
 * firms). Signal treatment; credibility-led with engagement process + tiers.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const services: ArchetypeMeta = {
  id: 'services',
  name: 'Professional Services',
  description:
    'Advisory, managed and professional-services firms — a credibility-led home with metrics, principles, engagement tiers and process.',
  mode: 'services',
  defaultThemeId: 'blueprint-navy',
  treatment: 'signal',
  keywords: [
    'services',
    'consulting',
    'advisory',
    'professional services',
    'managed services',
    'b2b',
    'firm',
    'agency retainer',
    'engagement',
    'expertise',
  ],
  style: {
    treatment: 'signal',
    density: 'regular',
    headerAlign: 'start',
    card: 'bordered',
    image: 'contained',
    grid: 'even',
    divider: 'hairline',
    cta: 'solid',
  },
  composition: {
    pages: [
      {
        key: 'home',
        path: '/',
        title: 'Home',
        nav: true,
        sections: [
          { type: 'hero', slot: 'hero' },
          { type: 'statsBar', slot: 'stats' },
          { type: 'valueGrid', slot: 'principles' },
          { type: 'pricingTiers', slot: 'engagements' },
          { type: 'processSteps', slot: 'process' },
          { type: 'testimonials', slot: 'testimonials' },
          { type: 'faq', slot: 'faq' },
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'about',
        path: '/about',
        title: 'About',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'prose', slot: 'story' },
          { type: 'valueGrid', slot: 'values' },
          { type: 'teamGrid', slot: 'team' },
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'offerings',
        path: '/services',
        title: 'Services',
        navLabel: 'Services',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'pricingTiers', slot: 'engagements' },
          { type: 'processSteps', slot: 'process' },
          { type: 'faq', slot: 'faq' },
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'contact',
        path: '/contact',
        title: 'Contact',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'contactPanel', slot: 'form', props: { showDetails: true } },
          { type: 'corporateRegistration', slot: 'registration' },
        ],
      },
    ],
    policies: ['privacy', 'terms', 'refund'],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: { showLegalBar: true, showPaymentBadges: false },
  },
  starterSetIds: [],
};

export default services;
