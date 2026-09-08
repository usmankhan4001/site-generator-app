export type PreferredMode = 'services' | 'ecommerce';

export type StylePref = string; // theme id from THEMES_LIST

/** The subset of data collected during onboarding. */
export interface OnboardingData {
  /** Category label from the visual card (e.g. "Local Business"). */
  niche: string;
  /** Auto-derived: 'ecommerce' for Online Store, 'services' for everything else. */
  preferredMode: PreferredMode;
  /** Business name (from step 2). */
  businessName: string;
  /** Theme id selected from THEMES_LIST. */
  stylePref: string;
  /** Optional free-text brief for the AI. */
  brief: string;
}

export const EMPTY_ONBOARDING: OnboardingData = {
  niche: '',
  preferredMode: 'services',
  businessName: '',
  stylePref: '',
  brief: '',
};

/** Business category cards shown in step 1. */
export interface BusinessCategory {
  id: string;
  label: string;
  icon: string; // emoji
  description: string;
  mode: PreferredMode;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'local',
    label: 'Local Business',
    icon: '🔧',
    description: 'Trade, repair, services near you',
    mode: 'services',
  },
  {
    id: 'store',
    label: 'Online Store',
    icon: '🛍️',
    description: 'Sell products online',
    mode: 'ecommerce',
  },
  {
    id: 'professional',
    label: 'Professional Services',
    icon: '💼',
    description: 'Consulting, advisory, B2B',
    mode: 'services',
  },
  {
    id: 'agency',
    label: 'Agency / Studio',
    icon: '🎨',
    description: 'Creative, design, marketing',
    mode: 'services',
  },
  {
    id: 'saas',
    label: 'SaaS / Software',
    icon: '💻',
    description: 'Tech product, platform',
    mode: 'services',
  },
  {
    id: 'luxury',
    label: 'Luxury / Premium',
    icon: '👑',
    description: 'High-end goods, fashion, jewellery',
    mode: 'services',
  },
];
