/**
 * Starter content set — `agency-motion`: Kinet — motion design & brand film production.
 * Hand-written. Authentic copy for brand films, product launches, kinetic
 * typography, and broadcast-grade motion systems.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const agencyMotion: StarterContentSet = {
  id: 'agency-motion-house',
  archetype: 'agency',
  name: 'Kinet',
  description:
    'A motion design and brand film house crafting launch films, kinetic identity systems, and broadcast-ready product stories for ambitious brands.',
  niche: 'Motion design & brand film production',
  tags: ['motion-design', 'brand-film', 'animation', 'kinetic-typography', 'video-production', 'creative', 'studio'],
  needsPersonalization: false,
  themeId: 'crimson-velocity',
  accent: '#ef4444',
  business: {
    name: 'Kinet',
    legalName: 'Kinet Motion House, Inc.',
    shortName: 'Kinet',
    registrationNumber: 'DE-7120488',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of New York',
    registeredAddress: '77 Greene Street, 4th Floor, New York, NY 10012, USA',
    email: 'hello@kinetmotion.example',
    phone: '+1 (212) 555-0188',
    website: 'kinetmotion.example',
    supportHours: 'Monday – Friday, 09:00 – 18:00 (ET)',
  },
  brand: { logoText: 'Kinet' },
  meta: {
    title: 'Kinet — Motion design & brand film production',
    description:
      'We turn product launches and brand stories into films that move people — kinetic identity, broadcast animation, and full production from storyboard to final master.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Motion design & brand film',
        headline: 'Make the launch',
        accentText: 'impossible to scroll past',
        subtitle:
          'Kinet is a senior motion house building launch films, kinetic identity systems, and broadcast-ready product stories — from first storyboard to final master.',
        primaryCta: { label: 'Watch our reel', href: '/services' },
        secondaryCta: { label: 'Brief the studio', href: '/contact' },
        trustBadges: ['AICP Show finalist', 'Webby honoree, 2024', '40+ launch films delivered'],
      },
      clients: {
        variant: 'logos',
        title: 'Brands that moved with us',
        items: ['Northline', 'Vela Audio', 'Palisade AI', 'Orbit Fitness', 'Cinder & Co'],
      },
      capabilities: {
        eyebrow: 'Capabilities',
        title: 'Every frame, intentional',
        description:
          'A tight crew of animators, directors, and editors who own the whole pipeline.',
        items: [
          {
            icon: 'Clapperboard',
            title: 'Brand & launch films',
            description:
              'Hero films that open a launch — narrative, product, and founder stories cut for social, web, and broadcast from one master.',
          },
          {
            icon: 'Wand2',
            title: 'Kinetic identity systems',
            description:
              'Logo animation, motion language, and transition rules that make your brand feel alive across every touchpoint.',
          },
          {
            icon: 'Layers',
            title: 'Product & explainer animation',
            description:
              'Technical products made legible — 3D product reveals, UI motion, and explainers that turn complexity into a 90-second story.',
          },
          {
            icon: 'MonitorPlay',
            title: 'Broadcast & social cutdowns',
            description:
              'One film, every ratio — 16:9, 9:16, and 1:1 masters with safe-area, caption, and sound design built for each platform.',
          },
        ],
      },
      process: {
        eyebrow: 'Process',
        title: 'From brief to broadcast',
        description:
          'A disciplined pipeline with creative gates, so the film you approve is the film that ships.',
        steps: [
          {
            step: '01',
            title: 'Story & treatment',
            description:
              'We lock the narrative, tone, and a visual treatment before a single frame is animated, so direction is agreed in words first.',
            duration: 'Week 1',
          },
          {
            step: '02',
            title: 'Design & storyboard',
            description:
              'Style frames and an animatic with temp sound give you a real preview of pacing, look, and feel before full production.',
            duration: 'Weeks 2–3',
          },
          {
            step: '03',
            title: 'Animation & edit',
            description:
              'Full animation, edit, sound design, and grade come together in reviewable passes with clear feedback rounds.',
            duration: 'Weeks 4–6',
          },
          {
            step: '04',
            title: 'Masters & cutdowns',
            description:
              'You receive broadcast masters plus every social ratio, with captions and platform-safe versions included.',
            duration: 'Week 7',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Clients',
        title: 'What launch teams say',
        items: [
          {
            name: 'Elena Vasquez',
            role: 'VP Marketing',
            company: 'Vela Audio',
            rating: 5,
            text: 'Kinet’s launch film carried our product reveal. It pulled a 4.2x lift in demo requests over our previous campaign — the story did the selling.',
          },
          {
            name: 'Marcus Bell',
            role: 'Founder',
            company: 'Orbit Fitness',
            rating: 5,
            text: 'They turned a complicated hardware story into a 90-second film our sales team replays in every pitch. It closes deals.',
          },
          {
            name: 'Priya Raman',
            role: 'Head of Brand',
            company: 'Palisade AI',
            rating: 5,
            text: 'The kinetic identity system gave us a motion language across every product surface. Our in-house team finally has rules to follow.',
          },
        ],
      },
      'track-record': {
        eyebrow: 'Track record',
        title: 'Films that shipped and performed',
        milestones: [
          {
            year: '2020',
            title: 'Studio founded in New York',
            description: 'Launched as a two-person animation collective on a single product film.',
          },
          {
            year: '2022',
            title: 'First national broadcast spot',
            description: 'A 30-second brand film aired nationally for a consumer electronics launch.',
          },
          {
            year: '2024',
            title: 'AICP Show finalist',
            description: 'Recognized for craft in the AICP Show, alongside a Webby honoree nod.',
          },
          {
            year: '2025',
            title: '40+ launch films and counting',
            description: 'Now a 14-person house shipping films for consumer, tech, and fitness brands.',
          },
        ],
      },
      cta: {
        headline: 'Have a launch that deserves to move?',
        subtitle:
          'Tell us the story and the deadline — we will come back with a treatment and a plan within a week.',
        primaryCta: { label: 'Brief the studio', href: '/contact' },
        secondaryCta: { label: 'Watch the reel', href: '/services' },
        guarantee: 'Creative treatment delivered before any commitment',
      },
    },
  },
};

export default agencyMotion;