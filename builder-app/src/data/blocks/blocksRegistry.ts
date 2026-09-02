export interface StudioBlockMeta {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  tags: string[];
  sampleProps?: Record<string, any>;
}

export const STUDIO_BLOCK_CATEGORIES = [
  { id: 'all', label: 'All Blocks', count: 350 },
  { id: 'heros', label: 'Hero Sections', count: 35 },
  { id: 'headers', label: 'Navigation & Headers', count: 25 },
  { id: 'bentos', label: 'Bento Grids', count: 60 },
  { id: 'pricing', label: 'Pricing & Tiers', count: 35 },
  { id: 'testimonials', label: 'Testimonials & Proof', count: 30 },
  { id: 'logos', label: 'Logos & Trust Badges', count: 30 },
  { id: 'ctas', label: 'Call to Actions', count: 30 },
  { id: 'stats', label: 'Stats & Metrics', count: 20 },
  { id: 'contact', label: 'Contact & Forms', count: 25 },
  { id: 'footers', label: 'Compliance Footers', count: 25 },
  { id: 'faqs', label: 'FAQs & Knowledge', count: 20 },
  { id: 'policies', label: 'Statutory Policies', count: 15 },
] as const;

export const STUDIO_BLOCKS: StudioBlockMeta[] = [
  // Heros (35)
  {
    id: 'HeroSplitImageClean',
    name: 'Hero Split Image Clean',
    category: 'heros',
    categoryLabel: 'Hero Sections',
    description: 'Two-column hero with enterprise badge, typography gradient, and high-res device mockup.',
    tags: ['Hero', 'Split', 'Clean', 'Untitled UI', 'Enterprise'],
  },
  {
    id: 'HeroCenteredTerminalGlow',
    name: 'Hero Centered Terminal Glow',
    category: 'heros',
    categoryLabel: 'Hero Sections',
    description: 'Centered dev-first hero with animated CLI command terminal and ambient glow backdrop.',
    tags: ['Hero', 'Terminal', 'Developer', 'CLI', 'Glow'],
  },
  {
    id: 'HeroIsometricMockup3D',
    name: 'Hero Isometric Mockup 3D',
    category: 'heros',
    categoryLabel: 'Hero Sections',
    description: 'Modern 3D isometric application preview frame with floating metric badges.',
    tags: ['Hero', '3D', 'Isometric', 'SaaS', 'Modern'],
  },
  {
    id: 'HeroFintechBankingGlass',
    name: 'Hero FinTech Banking Glass',
    category: 'heros',
    categoryLabel: 'Hero Sections',
    description: 'Financial grade hero with multi-currency payment cards and security badges.',
    tags: ['Hero', 'Fintech', 'Banking', 'Airwallex', 'Cards'],
  },
  {
    id: 'HeroVideoModalTrigger',
    name: 'Hero Video Modal Trigger',
    category: 'heros',
    categoryLabel: 'Hero Sections',
    description: 'Product launch hero featuring an inline video thumbnail with pulsing play button.',
    tags: ['Hero', 'Video', 'Modal', 'Product Launch'],
  },

  // Headers (25)
  {
    id: 'HeaderStickyBlurDefault',
    name: 'Header Sticky Blur Default',
    category: 'headers',
    categoryLabel: 'Navigation & Headers',
    description: 'Glassmorphic sticky header with brand mark, route pills, and CTA trigger.',
    tags: ['Header', 'Glassmorphism', 'Sticky', 'Blur'],
  },
  {
    id: 'HeaderMegaMenuSolutions',
    name: 'Header Mega Menu Solutions',
    category: 'headers',
    categoryLabel: 'Navigation & Headers',
    description: 'Multi-column mega-menu header with categorized solution links and feature highlights.',
    tags: ['Header', 'Mega Menu', 'Enterprise', 'Multi-tier'],
  },
  {
    id: 'HeaderEcomCartDefault',
    name: 'Header E-commerce Cart Nav',
    category: 'headers',
    categoryLabel: 'Navigation & Headers',
    description: 'Commerce-ready header with integrated search bar, currency selector, and cart badge.',
    tags: ['Header', 'Cart', 'E-commerce', 'Search'],
  },

  // Bentos (60)
  {
    id: 'BentoAsymLargeLeft',
    name: 'Bento Asym Large Left',
    category: 'bentos',
    categoryLabel: 'Bento Grids',
    description: 'Asymmetric 3-card bento grid with dominant primary feature showcase on the left.',
    tags: ['Bento', 'Grid', 'Asymmetric', 'Features'],
  },
  {
    id: 'Bento3x3Classic',
    name: 'Bento 3x3 Metric Matrix',
    category: 'bentos',
    categoryLabel: 'Bento Grids',
    description: 'Nine-compartment precision bento grid highlighting platform pillars and capabilities.',
    tags: ['Bento', '3x3', 'Matrix', 'Enterprise'],
  },
  {
    id: 'BentoTabsSolutions',
    name: 'Bento Tabs Interactive',
    category: 'bentos',
    categoryLabel: 'Bento Grids',
    description: 'Tab-driven interactive bento display with dynamic tab switching for tech stacks.',
    tags: ['Bento', 'Tabs', 'Interactive', 'Code'],
  },
  {
    id: 'BentoMetricProcessingVolume',
    name: 'Bento Metric High-Volume',
    category: 'bentos',
    categoryLabel: 'Bento Grids',
    description: 'High-impact stat bento tile displaying real-time processing volume and uptime.',
    tags: ['Bento', 'Metrics', 'Stats', 'Scale'],
  },

  // Pricing (35)
  {
    id: 'Pricing3TierSaaSStandard',
    name: 'Pricing 3-Tier SaaS Standard',
    category: 'pricing',
    categoryLabel: 'Pricing & Tiers',
    description: 'Industry-standard 3-tier pricing card matrix with highlighted popular plan.',
    tags: ['Pricing', 'SaaS', 'Tiers', 'Checkout'],
  },
  {
    id: 'PricingToggleAnnualDiscount',
    name: 'Pricing Toggle Annual / Monthly',
    category: 'pricing',
    categoryLabel: 'Pricing & Tiers',
    description: 'Interactive monthly/annual billing switch with badge showing 20% savings.',
    tags: ['Pricing', 'Toggle', 'Discount', 'Annual'],
  },
  {
    id: 'PricingFeatureComparisonMatrix',
    name: 'Pricing Comparison Matrix',
    category: 'pricing',
    categoryLabel: 'Pricing & Tiers',
    description: 'Comprehensive tabular feature comparison checklist across Starter, Pro, and Enterprise.',
    tags: ['Pricing', 'Table', 'Comparison', 'Matrix'],
  },

  // Testimonials (30)
  {
    id: 'Testimonials3ColWallOfLove',
    name: 'Testimonials 3-Column Wall of Love',
    category: 'testimonials',
    categoryLabel: 'Testimonials & Proof',
    description: 'Social proof card grid featuring verified client avatars, star ratings, and quotes.',
    tags: ['Testimonials', 'Reviews', 'Social Proof', 'Avatars'],
  },
  {
    id: 'TestimonialsEnterpriseCaseStudy',
    name: 'Testimonials Enterprise Case Study',
    category: 'testimonials',
    categoryLabel: 'Testimonials & Proof',
    description: 'In-depth executive quote banner with corporate logo, measurable metric, and video link.',
    tags: ['Testimonials', 'Case Study', 'Enterprise', 'Executive'],
  },

  // Logos (30)
  {
    id: 'LogoMarqueeContinuousInfinite',
    name: 'Logo Marquee Continuous Infinite',
    category: 'logos',
    categoryLabel: 'Logos & Trust Badges',
    description: 'Smooth CSS/Framer motion infinite scrolling marquee of Fortune 500 partner logos.',
    tags: ['Logos', 'Marquee', 'Infinite', 'Partners'],
  },
  {
    id: 'LogoTrustBadgesAirwallexKyc',
    name: 'Airwallex KYC & Payment Badges',
    category: 'logos',
    categoryLabel: 'Logos & Trust Badges',
    description: 'Official Visa, Mastercard, AMEX, Airwallex, SOC2, and PCI-DSS compliance badges.',
    tags: ['Logos', 'Airwallex', 'PCI-DSS', 'Compliance', 'Security'],
  },

  // Stats (20)
  {
    id: 'Stats01_Simple4Col',
    name: 'Stats 4-Column Clean Metrics',
    category: 'stats',
    categoryLabel: 'Stats & Metrics',
    description: 'Four-column horizontal metrics strip with animated counters and descriptive sublabels.',
    tags: ['Stats', 'Metrics', 'Numbers', 'Clean'],
  },
  {
    id: 'Stats02_BorderedPills',
    name: 'Stats Bordered High-Contrast Pills',
    category: 'stats',
    categoryLabel: 'Stats & Metrics',
    description: 'Modern bordered pills displaying global uptime SLA, client count, and latency.',
    tags: ['Stats', 'Pills', 'Bordered', 'SLA'],
  },

  // CTAs (30)
  {
    id: 'CtaGradientGlowAction',
    name: 'CTA Gradient Glow Full-Width',
    category: 'ctas',
    categoryLabel: 'Call to Actions',
    description: 'High-conversion banner with dual CTAs, money-back guarantee badge, and glowing aura.',
    tags: ['CTA', 'Conversion', 'Gradient', 'Banner'],
  },
  {
    id: 'CtaSplitNewsletterSignup',
    name: 'CTA Split Form Lead Capture',
    category: 'ctas',
    categoryLabel: 'Call to Actions',
    description: 'Split section with headline on the left and 1-click email newsletter/trial capture on right.',
    tags: ['CTA', 'Email', 'Lead Capture', 'Newsletter'],
  },

  // FAQs (20)
  {
    id: 'FaqsAccordionGlassClean',
    name: 'FAQs Glassmorphic Accordion',
    category: 'faqs',
    categoryLabel: 'FAQs & Knowledge',
    description: 'Smooth accordion dropdowns answering common business, onboarding, and billing questions.',
    tags: ['FAQs', 'Accordion', 'Support', 'Questions'],
  },

  // Contact (25)
  {
    id: 'ContactSplitCorporateCard',
    name: 'Contact Split Corporate Card',
    category: 'contact',
    categoryLabel: 'Contact & Forms',
    description: 'Full statutory contact block with verified corporate registration, map, email, and phone.',
    tags: ['Contact', 'Form', 'Corporate', 'Airwallex KYC'],
  },

  // Footers (25)
  {
    id: 'Footer5ColumnEnterpriseMega',
    name: 'Footer 5-Column Enterprise Mega',
    category: 'footers',
    categoryLabel: 'Compliance Footers',
    description: 'Comprehensive 5-column footer with statutory entity disclosures, legal links, and social icons.',
    tags: ['Footer', 'Mega', 'Compliance', 'Legal'],
  },

  // Policies (15)
  {
    id: 'PoliciesStatutoryAccordion',
    name: 'Statutory Policies Compliance Accordion',
    category: 'policies',
    categoryLabel: 'Statutory Policies',
    description: 'Full legal texts for Terms of Service, Privacy Shield, Refund Policy, and Delivery Terms.',
    tags: ['Policies', 'Terms', 'Privacy', 'Refund', 'Airwallex KYC'],
  },
];
