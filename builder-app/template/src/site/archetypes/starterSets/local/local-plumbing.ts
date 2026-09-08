/**
 * Starter content set — `local-plumbing`: emergency plumbing & heating maintenance contractors.
 * Authentic copy for 24/7 rapid response plumbing, boiler repairs, unblocking, and central heating maintenance.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const localPlumbing: StarterContentSet = {
  id: 'local-plumbing',
  archetype: 'local',
  name: 'Emergency Plumbing & Heating',
  description:
    'Licensed emergency plumbing, Gas Safe boiler diagnostics, central heating powerflushing, and pipe restoration with rapid 60-minute dispatch.',
  niche: 'Emergency plumbing & heating contractors',
  tags: ['plumbing', 'heating', 'gas-safe', 'emergency-repairs', 'boiler-service', 'local-contractor', 'trade'],
  needsPersonalization: false,
  themeId: 'deep-ocean-blue',
  business: {
    name: 'Crown & Flow Plumbing Services Ltd',
    shortName: 'Crown & Flow',
    registrationNumber: '11029841',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: 'Unit 4, Riverside Industrial Park, Thames Way, London SE10 0BH, United Kingdom',
    email: 'dispatch@crownandflow.example',
    phone: '+44 20 8921 4400',
    website: 'crownandflow.example',
    supportHours: '24/7 Emergency Dispatch • Office: Mon–Sat 07:30–18:00',
  },
  brand: { logoText: 'Crown & Flow' },
  meta: {
    title: 'Crown & Flow — 24/7 Emergency Plumbing & Heating Engineers in London',
    description:
      'Gas Safe certified plumbing and heating contractors with a guaranteed 60-minute emergency response across Greater London. Fixed transparent pricing.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Gas Safe Registered #594821 • 24/7 Emergency Response',
        headline: 'Fast, certified plumbing & heating',
        accentText: 'at transparent fixed rates',
        subtitle:
          'From burst mains and boiler breakdowns to full bathroom rough-ins. Our certified engineers arrive fully equipped in liveried vans within 60 minutes with zero hidden call-out fees.',
        primaryCta: { label: 'Book Emergency Engineer', href: '/contact' },
        secondaryCta: { label: 'View Fixed Pricing', href: '/services' },
        trustBadges: ['60-Min London Dispatch', 'No Hidden Call-Out Charges', '12-Month Workmanship Warranty'],
      },
      trust: {
        variant: 'pills',
        title: 'Accredited trade standards & customer guarantees',
        items: [
          'Gas Safe Registered Engineers (#594821)',
          'Which? Trusted Trader Certified',
          '£5M Public Liability Insured',
          '12-Month Full Guarantee on All Parts & Labor',
        ],
      },
      services: {
        eyebrow: 'Our Services',
        title: 'Complete plumbing & heating solutions',
        description:
          'Residential and commercial contractors equipped with thermal imaging cameras, drain snakes, and genuine OEM replacement parts.',
        items: [
          {
            icon: 'Flame',
            title: 'Boiler Repair & Installation',
            description:
              'Diagnostic troubleshooting, combi boiler swaps, annual safety certifications (CP12), and powerflushing for Worcester Bosch, Vaillant, and Viessmann systems.',
          },
          {
            icon: 'Wrench',
            title: '24/7 Emergency Leak Resolution',
            description:
              'Rapid isolation of burst pipes, leaking stopcocks, ceiling water egress, and ruptured cylinder tanks day or night.',
          },
          {
            icon: 'ShieldAlert',
            title: 'High-Pressure CCTV Drain Unblocking',
            description:
              'Rotary mechanical snaking, high-pressure water jetting, and high-definition CCTV camera surveys with full insurance reports.',
          },
          {
            icon: 'Home',
            title: 'Bathroom Renovations & Rough-In',
            description:
              'Full first and second-fix sanitary plumbing, unvented hot water cylinder installations, and underfloor heating loop balance.',
          },
        ],
      },
      process: {
        eyebrow: 'How We Work',
        title: 'Simple four-step dispatch process',
        description:
          'No vague arrival windows or unexpected surcharges. We keep you informed via SMS tracker every step of the way.',
        steps: [
          {
            step: '01',
            title: 'Immediate Contact & Diagnostic Triage',
            description:
              'Call our 24/7 dispatch desk or book online. Our senior technician helps you isolate your water stopcock over the phone if needed.',
            duration: '0–5 Mins',
          },
          {
            step: '02',
            title: 'GPS Tracked Van Dispatch',
            description:
              'We assign the closest liveried mobile workshop van. You receive a live GPS link and the engineer’s name and photo.',
            duration: 'Within 60 Mins',
          },
          {
            step: '03',
            title: 'On-Site Inspection & Fixed Quote',
            description:
              'The engineer inspects the fault, explains the repair clearly, and provides a binding written fixed-price quote before commencing work.',
            duration: '15 Mins',
          },
          {
            step: '04',
            title: 'Resolution, Testing & 12-Month Guarantee',
            description:
              'We complete the repair, pressure test the system, clean the work area thoroughly, and email your invoice and digital warranty.',
            duration: 'Same Day',
          },
        ],
      },
      reviews: {
        eyebrow: 'Local Reviews',
        title: 'Rated 4.9/5 by homeowners across London',
        items: [
          {
            name: 'Gareth Edwards',
            role: 'Homeowner',
            location: 'Greenwich, London',
            rating: 5,
            text: 'Had a burst pipe under our kitchen floorboards at 11 PM on a Sunday. Crown & Flow had an engineer on site in 40 minutes. He was calm, polite, had the exact compression fittings in his van, and fixed it without tearing up the tiles.',
          },
          {
            name: 'Sarah Jenkins',
            role: 'Landlord & Property Manager',
            location: 'Canary Wharf',
            rating: 5,
            text: 'I manage sixteen rental flats and Crown & Flow is my exclusive contractor. They handle annual CP12 gas safety checks and emergency tenant calls promptly with zero fuss.',
          },
          {
            name: 'Nigel Campbell',
            role: 'Homeowner',
            location: 'Blackheath',
            rating: 5,
            text: 'Replaced our 15-year-old boiler with a new Vaillant ecoTEC system. The installation was neat, the pipework is a work of art, and they left the utility room cleaner than they found it.',
          },
        ],
      },
      pricing: {
        eyebrow: 'Fixed Transparent Rates',
        title: 'Standard Service Pricing',
        description:
          'Clear fixed pricing with no hidden charges, travel fees, or parking surcharges.',
        currency: 'GBP',
        layout: 'products',
        items: [
          {
            id: 'svc-emergency-hour',
            name: 'Emergency Call-Out & First Hour',
            price: 110,
            priceUnit: ' GBP',
            description:
              'Rapid emergency arrival within 60 minutes covering full fault diagnosis and the first hour of labor.',
            category: 'Emergency',
            badge: '24/7 Available',
            popular: true,
            inStock: true,
            features: [
              'Guaranteed 60-Minute Response',
              'First Hour of Labor Included',
              'Thermal Camera Leak Detection',
              '12-Month Workmanship Warranty',
            ],
          },
          {
            id: 'svc-boiler-service',
            name: 'Annual Boiler Service & Safety Check',
            price: 95,
            priceUnit: ' GBP',
            description:
              'Comprehensive 32-point inspection, flue gas combustion analysis, filter cleaning, and Gas Safe digital certificate.',
            category: 'Boiler Care',
            badge: 'Recommended',
            inStock: true,
            features: [
              'Gas Safe Registered CP12 Certificate',
              'Flue Gas & Heat Exchanger Check',
              'Magnetic System Filter Cleanse',
              'Radiator Bleed & Pressure Balance',
            ],
          },
          {
            id: 'svc-drain-jetting',
            name: 'High-Pressure CCTV Drain Unblocking',
            price: 145,
            priceUnit: ' GBP',
            description:
              'Complete high-velocity hydro jetting clearout of stubborn exterior or interior sewer and waste blockages.',
            category: 'Drainage',
            inStock: true,
            features: [
              '3000 PSI High Pressure Jetting',
              'High-Definition CCTV Inspection',
              'Root & Grease Clearance',
              'Free Preventative Enzyme Treatment',
            ],
          },
        ],
      },
      cta: {
        headline: 'Need an urgent plumber or heating engineer?',
        subtitle:
          'Our dispatch operators are standing by 24 hours a day, 365 days a year across all London postcodes.',
        primaryCta: { label: 'Call 24/7 Dispatch Desk', href: '/contact' },
        secondaryCta: { label: 'Request Callback Online', href: '/contact' },
        guarantee: 'Zero call-out fees during normal hours • Fixed upfront price agreed before starting',
      },
      contact: {
        eyebrow: 'Emergency Dispatch',
        title: 'Contact Crown & Flow Plumbing',
        description: 'Call our emergency hotline or submit an online booking request for fast response.',
        formVariant: 'standard',
        showDetails: true,
        supportHours: '24/7 Emergency Dispatch • Office: Mon–Sat 07:30–18:00',
        inquiryOptions: [
          'Emergency Leak / Burst Pipe',
          'Boiler Breakdown / No Heating',
          'Drain Unblocking / Sewer Backup',
          'Annual Boiler Service / CP12',
          'Bathroom Renovation Quote',
        ],
      },
    },
  },
};

export default localPlumbing;
