/**
 * Starter content set — `store-fashion`: Contemporary Minimalist Fashion & Tailored Apparel.
 * Authentic copy for modern relaxed tailoring, raw Japanese denim, heavyweight knitwear, and ethical wardrobe essentials.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const fashionProducts: CatalogItem[] = [
  {
    id: 'vf-wool-overshirt',
    name: 'Double-Breasted Heavy Wool Overshirt',
    price: 240,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-APP-OVR-WOL',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    description:
      '520gsm boiled Italian wool overshirt with structured dropped shoulders, horn buttons, and concealed dual side-seam hand warmer pockets.',
    category: 'Outerwear',
    badge: 'Atelier Pick',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 38,
    features: [
      '100% Boiled Italian virgin wool (520gsm)',
      'Natural horn buttons and interior piped seams',
      'Relaxed boxy silhouette designed for effortless layering',
      'Crafted in limited small batches in Porto, Portugal',
    ],
  },
  {
    id: 'vf-ribbed-mockneck',
    name: 'Heavyweight Organic Ribbed Mockneck',
    price: 110,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-KNT-MCK-OAT',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    description:
      'Dense 7-gauge organic combed cotton knit sweater with architectural mock neckline, tubular cuffs, and seamless body construction.',
    category: 'Knitwear',
    badge: 'Bestseller',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 57,
    features: [
      '100% GOTS-Certified Organic Combed Cotton',
      'Dense 7-gauge English rib knit structure',
      'Pre-shrunk and garment dyed with non-toxic pigments',
      'Retains collar elasticity through endless laundry cycles',
    ],
  },
  {
    id: 'vf-tencel-trousers',
    name: 'Pleated Wide-Leg Tencel Trousers',
    price: 165,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-BTM-TRU-TNC',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description:
      'Fluid double-pleated trousers cut from sustainable Austrian Tencel lyocell twill with elasticated back waist and deep front slash pockets.',
    category: 'Trousers',
    inStock: true,
    rating: 4.8,
    reviewCount: 42,
    features: [
      '100% Austrian Lenzing Tencel Lyocell twill',
      'Double forward pleats for elegant drape and movement',
      'Concealed horn button closure and internal drawstring',
      'Naturally breathable, hypoallergenic, and wrinkle-resistant',
    ],
  },
  {
    id: 'vf-selvedge-denim',
    name: '14oz Raw Japanese Selvedge Denim',
    price: 195,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-DNM-RAW-14OZ',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    description:
      'Classic relaxed straight-leg jeans woven on vintage Toyoda shuttle looms in Kojima, Okayama using 100% rope-dyed indigo Zimbabwe cotton.',
    category: 'Denim',
    badge: 'Okayama Made',
    inStock: true,
    rating: 4.9,
    reviewCount: 65,
    features: [
      '14oz Kurabo Japanese pink-line selvedge denim',
      'Rope-dyed natural indigo develops personalized fade patina',
      'Solid copper rivets peened by hand at strain points',
      'Custom debossed vegetable-tanned leather waistband patch',
    ],
  },
  {
    id: 'vf-linen-blazer',
    name: 'Structured Relaxed Linen Blazer',
    price: 290,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-APP-BLZ-LIN',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description:
      'Unstructured modern two-button blazer tailored in heavy 340gsm Normandy flax linen with soft unpadded shoulders and patch pockets.',
    category: 'Outerwear',
    inStock: true,
    rating: 4.7,
    reviewCount: 29,
    features: [
      '100% Certified Normandy Flax Linen (340gsm)',
      'Unconstructed soft shoulder drape for casual elegance',
      'Cupro sleeve lining for frictionless arm entry',
      'Mother-of-pearl smoke buttons',
    ],
  },
  {
    id: 'vf-cashmere-crewneck',
    name: 'Cashmere Blend Raglan Crewneck',
    price: 220,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-KNT-CSH-CREW',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
    description:
      'Ultra-soft 12-gauge knit combining 70% superfine merino wool and 30% recycled Mongolian cashmere with athletic raglan sleeve seams.',
    category: 'Knitwear',
    inStock: true,
    rating: 5.0,
    reviewCount: 48,
    features: [
      '70% Superfine Merino Wool, 30% GRS-Certified Recycled Cashmere',
      'Featherlight warmth with non-itch skin contact softness',
      'Ribbed collar, cuffs, and hem with lycra recovery threads',
      'Pilling-resistant spinning technology',
    ],
  },
  {
    id: 'vf-poplin-shirt',
    name: 'Relaxed Poplin Camp Collar Shirt',
    price: 95,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-TOP-POP-CAMP',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description:
      'Crisp 120s two-ply organic cotton poplin short-sleeve shirt with retro Cuban camp collar, straight vented hem, and mother-of-pearl buttons.',
    category: 'Shirts',
    inStock: true,
    rating: 4.8,
    reviewCount: 33,
    features: [
      '100% Organic Long-Staple Cotton Poplin',
      'Classic convertible camp collar with top loop',
      'Garment washed for a soft lived-in matte handfeel',
      'Relaxed boxy silhouette with side seam vents',
    ],
  },
  {
    id: 'vf-merino-beanie',
    name: '100% Merino Wool Ribbed Beanie',
    price: 45,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-ACC-BNI-MER',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    description:
      'Double-layer 100% extra-fine merino wool watch cap beanie with adjustable fold-over cuff and itch-free seamless circular knitting.',
    category: 'Accessories',
    inStock: true,
    rating: 4.9,
    reviewCount: 91,
    features: [
      '100% Extra-fine 19.5-micron Australian merino wool',
      'Seamless 3D circular knit for zero pressure points',
      'Naturally thermoregulating and odor resistant',
      'Available in Midnight, Oat, Sand, and Olive',
    ],
  },
  {
    id: 'vf-french-terry-hoodie',
    name: 'Oversized 450gsm French Terry Hoodie',
    price: 130,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-SWE-HOD-450',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description:
      'Ultra-heavyweight 450gsm loopback cotton hoodie with double-layer crossover hood, eliminated drawstrings for clean minimalism, and hidden kangaroo pocket.',
    category: 'Sweatshirts',
    badge: 'Essential',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 84,
    features: [
      '450gsm Heavyweight Portuguese Loopback Cotton',
      'Structured double-layered hood that stands erect',
      'Ribbed athletic side gussets for enhanced mobility',
      'Anti-shrink pre-washed fabric with flatlock athletic stitching',
    ],
  },
  {
    id: 'vf-leather-belt',
    name: 'Italian Full-Grain Minimalist Leather Belt',
    price: 85,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-ACC-BLT-LTH',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
    description:
      '30mm dress belt sculpted from vegetable-tanned Tuscan bridle leather with solid hand-brushed nickel-free brass buckle and hand-burnished edges.',
    category: 'Accessories',
    inStock: true,
    rating: 4.8,
    reviewCount: 37,
    features: [
      '100% Full-grain Tuscan vegetable-tanned leather (3.5mm thick)',
      'Solid hypoallergenic brass hardware in brushed matte finish',
      'Five teardrop-shaped adjustment holes with bevelled edges',
      'Develops rich cognac patina over years of daily wear',
    ],
  },
  {
    id: 'vf-chore-jacket',
    name: 'Brushed Organic Cotton Chore Jacket',
    price: 175,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-APP-JKT-CHR',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    description:
      'Workwear-inspired utility jacket cut from durable 380gsm brushed organic cotton canvas with three patch pockets and reinforced bar-tacks.',
    category: 'Outerwear',
    inStock: true,
    rating: 4.9,
    reviewCount: 52,
    features: [
      '380gsm Heavy Organic Cotton Canvas with brushed peach finish',
      'Reinforced triple-stitched seams and rivet-backed pockets',
      'Internal chest pocket sized for passport or smartphone',
      'Classic straight hem and notched workwear collar',
    ],
  },
  {
    id: 'vf-silk-bandana',
    name: 'Silk-Cotton Voile Bandana Scarf',
    price: 55,
    currency: 'EUR',
    priceUnit: ' EUR',
    sku: 'VF-ACC-SCF-SLK',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    description:
      '55x55cm featherlight neck scarf woven in 50% Mulberry silk and 50% organic cotton voile with hand-rolled and hand-stitched edges.',
    category: 'Accessories',
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
    features: [
      '50% Grade 6A Mulberry Silk, 50% Organic Cotton Voile',
      'Traditional hand-rolled and hand-stitched rolled hems',
      'Subtle monochrome geometric tonal screen print',
      'Breathable tactile drape for spring and autumn layering',
    ],
  },
];

export const storeFashion: StarterContentSet = {
  id: 'store-fashion',
  archetype: 'store',
  name: 'Contemporary Minimalist Fashion',
  description:
    'Relaxed tailoring, heavy Portuguese organic cotton knitwear, and raw Japanese selvedge denim crafted for contemporary capsule wardrobes.',
  niche: 'Contemporary minimalist fashion & tailored apparel',
  tags: [
    'fashion',
    'minimalist-apparel',
    'tailoring',
    'selvedge-denim',
    'organic-cotton',
    'sustainable-fashion',
    'dtc-store',
  ],
  needsPersonalization: false,
  themeId: 'monochrome-atelier',
  business: {
    name: 'Verve Studio Fashion SAS',
    shortName: 'Verve Studio',
    registrationNumber: 'FR-918204918',
    jurisdiction: 'Paris, France (RCS Paris)',
    governingLaw: 'the laws of the French Republic',
    registeredAddress: '14 Rue Charlot, 75003 Paris, France',
    email: 'atelier@vervestudio.example',
    phone: '+33 1 44 78 92 10',
    website: 'vervestudio.example',
    supportHours: 'Monday – Friday, 09:30 – 18:30 (CET)',
  },
  brand: { logoText: 'Verve Studio' },
  meta: {
    title: 'Verve Studio — Contemporary Minimalist Fashion & Relaxed Tailoring',
    description:
      'Discover timeless boiled wool overshirts, 14oz Okayama raw selvedge denim, heavy organic knitwear, and fluid Tencel trousers tailored in Europe.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Spring Capsule • Atelier Milled in Portugal & Japan',
        headline: 'Quietly architectural clothing, tailored for',
        accentText: 'modern daily life',
        subtitle:
          'Verve Studio creates unbranded wardrobe essentials using heavyweight natural fibers, Japanese shuttle-loom denim, and unstructured European tailoring.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
        primaryCta: { label: 'Shop The Capsule', href: '/catalog' },
        secondaryCta: { label: 'Our Tailoring Philosophy', href: '/about' },
        trustBadges: ['100% Natural Organic Fibers', 'Japanese Selvedge Denim', 'Plastic-Free Packaging'],
      },
      trust: {
        variant: 'pills',
        title: 'Commitment to slow fashion & material integrity',
        items: [
          'GOTS & GRS Certified Sustainable Fibers',
          'Family-Owned European Ateliers',
          'Zero Synthetic Polyester Blends',
          'Complimentary Worldwide Returns within 30 Days',
        ],
      },
      catalogue: {
        eyebrow: 'Capsule Edit',
        title: 'The Permanent Collection',
        description:
          'Structured outerwear, dense organic cotton knits, and relaxed trousers designed to mix seamlessly.',
        currency: 'EUR',
        layout: 'products',
        items: fashionProducts,
      },
      highlights: {
        eyebrow: 'Atelier Standards',
        title: 'Crafted without shortcuts, worn with confidence',
        description:
          'We strip away ephemeral logos and fast-fashion synthetic elasticity in favor of dense natural drape and enduring construction.',
        items: [
          {
            icon: 'Scissors',
            title: 'Unstructured Tailoring',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
            description:
              'Blazers and overshirts designed with soft natural shoulders and generous proportions that move fluidly with your body.',
          },
          {
            icon: 'Sparkles',
            title: '450+ GSM Heavy Knits',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description:
              'Substantial Portuguese French terry and combed rib knits that hold their silhouette through years of wear without sagging.',
          },
          {
            icon: 'Leaf',
            title: '100% Biodegradable Fibers',
            image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
            description:
              'Exclusively organic cotton, virgin wool, Normandy linen, Austrian Tencel, and mulberry silk—zero microplastic shedding.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Okayama Shuttle Looms',
            image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
            description:
              'Raw denim slowly woven on vintage Toyoda shuttle looms in Kojima, creating authentic self-edge selvedge with rich character.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Client Impressions',
        title: 'What our community wears daily',
        items: [
          {
            name: 'Jean-Luc Moreau',
            role: 'Creative Director',
            location: 'Paris',
            rating: 5,
            text: 'The Double-Breasted Boiled Wool Overshirt is a triumph. The drape is heavy and structured yet completely comfortable. It has replaced my winter trench.',
          },
          {
            name: 'Elena Rostova',
            role: 'Architect',
            location: 'Berlin',
            rating: 5,
            text: 'The Pleated Tencel Trousers have the most elegant flow I have ever seen in ready-to-wear fashion. The craftsmanship and internal binding are impeccable.',
          },
          {
            name: 'Samuel Thorne',
            role: 'Photographer',
            location: 'London',
            rating: 5,
            text: 'Real 14oz Japanese raw denim that fits true to size and breaks in beautifully. Verve Studio proves that high-end fashion doesn’t need massive logos.',
          },
        ],
      },
      cta: {
        headline: 'Build a timeless, cohesive capsule wardrobe today',
        subtitle:
          'Orders ship within 24 hours from our Paris warehouse with express courier delivery and carbon-neutral packaging.',
        primaryCta: { label: 'Explore The Full Capsule', href: '/catalog' },
        secondaryCta: { label: 'View Sizing & Fit Guide', href: '/about' },
        guarantee: 'Free worldwide express delivery over €150 • 30-day effortless returns',
      },
    },
    offerings: {
      header: {
        headline: 'The Complete Capsule Archive',
        subtitle:
          'Explore our full catalogue of relaxed tailoring, heavy organic knits, Okayama selvedge denim, and refined accessories.',
      },
      catalogue: {
        eyebrow: 'Full Inventory',
        title: 'Outerwear, Knitwear, Trousers & Denim',
        description: '12 timeless garments and accessories cut from premium certified natural fibers.',
        currency: 'EUR',
        layout: 'products',
        categories: [
          'Outerwear',
          'Knitwear',
          'Trousers',
          'Denim',
          'Shirts',
          'Sweatshirts',
          'Accessories',
        ],
        items: fashionProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Sustainable fashion guarantee',
        items: [
          '100% GOTS Organic Cotton',
          'Okayama Selvedge Denim',
          'Plastic-Free Packaging',
          '30-Day Easy Exchange',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'How do I choose the right size?',
            a: 'Our silhouettes feature a modern, relaxed fit. If you prefer a tailored look, we recommend sizing down one size. Detailed garment measurements are provided on each product page.',
          },
          {
            q: 'How should I care for raw Japanese selvedge denim?',
            a: 'We recommend wearing your raw denim for at least 6 months before the first wash to set high-contrast fade creases. When washing, turn inside out and wash in cold water with mild detergent, then hang dry.',
          },
          {
            q: 'Where are Verve Studio garments manufactured?',
            a: 'Our knitwear and outerwear are made in family-run ateliers near Porto, Portugal and northern Italy. Our denim is milled and sewn in Okayama, Japan.',
          },
          {
            q: 'What is your international returns policy?',
            a: 'We offer 30-day returns and exchanges worldwide. All items must be unwashed, unworn, and returned in their original compostable packaging.',
          },
        ],
      },
      cta: {
        headline: 'Need personal styling or fit consultation?',
        subtitle: 'Our Paris atelier team is available via chat and video consultation to assist with sizing.',
        primaryCta: { label: 'Contact Styling Team', href: '/contact' },
        secondaryCta: { label: 'Read Our Story', href: '/about' },
        guarantee: 'Insured worldwide courier shipping • Carbon-neutral delivery on all orders',
      },
    },
    about: {
      header: {
        headline: 'The Architecture of Daily Dressing',
        subtitle: 'Eliminating transient trends in pursuit of timeless form, tactile materiality, and ethical production.',
      },
      story: {
        eyebrow: 'Our Vision',
        title: 'A considered wardrobe built on fewer, better pieces',
        description: 'Verve Studio was established in the Marais district of Paris with the conviction that true luxury is defined by fiber density, immaculate stitching, and longevity.',
        blocks: [
          {
            heading: 'Direct Partnership with Heritage Mills',
            body: 'We source directly from specialized family mills: 14oz shuttle-loom denim from Okayama, boiled virgin wool from Biella, and custom 450gsm organic fleece from Guimarães.',
          },
          {
            heading: 'Zero Synthetic Shortcuts',
            body: 'Unlike fast fashion brands that blend polyester and elastane to cut costs, our garments are crafted entirely from pure natural fibers that breathe, age gracefully, and can be fully recycled.',
          },
        ],
        highlights: [
          '100% GOTS-certified organic cotton and GRS recycled cashmere',
          'Direct-to-consumer honest pricing with zero wholesale markup',
          'Plastic-free biodegradable packaging made from plant starches',
          'Annual carbon footprint calculation and certified offsetting',
        ],
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      },
      values: {
        eyebrow: 'Core Standards',
        title: 'Our four foundational pillars',
        items: [
          {
            icon: 'Sparkles',
            title: 'Substantial GSM Densities',
            description: 'We use heavy knits and weaves (240–520gsm) that hold their architectural shape without deformation.',
          },
          {
            icon: 'HeartHandshake',
            title: 'Ethical Atelier Living Wages',
            description: 'We partner exclusively with verified workshops providing fair living wages and safe conditions.',
          },
          {
            icon: 'Leaf',
            title: 'Pure Natural Fibers',
            description: 'No synthetic blends, nylon fillers, or microplastic-shedding acrylics in our collections.',
          },
          {
            icon: 'Clock',
            title: 'Seasonless Capsules',
            description: 'We release curated capsule iterations designed to integrate with pieces bought years ago.',
          },
        ],
      },
      cta: {
        headline: 'Curate your permanent wardrobe capsule',
        subtitle: 'Explore our latest collection of contemporary essentials.',
        primaryCta: { label: 'Shop The Collection', href: '/catalog' },
        secondaryCta: { label: 'Contact Us', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'Connect With The Paris Atelier',
        subtitle: 'Have questions about sizing, care instructions, or international delivery? Reach our Marais team.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Client Services',
        items: [
          {
            q: 'Do you offer custom alterations?',
            a: 'We offer complimentary hem length adjustments for all trousers at our Paris boutique location on Rue Charlot.',
          },
          {
            q: 'How fast will my order arrive?',
            a: 'Orders in the EU arrive in 2–3 business days via DHL Express. International orders arrive in 3–5 business days.',
          },
        ],
      },
    },
  },
};

export default storeFashion;
