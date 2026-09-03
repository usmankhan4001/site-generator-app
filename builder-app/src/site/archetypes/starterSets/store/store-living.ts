/**
 * Starter content set — `store-living`: Scandinavian modern handcrafted ceramics & homeware.
 * Authentic copy for studio ceramics, tactile stoneware tableware, mouth-blown glassware, and Nordic living accents.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const storeLiving: StarterContentSet = {
  id: 'store-living',
  archetype: 'store',
  name: 'Nordic Living & Studio Ceramics',
  description:
    'Handcrafted stoneware ceramics, mouth-blown glassware, and sustainable Scandinavian homeware sculpted by master potters across Scandinavia and Japan.',
  niche: 'Scandinavian handcrafted ceramics & homeware',
  tags: ['homeware', 'scandinavian-living', 'ceramics', 'tableware', 'stoneware', 'interior-design', 'dtc-store'],
  needsPersonalization: false,
  themeId: 'terracotta-living',
  business: {
    name: 'Nordik Form Living ApS',
    shortName: 'Nordik Form',
    registrationNumber: 'DK39824108',
    jurisdiction: 'Copenhagen, Denmark (Erhvervsstyrelsen)',
    governingLaw: 'the laws of the Kingdom of Denmark',
    registeredAddress: 'Bredgade 34, 1260 København K, Denmark',
    email: 'kundeservice@nordikform.example',
    phone: '+45 33 12 84 90',
    website: 'nordikform.example',
    supportHours: 'Monday – Friday, 10:00 – 17:00 (CET)',
  },
  brand: { logoText: 'Nordik Form' },
  meta: {
    title: 'Nordik Form — Handcrafted Scandinavian Stoneware Ceramics & Homeware',
    description:
      'Wheel-thrown tactile stoneware plates, matte glazed ceramic vessels, and architectural home objects celebrating wabi-sabi simplicity.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Wheel-Thrown Stoneware • Designed in Copenhagen',
        headline: 'Tactile ceramics shaped for daily',
        accentText: 'gatherings and rituals',
        subtitle:
          'Nordik Form designs functional stoneware pottery and atmospheric home objects. Double-fired at 1280°C for lifetime chip resistance, finished in natural mineral glazes that celebrate the subtle variance of the potter’s hand.',
        primaryCta: { label: 'Explore The Tableware', href: '/catalog' },
        secondaryCta: { label: 'Discover The Artisans', href: '/about' },
        trustBadges: ['High-Fired Durable Stoneware', 'Dishwasher & Microwave Safe', 'Lead-Free Mineral Glazes'],
      },
      trust: {
        variant: 'pills',
        title: 'Artisanal commitment to sustainable craft',
        items: [
          'Hand-Thrown in Small Batches',
          'Non-Toxic Food-Safe Glazes',
          'Shock-Absorbing Recycled Paper Packaging',
          'Worldwide Breakage-Free Guarantee',
        ],
      },
      catalogue: {
        eyebrow: 'Signature Tableware',
        title: 'The Copenhagen Collection',
        description:
          'Everyday plates, nested bowls, and textured pourers made to elevate daily meals into moments of calm.',
        currency: 'EUR',
        layout: 'products',
        items: [
          {
            id: 'nf-plate-set-01',
            name: 'Kyst Dinner Plate (Set of 4)',
            price: 110,
            priceUnit: ' EUR',
            description:
              '27cm organic rim dinner plates with raw toasted stoneware base and speckled matte chalk-white interior glaze.',
            category: 'Tableware',
            badge: 'Bestseller',
            popular: true,
            inStock: true,
            features: [
              'High-Fired 1280°C Stoneware',
              'Scratch & Chip Resistant',
              'Dishwasher & Oven Safe',
              'Stackable Space-Saving Rim',
            ],
          },
          {
            id: 'nf-bowl-set-02',
            name: 'Fjord Nested Cereal & Soup Bowls (Set of 4)',
            price: 85,
            priceUnit: ' EUR',
            description:
              'Generous 16cm multifaceted bowls with soft tactile satin-matte sage glaze and exposed clay rim.',
            category: 'Bowls',
            badge: 'Essential',
            inStock: true,
            features: [
              '650ml Generous Volume',
              'Heat Retentive Thermal Mass',
              'Organic Asymmetric Lip',
              'Lead & Cadmium Free',
            ],
          },
          {
            id: 'nf-vase-03',
            name: 'Aura Sculptural Ceramic Pitcher & Vase',
            price: 75,
            priceUnit: ' EUR',
            description:
              'Architectural 1.2L pouring vessel featuring an arched handle and textured volcanic basalt finish.',
            category: 'Objects & Vases',
            inStock: true,
            features: [
              'Drip-Free Precision Spout',
              'Watertight Interior Glaze',
              'Sculptural Mantle Statement',
              'Hand-Stamped Studio Mark',
            ],
          },
        ],
      },
      highlights: {
        eyebrow: 'Artisanal Pillars',
        title: 'Crafted to be lived with and loved',
        description:
          'We marry Scandinavian architectural restraint with the organic warmth of earth and fire.',
        items: [
          {
            icon: 'Flame',
            title: 'Double-Fired at 1280°C',
            description:
              'Fired in reduction kilns at extreme temperatures, transforming iron-rich stoneware clay into vitrified, non-porous ceramic that resists chipping for decades.',
          },
          {
            icon: 'Sparkles',
            title: 'Custom Ash & Mineral Glazes',
            description:
              'Formulated in-house using local granite, wood ash, and feldspar to create deep matte textures that soften light and develop tactile character.',
          },
          {
            icon: 'Layers',
            title: 'Seamless Stacking Geometry',
            description:
              'Every plate and bowl profile is calibrated to nest securely in domestic cabinets without rubbing or wedging.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Breakage-Free Transit Guarantee',
            description:
              'Packed using custom molded 100% recycled paper pulp cushions. In the rare event of transit damage, we replace pieces immediately free of charge.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Customer Reviews',
        title: 'Gathered around the table',
        items: [
          {
            name: 'Astrid Lindholm',
            role: 'Food Stylist & Chef',
            location: 'Copenhagen',
            rating: 5,
            text: 'The Kyst dinner plates have elevated every dish I plate. The weight in hand is grounding, the matte chalk glaze doesn’t squeak against cutlery, and they survive daily restaurant use without a scratch.',
          },
          {
            name: 'Lukas Meyer',
            role: 'Architectural Photographer',
            location: 'Berlin',
            rating: 5,
            text: 'The craftsmanship is staggering. You can see the faint spiral ridges from the potter’s wheel on each bowl. It makes our morning breakfast feel like a mindful ritual.',
          },
          {
            name: 'Chloe Tremblay',
            role: 'Interior Designer',
            location: 'Montreal',
            rating: 5,
            text: 'We specified Nordik Form tableware for three residential projects this year. The packaging was immaculate, zero breakages, and clients are uniformly in love with the tactile finish.',
          },
        ],
      },
      cta: {
        headline: 'Bring warm Scandinavian craft into your home',
        subtitle:
          'Orders ship within 24 hours from our Copenhagen warehouse with insured courier delivery across Europe and worldwide.',
        primaryCta: { label: 'Shop The Entire Tableware Range', href: '/catalog' },
        secondaryCta: { label: 'Explore Gift Sets', href: '/about' },
        guarantee: '100% Breakage-Free Arrival Guarantee • 30-Day Easy Returns',
      },
    },
  },
};

export default storeLiving;
