/**
 * Archetype — `agency`: studios & consultancies (design, brand, dev shops).
 * Atelier treatment; portfolio-forward, editorial home with process + timeline.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const agency: ArchetypeMeta = {
  id: 'agency',
  name: 'Agency / Studio',
  description:
    'Studios and consultancies — an editorial home with proof, capabilities, a process walk-through and a track record.',
  mode: 'services',
  defaultThemeId: 'neo-grotesque-zinc',
  treatment: 'atelier',
  keywords: [
    'agency',
    'studio',
    'consultancy',
    'design',
    'branding',
    'creative',
    'marketing',
    'development shop',
    'portfolio',
    'production',
  ],
  style: {
    treatment: 'atelier',
    density: 'spacious',
    headerAlign: 'start',
    card: 'editorial',
    image: 'full-bleed',
    grid: 'asymmetric',
    divider: 'none',
    cta: 'link-arrow',
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
          { type: 'trustBar', slot: 'clients', props: { variant: 'logos' } },
          { type: 'featureGrid', slot: 'capabilities' },
          { type: 'processSteps', slot: 'process' },
          { type: 'testimonials', slot: 'testimonials' },
          { type: 'timeline', slot: 'track-record' },
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
          { type: 'timeline', slot: 'history' },
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
          { type: 'featureGrid', slot: 'services' },
          { type: 'processSteps', slot: 'process' },
          { type: 'pricingTiers', slot: 'engagements' },
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

export default agency;
