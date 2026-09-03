/**
 * Starter content set — `luxury-leather`: Tuscan artisanal full-grain leather goods.
 * Authentic copy for vegetable-tanned leather bags, saddle stitching, and Florentine leathercraft.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const luxuryLeather: StarterContentSet = {
  id: 'luxury-leather',
  archetype: 'luxury',
  name: 'Tuscan Artisanal Leather',
  description:
    'Full-grain vegetable-tanned leather goods, hand-saddle-stitched holdalls, briefcases, and small leather accessories crafted in Florence.',
  niche: 'Tuscan artisanal full-grain leather goods',
  tags: ['luxury-leather', 'tuscan-leather', 'handcrafted', 'vegetable-tanned', 'leather-goods', 'artisan', 'florence'],
  needsPersonalization: false,
  themeId: 'espresso-amber',
  business: {
    name: 'Pelletteria Valdarno S.r.l.',
    shortName: 'Valdarno Firenze',
    registrationNumber: 'IT06849200481',
    jurisdiction: 'Florence, Italy (Camera di Commercio di Firenze)',
    governingLaw: 'the laws of the Republic of Italy',
    registeredAddress: "Via de' Tornabuoni 18, 50123 Firenze FI, Italy",
    email: 'atelier@valdarnofirenze.example',
    phone: '+39 055 289 4120',
    website: 'valdarnofirenze.example',
    supportHours: 'Monday – Saturday, 09:30 – 19:30 (CET)',
  },
  brand: { logoText: 'Valdarno Firenze' },
  meta: {
    title: 'Valdarno Firenze — Artisanal Tuscan Full-Grain Leather Goods',
    description:
      'Handcrafted vegetable-tanned Italian leather briefcases, travel holdalls, and bespoke accessories sculpted by master leather artisans in Tuscany.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Santa Croce sull’Arno • Cuoio al Vegetale',
        headline: 'Authentic Tuscan leathercraft,',
        accentText: 'patinated by time',
        subtitle:
          'Valdarno creates heirloom travel bags, document cases, and accessories sculpted from natural vegetable-tanned calfskin. Hand-burnished edges, traditional two-needle saddle stitching, and solid brass hardware.',
        primaryCta: { label: 'Discover The Atelier', href: '/catalog' },
        secondaryCta: { label: 'Private Leather Commission', href: '/contact' },
        trustBadges: ['Consorzio Vera Pelle Italiana', '100% Vegetable Tanned', 'Guaranteed For Life'],
      },
      highlights: {
        eyebrow: 'Artisanal Standards',
        title: 'Heirloom construction methods',
        description:
          'We practice the pure Florentine leatherworking tradition that synthetic mass production cannot duplicate.',
        items: [
          {
            icon: 'Feather',
            title: 'Full-Grain Tuscan Vacchetta',
            description:
              'Tanned with natural chestnut and mimosa tannins over sixty days in Santa Croce drum vats, producing rich organic aromas and a living patina.',
          },
          {
            icon: 'Scissors',
            title: 'Hand Saddle Stitching',
            description:
              'Sewn with dual blunt needles and waxed linen thread using a stitching pony — creating independent knots that cannot unravel even if a stitch wears.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Solid Sand-Cast Brass Hardware',
            description:
              'Custom buckles, clasps, and RiRi M8 zippers forged from solid brass ingots, finished without chemical plating to age gracefully with the hide.',
          },
          {
            icon: 'Sparkles',
            title: 'Hand-Beveled Beeswax Edges',
            description:
              'Edges are rounded by hand with edge-planes, dyed with organic pigments, and friction-burnished with natural Tuscan beeswax.',
          },
        ],
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'Rooted along the banks of the Arno',
        description:
          'Since 1974, our master pellettieri have transformed raw hides into timeless companions that grow more beautiful with every journey.',
        blocks: [
          {
            heading: 'The Ancient Art of Vegetable Tanning',
            body: 'Unlike modern chrome-tanning which relies on toxic heavy metals, our leather is cured using tree barks, oak extracts, and natural oils. This centuries-old Tuscan discipline respects the environment and allows the hide to breathe, soften, and develop a rich cognac luster over decades of handling.',
          },
          {
            heading: 'No Synthetic Linings or Hidden Cardboard',
            body: 'Mass-market luxury often conceals cheap cardboard reinforcers behind polyester linings. Valdarno bags are unlined or lined exclusively with velvety suede and full-grain pigskin, ensuring structure that never sags, collapses, or degrades.',
          },
        ],
        highlights: [
          'Certified by the Genuine Italian Vegetable-Tanned Leather Consortium',
          'Single-artisan assembly from raw hide selection to final edge polishing',
          'Solid copper rivets peened by hand at all high-stress strain points',
          'Personalized hot-foil monogramming available on all luggage pieces',
        ],
      },
      collection: {
        eyebrow: 'Signature Pieces',
        title: 'The Florentine Archive',
        description:
          'Limited batch productions crafted with the finest cuts of Tuscan shoulder and butt grain.',
        currency: 'EUR',
        layout: 'products',
        items: [
          {
            id: 'val-weekender-01',
            name: 'Il Grande Viaggiatore Holdall (50cm)',
            price: 1250,
            priceUnit: ' EUR',
            description:
              'Spacious weekender duffle in 2.2mm hand-waxed dark chestnut Vacchetta with reinforced double bottom and detachable shoulder harness.',
            category: 'Travel Luggage',
            badge: 'Flagship Edition',
            popular: true,
            inStock: true,
            features: [
              'Solid Brass RiRi #10 Dual Zippers',
              'Internal Waterproof Boot Compartment',
              'Cabin Baggage Approved Dimensions',
              'Complimentary Custom Luggage Tag',
            ],
          },
          {
            id: 'val-briefcase-02',
            name: 'Cartella Diplomatica Double Gusset',
            price: 980,
            priceUnit: ' EUR',
            description:
              'Rigid document briefcase with solid brass English lock, structured top handle, and dual compartments tailored for a 16-inch laptop.',
            category: 'Briefcases',
            badge: 'Artisan Choice',
            inStock: true,
            features: [
              'Pigskin Suede Lined Interior',
              'Reinforced Spine Arch Structure',
              'Key Clochette & Monogram Patch',
              'Lifetime Hardware Warranty',
            ],
          },
          {
            id: 'val-folio-03',
            name: 'Portadocumenti Zip-Around Folio',
            price: 340,
            priceUnit: ' EUR',
            description:
              'A4 executive zip folio with interior pen loop, business card slots, and expandable tablet sleeve in saddle tan leather.',
            category: 'Small Leather Goods',
            inStock: true,
            features: [
              'Smooth Gliding Swiss Brass Zip',
              'Raw Edge Burnished with Beeswax',
              'Accommodates Legal Pad & iPad Pro',
              'Arrives in Canvas Dustbag & Box',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'Patron Reviews',
        title: 'Heirloom stories from around the globe',
        items: [
          {
            name: 'Lorenzo Moretti',
            role: 'Managing Director',
            location: 'Milan',
            rating: 5,
            text: 'I have carried the Cartella Diplomatica across fifty international flights this year. The leather has taken on a rich amber patina that commands respect in every boardroom.',
          },
          {
            name: 'Giselle Dupont',
            role: 'Creative Consultant',
            location: 'Paris',
            rating: 5,
            text: 'The smell of real vegetable-tanned leather when you open the box is intoxicating. The saddle stitching is perfectly straight and the weight of the brass buckles is astonishing.',
          },
          {
            name: 'Marcus Sterling',
            role: 'Architect',
            location: 'Boston',
            rating: 5,
            text: 'A genuine heirloom. You can tell this holdall was made by someone who cares deeply about their craft. Worth every single cent.',
          },
        ],
      },
      cta: {
        headline: 'Carry a piece of living Italian history',
        subtitle:
          'Explore our ready-to-ship archival pieces or commission a customized hide selection with personalized debossing.',
        primaryCta: { label: 'Explore The Collection', href: '/catalog' },
        secondaryCta: { label: 'Inquire About Monogramming', href: '/contact' },
        guarantee: 'Complimentary insured worldwide courier delivery • Lifetime repair guarantee on all stitching and hardware',
      },
    },
  },
};

export default luxuryLeather;
