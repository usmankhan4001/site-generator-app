import type { Section } from '@/site/schema';

/** One-line "what's in here" summary for a section list row. */
export function summarizeSection(section: Section): string {
  const p = section.props as Record<string, unknown>;
  switch (section.type) {
    case 'hero':
      return String(p.headline ?? '');
    case 'statsBar':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} metrics`;
    case 'trustBar':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} items · ${p.variant ?? 'pills'}`;
    case 'featureGrid':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} features`;
    case 'pricingTiers':
      return `${(p.tiers as unknown[] | undefined)?.length ?? 0} tiers`;
    case 'productGrid':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} items · ${p.layout ?? 'products'}`;
    case 'testimonials':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} quotes`;
    case 'faq':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} questions`;
    case 'ctaBanner':
      return String(p.headline ?? '');
    case 'pageHeader':
      return String(p.headline ?? '');
    case 'prose':
      return `${(p.blocks as unknown[] | undefined)?.length ?? 0} blocks`;
    case 'timeline':
      return `${(p.milestones as unknown[] | undefined)?.length ?? 0} milestones`;
    case 'teamGrid':
      return `${(p.members as unknown[] | undefined)?.length ?? 0} members`;
    case 'valueGrid':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} values`;
    case 'processSteps':
      return `${(p.steps as unknown[] | undefined)?.length ?? 0} steps`;
    case 'slaTable':
      return `${(p.rows as unknown[] | undefined)?.length ?? 0} rows`;
    case 'locationList':
      return `${(p.places as unknown[] | undefined)?.length ?? (p.locations as unknown[] | undefined)?.length ?? 0} locations`;
    case 'corporateRegistration':
      return String(p.entityName ?? 'Uses business details');
    case 'contactPanel':
      return String(p.title ?? 'Contact form');
    case 'policyDocument':
      return String(p.title ?? '');
    default:
      return '';
  }
}
