/**
 * Archetype — `saas`: product-led software (dev tools, platforms, APIs).
 * Signal treatment; conversion-oriented home with pricing + proof.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const saas: ArchetypeMeta = {
  id: 'saas',
  name: 'SaaS / Software',
  description:
    'Product-led software — a conversion home with proof, feature grid, pricing tiers and FAQ.',
  mode: 'services',
  defaultThemeId: 'indigo-enterprise',
  treatment: 'signal',
  keywords: [
    'saas',
    'software',
    'platform',
    'api',
    'developer tools',
    'b2b software',
    'cloud',
    'devops',
    'analytics',
    'automation',
  ],
  style: {
    treatment: 'signal',
    density: 'regular',
    headerAlign: 'center',
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
          { type: 'trustBar', slot: 'trust', props: { variant: 'logos' } },
          { type: 'featureGrid', slot: 'features' },
          { type: 'statsBar', slot: 'stats' },
          { type: 'pricingTiers', slot: 'pricing' },
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
          { type: 'statsBar', slot: 'stats' },
          { type: 'teamGrid', slot: 'team' },
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'offerings',
        path: '/pricing',
        title: 'Pricing',
        navLabel: 'Pricing',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'pricingTiers', slot: 'pricing' },
          { type: 'featureGrid', slot: 'features' },
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
          { type: 'faq', slot: 'faq' },
        ],
      },
    ],
    policies: ['privacy', 'terms', 'refund'],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: { showLegalBar: true, showPaymentBadges: false },
  },
  starterSetIds: ['modern_saas_pro', 'saas-devops', 'saas-analytics'],
};

export default saas;
