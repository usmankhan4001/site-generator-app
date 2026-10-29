export type BrandCategory = 'payment' | 'compliance' | 'cloud';

export interface BrandMark {
  id: string;
  name: string;
  category: BrandCategory;
  svg: string;
  description: string;
}

export const BRAND_MARKS: BrandMark[] = [
  // ==========================================
  // PAYMENT BRANDS (10)
  // ==========================================
  {
    id: 'airwallex',
    name: 'Airwallex',
    category: 'payment',
    description: 'Airwallex global payments, FX treasury, and multi-currency accounts',
    svg: `<svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4 7.2L5.8 23.8H13.6L16.2 19.3L18.8 23.8H26.6L17 7.2C16.6 6.5 15.8 6.5 15.4 7.2Z" fill="#F4511E"/>
      <path d="M25.2 24.2L28.8 30.4C29.2 31.1 28.7 32 27.9 32H20.1L23.7 25.8C24.3 24.8 24.8 24.8 25.2 24.2Z" fill="#FF8A65"/>
      <path d="M7.2 24.2L3.6 30.4C3.2 31.1 3.7 32 4.5 32H12.3L8.7 25.8C8.1 24.8 7.6 24.8 7.2 24.2Z" fill="#D84315"/>
      <text x="36" y="26" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="18" fill="currentColor">airwallex</text>
    </svg>`,
  },
  {
    id: 'visa',
    name: 'Visa',
    category: 'payment',
    description: 'Visa worldwide credit, debit, and digital payments',
    svg: `<svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M38.9 4.2L30.1 25.2H24.3L18.6 8.7C18.3 7.6 18.0 7.2 17.1 6.7C15.6 5.9 13.0 5.1 10.4 4.5L10.6 3.6H20.0C21.3 3.6 22.4 4.5 22.7 6.0L24.9 18.3L30.7 3.6H38.9V4.2ZM53.6 18.4C53.7 11.4 44.0 11.0 44.1 7.9C44.1 6.9 45.1 5.9 47.1 5.6C48.1 5.5 50.8 5.4 53.8 6.8L55.0 1.2C53.4 0.6 51.3 0 48.7 0C42.8 0 38.6 3.1 38.5 7.6C38.4 11.0 41.4 12.8 43.8 14.0C46.1 15.2 46.9 15.9 46.9 16.9C46.8 18.4 45.1 19.1 43.5 19.1C40.5 19.1 38.7 18.3 36.9 17.5L35.6 23.4C37.4 24.2 40.7 24.9 44.1 24.9C50.4 24.9 53.6 21.8 53.6 18.4ZM69.5 24.7H74.8L70.4 3.6H65.5C64.3 3.6 63.3 4.3 62.9 5.3L53.7 24.7H59.5L60.7 21.4H67.8L69.5 24.7ZM62.3 16.9L65.2 9.0L66.9 16.9H62.3ZM87.8 3.6L82.9 24.7H77.5L82.4 3.6H87.8Z" fill="#1A1F71"/>
    </svg>`,
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'payment',
    description: 'Mastercard global payment network',
    svg: `<svg viewBox="0 0 100 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="38" cy="31" r="26" fill="#EB001B"/>
      <circle cx="62" cy="31" r="26" fill="#F79E1B"/>
      <path d="M50 12.4A25.9 25.9 0 0 0 38 31A25.9 25.9 0 0 0 50 49.6A25.9 25.9 0 0 0 62 31A25.9 25.9 0 0 0 50 12.4Z" fill="#FF5F00"/>
    </svg>`,
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    category: 'payment',
    description: 'Apple Pay contactless mobile and web checkout',
    svg: `<svg viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="110" height="44" rx="8" fill="currentColor" fill-opacity="0.08"/>
      <path d="M29.5 17.5C28.7 18.5 27.5 19.1 26.3 19.0C26.1 17.8 26.7 16.6 27.4 15.8C28.3 14.8 29.5 14.2 30.6 14.1C30.8 15.3 30.2 16.5 29.5 17.5ZM30.6 19.3C28.9 19.2 27.4 20.3 26.6 20.3C25.7 20.3 24.5 19.4 23.2 19.4C21.6 19.4 20.0 20.3 19.2 21.7C17.5 24.7 18.7 29.1 20.4 31.5C21.2 32.7 22.2 34.0 23.5 33.9C24.8 33.9 25.3 33.1 26.8 33.1C28.4 33.1 28.8 33.9 30.2 33.9C31.5 33.9 32.4 32.7 33.2 31.5C34.2 30.1 34.6 28.7 34.7 28.6C34.6 28.5 31.9 27.5 31.9 24.5C31.9 22.0 33.9 20.8 34.0 20.7C32.8 19.0 31.0 19.3 30.6 19.3Z" fill="currentColor"/>
      <text x="42" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="18" fill="currentColor">Pay</text>
    </svg>`,
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    category: 'payment',
    description: 'Google Pay secure zero-friction one-click wallet',
    svg: `<svg viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="110" height="44" rx="8" fill="currentColor" fill-opacity="0.08"/>
      <path d="M26.5 22.2C26.5 21.6 26.4 21.0 26.3 20.5H19.5V23.5H23.4C23.2 24.6 22.6 25.5 21.7 26.1V28.3H24.5C26.1 26.8 26.5 24.7 26.5 22.2Z" fill="#4285F4"/>
      <path d="M19.5 29.3C21.5 29.3 23.1 28.6 24.5 27.3L21.7 25.1C21.0 25.6 20.2 26.0 19.5 26.0C17.6 26.0 16.0 24.7 15.4 23.0H12.5V25.2C13.9 28.0 16.5 29.3 19.5 29.3Z" fill="#34A853"/>
      <path d="M15.4 23.0C15.1 22.0 15.1 21.0 15.4 20.0V17.8H12.5C11.3 20.2 11.3 22.8 12.5 25.2L15.4 23.0Z" fill="#FBBC04"/>
      <path d="M19.5 17.0C20.6 17.0 21.6 17.4 22.3 18.1L24.6 15.8C23.2 14.5 21.4 13.7 19.5 13.7C16.5 13.7 13.9 15.0 12.5 17.8L15.4 20.0C16.0 18.3 17.6 17.0 19.5 17.0Z" fill="#EA4335"/>
      <text x="36" y="27" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="16" fill="currentColor">Pay</text>
    </svg>`,
  },
  {
    id: 'amex',
    name: 'American Express',
    category: 'payment',
    description: 'American Express premium corporate and consumer payment network',
    svg: `<svg viewBox="0 0 110 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="110" height="50" rx="6" fill="#006FCF"/>
      <text x="55" y="24" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="11" letter-spacing="1" fill="#FFFFFF">AMERICAN</text>
      <text x="55" y="38" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="11" letter-spacing="1" fill="#FFFFFF">EXPRESS</text>
    </svg>`,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'payment',
    description: 'PayPal global online payments and digital wallet',
    svg: `<svg viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.5 5.5H10.5C9.7 5.5 9.0 6.1 8.9 6.9L5.5 28.5C5.4 29.1 5.9 29.6 6.5 29.6H11.0L12.4 20.7C12.5 19.9 13.2 19.3 14.0 19.3H16.8C22.0 19.3 25.5 16.7 26.3 11.5C26.6 9.3 25.8 7.6 24.3 6.8C23.0 5.9 21.2 5.5 19.5 5.5Z" fill="#003087"/>
      <path d="M26.3 11.5C25.5 16.7 22.0 19.3 16.8 19.3H14.0C13.2 19.3 12.5 19.9 12.4 20.7L10.8 30.5H15.0C15.6 30.5 16.2 30.0 16.3 29.4L17.3 23.3C17.4 22.7 17.9 22.3 18.5 22.3H19.5C23.8 22.3 26.8 20.2 27.5 15.9C27.9 13.7 27.5 12.3 26.3 11.5Z" fill="#0079C1"/>
      <text x="36" y="24" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-style="italic" font-size="18" fill="currentColor">PayPal</text>
    </svg>`,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'payment',
    description: 'Stripe financial infrastructure for the internet',
    svg: `<svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 16.2C3.5 13.1 5.6 11.8 8.6 11.8C10.7 11.8 12.4 12.4 13.6 13.1L12.5 15.7C11.5 15.2 10.3 14.7 8.8 14.7C7.2 14.7 6.4 15.3 6.4 16.2C6.4 18.5 14.2 17.1 14.2 22.6C14.2 26.1 11.5 27.5 8.0 27.5C5.8 27.5 3.7 26.8 2.3 26.0L3.5 23.3C4.8 24.1 6.3 24.7 8.0 24.7C9.7 24.7 11.0 24.0 11.0 22.9C11.0 20.3 3.5 21.9 3.5 16.2ZM19.2 12.1H22.4V27.2H19.2V12.1ZM19.0 8.0C19.0 6.9 19.9 6.0 21.0 6.0C22.1 6.0 23.0 6.9 23.0 8.0C23.0 9.1 22.1 10.0 21.0 10.0C19.9 10.0 19.0 9.1 19.0 8.0ZM28.5 12.1H31.5V14.5H31.7C32.3 12.9 34.0 11.8 36.0 11.8C36.6 11.8 37.0 11.9 37.4 12.1V15.2C36.9 15.0 36.3 14.9 35.6 14.9C33.3 14.9 31.7 16.8 31.7 19.5V27.2H28.5V12.1ZM43.4 8.2V12.1H46.8V14.8H43.4V23.0C43.4 24.1 43.8 24.6 44.9 24.6C45.6 24.6 46.2 24.4 46.5 24.2L47.0 26.9C46.3 27.2 45.3 27.5 44.0 27.5C41.2 27.5 40.2 25.8 40.2 23.0V14.8H38.0V12.1H40.2V8.2H43.4ZM51.5 12.1H54.7V27.2H51.5V12.1ZM51.3 8.0C51.3 6.9 52.2 6.0 53.3 6.0C54.4 6.0 55.3 6.9 55.3 8.0C55.3 9.1 54.4 10.0 53.3 10.0C52.2 10.0 51.3 9.1 51.3 8.0Z" fill="#635BFF"/>
    </svg>`,
  },
  {
    id: 'discover',
    name: 'Discover',
    category: 'payment',
    description: 'Discover global network credit and payments',
    svg: `<svg viewBox="0 0 110 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" fill="currentColor">DISC</text>
      <circle cx="70" cy="18" r="9" fill="#FF6000"/>
      <text x="82" y="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="20" fill="currentColor">VER</text>
    </svg>`,
  },
  {
    id: 'unionpay',
    name: 'UnionPay',
    category: 'payment',
    description: 'China UnionPay international card association',
    svg: `<svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="22" height="24" rx="3" fill="#D9222A"/>
      <rect x="30" y="8" width="22" height="24" rx="3" fill="#0065B3"/>
      <rect x="50" y="8" width="22" height="24" rx="3" fill="#007B5F"/>
      <text x="12" y="25" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="11" fill="#FFFFFF">Union</text>
      <text x="40" y="25" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="11" fill="#FFFFFF">Pay</text>
    </svg>`,
  },

  // ==========================================
  // TRUST & COMPLIANCE SEALS (6)
  // ==========================================
  {
    id: 'pci-dss',
    name: 'PCI DSS Level 1',
    category: 'compliance',
    description: 'Payment Card Industry Data Security Standard Level 1 Certified',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#2563eb" stroke-width="1.8" fill="var(--primary, #2563eb)" fill-opacity="0.08"/>
      <path d="M18 15 L26 15 C30 15, 32 17, 32 20 C32 23, 30 25, 26 25 L18 25 Z M22 18 V22 H25 C26.5 22, 27.5 21.5, 27.5 20 C27.5 18.5, 26.5 18, 25 18 Z" fill="#2563eb"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">PCI DSS</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#2563eb">LEVEL 1 CERTIFIED</text>
    </svg>`,
  },
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    category: 'compliance',
    description: 'Service Organization Control 2 Type II Certified by AICPA',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#059669" stroke-width="1.8" fill="#059669" fill-opacity="0.08"/>
      <circle cx="20" cy="25" r="10" stroke="#059669" stroke-width="1.8"/>
      <path d="M16 25 L19 28 L25 22" stroke="#059669" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">AICPA SOC 2</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#059669">TYPE II COMPLIANT</text>
    </svg>`,
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001',
    category: 'compliance',
    description: 'International Information Security Management Standard Certified',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#7c3aed" stroke-width="1.8" fill="#7c3aed" fill-opacity="0.08"/>
      <polygon points="20,15 28,20 28,30 20,35 12,30 12,20" stroke="#7c3aed" stroke-width="1.8"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">ISO / IEC</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#7c3aed">27001 CERTIFIED</text>
    </svg>`,
  },
  {
    id: 'gdpr',
    name: 'GDPR Compliant',
    category: 'compliance',
    description: 'General Data Protection Regulation EU 2016/679 Privacy Assured',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#0284c7" stroke-width="1.8" fill="#0284c7" fill-opacity="0.08"/>
      <circle cx="20" cy="25" r="10" stroke="#0284c7" stroke-width="1.8" stroke-dasharray="3 2"/>
      <path d="M17 25 L19 27 L23 23" stroke="#0284c7" stroke-width="1.8" stroke-linecap="round"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">EU GDPR</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#0284c7">VERIFIED PRIVACY</text>
    </svg>`,
  },
  {
    id: 'hipaa',
    name: 'HIPAA Compliant',
    category: 'compliance',
    description: 'Health Insurance Portability and Accountability Act Certified Safeguards',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#ea580c" stroke-width="1.8" fill="#ea580c" fill-opacity="0.08"/>
      <path d="M20 16 V34 M11 25 H29" stroke="#ea580c" stroke-width="3" stroke-linecap="round"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">HIPAA</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#ea580c">SECURITY ASSURED</text>
    </svg>`,
  },
  {
    id: 'ccpa',
    name: 'CCPA Compliant',
    category: 'compliance',
    description: 'California Consumer Privacy Act Enforced Data Rights',
    svg: `<svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="136" height="46" rx="6" stroke="#0891b2" stroke-width="1.8" fill="#0891b2" fill-opacity="0.08"/>
      <path d="M20 16 L28 20 V26 C28 30, 20 34, 20 34 C20 34, 12 30, 12 26 V20 Z" stroke="#0891b2" stroke-width="1.8" fill="#0891b2" fill-opacity="0.15"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="12" fill="currentColor">CCPA</text>
      <text x="36" y="36" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="10" fill="#0891b2">DATA COMPLIANT</text>
    </svg>`,
  },

  // ==========================================
  // CLOUD & DEV INFRASTRUCTURE (6)
  // ==========================================
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'cloud',
    description: 'Cloudflare edge compute, DDoS mitigation, and Anycast CDN',
    svg: `<svg viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.8 19.8C25.4 15.6 21.8 12.3 17.5 12.3C14.4 12.3 11.6 13.9 10.2 16.5C9.4 16.2 8.5 16.0 7.6 16.0C4.0 16.0 1.0 18.9 1.0 22.5C1.0 22.8 1.0 23.1 1.1 23.4H26.2C26.1 22.2 25.9 21.0 25.8 19.8Z" fill="#F38020"/>
      <path d="M26.2 23.4C26.4 22.7 26.5 22.0 26.5 21.3C26.5 18.2 24.5 15.6 21.6 14.7C20.6 11.2 17.4 8.6 13.5 8.6C10.5 8.6 7.8 10.1 6.3 12.4C7.8 12.0 9.4 11.8 11.0 11.8C16.5 11.8 21.0 16.3 21.0 21.8C21.0 22.3 21.0 22.9 20.9 23.4H26.2Z" fill="#FAAE40"/>
      <text x="34" y="24" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="currentColor">Cloudflare</text>
    </svg>`,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    description: 'Vercel frontend cloud and serverless edge deployment platform',
    svg: `<svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,6 30,26 6,26" fill="currentColor"/>
      <text x="38" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor">Vercel</text>
    </svg>`,
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud',
    description: 'AWS hyperscale cloud infrastructure and compute services',
    svg: `<svg viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="10" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="18" fill="currentColor">aws</text>
      <path d="M8 29 C24 37, 45 35, 52 28" stroke="#FF9900" stroke-width="3" stroke-linecap="round"/>
      <polygon points="53,28 48,25 46,31" fill="#FF9900" stroke="none"/>
    </svg>`,
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    category: 'cloud',
    description: 'Google Cloud Platform AI compute, BigQuery, and enterprise infrastructure',
    svg: `<svg viewBox="0 0 130 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13 C17.3 13 15.8 13.9 15.0 15.3 C14.3 14.8 13.5 14.5 12.6 14.5 C10.4 14.5 8.6 16.3 8.6 18.5 C8.6 18.7 8.6 18.9 8.7 19.1 C6.6 19.5 5 21.4 5 23.6 C5 26.0 7.0 28.0 9.4 28.0 H19 C22.3 28.0 25 25.3 25 22.0 C25 18.7 22.3 16.0 19 16.0 Z" fill="#4285F4"/>
      <text x="32" y="24" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" fill="currentColor">Google Cloud</text>
    </svg>`,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'cloud',
    description: 'The React Framework for high-performance production web applications',
    svg: `<svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="currentColor"/>
      <path d="M12 9.5 V22.5 M12 10 L21 22.5" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" fill="currentColor">Next.js</text>
    </svg>`,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'cloud',
    description: 'GitHub version control, collaborative repositories, and Actions CI/CD',
    svg: `<svg viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.5C8.3 2.5 2 8.8 2 16.5C2 22.7 6.0 27.9 11.6 29.8C12.3 29.9 12.6 29.5 12.6 29.1V26.7C8.7 27.5 7.9 24.8 7.9 24.8C7.3 23.2 6.4 22.7 6.4 22.7C5.1 21.8 6.5 21.8 6.5 21.8C7.9 21.9 8.7 23.2 8.7 23.2C10.0 25.4 12.0 24.8 12.8 24.4C12.9 23.4 13.3 22.8 13.8 22.4C10.7 22.0 7.4 20.8 7.4 15.5C7.4 14.0 7.9 12.8 8.8 11.8C8.6 11.4 8.2 10.0 9.0 8.2C9.0 8.2 10.1 7.8 12.6 9.5C13.7 9.2 14.8 9.0 16.0 9.0C17.2 9.0 18.3 9.2 19.4 9.5C21.9 7.8 23.0 8.2 23.0 8.2C23.8 10.0 23.4 11.4 23.2 11.8C24.1 12.8 24.6 14.0 24.6 15.5C24.6 20.9 21.3 22.0 18.2 22.4C18.7 22.9 19.2 23.8 19.2 25.2V29.1C19.2 29.5 19.5 29.9 20.2 29.8C25.8 27.9 29.8 22.7 29.8 16.5C29.8 8.8 23.5 2.5 16 2.5Z" fill="currentColor"/>
      <text x="36" y="23" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="currentColor">GitHub</text>
    </svg>`,
  },
];

export function getBrandMarks(category?: BrandCategory | 'all'): BrandMark[] {
  if (!category || category === 'all') return BRAND_MARKS;
  return BRAND_MARKS.filter((m) => m.category === category);
}

export function searchBrandMarks(query: string): BrandMark[] {
  const q = query.trim().toLowerCase();
  if (!q) return BRAND_MARKS;
  return BRAND_MARKS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q),
  );
}
