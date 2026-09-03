/**
 * Archetype — `local`: trade & local services (clinics, contractors, studios
 * with a service area). Workshop treatment; direct, high-contrast, contact-led.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const local: ArchetypeMeta = {
  id: 'local',
  name: 'Local Business',
  description:
    'Trade and local services — a direct home with trust badges, service list, process, reviews and a prominent contact panel.',
  mode: 'services',
  defaultThemeId: 'sunset-amber',
  treatment: 'workshop',
  keywords: [
    'local',
    'trade',
    'contractor',
    'clinic',
    'plumber',
    'electrician',
    'salon',
    'repair',
    'service area',
    'appointment',
  ],
  style: {
    treatment: 'workshop',
    density: 'compact',
    headerAlign: 'start',
    card: 'flat',
    image: 'contained',
    grid: 'even',
    divider: 'rule',
    cta: 'block',
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
          { type: 'trustBar', slot: 'trust', props: { variant: 'pills' } },
          { type: 'valueGrid', slot: 'services' },
          { type: 'processSteps', slot: 'process' },
          { type: 'testimonials', slot: 'reviews' },
          { type: 'productGrid', slot: 'pricing', props: { layout: 'products' } },
          { type: 'ctaBanner', slot: 'cta' },
          { type: 'contactPanel', slot: 'contact', props: { showDetails: true } },
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
          { type: 'valueGrid', slot: 'services' },
          { type: 'pricingTiers', slot: 'pricing' },
          { type: 'processSteps', slot: 'process' },
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
          { type: 'locationList', slot: 'area' },
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

export default local;
