/**
 * Every registered entity from the 80 normalized templates, projected for the
 * "use a real registered entity" quick-fill in the Company & Compliance step.
 * Sourced from `NORMALIZED_TEMPLATES` (already-normalized `business` data) —
 * not a re-parse of the raw template files.
 */

import { NORMALIZED_TEMPLATES } from '@/lib/normalizeTemplates';

export interface HarvestedEntity {
  templateId: string;
  sector: 'tech' | 'retail' | 'hosting';
  name: string;
  registrationNumber: string;
  jurisdiction: string;
  governingLaw: string;
  registeredAddress: string;
  email: string;
  phone: string;
  taxId?: string;
  asNumber?: string;
}

export const HARVESTED_ENTITIES: HarvestedEntity[] = NORMALIZED_TEMPLATES.filter(
  (c) => c.source,
).map((c) => ({
  templateId: c.source!.templateId,
  sector: c.source!.sector,
  name: c.business.name,
  registrationNumber: c.business.registrationNumber,
  jurisdiction: c.business.jurisdiction,
  governingLaw: c.business.governingLaw,
  registeredAddress: c.business.registeredAddress,
  email: c.business.email,
  phone: c.business.phone,
  taxId: c.business.taxId,
  asNumber: c.business.asNumber,
}));
