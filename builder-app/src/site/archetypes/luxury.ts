/**
 * Archetype — `luxury`: high-end retail & goods (fashion, jewellery, watches).
 * Atelier treatment; image-forward, restrained, story-led commerce.
 */

import type { ArchetypeMeta } from '@/site/archetypes/types';

export const luxury: ArchetypeMeta = {
  id: 'luxury',
  name: 'Luxury Retail',
  description:
    'High-end goods — an image-forward home with a curated grid, brand story and understated calls to action.',
  mode: 'ecommerce',
  defaultThemeId: 'monochrome-atelier',
  treatment: 'atelier',
  keywords: [
    'luxury',
    'fashion',
    'jewellery',
    'watches',
    'couture',
    'atelier',
    'boutique',
    'high-end retail',
    'leather goods',
    'craftsmanship',
  ],
  style: {
    treatment: 'atelier',
    density: 'spacious',
    headerAlign: 'center',
    card: 'editorial',
    image: 'full-bleed',
    grid: 'stagger',
    divider: 'hairline',
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
          { type: 'featureGrid', slot: 'highlights' },
          { type: 'prose', slot: 'story' },
          { type: 'productGrid', slot: 'collection', props: { layout: 'products' } },
          { type: 'testimonials', slot: 'testimonials' },
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
          { type: 'timeline', slot: 'heritage' },
          { type: 'ctaBanner', slot: 'cta' },
        ],
      },
      {
        key: 'offerings',
        path: '/catalog',
        title: 'Collection',
        navLabel: 'Collection',
        nav: true,
        sections: [
          { type: 'pageHeader', slot: 'header' },
          { type: 'productGrid', slot: 'collection', props: { layout: 'products' } },
          { type: 'prose', slot: 'materials' },
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
    policies: ['privacy', 'terms', 'refund', 'shipping'],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Collection', href: '/catalog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: { showLegalBar: true, showPaymentBadges: true },
  },
  starterSetIds: ['luxury-horology', 'luxury-eyewear', 'luxury-leather'],
};

export default luxury;
