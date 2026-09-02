import { TechTemplate, TechCategory } from './types';
import { saasCloudTemplates } from './saas-cloud';
import { agenciesStudiosTemplates } from './agencies-studios';
import { b2bServicesTemplates } from './b2b-services';
import { specializedTechTemplates } from './specialized-tech';

export * from './types';
export * from './helpers';
export * from './saas-cloud';
export * from './agencies-studios';
export * from './b2b-services';
export * from './specialized-tech';

/**
 * Complete master library of 40 authentic, multi-page Tech & Consulting website templates.
 * Covers:
 * - 10 SaaS & Cloud (DevOps CI/CD, FinTech Core, Cloud SIEM, B2B Analytics, API Gateway, AI Platform, IoT Hub, HealthTech, GRC Compliance, HR SaaS)
 * - 10 Agencies & Studios (AI Research Lab, Full-Stack Product Engineering, Cloud Migration, Blockchain Systems, Mobile Foundry, QA Testing, UX/UI Consultancy, Embedded Firmware, Cybersecurity Red Team, FinOps Advisory)
 * - 10 B2B Tech Services (MSP Solutions, Distributed Systems, Database Architecture, Enterprise ERP, CRM Implementation, Supply Chain Ops, LegalTech, InsurTech, AdTech, EdTech)
 * - 10 Specialized Tech (High-Frequency Algorithmic Tools, Spatial AR/VR, GovTech, CleanTech, SpaceTech Logistics, BioTech Data, AgTech Sensors, MarineTech Fleet, Mining Automation, Grid Analytics)
 */
export const TECH_TEMPLATES: TechTemplate[] = [
  ...saasCloudTemplates,
  ...agenciesStudiosTemplates,
  ...b2bServicesTemplates,
  ...specializedTechTemplates,
];

export const TECH_TEMPLATES_COUNT = TECH_TEMPLATES.length;

export const TECH_TEMPLATES_BY_ID: Record<string, TechTemplate> = TECH_TEMPLATES.reduce(
  (acc, template) => {
    acc[template.id] = template;
    return acc;
  },
  {} as Record<string, TechTemplate>
);

export const TECH_CATEGORIES: { id: TechCategory; label: string; count: number }[] = [
  { id: 'saas-cloud', label: 'SaaS & Cloud Platforms', count: saasCloudTemplates.length },
  { id: 'agency-studio', label: 'Engineering Agencies & Studios', count: agenciesStudiosTemplates.length },
  { id: 'b2b-services', label: 'B2B Tech Services & Systems', count: b2bServicesTemplates.length },
  { id: 'specialized-tech', label: 'Specialized Frontier Technologies', count: specializedTechTemplates.length },
];

/**
 * Returns all 40 tech templates.
 */
export function getAllTechTemplates(): TechTemplate[] {
  return TECH_TEMPLATES;
}

/**
 * Finds a tech template by its unique ID.
 */
export function getTechTemplateById(id: string): TechTemplate | undefined {
  return TECH_TEMPLATES_BY_ID[id];
}

/**
 * Filters templates by their primary tech category.
 */
export function getTechTemplatesByCategory(category: TechCategory): TechTemplate[] {
  return TECH_TEMPLATES.filter((template) => template.category === category);
}

/**
 * Performs full-text search across template name, industry, tags, and description.
 */
export function searchTechTemplates(query: string): TechTemplate[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return TECH_TEMPLATES;

  return TECH_TEMPLATES.filter((template) => {
    const matchName = template.name.toLowerCase().includes(normalizedQuery);
    const matchIndustry = template.industry.toLowerCase().includes(normalizedQuery);
    const matchDescription = template.description.toLowerCase().includes(normalizedQuery);
    const matchTags = template.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
    return matchName || matchIndustry || matchDescription || matchTags;
  });
}
