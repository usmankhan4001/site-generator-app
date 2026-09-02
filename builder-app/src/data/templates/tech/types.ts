export interface PuckComponent<T = Record<string, any>> {
  type: string;
  props: T;
  id?: string;
  readOnly?: Record<string, boolean>;
}

export interface PuckPageData {
  title?: string;
  content: PuckComponent[];
  root: {
    title?: string;
    props?: Record<string, any>;
  };
  zones?: Record<string, PuckComponent[]>;
}

export type TechCategory = 'saas-cloud' | 'agency-studio' | 'b2b-services' | 'specialized-tech';

export interface TechTemplateMetadata {
  id: string;
  name: string;
  category: TechCategory;
  categoryLabel: string;
  industry: string;
  description: string;
  tags: string[];
  previewImage: string;
  recommendedTheme: string;
  accentColor: string;
  targetAudience: string;
  corporateRegistration: {
    entityName: string;
    registrationNumber: string;
    jurisdiction: string;
    registeredAddress: string;
    governingLaw: string;
    contactEmail: string;
    contactPhone: string;
    taxId?: string;
  };
}

export interface TechTemplate extends TechTemplateMetadata {
  pages: {
    '/': PuckPageData;
    '/about': PuckPageData;
    '/services': PuckPageData;
    '/contact': PuckPageData;
    '/policies/privacy': PuckPageData;
    '/policies/terms': PuckPageData;
    '/policies/refund': PuckPageData;
    [key: string]: PuckPageData;
  };
}
