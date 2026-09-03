/**
 * Friendly labels + one-line descriptions for every `SectionType`.
 * Used by SectionsPanel (list rows), the "Add section" dialog and the Inspector.
 */

import type { SectionType } from '@/site/schema';

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: 'Hero',
  statsBar: 'Stats Bar',
  trustBar: 'Trust Bar',
  featureGrid: 'Feature Grid',
  pricingTiers: 'Pricing Tiers',
  productGrid: 'Product Grid',
  testimonials: 'Testimonials',
  faq: 'FAQ',
  ctaBanner: 'CTA Banner',
  pageHeader: 'Page Header',
  prose: 'Prose',
  timeline: 'Timeline',
  teamGrid: 'Team Grid',
  valueGrid: 'Value Grid',
  processSteps: 'Process Steps',
  slaTable: 'SLA Table',
  locationList: 'Location List',
  corporateRegistration: 'Corporate Registration',
  contactPanel: 'Contact Panel',
  policyDocument: 'Policy Document',
  checkout: 'Checkout',
};

export const SECTION_DESCRIPTIONS: Record<SectionType, string> = {
  hero: 'Full-width page opener — headline, subtitle and calls to action.',
  statsBar: 'Compact row of headline metrics.',
  trustBar: 'Logo wall or pill strip of trust signals.',
  featureGrid: 'Grid of capabilities or features with icons.',
  pricingTiers: 'Side-by-side pricing plans with feature lists.',
  productGrid: 'Catalogue of retail products or server plans.',
  testimonials: 'Customer quotes, roles and ratings.',
  faq: 'Expandable question-and-answer list.',
  ctaBanner: 'Conversion band with a primary action.',
  pageHeader: 'Compact title block for interior pages.',
  prose: 'Rich text blocks with an optional image and checklist.',
  timeline: 'Chronological milestones.',
  teamGrid: 'Leadership or team member cards.',
  valueGrid: 'Principles or values with icons.',
  processSteps: 'Numbered "how we work" steps.',
  slaTable: 'Service-level commitments table.',
  locationList: 'Offices or data-centre locations.',
  corporateRegistration: 'Registered entity and legal identifiers.',
  contactPanel: 'Contact form with a company-details column.',
  policyDocument: 'Long-form legal or policy document.',
  checkout: 'Payment hand-off to the merchant\'s Airwallex checkout.',
};

export function sectionLabel(type: SectionType): string {
  return SECTION_LABELS[type] ?? type;
}
