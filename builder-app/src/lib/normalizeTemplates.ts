/**
 * normalizeTemplates.ts — pure data transform.
 *
 * Converts the 80 source website templates (`UniversalTemplate` = tech | retail |
 * hosting) into the canonical `SiteContent` model defined in `src/site/schema.ts`.
 *
 * Nothing here imports React / Node. Deterministic, defensive, never throws on a
 * malformed source prop — everything is coalesced to a sane default.
 *
 *   normalizeTemplate(t)        -> SiteContent
 *   normalizeAllTemplates()     -> SiteContent[]
 *   NORMALIZED_TEMPLATES        -> SiteContent[]  (eager)
 *   getNormalizedTemplate(id)   -> SiteContent | undefined
 *
 * Relative imports (no `@/`) so the module runs under `tsx` without alias config.
 */

import type {
  SiteContent,
  SitePage,
  Section,
  SectionType,
  SiteMode,
  BusinessInfo,
  CatalogItem,
  CtaLink,
  NavItem,
  PolicyBlock,
} from '../site/schema';
import { THEMES, DEFAULT_THEME_ID } from '../site/themes';
import {
  ALL_TEMPLATES_LIST,
  RETAIL_TEMPLATES,
  HOSTING_TEMPLATES,
} from '../data/templates';
import type { UniversalTemplate } from '../data/templates';

/* ============================================================================
 * Small utilities
 * ========================================================================== */

const str = (v: unknown, d = ''): string => (typeof v === 'string' ? v : d);
const num = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) ? v : 0;
const arr = <T = any>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const uniq = <T>(a: T[]): T[] => Array.from(new Set(a));
const undef = (s: string): string | undefined => (s ? s : undefined);

function compact(obj: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) if (v && v.trim()) out[k] = v;
  return out;
}

function firstWord(name: unknown): string {
  const w = String(name ?? '').trim().split(/\s+/)[0];
  return w || 'Brand';
}

function slugify(name: unknown): string {
  return String(name ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function domainFromEmail(email: unknown): string | undefined {
  const s = str(email);
  const at = s.indexOf('@');
  if (at < 0) return undefined;
  const dom = s.slice(at + 1).trim().toLowerCase();
  return dom || undefined;
}

function cleanTaxId(v: unknown): string | undefined {
  const s = str(v).trim();
  if (!s) return undefined;
  if (/^(n\/?a|none|not applicable|applicable upon invoic\w*)$/i.test(s)) return undefined;
  return s;
}

/** Source CTA can be a `{label,href}` object OR a bare string. Normalise both. */
function toCtaLink(v: any, fallbackHref: string): CtaLink | undefined {
  if (!v) return undefined;
  if (typeof v === 'string') return { label: v, href: fallbackHref };
  if (typeof v === 'object' && (v.label || v.href)) {
    return { label: str(v.label), href: str(v.href) || fallbackHref };
  }
  return undefined;
}

function toStat(m: any) {
  return {
    value: str(m?.value),
    label: str(m?.label),
    ...(str(m?.subtext) ? { subtext: str(m.subtext) } : {}),
  };
}

/* ============================================================================
 * Sector detection + personalization heuristic
 * ========================================================================== */

export type Sector = 'tech' | 'retail' | 'hosting';

function sectorOf(t: UniversalTemplate): Sector {
  const id = (t as any).id as string;
  if (Object.prototype.hasOwnProperty.call(HOSTING_TEMPLATES, id)) return 'hosting';
  if (Object.prototype.hasOwnProperty.call(RETAIL_TEMPLATES, id)) return 'retail';
  return 'tech';
}

/** The 3 hand-authored luxury retail templates — real copy, no personalization. */
export const HAND_AUTHORED_RETAIL = new Set<string>([
  'retail-luxury-chronograph',
  'retail-luxury-eyewear',
  'retail-luxury-leather',
]);

function needsPersonalization(id: string, sector: Sector): boolean {
  if (sector === 'tech') return false;
  if (sector === 'hosting') return true;
  return !HAND_AUTHORED_RETAIL.has(id); // retail
}

/* ============================================================================
 * Section alias table (source `type` string -> canonical SectionType[])
 *
 * Reference only — the real mapping lives in `mapComponent()` below, and any
 * source type not handled there is recorded in `UNKNOWN_SECTION_TYPES`.
 * ========================================================================== */

export const SECTION_TYPE_ALIASES: Record<string, SectionType | SectionType[]> = {
  // shared / tech
  Hero: 'hero',
  RetailHero: 'hero',
  HostingHero: 'hero',
  Proof: ['trustBar', 'statsBar'],
  Stats: 'statsBar',
  TrustBadgesBar: ['statsBar', 'trustBar'],
  NetworkThroughputBar: ['statsBar', 'trustBar'],
  Bento: 'featureGrid',
  BentoCollections: 'featureGrid',
  BentoInfrastructure: 'featureGrid',
  Pricing: 'pricingTiers',
  CommercialOfferings: 'pricingTiers',
  ProductShowcase: 'productGrid',
  ProductCatalogGrid: 'productGrid',
  ServerPlansGrid: 'productGrid',
  ServerInventoryGrid: 'productGrid',
  Testimonials: 'testimonials',
  FAQ: 'faq',
  CTA: 'ctaBanner',
  RetailCTA: 'ctaBanner',
  HostingCTA: 'ctaBanner',
  AboutHero: ['pageHeader', 'prose'],
  ServicesHero: 'pageHeader',
  CatalogHero: 'pageHeader',
  ContactHero: 'pageHeader',
  BrandStory: 'prose',
  NetworkArchitecture: 'prose',
  StoryBanner: 'prose',
  CompanyHistory: 'timeline',
  ExecutiveTeam: 'teamGrid',
  CoreValues: 'valueGrid',
  HardwareGuarantees: 'valueGrid',
  ShippingGuaranteeBanner: 'valueGrid',
  DatacenterFacilities: 'valueGrid',
  EngagementProcess: 'processSteps',
  SlaCommitment: 'slaTable',
  DatacenterMapSection: 'locationList',
  CorporateRegistration: 'corporateRegistration',
  ContactForm: 'contactPanel',
  RetailContactForm: 'contactPanel',
  HostingContactForm: 'contactPanel',
  ContactDetails: 'contactPanel',
  NocDetails: 'contactPanel',
  PolicyDocument: 'policyDocument',
  // lifted to site level, never emitted:
  Header: [],
  Footer: [],
};

/** Source section `type` strings encountered that had no mapping rule. */
export const UNKNOWN_SECTION_TYPES = new Set<string>();

const FORM_TYPES = new Set(['ContactForm', 'RetailContactForm', 'HostingContactForm']);
const DETAILS_TYPES = new Set(['ContactDetails', 'NocDetails']);

/* ============================================================================
 * CatalogItem fold — ServiceTierInput | ProductItem | ServerPlanItem
 * ========================================================================== */

export function toCatalogItem(x: any): CatalogItem {
  x = x || {};
  const isServer = x.priceMonthly != null || 'priceMonthly' in x;
  const isProduct = !isServer && (x.sku != null || x.image != null);

  const item: CatalogItem = {
    id: str(x.id) || str(x.sku) || slugify(x.name) || 'item',
    name: str(x.name),
    price: num(isServer ? x.priceMonthly : x.price),
    description: str(x.description),
    features: arr(x.features).map(String),
    popular: !!x.popular,
  };

  if (isServer) {
    item.currency = str(x.currency) || 'USD';
    item.priceUnit = '/mo';
    if (x.setupFee != null) item.setupFee = num(x.setupFee);
    const specs = compact({
      CPU: str(x.cpu),
      RAM: str(x.ram),
      Storage: str(x.storage),
      Bandwidth: str(x.bandwidth),
      'Port Speed': str(x.portSpeed),
    });
    if (Object.keys(specs).length) item.specs = specs;
    if (arr(x.locations).length) item.locations = arr(x.locations).map(String);
    if (str(x.sla)) item.sla = str(x.sla);
    if (str(x.category)) item.category = str(x.category);
    if (!item.description) {
      item.description = [str(x.category), str(x.cpu)].filter(Boolean).join(' — ');
    }
  } else if (isProduct) {
    if (str(x.currency)) item.currency = str(x.currency);
    if (str(x.image)) item.image = str(x.image);
    if (str(x.sku)) item.sku = str(x.sku);
    if (str(x.category)) item.category = str(x.category);
    if (typeof x.inStock === 'boolean') item.inStock = x.inStock;
    if (typeof x.rating === 'number') item.rating = x.rating;
    if (typeof x.reviewCount === 'number') item.reviewCount = x.reviewCount;
    if (x.moq != null) item.moq = num(x.moq);
    if (str(x.unit)) item.unit = str(x.unit);
    if (str(x.leadTime)) item.leadTime = str(x.leadTime);
    if (x.specs && typeof x.specs === 'object') item.specs = { ...x.specs };
  } else {
    // ServiceTierInput
    item.currency = str(x.currency) || 'USD';
    const interval = str(x.interval);
    item.priceUnit =
      interval === 'month'
        ? '/mo'
        : interval === 'year'
          ? '/yr'
          : interval
            ? `/${interval}`
            : undefined;
    if (x.setupFee != null) item.setupFee = num(x.setupFee);
    if (str(x.sla)) item.sla = str(x.sla);
    const specs = compact({
      Commitment: str(x.commitment),
      Turnaround: str(x.turnaround),
      'Ideal for': str(x.idealFor),
    });
    if (Object.keys(specs).length) item.specs = specs;
  }

  return item;
}

/* ============================================================================
 * Component -> canonical section(s)
 * ========================================================================== */

type Emitted = { type: SectionType; props: any };

function mapComponent(comp: any): Emitted[] {
  const type = str(comp?.type);
  const p = comp?.props || {};

  switch (type) {
    /* ---- hero ------------------------------------------------------------- */
    case 'Hero':
    case 'RetailHero':
    case 'HostingHero':
      return [
        {
          type: 'hero',
          props: {
            badge: undef(str(p.badge)),
            headline: str(p.headline),
            accentText: undef(str(p.accentText)),
            subtitle: str(p.subtitle),
            primaryCta: toCtaLink(p.primaryCta, '/contact'),
            secondaryCta: toCtaLink(p.secondaryCta, '/about'),
            image: undef(str(p.image)),
            trustBadges: arr(p.trustBadges).map(String),
            layout: str(p.image) ? 'split' : 'centered',
          },
        },
      ];

    /* ---- Proof -> trustBar (logos) + statsBar --------------------------- */
    case 'Proof': {
      const out: Emitted[] = [];
      const partners = arr(p.partners).map(String);
      const metrics = arr(p.metrics);
      if (partners.length) {
        out.push({
          type: 'trustBar',
          props: { variant: 'logos', title: undef(str(p.title)), items: partners },
        });
      }
      if (metrics.length) {
        out.push({ type: 'statsBar', props: { items: metrics.map(toStat) } });
      }
      return out;
    }

    /* ---- Stats -> statsBar --------------------------------------------- */
    case 'Stats':
      return [{ type: 'statsBar', props: { items: arr(p.stats).map(toStat) } }];

    /* ---- TrustBadgesBar -> statsBar + trustBar (pills) ----------------- */
    case 'TrustBadgesBar': {
      const out: Emitted[] = [];
      const metrics = arr(p.metrics);
      const guarantees = arr(p.guarantees).map(String);
      if (metrics.length) out.push({ type: 'statsBar', props: { items: metrics.map(toStat) } });
      if (guarantees.length) {
        out.push({ type: 'trustBar', props: { variant: 'pills', items: guarantees } });
      }
      return out;
    }

    /* ---- NetworkThroughputBar -> statsBar + trustBar (logos/carriers) - */
    case 'NetworkThroughputBar': {
      const out: Emitted[] = [];
      const metrics = arr(p.metrics);
      const carriers = arr(p.carriers).map(String);
      if (metrics.length) out.push({ type: 'statsBar', props: { items: metrics.map(toStat) } });
      if (carriers.length) {
        out.push({
          type: 'trustBar',
          props: { variant: 'logos', title: 'Carrier & Peering Partners', items: carriers },
        });
      }
      return out;
    }

    /* ---- Bento family -> featureGrid ---------------------------------- */
    case 'Bento':
    case 'BentoCollections':
    case 'BentoInfrastructure':
      return [
        {
          type: 'featureGrid',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            items: [...arr(p.features), ...arr(p.items)].map((f: any) => ({
              title: str(f?.title),
              description: str(f?.description),
              badge: undef(str(f?.badge)),
              image: undef(str(f?.image)),
              icon: undef(str(f?.icon)),
            })),
          },
        },
      ];

    /* ---- pricing family -> pricingTiers ------------------------------- */
    case 'Pricing':
    case 'CommercialOfferings': {
      const tiers = [...arr(p.tiers), ...arr(p.offerings)];
      return [
        {
          type: 'pricingTiers',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            currency: str(tiers[0]?.currency) || 'USD',
            tiers: tiers.map(toCatalogItem),
            ctaHref: '/contact',
          },
        },
      ];
    }

    /* ---- product / plan grids -> productGrid ------------------------- */
    case 'ProductShowcase':
    case 'ProductCatalogGrid':
    case 'ServerPlansGrid':
    case 'ServerInventoryGrid': {
      const isPlans = type === 'ServerPlansGrid' || type === 'ServerInventoryGrid';
      const items = [...arr(p.products), ...arr(p.plans)].map(toCatalogItem);
      const categories = uniq(items.map((i) => i.category).filter(Boolean) as string[]);
      const cta =
        p.ctaText || p.ctaHref
          ? { label: str(p.ctaText) || 'View all', href: str(p.ctaHref) || '/catalog' }
          : undefined;
      return [
        {
          type: 'productGrid',
          props: {
            title: undef(str(p.title)) || (isPlans ? 'Server Plans' : 'Catalog'),
            description: undef(str(p.subtitle)),
            currency: str(p.currency) || 'USD',
            layout: isPlans ? 'plans' : 'products',
            items,
            categories: categories.length ? categories : undefined,
            cta,
          },
        },
      ];
    }

    /* ---- testimonials ----------------------------------------------- */
    case 'Testimonials':
      return [
        {
          type: 'testimonials',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            items: arr(p.testimonials).map((x: any) => ({
              name: str(x?.author) || str(x?.name),
              role: str(x?.role),
              text: str(x?.quote) || str(x?.text),
              ...(typeof x?.rating === 'number' ? { rating: x.rating } : {}),
              ...(str(x?.avatar) ? { avatar: str(x.avatar) } : {}),
              ...(str(x?.company) ? { company: str(x.company) } : {}),
              ...(str(x?.location) ? { location: str(x.location) } : {}),
            })),
          },
        },
      ];

    /* ---- faq ------------------------------------------------------- */
    case 'FAQ':
      return [
        {
          type: 'faq',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            items: arr(p.faqs).map((f: any) => ({ q: str(f?.q), a: str(f?.a) })),
          },
        },
      ];

    /* ---- CTA family -> ctaBanner --------------------------------- */
    case 'CTA':
    case 'RetailCTA':
    case 'HostingCTA':
      return [
        {
          type: 'ctaBanner',
          props: {
            headline: str(p.headline),
            subtitle: undef(str(p.subtitle)),
            primaryCta: toCtaLink(p.primaryCta, '/contact'),
            secondaryCta: toCtaLink(p.secondaryCta, '/about'),
            guarantee: undef(str(p.guarantee)),
          },
        },
      ];

    /* ---- *Hero page headers -> pageHeader (+ prose for tech AboutHero) - */
    case 'AboutHero':
    case 'ServicesHero':
    case 'CatalogHero':
    case 'ContactHero': {
      const out: Emitted[] = [
        {
          type: 'pageHeader',
          props: {
            eyebrow: undef(str(p.badge)),
            headline: str(p.headline),
            subtitle: undef(str(p.subtitle)),
            meta: undef(str(p.responseTime) || str(p.nocResponseTime)),
          },
        },
      ];
      const blocks: PolicyBlock[] = [];
      if (str(p.mission)) blocks.push({ heading: 'Our Mission', body: str(p.mission) });
      if (str(p.story)) blocks.push({ heading: 'Our Story', body: str(p.story) });
      if (blocks.length) out.push({ type: 'prose', props: { blocks } });
      return out;
    }

    /* ---- BrandStory / NetworkArchitecture -> prose -------------- */
    case 'BrandStory': {
      const blocks: PolicyBlock[] = [];
      if (str(p.story)) blocks.push({ heading: 'Our Story', body: str(p.story) });
      if (str(p.craftsmanship)) blocks.push({ heading: 'Craftsmanship', body: str(p.craftsmanship) });
      return [{ type: 'prose', props: { title: undef(str(p.title)), blocks } }];
    }
    case 'NetworkArchitecture': {
      const blocks: PolicyBlock[] = [];
      if (str(p.story)) blocks.push({ heading: 'Network Architecture', body: str(p.story) });
      if (str(p.philosophy)) {
        blocks.push({ heading: 'Infrastructure Philosophy', body: str(p.philosophy) });
      }
      return [{ type: 'prose', props: { title: undef(str(p.title)), blocks } }];
    }

    /* ---- StoryBanner -> prose (image + highlights) ------------- */
    case 'StoryBanner':
      return [
        {
          type: 'prose',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            blocks: str(p.description) ? [{ heading: 'Overview', body: str(p.description) }] : [],
            image: undef(str(p.image)),
            highlights: arr(p.highlights).map(String),
          },
        },
      ];

    /* ---- CompanyHistory -> timeline --------------------------- */
    case 'CompanyHistory':
      return [
        {
          type: 'timeline',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            milestones: arr(p.milestones).map((m: any) => ({
              year: str(m?.year),
              title: str(m?.title),
              description: str(m?.description),
            })),
          },
        },
      ];

    /* ---- ExecutiveTeam -> teamGrid --------------------------- */
    case 'ExecutiveTeam':
      return [
        {
          type: 'teamGrid',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            members: arr(p.members).map((m: any) => ({
              name: str(m?.name),
              role: str(m?.role),
              bio: str(m?.bio),
              credentials: undef(str(m?.credentials)),
              avatar: undef(str(m?.avatar)),
            })),
          },
        },
      ];

    /* ---- value / guarantee / facility grids -> valueGrid ---- */
    case 'CoreValues':
    case 'HardwareGuarantees':
    case 'ShippingGuaranteeBanner':
    case 'DatacenterFacilities': {
      const raw = [...arr(p.values), ...arr(p.items), ...arr(p.facilities)];
      const items = raw.map((v: any) => {
        if (v?.name && (v.tier || v.power || v.location)) {
          return {
            title: str(v.name),
            description: [v.tier, v.power, v.location].filter(Boolean).map(String).join(' · '),
          };
        }
        return {
          ...(str(v?.icon) ? { icon: str(v.icon) } : {}),
          title: str(v?.title),
          description: str(v?.description),
        };
      });
      return [
        {
          type: 'valueGrid',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            items,
          },
        },
      ];
    }

    /* ---- EngagementProcess -> processSteps ------------------ */
    case 'EngagementProcess':
      return [
        {
          type: 'processSteps',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            steps: arr(p.steps).map((s: any) => ({
              step: str(s?.step),
              title: str(s?.title),
              description: str(s?.description),
              duration: undef(str(s?.duration)),
            })),
          },
        },
      ];

    /* ---- SlaCommitment -> slaTable ------------------------- */
    case 'SlaCommitment':
      return [
        {
          type: 'slaTable',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            rows: arr(p.commitments).map((c: any) => ({
              metric: str(c?.metric),
              commitment: str(c?.commitment),
              description: str(c?.description),
            })),
          },
        },
      ];

    /* ---- DatacenterMapSection -> locationList -------------- */
    case 'DatacenterMapSection':
      return [
        {
          type: 'locationList',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            locations: arr(p.locations).map(String),
          },
        },
      ];

    /* ---- CorporateRegistration ---------------------------- */
    case 'CorporateRegistration':
      return [
        {
          type: 'corporateRegistration',
          props: {
            title: undef(str(p.title)),
            description: undef(str(p.subtitle)),
            entityName: undef(str(p.entityName)),
            registrationNumber: undef(str(p.registrationNumber)),
            jurisdiction: undef(str(p.jurisdiction)),
            registeredAddress: undef(str(p.registeredAddress)),
            governingLaw: undef(str(p.governingLaw)),
            taxId: cleanTaxId(p.taxId),
            asNumber: undef(str(p.asNumber)),
            contactEmail: undef(str(p.contactEmail)),
            contactPhone: undef(str(p.contactPhone)),
          },
        },
      ];

    /* ---- PolicyDocument: regenerated at page level -------- */
    case 'PolicyDocument':
      return [];

    /* ---- lifted to site level --------------------------- */
    case 'Header':
    case 'Footer':
      return [];

    /* ---- form / details handled by buildSections merge -- */
    case 'ContactForm':
    case 'RetailContactForm':
    case 'HostingContactForm':
    case 'ContactDetails':
    case 'NocDetails':
      return [];

    default:
      if (type) UNKNOWN_SECTION_TYPES.add(type);
      return [];
  }
}

/* ============================================================================
 * Contact panel merge (form + details -> ONE contactPanel)
 * ========================================================================== */

function buildContactPanel(formComp: any, detailsComp: any, sector: Sector): Emitted {
  const f = formComp?.props || {};
  const d = detailsComp?.props || {};

  const selectField = arr<any>(f.fields).find((x) => x && x.type === 'select');
  const inquiryOptions = selectField ? arr(selectField.options).map(String) : [];

  let formVariant: 'standard' | 'enterprise' | 'wholesale' | 'noc';
  if (sector === 'tech') formVariant = 'enterprise';
  else if (sector === 'hosting') formVariant = 'noc';
  else if (f.isWholesale) formVariant = 'wholesale';
  else formVariant = 'standard';

  let offices: any[] = [];
  if (Array.isArray(d.offices)) {
    offices = d.offices.map((o: any) => ({
      city: str(o?.city),
      address: undef(str(o?.address)),
      role: undef(str(o?.role)),
    }));
  } else if (Array.isArray(d.datacenters)) {
    offices = d.datacenters.map((o: any) => ({
      city: str(o?.city),
      facility: undef(str(o?.facility)),
      address: undef(str(o?.address)),
    }));
  } else if (d.showroomOrHub && typeof d.showroomOrHub === 'object') {
    offices = [
      {
        city: str(d.showroomOrHub.name),
        address: undef(str(d.showroomOrHub.address)),
        role: 'Showroom & Client Services',
      },
    ];
  }

  return {
    type: 'contactPanel',
    props: {
      title: undef(str(f.title)) || 'Contact Us',
      description: undef(str(f.subtitle)),
      formVariant,
      inquiryOptions: inquiryOptions.length ? inquiryOptions : undefined,
      submitLabel: undef(str(f.submitButtonText)),
      showDetails: true,
      supportHours: undef(str(d.supportHours) || str(d.hours)),
      offices: offices.length ? offices : undefined,
    },
  };
}

/* ============================================================================
 * Page section builder — strips Header/Footer, merges contact pair, ids
 * ========================================================================== */

function buildSections(content: any[], pageKey: string, sector: Sector): Section[] {
  const emitted: Emitted[] = [];
  let pendingForm: any = null;

  for (const comp of content) {
    const type = str(comp?.type);
    if (type === 'Header' || type === 'Footer') continue;
    if (FORM_TYPES.has(type)) {
      pendingForm = comp;
      continue;
    }
    if (DETAILS_TYPES.has(type)) {
      emitted.push(buildContactPanel(pendingForm, comp, sector));
      pendingForm = null;
      continue;
    }
    for (const e of mapComponent(comp)) emitted.push(e);
  }
  if (pendingForm) emitted.push(buildContactPanel(pendingForm, null, sector));

  return emitted.map(
    (e, i) =>
      ({
        id: `${pageKey}-${e.type}-${i}`,
        enabled: true,
        type: e.type,
        props: e.props,
      }) as unknown as Section,
  );
}

/* ============================================================================
 * Policy regeneration (ported from template/src/lib/constants.ts, adapted to
 * BusinessInfo + split into PolicyBlock[] on `## ` headings)
 * ========================================================================== */

function getPrivacyPolicy(b: BusinessInfo): string {
  return `
# Privacy Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

This Privacy Policy describes how **${b.name}** ("we," "our," or "us"), registered in ${b.jurisdiction} (Registration No. ${b.registrationNumber}), collects, uses, and protects your personal information when you visit our website (${b.website}) or engage our services.

## 1. Information We Collect
- **Contact Details:** Name, business email, telephone number, job title, and company name.
- **Billing Information:** Invoicing address, tax identification numbers, and payment details processed via secure, PCI-DSS compliant payment gateways.
- **Technical Telemetry:** IP address, browser type, device identifiers, and website usage telemetry collected via secure cookies.

## 2. How We Use Your Information
- To deliver, maintain, and optimize our services and deliverables.
- To execute contracts, invoice services, and comply with statutory financial auditing obligations under ${b.governingLaw}.
- To communicate project milestones, service updates, and security notices.

## 3. Data Protection & Security
We employ industry-standard 256-bit SSL encryption, role-based access control (RBAC), and SOC2-compliant cloud storage to safeguard your data against unauthorized access, alteration, or disclosure.

## 4. Third-Party Disclosures
We do not sell, rent, or trade your personal data. Data is shared strictly with essential service partners bound by strict confidentiality agreements.

## 5. Your Rights
Under applicable data protection laws, you have the right to access, rectify, or request deletion of your personal information. Contact our Data Protection Officer at **${b.email}**.

## 6. Contact Information
**${b.name}** — Business Registration No. ${b.registrationNumber}. Registered Address: ${b.registeredAddress}. Email: ${b.email} | Phone: ${b.phone}.
`.trim();
}

function getTermsConditions(b: BusinessInfo): string {
  return `
# Terms and Conditions of Service

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

These Terms and Conditions ("Terms") constitute a legally binding agreement between the client ("you") and **${b.name}** ("we," "us"), registered under the laws of ${b.jurisdiction} (Registration No. ${b.registrationNumber}).

## 1. Services & Deliverables
We provide professional technology, retail, or infrastructure services as described in the service tier, catalogue, or agreed Scope of Work (SOW). All deliverables are produced to professional commercial standards.

## 2. Payment Terms
- All fees are quoted in the currency indicated on our website or order confirmation.
- Payments may be remitted via corporate bank transfer, credit card, or authorized invoice gateway.
- Invoices are due upon receipt unless agreed otherwise in writing.

## 3. Intellectual Property Rights
Upon full payment of all fees due, all custom code, configurations, and deliverables developed specifically for the client shall become the exclusive intellectual property of the client. Pre-existing frameworks and reusable libraries remain the property of ${b.name}.

## 4. Limitation of Liability
To the maximum extent permitted by ${b.governingLaw}, our maximum aggregate liability arising out of or related to our services shall not exceed the total fees paid by the client in the preceding three (3) months.

## 5. Governing Law & Jurisdiction
These Terms shall be governed by and construed in accordance with **${b.governingLaw}**. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of ${b.jurisdiction}.

## 6. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Email: ${b.email} | Phone: ${b.phone}.
`.trim();
}

function getRefundPolicy(b: BusinessInfo): string {
  return `
# Refund and Cancellation Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

At **${b.name}**, we are committed to delivering the highest caliber of service. This policy outlines our refund and cancellation terms in accordance with consumer protection standards and payment card network requirements.

## 1. Professional Engagements & Products
- If you request cancellation before project initiation, you are entitled to a **100% full refund**.
- If you are dissatisfied with an initial milestone delivery within **14 calendar days**, contact our support team to request a review or prorated refund for unperformed scope.

## 2. Managed & Subscription Services
- Monthly support retainers may be cancelled at any time with 30 days written notice prior to the next billing cycle.
- Annual commitments cancelled within the first 30 days are eligible for a prorated refund of unused months.

## 3. Physical Product / Hardware Purchases
- Physical items may be returned in original, unopened packaging within **30 days of delivery** for a full refund.
- Defective items will be replaced immediately with express shipping at our expense.

## 4. Refund Processing Time
Approved refunds are processed to the original payment method (bank account or credit card) within **5 to 10 business days**.

## 5. How to Request a Refund
Please email **${b.email}** with your Order ID, invoice number, and reason for the request. Our management team responds within 2 business days.

## 6. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Governed by ${b.governingLaw}.
`.trim();
}

function getShippingPolicy(b: BusinessInfo): string {
  return `
# Shipping and Delivery Policy

**Effective Date:** January 1, 2026
**Last Updated:** August 1, 2026

## 1. Digital Service Delivery
- **Instant Delivery:** Digital software access, account credentials, and platform provisioning are initiated within **1 to 24 hours** of confirmed payment.
- **Consulting Engagements:** Project kickoff and onboarding materials are delivered electronically via secure client portal within 1 business day.

## 2. Physical Deliveries (Hardware & Goods)
- **Courier Partners:** We dispatch physical goods via DHL Express, FedEx, and regional freight carriers.
- **Estimated Transit Times:** Domestic / regional delivery **1 - 3 business days**; international express delivery **3 - 7 business days**.
- **Tracking:** Real-time tracking numbers are automatically emailed upon parcel dispatch.

## 3. Customs, Duties & Insurance
International shipments may be subject to import duties and taxes determined by the destination customs authority. All parcels are insured against loss or transit damage until signed for by the recipient.

## 4. Contact for Shipping Inquiries
For questions regarding digital provisioning or parcel dispatch, contact **${b.email}** or call **${b.phone}**.

## 5. Contact Information
**${b.name}** — Registration No. ${b.registrationNumber}. Address: ${b.registeredAddress}. Governed by ${b.governingLaw}.
`.trim();
}

const POLICY_TITLE: Record<string, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  refund: 'Refund & Cancellation Policy',
  shipping: 'Shipping & Delivery Policy',
};

/** Split policy markdown into `{ title, lastUpdated, blocks[] }` on `## ` headings. */
function splitPolicy(md: string, slug: string): {
  title: string;
  lastUpdated: string;
  blocks: PolicyBlock[];
} {
  const lines = md.split('\n');
  let title = POLICY_TITLE[slug] || 'Policy';
  let lastUpdated = '';
  const blocks: PolicyBlock[] = [];
  let heading = 'Overview';
  let body: string[] = [];

  const flush = () => {
    const text = body.join('\n').trim();
    if (text) blocks.push({ heading, body: text });
    body = [];
  };

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    if (h1) {
      title = h1[1].trim();
      continue;
    }
    if (h2) {
      flush();
      heading = h2[1].trim();
      continue;
    }
    const lu = line.match(/\*\*Last Updated:\*\*\s*(.+)/i);
    if (lu) {
      lastUpdated = lu[1].trim();
      continue;
    }
    if (/\*\*Effective Date:\*\*/i.test(line)) continue;
    body.push(line);
  }
  flush();

  return { title, lastUpdated: lastUpdated || 'August 1, 2026', blocks };
}

function buildPolicyPage(slug: string, business: BusinessInfo): SitePage {
  const md =
    slug === 'privacy'
      ? getPrivacyPolicy(business)
      : slug === 'terms'
        ? getTermsConditions(business)
        : slug === 'refund'
          ? getRefundPolicy(business)
          : getShippingPolicy(business);

  const { title, lastUpdated, blocks } = splitPolicy(md, slug);

  const section = {
    id: `policy-${slug}-policyDocument-0`,
    enabled: true,
    type: 'policyDocument',
    props: { title, lastUpdated, sections: blocks },
  } as unknown as Section;

  return {
    key: `policy:${slug}`,
    path: `/policies/${slug}`,
    title,
    navLabel: title,
    nav: false,
    sections: [section],
  };
}

/* ============================================================================
 * Header / footer / nav
 * ========================================================================== */

function findComponent(pages: Record<string, any>, type: string): any {
  for (const pg of Object.values(pages)) {
    const hit = arr<any>(pg?.content).find((c) => c?.type === type);
    if (hit) return hit;
  }
  return undefined;
}

function findHero(pages: Record<string, any>): any {
  const home = pages['/'];
  return arr<any>(home?.content).find((c) =>
    ['Hero', 'RetailHero', 'HostingHero'].includes(str(c?.type)),
  );
}

function defaultNav(sector: Sector): NavItem[] {
  const offerings =
    sector === 'tech'
      ? { label: 'Services', href: '/services' }
      : { label: 'Catalog', href: '/catalog' };
  return [
    { label: 'Home', href: '/' },
    offerings,
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
}

/* ============================================================================
 * Route mapping
 * ========================================================================== */

const ROUTE_MAP: Record<string, { key: string; navLabel: string }> = {
  '/': { key: 'home', navLabel: 'Home' },
  '/about': { key: 'about', navLabel: 'About' },
  '/services': { key: 'offerings', navLabel: 'Services' },
  '/catalog': { key: 'offerings', navLabel: 'Catalog' },
  '/contact': { key: 'contact', navLabel: 'Contact' },
};

/* ============================================================================
 * Main
 * ========================================================================== */

export function normalizeTemplate(t: UniversalTemplate): SiteContent {
  const meta = t as any;
  const sector = sectorOf(t);
  const reg = meta.corporateRegistration || {};

  /* ---- business --------------------------------------------------------- */
  const business: BusinessInfo = {
    name: str(reg.entityName) || str(meta.name),
    shortName: firstWord(meta.name),
    registrationNumber: str(reg.registrationNumber),
    jurisdiction: str(reg.jurisdiction),
    governingLaw: str(reg.governingLaw),
    registeredAddress: str(reg.registeredAddress),
    email: str(reg.contactEmail),
    phone: str(reg.contactPhone),
    website: domainFromEmail(reg.contactEmail) || `${slugify(firstWord(meta.name))}.com`,
    taxId: cleanTaxId(reg.taxId ?? reg.vatOrTaxId),
    asNumber:
      sector === 'hosting'
        ? undef(str(reg.asNumber) || str(meta.asNumber))
        : undefined,
    supportHours: undefined,
  };

  /* ---- mode / theme / accent ----------------------------------------- */
  const mode: SiteMode = sector === 'retail' ? 'ecommerce' : 'services';
  const themeId = THEMES[str(meta.recommendedTheme)] ? str(meta.recommendedTheme) : DEFAULT_THEME_ID;
  const accent = undef(str(meta.accentColor));

  const srcPages: Record<string, any> = meta.pages || {};
  const homeSrc = srcPages['/'] || { content: [], title: str(meta.name) };

  /* ---- header / nav / brand ---------------------------------------- */
  const header = findComponent(srcPages, 'Header');
  const footer = findComponent(srcPages, 'Footer');

  const navItems: NavItem[] = arr<any>(header?.props?.navItems)
    .map((n) => ({ label: str(n?.label), href: str(n?.href) }))
    .filter((n) => n.label && n.href);
  const nav = navItems.length ? navItems : defaultNav(sector);

  const logoText = str(header?.props?.logoText) || business.shortName;
  const headerCta: CtaLink | undefined = header?.props?.ctaText
    ? { label: str(header.props.ctaText), href: str(header.props.ctaHref) || '/contact' }
    : undefined;

  /* ---- footer ----------------------------------------------------- */
  const footerLinks: NavItem[] = arr<any>(footer?.props?.links)
    .map((l) => ({ label: str(l?.label), href: str(l?.href) }))
    .filter((l) => l.label && l.href);
  const legalLinks = footerLinks.filter((l) => l.href.startsWith('/policies/'));
  const columnLinks = footerLinks.filter((l) => !l.href.startsWith('/policies/'));
  const heroSubtitle = str(findHero(srcPages)?.props?.subtitle);

  const footerObj: SiteContent['footer'] = {
    tagline: undef(heroSubtitle || str(meta.description)),
    columns: columnLinks.length ? [{ title: logoText || 'Company', links: columnLinks }] : [],
    legalLinks,
    showLegalBar: true,
    showPaymentBadges: mode === 'ecommerce',
  };

  /* ---- pages ---------------------------------------------------- */
  const pages: SitePage[] = [];
  let formspreeId: string | undefined;

  for (const [route, srcPage] of Object.entries(srcPages)) {
    if (route.startsWith('/policies/')) continue;
    const rm = ROUTE_MAP[route];
    const pageKey = rm?.key || slugify(route) || 'page';

    const content = arr<any>(srcPage?.content).filter(
      (c) => c && c.type !== 'Header' && c.type !== 'Footer',
    );

    for (const c of content) {
      const ep = c?.props?.formspreeEndpoint;
      if (typeof ep === 'string' && ep.includes('/f/')) {
        formspreeId = ep.split('/f/')[1]?.trim() || formspreeId;
      }
    }

    pages.push({
      key: pageKey,
      path: route,
      title: str(srcPage?.title) || str(meta.name),
      navLabel: rm?.navLabel,
      nav: !!rm,
      sections: buildSections(content, pageKey, sector),
    });
  }

  /* ---- policy pages (regenerated) ---------------------------- */
  const policySlugs = sector === 'retail'
    ? ['privacy', 'terms', 'refund', 'shipping']
    : ['privacy', 'terms', 'refund'];
  for (const slug of policySlugs) {
    if (!srcPages[`/policies/${slug}`]) continue;
    pages.push(buildPolicyPage(slug, business));
  }

  /* ---- assemble --------------------------------------------- */
  const site: SiteContent = {
    version: 1,
    business,
    mode,
    themeId,
    ...(accent ? { accent } : {}),
    ...(formspreeId ? { formspreeId } : {}),
    brand: { logoText },
    nav,
    ...(headerCta ? { headerCta } : {}),
    footer: footerObj,
    pages,
    meta: {
      title: str(homeSrc?.title) || str(meta.name),
      description: str(meta.description),
      ...(str(meta.previewImage) ? { ogImage: str(meta.previewImage) } : {}),
    },
    source: {
      templateId: str(meta.id),
      sector,
      needsPersonalization: needsPersonalization(str(meta.id), sector),
    },
  };

  return site;
}

export function normalizeAllTemplates(): SiteContent[] {
  return ALL_TEMPLATES_LIST.map(normalizeTemplate);
}

export const NORMALIZED_TEMPLATES: SiteContent[] = normalizeAllTemplates();

const NORMALIZED_BY_ID = new Map<string, SiteContent>(
  NORMALIZED_TEMPLATES.map((s) => [s.source!.templateId, s]),
);

export function getNormalizedTemplate(id: string): SiteContent | undefined {
  return NORMALIZED_BY_ID.get(id);
}
