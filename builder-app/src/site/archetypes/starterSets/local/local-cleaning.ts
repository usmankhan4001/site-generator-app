/**
 * Starter content set — `local-cleaning`: Lustre — residential & commercial cleaning.
 * Hand-written. Authentic copy for weekly housekeeping, deep cleans, end-of-lease,
 * and managed commercial cleaning across a fixed service area.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const localCleaning: StarterContentSet = {
  id: 'local-cleaning',
  archetype: 'local',
  name: 'Lustre',
  description:
    'A bonded residential and commercial cleaning company — weekly housekeeping, deep cleans, end-of-tenancy, and regular office & retail cleaning across a defined postcode radius.',
  niche: 'Residential & commercial cleaning',
  tags: ['cleaning', 'housekeeping', 'deep-clean', 'end-of-tenancy', 'office-cleaning', 'domestic', 'bonded'],
  needsPersonalization: false,
  themeId: 'electric-teal',
  accent: '#0d9488',
  business: {
    name: 'Lustre',
    legalName: 'Lustre Cleaning Services Pty Ltd',
    shortName: 'Lustre',
    registrationNumber: 'ABN 17 368 210 447',
    jurisdiction: 'Australia (ACN 368 210 447)',
    governingLaw: 'the laws of New South Wales, Australia',
    registeredAddress: '8 Auburn Street, Camperdown, NSW 2050, Australia',
    email: 'bookings@lustreclean.example',
    phone: '+61 2 9150 4483',
    website: 'lustreclean.example',
    supportHours: 'Monday – Saturday, 07:00 – 18:00 (AEST)',
  },
  brand: { logoText: 'Lustre' },
  meta: {
    title: 'Lustre — Trusted home & office cleaning across inner Sydney',
    description:
      'Bonded, insured, background-checked cleaners for weekly housekeeping, deep cleans, and end-of-lease. Same trusted crew every visit, never rotated.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Bonded & Insured • Same Crew Every Visit • 5-Postcode Radius',
        headline: 'A clean home,',
        accentText: 'without the guesswork',
        subtitle:
          'Lustre pairs you with the same background-checked, fully insured cleaner every visit. Weekly tidying, one-off deep cleans, or an end-of-tenancy blitz — scheduled online in under a minute.',
        primaryCta: { label: 'Book a Clean', href: '/contact' },
        secondaryCta: { label: 'View Services & Pricing', href: '/services' },
        trustBadges: ['100% Insured & Bonded', 'Fixed Crew, Never Rotated', 'Satisfaction Guarantee or Re-visit Free'],
      },
      trust: {
        variant: 'pills',
        title: 'The Lustre standard',
        items: [
          'Police-Checked & Bonded Staff',
          'Eco-Friendly Cleaning Products',
          'Own Insurance, Every Visit',
          'Satisfaction Guarantee',
        ],
      },
      services: {
        eyebrow: 'Our Services',
        title: 'Home and work, left spotless',
        description:
          'One reliable company for the places you actually live and work — with transparent add-ons and no upselling at the door.',
        items: [
          {
            icon: 'Home',
            title: 'Weekly Housekeeping',
            description:
              'Kitchens, bathrooms, floors, and dusting on a repeat schedule that comes with a simple checklist so you always know what’s covered.',
          },
          {
            icon: 'Sparkles',
            title: 'One-Off Deep Cleans',
            description:
              'A full reset — inside appliances, grout detailing, window tracks, and baseboards — for when a standard tidy isn’t enough.',
          },
          {
            icon: 'ClipboardList',
            title: 'End-of-Tenancy & Lease Cleans',
            description:
              'Bond-back ready cleans with a documented checklist, and a re-do guarantee if your landlord marks anything we missed.',
          },
          {
            icon: 'Building2',
            title: 'Office & Commercial',
            description:
              'Regular after-hours contracts for offices, studios, and clinics — consistent, insured, and billed flat with no surprises.',
          },
        ],
      },
      process: {
        eyebrow: 'How We Work',
        title: 'Booked in a minute, cleaned to a spec',
        description:
          'No endless forms or mystery pricing. You pick the date, we show up on time with the same familiar face.',
        steps: [
          {
            step: '01',
            title: 'Tell us the space',
            description:
              'Choose home or office, the size, and the visit type. Pricing is instant and fixed — no phone circus required.',
            duration: '1 minute',
          },
          {
            step: '02',
            title: 'Meet your cleaner',
            description:
              'We match you with a vetted cleaner and send their profile, photo, and your visit slot. Same person every time.',
            duration: 'Before visit',
          },
          {
            step: '03',
            title: 'The clean',
            description:
              'Your crew arrives with the products you approved and works to the checklist. You get a digital report once done.',
            duration: '2–4 hours',
          },
          {
            step: '04',
            title: 'Guarantee & re-visit',
            description:
              'Anything we missed earns us a free revisit within 48 hours. You only ever pay once you’re satisfied.',
            duration: 'On request',
          },
        ],
      },
      reviews: {
        eyebrow: 'Local Reviews',
        title: 'Rated 4.9/5 across inner Sydney',
        items: [
          {
            name: 'Priya Natarajan',
            role: 'Homeowner',
            location: 'Darlington, NSW',
            rating: 5,
            text: 'My cleaner has been the same lovely woman for three years now. She remembers exactly how I like the kitchen, and the apartment always feels cared for, not just cleaned.',
          },
          {
            name: 'Marcus Webb',
            role: 'Landlord',
            location: 'Glebe, NSW',
            rating: 5,
            text: 'Lustre handles all our end-of-tenancy cleans. Every bond has been returned in full and the re-visit promise has never been needed once.',
          },
          {
            name: 'Elena Fischer',
            role: 'Office Manager',
            location: 'Inner West office',
            rating: 5,
            text: 'They deep-clean our studio fortnightly. Reliable, well-organised, and they leave the security code and office keys exactly where they found them.',
          },
        ],
      },
      pricing: {
        eyebrow: 'Transparent Pricing',
        title: 'Flat, fixed, no hidden',
        description:
          'Pricing is per clean based on size — no per-bedroom inflation and no drive-through fees.',
        currency: 'AUD',
        items: [
          {
            id: 'svc-standard-home',
            name: 'Standard Home Clean',
            price: 139,
            priceUnit: ' / visit',
            description: 'For a standard 2–3 weekly housekeeping clean in a medium home.',
            category: 'Home',
            badge: 'Most Booked',
            popular: true,
            inStock: true,
          },
          {
            id: 'svc-deep-clean',
            name: 'Deep Clean (per room)',
            price: 95,
            priceUnit: ' / room',
            description: 'Oven, maybes, window and base detailing for a kitchen or bathroom.',
            category: 'Deep Clean',
            inStock: true,
          },
          {
            id: 'svc-end-lease',
            name: 'End-of-Tenancy Clean',
            price: 220,
            priceUnit: ' / unit',
            description: 'Bond-ready clean of a standard 2-bed flat, checklist and follow-up guarantee included.',
            category: 'Lease Clean',
            inStock: true,
          },
        ],
      },
      cta: {
        headline: 'Get your weekends back',
        subtitle:
          'Book a clean online, pick a recurring schedule, and adjust or cancel in one text. No call needed to start.',
        primaryCta: { label: 'Book a Clean', href: '/contact' },
        secondaryCta: { label: 'See Services & Pricing', href: '/services' },
        guarantee: 'Satisfaction guarantee with free re-visit • No surprise fees',
      },
      contact: {
        eyebrow: 'Book Online',
        title: 'Contact Lustre Cleaning',
        description: 'Tell us the postcode and the type of clean — we’ll confirm availability within the hour.',
        formVariant: 'standard',
        showDetails: true,
        supportHours: 'Mon–Sat, 07:00–18:00',
        inquiryOptions: [
          'Weekly / Recurring Housekeeping',
          'One-Off Deep Clean',
          'End-of-Tenancy / Lease Clean',
          'Office & Commercial Contract',
          'Move-In / Post-Renovation Clean',
        ],
      },
    },
  },
};

export default localCleaning;