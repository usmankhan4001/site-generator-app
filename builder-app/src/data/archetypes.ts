import { ArchetypeData, IndustryCategory } from '../types/builder';
import rawArchetypes from './archetypes.json';

export const ARCHETYPES: Record<string, ArchetypeData> = Object.entries(rawArchetypes).reduce(
  (acc, [id, data]: [string, any]) => {
    let category: IndustryCategory = 'tech';
    if (id.startsWith('ecommerce-')) category = 'ecommerce';
    else if (id.startsWith('hosting-')) category = 'hosting';

    acc[id] = {
      id: data.id || id,
      category: data.category || category,
      industry: data.industry || 'Software & Technology',
      name: data.name || 'Untitled Enterprise',
      tagline: data.tagline || data.hero?.subtitle || '',
      hero: {
        badge: data.hero?.badge || 'Enterprise Solutions',
        headline: data.hero?.headline || 'Mission-Critical Architecture',
        accentText: data.hero?.accentText || 'Built for Scale',
        subtitle: data.hero?.subtitle || 'Engineered for high performance and reliability.',
        primaryCta: data.hero?.primaryCta || 'Get Started',
        secondaryCta: data.hero?.secondaryCta || 'Learn More',
        image: data.hero?.image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        trustBadges: data.hero?.trustBadges || ['Enterprise SLA', 'SOC2 Compliant', '24/7 Support']
      },
      stats: data.stats || [
        { value: '99.99%', label: 'Uptime SLA' },
        { value: '500+', label: 'Clients Worldwide' },
        { value: '< 15ms', label: 'Response Time' },
        { value: '100%', label: 'Satisfaction' }
      ],
      bentoFeatures: data.bentoFeatures || [],
      offerings: data.offerings || [],
      testimonials: data.testimonials || [],
      faqs: data.faqs || [],
      recommendedThemes: data.recommendedThemes || ['indigo-enterprise', 'midnight-obsidian']
    };
    return acc;
  },
  {} as Record<string, ArchetypeData>
);

export const DEFAULT_ARCHETYPE_ID = 'tech-cloud-devops';

export function getArchetypeById(archetypeId: string): ArchetypeData {
  return ARCHETYPES[archetypeId] || ARCHETYPES[DEFAULT_ARCHETYPE_ID];
}

export function getArchetypesByCategory(category?: IndustryCategory): ArchetypeData[] {
  const all = Object.values(ARCHETYPES);
  if (!category) return all;
  return all.filter((a) => a.category === category);
}

export const ARCHETYPES_LIST: ArchetypeData[] = Object.values(ARCHETYPES);
