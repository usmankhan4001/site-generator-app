/**
 * Starter content set — `local-landscaping`: Verdant — landscape design & garden maintenance.
 * Hand-written. Authentic copy for sustainable landscape design, garden
 * maintenance, planting, turf, and outdoor hardscaping in a defined service area.
 */
 
import type { StarterContentSet } from '@/site/archetypes/types';

export const localLandscaping: StarterContentSet = {
  id: 'local-landscaping',
  archetype: 'local',
  name: 'Verdant',
  description:
    'A design-led landscape and garden maintenance company — sustainable planting, turf care, seasonal maintenance, and patios & stonework with a fixed service area.',
  niche: 'Landscape design & garden maintenance',
  tags: ['landscaping', 'garden-maintenance', 'turf', 'irrigation', 'hardscaping', 'patio', 'local-contractor'],
  needsPersonalization: false,
  themeId: 'backcountry-olive',
  accent: '#a3e635',
  business: {
    name: 'Verdant',
    legalName: 'Verdant Landscape Studio Ltd',
    shortName: 'Verdant',
    registrationNumber: 'SC705421',
    jurisdiction: 'Scotland (UK Companies House)',
    governingLaw: 'the laws of Scotland',
    registeredAddress: '14 Royal Terrace, Edinburgh EH7 5AB, United Kingdom',
    email: 'design@verdantlandscape.example',
    phone: '+44 131 555 0162',
    website: 'verdantlandscape.example',
    supportHours: 'Monday – Saturday, 07:30 – 18:00; Sunday by appointment',
  },
  brand: { logoText: 'Verdant' },
  meta: {
    title: 'Verdant — Landscape design & garden maintenance across Edinburgh',
    description:
      'Award-winning garden design, turf and planting maintenance within 15 miles of Edinburgh. Sustainable by default, fixed-quoted and worry-free.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Design-Led • Fully Insured • 15-Mile Service Radius',
        headline: 'Gardens you want',
        accentText: 'to live in, outdoors',
        subtitle:
          'From a single overgrown border to a full redesign, Verdant plans, plants, and maintains sustainable gardens in and around Edinburgh — messy start, tidy end, every season of the year.',
        primaryCta: { label: 'Book a Garden Visit', href: '/contact' },
        secondaryCta: { label: 'See Services & Pricing', href: '/services' },
        trustBadges: ['5-Year Establishment Guarantee', 'Multi-Year Soil & Turf Contracts', 'Free Design Consult'],
      },
      trust: {
        variant: 'pills',
        title: 'What every Verdant garden gets',
        items: [
          'Master-level planting design',
          'Peat-free, wildlife-first soil',
          'Fully insured & vetted crew',
          '5-Year planting guarantee',
        ],
      },
      services: {
        eyebrow: 'Our Services',
        title: 'One team for the whole garden',
        description:
          'Design, build, and endlessly maintain — so the garden grows together instead of in awkward phases.',
        items: [
          {
            icon: 'Palette',
            title: 'Landscape Design',
            description:
              'Concept planting plans, full garden design, and 3D sketcheups for borders, lawns, and outdoor rooms — built around how you actually live outside.',
          },
          {
            icon: 'Scissors',
            title: 'Garden & Turf Maintenance',
            description:
              'Fortnightly or monthly visits covering mowing, hedge care, weeding, season-fed beds, and immaculate edging, on a plan you approve together.',
          },
          {
            icon: 'Droplets',
            title: 'Irrigation & Watering',
            description:
              'Smart drip and sprinkler systems installed and maintained, so new planting establishes and the garden thrives through dry spells.',
          },
          {
            icon: 'Wrench',
            title: 'Patios, Paths & Hardscaping',
            description:
              'Riven paving, permeable patio bases, sleepers, and retaining walls laid to last — design-led and built to shed water properly.',
          },
        ],
      },
      process: {
        eyebrow: 'How We Work',
        title: 'From overgrown to established, in seasons',
        description:
          'We never leave a garden in a half-state. Every project ends with a boundary that holds and a follow-up plan.',
        steps: [
          {
            step: '01',
            title: 'Garden Visit & Site Survey',
            description:
              'We walk the site, measure levels and light, test your soil, and listen to how you picture using the space. You get the thinking free, in writing.',
            duration: 'Week 1',
          },
          {
            step: '02',
            title: 'Design & Fixed Quote',
            description:
              'You approve the planting plan and layout, and we hand you a binding fixed price with the full plant and hardscape spec.',
            duration: 'Weeks 2–3',
          },
          {
            step: '03',
            title: 'Build & Planting',
            description:
              'Our own team does the digging, turfing, planting, and laying — no subcontracting, no mystery. You see each phase before the next begins.',
            duration: 'Weeks 4–8',
          },
          {
            step: '04',
            title: 'Aftercare & Guaranteed Establishment',
            description:
              'We return on a schedule you choose to water, feed, and keep the garden in check, and back every plant we plant for five years.',
            duration: 'Ongoing',
          },
        ],
      },
      reviews: {
        eyebrow: 'Garden Feedbacks',
        title: 'Homeowners & estates who stayed green-thumbed',
        items: [
          {
            name: 'Catriona Reid',
            role: 'Homeowner',
            location: 'Stockbridge, Edinburgh',
            rating: 5,
            text: 'We threatened our front garden for two years before calling Verdant. They turned a tired patch into a lawn and border I actually enjoy coming home to. Crew is tidy to a fault.',
          },
          {
            name: 'Tom Okafor',
            role: 'Estate Manager',
            location: 'South Queensferry',
            rating: 5,
            text: 'We run a mixed portfolio of private gardens. Verdant’s maintenance plan keeps every one spotless and tells us what’s coming next before it’s a surprise.',
          },
          {
            name: 'Freya Wallace',
            role: 'Homeowner',
            location: 'Morningside, Edinburgh',
            rating: 5,
            text: 'The design consultant listened more than they talked. My patio is now the heart of the garden, and nothing has died in two summers.',
          },
        ],
      },
      pricing: {
        eyebrow: 'Fixed, Understandable Rates',
        title: 'Garden services & pricing',
        description:
          'Clear visit-based pricing for maintenance, with design and build quoted fixed after your visit — no hidden surprise.',
        currency: 'GBP',
        items: [
          {
            id: 'svc-standard-visit',
            name: 'Fortnightly Maintenance Visit',
            price: 95,
            priceUnit: ' / visit',
            description: 'Mowing, edging, border weeding, and seasonal planting in one standard-size garden.',
            category: 'Maintenance',
            badge: 'Most Booked',
            popular: true,
            inStock: true,
          },
          {
            id: 'svc-turf-feed',
            name: 'Spring & Autumn Turf Feed',
            price: 120,
            priceUnit: ' / visit',
            description: 'Aeration, top-dressing, and organic seasonal feed for lawns that want to look effortless.',
            category: 'Turf Care',
            inStock: true,
          },
          {
            id: 'svc-design-consult',
            name: 'Design Consultation (on site)',
            price: 180,
            priceUnit: ' once',
            description: 'Full site survey, soil test, planting ideas, and a plan you keep — fee offsets any build.',
            category: 'Design',
            inStock: true,
          },
        ],
      },
      cta: {
        headline: 'Bring the awkward garden back to life',
        subtitle:
          'Book a no-obligation garden visit and get an honest, fixed proposal — even if it’s just advice that turns you down.',
        primaryCta: { label: 'Book a Garden Visit', href: '/contact' },
        secondaryCta: { label: 'View Services & Pricing', href: '/services' },
        guarantee: 'Design consult credited toward any build • No call-out fees',
      },
      contact: {
        eyebrow: 'Book a Visit',
        title: 'Contact Verdant Landscapes',
        description: 'Tell us about the space and how you use it, and we’ll reply within one business day.',
        formVariant: 'standard',
        showDetails: true,
        supportHours: 'Monday–Saturday, 07:30–17:00',
        inquiryOptions: [
          'Garden Maintenance',
          'Landscape Design & Redesign',
          'Patio / Hardscaping Quote',
          'Irrigation & Watering',
          'Complete Garden Rescue',
        ],
      },
    },
  },
};

export default localLandscaping;