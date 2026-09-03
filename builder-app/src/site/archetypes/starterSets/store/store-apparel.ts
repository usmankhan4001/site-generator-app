/**
 * Starter content set — `store-apparel`: minimalist organic cotton everyday essentials.
 * Authentic copy for GOTS-certified organic cotton clothing, heavyweight tees, relaxed fleece, and ethical wardrobe essentials.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const storeApparel: StarterContentSet = {
  id: 'store-apparel',
  archetype: 'store',
  name: 'Minimalist Organic Apparel',
  description:
    'Sustainable everyday wardrobe essentials cut from heavyweight 100% GOTS-certified organic combed cotton, custom milled in Portugal.',
  niche: 'Minimalist organic cotton essentials',
  tags: ['sustainable-apparel', 'organic-cotton', 'minimalist-fashion', 'essentials', 'ethical-clothing', 'dtc-store'],
  needsPersonalization: false,
  themeId: 'nordic-sage',
  business: {
    name: 'Aura Organic Apparel Ltd',
    shortName: 'Aura Studio',
    registrationNumber: '13872910',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '45 Redchurch Street, Shoreditch, London E2 7DJ, United Kingdom',
    email: 'care@aurastudio.example',
    phone: '+44 20 7946 0831',
    website: 'aurastudio.example',
    supportHours: 'Monday – Friday, 09:00 – 17:30 (GMT)',
  },
  brand: { logoText: 'Aura Studio' },
  meta: {
    title: 'Aura Studio — Minimalist 100% Organic Cotton Wardrobe Essentials',
    description:
      'Timeless heavy-jersey t-shirts, french terry sweatshirts, and relaxed trousers crafted ethically in northern Portugal from certified organic cotton.',
  },
  slots: {
    home: {
      hero: {
        badge: 'GOTS Certified Organic • Milled in Portugal',
        headline: 'Everyday wardrobe essentials,',
        accentText: 'pure in form and fiber',
        subtitle:
          'Constructed from custom-spun 240gsm organic combed cotton, pre-shrunk and dyed with non-toxic OEKO-TEX certified botanical pigments. Designed for years of daily wear, not single seasons.',
        primaryCta: { label: 'Shop The Collection', href: '/catalog' },
        secondaryCta: { label: 'Our Sustainability Story', href: '/about' },
        trustBadges: ['100% GOTS Organic Cotton', 'Carbon Neutral Delivery', 'Plastic-Free Packaging'],
      },
      trust: {
        variant: 'pills',
        title: 'Committed to circular & ethical manufacturing',
        items: [
          'Fair-Trade Certified Atelier',
          'OEKO-TEX Standard 100 Non-Toxic Dyes',
          'Plastic-Free FSC Recycled Packaging',
          '30-Day Free Exchanges & Returns',
        ],
      },
      catalogue: {
        eyebrow: 'Everyday Essentials',
        title: 'The Core Capsule',
        description:
          'Heavyweight knits, precision tailoring, and relaxed silhouettes designed to mix seamlessly.',
        currency: 'GBP',
        layout: 'products',
        items: [
          {
            id: 'aura-heavy-tee-01',
            name: 'The 240gsm Heavyweight Tee',
            price: 48,
            priceUnit: ' GBP',
            description:
              'Custom-milled 240gsm combed organic cotton with reinforced rib collar, blind-stitched hem, and relaxed drop-shoulder drape.',
            category: 'Tops',
            badge: 'Bestseller',
            popular: true,
            inStock: true,
            features: [
              '100% Combed Organic Cotton',
              'Pre-Shrunk & Garment Washed',
              'Anti-Twist Side Seams',
              'Zero Synthetic Blends',
            ],
          },
          {
            id: 'aura-terry-crew-02',
            name: 'Classic French Terry Crewneck',
            price: 95,
            priceUnit: ' GBP',
            description:
              '450gsm heavyweight loopback french terry sweatshirt with double-rib side gussets and flatlock athletic stitching.',
            category: 'Sweatshirts',
            badge: 'Essential',
            inStock: true,
            features: [
              '450gsm Loopback Cotton',
              'Reinforced Ribbed Gussets',
              'Brushed Interior Softness',
              'Ethically Made in Guimarães',
            ],
          },
          {
            id: 'aura-relaxed-pant-03',
            name: 'Pleated Organic Canvas Trouser',
            price: 120,
            priceUnit: ' GBP',
            description:
              'Relaxed tapered trouser cut from breathable 280gsm organic cotton twill with elasticated rear waistband and horn buttons.',
            category: 'Bottoms',
            inStock: true,
            features: [
              'Heavy Organic Cotton Twill',
              'Internal Drawstring Waist',
              'Deep Front Slash Pockets',
              'Pre-softened Natural Dye',
            ],
          },
        ],
      },
      highlights: {
        eyebrow: 'Why Aura',
        title: 'Built with intention, worn with ease',
        description:
          'We stripped away logos, synthetic elasticity, and wasteful supply chains to create clothing that lasts.',
        items: [
          {
            icon: 'Leaf',
            title: '100% GOTS-Certified Fibers',
            description:
              'Grown without synthetic pesticides, genetically modified seeds, or chemical defoliants, consuming 91% less water than conventional cotton.',
          },
          {
            icon: 'Sparkles',
            title: 'Dense 240+ GSM Heavy Knits',
            description:
              'Substantial weight fabrics that drape cleanly across the body, hold their structure through hundreds of laundry cycles, and never turn sheer.',
          },
          {
            icon: 'Factory',
            title: 'Family-Run Portuguese Mills',
            description:
              'Crafted in solar-powered ateliers near Porto that uphold living wages, safe conditions, and water recycling purification systems.',
          },
          {
            icon: 'PackageCheck',
            title: 'Zero-Plastic Packaging',
            description:
              'Shipped in home-compostable cornstarch garment bags and FSC-certified unbleached recycled cardboard mailers.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Verified Reviews',
        title: 'What our community wears daily',
        items: [
          {
            name: 'Oliver Thorne',
            role: 'Product Designer',
            location: 'London',
            rating: 5,
            text: 'The 240gsm tee is hands down the best t-shirt I have ever owned. I have washed it over thirty times and the neckline has not stretched or baconed even a millimeter.',
          },
          {
            name: 'Maya Lindqvist',
            role: 'Architect',
            location: 'Stockholm',
            rating: 5,
            text: 'Incredible texture and drape. You can immediately feel the density of the cotton compared to fast-fashion brands. The French Terry crewneck is my everyday uniform.',
          },
          {
            name: 'Samuel Henderson',
            role: 'Photographer',
            location: 'Edinburgh',
            rating: 5,
            text: 'Completely unbranded, beautifully proportioned, and impeccably stitched. Aura proves that minimalist basics can be both luxurious and sustainable.',
          },
        ],
      },
      cta: {
        headline: 'Build a timeless, sustainable wardrobe today',
        subtitle:
          'Enjoy complimentary express UK shipping on orders over £75 and easy 30-day returns with carbon-neutral courier pickup.',
        primaryCta: { label: 'Explore The Full Capsule', href: '/catalog' },
        secondaryCta: { label: 'View Sizing & Fit Guide', href: '/about' },
        guarantee: 'Free worldwide carbon-neutral shipping on orders over £120 • 30-day money back guarantee',
      },
    },
  },
};

export default storeApparel;
