/**
 * Starter content set — `luxury-fragrance`: Vessel — independent niche fragrance house.
 * Hand-written. Authentic copy for extrait perfumes, hand-poured in small
 * batches from rare naturals. Uses the luxury (atelier) composition.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

const fragranceFlacons = [
  {
    id: 'vessel-noir-extrait-01',
    name: 'Noir Extrait de Parfum',
    price: 320,
    priceUnit: ' USD',
    description:
      'A midnight extrait of Calabrian bergamot, dark amber, and smoked vetiver — dense, persistent, and unapologetically evening.',
    category: 'Extraits',
    badge: 'Signature',
    popular: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    features: [
      '30% extrait concentration',
      'Wild-harvested Calabrian bergamot',
      'Hand-poured in rural Provence',
      '36-month maturation before release',
    ],
  },
  {
    id: 'vessel-by-the-ridge-02',
    name: 'By the Ridge Eau de Parfum',
    price: 240,
    priceUnit: ' USD',
    description:
      'Fresh mountain air, green fig, and a whisper of cedar — a clean, wearable signature for daytime.',
    category: 'Eau de Parfum',
    badge: 'Best Seller',
    popular: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80',
    features: [
      '18% eau de parfum concentration',
      'Cold-pressed green fig',
      'Ormavia cedar heart notes',
      'Cruelty-free, not tested',
    ],
  },
  {
    id: 'vessel-ember-candle-03',
    name: 'Ember Hand-Poured Candle',
    price: 95,
    priceUnit: ' USD',
    description:
      'A slow-burning candle of amber, sandalwood, and a hint of clove, poured by hand into a reusable veined glass vessel.',
    category: 'Home',
    badge: 'Home Ritual',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1602526135058-adcbcbe2d5de?auto=format&fit=crop&w=800&q=80',
    features: [
      '80-hour clean-burn soy-coconut blend',
      'Reusable hand-blown glass vessel',
      'Lead-free cotton wick',
      'Hand-poured in small batches',
    ],
  },
  {
    id: 'vessel-salt-air-04',
    name: 'Salt & Cypress Eau de Toilette',
    price: 185,
    priceUnit: ' USD',
    description:
      'A Mediterranean breeze of sea salt, cypress, and dried driftwood — light, breezy, and made for warm days.',
    category: 'Eau de Toilette',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1587015449667-677976451818?auto=format&fit=crop&w=800&q=80',
    features: [
      '12% eau de toilette concentration',
      'Mediterranean cypress needle',
      'Hand-blended in Grasse',
      'Spray on warm skin for best breadth',
    ],
  },
  {
    id: 'vessel-noon-silk-05',
    name: 'Noon Silk Extrait',
    price: 310,
    priceUnit: ' USD',
    description:
      'Saffron, orris, and warm amber silk — a golden-hour extrait that lingers like late summer.',
    category: 'Extrait',
    badge: 'Limited',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    features: [
      '25% extrait concentration',
      'Saffron and orris root',
      'One seasonal batch per year',
      'Numbered limited flacons',
    ],
  },
];

export const luxuryFragranceHouse: StarterContentSet = {
  id: 'luxury-fragrance-house',
  archetype: 'luxury',
  name: 'Vessel',
  description:
    'An independent niche fragrance house blending extrait perfumes and hand-poured home scents from wild-harvested naturals, matured slowly and poured by hand.',
  niche: 'Independent niche fragrance house',
  tags: ['niche-fragrance', 'perfume', 'extrait', 'artisan', 'candles', 'grasse', 'luxury'],
  needsPersonalization: false,
  themeId: 'noir-ivory',
  accent: '#d4af37',
  business: {
    name: 'Vessel',
    legalName: 'Vessel Parfums Artisanaux SARL',
    shortName: 'Vessel',
    registrationNumber: 'FR-920-884-217',
    jurisdiction: 'France (Grasse)',
    governingLaw: 'the laws of France',
    registeredAddress: '18 Avenue des Fleurs, 06130 Grasse, France',
    email: 'atelier@vesselparfums.example',
    phone: '+33 4 93 82 04 17',
    website: 'vesselparfums.example',
    supportHours: 'Monday – Friday, 09:00 – 18:00 (CEST)',
  },
  brand: { logoText: 'Vessel' },
  meta: {
    title: 'Vessel — Niche extraits & hand-poured home scents from Grasse',
    description:
      'Small-batch perfumery from the heart of Grasse — wild-harvested naturals, long maturation, and reasons to linger on the skin.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Grasse Atelier • Small-Batch • Numbered Flacons',
        headline: 'Perfume that asks you',
        accentText: 'to slow down',
        subtitle:
          'In the birthplace of perfumery, we blend extraits from wild-harvested botanicals and let them mature for a year before they meet your skin. Each flacon is numbered, each batch small enough to count.',
        primaryCta: { label: 'Discover the Collection', href: '/catalog' },
        secondaryCta: { label: 'Our Craft', href: '/about' },
        trustBadges: ['Naturals Sourced Responsibly', 'Cruelty-Free & Vegan', 'Hand-Poured in Grasse'],
      },
      highlights: {
        eyebrow: 'The Vessel Way',
        title: 'Slow perfumery, honest materials',
        description:
          'Three principles guide every pour — sourcing, patience, and craft.',
        items: [
          {
            icon: 'Leaf',
            title: 'Wild-Harvested Naturals',
            description:
              'We source wild-harvested and organic botanicals, working directly with farmers in Grasse and Calabria rather than commodity refiners.',
          },
          {
            icon: 'Hourglass',
            title: 'Slow Maturation',
            description:
              'Extraits rest for 12 months before release, so top, heart, and base settle into each other instead of fighting.',
          },
          {
            icon: 'Hand',
            title: 'Hand-Poured',
            description:
              'Every flacon is filled, waxed, and numbered by hand in our atelier — a tangible trace of the person who blended it.',
          },
          {
            icon: 'Sparkles',
            title: 'Wearable Art',
            description:
              'We blend for skin, not for paper. Each composition is tested on many skins over weeks before it earns the Vessel flacon.',
          },
        ],
      },
      story: {
        eyebrow: 'Our Story',
        title: 'From a Grasse workbench to your wrist',
        description:
          'Vessel began when its founder left a decade in luxury houses to blend without a brief.',
        blocks: [
          {
            heading: 'Against the trend',
            body: 'The industry moves fast; we move slowly. Where others chase commerciality, we chase a composition you cannot forget — and let the perfume take three years if it needs three years.',
          },
          {
            heading: 'Materials honest to their origin',
            body: 'Our bergamot comes from a single Calabrian grove we have worked with for a decade. Our cedar is steam-distilled locally. Every ingredient is traceable to its source.',
          },
        ],
        highlights: [
          'A decade of work in major perfume houses',
          'Naturals sourced directly from 12 farmers',
          'Extraits matured for 12+ months',
          'Each flacon numbered and hand-sealed',
        ],
      },
      collection: {
        eyebrow: 'The Collection',
        title: 'Extraits, eaux, and home rituals',
        description:
          'A concise range — every fragrance a fully resolved idea, not a flanker to chase the last one.',
        currency: 'USD',
        layout: 'products',
        categories: ['Extrait', 'Eau de Parfum', 'Eau de Toilette', 'Home'],
        items: fragranceFlacons,
      },
      testimonials: {
        eyebrow: 'Patrons',
        title: 'Why collectors stay',
        items: [
          {
            name: 'Camille Dufour',
            role: 'Collector',
            location: 'Paris',
            rating: 5,
            text: 'I own bottles from every great name in Grasse. Vessel is the only house I buy twice — the maturation is real, you can feel it in every note.',
          },
          {
            name: 'Oliver Reed',
            role: 'Designer',
            location: 'Copenhagen',
            rating: 5,
            text: 'By the Ridge gets me asked what I am wearing every single time. I have never owned a signature that drew so much curiosity.',
          },
          {
            name: 'Yuki Tanaka',
            role: 'Sommelier (nose)',
            location: 'Kyoto',
            rating: 5,
            text: 'The Ember candle is the most honest sandalwood candle I have known — no artificial sweetness, just a warm, slow evening in a glass.',
          },
        ],
      },
      cta: {
        headline: 'Find the scent that slows you down',
        subtitle:
          'Explore our numbered flacons online, or book a private tasting in the Grasse atelier.',
        primaryCta: { label: 'Shop the Collection', href: '/catalog' },
        secondaryCta: { label: 'Book a Tasting', href: '/contact' },
        guarantee: 'Blessing sample sets with every online fragrance order',
      },
    },
  },
};

export default luxuryFragranceHouse;