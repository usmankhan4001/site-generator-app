/**
 * Starter content set — `store-electronics`: Audiophile Sound & Studio Electronics.
 * Authentic copy for planar magnetic headphones, balanced DAC amplifiers, nearfield studio monitors, and precision acoustic gear.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const electronicsProducts: CatalogItem[] = [
  {
    id: 'sn-planar-headphones',
    name: 'Planar Magnetic Reference Headphones',
    price: 699,
    priceUnit: ' GBP',
    sku: 'SN-AUD-PLN-PRO',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description:
      'Open-back reference headphones featuring 90mm ultra-thin nanometer planar diaphragms, CNC aircraft aluminum chassis, and genuine lambskin memory foam ear cushions.',
    category: 'Headphones',
    badge: 'Audiophile Reference',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 88,
    features: [
      '90mm Nanometer-thin planar magnetic drivers with Neodymium N52 magnets',
      'Ultra-wide frequency response: 5Hz – 55,000Hz (THD < 0.05%)',
      'Open-back acoustic geometry for expansive holographic soundstage',
      'Dual 4-pin mini-XLR balanced cable inputs with 4.4mm Pentaconn plug',
    ],
  },
  {
    id: 'sn-balanced-dac-amp',
    name: 'High-Res Balanced DAC & Headphone Amplifier',
    price: 450,
    priceUnit: ' GBP',
    sku: 'SN-DAC-AMP-BAL',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80',
    description:
      'Dual ESS Sabre ES9038PRO flagship DAC chips delivering native DSD512 and 32-bit/768kHz PCM with fully balanced Class-A 4000mW headphone amplifier.',
    category: 'DACs & Amps',
    badge: 'Flagship Core',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
    features: [
      'Dual ESS ES9038PRO 8-channel DAC architecture (132dB DNR)',
      '4000mW @ 32Ω high-current Class-A amplification circuit',
      'Outputs: 4-pin XLR balanced, 4.4mm balanced, 6.35mm single-ended',
      'High-resolution Bluetooth LDAC and aptX HD lossless receiver',
    ],
  },
  {
    id: 'sn-studio-monitors',
    name: 'Active Nearfield Studio Monitor Pair',
    price: 890,
    priceUnit: ' GBP',
    sku: 'SN-SPK-MON-PAIR',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description:
      'Bi-amplified 6.5" Kevlar woofer and 1" air-motion transformer (AMT) tweeter powered by 200W Class-D DSP amplification with room acoustic correction EQ.',
    category: 'Studio Monitors',
    badge: 'Studio Standard',
    inStock: true,
    rating: 4.9,
    reviewCount: 47,
    features: [
      'Custom Air Motion Transformer (AMT) folded ribbon tweeter',
      '6.5" Woven Kevlar cone woofer with low-resonance bass reflex port',
      'Integrated 56-bit DSP with 8-band parametric room calibration',
      'Balanced XLR and 1/4" TRS inputs with digital AES/EBU passthrough',
    ],
  },
  {
    id: 'sn-lossless-earbuds',
    name: 'Lossless ANC Wireless Audiophile Earbuds',
    price: 249,
    priceUnit: ' GBP',
    sku: 'SN-TWS-ANC-PRO',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    description:
      'Hybrid dual-driver true wireless earbuds featuring 10mm carbon nanotube dynamic driver and Knowles balanced armature with 48dB adaptive active noise cancellation.',
    category: 'Headphones',
    popular: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 134,
    features: [
      'Snapdragon Sound with Qualcomm aptX Lossless (16-bit 44.1kHz CD quality)',
      'Hybrid Dual Driver: 10mm Carbon Nanotube + Knowles Balanced Armature',
      '48dB Intelligent adaptive active noise cancellation with transparency mode',
      'Up to 36 hours total battery life with wireless charging case',
    ],
  },
  {
    id: 'sn-aluminum-stand',
    name: 'Cast Aluminum Desktop Headphone Stand',
    price: 75,
    priceUnit: ' GBP',
    sku: 'SN-ACC-STND-ALM',
    image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80',
    description:
      'Solid bead-blasted anodized aluminum headphone cradle designed to preserve headband curvature, with internal cable management channel and silicone base.',
    category: 'Accessories',
    inStock: true,
    rating: 4.9,
    reviewCount: 62,
    features: [
      'CNC-machined aerospace-grade 6061 aluminum (650g heavy base)',
      'Ergonomic contoured top cradle prevents leather headband stretching',
      'Concealed cable wrap groove in the rear pillar',
      'Non-slip acoustic silicone damping base pads',
    ],
  },
  {
    id: 'sn-silver-cable',
    name: 'Balanced Silver-Plated Audio Cable (2m)',
    price: 120,
    priceUnit: ' GBP',
    sku: 'SN-CAB-SLV-44MM',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description:
      '8-core OCC single-crystal copper silver-plated braided headphone cable with gold-plated 4.4mm balanced plug and dual 3.5mm connectors.',
    category: 'Cables & Interconnects',
    inStock: true,
    rating: 4.8,
    reviewCount: 39,
    features: [
      '8-Core 19-strand monocrystalline silver-plated copper (99.9999% OCC)',
      'Ultra-flexible transparent TPU insulation with zero microphonics',
      'Heavy gold-plated 4.4mm balanced audio termination',
      'Compatible with Focal, Hifiman, Sennheiser, and Sona headphones',
    ],
  },
  {
    id: 'sn-acoustic-panels',
    name: 'Modular Acoustic Diffusion Panels (Set of 4)',
    price: 210,
    priceUnit: ' GBP',
    sku: 'SN-ACS-PANEL-4PK',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    description:
      '60x60cm high-density quadratic residue sound diffusion and absorption acoustic panels crafted from solid ash wood and recycled acoustic felt.',
    category: 'Acoustic Treatment',
    inStock: true,
    rating: 4.9,
    reviewCount: 28,
    features: [
      'Mathematically calculated 2D QRD diffuser sequence for flutter echo elimination',
      'Internal dense mineral acoustic core absorbs mid/low frequencies (NRC 0.85)',
      'Solid sustainably sourced natural ash wood front baffle',
      'Tool-free magnetic wall mounting bracket kit included',
    ],
  },
  {
    id: 'sn-stepped-attenuator',
    name: 'Precision Stepped Attenuator Volume Controller',
    price: 180,
    priceUnit: ' GBP',
    sku: 'SN-VOL-STP-BAL',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=800&q=80',
    description:
      'Passive balanced studio volume controller utilizing 24-step discrete 0.1% metal-film resistor ladder for bit-perfect channel matching down to -60dB.',
    category: 'Studio Hardware',
    inStock: true,
    rating: 5.0,
    reviewCount: 21,
    features: [
      '100% Passive signal path with zero distortion or color (THD+N < 0.0001%)',
      '24-Step rotary switch with precision 0.1% Dale metal film resistors',
      'Sub-0.05dB left-to-right stereo channel balance across entire range',
      'Neutrik balanced XLR inputs and outputs in heavy steel chassis',
    ],
  },
  {
    id: 'sn-tube-phono-preamp',
    name: 'Hybrid Tube Phono Preamplifier',
    price: 380,
    priceUnit: ' GBP',
    sku: 'SN-PHN-PRE-TUBE',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    description:
      'Dual 12AX7 vacuum tube preamplifier for Moving Magnet (MM) and Moving Coil (MC) phono cartridges with precise RIAA equalization and switchable gain.',
    category: 'DACs & Amps',
    badge: 'Analog Warmth',
    inStock: true,
    rating: 4.9,
    reviewCount: 35,
    features: [
      'Matched pair of JJ Electronic 12AX7 gold-pin vacuum tubes',
      'Switchable MM (40dB) and MC (60dB) high-gain modes',
      'Precision passive RIAA equalization network (accuracy ±0.2dB)',
      'Toroidal external low-noise power supply prevents transformer hum',
    ],
  },
  {
    id: 'sn-walnut-turntable',
    name: 'Solid Walnut Belt-Drive Audiophile Turntable',
    price: 799,
    priceUnit: ' GBP',
    sku: 'SN-TRN-WAL-DRV',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
    description:
      'Heavy MDF and solid American walnut plinth turntable with isolated DC motor, carbon fiber 9-inch tonearm, and pre-mounted Ortofon 2M Bronze cartridge.',
    category: 'Turntables',
    badge: 'Masterpiece',
    inStock: true,
    rating: 5.0,
    reviewCount: 42,
    features: [
      'Resonance-damped solid American walnut multi-layer chassis (9.5kg)',
      '9-Inch one-piece seamless carbon fiber tonearm',
      'Pre-installed and factory-aligned Ortofon 2M Bronze nude fine-line cartridge',
      'Heavy 2.5kg frosted acrylic platter with inverted ceramic bearing',
    ],
  },
  {
    id: 'sn-wireless-transmitter',
    name: 'Ultra-Low Latency Lossless Wireless Transmitter',
    price: 135,
    priceUnit: ' GBP',
    sku: 'SN-TXR-WRL-LL',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    description:
      '2.4GHz uncompressed 24-bit/96kHz digital wireless transmitter and receiver pair delivering sub-5ms ultra-low latency for studio monitors and gaming.',
    category: 'Wireless Tech',
    inStock: true,
    rating: 4.8,
    reviewCount: 54,
    features: [
      '24-Bit / 96kHz uncompressed PCM broadcast (zero audio compression loss)',
      'Sub-5ms ultra-low latency eliminates lip-sync and monitoring delay',
      'Optical Toslink, USB-C, and 3.5mm analog auxiliary input modes',
      '30-meter robust wireless range through drywall and studio glass',
    ],
  },
  {
    id: 'sn-digital-audio-player',
    name: 'Portable High-Resolution Digital Audio Player',
    price: 520,
    priceUnit: ' GBP',
    sku: 'SN-DAP-HIRES-64',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description:
      'Android-based lossless audio player featuring dual Cirrus Logic CS43198 DACs, 5.0" HD touchscreen, open Android 13 with Bit-Perfect Direct Audio bypass.',
    category: 'Players & Sources',
    inStock: true,
    rating: 4.9,
    reviewCount: 31,
    features: [
      'Dual CS43198 MasterHIFI DACs with independent dual crystal oscillators',
      '4.4mm Balanced (600mW @ 32Ω) and 3.5mm single-ended outputs',
      'Open Android 13 with native Tidal, Qobuz, Apple Music, and Spotify support',
      'CNC milled unibody aluminum chassis with 14-hour continuous playback battery',
    ],
  },
];

export const storeElectronics: StarterContentSet = {
  id: 'store-electronics',
  archetype: 'store',
  name: 'Audiophile Sound & Studio Electronics',
  description:
    'Planar magnetic reference headphones, balanced ESS Sabre DACs, active nearfield monitors, and audiophile vinyl gear engineered in London.',
  niche: 'Studio audiophile sound & high-fidelity electronics',
  tags: [
    'electronics',
    'audiophile',
    'headphones',
    'dacs-amplifiers',
    'studio-monitors',
    'hi-fi-audio',
    'turntables',
    'dtc-store',
  ],
  needsPersonalization: false,
  themeId: 'carbon-defense',
  business: {
    name: 'Sona Acoustic Labs Ltd',
    shortName: 'Sona Acoustics',
    registrationNumber: '14902184',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '88 Clerkenwell Road, London EC1M 5RJ, United Kingdom',
    email: 'support@sona-acoustics.example',
    phone: '+44 20 7946 0741',
    website: 'sona-acoustics.example',
    supportHours: 'Monday – Friday, 09:00 – 17:30 (GMT)',
  },
  brand: { logoText: 'Sona Acoustics' },
  meta: {
    title: 'Sona Acoustics — High-Fidelity Audiophile Gear & Studio Electronics',
    description:
      'Precision planar magnetic headphones, balanced DAC amplifiers, nearfield studio monitors, and precision acoustic treatment engineered in Clerkenwell, London.',
    ogImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  },
  slots: {
    home: {
      hero: {
        badge: 'Engineered in London • Zero Harmonic Distortion',
        headline: 'Acoustic fidelity engineered to reveal every',
        accentText: 'nuance in the mix',
        subtitle:
          'Sona Acoustics designs planar magnetic reference headphones, flagship balanced DAC amplifiers, and nearfield studio monitors for audio engineers and discerning audiophiles.',
        primaryCta: { label: 'Explore Studio Gear', href: '/catalog' },
        secondaryCta: { label: 'Acoustic Lab Testing', href: '/about' },
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        trustBadges: ['Bit-Perfect 32-Bit/768kHz Audio', 'Planar Magnetic Nanometer Drivers', '3-Year Comprehensive Warranty'],
      },
      trust: {
        variant: 'pills',
        title: 'Laboratory precision & audiophile engineering standards',
        items: [
          'Dual ESS Sabre Flagship DAC Architecture',
          'THD+N < 0.0001% Signal Purity',
          'CNC Aircraft-Grade Anodized Aluminum',
          'Worldwide 48-Hour Insured Express Courier',
        ],
      },
      catalogue: {
        eyebrow: 'Studio & Hi-Fi Capsule',
        title: 'The Reference Hardware Edit',
        description:
          'Planar headphones, discrete Class-A headphone amplifiers, and balanced studio monitors calibrated for transparent acoustic reproduction.',
        currency: 'GBP',
        layout: 'products',
        items: electronicsProducts,
      },
      highlights: {
        eyebrow: 'Acoustic Pillars',
        title: 'Zero coloration, absolute spatial resolution',
        description:
          'We measure our acoustic drivers with state-of-the-art Audio Precision analyzers and GRAS artificial ear fixtures to ensure reference-grade accuracy.',
        items: [
          {
            icon: 'Activity',
            title: 'Nanometer Planar Diaphragms',
            description:
              'Ultra-thin conductive traces etched onto aerospace polymer membranes yield instantaneous transient response with zero cone breakup distortion.',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Cpu',
            title: 'Discrete Class-A Circuitry',
            description:
              'No integrated operational amplifier shortcuts. Hand-matched JFET and MOSFET transistor stages deliver lush warmth and limitless dynamic reserve.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Disc',
            title: 'Resonance-Damped Enclosures',
            description:
              'Milled from solid billet 6061 aluminum and dense acoustic hardwoods to absorb micro-vibrations and maintain an inky-black noise floor.',
            image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'ShieldCheck',
            title: '3-Year Masterpiece Warranty',
            description:
              'Every headphone driver, amplifier channel, and monitor transducer is backed by our full 36-month London atelier repair and calibration warranty.',
            image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      reviews: {
        eyebrow: 'Sound Engineer Reviews',
        title: 'Evaluated in mixing suites and master salons',
        items: [
          {
            name: 'Julian Thorne',
            role: 'Mastering Engineer',
            location: 'London (Abbey Road Alumni)',
            rating: 5,
            text: 'The Planar Magnetic Reference Headphones reveal micro-dynamics in the upper midrange that dynamic drivers simply smear. The spatial layering on orchestral masters is astonishing.',
          },
          {
            name: 'Oliver Vance',
            role: 'Music Producer & Composer',
            location: 'Berlin',
            rating: 5,
            text: 'The Balanced DAC/Amp is the quietest headphone amplifier I have ever bench-tested. Zero background hiss even on 8-ohm sensitive in-ear monitors.',
          },
          {
            name: 'Dr. Evelyn Sato',
            role: 'Acoustic Research Fellow',
            location: 'Tokyo',
            rating: 5,
            text: 'The Nearfield Studio Monitors with the AMT ribbon tweeters provide an effortless high-frequency extension without listening fatigue during 10-hour mix sessions.',
          },
        ],
      },
      cta: {
        headline: 'Experience uncompressed sound as the artist intended',
        subtitle:
          'Orders ship within 24 hours with express delivery and our 30-day risk-free in-studio audition guarantee.',
        primaryCta: { label: 'Shop The Entire Hardware Line', href: '/catalog' },
        secondaryCta: { label: 'Read Measurement Reports', href: '/about' },
        guarantee: '30-Day Studio Audition Guarantee • Free Insured Courier Delivery Worldwide',
      },
    },
    offerings: {
      header: {
        headline: 'The Reference Hardware Inventory',
        subtitle:
          'Discover our complete collection of planar magnetic headphones, balanced DAC amplifiers, nearfield monitors, and audiophile accessories.',
      },
      catalogue: {
        eyebrow: 'Full Inventory',
        title: 'Headphones, DACs, Monitors & Cables',
        description: '12 precision acoustic instruments engineered for reference monitoring and audiophile playback.',
        currency: 'GBP',
        layout: 'products',
        categories: [
          'Headphones',
          'DACs & Amps',
          'Studio Monitors',
          'Turntables',
          'Cables & Interconnects',
          'Acoustic Treatment',
          'Studio Hardware',
          'Wireless Tech',
          'Players & Sources',
          'Accessories',
        ],
        items: electronicsProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Audiophile credentials',
        items: [
          'Bit-Perfect DSD512 & PCM 768kHz',
          'Class-A Discrete Amplification',
          'Neutrik Balanced Interconnects',
          '3-Year London Warranty',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'Do planar magnetic headphones require a dedicated headphone amplifier?',
            a: 'While our planar headphones can be driven by high-output mobile devices, we strongly recommend pairing them with a balanced headphone amplifier (such as our High-Res Balanced DAC & Amp) to achieve full dynamic bass authority and open soundstage resolution.',
          },
          {
            q: 'What makes balanced audio connections superior?',
            a: 'Balanced audio utilizes differential signaling (positive, negative, and ground leads) which completely cancels out electromagnetic interference (EMI) and common-mode noise while providing double the output voltage and channel separation.',
          },
          {
            q: 'How do I position the Nearfield Studio Monitors in my room?',
            a: 'Place monitors in an equilateral triangle with your listening position, ear-level with the AMT tweeters. Use our integrated 56-bit DSP acoustic calibration switches on the rear panel to compensate for boundary bass reflections near walls.',
          },
          {
            q: 'What is your in-home audition policy?',
            a: 'We offer a 30-day studio trial. If you are not completely spellbound by the acoustic resolution and tonal fidelity, return your equipment in its original aluminum flight case for a full refund.',
          },
        ],
      },
      cta: {
        headline: 'Need acoustic consulting for your studio or listening room?',
        subtitle: 'Our Clerkenwell acoustic engineers are available for personalized equipment matching and room treatment advice.',
        primaryCta: { label: 'Consult An Acoustic Engineer', href: '/contact' },
        secondaryCta: { label: 'Read Technical Papers', href: '/about' },
        guarantee: 'Insured worldwide armored transit • 3-Year comprehensive warranty',
      },
    },
    about: {
      header: {
        headline: 'In Pursuit of Unadulterated Sound',
        subtitle: 'Founded in Clerkenwell to eliminate marketing gimmicks and return audio engineering to scientific precision.',
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'Acoustic transparency without compromise',
        description: 'Sona Acoustic Labs was founded by former BBC broadcast engineers and transducer physicists who refused to accept bloated bass and treble-harshness as "modern sound."',
        blocks: [
          {
            heading: 'Laboratory Precision & Rigorous Measurement',
            body: 'We publish full frequency response, cumulative spectral decay (waterfall), and total harmonic distortion (THD) graphs for every product we manufacture. We believe transparency in measurement is the foundation of trust.',
          },
          {
            heading: 'Crafted in Clerkenwell, London',
            body: 'All planar drivers are hand-tensioned, matched to within 0.2dB across left and right channels, and assembled in our cleanroom facility in London using aircraft-grade aluminum and ethically sourced hardwoods.',
          },
        ],
        highlights: [
          'Left/Right driver matching tolerance under ±0.2dB',
          'Lead-free silver soldering on all audio signal paths',
          'Modular repairable architecture for lifetime serviceability',
          'Zero synthetic plastic housings across our reference lineup',
        ],
      },
      values: {
        eyebrow: 'Core Standards',
        title: 'The four engineering principles of Sona',
        items: [
          {
            icon: 'Activity',
            title: 'Measurement Honesty',
            description: 'We publish unvarnished APx555 audio analyzer measurement plots for every hardware revision.',
          },
          {
            icon: 'Shield',
            title: 'Machined Billet Durability',
            description: 'We carve enclosures from solid aerospace aluminum blocks to ensure lifetime mechanical rigidity.',
          },
          {
            icon: 'Sparkles',
            title: 'Class-A Signal Purity',
            description: 'Zero crossover distortion and discrete analog component paths for pristine musicality.',
          },
          {
            icon: 'Wrench',
            title: 'Enduring Serviceability',
            description: 'All headphone headband yokes, cables, and amplifier boards are modular and replaceable for life.',
          },
        ],
      },
      cta: {
        headline: 'Elevate your listening experience to the master level',
        subtitle: 'Explore our reference headphones, DACs, and studio acoustic monitors.',
        primaryCta: { label: 'Explore Hardware', href: '/catalog' },
        secondaryCta: { label: 'Connect With The Lab', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'Connect With Sona Acoustic Labs',
        subtitle: 'Have questions about headphone synergy, balanced cables, or studio monitor placement? Contact our London engineers.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Technical & Service Support',
        items: [
          {
            q: 'Can I visit the Clerkenwell sound salon to audition gear?',
            a: 'Yes. Our London listening room is open by appointment for private, uninterrupted listening sessions with reference vinyl and high-resolution master tracks.',
          },
          {
            q: 'Do you offer replacement ear pads and modular cables?',
            a: 'Yes. We stock replacement lambskin and velour ear cushions, balanced cables, and headband parts for all current and legacy models.',
          },
        ],
      },
    },
  },
};

export default storeElectronics;
