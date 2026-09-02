import { HOSTING_TEMPLATES, HOSTING_TEMPLATES_LIST } from './templates';
import { HostingTemplate, HostingCategory } from './types';

export * from './types';
export * from './helpers';
export * from './templates';

export { HOSTING_TEMPLATES, HOSTING_TEMPLATES_LIST };

export function getHostingTemplateById(id: string): HostingTemplate | undefined {
  return HOSTING_TEMPLATES[id];
}

export function getHostingTemplatesByCategory(category: HostingCategory): HostingTemplate[] {
  return HOSTING_TEMPLATES_LIST.filter((t) => t.category === category);
}
