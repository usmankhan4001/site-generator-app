/**
 * Jurisdiction presets — quick-fill for the Company & Compliance step. Formats
 * only (no invented company data): registrar name, registration-number shape,
 * and a realistic registered-office style hint per jurisdiction.
 */

export interface JurisdictionPreset {
  id: string;
  /** Shown on the quick-fill chip, e.g. "Singapore (ACRA)". */
  label: string;
  jurisdiction: string;
  governingLaw: string;
  registrarName: string;
  regNumberFormat: string;
  addressHint: string;
  taxLabel: string;
}

export const JURISDICTION_PRESETS: JurisdictionPreset[] = [
  {
    id: 'sg',
    label: 'Singapore (ACRA)',
    jurisdiction: 'Singapore',
    governingLaw: 'the laws of the Republic of Singapore',
    registrarName: 'Accounting and Corporate Regulatory Authority (ACRA)',
    regNumberFormat: 'UEN, e.g. 202012345K',
    addressHint: 'Suite 12-34, One Raffles Place, Singapore 048616',
    taxLabel: 'GST Registration No.',
  },
  {
    id: 'us-de',
    label: 'Delaware, USA',
    jurisdiction: 'Delaware, United States',
    governingLaw: 'the laws of the State of Delaware, USA',
    registrarName: 'Delaware Division of Corporations',
    regNumberFormat: 'File Number, e.g. 7481234',
    addressHint: '1209 Orange Street, Wilmington, DE 19801, USA',
    taxLabel: 'EIN',
  },
  {
    id: 'uk',
    label: 'England & Wales',
    jurisdiction: 'England and Wales',
    governingLaw: 'the laws of England and Wales',
    registrarName: 'Companies House',
    regNumberFormat: 'Company number, e.g. 09876543',
    addressHint: '86-90 Paul Street, London EC2A 4NE, United Kingdom',
    taxLabel: 'VAT Registration No.',
  },
  {
    id: 'ae-difc',
    label: 'Dubai (DIFC)',
    jurisdiction: 'Dubai International Financial Centre, UAE',
    governingLaw: 'the laws applicable in the Dubai International Financial Centre',
    registrarName: 'DIFC Registrar of Companies',
    regNumberFormat: 'DIFC Registration No., e.g. CL3456',
    addressHint: 'Unit 402, Gate Village 4, DIFC, Dubai, United Arab Emirates',
    taxLabel: 'TRN',
  },
  {
    id: 'hk',
    label: 'Hong Kong SAR',
    jurisdiction: 'Hong Kong SAR',
    governingLaw: 'the laws of the Hong Kong Special Administrative Region',
    registrarName: 'Companies Registry (Hong Kong)',
    regNumberFormat: 'CR No., e.g. 2891234',
    addressHint: 'Suite 2408, Two IFC, 8 Finance Street, Central, Hong Kong',
    taxLabel: 'BR No.',
  },
  {
    id: 'ie',
    label: 'Ireland',
    jurisdiction: 'Ireland',
    governingLaw: 'the laws of Ireland',
    registrarName: 'Companies Registration Office (CRO)',
    regNumberFormat: 'CRO Number, e.g. 654321',
    addressHint: '32 Molesworth Street, Dublin 2, D02 Y512, Ireland',
    taxLabel: 'VAT Number',
  },
  {
    id: 'ee',
    label: 'Estonia',
    jurisdiction: 'Republic of Estonia',
    governingLaw: 'the laws of the Republic of Estonia',
    registrarName: 'Estonian Business Register (e-Business Register)',
    regNumberFormat: 'Registry code, e.g. 14856234',
    addressHint: 'Narva mnt 5, 10117 Tallinn, Estonia',
    taxLabel: 'KMKR (VAT) No.',
  },
  {
    id: 'au',
    label: 'Australia',
    jurisdiction: 'Australia',
    governingLaw: 'the laws of the Commonwealth of Australia',
    registrarName: 'Australian Securities and Investments Commission (ASIC)',
    regNumberFormat: 'ACN, e.g. 123 456 789',
    addressHint: 'Level 14, 60 Margaret Street, Sydney NSW 2000, Australia',
    taxLabel: 'ABN',
  },
  {
    id: 'nl',
    label: 'Netherlands',
    jurisdiction: 'the Netherlands',
    governingLaw: 'the laws of the Netherlands',
    registrarName: 'Kamer van Koophandel (KVK)',
    regNumberFormat: 'KVK Number, e.g. 78912345',
    addressHint: 'Herengracht 182, 1016 BR Amsterdam, Netherlands',
    taxLabel: 'BTW (VAT) No.',
  },
  {
    id: 'ca',
    label: 'Canada (Federal)',
    jurisdiction: 'Canada',
    governingLaw: 'the federal laws of Canada',
    registrarName: 'Corporations Canada',
    regNumberFormat: 'Corporation Number, e.g. 1234567-8',
    addressHint: '100 King Street West, Toronto, ON M5X 1C9, Canada',
    taxLabel: 'GST/HST No.',
  },
  {
    id: 'ky',
    label: 'Cayman Islands',
    jurisdiction: 'the Cayman Islands',
    governingLaw: 'the laws of the Cayman Islands',
    registrarName: 'Registrar of Companies, Cayman Islands',
    regNumberFormat: 'Company Number, e.g. 412876',
    addressHint: 'PO Box 1234, Grand Cayman KY1-1108, Cayman Islands',
    taxLabel: 'N/A — no corporate tax registration',
  },
  {
    id: 'vg',
    label: 'British Virgin Islands',
    jurisdiction: 'the British Virgin Islands',
    governingLaw: 'the laws of the British Virgin Islands',
    registrarName: 'BVI Registry of Corporate Affairs',
    regNumberFormat: 'Company Number, e.g. 2018765',
    addressHint: 'Vistra Corporate Services Centre, Road Town, Tortola, BVI',
    taxLabel: 'N/A — no corporate tax registration',
  },
];

export function findPreset(jurisdiction: string): JurisdictionPreset | undefined {
  const q = jurisdiction.trim().toLowerCase();
  return JURISDICTION_PRESETS.find(
    (p) => p.jurisdiction.toLowerCase() === q || p.label.toLowerCase().includes(q),
  );
}
