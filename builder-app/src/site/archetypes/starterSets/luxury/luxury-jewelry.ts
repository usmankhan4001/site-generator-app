/**
 * Starter content set — `luxury-jewelry`: Halia — fine jewellery & gemstones.
 * Hand-written. Authentic copy for ethically sourced gold, traceable stones,
 * and bespoke commissions. Uses the luxury (atelier) composition.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

const jewelryPieces = [
  {
    id: 'halia-solitaire-01',
    name: 'The Solitaire Pavé Ring',
    price: 2400,
    priceUnit: ' USD',
    description:
      'A single conflict-free lab-grown diamond set in hand-polished 18k recycled yellow gold, finished with a delicate pavé band that catches light from every angle.',
    category: 'Rings',
    badge: 'Signature',
    popular: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    features: [
      '1.2ct VVS2 / E lab-grown brilliant cut',
      '18k recycled yellow gold, hand-polished',
      'Pavé halo with 34 micro-set stones',
      'Full provenance dossier included',
    ],
  },
  {
    id: 'halia-hoop-02',
    name: 'The Sculpted Gold Hoop',
    price: 1800,
    priceUnit: ' USD',
    description:
      'A substantial sculpted 18k gold hoop with a soft satin face and a hidden safety-hinge closure, balanced to sit beautifully worn singly or stacked.',
    category: 'Earrings',
    badge: 'Best Seller',
    popular: true,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    features: [
      '18k recycled gold, satin-finished',
      'Hidden spring-loaded snap closure',
      '45mm diameter, lightweight hollow core',
      'Hypoallergenic for sensitive ears',
    ],
  },
  {
    id: 'halia-bracelet-03',
    name: 'The Tennis Line Bracelet',
    price: 3900,
    priceUnit: ' USD',
    description:
      'A continuous line of round brilliant diamonds set in a low-profile 18k white gold carrier, engineered to flex naturally with the wrist over decades of wear.',
    category: 'Bracelets',
    badge: 'Heirloom',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
    features: [
      '70 round brilliant diamonds, E-F colour',
      'VVS2 clarity, 4.1 total carat weight',
      '18k white gold articulated setting',
      'Serialized with lifetime warranty',
    ],
  },
  {
    id: 'halia-pendant-04',
    name: 'The Orbed Moon Pendant',
    price: 2200,
    priceUnit: ' USD',
    description:
      'A floating sphere of white gold surrounding a free-moving pearl-like moonstone, suspended on a whisper-fine cable chain.',
    category: 'Necklaces',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    features: [
      '18k gold orb with rotating moonstone',
      'Fine 1mm cable chain, 45cm',
      'Hand-finished rotating mount',
      'Presented in quilted Halia box',
    ],
  },
  {
    id: 'halia-band-05',
    name: 'The Etched Wedding Band',
    price: 900,
    priceUnit: ' USD',
    description:
      'A minimal gold wedding band with a hand-cut diamond guilloché channel — a quiet nod to a lifetime of details.',
    category: 'Rings',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    features: [
      '18k gold, 2.5mm comfort fit',
      'Hand-guillochéd interior channel',
      'Available in yellow, rose, and white',
      'Free engraving on commission',
    ],
  },
];

export const luxuryJewelry: StarterContentSet = {
  id: 'luxury-jewelry-house',
  archetype: 'luxury',
  name: 'Halia',
  description:
    'A fine jewellery atelier crafting ethically sourced, hand-finished gold and diamond pieces — from everyday signatures to once-in-a-lifetime commissions.',
  niche: 'Ethical fine jewellery & gemstones',
  tags: ['fine-jewelry', 'ethical-gold', 'lab-grown-diamond', 'bespoke', 'atelier', 'hand-finished', 'luxury'],
  needsPersonalization: false,
  themeId: 'rose-gold-luxury',
  accent: '#be6474',
  business: {
    name: 'Halia',
    legalName: 'Halia Fine Jewellery Atelier SA',
    shortName: 'Halia',
    registrationNumber: 'CHE-213.540.112',
    jurisdiction: 'Switzerland (Geneva)',
    governingLaw: 'the laws of Switzerland',
    registeredAddress: '12 Rue du Rhône, 1204 Genève, Switzerland',
    email: 'concierge@haliaatelier.example',
    phone: '+41 22 555 0183',
    website: 'haliaatelier.example',
    supportHours: 'Tuesday – Saturday, 09:30 – 18:30 (CET), by appointment',
  },
  brand: { logoText: 'Halia' },
  meta: {
    title: 'Halia — Ethical fine jewellery, hand-finished in Geneva',
    description:
      'Every Halia piece is made from 100% recycled gold and certified lab-grown or traceable stones, crafted by hand in our Geneva atelier and delivered with full provenance.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Geneva Atelier • Recycled Gold • Traceable Gems',
        headline: 'Jewellery with a conscience',
        accentText: 'and a centuries-old craft',
        subtitle:
          'Luxury detail deserves an honest origin. Halia crafts each piece from recycled 18k gold and certified conflict-free stones, finished by hand in Geneva and accompanied by a full provenance dossier.',
        primaryCta: { label: 'Explore the Collection', href: '/catalog' },
        secondaryCta: { label: 'Discover the Atelier', href: '/about' },
        trustBadges: ['100% Recycled Gold', 'Lab-grown & Traceable Stones', 'Hand-Finished in Geneva'],
      },
      highlights: {
        eyebrow: 'Our Promise',
        title: 'Beauty you can trace to its roots',
        description:
          'Responsible luxury means knowing exactly where your piece comes from — every stone, every gram of gold.',
        items: [
          {
            icon: 'Leaf',
            title: 'Responsibly Sourced',
            description:
              'Every stone carries a certificate of origin — lab-grown or traceable mine — and every gram of gold is recycled or audited and traceable to source.',
          },
          {
            icon: 'Flame',
            title: 'Hand-Finished',
            description:
              'Each piece passes through a single jeweller’s hands, with hand-cut pavé, guilloché, and polished mounts that machine work cannot imitate.',
          },
          {
            icon: 'Crown',
            title: 'Heirloom-Intended',
            description:
              'Built to be passed down — free resizing for life, a lifetime warranty, and a buy-back programme that keeps fine metals in circulation.',
          },
          {
            icon: 'Gem',
            title: 'Bespoke Commissions',
            description:
              'From engagement rings to legacy pieces, our atelier accepts a limited number of bespoke commissions each season.',
          },
        ],
      },
      story: {
        eyebrow: 'The Halia Ethos',
        title: 'An atelier built on provenance',
        description:
          'Halia began with a simple conviction: the most luxurious thing a piece of jewellery can carry is a truthful story.',
        blocks: [
          {
            heading: 'Recycled gold, honestly',
            body: 'We refine and reuse certified recycled gold, and for freshly mined metal we publish where it comes from. No opaque supply chains, no unverifiable claims — just a short chain of custody on every piece.',
          },
          {
            heading: 'The craft of one hand',
            body: 'Our Geneva atelier works in small batches. A single jeweller shapes, sets, and finishes each ring so a Halia piece carries the consistent hand of its maker rather than a factory line.',
          },
        ],
        highlights: [
          '100% recycled and audited gold',
          'Fair labour practices certified',
          'Lifetime warranty and resizing',
          'Full provenance dossier with purchase',
        ],
      },
      collection: {
        eyebrow: 'The Permanent Collection',
        title: 'Everyday signatures, made to last',
        description:
          'A curated range of rings, earrings, bracelets, and necklaces in recycled gold with certified stones.',
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Rings', 'Earrings', 'Bracelets', 'Necklaces'],
        items: jewelryPieces,
      },
      testimonials: {
        eyebrow: 'Clients',
        title: 'Worn and remembered',
        items: [
          {
            name: 'Amélie Fortier',
            role: 'Collector',
            location: 'Geneva',
            rating: 5,
            text: 'They took my mother’s old ring and re-set its stones in a design that honours both of us. The provenance book that came with it is a work of art in itself.',
          },
          {
            name: 'James Whitmore',
            role: 'Groom',
            location: 'London',
            rating: 5,
            text: 'I wanted an engagement ring I could be proud of the story behind. The lab-grown diamond and recycled gold are indistinguishable from the old gold I tried — and the price was honest.',
          },
          {
            name: 'Sofia Bregoli',
            role: 'Longtime client',
            location: 'Milan',
            rating: 5,
            text: 'Free resizing for life is not marketing — they actually refitted my rings twice without a pound sterling charged. Rare trust in luxury retail.',
          },
        ],
      },
      cta: {
        headline: 'Find a piece as honest as it is beautiful',
        subtitle:
          'Visit the Geneva atelier by appointment, or browse the collection online and have your piece delivered with its provenance dossier.',
        primaryCta: { label: 'Explore the Collection', href: '/catalog' },
        secondaryCta: { label: 'Book an Appointment', href: '/contact' },
        guarantee: 'Every piece ships with provenance, warranty, and secure insured delivery',
      },
    },
    offerings: {
      header: {
        eyebrow: 'The Full Collection',
        title: 'Rings, earrings, bracelets, and necklaces',
        subtitle:
          'Every Halia piece is made from recycled gold and certified stones, finished by hand in our Geneva atelier and delivered with full provenance.',
      },
      collection: {
        eyebrow: 'Permanent Collection',
        title: 'Browse all pieces',
        description: 'Explore our jewellery range in recycled gold with certified, conflict-free stones.',
        currency: 'USD',
        layout: 'products',
        categories: ['All', 'Rings', 'Earrings', 'Bracelets', 'Necklaces'],
        items: jewelryPieces,
      },
      materials: {
        eyebrow: 'Materials & Craft',
        title: 'What goes into every Halia piece',
        description:
          'We commission only materials we can openly account for.',
        blocks: [
          {
            heading: 'Recycled & audited gold',
            body: '18k yellow, white, and rose gold sourced exclusively from certified recycled and audited suppliers, refined to a controlled, consistent standard.',
          },
          {
            heading: 'Lab-grown & traceable stones',
            body: 'Brilliant lab-grown diamonds and traceable mined gemstones, each cut to brilliance and accompanied by its certificate of origin.',
          },
        ],
      },
      cta: {
        headline: 'Commission a piece with meaning',
        subtitle:
          'Talk with an atelier specialist about a bespoke ring, pendant, or legacy piece crafted to your story.',
        primaryCta: { label: 'Start a Commission', href: '/contact' },
        secondaryCta: { label: 'Browse the Collection', href: '/catalog' },
        guarantee: 'Complementary design consultation with a jeweller',
      },
    },
  },
};

export default luxuryJewelry;