/**
 * Starter content set — `store-skincare`: Nara — clean clinical skincare.
 * Hand-written. Authentic copy for barrier-first, science-backed formulas in
 * refillable glass. Uses the store (catalogue) composition.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const skincareProducts: CatalogItem[] = [
  {
    id: 'nara-cleansing-01',
    sku: 'NAR-CLS-01',
    name: 'The Gentle Barrier Cleanser',
    price: 28,
    currency: 'USD',
    category: 'Cleanse',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    popular: true,
    badge: 'Bestseller',
    description:
      'A milky, pH-balanced gel cleanser with oat lipids and niacinamide that lifts daily grime and makeup without stripping the barrier. Foam-free and dermatologist-approved for reactive skin.',
    features: [
      'pH 5.5 gentle balanced formula',
      'Oat lipid + ceramide barrier support',
      'Suitable for reactive and sensitive skin',
      'Fragrance-free, non-comedogenic',
    ],
  },
  {
    id: 'nara-serum-02',
    sku: 'NAR-SER-02',
    name: 'Transepidermal Repair Serum',
    price: 46,
    currency: 'USD',
    category: 'Treat',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 386,
    inStock: true,
    popular: true,
    badge: 'Hero',
    description:
      'A 5% niacinamide plus panthenol repair serum that calms redness, strengthens the moisture barrier, and preps skin for anything else in the routine. Absorbs fast and layers cleanly.',
    features: [
      '5% niacinamide + panthenol',
      'Barrier-strengthening ceramide complex',
      'Lightweight, silicone-free texture',
      'Sensitive-skin tested, fragrance-free',
    ],
  },
  {
    id: 'nara-spf-03',
    sku: 'NAR-SPF-50',
    name: 'Mineral Every-Day SPF 50',
    price: 34,
    currency: 'USD',
    category: 'Protect',
    image: 'https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 298,
    inStock: true,
    badge: 'Daily Essential',
    description:
      'A breathable mineral SPF with zinc, a soft matte finish, and no white cast — designed to sit under makeup and hold up through a full day of movement.',
    features: [
      'Zinc oxide, mineral UVA/UVB',
      'Matte, no white cast finish',
      'Reef-safe, non-nano filter',
      'Comes in a refillable soft-touch tube',
    ],
  },
  {
    id: 'nara-cream-04',
    sku: 'NAR-CRM-04',
    name: 'Ceramide Cloud Cream',
    price: 42,
    currency: 'USD',
    category: 'Moisturize',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfb19?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 264,
    inStock: true,
    popular: true,
    badge: 'Cloud Cream',
    description:
      'A whipped ceramide-rich moisturizer that sinks in to a soft-cloud finish, locking in hydration without heaviness — the everyday base for every skin type.',
    features: [
      'Ceramides NP/AP/PE blend',
      'Squalane & panthenol',
      'Whipped, fast-absorbing texture',
      'Non-comedogenic, fragrance-free',
    ],
  },
  {
    id: 'nara-mask-05',
    sku: 'NAR-MSK-05',
    name: 'Overnight Recovery Mask',
    price: 38,
    currency: 'USD',
    category: 'Treat',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4a8e9b4?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 174,
    inStock: true,
    badge: 'Sleep Mask',
    description:
      'A leave-on overnight mask with beta-glucan and oat ceramides that restores the barrier while you sleep, ready for the wash to do its own work come morning.',
    features: [
      'Beta-glucan + oat ceramide',
      'Non-greasy overnight finish',
      'Calms post-extraction and actives',
      'Apply last, rinse in the AM',
    ],
  },
  {
    id: 'nara-refill-06',
    sku: 'NAR-RFL-PACK',
    name: 'Refill Voucher Set (3)',
    price: 15,
    currency: 'USD',
    category: 'Refill',
    image: 'https://images.unsplash.com/photo-1595425970377-c97098cf20a6?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 88,
    inStock: true,
    badge: 'Circular',
    description:
      'Keep your glass bottles and save with recycled refill pouches for the Cleanser, Serum, and Cloud Cream — a full routine with nowhere near the plastic to toss.',
    features: [
      '90% less plastic than new bottles',
      'Recyclable LDPE rebadge pouches',
      'Works with your existing pumps',
      'Ships in one compostable envelope',
    ],
  },
];

export const storeSkincare: StarterContentSet = {
  id: 'store-skincare-clean',
  archetype: 'store',
  name: 'Nara',
  description:
    'Australian clinical skincare built around the barrier — few, excellent formulas in refillable packaging, made for sensitive and normal skin alike.',
  niche: 'Clean clinical skincare & refillables',
  tags: ['skincare', 'clean-beauty', 'clinical', 'sensitive-skin', 'refillable', 'minimal-routine', 'australian'],
  needsPersonalization: false,
  themeId: 'nordic-sage',
  accent: '#4d7c0f',
  business: {
    name: 'Nara',
    legalName: 'Nara Skincare Pty Ltd',
    shortName: 'Nara',
    registrationNumber: 'ABN 54 193 882 117',
    jurisdiction: 'Australia (ACN 193 882 117)',
    governingLaw: 'the laws of Australia',
    registeredAddress: '12 Bond Street, Bondi Junction, NSW 2022, Australia',
    email: 'care@naraskin.example',
    phone: '+61 2 9328 4417',
    website: 'naraskin.example',
    supportHours: 'Monday – Saturday, 09:00 – 17:00 (AEST)',
  },
  brand: { logoText: 'Nara' },
  meta: {
    title: 'Nara — Barrier-first clinical skincare, in refillable Australian packaging',
    description:
      'A short, honest skincare routine of active yet gentle formulas, made in Australia and shipped to you in refillable, low-waste packaging.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Made in Australia • Barrier-First • Refillable',
        headline: 'Skin first, products second',
        accentText: 'fewer, but better',
        subtitle:
          'Nara builds a short clinical routine around your skin barrier — gentle yet active formulas, in refillable packaging, with the science on the label and the ego left out.',
        primaryCta: { label: 'Shop the Routine', href: '/catalog' },
        secondaryCta: { label: 'Our Skincare Philosophy', href: '/about' },
        trustBadges: ['Australian Made', 'Fragrance-Free', 'Refillable • Low-Waste'],
      },
      trust: {
        variant: 'pills',
        title: 'Radical about the barrier, serious about waste',
        items: [
          'Dermatologist-Approved Formulas',
          'Fragrance & Essential Oil Free',
          'Cruelty Free & Vegan',
          'Refillable, Low-Plastic Packaging',
        ],
      },
      catalogue: {
        eyebrow: 'The Routine',
        title: 'All your skin needs',
        description: 'Cleanse, treat, protect, moisturize, and recover — a complete barrier-first system.',
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Cleanse', 'Treat', 'Moisturize', 'Protect', 'Refill'],
        items: skincareProducts,
      },
      highlights: {
        eyebrow: 'Why Nara',
        title: 'Built around what skin actually is',
        description:
          'Most routines ask for too much. Ours works with your barrier instead of against it.',
        items: [
          {
            icon: 'Leaf',
            title: 'Naturally Effective',
            image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
            description:
              'Clinical actives at clinically meaningful percentages, delivered in formulas your barrier accepts — not one-off hero molecules stacked 30-deep.',
          },
          {
            icon: 'Recycle',
            title: 'Refillable by Design',
            image: 'https://images.unsplash.com/photo-1585578155820-9e7e2c7e9c7f?auto=format&fit=crop&w=800&q=80',
            description:
              'Kept your bottle, snap in a refill, toss 90% less plastic. Refill pouches are currently 92% recycled material.',
          },
          {
            icon: 'BadgeCheck',
            title: 'Tested on Skin, Not Rhetoric',
            image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
            description:
              'Every formula is put through patch testing and a 4-week at-home trial before it earns a label.',
          },
          {
            icon: 'PackageOpen',
            title: 'Easy-Beginner Friendly',
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80',
            description:
              'A two or three step routine that is easy to run — because consistency beats complexity for real progress.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Rated by Customers',
        title: 'What routine lovers say',
        items: [
          {
            name: 'Rachel Nguyen',
            role: 'Registered Skin Therapist',
            location: 'Sydney',
            rating: 5,
            text: 'The Repair Serum took my own barrier last winter. Calms redness within the week, and my clients have noticed.',
          },
          {
            name: 'Mia Johansson',
            role: 'Mother of three',
            location: 'Melbourne',
            rating: 5,
            text: 'Finally a routine I can finish in three steps. No fragrance, no fuss, and my reactive skin hasn’t flared in eight months.',
          },
          {
            name: 'Lucas Adams',
            role: 'Triathlete',
            location: 'Gold Coast',
            rating: 5,
            text: 'The refill pouches fit my pump bottles and the SPF doesn’t sting around my eyes after a day outdoor. Genuinely low-maintenance.',
          },
        ],
      },
      cta: {
        headline: 'Start with a single cleanser, build from there',
        subtitle:
          'Free carbon-neutral shipping on orders over $60 and a 60-day money-back promise if it breaks you.',
        primaryCta: { label: 'Shop the Routine', href: '/catalog' },
        secondaryCta: { label: 'Read The Science', href: '/about' },
        guarantee: '30-day money-back guarantee • Free shipping over $60',
      },
    },
  },
};

export default storeSkincare;