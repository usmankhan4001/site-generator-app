import { PuckPageData } from '../tech/types';

export type RetailSubCategory = 'luxury' | 'lifestyle' | 'wholesale';

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  currency?: string;
  sku: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  inStock: boolean;
  moq?: number;
  unit?: string;
  leadTime?: string;
  specs?: Record<string, string>;
  popular?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface RetailCorporateRegistration {
  entityName: string;
  registrationNumber: string;
  jurisdiction: string;
  registeredAddress: string;
  governingLaw: string;
  contactEmail: string;
  contactPhone: string;
  vatOrTaxId?: string;
  fulfillmentHub?: string;
}

export interface RetailTemplateMetadata {
  id: string;
  name: string;
  subCategory: RetailSubCategory;
  categoryLabel: string;
  industry: string;
  tagline: string;
  description: string;
  tags: string[];
  previewImage: string;
  recommendedTheme: string;
  accentColor: string;
  currency: string;
  targetAudience: string;
  corporateRegistration: RetailCorporateRegistration;
}

export interface RetailTemplate extends RetailTemplateMetadata {
  pages: {
    '/': PuckPageData;
    '/about': PuckPageData;
    '/catalog': PuckPageData;
    '/contact': PuckPageData;
    '/policies/privacy': PuckPageData;
    '/policies/terms': PuckPageData;
    '/policies/refund': PuckPageData;
    '/policies/shipping': PuckPageData;
    [key: string]: PuckPageData;
  };
}
