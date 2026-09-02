import { PuckPageData } from '../tech/types';

export type HostingCategory = 'compute' | 'cloud' | 'security-network' | 'storage-infra';

export interface ServerPlanItem {
  id: string;
  name: string;
  category: string;
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  portSpeed: string;
  priceMonthly: number;
  priceHourly?: number;
  setupFee?: number;
  locations: string[];
  popular?: boolean;
  sla: string;
  features: string[];
  instantDeploy: boolean;
}

export interface HostingCorporateRegistration {
  entityName: string;
  registrationNumber: string;
  jurisdiction: string;
  registeredAddress: string;
  governingLaw: string;
  contactEmail: string;
  contactPhone: string;
  nocEmergencyPhone?: string;
  asNumber?: string;
  taxId?: string;
}

export interface HostingTemplateMetadata {
  id: string;
  name: string;
  category: HostingCategory;
  categoryLabel: string;
  industry: string;
  tagline: string;
  description: string;
  tags: string[];
  previewImage: string;
  recommendedTheme: string;
  accentColor: string;
  targetAudience: string;
  asNumber?: string;
  corporateRegistration: HostingCorporateRegistration;
}

export interface HostingTemplate extends HostingTemplateMetadata {
  pages: {
    '/': PuckPageData;
    '/about': PuckPageData;
    '/catalog': PuckPageData;
    '/contact': PuckPageData;
    '/policies/privacy': PuckPageData;
    '/policies/terms': PuckPageData;
    '/policies/refund': PuckPageData;
    [key: string]: PuckPageData;
  };
}
