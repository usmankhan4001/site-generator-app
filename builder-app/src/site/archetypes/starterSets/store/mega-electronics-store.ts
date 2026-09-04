/**
 * Starter content set — `mega_electronics_store`: VoltTech Gear & Audio.
 * Authentic copy for pro audio electronics, planar magnetic headphones, discrete R2R DACs,
 * active nearfield monitors, stock scarcity badges, discount badges, and mega-catalog e-commerce.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const proAudioProducts: CatalogItem[] = [
  {
    id: 'volttech-planar-pro',
    name: 'VoltTech Master Reference Planar Headphones',
    price: 799,
    priceUnit: ' USD',
    sku: 'VT-AUD-PLN-90',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description:
      'Open-back flagship reference headphones featuring 92mm ultra-thin nanometer planar diaphragms, CNC aircraft aluminum chassis, and genuine lambskin memory foam ear cushions.',
    category: 'Headphones',
    badge: 'Save $200 · Flash Deal',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 148,
    features: [
      '92mm Nanometer-thin planar magnetic drivers with Neodymium N52 magnets',
      'Ultra-wide frequency response: 4Hz – 60,000Hz (THD < 0.03%)',
      'Acoustic diffractive waveguide for panoramic holographic soundstage',
      'Dual 4-pin mini-XLR balanced cable inputs with 4.4mm Pentaconn plug',
    ],
  },
  {
    id: 'volttech-r2r-dac',
    name: 'Discrete 24-Bit R2R Ladder DAC & Preamp',
    price: 1290,
    priceUnit: ' USD',
    sku: 'VT-DAC-R2R-24',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80',
    description:
      'Fully discrete 24-bit balanced resistor ladder DAC featuring dual FPGA digital clock filtering, native DSD1024 decoding, and Class-A preamp outputs.',
    category: 'DACs & Amps',
    badge: 'Only 3 left in stock',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 86,
    features: [
      'Discrete 0.005% precision matched thin-film resistor network',
      'Dual Femtosecond ultra-low phase noise OCXO crystal oscillators',
      'Outputs: Balanced XLR, single-ended RCA, 4.4mm headphone out',
      'Lossless Bluetooth 5.3 with LDAC, aptX Adaptive, and LHDC 5.0',
    ],
  },
  {
    id: 'volttech-studio-monitors',
    name: 'Active Coaxial 6.5" Studio Monitor Pair',
    price: 1050,
    priceUnit: ' USD',
    sku: 'VT-SPK-COAX-65',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description:
      'Coaxial point-source nearfield monitors with 6.5" woven Kevlar woofer and 1" titanium dome tweeter powered by 300W Class-D DSP amplification.',
    category: 'Studio Monitors',
    badge: 'Top Studio Pick',
    inStock: true,
    rating: 4.9,
    reviewCount: 74,
    features: [
      'True point-source coaxial acoustic alignment for razor-sharp imaging',
      '300W Bi-amplified Pascal Class-D power modules with zero idle hiss',
      'Integrated 56-bit DSP with 8-band room acoustic calibration EQ',
      'AES3 digital inputs and balanced analog XLR / TRS combo jacks',
    ],
  },
  {
    id: 'volttech-silver-cable',
    name: 'Monocrystalline Pure Silver 4.4mm Balanced Cable',
    price: 189,
    priceUnit: ' USD',
    sku: 'VT-CBL-AG-44',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    description:
      '8-core OCC 99.9999% pure monocrystalline silver headphone cable with cryogenically treated Rhodium-plated connectors and ultra-flexible Teflon jacket.',
    category: 'Cables & Power',
    badge: 'Popular Upgrade',
    inStock: true,
    rating: 4.8,
    reviewCount: 119,
    features: [
      '8-Core braided monocrystalline 7N OCC pure silver wire',
      'Deep cryogenic treatment (-196°C) for optimal crystal lattice conduction',
      'Custom gold-plated 4-pin mini XLR to 4.4mm Pentaconn termination',
      'Microphonic-free soft medical-grade transparent outer sleeve',
    ],
  },
  {
    id: 'volttech-linear-power',
    name: 'Ultra-Low Noise Dual Linear Power Supply',
    price: 340,
    priceUnit: ' USD',
    sku: 'VT-PWR-LPS-12V',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    description:
      'Custom 100VA toroidal transformer with discrete Schottky diodes and ultra-low noise linear regulators delivering ripple-free DC power under 1.2μV.',
    category: 'Cables & Power',
    badge: 'Only 5 left in stock',
    inStock: true,
    rating: 4.9,
    reviewCount: 52,
    features: [
      'Dual independent isolated 12V/5A and 5V/3A DC outputs',
      'Toroidal transformer shielded in solid CNC aluminum mu-metal case',
      'Ultra-low ripple noise (< 1.2 microvolts RMS at full load)',
      'OLED real-time voltage and current draw diagnostic display',
    ],
  },
  {
    id: 'volttech-aluminum-stand',
    name: 'Machined Billet Aluminum Headphone Stand',
    price: 95,
    priceUnit: ' USD',
    sku: 'VT-ACC-STND-AL',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description:
      'Solid 2.2kg aerospace-grade 6061 CNC billet aluminum stand with contoured walnut leather headband rest and integrated weighted cable cradle.',
    category: 'Accessories',
    badge: 'Save 20%',
    inStock: true,
    rating: 4.9,
    reviewCount: 167,
    features: [
      'Precision machined from a solid 6061 aircraft aluminum billet',
      'Curved genuine Italian saddle leather headband support',
      'Non-slip silicone footings with vibration dampening base',
      'Integrated rear magnetic cable winding channel',
    ],
  },
];

export const megaElectronicsStore: StarterContentSet = {
  id: 'mega_electronics_store',
  archetype: 'store',
  name: 'VoltTech Gear & Audio',
  description:
    'Direct-to-consumer pro audio electronics and audiophile gear mega-store featuring planar magnetic headphones, discrete R2R ladder DACs, nearfield studio monitors, and precision acoustic accessories.',
  niche: 'Pro Audiophile Electronics & Studio Gear',
  tags: [
    'electronics',
    'pro-audio',
    'audiophile',
    'headphones',
    'dac-amp',
    'studio-monitors',
    'mega-store',
    'dtc-hardware',
  ],
  needsPersonalization: false,
  themeId: 'blueprint-navy',
  accent: '#0284c7',
  layoutSystem: 'signal',
  business: {
    name: 'VoltTech Electronics International Limited',
    shortName: 'VoltTech Gear',
    registrationNumber: 'HK-3190824',
    jurisdiction: 'Hong Kong SAR (WEEE & CE Directive Compliant)',
    governingLaw: 'the laws of the Hong Kong Special Administrative Region',
    registeredAddress: 'Two International Finance Centre, 8 Finance Street, Central, Hong Kong',
    email: 'orders@volttechgear.example',
    phone: '+852 2810 9922',
    website: 'volttechgear.example',
    taxId: 'HK-BR-74910283',
    supportHours: 'Monday – Saturday, 08:00 – 20:00 (HKT) · 24/7 Global Order Tracking',
  },
  brand: {
    logoText: 'VoltTech Gear',
  },
  header: {
    variant: 'corporate_utility',
    sticky: true,
    showAnnouncement: true,
    announcementText: '🔥 FLASH SALE: Save up to $200 on Planar Reference Headphones & R2R DACs',
    announcementLink: { label: 'Shop Flash Deals', href: '/catalog' },
    utilityLinks: [
      { label: 'Free Worldwide Express over $150', href: '/catalog' },
      { label: '30-Day Acoustic Trial', href: '/about' },
      { label: 'Track Order', href: '/contact' },
    ],
  },
  headerCta: {
    label: 'Browse Mega Catalog',
    href: '/catalog',
  },
  meta: {
    title: 'VoltTech Gear & Audio — Direct-to-Consumer Pro Audio Electronics',
    description:
      'Shop flagship planar magnetic headphones, discrete R2R DAC amplifiers, and studio monitors directly from the manufacturer with 3-year warranty and free DHL Express.',
    ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    variant: 'corporate_utility',
    tagline:
      'VoltTech Electronics International Limited — Two International Finance Centre, 8 Finance Street, Central, Hong Kong. HK Companies Registry No. 3190824. Precision acoustics engineered for discerning audiophiles and mixing engineers worldwide.',
    secondaryLegalText:
      'Authorized direct-to-consumer distributor. All products CE, FCC, RoHS, and WEEE compliant. Covered by our comprehensive 3-Year Factory Warranty and 30-Day In-Home Acoustic Evaluation Guarantee.',
    badgeText: 'Official Manufacturer Direct · 3-Year Warranty · 30-Day Risk-Free Trial · CE/RoHS Certified',
    columns: [
      {
        title: 'Product Categories',
        links: [
          { label: 'Planar Magnetic Headphones', href: '/catalog' },
          { label: 'Discrete R2R DACs & Amps', href: '/catalog' },
          { label: 'Active Nearfield Monitors', href: '/catalog' },
          { label: 'OCC Pure Silver Cables', href: '/catalog' },
          { label: 'Linear Power Supplies', href: '/catalog' },
        ],
      },
      {
        title: 'Customer Guarantee',
        links: [
          { label: '30-Day In-Home Acoustic Trial', href: '/about' },
          { label: '3-Year Factory Warranty Registration', href: '/about' },
          { label: 'Global DHL Express Shipping Info', href: '/policies/shipping' },
          { label: 'Returns & RMA Portal', href: '/policies/refund' },
          { label: 'Technical Support & Firmware', href: '/contact' },
        ],
      },
      {
        title: 'Legal & Compliance',
        links: [
          { label: 'Terms & Conditions of Sale', href: '/policies/terms' },
          { label: 'Privacy & Cookie Policy', href: '/policies/privacy' },
          { label: 'WEEE & Environmental Directives', href: '/policies/terms' },
          { label: 'Airwallex Verified Payments', href: '/checkout' },
        ],
      },
    ],
  },
  slots: {
    home: {
      hero: {
        variant: 'lead_form',
        badge: 'Pro Audiophile & Studio Electronics Season 2026',
        headline: 'Studio-grade acoustics &',
        accentText: 'next-gen hardware direct from the source',
        subtitle:
          'VoltTech delivers high-end planar magnetic headphones, discrete R2R ladder DACs, and active coaxial studio monitors without distributor markups. Backed by a 3-year warranty and 30-day in-home trial.',
        primaryCta: { label: 'Shop Mega Catalog', href: '/catalog' },
        secondaryCta: { label: 'Claim 15% VIP Voucher', href: '/contact' },
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
        trustBadges: [
          '3-Year Manufacturer Warranty',
          'Free DHL Express Worldwide ($150+)',
          '30-Day In-Home Acoustic Trial',
          'Over 40,000 Verified Audiophiles',
        ],
        leadForm: {
          title: 'Claim Exclusive 15% VIP Voucher',
          description: 'Receive an instant discount code for your first planar headphone or DAC order.',
          submitLabel: 'Get Instant 15% Coupon Code',
          fields: ['name', 'email', 'phone'],
        },
      },
      trust: {
        variant: 'pills',
        title: 'Industry-Certified Standards & Audio Protocols',
        items: [
          'Hi-Res Audio Certified',
          'Qualcomm aptX Lossless',
          'Sony LDAC 990kbps',
          'Native DSD1024 Master',
          '3-Year Factory Warranty',
          '30-Day Risk-Free Trial',
        ],
      },
      catalogue: {
        variant: 'mega_catalog',
        eyebrow: 'Featured Hardware',
        title: 'Flagship Audio Gear & Studio Hardware',
        description:
          'Direct-from-factory inventory ready for immediate same-day dispatch. Real-time stock levels.',
        currency: 'USD',
        items: proAudioProducts,
        categories: ['All', 'Headphones', 'DACs & Amps', 'Studio Monitors', 'Cables & Power', 'Accessories'],
      },
      highlights: {
        variant: 'asymmetric_bento',
        eyebrow: 'Engineering Excellence',
        title: 'Why mastering engineers & audiophiles choose VoltTech',
        description:
          'We invest in CNC chassis, matched discrete components, and acoustic waveguides instead of paid influencer endorsements.',
        items: [
          {
            icon: 'Activity',
            title: 'Sub-0.005% Resistor Ladder Tolerance',
            description:
              'Every R2R resistor array is laser-trimmed and thermally stabilized to ensure bit-perfect digital-to-analog conversion without phase distortion.',
            badge: 'Discrete R2R',
            image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Volume2',
            title: '92mm Nanometer Planar Diaphragms',
            description:
              'Ultra-thin sub-micron polymer membranes suspended between dual symmetrical N52 neodymium magnetic arrays for instantaneous transient response.',
            badge: 'Planar Magnetic',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Zap',
            title: 'Ultra-Clean Linear Power Architecture',
            description:
              'Shielded toroidal transformers and multi-stage discrete Schottky regulation filtering ripple noise below 1.2 microvolts RMS.',
            badge: 'Clean Power',
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      reviews: {
        variant: 'rating_masonry',
        eyebrow: 'Customer Reviews',
        title: 'Verified Audiophile & Studio Ratings',
        description: 'Read unedited reviews from audio engineers, producers, and serious music enthusiasts.',
        items: [
          {
            name: 'Julian Hayes',
            role: 'Senior Mastering Engineer',
            company: 'Abbey Lane Mastering Labs',
            text: 'The VoltTech Planar Reference headphones have replaced my $2,500 German flagship cans on the mastering desk. The transient speed and holographic layering are astonishing. Being able to hear sub-bass texture down to 10Hz with zero distortion is a game changer.',
            rating: 5,
          },
          {
            name: 'Michael Chang',
            role: 'Verified Customer',
            company: 'Audiophile Forum Moderator',
            text: 'The Discrete R2R Ladder DAC took my headphone rig to another dimension. Vocal timbres sound completely organic, without that artificial digital glare common in cheap delta-sigma chips. Plus, DHL Express got it to my door in Toronto in 48 hours!',
            rating: 5,
          },
          {
            name: 'Sarah Lindqvist',
            role: 'Electronic Music Producer',
            company: 'Stockholm Sound Collective',
            text: 'The coaxial nearfield studio monitors provide an uncanny point-source phantom center image. Mixes translate perfectly to club systems and cars on the first bounce. Outstanding value.',
            rating: 5,
          },
        ],
      },
      cta: {
        headline: 'Experience studio-grade acoustic clarity in your own listening room',
        subtitle:
          'Take advantage of our 30-Day In-Home Acoustic Trial. If you are not completely spellbound by the soundstage, return it for a 100% refund with prepaid return shipping.',
        primaryCta: { label: 'Shop The Entire Catalog', href: '/catalog' },
        secondaryCta: { label: 'Contact Audio Specialists', href: '/contact' },
        guarantee: 'All orders include 3-Year Manufacturer Warranty and 30-Day No-Questions-Asked Returns.',
      },
    },
    about: {
      header: {
        eyebrow: 'About VoltTech',
        headline: 'Direct-to-consumer acoustic engineering without marketing markup',
        subtitle:
          'Founded by veteran acoustic physicists and electrical engineers in Hong Kong, VoltTech was built to democratize high-end audio hardware.',
      },
      story: {
        eyebrow: 'Our Philosophy',
        title: 'Pure physics, discrete components, and honest pricing',
        description:
          'We believe that sublime musical reproduction should be accessible without traditional 5x distributor and dealer markups.',
        blocks: [
          {
            heading: 'Direct Manufacturing Accountability',
            body: 'We design, CNC machine, and assemble our hardware in our own dedicated manufacturing facility. By shipping direct to audiophiles worldwide, we invest 4x more budget into premium raw materials like titanium, OCC silver, and discrete resistor networks.',
          },
          {
            heading: 'The 30-Day In-Home Trial Commitment',
            body: 'Acoustics cannot be judged in a showroom. We encourage every customer to evaluate VoltTech gear in their own dedicated listening room for 30 full days with their favourite recordings.',
          },
        ],
        highlights: [
          'Over 40,000 units shipped to 65 countries worldwide',
          '3-Year comprehensive manufacturer warranty on all DACs, amps, and headphones',
          'Certified member of the Japan Audio Society (Hi-Res Audio standards)',
          '100% plastic-free recyclable luxury packaging',
        ],
      },
      values: {
        eyebrow: 'Core Standards',
        title: 'The engineering pillars behind our gear',
        description: 'How we achieve benchmark acoustic measurements and emotional musicality.',
        items: [
          {
            icon: 'Sliders',
            title: 'Measurable Precision',
            description: 'Ultra-low total harmonic distortion (THD < 0.005%) and Signal-to-Noise Ratios exceeding 130dB.',
          },
          {
            icon: 'ShieldCheck',
            title: '3-Year Factory Warranty',
            description: 'Comprehensive parts and labor coverage with regional service centers in Hong Kong, London, and Los Angeles.',
          },
          {
            icon: 'Truck',
            title: 'Express Global Logistics',
            description: 'Prepaid express international shipping with real-time tracking and zero customs hassle.',
          },
        ],
      },
      cta: {
        headline: 'Explore our direct-to-consumer audio catalog',
        subtitle: 'Upgrade your listening chain today with risk-free in-home evaluation.',
        primaryCta: { label: 'Browse All Products', href: '/catalog' },
      },
    },
    offerings: {
      header: {
        eyebrow: 'Product Catalog',
        headline: 'Direct-to-Consumer Audiophile & Studio Hardware',
        subtitle:
          'All items in stock and ready for immediate worldwide express dispatch. Choose your gear below.',
      },
      catalogue: {
        variant: 'mega_catalog',
        eyebrow: 'Store Catalog',
        title: 'Full Hardware Lineup',
        description: 'Filter by category or explore all available flagship components.',
        currency: 'USD',
        items: proAudioProducts,
        categories: ['All', 'Headphones', 'DACs & Amps', 'Studio Monitors', 'Cables & Power', 'Accessories'],
      },
      faq: {
        eyebrow: 'Ordering FAQ',
        title: 'Shipping, Warranty & Trial Inquiries',
        description: 'Everything you need to know about our ordering process.',
        items: [
          {
            q: 'How does the 30-Day In-Home Acoustic Trial work?',
            a: 'From the day your package is delivered, you have 30 days to test the gear. If you decide it is not for you, simply initiate an RMA through our support portal for a full refund and prepaid return label.',
          },
          {
            q: 'Are custom import taxes and duties included in the price?',
            a: 'Yes! All VoltTech shipments include prepaid customs clearance and duties for North America, the European Union, the UK, Australia, and Singapore.',
          },
          {
            q: 'What is covered under the 3-Year Manufacturer Warranty?',
            a: 'Our 3-year warranty covers all mechanical, electronic, and transducer defects. In the unlikely event of an issue, we provide rapid replacement or factory repair.',
          },
        ],
      },
      cta: {
        headline: 'Need technical advice on system pairing?',
        subtitle: 'Our in-house acoustic engineers are available via live chat and email to recommend the ideal DAC and cable pairings.',
        primaryCta: { label: 'Contact Audio Specialists', href: '/contact' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Customer Support',
        headline: 'Contact VoltTech Audio Concierge & Order Desk',
        subtitle:
          'Whether you need advice on headphone impedance matching or tracking an existing express shipment, we are here to assist.',
      },
      form: {
        eyebrow: 'Technical Inquiries',
        title: 'Audio Consultation & Support Request',
        description:
          'Submit your question below. An audio engineer or order support specialist will respond within 4 business hours.',
        formVariant: 'standard',
        submitLabel: 'Send Inquiry to Support Team',
        showDetails: true,
        supportHours: 'Monday – Saturday, 08:00 – 20:00 (HKT) · 24/7 Global Order Tracking',
        inquiryOptions: [
          'System Pairing & DAC Recommendations',
          'Order Tracking & Express DHL Delivery',
          '30-Day Trial RMA & Returns',
          '3-Year Warranty Registration & Service',
          'Wholesale & Pro Studio Bulk Procurement',
        ],
        offices: [
          {
            city: 'Hong Kong Global HQ',
            facility: 'Two International Finance Centre, 8 Finance Street',
            address: 'Central, Hong Kong',
            role: 'Corporate Headquarters, Engineering Lab & Global Fulfillment Hub',
          },
          {
            city: 'North America Support & RMA Center',
            facility: '1900 Avenue of the Stars',
            address: 'Los Angeles, CA 90067, USA',
            role: 'Regional Customer Service & Warranty Service Desk',
          },
        ],
      },
      faq: {
        eyebrow: 'Help Center',
        title: 'Fast Answers to Common Inquiries',
        description: 'Frequently requested support details.',
        items: [
          {
            q: 'How can I track my active order?',
            a: 'You will receive an automated email containing your DHL Express tracking number within 12 hours of placing your order.',
          },
        ],
      },
    },
  },
};
