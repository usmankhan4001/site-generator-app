import { LUXURY_TEMPLATES, LUXURY_TEMPLATES_LIST } from './luxury';
import { LIFESTYLE_TEMPLATES, LIFESTYLE_TEMPLATES_LIST } from './lifestyle';
import { WHOLESALE_TEMPLATES, WHOLESALE_TEMPLATES_LIST } from './wholesale';
import { RetailTemplate, RetailSubCategory } from './types';

export * from './types';
export * from './helpers';
export * from './luxury';
export * from './lifestyle';
export * from './wholesale';

export const RETAIL_TEMPLATES: Record<string, RetailTemplate> = {
  ...LUXURY_TEMPLATES,
  ...LIFESTYLE_TEMPLATES,
  ...WHOLESALE_TEMPLATES,
};

export const RETAIL_TEMPLATES_LIST: RetailTemplate[] = [
  ...LUXURY_TEMPLATES_LIST,
  ...LIFESTYLE_TEMPLATES_LIST,
  ...WHOLESALE_TEMPLATES_LIST,
];

export function getRetailTemplateById(id: string): RetailTemplate | undefined {
  return RETAIL_TEMPLATES[id];
}

export function getRetailTemplatesBySubCategory(subCategory: RetailSubCategory): RetailTemplate[] {
  return RETAIL_TEMPLATES_LIST.filter((t) => t.subCategory === subCategory);
}
