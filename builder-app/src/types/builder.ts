export type IndustryCategory = 'tech' | 'ecommerce' | 'retail' | 'hosting';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type WizardStepId = 1 | 2 | 3 | 4 | 5;

export interface WizardStepInfo {
  step: WizardStepId;
  title: string;
  description: string;
  shortLabel: string;
}

export interface BusinessDetails {
  companyName: string;
  shortName: string;
  registrationNumber: string;
  address: string;
  email: string;
  phone: string;
  domain: string;
  governingLaw: string;
  currency: string;
  githubRepo: string;
  dokployApiKey?: string;
  dokployHost?: string;
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
  tag?: string;
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

export interface ArchetypeData {
  id: string;
  category: IndustryCategory;
  industry: string;
  name: string;
  tagline: string;
  hero: HeroInfo;
  stats: StatItem[];
  bentoFeatures: BentoFeature[];
  offerings: OfferingItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  recommendedThemes: string[];
  suggestedThemes?: string[];
  icon?: string;
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

export interface ThemeTokens {
  id: string;
  name: string;
  industry: string;
  isDark: boolean;
  fontSans: string;
  fontDisplay: string;
  borderRadius: string;
  badgeStyle: 'pill-dot' | 'badge-outline' | 'badge-subtle';
  colors: ThemeColors;
}

export type LogLevel = 'info' | 'warn' | 'error' | 'success';

export interface DeploymentLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
}

export type DeploymentStatus = 'idle' | 'building' | 'deploying' | 'success' | 'failed';

export interface BuilderState {
  // Wizard Navigation
  currentStep: WizardStepId;
  completedSteps: WizardStepId[];
  setStep: (step: WizardStepId) => void;
  nextStep: () => void;
  prevStep: () => void;
  markStepComplete: (step: WizardStepId) => void;

  // Viewport Switcher
  viewport: ViewportMode;
  setViewport: (viewport: ViewportMode) => void;

  // Business & KYC Entity Information
  business: BusinessDetails;
  updateBusiness: (details: Partial<BusinessDetails>) => void;

  // Archetype & Theme Selection
  selectedArchetypeId: string;
  selectedThemeId: string;
  setArchetype: (archetypeId: string) => void;
  setTheme: (themeId: string) => void;

  // Custom Content Overrides
  customHero: Partial<HeroInfo>;
  updateHero: (hero: Partial<HeroInfo>) => void;
  customOfferings: OfferingItem[];
  updateOffering: (id: string, offering: Partial<OfferingItem>) => void;
  addOffering: (offering: OfferingItem) => void;
  removeOffering: (id: string) => void;
  resetContentToArchetype: () => void;

  // Active UI Tabs (Preview, Customizer, Code, Script, Puck)
  activePreviewTab: 'preview' | 'code' | 'script' | 'compliance' | 'puck';
  setActivePreviewTab: (tab: 'preview' | 'code' | 'script' | 'compliance' | 'puck') => void;

  // Deployment Logs & Execution State
  deploymentLogs: DeploymentLog[];
  deploymentStatus: DeploymentStatus;
  isDeploying: boolean;
  addLog: (message: string, level?: LogLevel) => void;
  clearLogs: () => void;
  setDeploymentStatus: (status: DeploymentStatus) => void;
  setIsDeploying: (isDeploying: boolean) => void;

  // Global Actions
  resetBuilder: () => void;
}
