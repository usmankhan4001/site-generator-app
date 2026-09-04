/**
 * Archetype — `store`: general e-commerce (multi-product catalogues, DTC brands).
 * Signal treatment; catalogue-forward with trust signals + social proof.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const store: ArchetypeMeta = {
  id: 'store',
  name: 'Online Store',
  description:
    'General e-commerce — a catalogue-forward home with trust signals, product grid, feature highlights and reviews.',
  mode: 'ecommerce',
  defaultThemeId: 'terracotta-living',
  treatment: 'signal',
  keywords: [
    'store',
    'shop',
    'ecommerce',
    'retail',
    'dtc',
    'catalogue',
    'products',
    'homeware',
    'lifestyle',
    'consumer goods',
  ],
  style: {
    treatment: 'signal',
    density: 'regular',
    headerAlign: 'center',
    card: 'elevated',
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
          { type: 'trustBar', slot: 'trust', props: { variant: 'pills' } },
          { type: 'productGrid', slot: 'catalogue', props: { layout: 'products' } },
          { type: 'featureGrid', slot: 'highlights' },
          { type: 'testimonials', slot: 'reviews' },
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
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'offerings',
        path: '/catalog',
        title: 'Shop',
        navLabel: 'Shop',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'productGrid', slot: 'catalogue', props: { layout: 'products' } },
          { type: 'trustBar', slot: 'trust', props: { variant: 'pills' } },
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
    policies: ['privacy', 'terms', 'refund', 'shipping'],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Shop', href: '/catalog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: { showLegalBar: true, showPaymentBadges: true },
  },
  starterSetIds: [
    'mega_electronics_store',
    'store-apparel',
    'store-fashion',
    'store-electronics',
    'store-gadgets',
    'store-living',
    'store-outdoor',
    'store-coffee',
  ],
};

export default store;
