/**
 * Starter content set — `store-athletic`: Pulse — performance activewear & training equipment.
 * Hand-written. Authentic copy for high-rep training apparel and data-driven
 * home gym tools. Uses the store (catalogue) composition.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const athleticProducts: CatalogItem[] = [
  {
    id: 'pulse-compression-tee-01',
    sku: 'PLS-TEE-ROW-01',
    name: 'The Velocity Compression Training Tee',
    price: 62,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 318,
    inStock: true,
    popular: true,
    badge: 'Bestseller',
    description:
      'A four-way-stretch athletic tee with targeted compression panels, anti-odor silver-ion knit, and seam placement that survives heavy barbell movement without chafing.',
    features: [
      'Four-way stretch compression knit',
      'Silver-ion anti-odor technology',
      'Flatlock seams built for barbell work',
      'Breathable mesh rear underarm panel',
    ],
  },
  {
    id: 'pulse-short-02',
    sku: 'PUL-SHR-SPLT-02',
    name: 'The Split-Layer Speed Short',
    price: 48,
    currency: 'USD',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    popular: true,
    badge: 'Laceless Fit',
    description:
      'A lightweight split-hem short with a hidden phone pocket and bonded waistband that stays put through sprints — designed for the run-to-lift crowd.',
    features: [
      'Split-hem freedom of movement',
      'Hidden zippered side pocket',
      'Bonded no-roll waistband',
      'Quick-dry recycled polyester',
    ],
  },
  {
    id: 'pulse-hoodie-03',
    sku: 'PUL-HOD-HEAVY-03',
    name: 'The Heavyweight Woven Hoodie',
    price: 88,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    badge: 'Pre-Game Essential',
    description:
      'A warm, durable oversized hoodie with French-terry loopback, thumbhole cuffs, and a phone-proof kangaroo pocket — the track-and-tape layer you pull on between sessions.',
    features: [
      'Heavyweight French terry loopback',
      'Thumbhole cuffs + roomy hood',
      'Reinforced kangaroo pocket',
      'Pre-shrunk, anti-bobble finish',
    ],
  },
  {
    id: 'pulse-kettlebell-04',
    sku: 'PUL-KB-12',
    name: 'Competition-Grade Steel Kettlebell (12kg)',
    price: 95,
    currency: 'USD',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 89,
    inStock: true,
    popular: true,
    badge: 'Home Gym',
    description:
      'A single-cast competition kettlebell with a unified handle width and enamel finish for chalk grip — the same spec as the one used on classic reps.',
    features: [
      'Single-cast ASTM-certified steel',
      'Enamel anti-slip coating',
      'Flat, stable wrestling base',
      'Marked in kg with ID castings',
    ],
  },
  {
    id: 'pulse-slamball-05',
    sku: 'PUL-SB-6',
    name: 'Grip-Tex Slam Ball (6kg)',
    price: 45,
    currency: 'USD',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 62,
    inStock: true,
    badge: 'Conditioning',
    description:
      'A durable rubber slam ball with a texturized grip surface that holds chalk and holds up to high-velocity slams in your driveway or gym floor.',
    features: [
      'High-durability rubber shell',
      'Texturized anti-slip grip',
      'Dead-ball bounce for control',
      'Multiple weights available',
    ],
  },
  {
    id: 'pulse-jumprope-06',
    sku: 'PUL-JR-CABLE',
    name: 'Ball-Bearing Speed Jump Rope',
    price: 25,
    currency: 'USD',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 205,
    inStock: true,
    badge: 'Cardio',
    description:
      'A 4mm coated steel cable rope with ball-bearing handles and an adjustable length for crisp, low-snag turns at speed.',
    features: [
      '4mm steel cable core',
      'Dual ball-bearing handles',
      'Tool-free length adjustment',
      'Swivel-resistant tangle design',
    ],
  },
];

export const storeAthletic: StarterContentSet = {
  id: 'store-athletic-gear',
  archetype: 'store',
  name: 'Pulse',
  description:
    'High-performance activewear and data-driven training equipment for athletes who train daily — from woven training tees to competition-grade home gym tools.',
  niche: 'Performance activewear & training equipment',
  tags: ['activewear', 'athletic-apparel', 'training-equipment', 'home-gym', 'performance', 'dtc-store', 'fitness'],
  needsPersonalization: false,
  themeId: 'crimson-velocity',
  accent: '#ef4444',
  business: {
    name: 'Pulse',
    legalName: 'Pulse Performance Athletics, Inc.',
    shortName: 'Pulse',
    registrationNumber: 'DE-4209773',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of California',
    registeredAddress: '900 McDonald Road, Suite 220, Sacramento, CA 95826, USA',
    email: 'team@pulseathletic.example',
    phone: '+1 (916) 555-0149',
    website: 'pulseathletic.example',
    supportHours: 'Monday – Friday, 08:00 – 18:00 (PT)',
  },
  brand: { logoText: 'Pulse' },
  meta: {
    title: 'Pulse — Performance activewear & training gear for real athletes',
    description:
      'Compression apparel and competition-grade home gym tools, field-tested by coaches and built to outlast every extra set.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Coached By Athletes • Built To Last',
        headline: 'Train harder,',
        accentText: 'gear that keeps up',
        subtitle:
          'Pulse makes the apparel and tools our own training staff swear by — compression that breathes, fabrics that shrug off the rack, and gym equipment that survives even you.',
        primaryCta: { label: 'Shop Apparel', href: '/catalog' },
        secondaryCta: { label: 'Browse Equipment', href: '/catalog' },
        trustBadges: ['Coached & Tested', '30-Day Sweat Guarantee', 'Carbon-Neutral Shipping'],
      },
      trust: {
        variant: 'pills',
        title: 'The Pulse standard',
        items: [
          'Athlete-Tested Fabrics',
          'Lifetime Seam Warranty',
          'Gym-Certified Equipment',
          'Sizes True to the Rep',
        ],
      },
      catalogue: {
        eyebrow: 'New & Core',
        title: 'Everyday performance, sold straight',
        description:
          'Apparel and gear picked by our coaches, tested through seasons, and shipped without a middleman markup.',
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Tops', 'Bottoms', 'Equipment'],
        items: athleticProducts,
      },
      highlights: {
        eyebrow: 'Why Pulse',
        title: 'Engineered for the next set',
        description:
          'If a product does not survive a season of double sessions, it does not get a label.',
        items: [
          {
            icon: 'Watch',
            title: 'Compression that Clicks',
            image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80',
            description:
              'Designed with a four-way-stretch knit that holds its support set after set, without the sweaty cling that kills performance.',
          },
          {
            icon: 'Dumbbell',
            title: 'Gym-C Equipment',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
            description:
              'Single-cast steel and Enamel-finished gear with the grip and balance you need to train with precision at home.',
          },
          {
            icon: 'Layers',
            title: 'Built for Seasons',
            image: 'https://images.unsplash.com/photo-1475274046210-5488256c4f36?auto=format&fit=crop&w=800&q=80',
            description:
              'Reinforced seams, anti-bobble polyester, and a lifetime seam warranty — kit built to a second-to-none standard.',
          },
          {
            icon: 'Truck',
            title: 'Sold Direct & Fair',
            image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
            description:
              'We sell straight to athletes, keeping the price honest and the performance the only real argument.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Verified Reviews',
        title: 'What the depot says',
        items: [
          {
            name: 'Keisha Banks',
            role: 'Track Coach',
            location: 'Sacramento, CA',
            rating: 5,
            text: 'I coach and I wear the compression line all day. It holds up through sprint work, drills, and the months. The only brand where the seams never just quit on me.',
          },
          {
            name: 'Diego Ramos',
            role: 'CrossFit Athlete',
            location: 'Austin, TX',
            rating: 5,
            text: 'The kettlebell is proper competition spec — I power-clean it daily and it still has no wobble. That slam ball also survives my driveway double-days.',
          },
          {
            name: 'Áine McTernan',
            role: 'Functional Trainer',
            location: 'Dublin',
            rating: 5,
            text: 'You can feel the design intention. The compression tee has logged a hundred heavy sessions and it still hasn’t given the quality I’d expect at this price.',
          },
        ],
      },
      cta: {
        headline: 'Outfit your next training block with gear that moves',
        subtitle:
          'Free shipping over $75, a lifetime seam warranty on apparel, and a no-questions 30-day sweat guarantee.',
        primaryCta: { label: 'Shop Everything', href: '/catalog' },
        secondaryCta: { label: 'Meet the Athletes', href: '/about' },
        guarantee: '30-day sweat guarantee • Lifetime seam warranty on apparel',
      },
    },
  },
};

export default storeAthletic;