
'use client';

import React from 'react';
// Standard Puck Type Definitions (Self-contained for universal compatibility)
export type ComponentConfig<Props = Record<string, any>> = {
  render: React.FC<Props>;
  label?: string;
  fields?: Record<string, any>;
  defaultProps?: Partial<Props>;
};
export type Config = Record<string, any>;

import * as StatsBlocks from './stats';
import * as PricingBlocks from './pricing';
import * as TestimonialsBlocks from './testimonials';
import * as FaqsBlocks from './faqs';
import * as ContactBlocks from './contact';
import * as FootersBlocks from './footers';
import * as PoliciesBlocks from './policies';
import * as CtasBlocks from './ctas';


export type PuckBlockProps = Record<string, any>;

// Puck configuration type definition compatible with @measured/puck or standalone renderer
export interface PuckRegistryConfig {
  categories: Record<
    string,
    {
      title: string;
      visible?: boolean;
      components: string[];
    }
  >;
  components: Record<string, ComponentConfig<any> | { render: React.FC<any>; label?: string; fields?: Record<string, any> }>;
}

export const puckConfig: PuckRegistryConfig = {
  categories: {
    stats: {
      title: 'Stats & Metrics (20)',
      components: [],
    },
    pricing: {
      title: 'Pricing & Offerings (35)',
      components: [],
    },
    testimonials: {
      title: 'Testimonials & Reviews (30)',
      components: [],
    },
    faqs: {
      title: 'FAQs & Support (20)',
      components: [],
    },
    contact: {
      title: 'Contact & Routing (25)',
      components: [],
    },
    footers: {
      title: 'Compliance Footers (25)',
      components: [],
    },
    policies: {
      title: 'Statutory Policies (15)',
      components: [],
    },
    ctas: {
      title: 'Call To Actions (30)',
      components: [],
    },
  },
  components: {},
};

// Register all 200 components programmatically with Puck

puckConfig.categories.stats.components.push('Stats01_Simple4Col');
puckConfig.components['Stats01_Simple4Col'] = {
  label: 'Stats01_ Simple4 Col',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats01_Simple4Col'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats02_BorderedPills');
puckConfig.components['Stats02_BorderedPills'] = {
  label: 'Stats02_ Bordered Pills',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats02_BorderedPills'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats03_AccentBackground');
puckConfig.components['Stats03_AccentBackground'] = {
  label: 'Stats03_ Accent Background',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats03_AccentBackground'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats04_TimelineGrowth');
puckConfig.components['Stats04_TimelineGrowth'] = {
  label: 'Stats04_ Timeline Growth',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats04_TimelineGrowth'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats05_CardGridWithIcons');
puckConfig.components['Stats05_CardGridWithIcons'] = {
  label: 'Stats05_ Card Grid With Icons',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats05_CardGridWithIcons'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats06_SplitWithHeading');
puckConfig.components['Stats06_SplitWithHeading'] = {
  label: 'Stats06_ Split With Heading',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats06_SplitWithHeading'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats07_DarkMinimalist');
puckConfig.components['Stats07_DarkMinimalist'] = {
  label: 'Stats07_ Dark Minimalist',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats07_DarkMinimalist'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats08_ComparisonMetrics');
puckConfig.components['Stats08_ComparisonMetrics'] = {
  label: 'Stats08_ Comparison Metrics',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats08_ComparisonMetrics'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats09_FloatingCardOverlap');
puckConfig.components['Stats09_FloatingCardOverlap'] = {
  label: 'Stats09_ Floating Card Overlap',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats09_FloatingCardOverlap'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats10_GradientBorderCards');
puckConfig.components['Stats10_GradientBorderCards'] = {
  label: 'Stats10_ Gradient Border Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats10_GradientBorderCards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats11_KpiDeltaIndicators');
puckConfig.components['Stats11_KpiDeltaIndicators'] = {
  label: 'Stats11_ Kpi Delta Indicators',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats11_KpiDeltaIndicators'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats12_GlobalFootprint');
puckConfig.components['Stats12_GlobalFootprint'] = {
  label: 'Stats12_ Global Footprint',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats12_GlobalFootprint'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats13_CustomerTrustBar');
puckConfig.components['Stats13_CustomerTrustBar'] = {
  label: 'Stats13_ Customer Trust Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats13_CustomerTrustBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats14_StackedDividerGrid');
puckConfig.components['Stats14_StackedDividerGrid'] = {
  label: 'Stats14_ Stacked Divider Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats14_StackedDividerGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats15_GlassmorphicTiles');
puckConfig.components['Stats15_GlassmorphicTiles'] = {
  label: 'Stats15_ Glassmorphic Tiles',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats15_GlassmorphicTiles'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats16_AirwallexKycStats');
puckConfig.components['Stats16_AirwallexKycStats'] = {
  label: 'Stats16_ Airwallex Kyc Stats',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats16_AirwallexKycStats'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats17_CircularProgressStats');
puckConfig.components['Stats17_CircularProgressStats'] = {
  label: 'Stats17_ Circular Progress Stats',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats17_CircularProgressStats'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats18_InteractiveTabsStats');
puckConfig.components['Stats18_InteractiveTabsStats'] = {
  label: 'Stats18_ Interactive Tabs Stats',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats18_InteractiveTabsStats'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats19_MarqueeTicker');
puckConfig.components['Stats19_MarqueeTicker'] = {
  label: 'Stats19_ Marquee Ticker',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats19_MarqueeTicker'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.stats.components.push('Stats20_BannerWithCTA');
puckConfig.components['Stats20_BannerWithCTA'] = {
  label: 'Stats20_ Banner With C T A',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (StatsBlocks as any)['Stats20_BannerWithCTA'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing01_TieredSaaS3Cards');
puckConfig.components['Pricing01_TieredSaaS3Cards'] = {
  label: 'Pricing01_ Tiered Saa S3 Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing01_TieredSaaS3Cards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing02_MonthlyAnnualSwitch');
puckConfig.components['Pricing02_MonthlyAnnualSwitch'] = {
  label: 'Pricing02_ Monthly Annual Switch',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing02_MonthlyAnnualSwitch'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing03_PhysicalB2CGrid');
puckConfig.components['Pricing03_PhysicalB2CGrid'] = {
  label: 'Pricing03_ Physical B2 C Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing03_PhysicalB2CGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing04_SowRetainerTable');
puckConfig.components['Pricing04_SowRetainerTable'] = {
  label: 'Pricing04_ Sow Retainer Table',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing04_SowRetainerTable'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing05_EnterpriseFeatureMatrix');
puckConfig.components['Pricing05_EnterpriseFeatureMatrix'] = {
  label: 'Pricing05_ Enterprise Feature Matrix',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing05_EnterpriseFeatureMatrix'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing06_UsageBasedSlider');
puckConfig.components['Pricing06_UsageBasedSlider'] = {
  label: 'Pricing06_ Usage Based Slider',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing06_UsageBasedSlider'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing07_HorizontalSingleCard');
puckConfig.components['Pricing07_HorizontalSingleCard'] = {
  label: 'Pricing07_ Horizontal Single Card',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing07_HorizontalSingleCard'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing08_FourTierCorporate');
puckConfig.components['Pricing08_FourTierCorporate'] = {
  label: 'Pricing08_ Four Tier Corporate',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing08_FourTierCorporate'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing09_DarkGlowSpotlight');
puckConfig.components['Pricing09_DarkGlowSpotlight'] = {
  label: 'Pricing09_ Dark Glow Spotlight',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing09_DarkGlowSpotlight'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing10_EcommerceBundleCards');
puckConfig.components['Pricing10_EcommerceBundleCards'] = {
  label: 'Pricing10_ Ecommerce Bundle Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing10_EcommerceBundleCards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing11_PayAsYouGoMeter');
puckConfig.components['Pricing11_PayAsYouGoMeter'] = {
  label: 'Pricing11_ Pay As You Go Meter',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing11_PayAsYouGoMeter'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing12_StartupDiscountTier');
puckConfig.components['Pricing12_StartupDiscountTier'] = {
  label: 'Pricing12_ Startup Discount Tier',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing12_StartupDiscountTier'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing13_HighTicketRetainer');
puckConfig.components['Pricing13_HighTicketRetainer'] = {
  label: 'Pricing13_ High Ticket Retainer',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing13_HighTicketRetainer'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing14_AddonAdditives');
puckConfig.components['Pricing14_AddonAdditives'] = {
  label: 'Pricing14_ Addon Additives',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing14_AddonAdditives'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing15_FreeTrialBanner');
puckConfig.components['Pricing15_FreeTrialBanner'] = {
  label: 'Pricing15_ Free Trial Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing15_FreeTrialBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing16_MultiCurrencyTable');
puckConfig.components['Pricing16_MultiCurrencyTable'] = {
  label: 'Pricing16_ Multi Currency Table',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing16_MultiCurrencyTable'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing17_LifetimeLicenseCard');
puckConfig.components['Pricing17_LifetimeLicenseCard'] = {
  label: 'Pricing17_ Lifetime License Card',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing17_LifetimeLicenseCard'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing18_PerSeatCollaborative');
puckConfig.components['Pricing18_PerSeatCollaborative'] = {
  label: 'Pricing18_ Per Seat Collaborative',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing18_PerSeatCollaborative'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing19_CardSchemeAcquiring');
puckConfig.components['Pricing19_CardSchemeAcquiring'] = {
  label: 'Pricing19_ Card Scheme Acquiring',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing19_CardSchemeAcquiring'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing20_HardwareLeasingGrid');
puckConfig.components['Pricing20_HardwareLeasingGrid'] = {
  label: 'Pricing20_ Hardware Leasing Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing20_HardwareLeasingGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing21_DeveloperAPITiers');
puckConfig.components['Pricing21_DeveloperAPITiers'] = {
  label: 'Pricing21_ Developer A P I Tiers',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing21_DeveloperAPITiers'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing22_VolumeDiscountTier');
puckConfig.components['Pricing22_VolumeDiscountTier'] = {
  label: 'Pricing22_ Volume Discount Tier',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing22_VolumeDiscountTier'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing23_DedicatedSLAContract');
puckConfig.components['Pricing23_DedicatedSLAContract'] = {
  label: 'Pricing23_ Dedicated S L A Contract',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing23_DedicatedSLAContract'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing24_CryptoFiatGateway');
puckConfig.components['Pricing24_CryptoFiatGateway'] = {
  label: 'Pricing24_ Crypto Fiat Gateway',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing24_CryptoFiatGateway'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing25_BespokeEnterpriseQuote');
puckConfig.components['Pricing25_BespokeEnterpriseQuote'] = {
  label: 'Pricing25_ Bespoke Enterprise Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing25_BespokeEnterpriseQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing26_SeasonalPromotionCard');
puckConfig.components['Pricing26_SeasonalPromotionCard'] = {
  label: 'Pricing26_ Seasonal Promotion Card',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing26_SeasonalPromotionCard'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing27_WhiteLabelPlatform');
puckConfig.components['Pricing27_WhiteLabelPlatform'] = {
  label: 'Pricing27_ White Label Platform',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing27_WhiteLabelPlatform'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing28_AgencyPartnerTier');
puckConfig.components['Pricing28_AgencyPartnerTier'] = {
  label: 'Pricing28_ Agency Partner Tier',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing28_AgencyPartnerTier'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing29_MarketplaceSplitTier');
puckConfig.components['Pricing29_MarketplaceSplitTier'] = {
  label: 'Pricing29_ Marketplace Split Tier',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing29_MarketplaceSplitTier'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing30_CorporateTreasury');
puckConfig.components['Pricing30_CorporateTreasury'] = {
  label: 'Pricing30_ Corporate Treasury',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing30_CorporateTreasury'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing31_InstantPayoutCards');
puckConfig.components['Pricing31_InstantPayoutCards'] = {
  label: 'Pricing31_ Instant Payout Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing31_InstantPayoutCards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing32_ComplianceShieldTier');
puckConfig.components['Pricing32_ComplianceShieldTier'] = {
  label: 'Pricing32_ Compliance Shield Tier',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing32_ComplianceShieldTier'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing33_OpenBankingA2A');
puckConfig.components['Pricing33_OpenBankingA2A'] = {
  label: 'Pricing33_ Open Banking A2 A',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing33_OpenBankingA2A'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing34_CustomDeploymentPaaS');
puckConfig.components['Pricing34_CustomDeploymentPaaS'] = {
  label: 'Pricing34_ Custom Deployment Paa S',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing34_CustomDeploymentPaaS'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.pricing.components.push('Pricing35_AllFeaturesFullComparison');
puckConfig.components['Pricing35_AllFeaturesFullComparison'] = {
  label: 'Pricing35_ All Features Full Comparison',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PricingBlocks as any)['Pricing35_AllFeaturesFullComparison'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials01_ExecutiveHeadshots');
puckConfig.components['Testimonials01_ExecutiveHeadshots'] = {
  label: 'Testimonials01_ Executive Headshots',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials01_ExecutiveHeadshots'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials02_Quote3ColGrid');
puckConfig.components['Testimonials02_Quote3ColGrid'] = {
  label: 'Testimonials02_ Quote3 Col Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials02_Quote3ColGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials03_StarRatingCarousel');
puckConfig.components['Testimonials03_StarRatingCarousel'] = {
  label: 'Testimonials03_ Star Rating Carousel',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials03_StarRatingCarousel'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials04_CustomerMetricsHighlight');
puckConfig.components['Testimonials04_CustomerMetricsHighlight'] = {
  label: 'Testimonials04_ Customer Metrics Highlight',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials04_CustomerMetricsHighlight'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials05_DarkTestimonialBanner');
puckConfig.components['Testimonials05_DarkTestimonialBanner'] = {
  label: 'Testimonials05_ Dark Testimonial Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials05_DarkTestimonialBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials06_SplitMediaQuote');
puckConfig.components['Testimonials06_SplitMediaQuote'] = {
  label: 'Testimonials06_ Split Media Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials06_SplitMediaQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials07_LogoCloudReviews');
puckConfig.components['Testimonials07_LogoCloudReviews'] = {
  label: 'Testimonials07_ Logo Cloud Reviews',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials07_LogoCloudReviews'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials08_VideoTestimonialCards');
puckConfig.components['Testimonials08_VideoTestimonialCards'] = {
  label: 'Testimonials08_ Video Testimonial Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials08_VideoTestimonialCards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials09_MasonrySocialWall');
puckConfig.components['Testimonials09_MasonrySocialWall'] = {
  label: 'Testimonials09_ Masonry Social Wall',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials09_MasonrySocialWall'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials10_EnterpriseCaseStudyRow');
puckConfig.components['Testimonials10_EnterpriseCaseStudyRow'] = {
  label: 'Testimonials10_ Enterprise Case Study Row',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials10_EnterpriseCaseStudyRow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials11_SingleFeaturedHeroQuote');
puckConfig.components['Testimonials11_SingleFeaturedHeroQuote'] = {
  label: 'Testimonials11_ Single Featured Hero Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials11_SingleFeaturedHeroQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials12_AvatarTickerMarquee');
puckConfig.components['Testimonials12_AvatarTickerMarquee'] = {
  label: 'Testimonials12_ Avatar Ticker Marquee',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials12_AvatarTickerMarquee'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials13_IndustrySpecificTabs');
puckConfig.components['Testimonials13_IndustrySpecificTabs'] = {
  label: 'Testimonials13_ Industry Specific Tabs',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials13_IndustrySpecificTabs'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials14_FounderLetterStatement');
puckConfig.components['Testimonials14_FounderLetterStatement'] = {
  label: 'Testimonials14_ Founder Letter Statement',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials14_FounderLetterStatement'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials15_Compact2ColMinimal');
puckConfig.components['Testimonials15_Compact2ColMinimal'] = {
  label: 'Testimonials15_ Compact2 Col Minimal',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials15_Compact2ColMinimal'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials16_StatsPairedReview');
puckConfig.components['Testimonials16_StatsPairedReview'] = {
  label: 'Testimonials16_ Stats Paired Review',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials16_StatsPairedReview'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials17_TrustScoreHeader');
puckConfig.components['Testimonials17_TrustScoreHeader'] = {
  label: 'Testimonials17_ Trust Score Header',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials17_TrustScoreHeader'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials18_CustomerMapPinpoints');
puckConfig.components['Testimonials18_CustomerMapPinpoints'] = {
  label: 'Testimonials18_ Customer Map Pinpoints',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials18_CustomerMapPinpoints'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials19_DetailedTimelineReview');
puckConfig.components['Testimonials19_DetailedTimelineReview'] = {
  label: 'Testimonials19_ Detailed Timeline Review',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials19_DetailedTimelineReview'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials20_SecurityAuditorQuote');
puckConfig.components['Testimonials20_SecurityAuditorQuote'] = {
  label: 'Testimonials20_ Security Auditor Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials20_SecurityAuditorQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials21_CardSliderControls');
puckConfig.components['Testimonials21_CardSliderControls'] = {
  label: 'Testimonials21_ Card Slider Controls',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials21_CardSliderControls'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials22_SpeechBubbleCards');
puckConfig.components['Testimonials22_SpeechBubbleCards'] = {
  label: 'Testimonials22_ Speech Bubble Cards',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials22_SpeechBubbleCards'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials23_KycSuccessStory');
puckConfig.components['Testimonials23_KycSuccessStory'] = {
  label: 'Testimonials23_ Kyc Success Story',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials23_KycSuccessStory'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials24_B2CMerchantSpotlight');
puckConfig.components['Testimonials24_B2CMerchantSpotlight'] = {
  label: 'Testimonials24_ B2 C Merchant Spotlight',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials24_B2CMerchantSpotlight'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials25_CfoPerspectiveQuote');
puckConfig.components['Testimonials25_CfoPerspectiveQuote'] = {
  label: 'Testimonials25_ Cfo Perspective Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials25_CfoPerspectiveQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials26_DeveloperApiPraise');
puckConfig.components['Testimonials26_DeveloperApiPraise'] = {
  label: 'Testimonials26_ Developer Api Praise',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials26_DeveloperApiPraise'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials27_CustomerAwardShowcase');
puckConfig.components['Testimonials27_CustomerAwardShowcase'] = {
  label: 'Testimonials27_ Customer Award Showcase',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials27_CustomerAwardShowcase'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials28_BeforeAfterNarrative');
puckConfig.components['Testimonials28_BeforeAfterNarrative'] = {
  label: 'Testimonials28_ Before After Narrative',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials28_BeforeAfterNarrative'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials29_CommunityQuotesWall');
puckConfig.components['Testimonials29_CommunityQuotesWall'] = {
  label: 'Testimonials29_ Community Quotes Wall',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials29_CommunityQuotesWall'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.testimonials.components.push('Testimonials30_FinalCalloutQuote');
puckConfig.components['Testimonials30_FinalCalloutQuote'] = {
  label: 'Testimonials30_ Final Callout Quote',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (TestimonialsBlocks as any)['Testimonials30_FinalCalloutQuote'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs01_RadixAccordionSingle');
puckConfig.components['Faqs01_RadixAccordionSingle'] = {
  label: 'Faqs01_ Radix Accordion Single',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs01_RadixAccordionSingle'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs02_TwoColumnSearchable');
puckConfig.components['Faqs02_TwoColumnSearchable'] = {
  label: 'Faqs02_ Two Column Searchable',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs02_TwoColumnSearchable'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs03_SupportCalloutBanner');
puckConfig.components['Faqs03_SupportCalloutBanner'] = {
  label: 'Faqs03_ Support Callout Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs03_SupportCalloutBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs04_CategoryTabbedAccordion');
puckConfig.components['Faqs04_CategoryTabbedAccordion'] = {
  label: 'Faqs04_ Category Tabbed Accordion',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs04_CategoryTabbedAccordion'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs05_BorderedCardGrid');
puckConfig.components['Faqs05_BorderedCardGrid'] = {
  label: 'Faqs05_ Bordered Card Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs05_BorderedCardGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs06_AirwallexKycSpecific');
puckConfig.components['Faqs06_AirwallexKycSpecific'] = {
  label: 'Faqs06_ Airwallex Kyc Specific',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs06_AirwallexKycSpecific'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs07_PricingBillingDetails');
puckConfig.components['Faqs07_PricingBillingDetails'] = {
  label: 'Faqs07_ Pricing Billing Details',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs07_PricingBillingDetails'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs08_TechnicalIntegrationFaq');
puckConfig.components['Faqs08_TechnicalIntegrationFaq'] = {
  label: 'Faqs08_ Technical Integration Faq',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs08_TechnicalIntegrationFaq'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs09_DarkMinimalAccordion');
puckConfig.components['Faqs09_DarkMinimalAccordion'] = {
  label: 'Faqs09_ Dark Minimal Accordion',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs09_DarkMinimalAccordion'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs10_SplitSideHeading');
puckConfig.components['Faqs10_SplitSideHeading'] = {
  label: 'Faqs10_ Split Side Heading',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs10_SplitSideHeading'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs11_HelpCenterHeader');
puckConfig.components['Faqs11_HelpCenterHeader'] = {
  label: 'Faqs11_ Help Center Header',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs11_HelpCenterHeader'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs12_MultiColumnMinimal');
puckConfig.components['Faqs12_MultiColumnMinimal'] = {
  label: 'Faqs12_ Multi Column Minimal',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs12_MultiColumnMinimal'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs13_CardAccordionBordered');
puckConfig.components['Faqs13_CardAccordionBordered'] = {
  label: 'Faqs13_ Card Accordion Bordered',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs13_CardAccordionBordered'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs14_SlaUptimeQuestions');
puckConfig.components['Faqs14_SlaUptimeQuestions'] = {
  label: 'Faqs14_ Sla Uptime Questions',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs14_SlaUptimeQuestions'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs15_PhysicalShippingFaq');
puckConfig.components['Faqs15_PhysicalShippingFaq'] = {
  label: 'Faqs15_ Physical Shipping Faq',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs15_PhysicalShippingFaq'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs16_InteractiveFilterChips');
puckConfig.components['Faqs16_InteractiveFilterChips'] = {
  label: 'Faqs16_ Interactive Filter Chips',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs16_InteractiveFilterChips'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs17_ConsultationMeetingFaq');
puckConfig.components['Faqs17_ConsultationMeetingFaq'] = {
  label: 'Faqs17_ Consultation Meeting Faq',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs17_ConsultationMeetingFaq'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs18_ComplianceGdprFaq');
puckConfig.components['Faqs18_ComplianceGdprFaq'] = {
  label: 'Faqs18_ Compliance Gdpr Faq',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs18_ComplianceGdprFaq'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs19_PaymentGatewayMethods');
puckConfig.components['Faqs19_PaymentGatewayMethods'] = {
  label: 'Faqs19_ Payment Gateway Methods',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs19_PaymentGatewayMethods'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.faqs.components.push('Faqs20_FullWidthExpansionHero');
puckConfig.components['Faqs20_FullWidthExpansionHero'] = {
  label: 'Faqs20_ Full Width Expansion Hero',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FaqsBlocks as any)['Faqs20_FullWidthExpansionHero'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact01_TwoColWithMap');
puckConfig.components['Contact01_TwoColWithMap'] = {
  label: 'Contact01_ Two Col With Map',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact01_TwoColWithMap'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact02_FormspreeLeadRouter');
puckConfig.components['Contact02_FormspreeLeadRouter'] = {
  label: 'Contact02_ Formspree Lead Router',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact02_FormspreeLeadRouter'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact03_MeetingBookingWidget');
puckConfig.components['Contact03_MeetingBookingWidget'] = {
  label: 'Contact03_ Meeting Booking Widget',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact03_MeetingBookingWidget'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact04_SplitCardOfficeHours');
puckConfig.components['Contact04_SplitCardOfficeHours'] = {
  label: 'Contact04_ Split Card Office Hours',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact04_SplitCardOfficeHours'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact05_DarkContrastForm');
puckConfig.components['Contact05_DarkContrastForm'] = {
  label: 'Contact05_ Dark Contrast Form',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact05_DarkContrastForm'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact06_FloatingChatTrigger');
puckConfig.components['Contact06_FloatingChatTrigger'] = {
  label: 'Contact06_ Floating Chat Trigger',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact06_FloatingChatTrigger'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact07_DirectDepartmentRouting');
puckConfig.components['Contact07_DirectDepartmentRouting'] = {
  label: 'Contact07_ Direct Department Routing',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact07_DirectDepartmentRouting'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact08_MinimalistCleanInputs');
puckConfig.components['Contact08_MinimalistCleanInputs'] = {
  label: 'Contact08_ Minimalist Clean Inputs',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact08_MinimalistCleanInputs'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact09_PhonePriorityHotline');
puckConfig.components['Contact09_PhonePriorityHotline'] = {
  label: 'Contact09_ Phone Priority Hotline',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact09_PhonePriorityHotline'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact10_SecurityVulnerabilityDesk');
puckConfig.components['Contact10_SecurityVulnerabilityDesk'] = {
  label: 'Contact10_ Security Vulnerability Desk',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact10_SecurityVulnerabilityDesk'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact11_RfqQuoteConfigurator');
puckConfig.components['Contact11_RfqQuoteConfigurator'] = {
  label: 'Contact11_ Rfq Quote Configurator',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact11_RfqQuoteConfigurator'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact12_AirwallexKycSupportDesk');
puckConfig.components['Contact12_AirwallexKycSupportDesk'] = {
  label: 'Contact12_ Airwallex Kyc Support Desk',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact12_AirwallexKycSupportDesk'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact13_SalesDemoScheduler');
puckConfig.components['Contact13_SalesDemoScheduler'] = {
  label: 'Contact13_ Sales Demo Scheduler',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact13_SalesDemoScheduler'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact14_SocialChannelGrid');
puckConfig.components['Contact14_SocialChannelGrid'] = {
  label: 'Contact14_ Social Channel Grid',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact14_SocialChannelGrid'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact15_EmergencyIncidentEscalation');
puckConfig.components['Contact15_EmergencyIncidentEscalation'] = {
  label: 'Contact15_ Emergency Incident Escalation',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact15_EmergencyIncidentEscalation'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact16_WholesaleB2BInquiry');
puckConfig.components['Contact16_WholesaleB2BInquiry'] = {
  label: 'Contact16_ Wholesale B2 B Inquiry',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact16_WholesaleB2BInquiry'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact17_PressAndMediaRelations');
puckConfig.components['Contact17_PressAndMediaRelations'] = {
  label: 'Contact17_ Press And Media Relations',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact17_PressAndMediaRelations'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact18_PhysicalHQVisitorGuide');
puckConfig.components['Contact18_PhysicalHQVisitorGuide'] = {
  label: 'Contact18_ Physical H Q Visitor Guide',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact18_PhysicalHQVisitorGuide'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact19_FeedbackSurveyForm');
puckConfig.components['Contact19_FeedbackSurveyForm'] = {
  label: 'Contact19_ Feedback Survey Form',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact19_FeedbackSurveyForm'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact20_InvestorRelationsDesk');
puckConfig.components['Contact20_InvestorRelationsDesk'] = {
  label: 'Contact20_ Investor Relations Desk',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact20_InvestorRelationsDesk'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact21_RecruitmentTalentForm');
puckConfig.components['Contact21_RecruitmentTalentForm'] = {
  label: 'Contact21_ Recruitment Talent Form',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact21_RecruitmentTalentForm'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact22_VendorProcurementPortal');
puckConfig.components['Contact22_VendorProcurementPortal'] = {
  label: 'Contact22_ Vendor Procurement Portal',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact22_VendorProcurementPortal'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact23_BespokePartnershipProposal');
puckConfig.components['Contact23_BespokePartnershipProposal'] = {
  label: 'Contact23_ Bespoke Partnership Proposal',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact23_BespokePartnershipProposal'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact24_MultiLocationDirectory');
puckConfig.components['Contact24_MultiLocationDirectory'] = {
  label: 'Contact24_ Multi Location Directory',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact24_MultiLocationDirectory'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.contact.components.push('Contact25_DirectWhatsappButtonHero');
puckConfig.components['Contact25_DirectWhatsappButtonHero'] = {
  label: 'Contact25_ Direct Whatsapp Button Hero',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (ContactBlocks as any)['Contact25_DirectWhatsappButtonHero'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers01_ComplianceFinePrintBar');
puckConfig.components['Footers01_ComplianceFinePrintBar'] = {
  label: 'Footers01_ Compliance Fine Print Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers01_ComplianceFinePrintBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers02_CardSchemeBadges');
puckConfig.components['Footers02_CardSchemeBadges'] = {
  label: 'Footers02_ Card Scheme Badges',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers02_CardSchemeBadges'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers03_FourColumnEnterprise');
puckConfig.components['Footers03_FourColumnEnterprise'] = {
  label: 'Footers03_ Four Column Enterprise',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers03_FourColumnEnterprise'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers04_DarkHighContrast');
puckConfig.components['Footers04_DarkHighContrast'] = {
  label: 'Footers04_ Dark High Contrast',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers04_DarkHighContrast'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers05_AirwallexPartnerBadge');
puckConfig.components['Footers05_AirwallexPartnerBadge'] = {
  label: 'Footers05_ Airwallex Partner Badge',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers05_AirwallexPartnerBadge'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers06_LegalDisclaimersExpanded');
puckConfig.components['Footers06_LegalDisclaimersExpanded'] = {
  label: 'Footers06_ Legal Disclaimers Expanded',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers06_LegalDisclaimersExpanded'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers07_CentredMinimalist');
puckConfig.components['Footers07_CentredMinimalist'] = {
  label: 'Footers07_ Centred Minimalist',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers07_CentredMinimalist'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers08_NewsletterEmbedded');
puckConfig.components['Footers08_NewsletterEmbedded'] = {
  label: 'Footers08_ Newsletter Embedded',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers08_NewsletterEmbedded'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers09_MultiLanguageCurrency');
puckConfig.components['Footers09_MultiLanguageCurrency'] = {
  label: 'Footers09_ Multi Language Currency',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers09_MultiLanguageCurrency'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers10_SecurityBadgesRow');
puckConfig.components['Footers10_SecurityBadgesRow'] = {
  label: 'Footers10_ Security Badges Row',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers10_SecurityBadgesRow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers11_SplitNewsletterDirectory');
puckConfig.components['Footers11_SplitNewsletterDirectory'] = {
  label: 'Footers11_ Split Newsletter Directory',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers11_SplitNewsletterDirectory'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers12_SocialMediaBar');
puckConfig.components['Footers12_SocialMediaBar'] = {
  label: 'Footers12_ Social Media Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers12_SocialMediaBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers13_StatusPageIndicator');
puckConfig.components['Footers13_StatusPageIndicator'] = {
  label: 'Footers13_ Status Page Indicator',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers13_StatusPageIndicator'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers14_EcommercePolicyFocused');
puckConfig.components['Footers14_EcommercePolicyFocused'] = {
  label: 'Footers14_ Ecommerce Policy Focused',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers14_EcommercePolicyFocused'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers15_SaaSAppCompact');
puckConfig.components['Footers15_SaaSAppCompact'] = {
  label: 'Footers15_ Saa S App Compact',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers15_SaaSAppCompact'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers16_OfficeLocationsRow');
puckConfig.components['Footers16_OfficeLocationsRow'] = {
  label: 'Footers16_ Office Locations Row',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers16_OfficeLocationsRow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers17_MegaFooterSitemap');
puckConfig.components['Footers17_MegaFooterSitemap'] = {
  label: 'Footers17_ Mega Footer Sitemap',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers17_MegaFooterSitemap'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers18_BackToTopFloating');
puckConfig.components['Footers18_BackToTopFloating'] = {
  label: 'Footers18_ Back To Top Floating',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers18_BackToTopFloating'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers19_WhitelabelCleanBar');
puckConfig.components['Footers19_WhitelabelCleanBar'] = {
  label: 'Footers19_ Whitelabel Clean Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers19_WhitelabelCleanBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers20_TrustSealRow');
puckConfig.components['Footers20_TrustSealRow'] = {
  label: 'Footers20_ Trust Seal Row',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers20_TrustSealRow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers21_SimpleCopyrightOnly');
puckConfig.components['Footers21_SimpleCopyrightOnly'] = {
  label: 'Footers21_ Simple Copyright Only',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers21_SimpleCopyrightOnly'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers22_AppDownloadButtons');
puckConfig.components['Footers22_AppDownloadButtons'] = {
  label: 'Footers22_ App Download Buttons',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers22_AppDownloadButtons'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers23_CookiePreferencesBar');
puckConfig.components['Footers23_CookiePreferencesBar'] = {
  label: 'Footers23_ Cookie Preferences Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers23_CookiePreferencesBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers24_DualTierStatutory');
puckConfig.components['Footers24_DualTierStatutory'] = {
  label: 'Footers24_ Dual Tier Statutory',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers24_DualTierStatutory'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.footers.components.push('Footers25_ModernGlassmorphic');
puckConfig.components['Footers25_ModernGlassmorphic'] = {
  label: 'Footers25_ Modern Glassmorphic',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (FootersBlocks as any)['Footers25_ModernGlassmorphic'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies01_SowTermsOfService');
puckConfig.components['Policies01_SowTermsOfService'] = {
  label: 'Policies01_ Sow Terms Of Service',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies01_SowTermsOfService'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies02_PhysicalRmaReturns');
puckConfig.components['Policies02_PhysicalRmaReturns'] = {
  label: 'Policies02_ Physical Rma Returns',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies02_PhysicalRmaReturns'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies03_SaaSCommercialSla');
puckConfig.components['Policies03_SaaSCommercialSla'] = {
  label: 'Policies03_ Saa S Commercial Sla',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies03_SaaSCommercialSla'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies04_GdprPrivacyFramework');
puckConfig.components['Policies04_GdprPrivacyFramework'] = {
  label: 'Policies04_ Gdpr Privacy Framework',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies04_GdprPrivacyFramework'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies05_AirwallexMerchantTerms');
puckConfig.components['Policies05_AirwallexMerchantTerms'] = {
  label: 'Policies05_ Airwallex Merchant Terms',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies05_AirwallexMerchantTerms'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies06_AcceptableUsePolicy');
puckConfig.components['Policies06_AcceptableUsePolicy'] = {
  label: 'Policies06_ Acceptable Use Policy',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies06_AcceptableUsePolicy'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies07_SecurityVulnerabilityPolicy');
puckConfig.components['Policies07_SecurityVulnerabilityPolicy'] = {
  label: 'Policies07_ Security Vulnerability Policy',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies07_SecurityVulnerabilityPolicy'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies08_ShippingFreightPolicy');
puckConfig.components['Policies08_ShippingFreightPolicy'] = {
  label: 'Policies08_ Shipping Freight Policy',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies08_ShippingFreightPolicy'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies09_CookiePolicyAndTracking');
puckConfig.components['Policies09_CookiePolicyAndTracking'] = {
  label: 'Policies09_ Cookie Policy And Tracking',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies09_CookiePolicyAndTracking'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies10_IntellectualPropertyCopyright');
puckConfig.components['Policies10_IntellectualPropertyCopyright'] = {
  label: 'Policies10_ Intellectual Property Copyright',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies10_IntellectualPropertyCopyright'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies11_AntiMoneyLaunderingAml');
puckConfig.components['Policies11_AntiMoneyLaunderingAml'] = {
  label: 'Policies11_ Anti Money Laundering Aml',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies11_AntiMoneyLaunderingAml'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies12_SubprocessorsList');
puckConfig.components['Policies12_SubprocessorsList'] = {
  label: 'Policies12_ Subprocessors List',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies12_SubprocessorsList'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies13_DisputeResolutionEscrow');
puckConfig.components['Policies13_DisputeResolutionEscrow'] = {
  label: 'Policies13_ Dispute Resolution Escrow',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies13_DisputeResolutionEscrow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies14_ConsumerWarrantyNotice');
puckConfig.components['Policies14_ConsumerWarrantyNotice'] = {
  label: 'Policies14_ Consumer Warranty Notice',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies14_ConsumerWarrantyNotice'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.policies.components.push('Policies15_MasterServiceAgreement');
puckConfig.components['Policies15_MasterServiceAgreement'] = {
  label: 'Policies15_ Master Service Agreement',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (PoliciesBlocks as any)['Policies15_MasterServiceAgreement'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas01_DarkModeBanner');
puckConfig.components['Ctas01_DarkModeBanner'] = {
  label: 'Ctas01_ Dark Mode Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas01_DarkModeBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas02_NewsletterSubscription');
puckConfig.components['Ctas02_NewsletterSubscription'] = {
  label: 'Ctas02_ Newsletter Subscription',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas02_NewsletterSubscription'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas03_ConsultationTrigger');
puckConfig.components['Ctas03_ConsultationTrigger'] = {
  label: 'Ctas03_ Consultation Trigger',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas03_ConsultationTrigger'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas04_FreeTrialInstantAccess');
puckConfig.components['Ctas04_FreeTrialInstantAccess'] = {
  label: 'Ctas04_ Free Trial Instant Access',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas04_FreeTrialInstantAccess'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas05_SplitCardWithMetrics');
puckConfig.components['Ctas05_SplitCardWithMetrics'] = {
  label: 'Ctas05_ Split Card With Metrics',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas05_SplitCardWithMetrics'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas06_AccentGradientHero');
puckConfig.components['Ctas06_AccentGradientHero'] = {
  label: 'Ctas06_ Accent Gradient Hero',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas06_AccentGradientHero'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas07_AirwallexKycFastTrack');
puckConfig.components['Ctas07_AirwallexKycFastTrack'] = {
  label: 'Ctas07_ Airwallex Kyc Fast Track',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas07_AirwallexKycFastTrack'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas08_TwoTierActionChoice');
puckConfig.components['Ctas08_TwoTierActionChoice'] = {
  label: 'Ctas08_ Two Tier Action Choice',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas08_TwoTierActionChoice'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas09_MinimalistInlineBar');
puckConfig.components['Ctas09_MinimalistInlineBar'] = {
  label: 'Ctas09_ Minimalist Inline Bar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas09_MinimalistInlineBar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas10_AppStoreMobilePrompt');
puckConfig.components['Ctas10_AppStoreMobilePrompt'] = {
  label: 'Ctas10_ App Store Mobile Prompt',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas10_AppStoreMobilePrompt'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas11_EnterpriseRfqBanner');
puckConfig.components['Ctas11_EnterpriseRfqBanner'] = {
  label: 'Ctas11_ Enterprise Rfq Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas11_EnterpriseRfqBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas12_InteractiveEstimatorCta');
puckConfig.components['Ctas12_InteractiveEstimatorCta'] = {
  label: 'Ctas12_ Interactive Estimator Cta',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas12_InteractiveEstimatorCta'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas13_CardOverlapElevated');
puckConfig.components['Ctas13_CardOverlapElevated'] = {
  label: 'Ctas13_ Card Overlap Elevated',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas13_CardOverlapElevated'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas14_DeveloperApiDocumentation');
puckConfig.components['Ctas14_DeveloperApiDocumentation'] = {
  label: 'Ctas14_ Developer Api Documentation',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas14_DeveloperApiDocumentation'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas15_UrgentLimitedWindow');
puckConfig.components['Ctas15_UrgentLimitedWindow'] = {
  label: 'Ctas15_ Urgent Limited Window',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas15_UrgentLimitedWindow'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas16_ContactSalesSplitCard');
puckConfig.components['Ctas16_ContactSalesSplitCard'] = {
  label: 'Ctas16_ Contact Sales Split Card',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas16_ContactSalesSplitCard'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas17_CommunityDiscordJoin');
puckConfig.components['Ctas17_CommunityDiscordJoin'] = {
  label: 'Ctas17_ Community Discord Join',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas17_CommunityDiscordJoin'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas18_WholesaleVolumeInquiry');
puckConfig.components['Ctas18_WholesaleVolumeInquiry'] = {
  label: 'Ctas18_ Wholesale Volume Inquiry',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas18_WholesaleVolumeInquiry'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas19_GuaranteedMoneyBack');
puckConfig.components['Ctas19_GuaranteedMoneyBack'] = {
  label: 'Ctas19_ Guaranteed Money Back',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas19_GuaranteedMoneyBack'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas20_WhiteLabelResellerTrigger');
puckConfig.components['Ctas20_WhiteLabelResellerTrigger'] = {
  label: 'Ctas20_ White Label Reseller Trigger',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas20_WhiteLabelResellerTrigger'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas21_SecurityAuditReportDownload');
puckConfig.components['Ctas21_SecurityAuditReportDownload'] = {
  label: 'Ctas21_ Security Audit Report Download',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas21_SecurityAuditReportDownload'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas22_ZeroDowntimeMigration');
puckConfig.components['Ctas22_ZeroDowntimeMigration'] = {
  label: 'Ctas22_ Zero Downtime Migration',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas22_ZeroDowntimeMigration'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas23_VideoProductTourPrompt');
puckConfig.components['Ctas23_VideoProductTourPrompt'] = {
  label: 'Ctas23_ Video Product Tour Prompt',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas23_VideoProductTourPrompt'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas24_InvestorPitchDeckRequest');
puckConfig.components['Ctas24_InvestorPitchDeckRequest'] = {
  label: 'Ctas24_ Investor Pitch Deck Request',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas24_InvestorPitchDeckRequest'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas25_MultiLocationGlobalCta');
puckConfig.components['Ctas25_MultiLocationGlobalCta'] = {
  label: 'Ctas25_ Multi Location Global Cta',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas25_MultiLocationGlobalCta'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas26_PhysicalTerminalOrdering');
puckConfig.components['Ctas26_PhysicalTerminalOrdering'] = {
  label: 'Ctas26_ Physical Terminal Ordering',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas26_PhysicalTerminalOrdering'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas27_AnnualDiscountBanner');
puckConfig.components['Ctas27_AnnualDiscountBanner'] = {
  label: 'Ctas27_ Annual Discount Banner',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas27_AnnualDiscountBanner'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas28_ExecutivePodcastWebinar');
puckConfig.components['Ctas28_ExecutivePodcastWebinar'] = {
  label: 'Ctas28_ Executive Podcast Webinar',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas28_ExecutivePodcastWebinar'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas29_CustomerLoyaltyPerks');
puckConfig.components['Ctas29_CustomerLoyaltyPerks'] = {
  label: 'Ctas29_ Customer Loyalty Perks',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas29_CustomerLoyaltyPerks'];
    return Comp ? <Comp {...props} /> : null;
  },
};

puckConfig.categories.ctas.components.push('Ctas30_FinalClosingCallToAction');
puckConfig.components['Ctas30_FinalClosingCallToAction'] = {
  label: 'Ctas30_ Final Closing Call To Action',
  fields: {
    badge: { type: 'text' },
    headline: { type: 'text' },
    description: { type: 'textarea' },
  },
  render: (props: any) => {
    const Comp = (CtasBlocks as any)['Ctas30_FinalClosingCallToAction'];
    return Comp ? <Comp {...props} /> : null;
  },
};

export default puckConfig;
