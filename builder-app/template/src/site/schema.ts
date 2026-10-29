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

import type { SurfaceStyle } from './themes';

/* ============================================================================
 * Business / legal entity
 * ========================================================================== */

export interface BusinessInfo {
  /** Short primary brand name shown to users, e.g. "Vantage". */
  name: string;
  /** Full statutory legal entity name, e.g. "Vantage Cloud Technologies Limited". */
  legalName?: string;
  /** Short brand name for the logo + copy, e.g. "Vantage". */
  shortName: string;
  /** Free-text description / initial prompt explaining what the business does. */
  description?: string;
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
  metric?: string;
  metricLabel?: string;
  verified?: boolean;
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
  secondaryImage?: string;
  images?: string[];
  sku?: string;
  category?: string;
  inStock?: boolean;
  stockCount?: number;
  totalStock?: number;
  rating?: number;
  reviewCount?: number;
  compareAtPrice?: number;
  originalPrice?: number;
  discountBadge?: string;
  swatches?: Array<{
    name: string;
    color: string;
    image?: string;
    bgClass?: string;
  }>;
  variants?: Array<{
    id?: string;
    name: string;
    color?: string;
    image?: string;
    price?: number;
    sku?: string;
    inStock?: boolean;
  }>;
  bundles?: Array<{
    id: string;
    name: string;
    title?: string;
    description?: string;
    price: number;
    originalPrice?: number;
    savings?: string;
    badge?: string;
    popular?: boolean;
    features?: string[];
    specs?: Record<string, string>;
    image?: string;
    quantity?: number;
    default?: boolean;
  }>;

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
  | 'checkout'
  | 'bentoGrid'
  | 'comparisonMatrix'
  | 'logoMarquee'
  | 'roiCalculator'
  | 'videoShowcase'
  | 'leadMagnet'
  | 'caseStudyCarousel'
  | 'socialProofToast'
  | 'interactiveTabShowcase'
  | 'stepWizardProcess'
  | 'deviceMockupHero'
  | 'announcementBar';

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
  'bentoGrid',
  'comparisonMatrix',
  'logoMarquee',
  'roiCalculator',
  'videoShowcase',
  'leadMagnet',
  'caseStudyCarousel',
  'socialProofToast',
  'interactiveTabShowcase',
  'stepWizardProcess',
  'deviceMockupHero',
  'announcementBar',
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
 *  bentoGrid             -> BentoGrid.tsx
 *  comparisonMatrix      -> ComparisonMatrix.tsx
 *  logoMarquee           -> LogoMarquee.tsx
 *  roiCalculator         -> RoiCalculator.tsx
 *  videoShowcase         -> VideoShowcase.tsx
 *  leadMagnet            -> LeadMagnet.tsx
 *  caseStudyCarousel     -> CaseStudyCarousel.tsx
 *  socialProofToast      -> SocialProofToast.tsx
 *  interactiveTabShowcase-> InteractiveTabShowcase.tsx
 *  stepWizardProcess     -> StepWizardProcess.tsx
 *  deviceMockupHero      -> DeviceMockupHero.tsx
 *  announcementBar       -> AnnouncementBar.tsx
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
  bentoGrid: 'BentoGrid',
  comparisonMatrix: 'ComparisonMatrix',
  logoMarquee: 'LogoMarquee',
  roiCalculator: 'RoiCalculator',
  videoShowcase: 'VideoShowcase',
  leadMagnet: 'LeadMagnet',
  caseStudyCarousel: 'CaseStudyCarousel',
  socialProofToast: 'SocialProofToast',
  interactiveTabShowcase: 'InteractiveTabShowcase',
  stepWizardProcess: 'StepWizardProcess',
  deviceMockupHero: 'DeviceMockupHero',
  announcementBar: 'AnnouncementBar',
};

/** Common heading fields most sections accept. */
export interface SectionHeading {
  /** Small uppercase kicker above the title. */
  eyebrow?: string;
  title?: string;
  description?: string;
}

/* ------------------------------------------------------------------ Hero -- */

export type HeroVariant =
  | 'centered'
  | 'split'
  | 'stacked'
  | 'editorial'
  | 'editorial_center'
  | 'editorial_centered'
  | 'lead_form'
  | 'stats_split'
  | 'stats_banner_split'
  | 'asymmetric_bento_collage'
  | 'fullbleed_display'
  | 'default';

export interface HeroLeadFormField {
  name: string;
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface HeroLeadFormConfig {
  title?: string;
  description?: string;
  submitLabel?: string;
  placeholder?: string;
  successMessage?: string;
  fields?: ('name' | 'email' | 'phone' | 'company' | 'message' | HeroLeadFormField)[];
  endpoint?: string;
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
  /** Additional media images for collage / bento / showcase variants. */
  images?: string[];
  /** Bullet points for lead form or feature highlights. */
  bulletPoints?: string[];
  /** Feature points for highlights. */
  features?: string[];
  trustBadges?: string[];
  /** Multi-layout architecture variant: centered, split, stacked, editorial, editorial_center, lead_form, stats_split, stats_banner_split, asymmetric_bento_collage, fullbleed_display, default. */
  variant?: HeroVariant;
  /** Legacy layout alias for `variant`. Preserved for backward compatibility. */
  layout?: HeroVariant;
  /** Lead-generation form configuration for `lead_form` hero variant. */
  leadForm?: HeroLeadFormConfig;
  /** Embedded key metrics for `stats_split` or `stats_banner_split` hero variant. */
  stats?: StatItem[];
  /** Optional background or ambient video URL. */
  videoUrl?: string;
}

/* -------------------------------------------------------------- StatsBar -- */

export interface StatsBarProps {
  items: StatItem[];
}

/* -------------------------------------------------------------- TrustBar -- */

/**
 * A trust-bar entry. A plain string renders as a text chip/wordmark (no
 * network fetch). An object with `domain` renders a real company logo,
 * fetched by domain at render time — never stored/hosted by us — with an
 * honest fallback to the text wordmark if the logo can't be loaded.
 */
export type TrustBarItem = string | { name: string; domain?: string };

export interface TrustBarProps {
  /** 'pills' = text chips; 'logos' = real logo images (or wordmark fallback). */
  variant?: 'pills' | 'logos' | 'marquee_ticker';
  title?: string;
  items: TrustBarItem[];
  speed?: 'slow' | 'normal' | 'fast';
}

/* ----------------------------------------------------------- FeatureGrid -- */

export type FeatureGridVariant =
  | 'even'
  | 'asymmetric_bento'
  | 'sticky_scroll'
  | 'tabbed_showcase'
  | 'zigzag_rows'
  | 'stagger'
  | 'marquee_ticker';

export interface FeatureGridTab {
  id: string;
  label: string;
  icon?: string;
  tag?: string;
}

export interface FeatureGridItem {
  id?: string;
  title: string;
  description: string;
  badge?: string;
  image?: string;
  icon?: string;
  category?: string;
  tag?: string;
  stat?: string;
  statLabel?: string;
  cta?: CtaLink;
  bullets?: string[];
  highlights?: string[];
}

export interface FeatureGridProps extends SectionHeading {
  /** Multi-layout architecture variant: even, asymmetric_bento, sticky_scroll, tabbed_showcase, zigzag_rows, stagger, marquee_ticker. */
  variant?: FeatureGridVariant;
  /** Number of grid columns (2-4). */
  columns?: number;
  /** Interactive category tabs for `tabbed_showcase` variant. */
  tabs?: FeatureGridTab[];
  /** Pin narrative side-panel for `sticky_scroll` variant. */
  stickyHeader?: boolean;
  /** Scroll animation speed for `marquee_ticker` variant. */
  speed?: 'slow' | 'normal' | 'fast';
  items: FeatureGridItem[];
}

/* ---------------------------------------------------------- PricingTiers -- */

export type PricingTiersVariant =
  | 'cards'
  | 'glow_card_deck'
  | 'comparison_table'
  | 'custom_quote_service'
  | 'stats_split'
  | 'tabbed_showcase'
  | 'editorial_center';

export interface PricingComparisonFeature {
  feature: string;
  category?: string;
  tooltip?: string;
  /** Value per tier id or tier index, e.g. { starter: true, pro: "Unlimited" }. */
  tierValues: Record<string, boolean | string>;
}

export interface PricingTiersProps extends SectionHeading {
  currency?: string;
  /** Multi-layout architecture variant: cards, glow_card_deck, comparison_table, custom_quote_service, stats_split, tabbed_showcase, editorial_center. */
  variant?: PricingTiersVariant;
  tiers: CatalogItem[];
  /** CTA href each tier links to (query is appended per tier). */
  ctaHref?: string;
  /** Feature group headers for `comparison_table` variant. */
  comparisonHeaders?: string[];
  /** Detailed comparison matrix rows for `comparison_table` variant. */
  comparisonFeatures?: PricingComparisonFeature[];
  /** Billing cadence options for pricing toggle. */
  billingIntervals?: ('monthly' | 'annually')[];
  /** Discount badge for annual billing, e.g. "Save 20%". */
  discountBadge?: string;
  /** Small print footnote or disclaimer. */
  footnote?: string;
}

/* ----------------------------------------------------------- ProductGrid -- */

export type ProductGridVariant =
  | 'products'
  | 'plans'
  | 'fashion_minimal'
  | 'mega_catalog'
  | 'single_flagship_bundle'
  | 'tabbed_showcase'
  | 'asymmetric_bento'
  | 'editorial_center'
  | 'marquee_ticker';

export interface ProductGridProps extends SectionHeading {
  currency?: string;
  /** 'products' = retail cards w/ image; 'plans' = server spec cards; or extended multi-layout variants. */
  layout?: 'products' | 'plans' | ProductGridVariant;
  /** Multi-layout architecture variant. Falls back to `layout` or 'products'. */
  variant?: ProductGridVariant;
  items: CatalogItem[];
  categories?: string[];
  cta?: CtaLink;
  /** Number of grid columns (2-4). */
  columns?: number;
  /** Featured item ID highlighted in asymmetric or bento layouts. */
  featuredItemId?: string;
  /** Toggle category filter pills/tabs. */
  showFilterTabs?: boolean;
  /** Show specification matrix table for plans. */
  showSpecsTable?: boolean;
  /** Ticker animation speed for `marquee_ticker` variant. */
  speed?: 'slow' | 'normal' | 'fast';
}

/* ---------------------------------------------------------- Testimonials -- */

export type TestimonialsVariant =
  | 'cards'
  | 'infinite_marquee'
  | 'editorial_pullquote'
  | 'rating_masonry'
  | 'stagger'
  | 'editorial_center'
  | 'marquee_ticker'
  | 'sticky_scroll';

export interface TestimonialsProps extends SectionHeading {
  /** Multi-layout architecture variant: cards, stagger, editorial_center, rating_masonry, marquee_ticker, sticky_scroll. */
  variant?: TestimonialsVariant;
  /** Number of columns for cards/masonry (1-4). */
  columns?: number;
  /** Ticker scroll speed for `marquee_ticker` variant. */
  speed?: 'slow' | 'normal' | 'fast';
  /** Show star rating chips. */
  showRatings?: boolean;
  /** Aggregate satisfaction rating summary banner. */
  statsSummary?: {
    averageRating?: number;
    totalReviews?: number;
    satisfactionRate?: string;
  };
  items: Testimonial[];
}

/* ------------------------------------------------------------------- Faq -- */

/** Multi-layout architecture variant: accordion, two_column, grid_cards. */
export type FaqVariant = 'accordion' | 'two_column' | 'grid_cards';

export interface FaqProps extends SectionHeading {
  items: Faq[];
  variant?: FaqVariant;
}

/* ------------------------------------------------------------- CtaBanner -- */

/** Multi-layout architecture variant: centered, split_visual, gradient_banner. */
export type CtaBannerVariant = 'centered' | 'split_visual' | 'gradient_banner';

export interface CtaBannerProps {
  headline: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  guarantee?: string;
  variant?: CtaBannerVariant;
  /** Picker-assigned visual for `split_visual` — never AI-written. */
  image?: string;
}

/* ------------------------------------------------------------ PageHeader -- */

export interface PageHeaderProps {
  eyebrow?: string;
  headline: string;
  subtitle?: string;
  /** Extra meta line, e.g. response-time promise. */
  meta?: string;
  /** Breadcrumb trail, last entry is the current page. */
  breadcrumb?: NavItem[];
}

/* ----------------------------------------------------------------- Prose -- */

export interface ProseProps extends SectionHeading {
  /** Body blocks; `heading` optional per block. */
  blocks: PolicyBlock[];
  image?: string;
  /** Optional checklist rendered beside/under the prose. */
  highlights?: string[];
}

/* -------------------------------------------------------------- Timeline -- */

export interface TimelineProps extends SectionHeading {
  milestones: Milestone[];
}

/* -------------------------------------------------------------- TeamGrid -- */

export interface TeamGridProps extends SectionHeading {
  members: TeamMember[];
}

/* ------------------------------------------------------------- ValueGrid -- */

export interface ValueGridProps extends SectionHeading {
  items: IconItem[];
  /** columns hint for the renderer (2–4). */
  columns?: number;
}

/* ---------------------------------------------------------- ProcessSteps -- */

export interface ProcessStepsProps extends SectionHeading {
  steps: ProcessStep[];
}

/* -------------------------------------------------------------- SlaTable -- */

export interface SlaTableProps extends SectionHeading {
  rows: SlaRow[];
}

/* ---------------------------------------------------------- LocationList -- */

export interface LocationListProps extends SectionHeading {
  /** Simple label list, e.g. "Frankfurt FRA1". */
  locations: string[];
  /** Optional richer entries (offices, datacentres). */
  places?: { city: string; facility?: string; address?: string; role?: string }[];
}

/* ------------------------------------------------- CorporateRegistration -- */

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

/* ---------------------------------------------------------- ContactPanel -- */

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

/* -------------------------------------------------------- PolicyDocument -- */

export interface PolicyDocumentProps {
  title: string;
  lastUpdated: string;
  sections: PolicyBlock[];
}

/* -------------------------------------------------------------- Checkout -- */

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

/* ------------------------------------------------------------- BentoGrid -- */

export type BentoGridVariant = 'modern' | 'minimal' | 'glass' | 'luxury';

export interface BentoTile {
  id?: string;
  title: string;
  description?: string;
  badge?: string;
  tag?: string;
  icon?: string;
  image?: string;
  metric?: string;
  metricLabel?: string;
  href?: string;
  ctaLabel?: string;
  ctaHref?: string;
  size?: 'large' | 'medium' | 'badge';
  colSpan?: number;
  rowSpan?: number;
}

export interface BentoGridProps extends SectionHeading {
  variant?: BentoGridVariant;
  items?: BentoTile[];
  spotlightCard?: BentoTile;
  featureCards?: BentoTile[];
  metricBadges?: BentoTile[];
}

/* ------------------------------------------------------ ComparisonMatrix -- */

export interface ComparisonCompetitor {
  id: string;
  name: string;
  isOurProduct?: boolean;
  badge?: string;
  cta?: { label: string; href: string };
}

export interface ComparisonRow {
  id?: string;
  feature: string;
  category?: string;
  tooltip?: string;
  values: Record<string, boolean | string>;
}

export interface ComparisonMatrixProps extends SectionHeading {
  competitors?: ComparisonCompetitor[];
  categories?: { name: string; rows: ComparisonRow[] }[];
  rows?: ComparisonRow[];
  footnote?: string;
}

/* ----------------------------------------------------------- LogoMarquee -- */

export interface MarqueeItem {
  name: string;
  logo?: string;
  subtext?: string;
  href?: string;
  badge?: string;
}

export interface LogoMarqueeProps extends SectionHeading {
  items?: (string | MarqueeItem)[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  variant?: 'default' | 'cards' | 'minimal' | 'glass';
}

/* --------------------------------------------------------- RoiCalculator -- */

export interface RoiCalculatorProps extends SectionHeading {
  minVolume?: number;
  maxVolume?: number;
  step?: number;
  defaultVolume?: number;
  currency?: string;
  traditionalFeePercent?: number;
  traditionalFixedFee?: number;
  ourFeePercent?: number;
  ourFixedFee?: number;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  metricHighlights?: { label: string; value: string; subtext?: string }[];
  disclaimer?: string;
}

/* --------------------------------------------------------- VideoShowcase -- */

export interface VideoShowcaseProps extends SectionHeading {
  videoUrl?: string;
  videoType?: 'youtube' | 'vimeo' | 'mp4';
  posterImage?: string;
  badge?: string;
  duration?: string;
  accentGlow?: boolean;
  autoplayInModal?: boolean;
  featurePills?: string[];
  cta?: { label: string; href: string };
}

/* ------------------------------------------------------------ LeadMagnet -- */

export interface LeadMagnetProps extends SectionHeading {
  badge?: string;
  guideTitle?: string;
  guideSubtitle?: string;
  coverImage?: string;
  bulletPoints?: string[];
  buttonLabel?: string;
  successMessage?: string;
  privacyNotice?: string;
  downloadUrl?: string;
  socialProofText?: string;
}

/* ----------------------------------------------------- CaseStudyCarousel -- */

export interface CaseStudyItem {
  id?: string;
  company: string;
  logo?: string;
  heroMetric: string;
  heroMetricLabel: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  tags?: string[];
  href?: string;
  image?: string;
}

export interface CaseStudyCarouselProps extends SectionHeading {
  items?: CaseStudyItem[];
  autoPlayInterval?: number;
}

/* ------------------------------------------------------ SocialProofToast -- */

export interface ToastNotification {
  id?: string;
  title: string;
  description: string;
  timestamp?: string;
  avatar?: string;
  icon?: string;
  verifiedBadge?: boolean;
  href?: string;
}

export interface SocialProofToastProps {
  position?: 'bottom-left' | 'bottom-right' | 'top-right' | 'top-left';
  notifications?: ToastNotification[];
  cycleIntervalSeconds?: number;
  dismissible?: boolean;
}

/* ------------------------------------------------ InteractiveTabShowcase -- */

export interface ShowcaseTab {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  headline: string;
  description: string;
  image?: string;
  bulletPoints?: string[];
  metrics?: { label: string; value: string }[];
  cta?: { label: string; href: string };
}

export interface InteractiveTabShowcaseProps extends SectionHeading {
  tabs?: ShowcaseTab[];
  variant?: 'pills' | 'cards' | 'underline';
}

/* ---------------------------------------------------- StepWizardProcess -- */

export interface StepWizardItem {
  stepNumber?: number | string;
  title: string;
  description: string;
  badge?: string;
  icon?: string;
  timeEstimate?: string;
  codeSnippet?: string;
}

export interface StepWizardProcessProps extends SectionHeading {
  steps?: StepWizardItem[];
  layout?: 'horizontal' | 'vertical';
  showProgressLine?: boolean;
  cta?: { label: string; href: string };
}

/* ------------------------------------------------------ DeviceMockupHero -- */

export interface DeviceMockupHeroProps extends SectionHeading {
  deviceType?: 'macbook' | 'iphone' | 'both';
  screenshotUrl?: string;
  mobileScreenshotUrl?: string;
  interactivePreviewUrl?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tiltAngle?: 'none' | 'subtle' | 'dramatic';
  badge?: string;
  trustLogos?: string[];
  floatingMetrics?: { label: string; value: string; position?: 'left' | 'right' }[];
}

/* ------------------------------------------------------- AnnouncementBar -- */

export interface AnnouncementBarProps {
  message: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  dismissible?: boolean;
  variant?: 'banner' | 'pill' | 'glow' | 'accent';
  sticky?: boolean;
}

/* ------------------------------------------------- Section Discriminated Unions -- */

export type BreakpointVisibility = 'all' | 'desktop-only' | 'mobile-only';

export interface BaseSection {
  id: string;
  enabled: boolean;
  breakpointVisibility?: BreakpointVisibility;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  props: HeroProps;
}

export interface StatsBarSection extends BaseSection {
  type: 'statsBar';
  props: StatsBarProps;
}

export interface TrustBarSection extends BaseSection {
  type: 'trustBar';
  props: TrustBarProps;
}

export interface FeatureGridSection extends BaseSection {
  type: 'featureGrid';
  props: FeatureGridProps;
}

export interface PricingTiersSection extends BaseSection {
  type: 'pricingTiers';
  props: PricingTiersProps;
}

export interface ProductGridSection extends BaseSection {
  type: 'productGrid';
  props: ProductGridProps;
}

export interface TestimonialsSection extends BaseSection {
  type: 'testimonials';
  props: TestimonialsProps;
}

export interface FaqSection extends BaseSection {
  type: 'faq';
  props: FaqProps;
}

export interface CtaBannerSection extends BaseSection {
  type: 'ctaBanner';
  props: CtaBannerProps;
}

export interface PageHeaderSection extends BaseSection {
  type: 'pageHeader';
  props: PageHeaderProps;
}

export interface ProseSection extends BaseSection {
  type: 'prose';
  props: ProseProps;
}

export interface TimelineSection extends BaseSection {
  type: 'timeline';
  props: TimelineProps;
}

export interface TeamGridSection extends BaseSection {
  type: 'teamGrid';
  props: TeamGridProps;
}

export interface ValueGridSection extends BaseSection {
  type: 'valueGrid';
  props: ValueGridProps;
}

export interface ProcessStepsSection extends BaseSection {
  type: 'processSteps';
  props: ProcessStepsProps;
}

export interface SlaTableSection extends BaseSection {
  type: 'slaTable';
  props: SlaTableProps;
}

export interface LocationListSection extends BaseSection {
  type: 'locationList';
  props: LocationListProps;
}

export interface CorporateRegistrationSection extends BaseSection {
  type: 'corporateRegistration';
  props: CorporateRegistrationProps;
}

export interface ContactPanelSection extends BaseSection {
  type: 'contactPanel';
  props: ContactPanelProps;
}

export interface PolicyDocumentSection extends BaseSection {
  type: 'policyDocument';
  props: PolicyDocumentProps;
}

export interface CheckoutSection extends BaseSection {
  type: 'checkout';
  props: CheckoutProps;
}

export interface BentoGridSection extends BaseSection {
  type: 'bentoGrid';
  props: BentoGridProps;
}

export interface ComparisonMatrixSection extends BaseSection {
  type: 'comparisonMatrix';
  props: ComparisonMatrixProps;
}

export interface LogoMarqueeSection extends BaseSection {
  type: 'logoMarquee';
  props: LogoMarqueeProps;
}

export interface RoiCalculatorSection extends BaseSection {
  type: 'roiCalculator';
  props: RoiCalculatorProps;
}

export interface VideoShowcaseSection extends BaseSection {
  type: 'videoShowcase';
  props: VideoShowcaseProps;
}

export interface LeadMagnetSection extends BaseSection {
  type: 'leadMagnet';
  props: LeadMagnetProps;
}

export interface CaseStudyCarouselSection extends BaseSection {
  type: 'caseStudyCarousel';
  props: CaseStudyCarouselProps;
}

export interface SocialProofToastSection extends BaseSection {
  type: 'socialProofToast';
  props: SocialProofToastProps;
}

export interface InteractiveTabShowcaseSection extends BaseSection {
  type: 'interactiveTabShowcase';
  props: InteractiveTabShowcaseProps;
}

export interface StepWizardProcessSection extends BaseSection {
  type: 'stepWizardProcess';
  props: StepWizardProcessProps;
}

export interface DeviceMockupHeroSection extends BaseSection {
  type: 'deviceMockupHero';
  props: DeviceMockupHeroProps;
}

export interface AnnouncementBarSection extends BaseSection {
  type: 'announcementBar';
  props: AnnouncementBarProps;
}

export type SectionProps =
  | { type: 'hero'; props: HeroProps }
  | { type: 'statsBar'; props: StatsBarProps }
  | { type: 'trustBar'; props: TrustBarProps }
  | { type: 'featureGrid'; props: FeatureGridProps }
  | { type: 'pricingTiers'; props: PricingTiersProps }
  | { type: 'productGrid'; props: ProductGridProps }
  | { type: 'testimonials'; props: TestimonialsProps }
  | { type: 'faq'; props: FaqProps }
  | { type: 'ctaBanner'; props: CtaBannerProps }
  | { type: 'pageHeader'; props: PageHeaderProps }
  | { type: 'prose'; props: ProseProps }
  | { type: 'timeline'; props: TimelineProps }
  | { type: 'teamGrid'; props: TeamGridProps }
  | { type: 'valueGrid'; props: ValueGridProps }
  | { type: 'processSteps'; props: ProcessStepsProps }
  | { type: 'slaTable'; props: SlaTableProps }
  | { type: 'locationList'; props: LocationListProps }
  | { type: 'corporateRegistration'; props: CorporateRegistrationProps }
  | { type: 'contactPanel'; props: ContactPanelProps }
  | { type: 'policyDocument'; props: PolicyDocumentProps }
  | { type: 'checkout'; props: CheckoutProps }
  | { type: 'bentoGrid'; props: BentoGridProps }
  | { type: 'comparisonMatrix'; props: ComparisonMatrixProps }
  | { type: 'logoMarquee'; props: LogoMarqueeProps }
  | { type: 'roiCalculator'; props: RoiCalculatorProps }
  | { type: 'videoShowcase'; props: VideoShowcaseProps }
  | { type: 'leadMagnet'; props: LeadMagnetProps }
  | { type: 'caseStudyCarousel'; props: CaseStudyCarouselProps }
  | { type: 'socialProofToast'; props: SocialProofToastProps }
  | { type: 'interactiveTabShowcase'; props: InteractiveTabShowcaseProps }
  | { type: 'stepWizardProcess'; props: StepWizardProcessProps }
  | { type: 'deviceMockupHero'; props: DeviceMockupHeroProps }
  | { type: 'announcementBar'; props: AnnouncementBarProps };

/** A section instance on a page. */
export type Section =
  | HeroSection
  | StatsBarSection
  | TrustBarSection
  | FeatureGridSection
  | PricingTiersSection
  | ProductGridSection
  | TestimonialsSection
  | FaqSection
  | CtaBannerSection
  | PageHeaderSection
  | ProseSection
  | TimelineSection
  | TeamGridSection
  | ValueGridSection
  | ProcessStepsSection
  | SlaTableSection
  | LocationListSection
  | CorporateRegistrationSection
  | ContactPanelSection
  | PolicyDocumentSection
  | CheckoutSection
  | BentoGridSection
  | ComparisonMatrixSection
  | LogoMarqueeSection
  | RoiCalculatorSection
  | VideoShowcaseSection
  | LeadMagnetSection
  | CaseStudyCarouselSection
  | SocialProofToastSection
  | InteractiveTabShowcaseSection
  | StepWizardProcessSection
  | DeviceMockupHeroSection
  | AnnouncementBarSection;

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
  | CheckoutProps
  | BentoGridProps
  | ComparisonMatrixProps
  | LogoMarqueeProps
  | RoiCalculatorProps
  | VideoShowcaseProps
  | LeadMagnetProps
  | CaseStudyCarouselProps
  | SocialProofToastProps
  | InteractiveTabShowcaseProps
  | StepWizardProcessProps
  | DeviceMockupHeroProps
  | AnnouncementBarProps;

/* ============================================================================
 * Header + Footer Chrome Configurations
 * ========================================================================== */

export type HeaderVariant =
  | 'standard'
  | 'floating_glass_pill'
  | 'corporate_utility'
  | 'editorial_center'
  | 'editorial_centered'
  | 'minimal'
  | 'default';

export interface HeaderConfig {
  /** Structural layout variant for the navigation header chrome. */
  variant?: HeaderVariant;
  /** Stick header to top of viewport on scroll. */
  sticky?: boolean;
  /** Translucent backdrop blur styling. */
  transparent?: boolean;
  /** Top announcement bar banner visibility. */
  showAnnouncement?: boolean;
  /** Top announcement bar text copy. */
  announcementText?: string;
  /** Clickable link for announcement bar. */
  announcementLink?: CtaLink;
  /** Secondary utility links shown in the top tier (e.g. corporate_utility). */
  utilityLinks?: NavItem[];
  /** Secondary header action CTA. */
  secondaryCta?: CtaLink;
}

export type HeaderProps = HeaderConfig;
export type Header = HeaderConfig;

export type FooterVariant =
  | 'columns'
  | 'corporate_utility'
  | 'editorial_center'
  | 'minimal_inline'
  | 'newsletter_split';

export interface FooterConfig {
  /** Structural layout variant for footer chrome. */
  variant?: FooterVariant;
  tagline?: string;
  columns: FooterColumn[];
  legalLinks: NavItem[];
  /** Statutory line shown small under the copyright. */
  showLegalBar: boolean;
  /** Payment-scheme + PCI badge row (retail / merchant sites). */
  showPaymentBadges: boolean;
  /** Optional newsletter subscription box. */
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonLabel?: string;
  };
  /** Social or external profile links. */
  socialLinks?: {
    platform: string;
    href: string;
    label?: string;
  }[];
  /** Trust or accreditation badge text. */
  badgeText?: string;
  /** Secondary legal disclaimer or regulatory disclosure. */
  secondaryLegalText?: string;
}

export type FooterProps = FooterConfig;
export type Footer = FooterConfig;

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
  /** Optional surface styling treatment override (defaults to theme's surfaceStyle). */
  surfaceStyle?: SurfaceStyle;
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
  /** Optional header navigation chrome layout configuration. */
  header?: HeaderConfig;

  footer: FooterConfig;

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
    /** Original user prompt / brief describing the business and offerings. */
    prompt?: string;
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
