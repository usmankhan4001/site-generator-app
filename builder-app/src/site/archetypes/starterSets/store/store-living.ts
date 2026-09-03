/**
 * Starter content set — `store-living`: Scandinavian Modern Furniture, Handcrafted Ceramics & Lighting.
 * Authentic copy for studio ceramics, architectural white oak furniture, mouth-blown glassware, and Nordic lighting.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const livingProducts: CatalogItem[] = [
  {
    id: 'nf-stoneware-dinner-set',
    name: 'Hand-Thrown Stoneware Dinner Set 16-pc',
    price: 340,
    priceUnit: ' EUR',
    sku: 'NF-CER-SET16-WHT',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description:
      'Complete 16-piece dinner service for four, hand-thrown in iron-rich stoneware with raw toasted bases and speckled matte chalk glaze.',
    category: 'Ceramics & Dining',
    badge: 'Bestseller',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 42,
    features: [
      'Includes 4 dinner plates, 4 salad plates, 4 cereal bowls, 4 mugs',
      'Double-fired at 1280°C for lifetime chip resistance',
      'Dishwasher, oven, and microwave safe',
      'Lead-free non-toxic mineral glaze',
    ],
  },
  {
    id: 'nf-arch-floor-lamp',
    name: 'Sculptural Matte Black Arch Floor Lamp',
    price: 490,
    priceUnit: ' EUR',
    sku: 'NF-LGT-ARCH-BLK',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description:
      'Sweeping architectural arch lamp in sand-textured matte powder-coated steel with a hand-turned spun aluminium shade and dimmable warm glow.',
    category: 'Lighting',
    badge: 'Design Icon',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 28,
    features: [
      'Adjustable 180–220cm cantilever reach',
      'Solid Marquina black marble anchor base (18kg)',
      'Integrated stepless foot-pedal brass dimmer',
      'Warm ambient 2700K CRI 95+ LED engine included',
    ],
  },
  {
    id: 'nf-oak-coffee-table',
    name: 'Solid White Oak Coffee Table',
    price: 780,
    priceUnit: ' EUR',
    sku: 'NF-FUR-OAK-CT80',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=800&q=80',
    description:
      'Low-profile round table milled from sustainably harvested European white oak with soft chamfered edges and mortise-and-tenon joinery.',
    category: 'Furniture',
    badge: 'Crafted in Denmark',
    inStock: true,
    rating: 4.8,
    reviewCount: 19,
    features: [
      '100% FSC-certified solid European white oak',
      '85cm diameter x 36cm height low Japanese proportion',
      'Matte natural hardwax-oil organic finish',
      'Zero synthetic veneers or particle board',
    ],
  },
  {
    id: 'nf-lounge-chair',
    name: 'Linen-Upholstered Modular Lounge Chair',
    price: 1150,
    priceUnit: ' EUR',
    sku: 'NF-FUR-LNG-OAT',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    description:
      'Deep, low-slung lounge armchair upholstered in heavy unbleached Belgian linen over high-resilience natural latex and pocket springs.',
    category: 'Furniture',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 34,
    features: [
      'Heavyweight 650gsm 100% Belgian flax linen',
      'Solid kiln-dried beechwood internal frame',
      'Feather-down and natural latex blend cushioning',
      'Removable dry-cleanable tailored slipcovers',
    ],
  },
  {
    id: 'nf-jute-wool-rug',
    name: 'Handwoven Jute & Wool Area Rug (200x300cm)',
    price: 420,
    priceUnit: ' EUR',
    sku: 'NF-TEX-RUG-2030',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
    description:
      'Chunky flatweave rug interweaving undyed raw organic jute and plush New Zealand wool in a tactile broken-twill geometric relief.',
    category: 'Textiles & Rugs',
    inStock: true,
    rating: 4.7,
    reviewCount: 51,
    features: [
      '60% New Zealand Wool, 40% Raw Golden Jute',
      'Hand-loomed by certified GoodWeave artisans',
      'Naturally stain-resistant and sound-dampening',
      'Reversible double-sided weave construction',
    ],
  },
  {
    id: 'nf-dutch-oven',
    name: 'Cast-Iron Enamel Dutch Oven 5.5L',
    price: 260,
    priceUnit: ' EUR',
    sku: 'NF-KIT-DUTCH-SAGE',
    image: 'https://images.unsplash.com/photo-1584990347449-307fa9b2f347?auto=format&fit=crop&w=800&q=80',
    description:
      'Heavyweight sand-cast iron Dutch oven finished in multi-layer satin sage enamel with self-basting condensation drip interior lid.',
    category: 'Kitchen & Cookware',
    badge: 'Essential',
    inStock: true,
    rating: 5.0,
    reviewCount: 67,
    features: [
      'Heavy-gauge cast iron for superior heat retention',
      'Non-reactive vitreous enamel resistant to acid & chipping',
      'Oven-safe up to 260°C (500°F) with solid brass knob',
      'Compatible with induction, gas, and open flame',
    ],
  },
  {
    id: 'nf-glass-carafe-set',
    name: 'Fluted Mouth-Blown Glass Carafe Set',
    price: 95,
    priceUnit: ' EUR',
    sku: 'NF-GLS-CARAF-SET',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
    description:
      'Delicate optical fluted 1.0L water carafe paired with two nested drinking tumblers, individually mouth-blown in lead-free crystal glass.',
    category: 'Glassware',
    inStock: true,
    rating: 4.8,
    reviewCount: 23,
    features: [
      'Mouth-blown lead-free optical crystal glass',
      'Tumbler doubles as a dust-free carafe lid',
      'Drip-free precision hand-formed pouring lip',
      'Dishwasher safe on gentle glassware cycle',
    ],
  },
  {
    id: 'nf-pendant-light',
    name: 'Smart WiFi Ambient Glow Pendant Light',
    price: 230,
    priceUnit: ' EUR',
    sku: 'NF-LGT-SMT-PND',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    description:
      'Minimalist hemispherical pendant in spun raw brass and opal glass diffuser with integrated circadian rhythm smart light temperature control.',
    category: 'Lighting',
    inStock: true,
    rating: 4.9,
    reviewCount: 15,
    features: [
      'Spun solid brass canopy and matte opal glass globe',
      'Matter & Apple HomeKit / Google Home WiFi compatible',
      'Circadian auto-shift from 2200K sunset to 4000K daylight',
      'Braided 3m linen suspension cable included',
    ],
  },
  {
    id: 'nf-aroma-diffuser',
    name: 'Ceramic Aromatherapy Ultrasonic Diffuser',
    price: 115,
    priceUnit: ' EUR',
    sku: 'NF-FRG-DIFF-OAT',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    description:
      'Textured porcelain ultrasonic mist diffuser with whisper-quiet operation, ambient bottom glow, and automatic dry shut-off.',
    category: 'Home Fragrance',
    inStock: true,
    rating: 4.8,
    reviewCount: 88,
    features: [
      'Matte hand-cast porcelain ceramic cover',
      'Ultrasonic 2.4MHz cold mist atomization',
      'Continuous 8-hour or intermittent 16-hour run times',
      'Includes sample bottle of Nordic Pine botanical oil',
    ],
  },
  {
    id: 'nf-ash-stool',
    name: 'Ergonomic Solid Ash Stool',
    price: 185,
    priceUnit: ' EUR',
    sku: 'NF-FUR-STL-ASH',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    description:
      'Sculpted three-legged stool in solid Nordic ash with an ergonomically contoured tractor seat and wedged through-tenon leg joints.',
    category: 'Furniture',
    inStock: true,
    rating: 4.9,
    reviewCount: 12,
    features: [
      'Solid sustainably sourced Nordic ash',
      'Comfort-contoured saddle seat pan',
      'Stackable up to four stools high',
      'Available in Natural Soap-Washed or Smoked Ash',
    ],
  },
  {
    id: 'nf-boucle-cushion-set',
    name: 'Wool Bouclé Accent Cushion Set (Pair)',
    price: 140,
    priceUnit: ' EUR',
    sku: 'NF-TEX-CSH-BOUC',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    description:
      'Plush 50x50cm accent pillows in heavy textured wool-blend bouclé filled with RDS-certified duck down and feathers.',
    category: 'Textiles & Rugs',
    inStock: true,
    rating: 4.7,
    reviewCount: 39,
    features: [
      'High-tactile wool & alpaca bouclé weave',
      'Concealed Swiss YKK zipper closure',
      '100% RDS-certified duck feather and down insert',
      'Oeko-Tex Standard 100 certified non-toxic fibers',
    ],
  },
  {
    id: 'nf-brass-wall-sconce',
    name: 'Brushed Brass Minimalist Wall Sconce',
    price: 175,
    priceUnit: ' EUR',
    sku: 'NF-LGT-SCN-BRS',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    description:
      'Architectural rotating wall sconce crafted from solid brushed unlacquered brass with directional 360-degree spotlight shield.',
    category: 'Lighting',
    inStock: true,
    rating: 5.0,
    reviewCount: 17,
    features: [
      'Solid untreated brass that will develop a natural patina',
      '360-degree swivel joint with knurled brass lock screw',
      'Hardwired or plug-in convertible installation',
      'Standard GU10 socket (warm 2700K LED included)',
    ],
  },
];

export const storeLiving: StarterContentSet = {
  id: 'store-living',
  archetype: 'store',
  name: 'Nordic Living & Studio Ceramics',
  description:
    'Scandinavian modern furniture, handcrafted stoneware ceramics, mouth-blown glassware, and architectural lighting designed in Copenhagen.',
  niche: 'Scandinavian modern furniture, ceramics & lighting',
  tags: [
    'homeware',
    'scandinavian-living',
    'furniture',
    'ceramics',
    'lighting',
    'tableware',
    'stoneware',
    'interior-design',
    'dtc-store',
  ],
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
    title: 'Nordik Form — Scandinavian Modern Furniture, Handcrafted Ceramics & Lighting',
    description:
      'Wheel-thrown tactile stoneware plates, solid white oak furniture, mouth-blown lighting, and architectural home objects celebrating wabi-sabi simplicity.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Copenhagen Studio • Architectural Living',
        headline: 'Tactile Scandinavian design for mindful,',
        accentText: 'enduring spaces',
        subtitle:
          'Nordik Form designs solid white oak furniture, double-fired stoneware pottery, and warm ambient lighting. Crafted with natural materials that develop rich character over decades of domestic life.',
        primaryCta: { label: 'Explore The Collection', href: '/catalog' },
        secondaryCta: { label: 'Our Design Ethos', href: '/about' },
        trustBadges: ['FSC Certified Solid Oak', 'High-Fired 1280°C Stoneware', 'Breakage-Free Courier Delivery'],
      },
      trust: {
        variant: 'pills',
        title: 'Commitment to slow design & master craftsmanship',
        items: [
          'Solid FSC European Hardwoods',
          'Non-Toxic Food-Safe Glazes',
          '100% Recycled Shock-Proof Packaging',
          '30-Day In-Home Trial Guarantee',
        ],
      },
      catalogue: {
        eyebrow: 'Signature Collection',
        title: 'The Copenhagen Living Edit',
        description:
          'Solid timber furniture, sculptural lighting, and double-fired tableware designed to elevate everyday rituals.',
        currency: 'EUR',
        layout: 'products',
        items: livingProducts,
      },
      highlights: {
        eyebrow: 'Artisanal Pillars',
        title: 'Crafted to be lived with and loved',
        description:
          'We marry Scandinavian architectural restraint with the organic warmth of earth, timber, and fire.',
        items: [
          {
            icon: 'Flame',
            title: 'Double-Fired at 1280°C',
            description:
              'Fired in high-temperature reduction kilns, transforming iron-rich stoneware clay into vitrified, non-porous ceramic that resists chipping for decades.',
          },
          {
            icon: 'TreePine',
            title: 'FSC Solid Hardwood Joinery',
            description:
              'Every table, stool, and chair frame is crafted from certified slow-growth European oak and ash with precision mortise-and-tenon joints.',
          },
          {
            icon: 'Sun',
            title: 'Circadian Ambient Lighting',
            description:
              'Lighting instruments engineered with high-CRI warm emitters and natural materials that soften glare and restore calm to living spaces.',
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
            text: 'The 16-piece stoneware dinner set has elevated every dish I plate. The weight in hand is grounding, the matte chalk glaze doesn’t squeak against cutlery, and they survive daily restaurant use without a scratch.',
          },
          {
            name: 'Lukas Meyer',
            role: 'Architectural Photographer',
            location: 'Berlin',
            rating: 5,
            text: 'The Solid White Oak Coffee Table is staggering. You can see the pure grain matching across the joinery. It makes our morning coffee feel like a mindful ritual.',
          },
          {
            name: 'Chloe Tremblay',
            role: 'Interior Designer',
            location: 'Montreal',
            rating: 5,
            text: 'We specified Nordik Form furniture and lighting for three residential projects this year. The packaging was immaculate, zero breakages, and clients are uniformly in love with the tactile finish.',
          },
        ],
      },
      cta: {
        headline: 'Bring warm Scandinavian craft into your home',
        subtitle:
          'Orders ship within 24 hours from our Copenhagen warehouse with insured courier delivery across Europe and worldwide.',
        primaryCta: { label: 'Shop The Entire Collection', href: '/catalog' },
        secondaryCta: { label: 'Explore Design Story', href: '/about' },
        guarantee: '100% Breakage-Free Arrival Guarantee • 30-Day In-Home Trial',
      },
    },
    offerings: {
      header: {
        headline: 'The Living Collection',
        subtitle:
          'Explore our complete catalogue of handcrafted Scandinavian furniture, studio ceramics, and atmospheric lighting designed for mindful living.',
      },
      catalogue: {
        eyebrow: 'Full Catalogue',
        title: 'Furniture, Ceramics & Lighting',
        description: 'Browse all 12 signature pieces curated for enduring quality and sculptural simplicity.',
        currency: 'EUR',
        layout: 'products',
        categories: [
          'Furniture',
          'Ceramics & Dining',
          'Lighting',
          'Textiles & Rugs',
          'Glassware',
          'Home Fragrance',
          'Kitchen & Cookware',
        ],
        items: livingProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Guaranteed quality & worldwide delivery',
        items: [
          'Solid FSC European Hardwoods',
          'Food-Safe Non-Toxic Glazes',
          'Insured Freight on Furniture',
          '30-Day Easy Returns',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'How are fragile ceramic and glass items packaged for international shipping?',
            a: 'All ceramics and glassware are nestled in custom-engineered 100% recycled paper pulp shells tested to withstand drops from 1.5 meters. We guarantee zero breakage upon arrival.',
          },
          {
            q: 'How should I care for solid white oak furniture?',
            a: 'Our oak pieces are treated with breathable organic hardwax oils. For daily cleaning, wipe with a damp lint-free cloth. Re-oil every 12–18 months using our complimentary natural care balm.',
          },
          {
            q: 'Are the ceramics dishwasher, microwave, and oven safe?',
            a: 'Yes. Because our stoneware is double-fired at 1280°C, it is fully vitrified, non-porous, and safe for standard dishwashers, microwaves, and ovens up to 220°C.',
          },
          {
            q: 'What is your in-home return policy for furniture?',
            a: 'We offer a 30-day in-home trial on all furniture and lighting. If a piece does not suit your space, contact our concierge for a hassle-free courier pickup and full refund.',
          },
        ],
      },
      cta: {
        headline: 'Need assistance with space planning or custom orders?',
        subtitle: 'Our Copenhagen design advisors are available for complimentary digital styling consultations.',
        primaryCta: { label: 'Contact Design Concierge', href: '/contact' },
        secondaryCta: { label: 'Read Our Story', href: '/about' },
        guarantee: 'Worldwide insured courier transit • 2-year structural warranty on all timber furniture',
      },
    },
    about: {
      header: {
        headline: 'Crafting Spaces of Stillness & Warmth',
        subtitle: 'Rooted in the Scandinavian tradition of honest materials, human proportions, and enduring craft.',
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'A rejection of disposable interior trends',
        description: 'Founded in Copenhagen, Nordik Form creates furniture and tableware intended to last for generations.',
        blocks: [
          {
            heading: 'Honoring Natural Materiality',
            body: 'We believe a home should be filled with living materials that grow more graceful with time. Our white oak is sustainably harvested from managed Danish and French forests, dried slowly to prevent warping, and hand-finished with non-toxic botanical oils.',
          },
          {
            heading: 'The Potter’s Touch in a Digital World',
            body: 'In an age of injection molding and synthetic composites, our ceramics are wheel-thrown and hand-glazed by master potters across Scandinavia and Japan. Every gentle surface wave and mineral speckle tells the story of human touch and natural elements.',
          },
        ],
        highlights: [
          '100% FSC-certified slow-growth European timber',
          'Double-fired reduction kiln ceramics',
          'Plastic-free biodegradable packaging on all items',
          'Direct-from-maker transparent pricing',
        ],
      },
      values: {
        eyebrow: 'Guiding Principles',
        title: 'Built on four foundation pillars',
        items: [
          {
            icon: 'Sparkles',
            title: 'Material Honesty',
            description: 'No synthetic veneers, hidden MDF, or chemical sealants. Just solid wood, pure clay, natural wool, and brass.',
          },
          {
            icon: 'Leaf',
            title: 'Circular Responsibility',
            description: 'We calculate and offset 100% of our carbon footprint from raw harvest to final home delivery.',
          },
          {
            icon: 'Clock',
            title: 'Generational Longevity',
            description: 'We engineer joinery and vitrify stoneware so that every object can be handed down to the next generation.',
          },
          {
            icon: 'HeartHandshake',
            title: 'Fair Atelier Wages',
            description: 'All manufacturing partners adhere to strict fair wage standards and safe artisan studio environments.',
          },
        ],
      },
      cta: {
        headline: 'Experience Nordik Form in your sanctuary',
        subtitle: 'Explore our complete catalog of Scandinavian furniture, ceramics, and lighting.',
        primaryCta: { label: 'Browse The Collection', href: '/catalog' },
        secondaryCta: { label: 'Contact Our Team', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'We Are Here to Assist',
        subtitle: 'Have questions about sizing, timber finishes, shipping, or trade accounts? Reach our Copenhagen team.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Ordering & Delivery Inquiries',
        items: [
          {
            q: 'Do you ship internationally?',
            a: 'Yes, we ship to over 50 countries worldwide using insured DHL Express and specialized white-glove furniture freight carriers.',
          },
          {
            q: 'Do you offer trade discounts for interior designers and architects?',
            a: 'Yes. Qualified trade professionals receive bespoke trade pricing, finish swatches, and dedicated project management.',
          },
        ],
      },
    },
  },
};

export default storeLiving;
