/**
 * Starter content set — `store-gadgets`: Next-Gen EDC & Smart Hardware Gadgets.
 * Authentic copy for gallium nitride fast chargers, titanium everyday carry tools, MagSafe power hubs, and biometric tech essentials.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const gadgetProducts: CatalogItem[] = [
  {
    id: 'kx-gan-charger-140w',
    name: '140W GaN 4-Port Fast Travel Charger',
    price: 89,
    priceUnit: ' USD',
    sku: 'KX-PWR-GAN140-BLK',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    description:
      'Compact Gallium Nitride (GaN III) multi-port wall charger capable of powering a 16" MacBook Pro at full 140W speed alongside three simultaneous devices.',
    category: 'Power & Charging',
    badge: 'Bestseller',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 142,
    features: [
      'Next-Gen GaN III semiconductor technology (50% smaller than standard bricks)',
      'USB-C Power Delivery 3.1 supporting single-port 140W maximum output',
      'Dynamic power distribution across 3x USB-C and 1x USB-A ports',
      'Foldable US prongs with included UK, EU, and AU global travel adapters',
    ],
  },
  {
    id: 'kx-titanium-edc-tool',
    name: 'Aerospace Titanium Magnetic EDC Pocket Tool',
    price: 65,
    priceUnit: ' USD',
    sku: 'KX-EDC-TI-TOOL',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
    description:
      'Precision CNC-machined Grade 5 titanium multi-tool featuring magnetic slide utility blade holder, pry bar, bottle opener, and internal hex bit driver.',
    category: 'Everyday Carry',
    badge: 'EDC Essential',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 89,
    features: [
      'Machined from solid Grade 5 (Ti-6Al-4V) aerospace titanium billet',
      'Quick-change standard trapezoid utility blade mechanism (TSA compliant without blade)',
      'Integrated neodymium magnetic ball-detent slider with tactile click action',
      'Deep-carry stonewashed titanium pocket clip',
    ],
  },
  {
    id: 'kx-magsafe-charging-station',
    name: '3-in-1 Foldable MagSafe Wireless Charging Station',
    price: 110,
    priceUnit: ' USD',
    sku: 'KX-WRL-MAG-3IN1',
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
    description:
      'Anodized aluminum folding charging stand supporting official 15W MagSafe fast charging for iPhone, Apple Watch fast charging puck, and Qi AirPods tray.',
    category: 'Power & Charging',
    badge: 'Desk Upgrade',
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
    features: [
      'Official Qi2 / MagSafe 15W rapid magnetic wireless charging',
      'Precision hinge folds completely flat into a 12mm travel disc',
      'Bead-blasted CNC space gray aluminum with anti-scratch silicone pads',
      'Includes braided 1.5m 65W USB-C cable and silicone travel pouch',
    ],
  },
  {
    id: 'kx-smart-tracker-card',
    name: 'Ultra-Slim Smart Bluetooth Tracker Card (Find My)',
    price: 35,
    priceUnit: ' USD',
    sku: 'KX-TRK-CARD-SLM',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    description:
      '1.6mm credit-card-thin wallet tracker with Apple Find My network certification, 105dB loud ringer, and 3-year sealed battery life.',
    category: 'Smart Trackers',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 210,
    features: [
      'Ultra-thin 1.6mm profile fits in any standard wallet card slot',
      'Native integration with Apple Find My app and global mesh network',
      'IP67 Waterproof rating with robust ultrasonic sealed polycarbonate shell',
      'Separation alerts notify you immediately if you leave your wallet behind',
    ],
  },
  {
    id: 'kx-oled-powerbank',
    name: '27000mAh Laptop Power Bank with Smart OLED Display',
    price: 149,
    priceUnit: ' USD',
    sku: 'KX-BAT-27K-OLED',
    image: 'https://images.unsplash.com/photo-1609592424368-f9b1772ca33e?auto=format&fit=crop&w=800&q=80',
    description:
      'Airline-safe 99.9Wh power bank pushing combined 170W output with real-time IPS color display showing battery health, wattage, temperature, and cycle count.',
    category: 'Power & Charging',
    badge: 'Pro Power',
    inStock: true,
    rating: 5.0,
    reviewCount: 63,
    features: [
      '99.9Wh capacity (maximum allowed on commercial airline carry-on)',
      'Dual 140W + 30W USB-C bi-directional ultra-fast charging',
      'Real-time color OLED smart dashboard (voltage, current, remaining minutes)',
      'Automotive-grade 21700 lithium battery cells rated for 1,000+ cycles',
    ],
  },
  {
    id: 'kx-titanium-health-ring',
    name: 'Smart Ergonomic Biometric Titanium Health Ring',
    price: 279,
    priceUnit: ' USD',
    sku: 'KX-WBL-RNG-TI',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    description:
      'Sleek Grade 5 titanium smart ring with medical-grade photoplethysmography sensors tracking continuous HRV, sleep staging, blood oxygen, and skin temperature.',
    category: 'Wearables & Health',
    inStock: true,
    rating: 4.8,
    reviewCount: 55,
    features: [
      'Weighs only 3.2g with non-allergenic medical epoxy inner molding',
      'Up to 7 days of continuous battery life on a single 45-minute charge',
      '50m (5 ATM) water resistance for swimming and showering',
      'Zero monthly subscription fee—full lifetime access to iOS/Android health app',
    ],
  },
  {
    id: 'kx-aluminum-cable-dock',
    name: 'Modular Anodized Aluminum Desktop Cable Dock',
    price: 48,
    priceUnit: ' USD',
    sku: 'KX-DSK-DCK-MOD',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    description:
      'Weighted 450g solid aluminum desk organizer with magnetic silicone cable collars that prevent charging cords from slipping behind your workstation.',
    category: 'Desk Essentials',
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    features: [
      'Heavy solid aluminum block stays put without adhesives',
      'Includes 5 magnetic silicone cable collars for standard and braided cords',
      'Micro-suction silicone base leaves zero desk residue when moved',
      'Available in Matte Black, Space Gray, and Silver',
    ],
  },
  {
    id: 'kx-tech-pouch-cordura',
    name: 'Weatherproof Cordura EDC Tech Organizer Pouch',
    price: 58,
    priceUnit: ' USD',
    sku: 'KX-BAG-PCH-COR',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description:
      'Origami-style accordion tech organizer bag in 500D waterproof Cordura nylon with YKK AquaGuard zippers and 14 dedicated elastic organizer compartments.',
    category: 'Everyday Carry',
    inStock: true,
    rating: 4.9,
    reviewCount: 104,
    features: [
      '500D Waterproof Cordura outer shell with high-visibility ripstop interior',
      'Origami accordion layout opens flat on your desk for easy tool access',
      'Internal fleece-lined pocket sized for hard drives, power banks, or passport',
      'External grab handles and shoulder strap attachment loops',
    ],
  },
  {
    id: 'kx-electric-screwdriver',
    name: 'Precision Electric Screwdriver Kit 64-in-1',
    price: 69,
    priceUnit: ' USD',
    sku: 'KX-TLS-SCR-64PC',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80',
    description:
      'Rechargeable dual-torque electric screwdriver (0.2 / 0.05 N.m) with 360-degree shadowless shadow-free LED work light and 64 S2 steel precision bits in a pop-up case.',
    category: 'Makers & Tools',
    badge: 'Maker Favorite',
    inStock: true,
    rating: 4.9,
    reviewCount: 97,
    features: [
      'Dual-speed electric torque mode + 3.0 N.m manual torque lock',
      '64 Magnetic S2 steel bits (Torx, Pentalobe, Tri-wing, Hex, Phillips, Slotted)',
      'Integrated 3-LED circular shadowless workspace lighting',
      'Anodized aluminum magnetic pop-up ejector storage case',
    ],
  },
  {
    id: 'kx-uvc-sanitizing-capsule',
    name: 'UV-C Sanitizing Desk Capsule & Wireless Charger',
    price: 79,
    priceUnit: ' USD',
    sku: 'KX-SAN-CAP-WRL',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    description:
      'Dual medical-grade UV-C quartz tube chamber eliminating 99.9% of bacteria and viruses in 3 minutes, topped with a 15W Qi fast wireless charging lid.',
    category: 'Desk Essentials',
    inStock: true,
    rating: 4.7,
    reviewCount: 43,
    features: [
      '254nm Dual UV-C quartz lamps certified to eliminate 99.9% of pathogens',
      'Fits smartphones up to 7 inches, watches, keys, and eyewear',
      'Top surface acts as a standalone 15W Qi wireless charging pad',
      'Automatic safety shut-off sensor prevents UV light leakage when opened',
    ],
  },
  {
    id: 'kx-biometric-padlock',
    name: 'Smart Biometric Fingerprint Padlock',
    price: 52,
    priceUnit: ' USD',
    sku: 'KX-SEC-LCK-FNG',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    description:
      'Heavy-duty zinc alloy and stainless steel padlock with 0.2-second 360-degree capacitive fingerprint sensor, storing up to 20 unique fingerprints.',
    category: 'Security & Travel',
    inStock: true,
    rating: 4.8,
    reviewCount: 66,
    features: [
      'Instant 0.2-second capacitive 360-degree biometric recognition',
      'Stores up to 20 fingerprints (2 administrator + 18 authorized users)',
      'IP65 Weather-resistant zinc alloy casing and hardened steel shackle',
      'USB-C rechargeable battery lasts for 3,000 unlocks on a single charge',
    ],
  },
  {
    id: 'kx-magnetic-usb-adapter',
    name: 'Magnetic 240W USB-C Quick-Release Adapter (3-Pack)',
    price: 39,
    priceUnit: ' USD',
    sku: 'KX-ACC-MAG-240W',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    description:
      '24-pin gold-plated magnetic breakaway USB-C adapters supporting 240W Power Delivery and 40Gbps Thunderbolt 4 data transfer with 8K@60Hz video.',
    category: 'Power & Charging',
    inStock: true,
    rating: 4.9,
    reviewCount: 119,
    features: [
      'Supports full 240W EPR Power Delivery (48V / 5A fast charging)',
      '40Gbps Thunderbolt 4 / USB4 high-speed data transmission',
      'Prevents laptop damage from accidental cable tripping or yanking',
      'Gold-plated 24-pin design with LED power indicator light',
    ],
  },
];

export const storeGadgets: StarterContentSet = {
  id: 'store-gadgets',
  archetype: 'store',
  name: 'Next-Gen EDC & Smart Hardware',
  description:
    'Gallium nitride fast chargers, aerospace titanium EDC multi-tools, MagSafe folding power stations, and biometric smart hardware engineered in San Francisco.',
  niche: 'EDC lifestyle gadgets, modular smart devices & tech essentials',
  tags: [
    'gadgets',
    'edc',
    'smart-hardware',
    'gan-chargers',
    'magsafe',
    'titanium-tools',
    'tech-accessories',
    'dtc-store',
  ],
  needsPersonalization: false,
  themeId: 'cyber-slate-volt',
  business: {
    name: 'Kinetix Hardware Labs Inc.',
    shortName: 'Kinetix Labs',
    registrationNumber: 'US-CA-9284102',
    jurisdiction: 'California, United States (California Secretary of State)',
    governingLaw: 'the laws of the State of California and the United States',
    registeredAddress: '540 Howard Street, Suite 300, San Francisco, CA 94105, United States',
    email: 'support@kinetixlabs.example',
    phone: '+1 415 555 0198',
    website: 'kinetixlabs.example',
    supportHours: 'Monday – Friday, 08:30 – 17:30 (PST)',
  },
  brand: { logoText: 'Kinetix Labs' },
  meta: {
    title: 'Kinetix Labs — Next-Gen EDC Hardware & Modular Smart Gadgets',
    description:
      'Discover 140W GaN travel chargers, Grade 5 titanium EDC tools, Apple Find My tracker cards, and biometric smart hardware engineered in San Francisco.',
    ogImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },
  slots: {
    home: {
      hero: {
        badge: 'San Francisco Design Lab • Precision EDC',
        headline: 'Next-generation smart hardware for high-output',
        accentText: 'digital workflows',
        subtitle:
          'Kinetix Labs engineers modular GaN chargers, Grade 5 titanium pocket tools, and smart biometric hardware designed to streamline your daily carry.',
        primaryCta: { label: 'Shop The Hardware', href: '/catalog' },
        secondaryCta: { label: 'Explore Engineering Lab', href: '/about' },
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        trustBadges: ['GaN III Fast Charging Tech', 'Grade 5 Aerospace Titanium', '2-Year Comprehensive Warranty'],
      },
      trust: {
        variant: 'pills',
        title: 'Rigorous hardware testing & next-gen materials',
        items: [
          'USB-IF & Apple MFi Certified Hardware',
          'Grade 5 Aerospace Titanium',
          'Fire-Retardant Polycarbonate & CNC Aluminum',
          'Free Worldwide Express Delivery Over $75',
        ],
      },
      catalogue: {
        eyebrow: 'Hardware Edit',
        title: 'The Modern Everyday Carry Capsule',
        description:
          'High-wattage GaN charging stations, titanium pocket multi-tools, and smart biometric essentials engineered for modern digital nomads.',
        currency: 'USD',
        layout: 'products',
        items: gadgetProducts,
      },
      highlights: {
        eyebrow: 'Hardware Pillars',
        title: 'Engineered for durability, speed, and tactile satisfaction',
        description:
          'We test every PCB, thermal sink, and magnetic hinge through thousands of stress cycles to ensure flawless everyday reliability.',
        items: [
          {
            icon: 'Zap',
            title: 'GaN III Semiconductor Efficiency',
            description:
              'Gallium nitride architecture reduces heat generation by 40% while delivering double the charging wattage in half the physical volume.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Cpu',
            title: 'Smart Power Distribution',
            description:
              'Microcontroller algorithms dynamically allocate wattage across ports in real time to charge laptops, tablets, and phones simultaneously at peak speeds.',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Shield',
            title: 'CNC Grade 5 Titanium Billets',
            description:
              'Our EDC tools and wearables are carved from single blocks of aerospace titanium for unbreakable strength and featherweight pocket carry.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Sparkles',
            title: '2-Year Hardware Replacement',
            description:
              'All electronics and EDC accessories are covered by our no-fuss 24-month replacement guarantee. If it breaks, we replace it instantly.',
            image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      reviews: {
        eyebrow: 'User Reviews',
        title: 'Field tested by engineers and nomads',
        items: [
          {
            name: 'Alex Rivera',
            role: 'Hardware Systems Architect',
            location: 'San Francisco, CA',
            rating: 5,
            text: 'The 140W GaN Travel Charger and Magnetic USB-C Adapters completely decluttered my work bag. I can power my MacBook Pro and external monitor off one single brick without heating up.',
          },
          {
            name: 'Priya Sharma',
            role: 'Tech Journalist & Digital Nomad',
            location: 'Austin, TX',
            rating: 5,
            text: 'The Smart Biometric Health Ring and Find My Tracker Card are pure genius. The ring feels completely unnoticeable when typing and the battery lasts a solid week.',
          },
          {
            name: 'David Lindqvist',
            role: 'Product Designer',
            location: 'Stockholm',
            rating: 5,
            text: 'The machining quality of the Titanium EDC tool is astonishing. The magnetic slider action is as smooth as an ultra-luxury watch bezel.',
          },
        ],
      },
      cta: {
        headline: 'Upgrade your everyday carry ecosystem today',
        subtitle:
          'All orders ship within 24 hours with express courier tracking and our 30-day risk-free hardware trial.',
        primaryCta: { label: 'Explore The Full Inventory', href: '/catalog' },
        secondaryCta: { label: 'View Tech Specs', href: '/about' },
        guarantee: '30-Day Money-Back Guarantee • 2-Year Instant Replacement Warranty',
      },
    },
    offerings: {
      header: {
        headline: 'The Complete Hardware & EDC Lineup',
        subtitle:
          'Discover our full catalogue of GaN fast chargers, titanium pocket tools, MagSafe power docks, and biometric security essentials.',
      },
      catalogue: {
        eyebrow: 'Full Inventory',
        title: 'Chargers, EDC Tools & Smart Gear',
        description: '12 precision-engineered hardware gadgets designed for high-performance productivity and travel.',
        currency: 'USD',
        layout: 'products',
        categories: [
          'Power & Charging',
          'Everyday Carry',
          'Smart Trackers',
          'Wearables & Health',
          'Desk Essentials',
          'Makers & Tools',
          'Security & Travel',
        ],
        items: gadgetProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Engineered for reliability',
        items: [
          'GaN III Semiconductor Technology',
          'Grade 5 Aerospace Titanium',
          'Apple Find My Certified',
          '2-Year Full Hardware Warranty',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Is the 140W GaN charger safe for smaller devices like earbuds or smartwatches?',
            a: 'Yes. Our smart power IC automatically negotiates the exact voltage and amperage required by the connected device (from 5W trickle charging for AirPods up to 140W for high-draw laptops), preventing over-current and thermal damage.',
          },
          {
            q: 'How does the Ultra-Slim Tracker Card work with Apple Find My?',
            a: 'The card connects directly to Apple’s native Find My app without requiring third-party software. It leverages hundreds of millions of Apple devices worldwide to relay encrypted location updates securely.',
          },
          {
            q: 'Can the 27000mAh Power Bank be taken on commercial airplanes?',
            a: 'Yes. The battery is rated at 99.9 Watt-hours (Wh), which is strictly below the 100Wh FAA and TSA limit for carry-on baggage. You can fly with it globally without special carrier authorization.',
          },
          {
            q: 'What is your hardware replacement policy?',
            a: 'We offer an instant 2-year warranty on all electronic devices and lifetime structural warranty on titanium EDC tools. If any hardware fails under normal use, we ship a brand-new replacement immediately.',
          },
        ],
      },
      cta: {
        headline: 'Looking for corporate gifting or bulk hardware packages?',
        subtitle: 'Our San Francisco enterprise team offers customized laser engraving and corporate bundle pricing.',
        primaryCta: { label: 'Contact Corporate Team', href: '/contact' },
        secondaryCta: { label: 'Read Our Story', href: '/about' },
        guarantee: 'Insured express shipping worldwide • 30-day money-back satisfaction guarantee',
      },
    },
    about: {
      header: {
        headline: 'Precision Hardware for Modern Creators',
        subtitle: 'Bridging high-performance semiconductor engineering and minimalist everyday carry aesthetics.',
      },
      story: {
        eyebrow: 'Our Story',
        title: 'Eliminating bulky cords and disposable plastic gadgets',
        description: 'Kinetix Labs was founded in San Francisco by hardware engineers frustrated by heavy chargers, fragile cables, and generic tech accessories.',
        blocks: [
          {
            heading: 'Semiconductor Innovation',
            body: 'We leverage cutting-edge Gallium Nitride (GaN) and graphene thermal dissipation layers to shrink power electronics to fractions of their traditional size while unlocking higher charging speeds.',
          },
          {
            heading: 'Built with Aerospace-Grade Materials',
            body: 'From Grade 5 titanium pocket tools to CNC anodized aluminum desk docks and waterproof Cordura pouches, every Kinetix product is built to endure decades of daily carry.',
          },
        ],
        highlights: [
          'Silicon Valley design and rapid prototyping facility in San Francisco',
          '100% Recyclable aluminum chassis and plastic-free packaging',
          'Certified compliance with CE, FCC, RoHS, and USB-IF specifications',
          'Dedicated hardware firmware updates and customer engineering support',
        ],
      },
      values: {
        eyebrow: 'Core Standards',
        title: 'The four engineering rules of Kinetix',
        items: [
          {
            icon: 'Zap',
            title: 'Maximum Power Density',
            description: 'We strive for the highest power-to-volume ratio possible without compromising thermal dissipation.',
          },
          {
            icon: 'Shield',
            title: 'Tactile Resilience',
            description: 'Solid metal touchpoints, satisfying magnetic snaps, and indestructible aerospace materials.',
          },
          {
            icon: 'Leaf',
            title: 'Circular Electronics',
            description: 'Zero single-use plastics and fully modular component designs that eliminate electronic waste.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Certified Safety',
            description: 'Over-voltage, over-temperature, and short-circuit multi-stage protection built into every PCB.',
          },
        ],
      },
      cta: {
        headline: 'Elevate your daily carry setup today',
        subtitle: 'Explore our latest lineup of next-generation hardware and modular gadgets.',
        primaryCta: { label: 'Browse The Collection', href: '/catalog' },
        secondaryCta: { label: 'Connect With The Lab', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'Get in Touch with Kinetix Labs',
        subtitle: 'Have questions about charging compatibility, device pairing, or order tracking? Contact our San Francisco team.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Customer Support',
        items: [
          {
            q: 'How fast do orders ship?',
            a: 'All in-stock orders placed before 2 PM PST ship the same business day from our automated California fulfillment center.',
          },
          {
            q: 'Do you ship to international addresses?',
            a: 'Yes, we ship globally with tracked courier delivery to over 70 countries worldwide.',
          },
        ],
      },
    },
  },
};

export default storeGadgets;
