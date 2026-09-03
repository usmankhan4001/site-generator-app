/**
 * Starter content set — `store-outdoor`: Expedition-Grade Camping, Alpine Tech & Trail Gear.
 * Authentic copy for ultralight technical shelters, hydrophobic down sleeping systems, titanium stoves, and high-altitude mountain gear.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const outdoorProducts: CatalogItem[] = [
  {
    id: 'ao-tent-2p',
    name: 'Ultralight 2-Person 3-Season Tent',
    price: 460,
    priceUnit: ' USD',
    sku: 'AR-TNT-UL2P-GRN',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    description:
      'Freestanding 980g technical tent engineered with 15D siliconized ripstop nylon, DAC Featherlite NSL poles, and 3000mm hydrostatic head waterproof tub floor.',
    category: 'Shelter & Tents',
    badge: 'Expedition Pick',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    features: [
      'Sub-1kg trail weight (980g complete packed weight)',
      '15D Sil/PU ripstop nylon fly with taped silicone seams',
      'DAC Featherlite NSL anodized aircraft aluminum poles',
      'Dual vestibules with high-low condensation chimney vents',
    ],
  },
  {
    id: 'ao-sleeping-bag-down',
    name: 'Hydrophobic Down -10°C Sleeping Bag',
    price: 380,
    priceUnit: ' USD',
    sku: 'AR-SLP-DOWN-10C',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    description:
      '850+ fill-power RDS-certified goose down mummy sleeping bag treated with DownTek PFC-free hydrophobic water-repellent coating and ergonomic 3D footbox.',
    category: 'Sleep Systems',
    badge: 'Bestseller',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 64,
    features: [
      '850+ Fill-Power RDS-certified grey goose down',
      'Comfort rating -10°C (14°F) / ISO 23537 tested',
      'Pertex Quantum 10D ultralight windproof ripstop shell',
      'Magnetic anti-snag collar seal and full-length draft tube',
    ],
  },
  {
    id: 'ao-titanium-stove',
    name: 'Titanium Multi-Fuel Ultralight Camp Stove',
    price: 135,
    priceUnit: ' USD',
    sku: 'AR-STV-TI-MULTI',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
    description:
      'Grade 5 titanium micro-stove compatible with isobutane canisters, white gas, and kerosene with built-in micro-regulator for sub-zero performance.',
    category: 'Camp Kitchen',
    inStock: true,
    rating: 4.8,
    reviewCount: 45,
    features: [
      'Weighs only 72g (2.5 oz) in Grade 5 aerospace titanium',
      '3.5-minute rolling boil time for 1 liter of water',
      'Internal micro-regulator maintains flame pressure down to -20°C',
      'Folds into the size of an espresso cup',
    ],
  },
  {
    id: 'ao-solar-powerbank',
    name: 'Solar-Powered Rugged Power Bank & Lantern',
    price: 95,
    priceUnit: ' USD',
    sku: 'AR-PWR-SLR-20K',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    description:
      'IP68 waterproof and shockproof 20,000mAh adventure battery bank with integrated SunPower solar charging panel and 300-lumen emergency flood lantern.',
    category: 'Electronics & Navigation',
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    features: [
      '20,000mAh capacity (charges iPhone up to 5 times)',
      '65W USB-C Power Delivery fast charging input/output',
      'IP68 waterproof, submersible to 2 meters for 30 minutes',
      'Integrated SOS beacon and 3-mode area camp lantern',
    ],
  },
  {
    id: 'ao-carbon-poles',
    name: 'Ergonomic Carbon Fiber Trail Trekking Poles',
    price: 120,
    priceUnit: ' USD',
    sku: 'AR-POL-CRB-PAIR',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    description:
      'Pair of 3-section 100% high-modulus carbon fiber poles with quick-cam aluminum lever locks, natural cork grips, and tungsten carbide tips.',
    category: 'Trail Gear',
    inStock: true,
    rating: 4.9,
    reviewCount: 53,
    features: [
      '100% High-Modulus lightweight carbon fiber (185g per pole)',
      'Sweat-wicking moisture-absorbing natural cork handles',
      'Aluminum PowerLock 3.0 external flick adjustment (62–140cm)',
      'Includes rubber walking tips, mud baskets, and snow baskets',
    ],
  },
  {
    id: 'ao-expedition-pack-55l',
    name: 'Waterproof Cordura Expedition 55L Backpack',
    price: 310,
    priceUnit: ' USD',
    sku: 'AR-PCK-COR55-BLK',
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    description:
      'Heavy-duty alpine expedition pack crafted from 500D Cordura ripstop nylon with internal 7075 aluminum frame stays and dynamic load-transfer hip belt.',
    category: 'Packs & Bags',
    badge: 'Pro Grade',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    features: [
      '500D Cordura ripstop nylon with TPU waterproof coating',
      'Customizable torso length adjustment (40–56cm)',
      'YKK AquaGuard weatherproof external access zippers',
      'Integrated crampon loops, dual ice-axe holders, and rope strap',
    ],
  },
  {
    id: 'ao-water-purifier',
    name: 'Thermal Double-Wall Vacuum Water Purifier',
    price: 85,
    priceUnit: ' USD',
    sku: 'AR-HYD-PUR-750',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description:
      '750ml insulated stainless steel bottle with integrated 0.1-micron hollow-fiber membrane and electro-adsorptive cartridge that removes 99.9999% of bacteria, protozoa, and viruses.',
    category: 'Hydration & Filtration',
    inStock: true,
    rating: 4.7,
    reviewCount: 81,
    features: [
      'Fast 8-second purification per press (no chemicals or pumps)',
      'Removes 99.9999% of viruses, bacteria, and protozoan cysts',
      'Vacuum insulated double-wall keeps ice water cold for 24 hours',
      'Replaceable purifier cartridge rated for 300 cycles (250L)',
    ],
  },
  {
    id: 'ao-emergency-bivy',
    name: 'Compact Alpine Emergency Bivy & First Aid',
    price: 65,
    priceUnit: ' USD',
    sku: 'AR-SFY-EMG-KIT',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
    description:
      'All-in-one lightweight survival shelter system featuring a 90% heat-reflective breathable waterproof bivy sack, trauma kit, signaling mirror, and fire starter.',
    category: 'Safety & Survival',
    inStock: true,
    rating: 5.0,
    reviewCount: 40,
    features: [
      'Reflects 90% of radiated body heat to prevent hypothermia',
      'Breathable waterproof Heatsheets composite fabric',
      'Includes sterile trauma bandages, tourniquet, and antiseptic',
      'Weighs only 240g, packs down to the size of an orange',
    ],
  },
  {
    id: 'ao-headlamp-1200lm',
    name: 'Rechargeable 1200-Lumen Wide-Beam Headlamp',
    price: 75,
    priceUnit: ' USD',
    sku: 'AR-LGT-HL1200-USB',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80',
    description:
      'Multi-optic Cree LED headlamp pushing 1,200 lumens with 150-meter beam distance, red night-vision mode, and USB-C magnetic fast charging.',
    category: 'Lighting',
    inStock: true,
    rating: 4.8,
    reviewCount: 112,
    features: [
      'Max 1,200 lumens with reactive brightness sensor technology',
      '18650 Li-ion 3500mAh rechargeable battery (up to 120h runtime)',
      'IP68 Submersible and 2-meter impact drop resistant',
      'Includes reflective breathable headband and helmet clips',
    ],
  },
  {
    id: 'ao-titanium-cookset',
    name: 'Packable Anodized Titanium Cookset',
    price: 110,
    priceUnit: ' USD',
    sku: 'AR-KIT-TI-COOK3',
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    description:
      'Nested 3-piece camping cookset in food-grade pure titanium, including 1100ml pot with measuring lines, 800ml secondary pot, and skillet lid.',
    category: 'Camp Kitchen',
    inStock: true,
    rating: 4.9,
    reviewCount: 29,
    features: [
      '100% Pure biocompatible Grade 1 titanium (total weight 210g)',
      'Heat-resistant silicone-sleeved foldaway handles',
      'Nests a 230g gas canister and ultralight micro-stove inside',
      'Includes ventilated mesh storage sack',
    ],
  },
  {
    id: 'ao-insulated-pad',
    name: 'Insulated Inflatable Sleeping Pad',
    price: 145,
    priceUnit: ' USD',
    sku: 'AR-SLP-PAD-R5',
    image: 'https://images.unsplash.com/photo-1506535772317-9fdb71c959c0?auto=format&fit=crop&w=800&q=80',
    description:
      '7.5cm thick baffle sleeping mattress with ThermaCapture reflective film and synthetic Primaloft insulation yielding a certified ASTM R-value of 5.2.',
    category: 'Sleep Systems',
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
    features: [
      'ASTM F3340-18 verified R-Value 5.2 for 4-season alpine warmth',
      '7.5cm (3 inch) cushioned baffle height for side-sleeper comfort',
      'WingLock high-flow valve with pump-sack inflation in under 2 minutes',
      'Quiet, non-crinkle 30D ripstop polyester top fabric',
    ],
  },
  {
    id: 'ao-goretex-parka',
    name: 'GORE-TEX Mountain Hard-Shell Parka',
    price: 495,
    priceUnit: ' USD',
    sku: 'AR-APP-GTX-PRO',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    description:
      'Uncompromising 3-layer GORE-TEX Pro Most Rugged alpine jacket with helmet-compatible storm hood, pit-zip ventilation, and RECCO avalanche rescue reflector.',
    category: 'Technical Apparel',
    badge: 'Alpine Standard',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 58,
    features: [
      '3-Layer GORE-TEX Pro 70D Most Rugged fabric (28,000mm waterproof)',
      'Cohaesive embedded cord-lock hood and hem adjustment system',
      'Watertight YKK VISLON front zipper and dual oversized chest harness pockets',
      'Integrated RECCO passive avalanche rescue transponder',
    ],
  },
];

export const storeOutdoor: StarterContentSet = {
  id: 'store-outdoor',
  archetype: 'store',
  name: 'Alpine Ridge Outdoor Gear',
  description:
    'Expedition-grade camping shelters, alpine technical gear, hydrophobic down sleeping systems, and trail provisions tested in the Colorado Rockies.',
  niche: 'Expedition-grade camping, alpine tech & trail gear',
  tags: [
    'outdoor',
    'camping-gear',
    'alpine-equipment',
    'ultralight-backpacking',
    'tents',
    'sleeping-bags',
    'trail-gear',
    'dtc-store',
  ],
  needsPersonalization: false,
  themeId: 'aurora-emerald',
  business: {
    name: 'Alpine Ridge Outdoor Equipment Co.',
    shortName: 'Alpine Ridge',
    registrationNumber: 'CO-20231948210',
    jurisdiction: 'Colorado, United States (Colorado Secretary of State)',
    governingLaw: 'the laws of the State of Colorado and the United States',
    registeredAddress: '1420 Alpine Vista Drive, Boulder, CO 80302, United States',
    email: 'support@alpineridgegear.example',
    phone: '+1 303 555 0184',
    website: 'alpineridgegear.example',
    supportHours: 'Monday – Friday, 08:00 – 18:00 (MST)',
  },
  brand: { logoText: 'Alpine Ridge' },
  meta: {
    title: 'Alpine Ridge — Expedition-Grade Camping, Alpine Tech & Trail Gear',
    description:
      'Ultralight 4-season shelters, hydrophobic down sleeping bags, titanium camp stoves, and rugged mountain trail tech engineered for extreme wilderness expeditions.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Tested at 14,000 ft • Colorado Rockies',
        headline: 'Expedition-grade gear engineered for the',
        accentText: 'most demanding wilderness',
        subtitle:
          'From sub-zero ridge bivouacs to multi-week thru-hikes, Alpine Ridge designs ultralight technical shelters, titanium stoves, and certified cold-weather sleep systems built to withstand the harshest alpine elements.',
        primaryCta: { label: 'Explore Expedition Gear', href: '/catalog' },
        secondaryCta: { label: 'Field Testing Journal', href: '/about' },
        trustBadges: ['Tested in Sub-Zero Alpine Conditions', '100% Titanium & Ripstop Cordura', 'Lifetime Trail Warranty'],
      },
      trust: {
        variant: 'pills',
        title: 'Rigorous engineering standards for extreme backcountry survival',
        items: [
          '850+ Fill-Power RDS Hydrophobic Down',
          'Grade 5 Aerospace Titanium',
          'ISO & ASTM Lab Certified R-Values',
          'Free Worldwide Carbon-Neutral Shipping Over $100',
        ],
      },
      catalogue: {
        eyebrow: 'Backcountry Essentials',
        title: 'The Alpine Ridge Field Capsule',
        description:
          'Ultralight shelters, precision camp stoves, and technical layers tested across the highest peaks in North America.',
        currency: 'USD',
        layout: 'products',
        items: outdoorProducts,
      },
      highlights: {
        eyebrow: 'Engineering Pillars',
        title: 'Built for survival, refined for ultralight efficiency',
        description:
          'Every gram eliminated means more endurance on the summit push. We never sacrifice structural resilience for weight savings.',
        items: [
          {
            icon: 'Mountain',
            title: 'Sub-1kg High-Altitude Shelters',
            description:
              'Engineered with silicone-impregnated ripstop fabrics and DAC NSL poles to withstand 60mph crosswinds and heavy alpine snow loads.',
          },
          {
            icon: 'Flame',
            title: 'Sub-Zero Micro-Regulated Burners',
            description:
              'Integrated pressure-regulating valves prevent gas canister pressure drop in sub-freezing temperatures for instant boiling at high altitudes.',
          },
          {
            icon: 'Shield',
            title: 'Cordura & Dyneema Reinforcements',
            description:
              'High-abrasion contact points are reinforced with 500D Cordura and composite fibers that resist granite scraping and crampon punctures.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Lifetime Alpine Warranty',
            description:
              'If your gear fails due to manufacturing defects on the trail, we repair or replace it unconditionally. No questions asked.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Field Tester Reviews',
        title: 'Dispatches from the summit',
        items: [
          {
            name: 'Marcus Vance',
            role: 'Lead Alpine Mountain Guide',
            location: 'Telluride, Colorado',
            rating: 5,
            text: 'I took the 2-Person Ultralight Tent and -10°C Down Bag on a 14-day winter traverse of the San Juan Mountains. Winds hit 50 knots on the col and we stayed bone dry and toasty warm.',
          },
          {
            name: 'Sierra Brooks',
            role: 'Continental Divide Trail Thru-Hiker',
            location: 'Bozeman, Montana',
            rating: 5,
            text: 'The titanium multi-fuel stove and carbon fiber trekking poles saved over a pound from my base weight. The flick-locks on the poles never slipped once across 2,600 miles.',
          },
          {
            name: 'Dr. Evan Chen',
            role: 'Search & Rescue Medic',
            location: 'Jackson Hole, Wyoming',
            rating: 5,
            text: 'The GORE-TEX Mountain Hard-Shell Parka and Emergency Bivy Kit are non-negotiable items in my rescue pack. The build quality and stormproofing are second to none.',
          },
        ],
      },
      cta: {
        headline: 'Gear up for your next high-altitude summit',
        subtitle:
          'All orders ship within 24 hours with express delivery and our unconditional 60-day field testing satisfaction guarantee.',
        primaryCta: { label: 'Shop The Entire Gear Capsule', href: '/catalog' },
        secondaryCta: { label: 'Explore Expedition Guides', href: '/about' },
        guarantee: '60-Day Backcountry Guarantee • Lifetime Repair & Replacement Support',
      },
    },
    offerings: {
      header: {
        headline: 'Expedition Gear Catalogue',
        subtitle:
          'Discover our complete lineup of technical alpine shelters, sleeping bags, titanium cooking systems, and backcountry accessories.',
      },
      catalogue: {
        eyebrow: 'Full Inventory',
        title: 'Tents, Sleep Systems & Trail Provisions',
        description: '12 expedition-grade products engineered to perform in the world’s most demanding alpine environments.',
        currency: 'USD',
        layout: 'products',
        categories: [
          'Shelter & Tents',
          'Sleep Systems',
          'Camp Kitchen',
          'Packs & Bags',
          'Trail Gear',
          'Lighting',
          'Hydration & Filtration',
          'Safety & Survival',
          'Technical Apparel',
          'Electronics & Navigation',
        ],
        items: outdoorProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Backed by expedition reliability',
        items: [
          '850+ Fill-Power RDS Down',
          'Grade 5 Pure Titanium',
          'Waterproof 500D Cordura',
          'Lifetime Repair Guarantee',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'How does your hydrophobic down perform in wet weather?',
            a: 'Our goose down is treated with DownTek PFC-free nanotechnology. It absorbs 30% less moisture and dries 60% faster than untreated down, maintaining its insulating loft even in damp alpine environments.',
          },
          {
            q: 'What makes your titanium stoves superior at high altitudes?',
            a: 'Standard canister stoves suffer severe flame drop when canister temperature falls. Our internal micro-regulator ensures steady gas vaporization and heat output even at elevations above 12,000 feet in sub-zero conditions.',
          },
          {
            q: 'How do I care for the GORE-TEX Pro shell parka?',
            a: 'Machine wash warm with technical outerwear detergent (like Nikwax Tech Wash), rinse twice, and tumble dry medium for 20 minutes to reactivate the durable water-repellent (DWR) coating.',
          },
          {
            q: 'What is your warranty policy on trail gear?',
            a: 'We offer an unconditional Lifetime Trail Warranty. If any component fails due to craftsmanship or material defect, send it to our Boulder workshop and we will repair or replace it immediately.',
          },
        ],
      },
      cta: {
        headline: 'Planning a custom expedition or group gear purchase?',
        subtitle: 'Our Boulder alpine specialists provide customized gear consultations for guides and expedition teams.',
        primaryCta: { label: 'Contact Expedition Advisors', href: '/contact' },
        secondaryCta: { label: 'Read Our Story', href: '/about' },
        guarantee: 'Free express shipping on orders over $100 • 60-day in-field return policy',
      },
    },
    about: {
      header: {
        headline: 'Born on the High Ridges of Colorado',
        subtitle: 'Designed, engineered, and field-tested in Boulder to withstand extreme alpine conditions.',
      },
      story: {
        eyebrow: 'Our Origins',
        title: 'Rejecting heavy gear and fragile shortcuts',
        description: 'Alpine Ridge was founded by backcountry search & rescue veterans who demanded gear that would never fail when conditions turn perilous.',
        blocks: [
          {
            heading: 'High-Altitude Field Testing',
            body: 'We don’t just test our gear in sterile laboratories. Every tent seam, stove regulator, and backpack harness is field-tested by mountaineers across winter storm conditions in the Rockies, Cascades, and Alaskan Range.',
          },
          {
            heading: 'Zero Single-Use Plastics & Circular Repairs',
            body: 'We believe preserving the wilderness is just as vital as exploring it. Our Boulder headquarters houses a dedicated gear restoration and repair atelier where we extend the lifespan of every product we sell.',
          },
        ],
        highlights: [
          '100% RDS-certified responsibly sourced down',
          'PFC-free eco-conscious water repellency',
          'Solar-powered design studio & repair lab in Boulder, CO',
          '1% of all revenue donated directly to Trail Conservation Funds',
        ],
      },
      values: {
        eyebrow: 'Core Principles',
        title: 'Built on four non-negotiable pillars',
        items: [
          {
            icon: 'Shield',
            title: 'Uncompromising Durability',
            description: 'We build gear for severe conditions where equipment failure is not an inconvenience—it’s an emergency.',
          },
          {
            icon: 'Feather',
            title: 'Gram-Counting Precision',
            description: 'We obsess over every zipper pull, bar-tack, and pole joint to reduce base pack weight without sacrificing safety.',
          },
          {
            icon: 'Leaf',
            title: 'Responsible Sourcing',
            description: 'From 100% recycled nylon shells to bluesign-approved hardware, we minimize our ecological footprint.',
          },
          {
            icon: 'Wrench',
            title: 'Right to Repair',
            description: 'We publish repair guides, supply replacement parts, and offer free in-house repairs for life.',
          },
        ],
      },
      cta: {
        headline: 'Ready to elevate your backcountry experience?',
        subtitle: 'Explore our field-tested shelters, sleep systems, and trail instruments.',
        primaryCta: { label: 'View The Full Capsule', href: '/catalog' },
        secondaryCta: { label: 'Connect With Us', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'Contact The Alpine Team',
        subtitle: 'Reach out to our Boulder gear specialists for product sizing, expedition gear lists, or warranty inquiries.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Expedition & Support Inquiries',
        items: [
          {
            q: 'Can I visit the Boulder workshop to try gear in person?',
            a: 'Yes. Our Boulder flagship showroom allows you to pitch tents, test sleeping pads on simulated granite surfaces, and consult with our gear experts.',
          },
          {
            q: 'Do you ship to APO/FPO and international backcountry destinations?',
            a: 'Yes, we ship globally via USPS Priority, FedEx International, and DHL Express.',
          },
        ],
      },
    },
  },
};

export default storeOutdoor;
