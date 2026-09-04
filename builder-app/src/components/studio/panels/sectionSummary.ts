import type { Section } from '@/site/schema';

/** One-line "what's in here" summary for a section list row. */
export function summarizeSection(section: Section): string {
  const p = section.props as Record<string, unknown>;
  switch (section.type) {
    case 'hero': {
      const v = p.variant ? `[${String(p.variant).replace(/_/g, ' ')}] ` : '';
      return `${v}${String(p.headline ?? 'Hero banner')}`;
    }
    case 'statsBar':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} metrics`;
    case 'trustBar': {
      const v = p.variant ? String(p.variant).replace(/_/g, ' ') : 'pills';
      return `${(p.items as unknown[] | undefined)?.length ?? 0} items · ${v}`;
    }
    case 'featureGrid': {
      const v = p.variant ? String(p.variant).replace(/_/g, ' ') : 'grid';
      return `${(p.items as unknown[] | undefined)?.length ?? 0} features · ${v}`;
    }
    case 'pricingTiers': {
      const v = p.variant ? String(p.variant).replace(/_/g, ' ') : 'cards';
      return `${(p.tiers as unknown[] | undefined)?.length ?? 0} tiers · ${v}`;
    }
    case 'productGrid': {
      const v = p.variant || p.layout || 'products';
      return `${(p.items as unknown[] | undefined)?.length ?? 0} items · ${String(v).replace(/_/g, ' ')}`;
    }
    case 'testimonials': {
      const v = p.variant ? String(p.variant).replace(/_/g, ' ') : 'cards';
      return `${(p.items as unknown[] | undefined)?.length ?? 0} quotes · ${v}`;
    }
    case 'faq':
      return `${(p.items as unknown[] | undefined)?.length ?? 0} questions`;
    case 'ctaBanner':
      return String(p.headline ?? 'Call to action');
    case 'pageHeader':
      return String(p.headline ?? 'Page banner');
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
    case 'contactPanel': {
      const v = p.formVariant ? String(p.formVariant) : 'standard';
      return `${String(p.title ?? 'Contact form')} · ${v}`;
    }
    case 'policyDocument':
      return String(p.title ?? 'Legal policy');
    default:
      return '';
  }
}
