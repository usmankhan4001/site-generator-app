export type CategoryType = "tech" | "retail" | "ecommerce" | "hosting";

export interface StatItem {
  value: string;
  label: string;
}

export interface BentoFeature {
  title: string;
  description: string;
  image: string;
  badge: string;
}

export interface OfferingItem {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface HeroInfo {
  badge: string;
  headline: string;
  accentText: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  image: string;
  trustBadges: string[];
}

export interface Archetype {
  id: string;
  category: CategoryType;
  industry: string;
  name: string;
  tagline: string;
  icon?: string;
  suggestedThemes?: string[];
  recommendedThemes?: string[];
  hero: HeroInfo;
  stats: StatItem[];
  bentoFeatures: BentoFeature[];
  offerings: OfferingItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  isDark: boolean;
  industry: string;
  fontDisplay: string;
  fontSans: string;
  fontPairingLabel: string;
  colors: ThemeColors;
  borderRadius: string;
  badgeStyle: "pill-dot" | "rounded-badge" | "minimal";
  previewAccent: string;
  previewBg: string;
  previewText: string;
}

export interface BusinessData {
  companyName: string;
  shortName: string;
  registrationNumber: string;
  address: string;
  supportEmail: string;
  phone: string;
  governingLaw: string;
}

export interface DomainData {
  targetDomain: string;
  formspreeId: string;
  enableFormspree: boolean;
  githubRepoUrl: string;
}

export interface WizardState {
  currentStep: number;
  business: BusinessData;
  selectedArchetypeId: string;
  selectedThemeId: string;
  domain: DomainData;
  isDeploying: boolean;
  deployProgress: number;
  deployStepText: string;
  isDeployed: boolean;
  generatedScript: string;
}
