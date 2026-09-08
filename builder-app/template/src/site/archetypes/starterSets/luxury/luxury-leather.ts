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
        categories: ['Travel Luggage', 'Briefcases & Bags', 'Small Leather Goods', 'Desk & Lifestyle'],
        items: [
          {
            id: 'val-weekender-duffle-01',
            name: 'The Weekender Full-Grain Leather Duffle',
            price: 1350,
            priceUnit: ' EUR',
            description:
              'Heirloom 52cm travel holdall sculpted from 2.4mm dark cognac Vacchetta leather with solid brass RiRi M8 zippers and dedicated footwear compartment.',
            category: 'Travel Luggage',
            badge: 'Flagship Masterpiece',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            features: [
              '2.4mm Tuscan Vegetable-Tanned Vacchetta',
              'RiRi M8 Solid Brass Double Zippers',
              'Reinforced Base with Brass Protective Feet',
              'Dedicated Internal Shoe Compartment',
            ],
          },
          {
            id: 'val-executive-briefcase-02',
            name: 'The Executive Slim Briefcase',
            price: 980,
            priceUnit: ' EUR',
            description:
              'Structured document attaché with hand-cast English brass combination lock, twin interior gussets, and tailored pocketing for a 16-inch laptop.',
            category: 'Briefcases & Bags',
            badge: 'Atelier Classic',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            features: [
              'Rigid Cast Brass English Combination Lock',
              'Dual Internal Gussets with 16" Laptop Pocket',
              'Hand-Molded Structured Carry Handle',
              'Pigskin Suede Lining & Key Clochette',
            ],
          },
          {
            id: 'val-minimalist-wallet-03',
            name: 'The Minimalist Bifold Card Wallet',
            price: 165,
            priceUnit: ' EUR',
            description:
              'Ultra-slim bifold wallet hand-stitched with waxed French linen thread, featuring six beveled card pockets and a full-length currency sleeve.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            features: [
              '6 Precision-Beveled Card Slots & Cash Sleeve',
              'Hand Saddle-Stitched with Waxed Linen Thread',
              'Ultra-Slim 6mm Profile',
              'Natural Unfinished Edge Burnish',
            ],
          },
          {
            id: 'val-structured-backpack-04',
            name: 'The Structured Leather Backpack',
            price: 890,
            priceUnit: ' EUR',
            description:
              'Architectural daily rucksack designed with padded bridle leather shoulder straps, quick-release brass tuck locks, and padded tech storage.',
            category: 'Briefcases & Bags',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
            features: [
              'Ergonomic Padded Saddle Leather Straps',
              'Padded Interior Compartment for 15" Tech',
              'Solid Brass Quick-Release Tuck Locks',
              'Water-Resistant Cotton Twill Liner',
            ],
          },
          {
            id: 'val-travel-folio-05',
            name: 'The Passport & Travel Folio',
            price: 240,
            priceUnit: ' EUR',
            description:
              'Comprehensive international travel organiser tailored to hold dual passports, boarding documentation, currency notes, and four credit cards.',
            category: 'Travel Luggage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            features: [
              'Holds Dual Passports, Boarding Passes & 4 Cards',
              'Integrated Brass Pen Loop & Notebook Sleeve',
              'RFID Shielded Interior Lining',
              'Hand-Debossed Travel Crest',
            ],
          },
          {
            id: 'val-watch-roll-06',
            name: 'The Watch Collector 3-Piece Roll',
            price: 320,
            priceUnit: ' EUR',
            badge: 'Collector Essential',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
            features: [
              'Modular Slide-In Watch Cushions',
              'Plush Italian Micro-Suede Interior',
              'Rigid Crush-Proof Cylinder Core',
              'Triple Solid Brass Snap Closure',
            ],
          },
          {
            id: 'val-laptop-sleeve-07',
            name: 'The Hand-Stitched Leather Laptop Sleeve',
            price: 210,
            priceUnit: ' EUR',
            description:
              'Snug full-grain calfskin protective envelope lined with 100% natural merino wool felt to protect laptops against impact and abrasion.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            features: [
              'Tailored Fit for 14" and 16" MacBook Pro',
              'Scratch-Free Merino Wool Felt Lining',
              'Magnetic Hidden Flap Closure',
              'Hand-Burnished Beeswax Perimeter',
            ],
          },
          {
            id: 'val-bridle-belt-08',
            name: 'The Brass-Buckled Bridle Leather Belt',
            price: 145,
            priceUnit: ' EUR',
            description:
              'Indestructible 35mm dress belt cut from 3.8mm thick Tuscan bridle leather, equipped with a sand-cast solid brass harness buckle.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
            features: [
              '3.8mm Heavy English Bridle Leather',
              'Sand-Cast Solid Brass Harness Buckle',
              'Hand-Teardrop Holes with Edge Creasing',
              'Re-Stitchable Solid Brass Chicago Screws',
            ],
          },
          {
            id: 'val-toiletry-kit-09',
            name: 'The Zippered Leather Wash Bag / Toiletry Kit',
            price: 275,
            priceUnit: ' EUR',
            description:
              'Framed doctor-bag style toiletry kit with waterproof wipe-clean lining, side carry handle, and smooth heavy brass zip opening.',
            category: 'Travel Luggage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
            features: [
              'Waterproof Wipe-Clean Nylon Interior',
              'Wide-Mouth Framed Doctor-Bag Opening',
              'Heavy-Gauge RiRi Brass Zipper',
              'Side Grab Handle with Brass Rivets',
            ],
          },
          {
            id: 'val-deskmat-suite-10',
            name: 'The Desk Mat & Mousepad Full-Grain Suite',
            price: 310,
            priceUnit: ' EUR',
            description:
              'Executive workspace duo featuring a generous 90x45cm desk blotter and matching precision mousepad backed in non-slip split suede.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
            features: [
              '90cm x 45cm Executive Full-Grain Desk Pad',
              'Matching Precision Tracking Mousepad',
              'Non-Slip Natural Suede Backing',
              'Hand-Beveled Edge Detailing',
            ],
          },
          {
            id: 'val-valet-tray-11',
            name: 'The Valet Key Catchall Tray',
            price: 125,
            priceUnit: ' EUR',
            description:
              'Fold-flat nightstand tray crafted from thick Cuoio Vegetale leather with solid brass snap corners for coins, keys, and accessories.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
            features: [
              'Heavy Cuoio Vegetale with Snap Corners',
              'Unsnaps Flat for Travel Packing',
              'Ideal for Keys, Timepieces & Pocket Essentials',
              'Gold-Foil Atelier Stamp',
            ],
          },
          {
            id: 'val-cigar-case-12',
            name: 'The Leather Cigar Case & Cutter Holder',
            price: 220,
            priceUnit: ' EUR',
            badge: 'Artisan Special',
            description:
              'Telescopic three-finger Spanish cedar-lined rigid cigar protector with external slot designed to house a double-guillotine cutter.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
            features: [
              'Telescopic 3-Finger Cedar-Lined Cigar Case',
              'Dedicated Front Pocket for Guillotine Cutter',
              'Hardened Leather Outer Shell',
              'Cedar Fragrance Preservation',
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
            text: 'I have carried the Executive Slim Briefcase across fifty international flights this year. The leather has taken on a rich amber patina that commands respect in every boardroom.',
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
    offerings: {
      header: {
        eyebrow: 'Pelletteria Artigianale',
        title: 'The Florentine Leather Archive',
        subtitle:
          'Handcrafted vegetable-tanned Vacchetta travel luggage, briefcases, and lifestyle accessories from Florence.',
      },
      collection: {
        eyebrow: 'Atelier Catalogue',
        title: 'Full Tuscan Leather Archive',
        description:
          'Discover our complete collection of travel luggage, executive briefcases, small leather goods, and desktop suites.',
        currency: 'EUR',
        layout: 'products',
        categories: ['Travel Luggage', 'Briefcases & Bags', 'Small Leather Goods', 'Desk & Lifestyle'],
        items: [
          {
            id: 'val-weekender-duffle-01',
            name: 'The Weekender Full-Grain Leather Duffle',
            price: 1350,
            priceUnit: ' EUR',
            description:
              'Heirloom 52cm travel holdall sculpted from 2.4mm dark cognac Vacchetta leather with solid brass RiRi M8 zippers and dedicated footwear compartment.',
            category: 'Travel Luggage',
            badge: 'Flagship Masterpiece',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
            features: [
              '2.4mm Tuscan Vegetable-Tanned Vacchetta',
              'RiRi M8 Solid Brass Double Zippers',
              'Reinforced Base with Brass Protective Feet',
              'Dedicated Internal Shoe Compartment',
            ],
          },
          {
            id: 'val-executive-briefcase-02',
            name: 'The Executive Slim Briefcase',
            price: 980,
            priceUnit: ' EUR',
            description:
              'Structured document attaché with hand-cast English brass combination lock, twin interior gussets, and tailored pocketing for a 16-inch laptop.',
            category: 'Briefcases & Bags',
            badge: 'Atelier Classic',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            features: [
              'Rigid Cast Brass English Combination Lock',
              'Dual Internal Gussets with 16" Laptop Pocket',
              'Hand-Molded Structured Carry Handle',
              'Pigskin Suede Lining & Key Clochette',
            ],
          },
          {
            id: 'val-minimalist-wallet-03',
            name: 'The Minimalist Bifold Card Wallet',
            price: 165,
            priceUnit: ' EUR',
            description:
              'Ultra-slim bifold wallet hand-stitched with waxed French linen thread, featuring six beveled card pockets and a full-length currency sleeve.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            features: [
              '6 Precision-Beveled Card Slots & Cash Sleeve',
              'Hand Saddle-Stitched with Waxed Linen Thread',
              'Ultra-Slim 6mm Profile',
              'Natural Unfinished Edge Burnish',
            ],
          },
          {
            id: 'val-structured-backpack-04',
            name: 'The Structured Leather Backpack',
            price: 890,
            priceUnit: ' EUR',
            description:
              'Architectural daily rucksack designed with padded bridle leather shoulder straps, quick-release brass tuck locks, and padded tech storage.',
            category: 'Briefcases & Bags',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
            features: [
              'Ergonomic Padded Saddle Leather Straps',
              'Padded Interior Compartment for 15" Tech',
              'Solid Brass Quick-Release Tuck Locks',
              'Water-Resistant Cotton Twill Liner',
            ],
          },
          {
            id: 'val-travel-folio-05',
            name: 'The Passport & Travel Folio',
            price: 240,
            priceUnit: ' EUR',
            description:
              'Comprehensive international travel organiser tailored to hold dual passports, boarding documentation, currency notes, and four credit cards.',
            category: 'Travel Luggage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
            features: [
              'Holds Dual Passports, Boarding Passes & 4 Cards',
              'Integrated Brass Pen Loop & Notebook Sleeve',
              'RFID Shielded Interior Lining',
              'Hand-Debossed Travel Crest',
            ],
          },
          {
            id: 'val-watch-roll-06',
            name: 'The Watch Collector 3-Piece Roll',
            price: 320,
            priceUnit: ' EUR',
            badge: 'Collector Essential',
            popular: true,
            inStock: true,
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
            features: [
              'Modular Slide-In Watch Cushions',
              'Plush Italian Micro-Suede Interior',
              'Rigid Crush-Proof Cylinder Core',
              'Triple Solid Brass Snap Closure',
            ],
          },
          {
            id: 'val-laptop-sleeve-07',
            name: 'The Hand-Stitched Leather Laptop Sleeve',
            price: 210,
            priceUnit: ' EUR',
            description:
              'Snug full-grain calfskin protective envelope lined with 100% natural merino wool felt to protect laptops against impact and abrasion.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            features: [
              'Tailored Fit for 14" and 16" MacBook Pro',
              'Scratch-Free Merino Wool Felt Lining',
              'Magnetic Hidden Flap Closure',
              'Hand-Burnished Beeswax Perimeter',
            ],
          },
          {
            id: 'val-bridle-belt-08',
            name: 'The Brass-Buckled Bridle Leather Belt',
            price: 145,
            priceUnit: ' EUR',
            description:
              'Indestructible 35mm dress belt cut from 3.8mm thick Tuscan bridle leather, equipped with a sand-cast solid brass harness buckle.',
            category: 'Small Leather Goods',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
            features: [
              '3.8mm Heavy English Bridle Leather',
              'Sand-Cast Solid Brass Harness Buckle',
              'Hand-Teardrop Holes with Edge Creasing',
              'Re-Stitchable Solid Brass Chicago Screws',
            ],
          },
          {
            id: 'val-toiletry-kit-09',
            name: 'The Zippered Leather Wash Bag / Toiletry Kit',
            price: 275,
            priceUnit: ' EUR',
            description:
              'Framed doctor-bag style toiletry kit with waterproof wipe-clean lining, side carry handle, and smooth heavy brass zip opening.',
            category: 'Travel Luggage',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
            features: [
              'Waterproof Wipe-Clean Nylon Interior',
              'Wide-Mouth Framed Doctor-Bag Opening',
              'Heavy-Gauge RiRi Brass Zipper',
              'Side Grab Handle with Brass Rivets',
            ],
          },
          {
            id: 'val-deskmat-suite-10',
            name: 'The Desk Mat & Mousepad Full-Grain Suite',
            price: 310,
            priceUnit: ' EUR',
            description:
              'Executive workspace duo featuring a generous 90x45cm desk blotter and matching precision mousepad backed in non-slip split suede.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
            features: [
              '90cm x 45cm Executive Full-Grain Desk Pad',
              'Matching Precision Tracking Mousepad',
              'Non-Slip Natural Suede Backing',
              'Hand-Beveled Edge Detailing',
            ],
          },
          {
            id: 'val-valet-tray-11',
            name: 'The Valet Key Catchall Tray',
            price: 125,
            priceUnit: ' EUR',
            description:
              'Fold-flat nightstand tray crafted from thick Cuoio Vegetale leather with solid brass snap corners for coins, keys, and accessories.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80',
            features: [
              'Heavy Cuoio Vegetale with Snap Corners',
              'Unsnaps Flat for Travel Packing',
              'Ideal for Keys, Timepieces & Pocket Essentials',
              'Gold-Foil Atelier Stamp',
            ],
          },
          {
            id: 'val-cigar-case-12',
            name: 'The Leather Cigar Case & Cutter Holder',
            price: 220,
            priceUnit: ' EUR',
            badge: 'Artisan Special',
            description:
              'Telescopic three-finger Spanish cedar-lined rigid cigar protector with external slot designed to house a double-guillotine cutter.',
            category: 'Desk & Lifestyle',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
            features: [
              'Telescopic 3-Finger Cedar-Lined Cigar Case',
              'Dedicated Front Pocket for Guillotine Cutter',
              'Hardened Leather Outer Shell',
              'Cedar Fragrance Preservation',
            ],
          },
        ],
      },
      materials: {
        eyebrow: 'Conceria Artigiana',
        title: 'Santa Croce sull’Arno Vegetable Tannery Traditions',
        description:
          'Tanned slowly using organic tree barks and pure river water without synthetic chrome salts.',
        blocks: [
          {
            heading: 'Genuine Cuoio al Vegetale',
            body: 'Our hides are cured in Santa Croce drum vats with chestnut and mimosa tannins for sixty days, allowing natural grain variations and living patina to shine.',
          },
          {
            heading: 'Dual-Needle Waxed Linen Saddle Stitch',
            body: 'Every stress point is pierced by hand with an awl and hand-sewn with dual blunt needles, ensuring independent lock knots that outlive industrial machine stitching.',
          },
        ],
      },
      cta: {
        headline: 'Commission a custom Florentine leather piece',
        subtitle:
          'Custom hide selection, blind or hot-foil monogramming, and private atelier visits in Florence.',
        primaryCta: { label: 'Inquire with the Atelier', href: '/contact' },
        secondaryCta: { label: 'Return to Atelier Home', href: '/' },
        guarantee: 'Complimentary worldwide insured courier delivery • Lifetime warranty on all stitching and brass hardware',
      },
    },
  },
};

export default luxuryLeather;
