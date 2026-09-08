/**
 * Starter content set — `agency-digital`: design & digital product studio.
 * Authentic copy for brand identity, UI/UX systems, and bespoke web platforms.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const agencyDigital: StarterContentSet = {
  id: 'agency-digital',
  archetype: 'agency',
  name: 'Digital Product Studio',
  description:
    'Strategy-led design and engineering studio crafting iconic brand identities, multi-platform UI/UX, and high-performance web systems.',
  niche: 'Design & digital product studio',
  tags: ['design-studio', 'branding', 'ui-ux', 'web-development', 'product-strategy', 'creative'],
  needsPersonalization: false,
  themeId: 'neo-grotesque-zinc',
  business: {
    name: 'Vektor Design Studio Ltd',
    shortName: 'Vektor Studio',
    registrationNumber: '12984021',
    jurisdiction: 'England & Wales (UK Companies House)',
    governingLaw: 'the laws of England and Wales',
    registeredAddress: '14–16 Great Pulteney Street, Soho, London W1F 9ND, United Kingdom',
    email: 'partnerships@vektorstudio.example',
    phone: '+44 20 7946 0912',
    website: 'vektorstudio.example',
    supportHours: 'Monday – Friday, 09:30 – 18:30 (GMT)',
  },
  brand: { logoText: 'Vektor' },
  meta: {
    title: 'Vektor Studio — Digital Product Design & Brand Systems',
    description:
      'We partner with ambitious founders and tier-one enterprises to design category-defining digital products, brand identities, and resilient web platforms.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Design & Engineering Atelier',
        headline: 'We shape digital products that define',
        accentText: 'entire categories',
        subtitle:
          'From foundational brand identity to production-grade design systems and full-stack web applications. We work in tight, senior sprints alongside founders and product leaders.',
        primaryCta: { label: 'Explore Our Work', href: '/services' },
        secondaryCta: { label: 'Book Intro Call', href: '/contact' },
        trustBadges: ['Awwwards Site of the Year', 'Red Dot Design Award', 'FWA of the Day'],
      },
      clients: {
        variant: 'logos',
        title: 'Selected collaborations & studio partners',
        items: ['Monolith Systems', 'Aether Health', 'Koto Ventures', 'Palisade AI', 'Vanguard Media'],
      },
      capabilities: {
        eyebrow: 'Capabilities',
        title: 'Precision craft across brand and product',
        description:
          'We bridge the gap between world-class visual aesthetics and robust technical architecture.',
        items: [
          {
            icon: 'Palette',
            title: 'Brand Identity & Visual Systems',
            description:
              'Positioning, typographic systems, motion guidelines, and comprehensive design libraries built for scalable rollouts.',
          },
          {
            icon: 'LayoutGrid',
            title: 'UI/UX & Product Design',
            description:
              'Interaction architecture, user flows, rapid interactive prototypes, and production Figma design tokens with zero developer ambiguity.',
          },
          {
            icon: 'Code2',
            title: 'Full-Stack Web Engineering',
            description:
              'Modern Next.js, React, Tailwind, and headless CMS integrations built for 100/100 Lighthouse performance and frictionless authoring.',
          },
          {
            icon: 'Sparkles',
            title: 'Interactive 3D & Creative Motion',
            description:
              'WebGL micro-interactions, three.js canvas experiences, and fluid scroll-linked choreography that captivate and convert.',
          },
        ],
      },
      process: {
        eyebrow: 'Methodology',
        title: 'How we take vision to production',
        description:
          'A transparent four-phase framework designed for velocity, clarity, and zero scope drift.',
        steps: [
          {
            step: '01',
            title: 'Discovery & Strategic Framing',
            description:
              'Deep dive into business goals, competitive landscape, user interviews, and technical constraints to define the product thesis.',
            duration: '2 Weeks',
          },
          {
            step: '02',
            title: 'Concept & Interaction Exploration',
            description:
              'Rapid exploration of visual directions, interactive wireframes, and mood boards before converging on the hero aesthetic.',
            duration: '2–3 Weeks',
          },
          {
            step: '03',
            title: 'Design Systems & High-Fidelity Specs',
            description:
              'Full screen-by-screen design, responsive layouts, micro-copy, edge-case validation, and documented token architecture.',
            duration: '3–4 Weeks',
          },
          {
            step: '04',
            title: 'Engineering & Production Launch',
            description:
              'Pixel-accurate development, cross-browser QA, accessibility auditing, Core Web Vitals optimization, and staged deployment.',
            duration: '3–5 Weeks',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Endorsements',
        title: 'What founders say about partnering with Vektor',
        items: [
          {
            name: 'Julian Sterling',
            role: 'Founder & CEO',
            company: 'Monolith Systems',
            rating: 5,
            text: 'Vektor completely redefined how the enterprise market perceives our software. Our Series B pitch deck and website redesign directly contributed to closing our $28M round.',
          },
          {
            name: 'Dr. Clara Thorne',
            role: 'Chief Medical Officer',
            company: 'Aether Health',
            rating: 5,
            text: 'Their design team grasped intricate clinical workflows in days. The patient portal they designed achieved a 94% task completion rate on first launch.',
          },
          {
            name: 'Matthias Brandt',
            role: 'Partner',
            company: 'Koto Ventures',
            rating: 5,
            text: 'Vektor is our default recommendation for portfolio companies. They operate like in-house design co-founders rather than a detached agency.',
          },
        ],
      },
      'track-record': {
        eyebrow: 'Track Record',
        title: 'A history of high-impact releases',
        description: 'Key milestones, industry recognitions, and client valuations unlocked.',
        milestones: [
          {
            year: '2021',
            title: 'Studio Founded in Soho',
            description: 'Launched with a team of 4 senior design directors focused on early-stage tech founders.',
          },
          {
            year: '2022',
            title: 'Awwwards Agency of the Year Nominee',
            description: 'Shipped 18 international web projects and secured 6 Site of the Day honors.',
          },
          {
            year: '2023',
            title: 'Enterprise Practice Launch',
            description: 'Expanded engineering capabilities to support global multi-brand headless commerce platforms.',
          },
          {
            year: '2024',
            title: '$350M+ Client Valuation Unlocked',
            description: 'Portfolio clients collectively crossed $350M in venture funding and acquisition valuations.',
          },
        ],
      },
      cta: {
        headline: 'Have a project that demands exceptional craft?',
        subtitle:
          'We accept a limited number of partner engagements each quarter to ensure senior-led execution.',
        primaryCta: { label: 'Start an Engagement', href: '/contact' },
        secondaryCta: { label: 'View Capabilities', href: '/services' },
        guarantee: 'Initial response within 24 business hours • NDAs signed upon request',
      },
    },
  },
};

export default agencyDigital;
