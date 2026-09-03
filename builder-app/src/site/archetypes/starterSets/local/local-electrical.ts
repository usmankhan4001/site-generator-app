/**
 * Starter content set — `local-electrical`: licensed electrical installations & smart home specialists.
 * Authentic copy for EV charger installations, fuse box / switchboard upgrades, smart lighting, and rewiring.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const localElectrical: StarterContentSet = {
  id: 'local-electrical',
  archetype: 'local',
  name: 'Licensed Electrical & Smart Home',
  description:
    'Licensed master electricians specializing in smart home automation, EV charger installations, main switchboard upgrades, and domestic safety compliance.',
  niche: 'Licensed electrical & smart home installations',
  tags: ['electrical', 'electrician', 'smart-home', 'ev-chargers', 'switchboard-upgrade', 'rewiring', 'local-contractor'],
  needsPersonalization: false,
  themeId: 'cyber-slate-volt',
  business: {
    name: 'Vanguard Smart Electrical Contractors Pty Ltd',
    shortName: 'Vanguard Electrical',
    registrationNumber: 'ABN 48 619 402 783',
    jurisdiction: 'Victoria, Australia (ASIC & Energy Safe Victoria REC #29481)',
    governingLaw: 'the laws of the State of Victoria, Australia',
    registeredAddress: '18-22 Bridge Road, Richmond, VIC 3121, Australia',
    email: 'service@vanguardelectrical.example',
    phone: '+61 3 9429 8810',
    website: 'vanguardelectrical.example',
    supportHours: 'Monday – Friday, 07:00 – 17:30 • 24/7 Emergency On-Call',
  },
  brand: { logoText: 'Vanguard Electrical' },
  meta: {
    title: 'Vanguard Electrical — Licensed Master Electricians & Smart Home Specialists',
    description:
      'Certified electrical contractors in Melbourne providing Level 2 switchboard upgrades, Tesla/universal EV charger installations, and KNX/Lutron smart automation.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Energy Safe Victoria REC #29481 • Master Electricians Certified',
        headline: 'Licensed electrical installations,',
        accentText: 'engineered for modern power',
        subtitle:
          'From fast residential EV charger installations and RCBO safety switchboard upgrades to custom architectural LED lighting and smart home automation. Transparent quotes, clean workmanship, and lifetime electrical safety certificates.',
        primaryCta: { label: 'Book Electrician Today', href: '/contact' },
        secondaryCta: { label: 'View Installation Rates', href: '/services' },
        trustBadges: ['Licensed & Insured (REC #29481)', '$20M Public Liability Coverage', 'Lifetime Workmanship Guarantee'],
      },
      trust: {
        variant: 'pills',
        title: 'Industry certifications & compliance guarantees',
        items: [
          'Registered Electrical Contractor (REC #29481)',
          'Approved Tesla & Universal EV Charger Installer',
          'Certified Lutron & KNX Smart Home Integrator',
          'Official Certificate of Electrical Safety (COES) Provided',
        ],
      },
      services: {
        eyebrow: 'Our Expertise',
        title: 'Master electrical & automation services',
        description:
          'Future-proof your home with modern electrical infrastructure designed for high-capacity renewable energy and smart devices.',
        items: [
          {
            icon: 'Zap',
            title: 'EV Charger Installation',
            description:
              'Dedicated single and 3-phase circuit installations for Tesla Wall Connectors, Zappi, Ocular, and Schneider universal home chargers.',
          },
          {
            icon: 'ShieldCheck',
            title: 'Switchboard & RCD Upgrades',
            description:
              'Replacement of old ceramic fuses with modern RCBO residual current circuit breakers, surge protection devices, and smart power metering.',
          },
          {
            icon: 'Lightbulb',
            title: 'Architectural LED & Smart Lighting',
            description:
              'Custom recessed downlighting, circadian dimming systems, exterior landscaping illumination, and app-controlled Lutron Caséta integration.',
          },
          {
            icon: 'Cpu',
            title: 'Smart Home Automation & Data',
            description:
              'Structured Cat6A data cabling, mesh Wi-Fi access point distribution, smart intercoms, and motorized blind relays.',
          },
        ],
      },
      process: {
        eyebrow: 'Our Process',
        title: 'Safe, punctual, and certified from start to finish',
        description:
          'We treat your home with total respect — shoe covers, drop cloths, and full cleanup on every project.',
        steps: [
          {
            step: '01',
            title: 'Consultation & Load Assessment',
            description:
              'We evaluate your current main power supply capacity, phase configuration, and specific equipment load requirements.',
            duration: 'Day 1',
          },
          {
            step: '02',
            title: 'Clear Itemized Fixed Quote',
            description:
              'You receive a detailed scope of works with all parts, cable specifications, labor, and safety certification fees explicitly laid out.',
            duration: 'Same Day',
          },
          {
            step: '03',
            title: 'Clean, Punctual Installation',
            description:
              'Our uniformed master electricians arrive on time with fully stocked vehicles, laying floor protection before beginning work.',
            duration: 'Scheduled Time',
          },
          {
            step: '04',
            title: 'Mandatory Testing & Certificate (COES)',
            description:
              'We perform earth fault loop impedance testing, polarity checks, and submit your official Energy Safe Victoria Certificate of Electrical Safety.',
            duration: 'Immediate Sign-Off',
          },
        ],
      },
      reviews: {
        eyebrow: 'Customer Feedback',
        title: 'Melbourne homeowners review our electrical work',
        items: [
          {
            name: 'Damian Ross',
            role: 'Homeowner',
            location: 'Richmond, Melbourne',
            rating: 5,
            text: 'Vanguard installed our Tesla Wall Connector and upgraded our 1970s switchboard to a modern RCBO setup. The cable runs through our garage ceiling are invisible and the team left the workspace spotless.',
          },
          {
            name: 'Fiona Macpherson',
            role: 'Interior Designer',
            location: 'South Yarra',
            rating: 5,
            text: 'I regularly recommend Vanguard for all my residential renovation projects. Their understanding of architectural LED temperature, dimming protocols, and smart switching is second to none.',
          },
          {
            name: 'Liam Zhang',
            role: 'Property Owner',
            location: 'Hawthorn',
            rating: 5,
            text: 'Called them for an urgent fault when half our power circuits tripped. The technician arrived in 45 minutes, diagnosed a neutral fault behind an outdoor socket in 15 minutes, and had it fully rectified.',
          },
        ],
      },
      pricing: {
        eyebrow: 'Upfront Pricing',
        title: 'Popular Installation Packages',
        description:
          'Fixed upfront pricing for common domestic installations. Custom quotes available for full rewires.',
        currency: 'AUD',
        layout: 'products',
        items: [
          {
            id: 'ev-install-pkg',
            name: 'Standard Home EV Charger Install',
            price: 850,
            priceUnit: ' AUD',
            description:
              'Complete installation of customer-supplied 7kW–22kW EV charger with dedicated 32A Type B RCBO breaker and up to 15m cabling.',
            category: 'EV Charging',
            badge: 'Most Popular',
            popular: true,
            inStock: true,
            features: [
              'Dedicated 32A RCBO Protection',
              'Heavy-Duty Heavy Copper Run (Up to 15m)',
              'Commissioning & Smartphone App Pairing',
              'Energy Safe Certificate (COES) Included',
            ],
          },
          {
            id: 'switchboard-pkg',
            name: 'Safety Switchboard Complete Upgrade',
            price: 1250,
            priceUnit: ' AUD',
            description:
              'Complete removal of obsolete ceramic fuses, installed with 12x modern individual safety RCBO breakers and surge protection.',
            category: 'Safety & Power',
            badge: 'Essential Safety',
            inStock: true,
            features: [
              'Enclosed Flame-Retardant Metal Enclosure',
              'Individual Safety Switch on Every Circuit',
              'Whole-Home Surge Arrester Module',
              'Full Electrical Safety Audit & COES',
            ],
          },
          {
            id: 'downlight-pkg',
            name: 'Smart LED Downlight Conversion (10 Pack)',
            price: 690,
            priceUnit: ' AUD',
            description:
              'Supply and precision installation of 10x premium IC-4 fire-rated architectural LED downlights with tri-colour warmth selection.',
            category: 'Lighting',
            inStock: true,
            features: [
              'Energy Efficient 9W 90+ CRI LEDs',
              'Tri-Colour Switchable (3000K/4000K/5000K)',
              'Trailing Edge Flicker-Free Dimming',
              '5-Year Manufacturer Warranty on Fixtures',
            ],
          },
        ],
      },
      cta: {
        headline: 'Book your licensed electrician today',
        subtitle:
          'Contact our Richmond dispatch team for fast scheduling across Melbourne eastern, northern, and bayside suburbs.',
        primaryCta: { label: 'Book Service Online', href: '/contact' },
        secondaryCta: { label: 'Call Our Master Electricians', href: '/contact' },
        guarantee: 'Zero unexpected pricing • Lifetime workmanship warranty on all installations',
      },
      contact: {
        eyebrow: 'Fast Booking',
        title: 'Book an Electrician or Request a Quote',
        description: 'Fill out our quick form and our service manager will confirm your booking within 30 minutes.',
        formVariant: 'standard',
        showDetails: true,
        supportHours: 'Monday – Friday, 07:00 – 17:30 • 24/7 Emergency On-Call',
        inquiryOptions: [
          'EV Home Charger Installation',
          'Switchboard / Safety Switch Upgrade',
          'LED Lighting & Smart Dimmers',
          'Electrical Fault Finding / Emergency',
          'Full House Rewiring & Renovation',
        ],
      },
    },
  },
};

export default localElectrical;
