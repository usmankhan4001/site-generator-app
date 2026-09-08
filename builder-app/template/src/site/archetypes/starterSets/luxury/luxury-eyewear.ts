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
        categories: ['Optical', 'Sunglasses', 'Bespoke Editions'],
        items: [
          {
            id: 'kroma-aviator-titanium-01',
            name: 'The Aviator Beta-Titanium Polarized',
            price: 590,
            priceUnit: ' GBP',
            description:
              'Precision CNC-machined beta-titanium aviator silhouette fitted with Barberini tempered polarized mineral glass lenses.',
            category: 'Sunglasses',
            badge: 'Best Seller',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
            features: [
              'CNC-Milled Block Beta-Titanium',
              'Barberini Polarized Mineral Glass',
              'Hypoallergenic Titanium Nosepads',
              'Micro-Ribbed Bridge Architecture',
            ],
          },
          {
            id: 'kroma-artisan-acetate-02',
            name: 'The Artisan Hand-Polished Japanese Acetate',
            price: 540,
            priceUnit: ' GBP',
            description:
              'Substantial 10mm cured Takiron bio-acetate tumbled for 72 hours in Japanese walnut shell granules for lustrous depth.',
            category: 'Optical',
            badge: 'Atelier Classic',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
            features: [
              '10mm Cured Takiron Bio-Acetate',
              '72-Hour Hand Walnut-Tumbled Polish',
              'Riveted 7-Barrel German Hinges',
              'Custom Guilloché Corewire',
            ],
          },
          {
            id: 'kroma-pilot-gold-03',
            name: 'The Pilot 24k Gold-Plated Sunframe',
            price: 780,
            priceUnit: ' GBP',
            description:
              'Heirloom double-bridge pilot frame ion-plated in 5-micron 24k yellow gold with Zeiss gradient bronze sun optics.',
            category: 'Sunglasses',
            badge: 'Limited Edition',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
            features: [
              '5-Micron 24k Gold Ion Plating',
              'Teardrop Aviator Double-Bridge',
              'Zeiss Gradient Bronze Sun Optics',
              'Engraved Serial Number on Inner Core',
            ],
          },
          {
            id: 'kroma-sculptural-square-04',
            name: 'The Sculptural Bold Square Optical',
            price: 560,
            priceUnit: ' GBP',
            description:
              'Architectural square frame featuring 8mm beveled outer facets and a chiseled keyhole bridge in obsidian black acetate.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
            features: [
              'Architectural Beveled Facets (8mm)',
              'Hand-Chiseled Keyhole Bridge',
              'Anti-Reflective Blue-Light Ready',
              'Saddle Tan Leather Hard Case Included',
            ],
          },
          {
            id: 'kroma-wire-rimless-05',
            name: 'The Minimalist Wire Rimless Titanium',
            price: 620,
            priceUnit: ' GBP',
            description:
              'Featherlight tension-mounted rimless frame weighing under 10 grams, custom-cut to the wearer’s bespoke facial proportions.',
            category: 'Optical',
            badge: 'Ultralight 9.8g',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
            features: [
              'Featherlight Pure Titanium Tension Wire',
              'Compression-Mounted Rimless Glazing',
              'Custom Lens Profile Tailoring',
              'Ergonomic Silicone Temple Tips',
            ],
          },
          {
            id: 'kroma-hexagonal-gradient-06',
            name: 'The Hexagonal Gradient Lens Sunglasses',
            price: 610,
            priceUnit: ' GBP',
            description:
              'Geometric six-point titanium frame with coin-edge filigree rim engraving and Barberini dual-tone sage-to-amber mineral glass.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
            features: [
              'Geometric 6-Point Forged Titanium Rim',
              'Barberini Sage-to-Amber Gradient Glass',
              'Coin-Edge Laser Guilloché Rim Detail',
              '100% UV400 Hydrophobic Coating',
            ],
          },
          {
            id: 'kroma-heritage-round-07',
            name: 'The Heritage Round Keyhole Bridge',
            price: 510,
            priceUnit: ' GBP',
            description:
              'Classic 1920s intellectual circular silhouette handcrafted in rich Havana tortoiseshell bio-acetate with double-pin hinge rivets.',
            category: 'Optical',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
            features: [
              'Vintage 1920s Round Silhouette',
              'Deep Havana Tortoiseshell Acetate',
              'Pinned Shield Rivets on Temples',
              'Custom Lens Cut for Prescriptions',
            ],
          },
          {
            id: 'kroma-cateye-beveled-08',
            name: 'The Cat-Eye Beveled Acetate Sunframe',
            price: 580,
            priceUnit: ' GBP',
            description:
              'Dramatic upswept cat-eye geometry with razor-sharp beveled browlines and smoke grey Barberini anti-glare sun lenses.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80',
            features: [
              'Upswept Sculptural Crown Lines',
              'Midnight Onyx Polished Bio-Acetate',
              'Smoke Grey Zeiss Lenses',
              '5-Barrel Integrated Hinge System',
            ],
          },
          {
            id: 'kroma-pure-reader-09',
            name: 'The Featherlight Pure Titanium Reader',
            price: 490,
            priceUnit: ' GBP',
            description:
              'Understated reading frame forged from flexible Sabae beta-titanium with anatomical zero-pressure bridge distribution.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
            features: [
              'Flexible Sabae Beta-Titanium Arms',
              'Zero-Pressure Anatomical Bridge',
              'Anti-Fatigue Prescription Ready',
              'Ultra-Compact Leather Sleeve',
            ],
          },
          {
            id: 'kroma-doublebridge-geo-10',
            name: 'The Double-Bridge Geometric Sunglass',
            price: 670,
            priceUnit: ' GBP',
            description:
              'Architectural frame combining dual browline bridges with matte gunmetal titanium and polarized G-15 military olive lenses.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
            features: [
              'Dual Structural Browline Bridges',
              'Industrial Matte Gunmetal Titanium',
              'Polarized G-15 Olive Lenses',
              'Laser-Etched Diamond Knurling',
            ],
          },
          {
            id: 'kroma-matte-horn-11',
            name: 'The Matte Horn Vintage Silhouette',
            price: 850,
            priceUnit: ' GBP',
            badge: 'Limited Bespoke',
            description:
              'Ultra-luxury frame incorporating genuine organic water buffalo horn inlays set within brushed platinum-finished titanium chassis.',
            category: 'Bespoke Editions',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80',
            features: [
              'Organic Genuine Water Buffalo Horn Inlay',
              'Brushed Platinum-Finish Titanium Core',
              'Hand-Buffed Satin Finish',
              'Bespoke Facial Fit Calibration',
            ],
          },
          {
            id: 'kroma-amber-tortoise-12',
            name: 'The Amber Tortoiseshell Optical',
            price: 530,
            priceUnit: ' GBP',
            description:
              'Aged 12-month Mazzucchelli amber fleck bio-acetate in a balanced panto silhouette with internal hand-engraved foliage corewire.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=800&q=80',
            features: [
              'Aged 12-Month Mazzucchelli Amber Fleck',
              'Panto Geometry with Modern Chamfer',
              'Titanium Corewire with Engraved Foliage',
              'Hand-Fitted Marylebone Glaze',
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
            text: 'I have worn optical frames for 30 years and have never experienced balance like the Aviator Beta-Titanium. It is as light as a whisper and completely silent on the face.',
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
    offerings: {
      header: {
        eyebrow: 'Sabae & London Ateliers',
        title: 'Bespoke Eyewear Archive',
        subtitle:
          'Handcrafted Japanese beta-titanium and Italian bio-acetate frames, glazed to your exact optical prescription.',
      },
      collection: {
        eyebrow: 'Bespoke Frame Archive',
        title: 'Handcrafted Eyewear Collection',
        description:
          'Explore our full portfolio of precision titanium opticals, cured acetate silhouettes, and limited bespoke horn frames.',
        currency: 'GBP',
        layout: 'products',
        categories: ['Optical', 'Sunglasses', 'Bespoke Editions'],
        items: [
          {
            id: 'kroma-aviator-titanium-01',
            name: 'The Aviator Beta-Titanium Polarized',
            price: 590,
            priceUnit: ' GBP',
            description:
              'Precision CNC-machined beta-titanium aviator silhouette fitted with Barberini tempered polarized mineral glass lenses.',
            category: 'Sunglasses',
            badge: 'Best Seller',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
            features: [
              'CNC-Milled Block Beta-Titanium',
              'Barberini Polarized Mineral Glass',
              'Hypoallergenic Titanium Nosepads',
              'Micro-Ribbed Bridge Architecture',
            ],
          },
          {
            id: 'kroma-artisan-acetate-02',
            name: 'The Artisan Hand-Polished Japanese Acetate',
            price: 540,
            priceUnit: ' GBP',
            description:
              'Substantial 10mm cured Takiron bio-acetate tumbled for 72 hours in Japanese walnut shell granules for lustrous depth.',
            category: 'Optical',
            badge: 'Atelier Classic',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
            features: [
              '10mm Cured Takiron Bio-Acetate',
              '72-Hour Hand Walnut-Tumbled Polish',
              'Riveted 7-Barrel German Hinges',
              'Custom Guilloché Corewire',
            ],
          },
          {
            id: 'kroma-pilot-gold-03',
            name: 'The Pilot 24k Gold-Plated Sunframe',
            price: 780,
            priceUnit: ' GBP',
            description:
              'Heirloom double-bridge pilot frame ion-plated in 5-micron 24k yellow gold with Zeiss gradient bronze sun optics.',
            category: 'Sunglasses',
            badge: 'Limited Edition',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
            features: [
              '5-Micron 24k Gold Ion Plating',
              'Teardrop Aviator Double-Bridge',
              'Zeiss Gradient Bronze Sun Optics',
              'Engraved Serial Number on Inner Core',
            ],
          },
          {
            id: 'kroma-sculptural-square-04',
            name: 'The Sculptural Bold Square Optical',
            price: 560,
            priceUnit: ' GBP',
            description:
              'Architectural square frame featuring 8mm beveled outer facets and a chiseled keyhole bridge in obsidian black acetate.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
            features: [
              'Architectural Beveled Facets (8mm)',
              'Hand-Chiseled Keyhole Bridge',
              'Anti-Reflective Blue-Light Ready',
              'Saddle Tan Leather Hard Case Included',
            ],
          },
          {
            id: 'kroma-wire-rimless-05',
            name: 'The Minimalist Wire Rimless Titanium',
            price: 620,
            priceUnit: ' GBP',
            description:
              'Featherlight tension-mounted rimless frame weighing under 10 grams, custom-cut to the wearer’s bespoke facial proportions.',
            category: 'Optical',
            badge: 'Ultralight 9.8g',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80',
            features: [
              'Featherlight Pure Titanium Tension Wire',
              'Compression-Mounted Rimless Glazing',
              'Custom Lens Profile Tailoring',
              'Ergonomic Silicone Temple Tips',
            ],
          },
          {
            id: 'kroma-hexagonal-gradient-06',
            name: 'The Hexagonal Gradient Lens Sunglasses',
            price: 610,
            priceUnit: ' GBP',
            description:
              'Geometric six-point titanium frame with coin-edge filigree rim engraving and Barberini dual-tone sage-to-amber mineral glass.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
            features: [
              'Geometric 6-Point Forged Titanium Rim',
              'Barberini Sage-to-Amber Gradient Glass',
              'Coin-Edge Laser Guilloché Rim Detail',
              '100% UV400 Hydrophobic Coating',
            ],
          },
          {
            id: 'kroma-heritage-round-07',
            name: 'The Heritage Round Keyhole Bridge',
            price: 510,
            priceUnit: ' GBP',
            description:
              'Classic 1920s intellectual circular silhouette handcrafted in rich Havana tortoiseshell bio-acetate with double-pin hinge rivets.',
            category: 'Optical',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
            features: [
              'Vintage 1920s Round Silhouette',
              'Deep Havana Tortoiseshell Acetate',
              'Pinned Shield Rivets on Temples',
              'Custom Lens Cut for Prescriptions',
            ],
          },
          {
            id: 'kroma-cateye-beveled-08',
            name: 'The Cat-Eye Beveled Acetate Sunframe',
            price: 580,
            priceUnit: ' GBP',
            description:
              'Dramatic upswept cat-eye geometry with razor-sharp beveled browlines and smoke grey Barberini anti-glare sun lenses.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=800&q=80',
            features: [
              'Upswept Sculptural Crown Lines',
              'Midnight Onyx Polished Bio-Acetate',
              'Smoke Grey Zeiss Lenses',
              '5-Barrel Integrated Hinge System',
            ],
          },
          {
            id: 'kroma-pure-reader-09',
            name: 'The Featherlight Pure Titanium Reader',
            price: 490,
            priceUnit: ' GBP',
            description:
              'Understated reading frame forged from flexible Sabae beta-titanium with anatomical zero-pressure bridge distribution.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
            features: [
              'Flexible Sabae Beta-Titanium Arms',
              'Zero-Pressure Anatomical Bridge',
              'Anti-Fatigue Prescription Ready',
              'Ultra-Compact Leather Sleeve',
            ],
          },
          {
            id: 'kroma-doublebridge-geo-10',
            name: 'The Double-Bridge Geometric Sunglass',
            price: 670,
            priceUnit: ' GBP',
            description:
              'Architectural frame combining dual browline bridges with matte gunmetal titanium and polarized G-15 military olive lenses.',
            category: 'Sunglasses',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
            features: [
              'Dual Structural Browline Bridges',
              'Industrial Matte Gunmetal Titanium',
              'Polarized G-15 Olive Lenses',
              'Laser-Etched Diamond Knurling',
            ],
          },
          {
            id: 'kroma-matte-horn-11',
            name: 'The Matte Horn Vintage Silhouette',
            price: 850,
            priceUnit: ' GBP',
            badge: 'Limited Bespoke',
            description:
              'Ultra-luxury frame incorporating genuine organic water buffalo horn inlays set within brushed platinum-finished titanium chassis.',
            category: 'Bespoke Editions',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=800&q=80',
            features: [
              'Organic Genuine Water Buffalo Horn Inlay',
              'Brushed Platinum-Finish Titanium Core',
              'Hand-Buffed Satin Finish',
              'Bespoke Facial Fit Calibration',
            ],
          },
          {
            id: 'kroma-amber-tortoise-12',
            name: 'The Amber Tortoiseshell Optical',
            price: 530,
            priceUnit: ' GBP',
            description:
              'Aged 12-month Mazzucchelli amber fleck bio-acetate in a balanced panto silhouette with internal hand-engraved foliage corewire.',
            category: 'Optical',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=800&q=80',
            features: [
              'Aged 12-Month Mazzucchelli Amber Fleck',
              'Panto Geometry with Modern Chamfer',
              'Titanium Corewire with Engraved Foliage',
              'Hand-Fitted Marylebone Glaze',
            ],
          },
        ],
      },
      materials: {
        eyebrow: 'Precision Engineering',
        title: 'The metallurgy of Sabae & Italian bio-polymers',
        description:
          'Every component is selected for hypoallergenic purity, tactile balance, and lifelong durability.',
        blocks: [
          {
            heading: 'Fukui Cold-Forged Beta-Titanium',
            body: 'Milled from high-purity Japanese titanium ingots, offering unmatched flexibility and strength at one-third the weight of stainless steel.',
          },
          {
            heading: 'Aged Mazzucchelli Bio-Acetate',
            body: 'Plant-derived cellulose acetate aged for twelve months in temperature-controlled drying vaults to prevent warping over decades of wear.',
          },
        ],
      },
      cta: {
        headline: 'Commission your bespoke frame fitting',
        subtitle:
          'Visit our Marylebone studio for facial geometry mapping or order online with custom optical prescription glazing.',
        primaryCta: { label: 'Book Salon Fitting', href: '/contact' },
        secondaryCta: { label: 'Return to Atelier Home', href: '/' },
        guarantee: 'Complimentary international delivery • Lifetime hinge tuning & frame ultrasonic restoration',
      },
    },
  },
};

export default luxuryEyewear;
