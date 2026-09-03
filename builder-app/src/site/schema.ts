/**
 * Site Kit — content schema (single source of truth).
 *
 * `SiteContent` is the entire, serialisable description of one generated website.
 * It is produced by the studio configurator (and the template normalizer), stored
 * as JSON on `Project.content`, rendered live by `<SiteRenderer>` in the studio
 * preview, and written verbatim to `src/content/site.ts` inside every generated
 * site. The same `sections/*` renderers consume it in both places — zero drift.
 *
 * Nothing in this file imports React or Node. Keep it pure types + small consts.
 */

/* ============================================================================
 * Business / legal entity
 * ========================================================================== */

export interface BusinessInfo {
  /** Full legal entity name, e.g. "Vantage Cloud Technologies Limited". */
  name: string;
  /** Short brand name for the logo + copy, e.g. "Vantage". */
  shortName: string;
  /** Statutory company/registration number as issued by the registry. */
  registrationNumber: string;
  /** Where the entity is registered, e.g. "Singapore", "Delaware, USA". */
  jurisdiction: string;
  /** Governing-law phrase for policy prose, e.g. "the laws of Singapore". */
  governingLaw: string;
  /** Full registered office address on one line. */
  registeredAddress: string;
  /** Primary contact / support email. */
  email: string;
  /** Primary contact phone in international format. */
  phone: string;
  /** Public domain, no protocol, e.g. "vantagecloud.io". */
  website: string;
  /** VAT / tax identifier, shown on the registration panel when present. */
  taxId?: string;
  /** Autonomous System number for hosting entities, e.g. "AS201432". */
  asNumber?: string;
  /** Human support hours line, e.g. "Mon–Fri, 09:00–18:00 (GMT+8)". */
  supportHours?: string;
}

/* ============================================================================
 * Shared value objects
 * ========================================================================== */

export interface CtaLink {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface Testimonial {
  name: string;
  role: string;
  /** The quote body, no surrounding quotation marks. */
  text: string;
  rating?: number;
  avatar?: string;
  company?: string;
  location?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  credentials?: string;
  avatar?: string;
}

export interface ProcessStep {
  /** Ordinal label, e.g. "01" or "Step 1". */
  step: string;
  title: string;
  description: string;
  duration?: string;
}

export interface IconItem {
  /** lucide-react icon name (PascalCase). Renderer falls back to a dot. */
  icon?: string;
  title: string;
  description: string;
}

export interface SlaRow {
  metric: string;
  commitment: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

/**
 * One item in a catalogue. Superset of the three source shapes
 * (service tier | retail product | server plan). Renderers read only the
 * fields relevant to their `layout`.
 */
export interface CatalogItem {
  id: string;
  name: string;
  /** Numeric price; `0` renders as "Custom" / "Contact us". */
  price: number;
  /** Currency ISO code for this item; overrides the section currency. */
  currency?: string;
  /** Suffix after the price, e.g. "/mo", "/project", " one-off". */
  priceUnit?: string;
  description: string;
  features: string[];
  popular?: boolean;
  /** Small ribbon text, e.g. "Best value", "New". */
  badge?: string;

  // Retail product fields
  image?: string;
  sku?: string;
  category?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;

  // Wholesale fields
  moq?: number;
  unit?: string;
  leadTime?: string;

  // Server-plan fields
  /** Ordered spec pairs, e.g. { CPU: "8 vCPU", RAM: "32 GB" }. */
  specs?: Record<string, string>;
  locations?: string[];
  sla?: string;
  setupFee?: number;
}

export interface PolicyBlock {
  heading: string;
  /** Markdown-lite: paragraphs, `**bold**`, `-` lists. Rendered by PolicyDocument. */
  body: string;
}

/* ============================================================================
 * Sections
 * ========================================================================== */

/**
 * The canonical section set. Every source template section collapses onto one
 * of these via the alias table in `src/lib/normalizeTemplates.ts`.
 */
export type SectionType =
  | 'hero'
  | 'statsBar'
  | 'trustBar'
  | 'featureGrid'
  | 'pricingTiers'
  | 'productGrid'
  | 'testimonials'
  | 'faq'
  | 'ctaBanner'
  | 'pageHeader'
  | 'prose'
  | 'timeline'
  | 'teamGrid'
  | 'valueGrid'
  | 'processSteps'
  | 'slaTable'
  | 'locationList'
  | 'corporateRegistration'
  | 'contactPanel'
  | 'policyDocument'
  | 'checkout';

export const SECTION_TYPES: SectionType[] = [
  'hero',
  'statsBar',
  'trustBar',
  'featureGrid',
  'pricingTiers',
  'productGrid',
  'testimonials',
  'faq',
  'ctaBanner',
  'pageHeader',
  'prose',
  'timeline',
  'teamGrid',
  'valueGrid',
  'processSteps',
  'slaTable',
  'locationList',
  'corporateRegistration',
  'contactPanel',
  'policyDocument',
  'checkout',
];

/**
 * type → `src/site/sections/<File>.tsx` (default export, same base name).
 * `SiteRenderer` / `registry.ts` wire these; Agent building the sections must
 * match these file names + default-export a component taking `{ props, content }`.
 *
 *  hero                  -> Hero.tsx
 *  statsBar              -> StatsBar.tsx
 *  trustBar              -> TrustBar.tsx
 *  featureGrid           -> FeatureGrid.tsx
 *  pricingTiers          -> PricingTiers.tsx
 *  productGrid           -> ProductGrid.tsx
 *  testimonials          -> Testimonials.tsx
 *  faq                   -> Faq.tsx
 *  ctaBanner             -> CtaBanner.tsx
 *  pageHeader            -> PageHeader.tsx
 *  prose                 -> Prose.tsx
 *  timeline              -> Timeline.tsx
 *  teamGrid              -> TeamGrid.tsx
 *  valueGrid             -> ValueGrid.tsx
 *  processSteps          -> ProcessSteps.tsx
 *  slaTable              -> SlaTable.tsx
 *  locationList          -> LocationList.tsx
 *  corporateRegistration -> CorporateRegistration.tsx
 *  contactPanel          -> ContactPanel.tsx
 *  policyDocument        -> PolicyDocument.tsx
 *  checkout              -> Checkout.tsx
 */
export const SECTION_FILE: Record<SectionType, string> = {
  hero: 'Hero',
  statsBar: 'StatsBar',
  trustBar: 'TrustBar',
  featureGrid: 'FeatureGrid',
  pricingTiers: 'PricingTiers',
  productGrid: 'ProductGrid',
  testimonials: 'Testimonials',
  faq: 'Faq',
  ctaBanner: 'CtaBanner',
  pageHeader: 'PageHeader',
  prose: 'Prose',
  timeline: 'Timeline',
  teamGrid: 'TeamGrid',
  valueGrid: 'ValueGrid',
  processSteps: 'ProcessSteps',
  slaTable: 'SlaTable',
  locationList: 'LocationList',
  corporateRegistration: 'CorporateRegistration',
  contactPanel: 'ContactPanel',
  policyDocument: 'PolicyDocument',
  checkout: 'Checkout',
};

/** Common heading fields most sections accept. */
export interface SectionHeading {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
}

export interface HeroProps {
  badge?: string;
  headline: string;
  /** Rendered in the primary colour, appended after the headline. */
  accentText?: string;
  subtitle: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  image?: string;
  trustBadges?: string[];
  layout?: 'centered' | 'split' | 'stacked' | 'editorial';
}

export interface StatsBarProps {
  items: StatItem[];
}

/**
 * A trust-bar entry. A plain string renders as a text chip/wordmark (no
 * network fetch). An object with `domain` renders a real company logo,
 * fetched by domain at render time — never stored/hosted by us — with an
 * honest fallback to the text wordmark if the logo can't be loaded.
 */
export type TrustBarItem = string | { name: string; domain?: string };

export interface TrustBarProps {
  /** 'pills' = text chips; 'logos' = real logo images (or wordmark fallback). */
  variant?: 'pills' | 'logos';
  title?: string;
  items: TrustBarItem[];
}

export interface FeatureGridProps extends SectionHeading {
  items: {
    title: string;
    description: string;
    badge?: string;
    image?: string;
    icon?: string;
  }[];
}

export interface PricingTiersProps extends SectionHeading {
  currency?: string;
  tiers: CatalogItem[];
  /** CTA href each tier links to (query is appended per tier). */
  ctaHref?: string;
}

export interface ProductGridProps extends SectionHeading {
  currency?: string;
  /** 'products' = retail cards w/ image; 'plans' = server spec cards. */
  layout?: 'products' | 'plans';
  items: CatalogItem[];
  categories?: string[];
  cta?: CtaLink;
}

export interface TestimonialsProps extends SectionHeading {
  items: Testimonial[];
}

export interface FaqProps extends SectionHeading {
  items: Faq[];
}

export interface CtaBannerProps {
  headline: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  guarantee?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  /** Extra meta line, e.g. response-time promise. */
  meta?: string;
  /** Breadcrumb trail, last entry is the current page. */
  breadcrumb?: NavItem[];
}

export interface ProseProps extends SectionHeading {
  /** Body blocks; `heading` optional per block. */
  blocks: PolicyBlock[];
  image?: string;
  /** Optional checklist rendered beside/under the prose. */
  highlights?: string[];
}

export interface TimelineProps extends SectionHeading {
  milestones: Milestone[];
}

export interface TeamGridProps extends SectionHeading {
  members: TeamMember[];
}

export interface ValueGridProps extends SectionHeading {
  items: IconItem[];
  /** columns hint for the renderer (2–4). */
  columns?: number;
}

export interface ProcessStepsProps extends SectionHeading {
  steps: ProcessStep[];
}

export interface SlaTableProps extends SectionHeading {
  rows: SlaRow[];
}

export interface LocationListProps extends SectionHeading {
  /** Simple label list, e.g. "Frankfurt FRA1". */
  locations: string[];
  /** Optional richer entries (offices, datacentres). */
  places?: { city: string; facility?: string; address?: string; role?: string }[];
}

export interface CorporateRegistrationProps extends SectionHeading {
  /** All fields default to the site-level `business` when omitted. */
  entityName?: string;
  registrationNumber?: string;
  jurisdiction?: string;
  registeredAddress?: string;
  governingLaw?: string;
  taxId?: string;
  asNumber?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface ContactPanelProps extends SectionHeading {
  /** Which extra fields the form shows beyond name/email/message. */
  formVariant?: 'standard' | 'enterprise' | 'wholesale' | 'noc';
  /** Options for the "nature of inquiry" select; hidden when empty. */
  inquiryOptions?: string[];
  submitLabel?: string;
  /** Show the left-hand registered-entity / hours / offices column. */
  showDetails?: boolean;
  supportHours?: string;
  offices?: { city: string; facility?: string; address?: string; role?: string }[];
}

export interface PolicyDocumentProps {
  title: string;
  lastUpdated: string;
  sections: PolicyBlock[];
}

/**
 * Checkout — the hand-off page to the merchant's own Airwallex-hosted
 * payment page (Hosted Payment Page / Payment Link). We never hold the
 * client's Airwallex API credentials — `content.airwallexCheckoutUrl` is a
 * URL the client generates themselves in their own Airwallex account and
 * pastes in, exactly like `formspreeId`. Copy branches on `content.mode`
 * (ecommerce = order/purchase framing, services = deposit/engagement
 * framing) inside the component rather than via props.
 */
export interface CheckoutProps extends SectionHeading {
  /** Label on the pay button, e.g. "Pay with Airwallex". */
  payLabel?: string;
  /** Small print under the pay button. */
  note?: string;
}

export type SectionProps =
  | ({ type: 'hero' } & { props: HeroProps })
  | ({ type: 'statsBar' } & { props: StatsBarProps })
  | ({ type: 'trustBar' } & { props: TrustBarProps })
  | ({ type: 'featureGrid' } & { props: FeatureGridProps })
  | ({ type: 'pricingTiers' } & { props: PricingTiersProps })
  | ({ type: 'productGrid' } & { props: ProductGridProps })
  | ({ type: 'testimonials' } & { props: TestimonialsProps })
  | ({ type: 'faq' } & { props: FaqProps })
  | ({ type: 'ctaBanner' } & { props: CtaBannerProps })
  | ({ type: 'pageHeader' } & { props: PageHeaderProps })
  | ({ type: 'prose' } & { props: ProseProps })
  | ({ type: 'timeline' } & { props: TimelineProps })
  | ({ type: 'teamGrid' } & { props: TeamGridProps })
  | ({ type: 'valueGrid' } & { props: ValueGridProps })
  | ({ type: 'processSteps' } & { props: ProcessStepsProps })
  | ({ type: 'slaTable' } & { props: SlaTableProps })
  | ({ type: 'locationList' } & { props: LocationListProps })
  | ({ type: 'corporateRegistration' } & { props: CorporateRegistrationProps })
  | ({ type: 'contactPanel' } & { props: ContactPanelProps })
  | ({ type: 'policyDocument' } & { props: PolicyDocumentProps })
  | ({ type: 'checkout' } & { props: CheckoutProps });

/** A section instance on a page. */
export type Section = {
  /** Stable id, unique within the site. Used for reorder + inspector selection. */
  id: string;
  enabled: boolean;
} & SectionProps;

export type AnySectionProps =
  | HeroProps
  | StatsBarProps
  | TrustBarProps
  | FeatureGridProps
  | PricingTiersProps
  | ProductGridProps
  | TestimonialsProps
  | FaqProps
  | CtaBannerProps
  | PageHeaderProps
  | ProseProps
  | TimelineProps
  | TeamGridProps
  | ValueGridProps
  | ProcessStepsProps
  | SlaTableProps
  | LocationListProps
  | CorporateRegistrationProps
  | ContactPanelProps
  | PolicyDocumentProps
  | CheckoutProps;

/* ============================================================================
 * Pages + whole-site content
 * ========================================================================== */

export type SiteMode = 'services' | 'ecommerce';

/**
 * Structural design language — NOT color. Themes (`src/site/themes.ts`) only
 * ever change color/font/radius tokens; `layoutSystem` changes composition:
 * header alignment, card treatment, type pairing, signature motif. Every
 * section renderer reads this (via `resolveLayoutSystem`) and branches its
 * JSX structure, so two sites on the same theme but different systems look
 * meaningfully different, and the same system holds across every theme.
 *
 *  signal     - confident technical B2B (SaaS / dev tools / consulting)
 *  atelier    - editorial, image-forward (retail, luxury goods)
 *  foundation - dense infra/spec-sheet (hosting, datacenter, network)
 *  workshop   - trade & local services (sturdy, direct, high-contrast)
 */
export type LayoutSystem = 'signal' | 'atelier' | 'foundation' | 'workshop';

/**
 * High-level site archetype — the "kind of business" a site is, which seeds a
 * whole composition (page/section blueprint), a default theme, a layout
 * `treatment` and copy tone. Orthogonal to `themeId` (colour) and to
 * `layoutSystem` (which, when set, overrides the archetype's `treatment`).
 *
 * Kept here as a bare string-literal union (not imported from
 * `@/site/archetypes/types`) so `schema.ts` stays import-free and no
 * `schema.ts` <-> `archetypes/types.ts` cycle can form; `types.ts` re-exports
 * this as the canonical `ArchetypeId`.
 *
 *  saas     - product-led software (signal)
 *  agency   - studios / consultancies (atelier)
 *  luxury   - high-end retail & goods (atelier)
 *  services - professional / B2B services (signal)
 *  store    - general e-commerce (signal)
 *  local    - trade & local services (workshop)
 */
export type ArchetypeId = 'saas' | 'agency' | 'luxury' | 'services' | 'store' | 'local';

export interface SitePage {
  /** Stable key: 'home' | 'about' | 'offerings' | 'contact' | 'policy:privacy' … */
  key: string;
  /** Route path, leading slash. '/' for home. */
  path: string;
  /** <title> / nav label source. */
  title: string;
  /** Short nav label (defaults to `title`). */
  navLabel?: string;
  /** Show in the primary site nav. */
  nav: boolean;
  sections: Section[];
}

export interface SiteContent {
  /** Schema version, bump on breaking changes to the shape. */
  version: 1;
  business: BusinessInfo;
  mode: SiteMode;
  /** Theme id into `src/site/themes.ts`. */
  themeId: string;
  /** Optional primary-colour override (hex or oklch(...)). */
  accent?: string;
  /** Structural design language override. Defaults from `source.sector` / `mode` — see `resolveLayoutSystem()`. */
  layoutSystem?: LayoutSystem;
  /**
   * Site archetype override. When set (here or on `source.archetype`), it
   * seeds the layout `treatment` via `resolveLayoutSystem()` and is the key
   * the composer reads. Unset on every normalized template today, so existing
   * templates keep their sector-based defaults untouched.
   */
  archetype?: ArchetypeId;
  /** Formspree form id; when set the contact form also forwards there. */
  formspreeId?: string;
  /**
   * The client's own Airwallex Hosted Payment Page / Payment Link URL —
   * generated in their Airwallex account, not ours. Unset until they
   * connect it; the checkout page degrades honestly (no fake success) when
   * absent. See `CheckoutProps`.
   */
  airwallexCheckoutUrl?: string;

  brand: {
    /** Text shown next to the logo mark. Defaults to `business.shortName`. */
    logoText: string;
    /** Brand logo image URL when uploaded. */
    logoUrl?: string;
  };

  nav: NavItem[];
  /** Header CTA button. */
  headerCta?: CtaLink;

  footer: {
    tagline?: string;
    columns: FooterColumn[];
    legalLinks: NavItem[];
    /** Statutory line shown small under the copyright. */
    showLegalBar: boolean;
    /** Payment-scheme + PCI badge row (retail / merchant sites). */
    showPaymentBadges: boolean;
  };

  pages: SitePage[];

  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };

  /** Provenance — set by the normalizer / archetype composer, used by the studio + Phase-4 AI. */
  source?: {
    /**
     * Id of the `UniversalTemplate` this site was normalized from. Still set by
     * every normalized template; the archetype composer will populate it (or a
     * synthetic id) too. Kept required for now — `normalizeTemplates.ts` and the
     * harvested-entity / project projections rely on it — and is widened to
     * optional in the task that retires the normalizer.
     */
    templateId: string;
    /** Sector of the source template (normalizer). */
    sector: 'tech' | 'retail' | 'hosting';
    /** Archetype this site was composed from (archetype system). */
    archetype?: ArchetypeId;
    /** Starter content set applied on top of the archetype composition. */
    starterSetId?: string;
    /** Factory-generated copy that should be personalised before shipping. */
    needsPersonalization: boolean;
    /** Free-text niche label, e.g. "dental clinic", "boutique roastery". */
    niche?: string;
    /** Discovery / filter tags. */
    tags?: string[];
  };
}

/* ============================================================================
 * Helpers
 * ========================================================================== */

export function getPage(content: SiteContent, path: string): SitePage | undefined {
  const norm = path === '' ? '/' : path;
  return content.pages.find((p) => p.path === norm);
}

export function enabledSections(page: SitePage): Section[] {
  return page.sections.filter((s) => s.enabled);
}

export const POLICY_SLUGS = ['privacy', 'terms', 'refund', 'shipping'] as const;
export type PolicySlug = (typeof POLICY_SLUGS)[number];
