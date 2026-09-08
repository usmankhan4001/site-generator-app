/**
 * Starter content set — `store-apparel`: Minimalist Organic Apparel & Everyday Wardrobe Essentials.
 * Authentic copy for GOTS-certified organic cotton clothing, heavyweight tees, relaxed fleece, and ethical wardrobe essentials.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const apparelProducts: CatalogItem[] = [
  {
    id: 'aura-heavy-tee-01',
    sku: 'AUR-TEE-240-WHT',
    name: 'The 240gsm Heavyweight Organic Tee',
    price: 48,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    popular: true,
    badge: 'Bestseller',
    description:
      'Precision-cut from custom-spun 240gsm combed organic cotton with a reinforced 1x1 rib collar that never bacon-curls. Garment-dyed with non-toxic botanical pigments for subtle vintage depth and pre-shrunk to retain its relaxed drop-shoulder drape across hundreds of wash cycles.',
    features: [
      '100% GOTS-Certified Combed Organic Cotton',
      'Substantial 240gsm Heavyweight Single-Jersey Knit',
      'Blind-Stitched Clean Hems & Anti-Sag Neckband',
      'Pre-Shrunk with Zero Synthetic Blends',
      'Ethically Milled & Sewn in Guimarães, Portugal',
    ],
  },
  {
    id: 'aura-terry-crew-02',
    sku: 'AUR-CRW-450-OAT',
    name: '450gsm French Terry Relaxed Crewneck',
    price: 95,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
    popular: true,
    badge: 'Core Capsule',
    description:
      'Handcrafted in northern Portugal from dense 450gsm unbrushed loopback cotton for ideal all-season thermal regulation. Engineered with double-rib flexible side gussets and flatlock athletic seam construction for unrestricted everyday movement.',
    features: [
      '450gsm Dense Loopback Organic French Terry',
      'Double-Rib Side Panel Gussets for Natural Articulation',
      'Flatlock Durable Athletic Seam Construction',
      'Brushed Interior Face for Supreme Softness',
      'OEKO-TEX Standard 100 Certified Non-Toxic Dyes',
    ],
  },
  {
    id: 'aura-waffle-knit-03',
    sku: 'AUR-WAF-320-SGE',
    name: 'Thermal Organic Cotton Waffle Longsleeve',
    price: 75,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    badge: 'New Release',
    description:
      'Knitted on vintage circular looms with a deep honeycomb waffle grid that naturally traps ambient warmth against the skin. Features extended storm-knit cuffs and a contoured raglan shoulder line that layers smoothly under heavy outerwear or unbuttoned overshirts.',
    features: [
      '320gsm Deep Honeycomb Thermal Waffle Knit',
      'Contoured Raglan Sleeves for Unrestricted Reach',
      'Extended Ribbed Cuffs with Natural Elastic Recovery',
      'Pre-Softened Organic Cotton Yarn',
    ],
  },
  {
    id: 'aura-linen-overshirt-04',
    sku: 'AUR-OVS-280-SAN',
    name: 'Organic Cotton-Linen Canvas Overshirt',
    price: 135,
    currency: 'USD',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    description:
      'A versatile transitional layering piece cut from a structural 60% organic cotton and 40% Normandy flax linen canvas weave. Tailored with dual drop-in patch pockets, natural corozo nut buttons, and a clean camp collar that transitions seamlessly between studio work and evening gatherings.',
    features: [
      '60% GOTS Organic Cotton / 40% Flax Linen Canvas',
      'Natural Sustainable Corozo Nut Button Closures',
      'Dual Reinforced Drop-In Chest Utility Pockets',
      'Relaxed Straight Boxy Silhouette for Easy Layering',
      'Enzyme Garment Washed for Broken-In Drape',
    ],
  },
  {
    id: 'aura-merino-knit-05',
    sku: 'AUR-MRN-300-CHA',
    name: 'Seamless Ribbed Merino Knit Sweater',
    price: 165,
    currency: 'USD',
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 88,
    inStock: true,
    popular: true,
    badge: 'Signature',
    description:
      '3D whole-garment knitted from ultra-fine 19.5 micron regenerative ZQ-certified merino wool for zero yarn waste and seamless comfort. Naturally temperature-regulating and hypoallergenic, delivering incredible thermal loft without scratchiness or bulk.',
    features: [
      '100% ZQ-Certified Regenerative Merino Wool',
      'Zero-Waste Seamless 3D Whole-Garment Knitting',
      'Natural Thermoregulation & Odor Resistance',
      '7-Gauge Chunky Rib Stitch Collar, Cuffs, and Hem',
      'Machine Washable on Gentle Cold Wool Cycle',
    ],
  },
  {
    id: 'aura-cashmere-cardigan-06',
    sku: 'AUR-CSH-350-TAU',
    name: 'Recycled Cashmere V-Neck Cardigan',
    price: 220,
    currency: 'USD',
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
    badge: 'Heirloom',
    description:
      'Spun in northern Italy from 70% post-consumer recycled cashmere and 30% organic virgin merino wool for cloud-like thermal insulation. Features deep horn-finish buttons, dropped shoulders, and dual side welt pockets for an effortless relaxed silhouette.',
    features: [
      '70% GRS-Certified Recycled Cashmere / 30% Organic Merino',
      'Five-Button Placket with Hand-Finished Horn Closures',
      'Dual Integrated Side Welt Hand Pockets',
      'High-Twist Double-Ply Yarn for Superior Pilling Resistance',
    ],
  },
  {
    id: 'aura-mockneck-knit-07',
    sku: 'AUR-MCK-400-NAT',
    name: 'Chunky Organic Wool Mockneck Sweater',
    price: 185,
    currency: 'USD',
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    description:
      'A cold-weather staple knitted from undyed, unbleached organic highland wool with subtle natural tonal flecks. Finished with a protective structured mock collar and relaxed saddle sleeves designed to withstand frosty northern climates.',
    features: [
      '100% Undyed & Unbleached Organic Highland Wool',
      '5-Gauge Heavyweight Fisherman Rib Knit Structure',
      'Protective Double-Layer Ribbed Mockneck Collar',
      'Fully Fashioned Saddle Shoulder Construction',
      'Naturally Water-Repellent Lanoline-Rich Wool Fibers',
    ],
  },
  {
    id: 'aura-pleated-trouser-08',
    sku: 'AUR-TRS-280-OLV',
    name: 'Pleated Organic Cotton Canvas Trouser',
    price: 140,
    currency: 'USD',
    category: 'Trousers',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 116,
    inStock: true,
    popular: true,
    badge: 'Bestseller',
    description:
      'Tailored from durable 280gsm organic cotton twill with deep single reverse front pleats and a relaxed tapered leg. Includes a concealed interior cotton drawstring waistband for custom comfort without breaking its clean architectural silhouette.',
    features: [
      '280gsm Custom-Milled Organic Cotton Twill',
      'Single Forward Pleats with Modern Relaxed Taper',
      'Concealed Internal Cotton Waistband Drawstring',
      'Clean Bound Seams with Recycled Cotton Bias Binding',
      'Deep Slanted Front Pockets & Rear Buttoned Welt Pockets',
    ],
  },
  {
    id: 'aura-easy-chino-09',
    sku: 'AUR-UTL-260-KHA',
    name: 'Relaxed Utility Elasticated Pant',
    price: 125,
    currency: 'USD',
    category: 'Trousers',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 74,
    inStock: true,
    description:
      'Cut with an easy straight leg from soft washed organic cotton ripstop that resists abrasions while staying airy and breathable. Designed with deep front slash pockets, rear patch pockets with button flaps, and an elasticated waistband with tonal cotton cord.',
    features: [
      '100% Organic Cotton Tear-Resistant Ripstop',
      'Encased Elastic Waistband with Braided Cotton Drawcord',
      'Reinforced Knee Articulation Panels',
      'Pre-Washed for Zero Post-Purchase Shrinkage',
    ],
  },
  {
    id: 'aura-linen-trousers-10',
    sku: 'AUR-LIN-220-ECR',
    name: 'Wide-Leg Washed Linen Trouser',
    price: 145,
    currency: 'USD',
    category: 'Trousers',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    badge: 'Warm Weather',
    description:
      'Breathable 220gsm Normandy flax linen woven with a breezy open structure for all-day comfort during warm climates. Cut with a generous wide-leg drape, high rise, and clean tailored waistband with side buckle adjusters.',
    features: [
      '100% Certified Normandy Flax Linen',
      'Flattering High-Rise Silhouette with Fluid Wide-Leg Fall',
      'Adjustable Side Waist Tabs for a Precision Fit',
      'Enzyme-Washed for a Silky Matte Handfeel',
      'Deep Inseam Side Pockets',
    ],
  },
  {
    id: 'aura-chore-jacket-11',
    sku: 'AUR-JKT-380-NAV',
    name: 'Heavy Canvas Organic Chore Coat',
    price: 195,
    currency: 'USD',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 165,
    inStock: true,
    popular: true,
    badge: 'Iconic',
    description:
      'Inspired by traditional European atelier workwear and crafted from heavyweight 380gsm organic duck canvas. Triple-needle chainstitched at all stress points with three large utility drop pockets and an internal passport-sized pocket.',
    features: [
      '380gsm Heavyweight Organic Cotton Duck Canvas',
      'Triple-Needle Chainstitched Seam Construction',
      'Three Exterior Patch Pockets + Hidden Interior Passport Pocket',
      'Heavy Antiqued Brass Shank Buttons',
      'Reinforced Elbow Patches for Decades of Daily Wear',
    ],
  },
  {
    id: 'aura-wool-coat-12',
    sku: 'AUR-COT-550-BLK',
    name: 'Minimalist Double-Faced Wool Coat',
    price: 340,
    currency: 'USD',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    badge: 'Limited Edition',
    description:
      'An unlined double-faced overcoat hand-sewn from 100% certified organic non-mulesed virgin wool. Features clean notch lapels, a concealed horn button placket, and deep hand-warmer pockets for timeless minimalist elegance in chilly weather.',
    features: [
      '100% Certified Organic Virgin Wool (Non-Mulesed)',
      'Hand-Split and Hand-Finished Double-Faced Construction',
      'Concealed Five-Button Storm Placket with Corozo Closures',
      'Naturally Wind-Resistant and Temperature-Regulating',
      'Clean Center-Back Vent for Fluid Stride',
    ],
  },
];

export const storeApparel: StarterContentSet = {
  id: 'store-apparel',
  archetype: 'store',
  name: 'Minimalist Organic Apparel',
  description:
    'Sustainable everyday wardrobe essentials cut from heavyweight 100% GOTS-certified organic combed cotton and regenerative wool, ethically milled in Portugal.',
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
      'Timeless heavy-jersey t-shirts, french terry sweatshirts, organic wool knits, and relaxed trousers crafted ethically in northern Portugal from certified organic fibers.',
  },
  slots: {
    home: {
      hero: {
        badge: 'GOTS Certified Organic • Milled in Portugal',
        headline: 'Everyday wardrobe essentials,',
        accentText: 'pure in form and fiber',
        subtitle:
          'Constructed from custom-spun 240gsm organic combed cotton and regenerative wool, pre-shrunk and dyed with non-toxic OEKO-TEX certified botanical pigments. Designed for years of daily wear, not single seasons.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
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
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Tops', 'Knitwear', 'Trousers', 'Outerwear'],
        items: apparelProducts,
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
            image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
            description:
              'Grown without synthetic pesticides, genetically modified seeds, or chemical defoliants, consuming 91% less water than conventional cotton.',
          },
          {
            icon: 'Sparkles',
            title: 'Dense 240+ GSM Heavy Knits',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            description:
              'Substantial weight fabrics that drape cleanly across the body, hold their structure through hundreds of laundry cycles, and never turn sheer.',
          },
          {
            icon: 'Factory',
            title: 'Family-Run Portuguese Mills',
            image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
            description:
              'Crafted in solar-powered ateliers near Porto that uphold living wages, safe conditions, and water recycling purification systems.',
          },
          {
            icon: 'PackageCheck',
            title: 'Zero-Plastic Packaging',
            image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
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
          'Enjoy complimentary carbon-neutral shipping on orders over $100 and easy 30-day returns with home courier pickup.',
        primaryCta: { label: 'Explore The Full Capsule', href: '/catalog' },
        secondaryCta: { label: 'View Sizing & Fit Guide', href: '/about' },
        guarantee: 'Free carbon-neutral shipping on orders over $100 • 30-day money back guarantee',
      },
    },
    offerings: {
      header: {
        eyebrow: 'The Complete Range',
        title: 'Curated Organic Wardrobe Essentials',
        subtitle:
          'Designed to be layered, mixed, and worn daily. Explore our full collection of heavyweight organic tees, fleece, knitwear, and tailored trousers.',
      },
      catalogue: {
        eyebrow: 'Full Collection',
        title: 'Shop All Pieces',
        description: 'Explore conscious apparel crafted from certified organic fibers and milled in Portugal.',
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Tops', 'Knitwear', 'Trousers', 'Outerwear'],
        items: apparelProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Ethical assurance on every order',
        items: [
          'Certified Organic GOTS Cotton',
          'Plastic-Free Compostable Mailers',
          'Free Exchanges & Prepaid Return Labels',
          'Tracked Carbon-Neutral Courier Delivery',
        ],
      },
      faq: {
        eyebrow: 'Product & Sizing FAQ',
        title: 'Frequently asked questions',
        items: [
          {
            q: 'How should I care for my GOTS organic cotton garments?',
            a: 'Wash inside out with similar colors on a gentle cold cycle (30°C / 85°F). We recommend line drying to preserve the botanical dye depth and save energy, although items can be tumble dried on low.',
          },
          {
            q: 'How does your sizing run?',
            a: 'Our garments feature a modern relaxed drape. If you prefer a true-to-size classic silhouette, order your standard size. For an oversized streetwear look, order one size up. Check our detailed size chart for precise chest and inseam measurements.',
          },
          {
            q: 'What is your shipping and return policy?',
            a: 'We offer free carbon-neutral standard delivery on domestic orders over $100. If you are not completely satisfied, return unworn items with original tags within 30 days for a full refund or free size exchange.',
          },
        ],
      },
      cta: {
        headline: 'Need personal sizing advice?',
        subtitle: 'Our concierge team is available to assist with fabric details, measurements, and capsule styling.',
        primaryCta: { label: 'Contact Studio Concierge', href: '/contact' },
        secondaryCta: { label: 'Read Our Story', href: '/about' },
      },
    },
    about: {
      header: {
        eyebrow: 'Our Philosophy',
        title: 'Designed for longevity, crafted with conscience',
        subtitle:
          'We founded Aura Studio to challenge the planned obsolescence of modern fashion through pure materials and ethical manufacturing.',
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'From Northern Portuguese Looms to Your Wardrobe',
        description:
          'Every Aura garment begins in the historic textile valley of Guimarães, Portugal, where traditional weaving meets modern ecological conscience.',
        blocks: [
          {
            heading: 'Family-Run Solar Powered Mills',
            body: 'We partner directly with multigenerational family-owned mills that combine traditional weaving heritage with state-of-the-art solar-powered operations and closed-loop water treatment facilities.',
          },
          {
            heading: 'Radical Fiber Integrity & Direct Pricing',
            body: 'By cutting out traditional distributor markups and seasonal discounting cycles, we invest more in premium raw materials: custom 240–450gsm organic ring-spun cotton yarns, non-toxic plant dyes, and durable chainstitched seams that outlast ordinary retail garments by years.',
          },
        ],
        highlights: [
          '100% GOTS-Certified Aegean Organic Cotton',
          'Zero synthetic polyester or elastane blending',
          'Botanical non-toxic dyes certified OEKO-TEX Standard 100',
          'Fair living wages guaranteed across our entire manufacturing chain',
        ],
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      },
      values: {
        eyebrow: 'Guiding Principles',
        title: 'How we build sustainably',
        items: [
          {
            title: 'Radical Fiber Traceability',
            description: '100% of our raw cotton is traced back to certified organic farms in the Aegean basin that practice regenerative soil stewardship.',
          },
          {
            title: 'Circular & Non-Toxic Chemistry',
            description: 'We exclusively use OEKO-TEX Standard 100 botanical and low-impact reactive dyes free from phthalates, heavy metals, and formaldehyde.',
          },
          {
            title: 'Fair Living Wage Guarantee',
            description: 'All artisans and textile workers in our partner ateliers receive living wages, comprehensive healthcare, and work under verified safe conditions.',
          },
        ],
      },
      cta: {
        headline: 'Experience the difference of honest organic craft',
        subtitle: 'Discover garments made to be worn, loved, and lived in for years to come.',
        primaryCta: { label: 'Shop The Capsule', href: '/catalog' },
        secondaryCta: { label: 'Get in Touch', href: '/contact' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Client Care',
        title: 'How can we help?',
        subtitle:
          'Have questions regarding garment measurements, shipping timelines, or our ethical sourcing? Our London team is here to assist.',
      },
      form: {
        title: 'Send a Message',
        subtitle: 'We typically respond to all inquiries within 2 to 4 business hours.',
        submitLabel: 'Send Inquiry',
        showDetails: true,
      },
      faq: {
        eyebrow: 'Support Helpdesk',
        title: 'Quick answers',
        items: [
          {
            q: 'Where do your orders ship from?',
            a: 'All orders are dispatched directly from our London and European logistics hubs with full end-to-end tracking.',
          },
          {
            q: 'Do you offer international delivery?',
            a: 'Yes, we ship to over 60 countries worldwide using carbon-neutral express courier services with all duties and taxes calculated transparently at checkout.',
          },
          {
            q: 'Can I place a wholesale or corporate gifting order?',
            a: 'Yes, we offer bespoke embroidery and bulk ethical wardrobe solutions for forward-thinking creative studios and corporate teams. Contact care@aurastudio.example for pricing.',
          },
        ],
      },
    },
  },
};

export default storeApparel;
