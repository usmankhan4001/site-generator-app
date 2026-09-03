/**
 * Starter content set — `luxury-eyewear`: handcrafted titanium & acetate bespoke eyewear.
 * Authentic copy for bespoke optical frames, Japanese titanium milling, and Mazzucchelli acetate spectacles.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const luxuryEyewear: StarterContentSet = {
  id: 'luxury-eyewear',
  archetype: 'luxury',
  name: 'Bespoke Luxury Eyewear',
  description:
    'Artisanal spectacles and sunglasses crafted from Japanese beta-titanium, cured Mazzucchelli acetate, and hand-beveled mineral glass.',
  niche: 'Bespoke titanium & acetate eyewear',
  tags: ['luxury-eyewear', 'optical', 'sunglasses', 'titanium', 'bespoke', 'acetate', 'craftsmanship'],
  needsPersonalization: false,
  themeId: 'espresso-amber',
  business: {
    name: 'Kroma Bespoke Optical Ltd',
    shortName: 'Kroma Atelier',
    registrationNumber: '14209532',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '28 Chiltern Street, Marylebone, London W1U 7PR, United Kingdom',
    email: 'concierge@kromaatelier.example',
    phone: '+44 20 7486 3190',
    website: 'kromaatelier.example',
    supportHours: 'Tuesday – Saturday, 10:00 – 18:30 (GMT)',
  },
  brand: { logoText: 'Kroma Atelier' },
  meta: {
    title: 'Kroma Atelier — Handcrafted Titanium & Acetate Bespoke Eyewear',
    description:
      'Individually sculpted optical frames and sunglasses crafted in Sabae, Japan and finished in Marylebone, London.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Handcrafted in Sabae, Japan & London',
        headline: 'Sculptural optical design, shaped by',
        accentText: 'pure mechanical restraint',
        subtitle:
          'Kroma creates timeless optical frames forged from high-density Japanese beta-titanium and aged Italian bio-acetate. Precision-machined barrel hinges, diamond-cut filigree, and tailor-fit facial ergonomics.',
        primaryCta: { label: 'Explore the Archive', href: '/catalog' },
        secondaryCta: { label: 'Book Marylebone Fitting', href: '/contact' },
        trustBadges: ['Pure Japanese Titanium', 'Mazzucchelli 1849 Bio-Acetate', 'Carl Zeiss Vision Lenses'],
      },
      highlights: {
        eyebrow: 'Atelier Philosophy',
        title: 'Precision craft without compromise',
        description:
          'Each frame requires over 280 meticulous hand operations across seven months of production.',
        items: [
          {
            icon: 'Glasses',
            title: 'Block Japanese Beta-Titanium',
            description:
              'Precision CNC-milled from solid titanium blocks in Fukui Prefecture, offering featherweight comfort with lifelong structural integrity.',
          },
          {
            icon: 'Sparkles',
            title: 'Cured Bio-Acetate Sheeting',
            description:
              'Aged for twelve months in climate-controlled cellars to eliminate shrinkage, then hand-tumbled in Japanese walnut shell granules for 72 hours.',
          },
          {
            icon: 'Wrench',
            title: 'Custom 7-Barrel Riveted Hinges',
            description:
              'Solid-riveted through the acetate front and temples for permanent alignment that never wobbles or loosens with daily wear.',
          },
          {
            icon: 'Sun',
            title: 'Barberini Mineral Glass Optics',
            description:
              'Tempered mineral glass lenses with eight-layer internal anti-reflective coatings and 100% UV400 hydrophobic treatment.',
          },
        ],
      },
      story: {
        eyebrow: 'The Craft',
        title: 'An obsession with architectural balance',
        description:
          'We design eyewear not as disposable accessories, but as permanent facial architecture.',
        blocks: [
          {
            heading: 'The Masters of Sabae',
            body: 'For over a century, the craftsmen of Sabae in Fukui, Japan have refined the world’s most sophisticated titanium cold-forging techniques. Kroma frames are born in these historic workshops, where master mold-makers shape metal to tolerances measured in hundredths of a millimeter.',
          },
          {
            heading: 'Tailored Facial Ergonomics',
            body: 'Every facial geometry is unique. At our Marylebone atelier, our master opticians customize pantoscopic tilt, bridge vertex distance, and temple wrap to achieve weightless equilibrium.',
          },
        ],
        highlights: [
          'Hand-beveled 8mm acetate front rims',
          'Custom guilloché filigree wire cores visible through translucent temples',
          'Hypoallergenic solid titanium nose pads with laser-etched insignia',
          'Individual serial number engraved inside the left temple core',
        ],
      },
      collection: {
        eyebrow: 'Iconic Editions',
        title: 'The Permanent Collection',
        description:
          'Signature optical and sun silhouettes available in strictly limited quarterly batch releases.',
        currency: 'GBP',
        layout: 'products',
        items: [
          {
            id: 'kroma-fukui-01',
            name: 'The Sovereign Octagon',
            price: 580,
            priceUnit: ' GBP',
            description:
              'Architectural octagonal frame in brushed antique gold beta-titanium with hand-enameled matte black coin-edge rims.',
            category: 'Optical',
            badge: 'Signature Edition',
            popular: true,
            inStock: true,
            features: [
              'Ultralight 14g Weight',
              'Integrated Beta-Titanium Flex Bridges',
              'Zeiss DuraVision BlueProtect Lenses',
              'Hand-stitched Bridle Leather Case',
            ],
          },
          {
            id: 'kroma-sabae-02',
            name: 'Aethelstan Bold Sun',
            price: 640,
            priceUnit: ' GBP',
            description:
              'Substantial 10mm hand-sculpted Havana tortoise bio-acetate with riveted 7-barrel hinges and Barberini green mineral glass.',
            category: 'Sunglasses',
            badge: 'Limited Batch of 100',
            inStock: true,
            features: [
              'Custom Engraved Feather Corewire',
              'Class 3 Polarized Mineral Glass',
              'Oleophobic & Scratch Resistant',
              'Hand-tumbled Gloss Finish',
            ],
          },
          {
            id: 'kroma-london-03',
            name: 'The Chiltern Panto',
            price: 520,
            priceUnit: ' GBP',
            description:
              'Classic 1930s-inspired panto silhouette re-engineered with titanium browline reinforcement and champagne acetate rims.',
            category: 'Optical',
            inStock: true,
            features: [
              'Pure Titanium Nosepads',
              'Double-Pin Riveted Temples',
              'Bespoke Prescription Compatible',
              'Complimentary In-Studio Fitting',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'Client Impressions',
        title: 'Notes from our patrons',
        items: [
          {
            name: 'Jonathan Davies',
            role: 'Architect & Director',
            location: 'London',
            rating: 5,
            text: 'I have worn optical frames for 30 years and have never experienced balance like the Sovereign Octagon. It is as light as a whisper and completely silent on the face.',
          },
          {
            name: 'Camilla Rossi',
            role: 'Creative Director',
            location: 'Milan',
            rating: 5,
            text: 'The depth of the cured acetate is extraordinary. You can immediately feel the weight distribution difference compared to mainstream luxury labels.',
          },
          {
            name: 'Dr. Evelyn Vance',
            role: 'Surgeon',
            location: 'Oxford',
            rating: 5,
            text: 'The Marylebone salon fitting was an absolute masterclass. Precise adjustments, bespoke Zeiss progressive lenses, and exemplary aftercare.',
          },
        ],
      },
      cta: {
        headline: 'Experience the weightless balance of Kroma',
        subtitle:
          'Schedule an optical consultation and personalized frame fitting at our Marylebone boutique or order online with bespoke lens glaze.',
        primaryCta: { label: 'Book Marylebone Fitting', href: '/contact' },
        secondaryCta: { label: 'Browse The Collection', href: '/catalog' },
        guarantee: 'Complimentary worldwide express shipping • Lifetime frame adjustment & ultrasonic cleaning service',
      },
    },
  },
};

export default luxuryEyewear;
