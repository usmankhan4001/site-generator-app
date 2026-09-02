import {
  TECH_TEMPLATES,
  TECH_TEMPLATES_BY_ID,
  TechTemplate,
  TechCategory,
  getAllTechTemplates,
  getTechTemplateById,
  getTechTemplatesByCategory,
  searchTechTemplates,
} from './tech/index';

import {
  RETAIL_TEMPLATES,
  RETAIL_TEMPLATES_LIST,
  RetailTemplate,
  RetailSubCategory,
  getRetailTemplateById,
  getRetailTemplatesBySubCategory,
} from './retail/index';

import {
  HOSTING_TEMPLATES,
  HOSTING_TEMPLATES_LIST,
  HostingTemplate,
  HostingCategory,
  getHostingTemplateById,
  getHostingTemplatesByCategory,
} from './hosting/index';

export * from './tech/index';
export * from './retail/index';
export * from './hosting/index';

export type MasterSector = 'tech' | 'retail' | 'hosting';

export type UniversalTemplate = TechTemplate | RetailTemplate | HostingTemplate;

/**
 * Master catalog dictionary mapping template ID to its full multi-page Puck specification.
 * Combines all 80 enterprise-grade templates:
 * - 40 Software & Tech Consulting
 * - 30 E-Commerce & Retail
 * - 10 Web Hosting & Infrastructure
 */
export const ALL_TEMPLATES: Record<string, UniversalTemplate> = {
  ...TECH_TEMPLATES_BY_ID,
  ...RETAIL_TEMPLATES,
  ...HOSTING_TEMPLATES,
};

/**
 * Master catalog list array containing all 80 templates.
 */
export const ALL_TEMPLATES_LIST: UniversalTemplate[] = [
  ...TECH_TEMPLATES,
  ...RETAIL_TEMPLATES_LIST,
  ...HOSTING_TEMPLATES_LIST,
];

export const TOTAL_TEMPLATES_COUNT = ALL_TEMPLATES_LIST.length;

export const CATALOG_SUMMARY = {
  total: ALL_TEMPLATES_LIST.length,
  sectors: {
    tech: {
      count: TECH_TEMPLATES.length,
      categories: ['saas-cloud', 'agency-studio', 'b2b-services', 'specialized-tech'],
    },
    retail: {
      count: RETAIL_TEMPLATES_LIST.length,
      categories: ['luxury', 'lifestyle', 'wholesale'],
    },
    hosting: {
      count: HOSTING_TEMPLATES_LIST.length,
      categories: ['compute', 'cloud', 'security-network', 'storage-infra'],
    },
  },
};

/**
 * Retrieve any template by its ID across all 80 templates.
 */
export function getTemplateById(id: string): UniversalTemplate | undefined {
  return ALL_TEMPLATES[id];
}

/**
 * Retrieve templates filtered by their top-level sector.
 */
export function getTemplatesBySector(sector: MasterSector): UniversalTemplate[] {
  switch (sector) {
    case 'tech':
      return TECH_TEMPLATES;
    case 'retail':
      return RETAIL_TEMPLATES_LIST;
    case 'hosting':
      return HOSTING_TEMPLATES_LIST;
    default:
      return ALL_TEMPLATES_LIST;
  }
}

/**
 * Global multi-field search across all 80 templates (name, tags, industry, description).
 */
export function searchAllTemplates(query: string): UniversalTemplate[] {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_TEMPLATES_LIST;

  return ALL_TEMPLATES_LIST.filter((template) => {
    const matchName = template.name.toLowerCase().includes(q);
    const matchIndustry = template.industry.toLowerCase().includes(q);
    const matchDescription = template.description.toLowerCase().includes(q);
    const matchTags = template.tags.some((t) => t.toLowerCase().includes(q));
    return matchName || matchIndustry || matchDescription || matchTags;
  });
}
