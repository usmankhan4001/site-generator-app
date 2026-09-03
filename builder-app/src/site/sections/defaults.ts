/**
 * Site Kit — default section props.
 *
 * `defaultPropsFor(type)` returns the placeholder prop object a freshly-added
 * section starts with. Moved here (out of `src/store/studio.ts`) so the
 * archetype composer and the studio share one definition.
 */

import type { SectionType } from '@/site/schema';

export function defaultPropsFor(type: SectionType): Record<string, unknown> {
  switch (type) {
    case 'hero':
      return { headline: 'New headline', subtitle: 'Supporting sentence.', trustBadges: [] };
    case 'statsBar':
      return { items: [{ value: '100%', label: 'Placeholder metric' }] };
    case 'trustBar':
      return { variant: 'pills', items: ['Placeholder'] };
    case 'featureGrid':
      return { title: 'Capabilities', items: [] };
    case 'pricingTiers':
      return { title: 'Pricing', currency: 'USD', tiers: [] };
    case 'productGrid':
      return { title: 'Catalogue', layout: 'products', items: [] };
    case 'testimonials':
      return { title: 'What clients say', items: [] };
    case 'faq':
      return { title: 'FAQ', items: [] };
    case 'ctaBanner':
      return { headline: 'Ready to start?', primaryCta: { label: 'Contact us', href: '/contact' } };
    case 'pageHeader':
      return { headline: 'Page title' };
    case 'prose':
      return { blocks: [{ heading: '', body: 'Paragraph text.' }] };
    case 'timeline':
      return { title: 'Milestones', milestones: [] };
    case 'teamGrid':
      return { title: 'Leadership', members: [] };
    case 'valueGrid':
      return { title: 'Our principles', items: [] };
    case 'processSteps':
      return { title: 'How we work', steps: [] };
    case 'slaTable':
      return { title: 'Service levels', rows: [] };
    case 'locationList':
      return { title: 'Locations', locations: [] };
    case 'corporateRegistration':
      return { title: 'Corporate registration' };
    case 'contactPanel':
      return { showDetails: true };
    case 'policyDocument':
      return { title: 'Policy', lastUpdated: 'Draft', sections: [] };
    default:
      return {};
  }
}
