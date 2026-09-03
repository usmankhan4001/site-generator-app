export type PreferredMode = 'services' | 'ecommerce';

export type StylePref = 'modern' | 'classic' | 'bold' | 'minimal' | 'warm';

export interface LegalDetails {
  entityName: string;
  registrationNumber: string;
  jurisdiction: string;
  registeredAddress: string;
  contactEmail: string;
  contactPhone: string;
}

export interface OnboardingData {
  niche: string;
  preferredMode: PreferredMode | '';
  targetAudience: string;
  legal: LegalDetails;
  stylePref: StylePref | '';
  logoUrl: string;
  brandColor: string;
  existingUrl: string;
}

export const EMPTY_ONBOARDING: OnboardingData = {
  niche: '',
  preferredMode: '',
  targetAudience: '',
  legal: {
    entityName: '',
    registrationNumber: '',
    jurisdiction: '',
    registeredAddress: '',
    contactEmail: '',
    contactPhone: '',
  },
  stylePref: '',
  logoUrl: '',
  brandColor: '',
  existingUrl: '',
};
