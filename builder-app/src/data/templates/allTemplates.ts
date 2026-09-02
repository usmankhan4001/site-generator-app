import { TECH_TEMPLATES } from './tech';
import { HOSTING_TEMPLATES_LIST } from './hosting';
import { RETAIL_TEMPLATES_LIST } from './retail';

export interface UnifiedStudioTemplate {
  id: string;
  name: string;
  group: 'tech' | 'hosting' | 'retail';
  groupLabel: string;
  categoryLabel: string;
  industry: string;
  tagline: string;
  description: string;
  previewImage: string;
  accentColor: string;
  recommendedTheme: string;
  corporateRegistration?: {
    entityName: string;
    registrationNumber: string;
    jurisdiction: string;
    registeredAddress: string;
    governingLaw: string;
    contactEmail: string;
    contactPhone: string;
  };
  tags: string[];
}

// 40 Tech Templates
const mappedTechTemplates: UnifiedStudioTemplate[] = TECH_TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  group: 'tech',
  groupLabel: 'Tech & SaaS',
  categoryLabel: t.categoryLabel || 'Software & Cloud',
  industry: t.industry,
  tagline: (t as any).tagline || t.description,
  description: t.description,
  previewImage: t.previewImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  accentColor: t.accentColor || '#6366f1',
  recommendedTheme: t.recommendedTheme || 'indigo-enterprise',
  corporateRegistration: t.corporateRegistration ? {
    entityName: t.corporateRegistration.entityName,
    registrationNumber: t.corporateRegistration.registrationNumber,
    jurisdiction: t.corporateRegistration.jurisdiction,
    registeredAddress: t.corporateRegistration.registeredAddress,
    governingLaw: t.corporateRegistration.governingLaw,
    contactEmail: t.corporateRegistration.contactEmail,
    contactPhone: t.corporateRegistration.contactPhone,
  } : undefined,
  tags: t.tags || [t.industry],
}));

// 20 Hosting Templates
const mappedHostingTemplates: UnifiedStudioTemplate[] = HOSTING_TEMPLATES_LIST.map((h) => ({
  id: h.id,
  name: h.name,
  group: 'hosting',
  groupLabel: 'Cloud & Hosting',
  categoryLabel: h.categoryLabel || 'Infrastructure & Cloud',
  industry: h.industry,
  tagline: h.tagline,
  description: h.description,
  previewImage: h.previewImage || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  accentColor: h.accentColor || '#0ea5e9',
  recommendedTheme: h.recommendedTheme || 'electric-cyan',
  corporateRegistration: h.corporateRegistration ? {
    entityName: h.corporateRegistration.entityName,
    registrationNumber: h.corporateRegistration.registrationNumber,
    jurisdiction: h.corporateRegistration.jurisdiction,
    registeredAddress: h.corporateRegistration.registeredAddress,
    governingLaw: h.corporateRegistration.governingLaw,
    contactEmail: h.corporateRegistration.contactEmail,
    contactPhone: h.corporateRegistration.contactPhone,
  } : undefined,
  tags: h.tags || [h.industry],
}));

// 20 Retail Templates
const mappedRetailTemplates: UnifiedStudioTemplate[] = RETAIL_TEMPLATES_LIST.map((r) => ({
  id: r.id,
  name: r.name,
  group: 'retail',
  groupLabel: 'Retail & E-Commerce',
  categoryLabel: r.categoryLabel || 'Retail & Goods',
  industry: r.industry,
  tagline: r.tagline,
  description: r.description,
  previewImage: r.previewImage || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  accentColor: r.accentColor || '#ec4899',
  recommendedTheme: r.recommendedTheme || 'monochrome-atelier',
  corporateRegistration: r.corporateRegistration ? {
    entityName: r.corporateRegistration.entityName,
    registrationNumber: r.corporateRegistration.registrationNumber,
    jurisdiction: r.corporateRegistration.jurisdiction,
    registeredAddress: r.corporateRegistration.registeredAddress,
    governingLaw: r.corporateRegistration.governingLaw,
    contactEmail: r.corporateRegistration.contactEmail,
    contactPhone: r.corporateRegistration.contactPhone,
  } : undefined,
  tags: r.tags || [r.industry],
}));

export const ALL_STUDIO_TEMPLATES: UnifiedStudioTemplate[] = [
  ...mappedTechTemplates,
  ...mappedHostingTemplates,
  ...mappedRetailTemplates,
];

export const TOTAL_STUDIO_TEMPLATES_COUNT = ALL_STUDIO_TEMPLATES.length; // 80 templates
