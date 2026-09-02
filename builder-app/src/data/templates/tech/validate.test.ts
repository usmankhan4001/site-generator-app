import { TECH_TEMPLATES } from './index';

const requiredPages = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/policies/privacy',
  '/policies/terms',
  '/policies/refund',
];

const errors: string[] = [];

for (const t of TECH_TEMPLATES) {
  if (
    !t.id ||
    !t.name ||
    !t.category ||
    !t.industry ||
    !t.description ||
    !t.tags ||
    !t.previewImage ||
    !t.recommendedTheme ||
    !t.corporateRegistration
  ) {
    errors.push(`Template missing metadata: ${t.id}`);
  }

  for (const page of requiredPages) {
    if (!t.pages[page]) {
      errors.push(`${t.id} missing page: ${page}`);
    } else {
      const types = t.pages[page].content.map((c) => c.type);
      if (page === '/') {
        for (const reqType of [
          'Header',
          'Hero',
          'Proof',
          'Bento',
          'Stats',
          'Pricing',
          'Testimonials',
          'FAQ',
          'CTA',
          'Footer',
        ]) {
          if (!types.includes(reqType)) errors.push(`${t.id} page / missing ${reqType}`);
        }
      } else if (page === '/about') {
        for (const reqType of [
          'Header',
          'AboutHero',
          'CompanyHistory',
          'ExecutiveTeam',
          'CorporateRegistration',
          'CTA',
          'Footer',
        ]) {
          if (!types.includes(reqType)) errors.push(`${t.id} page /about missing ${reqType}`);
        }
      } else if (page === '/services') {
        for (const reqType of [
          'Header',
          'ServicesHero',
          'CommercialOfferings',
          'EngagementProcess',
          'CTA',
          'Footer',
        ]) {
          if (!types.includes(reqType)) errors.push(`${t.id} page /services missing ${reqType}`);
        }
      } else if (page === '/contact') {
        for (const reqType of ['Header', 'ContactHero', 'ContactForm', 'ContactDetails', 'Footer']) {
          if (!types.includes(reqType)) errors.push(`${t.id} page /contact missing ${reqType}`);
        }
      } else if (page.startsWith('/policies/')) {
        for (const reqType of ['Header', 'PolicyDocument', 'Footer']) {
          if (!types.includes(reqType)) errors.push(`${t.id} page ${page} missing ${reqType}`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Validation errors found:');
  console.error(errors.join('\n'));
  process.exit(1);
} else {
  console.log(`SUCCESS: All ${TECH_TEMPLATES.length} tech templates passed 100% of validation checks across all 7 pages!`);
}
