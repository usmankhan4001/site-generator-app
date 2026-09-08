/**
 * Starter content set — `luxury_fashion_dtc`: Aura Atelier Fashion.
 * Authentic copy for bespoke Paris haute couture, silk garments, cashmere knitwear,
 * editorial fashion collections, and slide-over cart checkout.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const fashionCollection: CatalogItem[] = [
  {
    id: 'aura-silk-trench',
    name: 'Double-Breasted Mulberry Silk Trench',
    price: 1850,
    priceUnit: ' EUR',
    sku: 'AUR-HC-TRN-01',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    description:
      'Handcrafted from 40-momme heavy Lyon mulberry silk with unbleached horn buttons, storm flap silhouette, and detachable belt.',
    category: 'Outerwear',
    badge: 'Maison Icon',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
    features: [
      '100% 40-momme Lyon Mulberry Silk twill',
      'Hand-carved buffalo horn buttons with engraved Maison monogram',
      'Water-repellent organic beeswax finish',
      'Numbered atelier edition of 100 garments worldwide',
    ],
  },
  {
    id: 'aura-cashmere-blazer',
    name: 'Deconstructed Cashmere Oversized Blazer',
    price: 1450,
    priceUnit: ' EUR',
    sku: 'AUR-HC-BLZ-02',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description:
      'Pure Grade-A Mongolian cashmere with peak lapels, horn buttons, hand-stitched pick lapels, and cupro cupro-silk lining.',
    category: 'Tailoring',
    badge: 'New Season',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    features: [
      '100% Mongolian two-ply pure cashmere',
      'Full floating canvas chest construction for natural drape',
      'Hand-sewn milanese lapel buttonhole',
      'Dual interior welt pockets with passport slot',
    ],
  },
  {
    id: 'aura-slip-dress',
    name: 'Bias-Cut Liquid Silk Evening Slip',
    price: 980,
    priceUnit: ' EUR',
    sku: 'AUR-HC-DRS-03',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description:
      'Fluid floor-length evening slip cut on the true bias from heavy sandwashed silk charmeuse with delicate French lingerie straps.',
    category: 'Eveningwear',
    badge: 'Limited Edition',
    inStock: true,
    rating: 5.0,
    reviewCount: 65,
    features: [
      'True 45-degree diagonal bias cut for sculptural drape',
      'Hand-rolled hem finished by master Parisian seamstresses',
      'Concealed invisible side closure with mother-of-pearl hooks',
      'Gentle sandwashed luster that softens with every wear',
    ],
  },
  {
    id: 'aura-cashmere-turtleneck',
    name: 'Ribbed Seamless Cashmere Turtleneck',
    price: 680,
    priceUnit: ' EUR',
    sku: 'AUR-HC-KNT-04',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    description:
      'Seamless 3D-knit high-gauge cashmere pullover featuring a relaxed rolled neck and elongated architectural cuffs.',
    category: 'Knitwear',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 91,
    features: [
      'Zero-waste whole-garment 3D knitting technology',
      'Ultra-fine 15.2 micron white cashmere fibers',
      'Relaxed high-neck silhouette with ribbed collar retention',
      'OEKO-TEX Certified natural plant dyes',
    ],
  },
  {
    id: 'aura-pleated-trouser',
    name: 'High-Waisted Wide Leg Wool Trouser',
    price: 790,
    priceUnit: ' EUR',
    sku: 'AUR-HC-TRS-05',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    description:
      'Super 150s virgin wool trousers featuring double inverted front pleats, tab waistband adjusters, and a generous fluid wide-leg fall.',
    category: 'Tailoring',
    inStock: true,
    rating: 4.8,
    reviewCount: 29,
    features: [
      'Super 150s high-twist wool from Biella, Italy',
      'Side tab buckle waist adjusters in brushed palladium',
      'Curved waistband designed to sit cleanly on the natural waist',
      'Pre-cuffed 4cm break with hand-basted hem allowance',
    ],
  },
  {
    id: 'aura-leather-tote',
    name: 'Sculptural Calfskin Atelier Day Bag',
    price: 1650,
    priceUnit: ' EUR',
    sku: 'AUR-HC-ACC-06',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Full-grain French box calfskin bag with hand-painted raw edges, magnetic origami fold closure, and suede interior lining.',
    category: 'Accessories',
    badge: 'Atelier Piece',
    inStock: true,
    rating: 5.0,
    reviewCount: 53,
    features: [
      'French full-grain box calf leather with natural patina aging',
      'Seven coats of hand-applied edge wax and burnishing',
      'Solid brass hardware with 24k pale gold galvanic plating',
      'Removable zipped interior pouch in matching lambskin',
    ],
  },
];

export const luxuryFashionDtc: StarterContentSet = {
  id: 'luxury_fashion_dtc',
  archetype: 'luxury',
  name: 'Aura Atelier Fashion',
  description:
    'Direct-to-consumer French luxury fashion house specializing in limited-edition silk outerwear, Mongolian cashmere tailoring, and artisanal leather goods.',
  niche: 'Haute Couture & DTC Luxury Fashion',
  tags: [
    'luxury-fashion',
    'haute-couture',
    'silk',
    'cashmere',
    'atelier',
    'paris',
    'dtc',
    'slow-fashion',
  ],
  needsPersonalization: false,
  themeId: 'monochrome-atelier',
  accent: '#18181b',
  layoutSystem: 'atelier',
  business: {
    name: 'Aura Atelier Haute Couture SAS',
    shortName: 'Aura Atelier',
    registrationNumber: 'RCS Paris 849 203 194',
    jurisdiction: 'Paris, France (Chambre Syndicale de la Haute Couture affiliate)',
    governingLaw: 'the laws of France (Tribunal de Commerce de Paris)',
    registeredAddress: '14 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    email: 'maison@auraatelier.example',
    phone: '+33 1 42 68 55 00',
    website: 'auraatelier.example',
    taxId: 'FR 72 849203194',
    supportHours: 'Lundi – Samedi, 10:00 – 19:30 (CET)',
  },
  brand: {
    logoText: 'Aura Atelier',
  },
  header: {
    variant: 'editorial_centered',
    sticky: true,
    transparent: true,
    showAnnouncement: true,
    announcementText: 'Complimentary Worldwide White-Glove Shipping on Orders Above €500',
    announcementLink: { label: 'View Collection', href: '/catalog' },
    secondaryCta: { label: 'Private Salon Fitting', href: '/contact' },
  },
  headerCta: {
    label: 'Explore Autumn/Winter 2026',
    href: '/catalog',
  },
  meta: {
    title: 'Aura Atelier Paris — Maison de Haute Couture & Ready-to-Wear',
    description:
      'Artisanal silhouettes cut from pure Lyon mulberry silks, unbleached Mongolian cashmere, and French box calfskin. Crafted in Paris with lifetime care.',
    ogImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    variant: 'editorial_center',
    tagline:
      'Aura Atelier Haute Couture SAS — 14 Rue du Faubourg Saint-Honoré, 75008 Paris. Registered with the RCS Paris No. 849 203 194. Devoted to sustainable luxury and timeless Parisian elegance.',
    secondaryLegalText:
      'Maison Aura Atelier garments are protected under international intellectual property and industrial design covenants. All items crafted in compliance with European Reach environmental directives and OEKO-TEX Standard 100.',
    badgeText: 'Chambre Syndicale Affiliate · RCS Paris 849 203 194 · Certified Fair-Trade Silks',
    columns: [
      {
        title: 'The Collections',
        links: [
          { label: 'Silk Outerwear & Trench Coats', href: '/catalog' },
          { label: 'Mongolian Cashmere Knitwear', href: '/catalog' },
          { label: 'Deconstructed Tailoring', href: '/catalog' },
          { label: 'Liquid Silk Eveningwear', href: '/catalog' },
          { label: 'Artisanal Calfskin Bags', href: '/catalog' },
        ],
      },
      {
        title: 'The Maison',
        links: [
          { label: 'Atelier Heritage & Philosophy', href: '/about' },
          { label: 'Sustainable Silk Traceability', href: '/about' },
          { label: 'Paris Salon Appointments', href: '/contact' },
          { label: 'Garment Care & Restoration', href: '/policies/shipping' },
        ],
      },
      {
        title: 'Client Services',
        links: [
          { label: 'White-Glove Global Delivery', href: '/policies/shipping' },
          { label: 'Complimentary Returns & Exchanges', href: '/policies/refund' },
          { label: 'Terms & Conditions of Sale', href: '/policies/terms' },
          { label: 'Privacy & Data Protection', href: '/policies/privacy' },
        ],
      },
    ],
  },
  slots: {
    home: {
      hero: {
        variant: 'editorial_center',
        badge: 'Collection Automne-Hiver 2026 • Paris',
        headline: 'Pure sculptural silhouettes,',
        accentText: 'woven from timeless silks',
        subtitle:
          'Aura Atelier crafts limited-edition garments from bespoke Lyon mulberry silks and Mongolian unbleached cashmere. Designed for effortless grace and permanent longevity.',
        primaryCta: { label: 'Discover The Collection', href: '/catalog' },
        secondaryCta: { label: 'The Maison Heritage', href: '/about' },
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85',
        trustBadges: [
          '100% Hand-Finished in Paris',
          'OEKO-TEX Certified Organic Silk',
          'Complimentary Worldwide White-Glove Delivery',
          'Lifetime Complimentary Alterations',
        ],
      },
      highlights: {
        variant: 'stagger',
        eyebrow: 'Artisanal Pillars',
        title: 'The tenets of mindful Parisian luxury',
        description:
          'We reject disposable seasonal fast fashion in favour of architectural garments that age into cherished heirlooms.',
        items: [
          {
            icon: 'Scissors',
            title: 'Architectural Bias Cutting',
            description:
              'Every silk panel is hand-marked on the 45-degree grain by master pattern cutters, allowing the fabric to naturally contour to the body without rigid seams.',
            badge: 'Savoir-Faire',
            image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Sparkles',
            title: '40-Momme Heavyweight Lyon Silk',
            description:
              'Woven exclusively for Aura Atelier on historic Jacquard looms in Lyon, creating an unmatched liquid drape and substantial tactile weight.',
            badge: 'Materials',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Feather',
            title: 'Unbleached Mongolian Cashmere',
            description:
              'Sourced directly from certified nomadic herders in the Alashan region. Fibers are gently combed, preserving natural lanolin for eternal softness.',
            badge: 'Ethical Sourcing',
            image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      story: {
        eyebrow: 'Maison Philosophy',
        title: 'An antidote to excess: The slow luxury movement',
        description:
          'Rooted in the storied atelier tradition of the 8th arrondissement, Aura Atelier is a sanctuary of deliberate craftsmanship.',
        blocks: [
          {
            heading: 'Small-Batch Numbered Editions',
            body: 'To prevent textile waste and maintain absolute quality control, each Aura Atelier garment is produced in strictly numbered batches of no more than 100 pieces per edition.',
          },
          {
            heading: 'Lifetime Care & Complimentary Alteration',
            body: 'Every purchase includes complimentary atelier fitting and lifetime seam repairs at our Faubourg Saint-Honoré salon, honoring our pledge of generational garment life.',
          },
        ],
        highlights: [
          'Zero synthetic plastic fibers or micro-polyester blends',
          'Biodegradable horn, bone, and mother-of-pearl hardware',
          'Solar-powered Lyon weaving partner facilities',
          'Carbon-neutral express worldwide door-to-door delivery',
        ],
      },
      collection: {
        variant: 'fashion_minimal',
        eyebrow: 'Permanent Edition',
        title: 'The Autumn / Winter 2026 Collection',
        description:
          'Explore core silhouettes available for immediate dispatch or bespoke salon fitting.',
        currency: 'EUR',
        items: fashionCollection,
        categories: ['All', 'Outerwear', 'Tailoring', 'Eveningwear', 'Knitwear', 'Accessories'],
      },
      testimonials: {
        variant: 'infinite_marquee',
        eyebrow: 'Press & Acclaim',
        title: 'Celebrated by Global Critics & Curators',
        description: 'Selected reviews from leading international publications.',
        items: [
          {
            name: 'Camille de Montmartre',
            role: 'Fashion Features Editor',
            company: 'Vogue France',
            text: 'Aura Atelier proves that true modern luxury lies in radical restraint. The 40-momme silk trench has already become an indispensable wardrobe pillar for Paris Fashion Week.',
            rating: 5,
          },
          {
            name: 'Julian Vance',
            role: 'Style Director',
            company: 'Harper’s Bazaar UK',
            text: 'The bias-cut evening slip possesses a liquid fluidity that is practically impossible to find in ready-to-wear today. Uncompromising, gorgeous Parisian tailoring.',
            rating: 5,
          },
          {
            name: 'Sophie Laurent',
            role: 'Senior Curator',
            company: 'Palais Galliera Museum of Fashion',
            text: 'In an era of disposable trend cycles, Aura Atelier restores the dignity of Haute Couture savoir-faire. Masterful pattern cutting and extraordinary raw materials.',
            rating: 5,
          },
        ],
      },
      cta: {
        headline: 'Experience the tactile serenity of pure Parisian silk and cashmere',
        subtitle:
          'Order online for complimentary white-glove international delivery, or reserve a private fitting at our 14 Rue du Faubourg Saint-Honoré salon.',
        primaryCta: { label: 'Shop The New Arrivals', href: '/catalog' },
        secondaryCta: { label: 'Reserve Private Fitting', href: '/contact' },
        guarantee: 'Complimentary 30-day returns and exchanges with prepaid DHL Express courier pickup.',
      },
    },
    about: {
      header: {
        eyebrow: 'The Maison',
        headline: 'A legacy of Parisian savoir-faire, reborn for the conscious era',
        subtitle:
          'Founded at 14 Rue du Faubourg Saint-Honoré, Aura Atelier bridges historical haute couture techniques with sustainable luxury ethics.',
      },
      story: {
        eyebrow: 'Our Origins',
        title: 'Where architectural form meets uncompromised natural fibers',
        description:
          'We believe clothing should be an enduring sanctuary of beauty and comfort.',
        blocks: [
          {
            heading: 'The Sacred Art of the Pattern Cutter',
            body: 'At Aura Atelier, design begins not with a computer render, but on a wooden dressmaker form. Draping heavy silk across the natural bias allows the fabric to dictate its own geometric grace.',
          },
          {
            heading: 'Direct Ethical Partnerships',
            body: 'We eliminate retail middlemen and license fees, partnering directly with heritage family mills in Lyon and Mongolian pastoral cooperatives to ensure 100% fair-wage transparency.',
          },
        ],
        highlights: [
          'All garments assembled in our Paris and Lyon partner ateliers',
          'Complete fiber traceability from pasture to finished silhouette',
          'Certified member of the European Sustainable Textile Federation',
          'Complimentary annual garment refresh service for all registered clients',
        ],
      },
      heritage: {
        eyebrow: 'Maison Chronology',
        title: 'Key milestones in our history',
        description: 'From our founding salon to global international recognition.',
        milestones: [
          {
            year: '2018',
            title: 'Inauguration of the Faubourg Salon',
            description:
              'Aura Atelier opens its doors in the 8th arrondissement of Paris with an initial capsule of 12 bespoke silk evening garments.',
          },
          {
            year: '2021',
            title: 'The Lyon Silk Partnership',
            description:
              'Exclusive long-term contract signed with a 130-year-old French mill to resurrect historic 40-momme heavyweight silk twill weaving.',
          },
          {
            year: '2024',
            title: 'Mongolian Cashmere Direct Sourcing',
            description:
              'Establishment of the Aura Pastoral Fund, ensuring fair pricing and veterinary care for nomadic herding families in the Alashan highlands.',
          },
          {
            year: '2026',
            title: 'Global White-Glove E-Commerce Platform',
            description:
              'Launch of worldwide direct fulfillment with prepaid carbon-neutral logistics and seamless Airwallex-powered currency settlements.',
          },
        ],
      },
      cta: {
        headline: 'Discover the collection in person or online',
        subtitle: 'Visit our Paris salon or enjoy private concierge assistance via video consultation.',
        primaryCta: { label: 'Explore The Garments', href: '/catalog' },
      },
    },
    offerings: {
      header: {
        eyebrow: 'The Wardrobe',
        headline: 'Timeless garments crafted without compromise',
        subtitle:
          'Each piece is crafted in limited numbers from the world’s finest organic silks, unbleached cashmere, and Italian virgin wools.',
      },
      collection: {
        variant: 'fashion_minimal',
        eyebrow: 'Current Collection',
        title: 'Autumn / Winter 2026 Ready-to-Wear',
        description:
          'Select your size and color. All orders include complimentary luxury packaging and gift ribbon.',
        currency: 'EUR',
        items: fashionCollection,
        categories: ['All', 'Outerwear', 'Tailoring', 'Eveningwear', 'Knitwear', 'Accessories'],
      },
      materials: {
        eyebrow: 'Provenance',
        title: 'Material integrity & garment care',
        description:
          'Our commitment to natural fibers ensures that each garment breathes with your body and softens gracefully over decades.',
        blocks: [
          {
            heading: 'Lyon Mulberry Silk Twill',
            body: 'Naturally hypoallergenic and thermoregulating, our 40-momme silk provides natural UV protection and drape that resists creasing.',
          },
          {
            heading: 'Care & Maintenance Instructions',
            body: 'We recommend professional eco-dry cleaning or gentle hand-washing in cool water with specialized pH-neutral silk detergent.',
          },
        ],
      },
      cta: {
        headline: 'Need personal styling or sizing advice?',
        subtitle: 'Our Paris client advisors are available via live video consultation and direct WhatsApp.',
        primaryCta: { label: 'Connect With Stylist', href: '/contact' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Client Concierge',
        headline: 'Visit the Paris Salon or Contact Our Advisors',
        subtitle:
          'For bespoke garment inquiries, private fittings, or order status assistance, our team is at your complete disposal.',
      },
      form: {
        eyebrow: 'Private Salon Inquiry',
        title: 'Schedule a Private Appointment',
        description:
          'We welcome clients for private fittings at 14 Rue du Faubourg Saint-Honoré or bespoke virtual consultations.',
        formVariant: 'standard',
        submitLabel: 'Request Private Salon Booking',
        showDetails: true,
        supportHours: 'Lundi – Samedi, 10:00 – 19:30 (CET)',
        inquiryOptions: [
          'Private Fitting Appointment (Paris Salon)',
          'Virtual Styling & Sizing Consultation',
          'Bespoke Bridal & Red Carpet Commission',
          'Order Status & White-Glove Delivery',
          'Garment Care & Seam Restoration',
        ],
        offices: [
          {
            city: 'Paris Salon & Flagship',
            facility: '14 Rue du Faubourg Saint-Honoré',
            address: '75008 Paris, France',
            role: 'Primary Atelier, Showroom & Private Fitting Suites',
          },
          {
            city: 'Lyon Weaving Studio',
            facility: 'Quai Saint-Antoine',
            address: '69002 Lyon, France',
            role: 'Textile Research & Jacquard Weaving Archives',
          },
        ],
      },
    },
  },
};
