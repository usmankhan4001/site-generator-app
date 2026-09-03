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
        items: [
          {
            id: 'vg-tourbillon-01',
            name: 'Vanguard Chrono-Tourbillon 1892',
            price: 48500,
            priceUnit: ' CHF',
            description:
              'Flying 60-second tourbillon with monopusher chronograph in 18k white gold. Hand-engraved openwork dial.',
            category: 'Tourbillon',
            badge: 'Limited Edition of 25',
            inStock: true,
            features: [
              'Calibre VG-8812 Manual Wind',
              '72-Hour Power Reserve',
              'Sapphire Exhibition Caseback',
              'Hand-stitched Alligator Strap',
            ],
          },
          {
            id: 'vg-astronomique-02',
            name: 'Sovereign Celestial Moonphase',
            price: 34200,
            priceUnit: ' CHF',
            description:
              'Astronomical precision moonphase accurate to 122 years, featuring a grand feu enamel lapis lazuli sky disk.',
            category: 'Complications',
            popular: true,
            badge: 'Atelier Flagship',
            inStock: true,
            features: [
              'Calibre VG-4200 Automatic',
              'True 29.53-day Lunar Gear Train',
              'Grade 5 Titanium Case (40mm)',
              'Anti-reflective Box Sapphire',
            ],
          },
          {
            id: 'vg-heritage-03',
            name: 'Chronographe Monopoussoir Classique',
            price: 27800,
            priceUnit: ' CHF',
            description:
              'Pure column-wheel chronograph with Breguet overcoil balance spring and fired grand feu enamel dial.',
            category: 'Chronograph',
            inStock: true,
            features: [
              'Calibre VG-3100 Lateral Clutch',
              'Black Polished Steel Cap',
              'Solid 18k Rose Gold Case',
              'Poinçon de Genève Hallmark',
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
  },
};

export default luxuryHorology;
