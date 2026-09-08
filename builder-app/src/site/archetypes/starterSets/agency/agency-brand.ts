/**
 * Starter content set — `agency-brand`: Muse — brand identity & creative direction studio.
 * Hand-written. Authentic copy for naming, identity systems, packaging, and
 * brand guardianship for ambitious consumer and hospitality ventures.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const agencyBrand: StarterContentSet = {
  id: 'agency-brand-studio',
  archetype: 'agency',
  name: 'Muse',
  description:
    'A brand identity studio sculpting naming, visual identity, packaging, and voice for consumer, food, and hospitality founders who lead with culture.',
  niche: 'Brand identity & creative direction',
  tags: ['brand-identity', 'naming', 'creative-direction', 'packaging', 'design', 'art-direction', 'studio'],
  needsPersonalization: false,
  themeId: 'boutique-oat',
  accent: '#b45309',
  business: {
    name: 'Muse',
    legalName: 'Muse Creative Direction Ltd',
    shortName: 'Muse',
    registrationNumber: '14120983',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '3 Colville Mews, Notting Hill, London W11 2DA, United Kingdom',
    email: 'studio@musecdn.example',
    phone: '+44 20 7527 4830',
    website: 'musecdn.example',
    supportHours: 'Monday – Friday, 09:30 – 18:00 (GMT)',
  },
  brand: { logoText: 'Muse' },
  meta: {
    title: 'Muse — Brand identity & creative direction studio',
    description:
      'We give likeable brands an identity worth a second glance — strategy, naming, identity systems, and packaging built to be lived-in, not slideshowed.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Brand identity & creative direction',
        headline: 'Names, marks, and worlds for',
        accentText: 'culture-led brands',
        subtitle:
          'From a founding name to a shelf-ready packaging system, Muse partners with ambitious founders to build identity that people remember, repeat, and buy into.',
        primaryCta: { label: 'See our approach', href: '/services' },
        secondaryCta: { label: 'Request a kickoff call', href: '/contact' },
        trustBadges: ['D&AD Pencil, 2024', 'Packaging Design Index featured', '18 brand worlds shipped'],
      },
      clients: {
        variant: 'logos',
        title: 'Brands we have helped find their voice',
        items: ['Morgen Coffee', 'Sela Skincare', 'Caravel Spirits', 'Ledger & Loom', 'Wilder Goods'],
      },
      capabilities: {
        eyebrow: 'Craft',
        title: 'What we make room for',
        description:
          'A small senior team that owns the whole arc — from strategy room to the printed object.',
        items: [
          {
            icon: 'Type',
            title: 'Naming & verbal identity',
            description:
              'Distinctive, ownable names and a set of words to speak with — tested for search, trademark and translation landmines before you fall in love.',
          },
          {
            icon: 'WandSparkles',
            title: 'Visual identity systems',
            description:
              'Logos, typography, colour and motion rules delivered as a living system your whole team can actually use, not a PDF to admire.',
          },
          {
            icon: 'Package',
            title: 'Packaging & product story',
            description:
              '3D-first desktop benchmarking, shelf studies, and structural and print-ready packaging that holds up in a supermarket aisle, not just a moodboard.',
          },
          {
            icon: 'MapPin',
            title: 'Launch & guardianship',
            description:
              'A clear launch kit and an ongoing guardian frame so new campaigns expand the identity instead of contradicting it.',
          },
        ],
      },
      process: {
        eyebrow: 'Method',
        title: 'From blank word to live shelf',
        description:
          'A structured arc with hard gates, so what we show you is always real and reviewable.',
        steps: [
          {
            step: '01',
            title: 'Listening & brand audit',
            description:
              'Founder interviews, category and consumer research, and a blunt audit of where the brand currently lands (and why).',
            duration: 'Weeks 1–2',
          },
          {
            step: '02',
            title: 'Verbal & visual directions',
            description:
              'Two genuinely different directions — naming territories and identity routes tested with real audiences, not just in the studio.',
            duration: 'Weeks 3–5',
          },
          {
            step: '03',
            title: 'System build & refinement',
            description:
              'The chosen direction becomes a full system: core logo, extended palette, typography, and every application you actually need at launch.',
            duration: 'Weeks 6–9',
          },
          {
            step: '04',
            title: 'Artwork & launch readiness',
            description:
              'Print-ready pack art, guidelines, asset handoff, and the launch guard list so you ship loud and stay on-brand on the way up.',
            duration: 'Weeks 10–12',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Founders',
        title: 'Who we get to build with',
        items: [
          {
            name: 'Imogen Clarke',
            role: 'Founder',
            company: 'Caravel Spirits',
            rating: 5,
            text: 'We interviewed five studios. Muse was the only one that asked about our farmers before our font. The bottle that came out of it has outsold the old design three to one.',
          },
          {
            name: 'Hiro Nakamura',
            role: 'CEO',
            company: 'Wilder Goods',
            rating: 5,
            text: 'Muse gave us a name we actually feel proud to say. The identity flexes across a shop, a van and an app without ever looking stretched.',
          },
          {
            name: 'Freya Lindqvist',
            role: 'Founder',
            company: 'Sela Skincare',
            rating: 5,
            text: 'The guardianship visits are the bit nobody talks about. Eleven months in, our new launches still look like Muse made them — because they did.',
          },
        ],
      },
      'track-record': {
        eyebrow: 'Since 2018',
        title: 'A small studio with a long shelf life',
        milestones: [
          {
            year: '2018',
            title: 'Studio founded in Notting Hill',
            description: 'Begun as two designers with a coffee-grinder side hustle and a first packaging client.',
          },
          {
            year: '2021',
            title: 'First national retail rollouts',
            description: 'Three brands saw their first national supermarket distribution.',
          },
          {
            year: '2023',
            title: 'First D&AD Pencil',
            description: 'Won a D&AD Pencil for a shelf-friendly spirits brand identity.',
          },
          {
            year: '2025',
            title: '18 live brand worlds',
            description: 'Now stewarding 18 active brand systems across consumer, food, and hospitality.',
          },
        ],
      },
      cta: {
        headline: 'Got a brand with a story worth telling?',
        subtitle:
          'We take on a few founder-led identities a year to keep the work honest. Tell us what you are launching.',
        primaryCta: { label: 'Start a kickoff call', href: '/contact' },
        secondaryCta: { label: 'Browse capabilities', href: '/services' },
        guarantee: 'First call is a real conversation, not a pitch',
      },
    },
  },
};

export default agencyBrand;