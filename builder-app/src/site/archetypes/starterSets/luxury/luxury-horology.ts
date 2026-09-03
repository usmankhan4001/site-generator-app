/**
 * Starter content set — `luxury-horology`: haute horlogerie & precision mechanical timepieces.
 * Authentic copy for handcrafted mechanical complications, chronometers, and heritage horology.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const luxuryHorology: StarterContentSet = {
  id: 'luxury-horology',
  archetype: 'luxury',
  name: 'Haute Horlogerie',
  description:
    'Handcrafted mechanical timepieces, in-house tourbillons, and chronometric masterworks manufactured in the Vallée de Joux.',
  niche: 'Haute horlogerie & precision timepieces',
  tags: ['horology', 'luxury-watches', 'chronometer', 'swiss-made', 'mechanical', 'timepieces', 'craftsmanship'],
  needsPersonalization: false,
  themeId: 'monochrome-atelier',
  business: {
    name: 'Vanguard Horlogerie SA',
    shortName: 'Vanguard Genève',
    registrationNumber: 'CHE-382.910.451',
    jurisdiction: 'Geneva, Switzerland (Registre du Commerce)',
    governingLaw: 'the laws of Switzerland (Canton de Genève)',
    registeredAddress: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    email: 'concierge@vanguardhorlogerie.example',
    phone: '+41 22 819 9200',
    website: 'vanguardhorlogerie.example',
    supportHours: 'Monday – Saturday, 10:00 – 19:00 (CET)',
  },
  brand: { logoText: 'Vanguard Genève' },
  meta: {
    title: 'Vanguard Genève — Masterworks of Haute Horlogerie',
    description:
      'Discover handcrafted Swiss mechanical chronometers, flying tourbillons, and grand complications finished to the Poinçon de Genève standard.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Vallée de Joux • Manufacture Horlogère',
        headline: 'Timeless mechanical mastery,',
        accentText: 'engineered for eternity',
        subtitle:
          'Each Vanguard chronometer is hand-assembled over nine months by a single master watchmaker. Pure sapphire crystal, hand-chamfered bridges, and proprietary in-house calibres.',
        primaryCta: { label: 'Explore the Calibres', href: '/catalog' },
        secondaryCta: { label: 'Private Salon Appointment', href: '/contact' },
        trustBadges: ['Poinçon de Genève Certified', 'COSC Chronometer Rated', '5-Year International Warranty'],
      },
      highlights: {
        eyebrow: 'Artisanal Pillars',
        title: 'The pillars of Haute Horlogerie',
        description:
          'Uncompromising dedication to micro-mechanical engineering and decorative finishing traditions established in 1892.',
        items: [
          {
            icon: 'Watch',
            title: '100% In-House Manufacture Calibres',
            description:
              'Every escapement, balance spring, and gear train is cast, machined, and hand-regulated in our Le Brassus atelier.',
          },
          {
            icon: 'Sparkles',
            title: 'Anglage & Côtes de Genève',
            description:
              'Every internal angle is mirror-polished by hand using gentian wood pegs and diamond paste for luminous depth.',
          },
          {
            icon: 'Shield',
            title: 'Grade 5 Titanium & 18k Rose Gold',
            description:
              'Cases forged from aerospace-grade titanium and ethically sourced Fairmined precious metals with 100m water resistance.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Chronometric Precision Testing',
            description:
              'Subjected to a rigorous 21-day observatory chronometry protocol across six positions and three temperature variations.',
          },
        ],
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'Three centuries of horological devotion',
        description:
          'Born in the high Swiss Jura mountains, Vanguard carries forward the sacred art of independent hand watchmaking.',
        blocks: [
          {
            heading: 'The Sanctity of the Solitary Watchmaker',
            body: 'Unlike mass-industrialized production lines, every Vanguard timepiece is entrusted to a single master horologist from initial jewel seating to final casing. This intimate relationship between artisan and object imbues each piece with an unrepeatable soul.',
          },
          {
            heading: 'Preserving Disappearing Metiers d’Art',
            body: 'From grand feu enamelling to hand-turned guilloché rose engines dating back to 1912, we actively train the next generation of Swiss artisans to keep horology’s rarest decorative crafts alive.',
          },
        ],
        highlights: [
          'Hand-finished balance bridges with 32 interior angles',
          'Free-sprung variable inertia balance wheels beating at 28,800 vph',
          'Twin barrels providing a genuine 72-hour power reserve',
          'Numbered and signed certificate of origin by the founding watchmaker',
        ],
      },
      collection: {
        eyebrow: 'Current Atelier Editions',
        title: 'The Vanguard Collection',
        description:
          'Limited annual production strictly capped at 250 individually numbered pieces worldwide.',
        currency: 'CHF',
        layout: 'products',
        categories: ['Chronograph', 'Grand Complication', 'GMT & Diver', 'Skeleton', 'Dress & Heritage', 'Complications'],
        items: [
          {
            id: 'vg-chrono-flyback-01',
            name: 'Chronograph Flyback 41mm Titanium',
            price: 26500,
            priceUnit: ' CHF',
            description:
              'High-frequency flyback column-wheel chronograph cased in ultra-light Grade 5 titanium with sapphire exhibition caseback.',
            category: 'Chronograph',
            badge: 'New Release',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
            features: [
              'Calibre VG-7120 Flyback Column Wheel',
              'Grade 5 Satin Titanium (41mm)',
              '65-Hour Power Reserve',
              'Box-Domed Sapphire Crystal',
            ],
          },
          {
            id: 'vg-tourbillon-complication-02',
            name: 'Tourbillon Grand Complication Rose Gold',
            price: 89000,
            priceUnit: ' CHF',
            description:
              'Flying 60-second tourbillon with monopusher chronograph in 18k rose gold. Hand-engraved openwork dial with black-polished carriage.',
            category: 'Grand Complication',
            badge: 'Atelier Flagship',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215649907-b51d8accb1ec?auto=format&fit=crop&w=800&q=80',
            features: [
              'Flying 60-Second In-House Tourbillon',
              'Solid 18k Rose Gold Case (42mm)',
              'Hand-Angled Bridges (36 Internal Angles)',
              'Alligator Strap with Deployant Clasp',
            ],
          },
          {
            id: 'vg-gmt-diver-03',
            name: 'GMT Dual-Time Diver 300m',
            price: 19800,
            priceUnit: ' CHF',
            description:
              'Dual-timezone chronometer engineered for deep ocean saturation diving with ceramic 24-hour bezel and helium escape valve.',
            category: 'GMT & Diver',
            badge: 'ISO 6425 Certified',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
            features: [
              'Dual-Time 24h GMT Complication',
              '300m Water Resistance with Helium Valve',
              'Ceramic Bi-Directional 24h Bezel',
              'Super-LumiNova BGW9 Luminescence',
            ],
          },
          {
            id: 'vg-skeleton-ultrathin-04',
            name: 'Skeleton Ultra-Thin Hand-Wound 39mm',
            price: 38400,
            priceUnit: ' CHF',
            description:
              'Masterpiece of micro-mechanical transparency featuring an ultra-slim 2.85mm movement with hand-chamfered anthracite bridges.',
            category: 'Skeleton',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215650201-8d552591218d?auto=format&fit=crop&w=800&q=80',
            features: [
              'Calibre VG-1002 Manual (2.85mm Thick)',
              'Openworked Anthracite Bridges',
              '18k White Gold Case (39mm)',
              '50-Hour Power Reserve',
            ],
          },
          {
            id: 'vg-perpetual-moonphase-05',
            name: 'Perpetual Calendar Moonphase Platinum',
            price: 115000,
            priceUnit: ' CHF',
            description:
              'Secular perpetual calendar accurate to the year 2499, adorned with a fired grand feu lapis lazuli astronomical moonphase disc.',
            category: 'Grand Complication',
            badge: 'Limited Edition of 10',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            features: [
              'Secular Perpetual Calendar to Year 2499',
              'Grand Feu Lapis Lazuli Moonphase Disk',
              '950 Platinum Hand-Finished Case',
              'Poinçon de Genève Certified',
            ],
          },
          {
            id: 'vg-sector-chronometer-06',
            name: 'Sector Dial Heritage Chronometer',
            price: 16900,
            priceUnit: ' CHF',
            description:
              'Purist mid-century scientific sector dial with hand-blued feuille hands, Breguet overcoil balance spring, and chronometric rating.',
            category: 'Dress & Heritage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
            features: [
              'Two-Tone Silver Sector Dial',
              'Free-Sprung Breguet Overcoil Balance',
              'Stainless Steel 38.5mm Step Case',
              'COSC Observatory Chronometer Rating',
            ],
          },
          {
            id: 'vg-monopusher-chrono-07',
            name: 'Monopusher Column-Wheel Chronograph',
            price: 29200,
            priceUnit: ' CHF',
            description:
              'Classical single-pusher chronograph integrated into the winding crown, operating a lateral clutch and column-wheel mechanism.',
            category: 'Chronograph',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
            features: [
              'Single-Button Coaxial Crown Actuator',
              'Horizontal Clutch Lateral Transmission',
              'Enamel Dial with Hand-Blued Hands',
              'Fairmined 18k Yellow Gold Case',
            ],
          },
          {
            id: 'vg-ocean-submersible-08',
            name: 'Ceramic Bezel Deep Ocean Submersible',
            price: 21500,
            priceUnit: ' CHF',
            description:
              'Built for extreme ocean depths up to 1,000 meters, forged in matte black zirconia ceramic with automatic helium discharge.',
            category: 'GMT & Diver',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
            features: [
              'Matte Black Zirconia Ceramic Case (43mm)',
              '1,000m Deep-Dive Waterproofing',
              'Automatic Helium Release Valve',
              'Integrated Vulcanized FKM Rubber Strap',
            ],
          },
          {
            id: 'vg-guilloche-dress-09',
            name: 'Guilloché Dial Dress Watch White Gold',
            price: 32000,
            priceUnit: ' CHF',
            description:
              'Traditional hand-turned Clous de Paris rose engine dial paired with solid 18k white gold case and micro-rotor automatic calibre.',
            category: 'Dress & Heritage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=800&q=80',
            features: [
              'Hand-Turned Clous de Paris Rose Engine Dial',
              '18k White Gold Case (38mm)',
              'In-House Calibre VG-5000 Micro-Rotor',
              'Hand-Rolled Mississippi Alligator',
            ],
          },
          {
            id: 'vg-regulator-automatic-10',
            name: 'Regulator Display Automatic Leather Strap',
            price: 24800,
            priceUnit: ' CHF',
            description:
              'Historic clockmaker regulator layout with decoupled hour and minute indications for absolute chronometric reading accuracy.',
            category: 'Complications',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
            features: [
              'Decoupled Master Regulator Architecture',
              'Central Minutes with Sub-Hour & Sub-Seconds',
              '22k Solid Gold Oscillating Weight',
              'Hand-Patinated Cordovan Strap',
            ],
          },
          {
            id: 'vg-pilot-antimagnetic-11',
            name: 'Pilot Chronograph Anti-Magnetic',
            price: 22900,
            priceUnit: ' CHF',
            description:
              'Aviation instrument chronometer protected against intense magnetic fields up to 80,000 A/m by an internal soft-iron Faraday cage.',
            category: 'Chronograph',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
            features: [
              'Soft-Iron Faraday Inner Cage (80,000 A/m)',
              'High-Contrast Matte Black Flight Dial',
              'Bi-Compax 30-Minute Counter',
              'Titanium Grade 5 Ergonomic Case (41.5mm)',
            ],
          },
          {
            id: 'vg-minute-repeater-12',
            name: 'Minute Repeater Enamel Dial',
            price: 165000,
            priceUnit: ' CHF',
            badge: 'Piece Unique',
            description:
              'Acoustic pinnacle of haute horlogerie chiming hours, quarter-hours, and minutes on dual tempered cathedral gongs.',
            category: 'Grand Complication',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215649872-6e3143a716ec?auto=format&fit=crop&w=800&q=80',
            features: [
              'Cathedral Gong Chiming Hours/Quarters/Minutes',
              'Grand Feu White Enamel Dial',
              'Hand-Engraved Calibre VG-9900 Bridges',
              '18k Rose Gold Acoustic Resonator Case',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'Collector Testimonials',
        title: 'Words from global connoisseurs',
        items: [
          {
            name: 'Henri de Montmirail',
            role: 'Horological Collector & Patron',
            location: 'Geneva / Paris',
            rating: 5,
            text: 'The finishing on the Chrono-Tourbillon surpasses pieces from the historic holy trinity houses. The black polish on the tourbillon bridge is utterly immaculate.',
          },
          {
            name: 'Alexander Sterling',
            role: 'Private Collector',
            location: 'London',
            rating: 5,
            text: 'Acquiring a Vanguard piece through the private salon in Geneva was the finest purchasing experience of my collecting journey. A masterpiece on the wrist.',
          },
          {
            name: 'Kenji Takahashi',
            role: 'Watch Journalist & Curatorial Consultant',
            location: 'Tokyo',
            rating: 5,
            text: 'Vanguard represents the true soul of independent Swiss watchmaking. No marketing gimmicks—just peerless hand craftsmanship and sublime proportions.',
          },
        ],
      },
      cta: {
        headline: 'Commission your bespoke horological piece',
        subtitle:
          'Private viewings and custom dial allocations are arranged exclusively through our Geneva and Zurich salons.',
        primaryCta: { label: 'Request Salon Appointment', href: '/contact' },
        secondaryCta: { label: 'View Collection Catalogue', href: '/catalog' },
        guarantee: 'Worldwide insured armored delivery • 5-year manufacture guarantee with complimentary first overhaul',
      },
    },
    offerings: {
      header: {
        eyebrow: 'Manufacture Horlogère',
        title: 'The Vanguard Calibres & Timepieces',
        subtitle:
          'Each piece is hand-finished in the Vallée de Joux, strictly limited in production, and numbered upon completion.',
      },
      collection: {
        eyebrow: 'Full Atelier Archive',
        title: 'Manufacture Calibres & Timepieces',
        description:
          'Explore our complete horological collection spanning Grand Complications, Chronographs, and Heritage Chronometers.',
        currency: 'CHF',
        layout: 'products',
        categories: ['Chronograph', 'Grand Complication', 'GMT & Diver', 'Skeleton', 'Dress & Heritage', 'Complications'],
        items: [
          {
            id: 'vg-chrono-flyback-01',
            name: 'Chronograph Flyback 41mm Titanium',
            price: 26500,
            priceUnit: ' CHF',
            description:
              'High-frequency flyback column-wheel chronograph cased in ultra-light Grade 5 titanium with sapphire exhibition caseback.',
            category: 'Chronograph',
            badge: 'New Release',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
            features: [
              'Calibre VG-7120 Flyback Column Wheel',
              'Grade 5 Satin Titanium (41mm)',
              '65-Hour Power Reserve',
              'Box-Domed Sapphire Crystal',
            ],
          },
          {
            id: 'vg-tourbillon-complication-02',
            name: 'Tourbillon Grand Complication Rose Gold',
            price: 89000,
            priceUnit: ' CHF',
            description:
              'Flying 60-second tourbillon with monopusher chronograph in 18k rose gold. Hand-engraved openwork dial with black-polished carriage.',
            category: 'Grand Complication',
            badge: 'Atelier Flagship',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215649907-b51d8accb1ec?auto=format&fit=crop&w=800&q=80',
            features: [
              'Flying 60-Second In-House Tourbillon',
              'Solid 18k Rose Gold Case (42mm)',
              'Hand-Angled Bridges (36 Internal Angles)',
              'Alligator Strap with Deployant Clasp',
            ],
          },
          {
            id: 'vg-gmt-diver-03',
            name: 'GMT Dual-Time Diver 300m',
            price: 19800,
            priceUnit: ' CHF',
            description:
              'Dual-timezone chronometer engineered for deep ocean saturation diving with ceramic 24-hour bezel and helium escape valve.',
            category: 'GMT & Diver',
            badge: 'ISO 6425 Certified',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
            features: [
              'Dual-Time 24h GMT Complication',
              '300m Water Resistance with Helium Valve',
              'Ceramic Bi-Directional 24h Bezel',
              'Super-LumiNova BGW9 Luminescence',
            ],
          },
          {
            id: 'vg-skeleton-ultrathin-04',
            name: 'Skeleton Ultra-Thin Hand-Wound 39mm',
            price: 38400,
            priceUnit: ' CHF',
            description:
              'Masterpiece of micro-mechanical transparency featuring an ultra-slim 2.85mm movement with hand-chamfered anthracite bridges.',
            category: 'Skeleton',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215650201-8d552591218d?auto=format&fit=crop&w=800&q=80',
            features: [
              'Calibre VG-1002 Manual (2.85mm Thick)',
              'Openworked Anthracite Bridges',
              '18k White Gold Case (39mm)',
              '50-Hour Power Reserve',
            ],
          },
          {
            id: 'vg-perpetual-moonphase-05',
            name: 'Perpetual Calendar Moonphase Platinum',
            price: 115000,
            priceUnit: ' CHF',
            description:
              'Secular perpetual calendar accurate to the year 2499, adorned with a fired grand feu lapis lazuli astronomical moonphase disc.',
            category: 'Grand Complication',
            badge: 'Limited Edition of 10',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            features: [
              'Secular Perpetual Calendar to Year 2499',
              'Grand Feu Lapis Lazuli Moonphase Disk',
              '950 Platinum Hand-Finished Case',
              'Poinçon de Genève Certified',
            ],
          },
          {
            id: 'vg-sector-chronometer-06',
            name: 'Sector Dial Heritage Chronometer',
            price: 16900,
            priceUnit: ' CHF',
            description:
              'Purist mid-century scientific sector dial with hand-blued feuille hands, Breguet overcoil balance spring, and chronometric rating.',
            category: 'Dress & Heritage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80',
            features: [
              'Two-Tone Silver Sector Dial',
              'Free-Sprung Breguet Overcoil Balance',
              'Stainless Steel 38.5mm Step Case',
              'COSC Observatory Chronometer Rating',
            ],
          },
          {
            id: 'vg-monopusher-chrono-07',
            name: 'Monopusher Column-Wheel Chronograph',
            price: 29200,
            priceUnit: ' CHF',
            description:
              'Classical single-pusher chronograph integrated into the winding crown, operating a lateral clutch and column-wheel mechanism.',
            category: 'Chronograph',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80',
            features: [
              'Single-Button Coaxial Crown Actuator',
              'Horizontal Clutch Lateral Transmission',
              'Enamel Dial with Hand-Blued Hands',
              'Fairmined 18k Yellow Gold Case',
            ],
          },
          {
            id: 'vg-ocean-submersible-08',
            name: 'Ceramic Bezel Deep Ocean Submersible',
            price: 21500,
            priceUnit: ' CHF',
            description:
              'Built for extreme ocean depths up to 1,000 meters, forged in matte black zirconia ceramic with automatic helium discharge.',
            category: 'GMT & Diver',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
            features: [
              'Matte Black Zirconia Ceramic Case (43mm)',
              '1,000m Deep-Dive Waterproofing',
              'Automatic Helium Release Valve',
              'Integrated Vulcanized FKM Rubber Strap',
            ],
          },
          {
            id: 'vg-guilloche-dress-09',
            name: 'Guilloché Dial Dress Watch White Gold',
            price: 32000,
            priceUnit: ' CHF',
            description:
              'Traditional hand-turned Clous de Paris rose engine dial paired with solid 18k white gold case and micro-rotor automatic calibre.',
            category: 'Dress & Heritage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=800&q=80',
            features: [
              'Hand-Turned Clous de Paris Rose Engine Dial',
              '18k White Gold Case (38mm)',
              'In-House Calibre VG-5000 Micro-Rotor',
              'Hand-Rolled Mississippi Alligator',
            ],
          },
          {
            id: 'vg-regulator-automatic-10',
            name: 'Regulator Display Automatic Leather Strap',
            price: 24800,
            priceUnit: ' CHF',
            description:
              'Historic clockmaker regulator layout with decoupled hour and minute indications for absolute chronometric reading accuracy.',
            category: 'Complications',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
            features: [
              'Decoupled Master Regulator Architecture',
              'Central Minutes with Sub-Hour & Sub-Seconds',
              '22k Solid Gold Oscillating Weight',
              'Hand-Patinated Cordovan Strap',
            ],
          },
          {
            id: 'vg-pilot-antimagnetic-11',
            name: 'Pilot Chronograph Anti-Magnetic',
            price: 22900,
            priceUnit: ' CHF',
            description:
              'Aviation instrument chronometer protected against intense magnetic fields up to 80,000 A/m by an internal soft-iron Faraday cage.',
            category: 'Chronograph',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
            features: [
              'Soft-Iron Faraday Inner Cage (80,000 A/m)',
              'High-Contrast Matte Black Flight Dial',
              'Bi-Compax 30-Minute Counter',
              'Titanium Grade 5 Ergonomic Case (41.5mm)',
            ],
          },
          {
            id: 'vg-minute-repeater-12',
            name: 'Minute Repeater Enamel Dial',
            price: 165000,
            priceUnit: ' CHF',
            badge: 'Piece Unique',
            description:
              'Acoustic pinnacle of haute horlogerie chiming hours, quarter-hours, and minutes on dual tempered cathedral gongs.',
            category: 'Grand Complication',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1618215649872-6e3143a716ec?auto=format&fit=crop&w=800&q=80',
            features: [
              'Cathedral Gong Chiming Hours/Quarters/Minutes',
              'Grand Feu White Enamel Dial',
              'Hand-Engraved Calibre VG-9900 Bridges',
              '18k Rose Gold Acoustic Resonator Case',
            ],
          },
        ],
      },
      materials: {
        eyebrow: 'Métiers d’Art',
        title: 'Precious metallurgy & finishing standards',
        description:
          'Every component reflects centuries of high Swiss artisanal disciplines.',
        blocks: [
          {
            heading: 'Ethical Fairmined Precious Metals',
            body: 'Our gold, platinum, and titanium ingots are certified Fairmined, traceable directly from responsible artisanal mining cooperatives.',
          },
          {
            heading: 'Observatory Chronometer Rating',
            body: 'Before casing, each movement undergoes 504 hours of rigorous rate regulation in six positions under thermal shock testing from 4°C to 38°C.',
          },
        ],
      },
      cta: {
        headline: 'Inquire for private salon viewings',
        subtitle:
          'Custom dial allocations, personalized movement engravings, and private concierge viewings in Geneva, Zurich, and London.',
        primaryCta: { label: 'Schedule Consultation', href: '/contact' },
        secondaryCta: { label: 'Return to Atelier Home', href: '/' },
        guarantee: 'Insured worldwide armored transport • 5-year international manufacture warranty',
      },
    },
  },
};

export default luxuryHorology;
