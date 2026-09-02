import React from 'react';

// Untitled UI Block Registry Index (350 Section Components: Part 1 + Part 2)

export * from './types';
export * from './headers';
export * from './heros';
export * from './logos';
export * from './bentos';

// Part 2 Section Blocks (200 Components)
export * from './stats';
export * from './pricing';
export * from './testimonials';
export * from './faqs';
export * from './contact';
export * from './footers';
export * from './policies';
export * from './ctas';

import type { BlockMeta, PuckConfig } from './types';
// Import Part 2 blocks for Puck registration
import * as StatsBlocks from './stats';
import * as PricingBlocks from './pricing';
import * as TestimonialsBlocks from './testimonials';
import * as FaqsBlocks from './faqs';
import * as ContactBlocks from './contact';
import * as FootersBlocks from './footers';
import * as PoliciesBlocks from './policies';
import * as CtasBlocks from './ctas';


// Import all configs for Puck configuration map
import {
  HeaderStickyBlurDefaultConfig,
  HeaderStickyBlurBorderedConfig,
  HeaderStickyBlurDarkConfig,
  HeaderStickyBlurFloatingConfig,
  HeaderStickyBlurMinimalConfig,
  HeaderMegaMenuSolutionsConfig,
  HeaderMegaMenuDeveloperConfig,
  HeaderMegaMenuFintechConfig,
  HeaderMegaMenuEnterpriseConfig,
  HeaderMegaMenuTwoColumnConfig,
  HeaderEcomCartDefaultConfig,
  HeaderEcomCartSearchConfig,
  HeaderEcomCartPromoBarConfig,
  HeaderEcomCartCompactConfig,
  HeaderEcomCartLuxuryConfig,
  HeaderMonogramClassicConfig,
  HeaderMonogramModernConfig,
  HeaderMonogramBoldConfig,
  HeaderMonogramAgencyConfig,
  HeaderSplitLinksBalancedConfig,
  HeaderSplitLinksWideConfig,
  HeaderSplitLinksActionConfig,
  HeaderCenteredStackConfig,
  HeaderCenteredCleanConfig,
  HeaderCenteredEditorialConfig,
} from './headers';

import {
  HeroSplitDefaultConfig,
  HeroSplitReverseConfig,
  HeroSplitFormConfig,
  HeroSplitCardsConfig,
  HeroSplitStatsConfig,
  HeroSplitTerminalConfig,
  HeroSplitCheckoutConfig,
  HeroSplitGradientConfig,
  HeroCenteredBadgeDefaultConfig,
  HeroCenteredBadgeGlowConfig,
  HeroCenteredBadgeMinimalConfig,
  HeroCenteredBadgeRatingsConfig,
  HeroCenteredBadgeDualCtaConfig,
  HeroCenteredBadgeSearchConfig,
  HeroCenteredBadgeLaunchConfig,
  HeroAppMockupBrowserConfig,
  HeroAppMockupDashboardConfig,
  HeroAppMockupDarkStudioConfig,
  HeroAppMockupFloatingCardsConfig,
  HeroAppMockupIsometricConfig,
  HeroAppMockupGlassConfig,
  HeroAppMockupInteractiveConfig,
  HeroVideoBackdropCinematicConfig,
  HeroVideoBackdropModalConfig,
  HeroVideoBackdropSplitConfig,
  HeroVideoBackdropMinimalConfig,
  HeroVideoBackdropProductConfig,
  HeroVideoBackdropTestimonialConfig,
  HeroMultiDeviceDesktopMobileConfig,
  HeroMultiDeviceTrioConfig,
  HeroMultiDeviceFloatingConfig,
  HeroMultiDeviceTabletFocusConfig,
  HeroMultiDeviceResponsiveConfig,
  HeroMultiDeviceCardGridConfig,
  HeroBentoAsymmetricConfig,
  HeroBentoInteractiveConfig,
  HeroBentoFintechConfig,
  HeroBentoSaaSConfig,
  HeroBentoDarkGridConfig,
  HeroBentoMinimalConfig,
  HeroMinimalEditorialConfig,
  HeroMinimalSansConfig,
  HeroMinimalStatementConfig,
  HeroMinimalBadgeOnlyConfig,
  HeroMinimalSplitTextConfig,
} from './heros';

import {
  LogoGridMonochrome5Config,
  LogoGridMonochrome6Config,
  LogoGridMonochromeCardsConfig,
  LogoGridMonochromeSplitConfig,
  LogoGridMonochromeStatsConfig,
  LogoMarqueeTickerDefaultConfig,
  LogoMarqueeTickerDualConfig,
  LogoMarqueeTickerCardsConfig,
  LogoMarqueeTickerDarkConfig,
  LogoMarqueeTickerQuotesConfig,
  LogoInvestorBadgesTopTierConfig,
  LogoInvestorBadgesFundingConfig,
  LogoInvestorBadgesAngelRowConfig,
  LogoInvestorBadgesCardsConfig,
  LogoInvestorBadgesMinimalConfig,
  LogoTrustRatingPillG2Config,
  LogoTrustRatingPillTrustpilotConfig,
  LogoTrustRatingPillSecurityConfig,
  LogoTrustRatingPillAvatarsConfig,
  LogoTrustRatingPillCombinedConfig,
} from './logos';

import {
  BentoAsymLargeLeftConfig,
  BentoAsymLargeRightConfig,
  BentoAsymSplitDiagonalConfig,
  BentoAsymStatHighlightConfig,
  BentoAsymCardOverhangConfig,
  BentoAsymFintechFlowConfig,
  BentoAsymDeveloperSplitConfig,
  BentoAsymSecurityVaultConfig,
  BentoAsymAnalyticsSplitConfig,
  BentoAsymTeamCollabConfig,
  BentoAsymSpeedLatencyConfig,
  BentoAsymEcomInventoryConfig,
  BentoAsymAutomationRulesConfig,
  BentoAsymInvoiceEngineConfig,
  BentoAsymComplianceShieldConfig,
  Bento3x3ClassicConfig,
  Bento3x3CenterHighlightConfig,
  Bento3x3TopSpanConfig,
  Bento3x3BottomSpanConfig,
  Bento3x3MosaicConfig,
  Bento3x3DarkCyberConfig,
  Bento3x3MetricsGridConfig,
  Bento3x3IntegrationsConfig,
  Bento3x3SecurityStackConfig,
  Bento3x3EcommerceToolsConfig,
  Bento3x3AIAssistantConfig,
  Bento3x3DevExperienceConfig,
  Bento3x3GlobalReachConfig,
  Bento3x3CustomerCareConfig,
  Bento3x3MinimalMonoConfig,
  BentoTabsSolutionsConfig,
  BentoTabsDevelopersConfig,
  BentoTabsIndustriesConfig,
  BentoTabsLifecycleConfig,
  BentoTabsArchitectureConfig,
  BentoTabsComplianceConfig,
  BentoTabsPaymentMethodsConfig,
  BentoTabsPricingTiersConfig,
  BentoTabsDataAnalyticsConfig,
  BentoTabsAutomationTemplatesConfig,
  BentoMetricProcessingVolumeConfig,
  BentoMetricUptimeSLAConfig,
  BentoMetricGlobalCountriesConfig,
  BentoMetricCustomerGrowthConfig,
  BentoMetricCostSavingsConfig,
  BentoMetricSubMillisecondConfig,
  BentoMetricFraudPreventionConfig,
  BentoMetricDeveloperAdoptionConfig,
  BentoMetricCarbonNeutralConfig,
  BentoMetricROIExecutiveConfig,
  BentoCodeRestAPIConfig,
  BentoCodeWebhooksConfig,
  BentoCodeReactComponentConfig,
  BentoCodeGraphQLQueryConfig,
  BentoCodePythonDataConfig,
  BentoCodeMobileSwiftConfig,
  BentoCodeGoMicroserviceConfig,
  BentoCodeDockerComposeConfig,
  BentoCodeSQLReconciliationConfig,
  BentoCodeAuthTokensConfig,
} from './bentos';

export const ALL_BLOCK_METAS: BlockMeta[] = [
  { id: 'Stats01_Simple4Col', name: 'Stats01_ Simple4 Col', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats01_ Simple4 Col' },
  { id: 'Stats02_BorderedPills', name: 'Stats02_ Bordered Pills', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats02_ Bordered Pills' },
  { id: 'Stats03_AccentBackground', name: 'Stats03_ Accent Background', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats03_ Accent Background' },
  { id: 'Stats04_TimelineGrowth', name: 'Stats04_ Timeline Growth', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats04_ Timeline Growth' },
  { id: 'Stats05_CardGridWithIcons', name: 'Stats05_ Card Grid With Icons', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats05_ Card Grid With Icons' },
  { id: 'Stats06_SplitWithHeading', name: 'Stats06_ Split With Heading', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats06_ Split With Heading' },
  { id: 'Stats07_DarkMinimalist', name: 'Stats07_ Dark Minimalist', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats07_ Dark Minimalist' },
  { id: 'Stats08_ComparisonMetrics', name: 'Stats08_ Comparison Metrics', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats08_ Comparison Metrics' },
  { id: 'Stats09_FloatingCardOverlap', name: 'Stats09_ Floating Card Overlap', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats09_ Floating Card Overlap' },
  { id: 'Stats10_GradientBorderCards', name: 'Stats10_ Gradient Border Cards', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats10_ Gradient Border Cards' },
  { id: 'Stats11_KpiDeltaIndicators', name: 'Stats11_ Kpi Delta Indicators', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats11_ Kpi Delta Indicators' },
  { id: 'Stats12_GlobalFootprint', name: 'Stats12_ Global Footprint', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats12_ Global Footprint' },
  { id: 'Stats13_CustomerTrustBar', name: 'Stats13_ Customer Trust Bar', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats13_ Customer Trust Bar' },
  { id: 'Stats14_StackedDividerGrid', name: 'Stats14_ Stacked Divider Grid', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats14_ Stacked Divider Grid' },
  { id: 'Stats15_GlassmorphicTiles', name: 'Stats15_ Glassmorphic Tiles', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats15_ Glassmorphic Tiles' },
  { id: 'Stats16_AirwallexKycStats', name: 'Stats16_ Airwallex Kyc Stats', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats16_ Airwallex Kyc Stats' },
  { id: 'Stats17_CircularProgressStats', name: 'Stats17_ Circular Progress Stats', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats17_ Circular Progress Stats' },
  { id: 'Stats18_InteractiveTabsStats', name: 'Stats18_ Interactive Tabs Stats', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats18_ Interactive Tabs Stats' },
  { id: 'Stats19_MarqueeTicker', name: 'Stats19_ Marquee Ticker', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats19_ Marquee Ticker' },
  { id: 'Stats20_BannerWithCTA', name: 'Stats20_ Banner With C T A', category: 'stats' as any, subcategory: 'stats', description: 'Untitled UI stats section component: Stats20_ Banner With C T A' },
  { id: 'Pricing01_TieredSaaS3Cards', name: 'Pricing01_ Tiered Saa S3 Cards', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing01_ Tiered Saa S3 Cards' },
  { id: 'Pricing02_MonthlyAnnualSwitch', name: 'Pricing02_ Monthly Annual Switch', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing02_ Monthly Annual Switch' },
  { id: 'Pricing03_PhysicalB2CGrid', name: 'Pricing03_ Physical B2 C Grid', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing03_ Physical B2 C Grid' },
  { id: 'Pricing04_SowRetainerTable', name: 'Pricing04_ Sow Retainer Table', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing04_ Sow Retainer Table' },
  { id: 'Pricing05_EnterpriseFeatureMatrix', name: 'Pricing05_ Enterprise Feature Matrix', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing05_ Enterprise Feature Matrix' },
  { id: 'Pricing06_UsageBasedSlider', name: 'Pricing06_ Usage Based Slider', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing06_ Usage Based Slider' },
  { id: 'Pricing07_HorizontalSingleCard', name: 'Pricing07_ Horizontal Single Card', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing07_ Horizontal Single Card' },
  { id: 'Pricing08_FourTierCorporate', name: 'Pricing08_ Four Tier Corporate', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing08_ Four Tier Corporate' },
  { id: 'Pricing09_DarkGlowSpotlight', name: 'Pricing09_ Dark Glow Spotlight', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing09_ Dark Glow Spotlight' },
  { id: 'Pricing10_EcommerceBundleCards', name: 'Pricing10_ Ecommerce Bundle Cards', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing10_ Ecommerce Bundle Cards' },
  { id: 'Pricing11_PayAsYouGoMeter', name: 'Pricing11_ Pay As You Go Meter', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing11_ Pay As You Go Meter' },
  { id: 'Pricing12_StartupDiscountTier', name: 'Pricing12_ Startup Discount Tier', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing12_ Startup Discount Tier' },
  { id: 'Pricing13_HighTicketRetainer', name: 'Pricing13_ High Ticket Retainer', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing13_ High Ticket Retainer' },
  { id: 'Pricing14_AddonAdditives', name: 'Pricing14_ Addon Additives', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing14_ Addon Additives' },
  { id: 'Pricing15_FreeTrialBanner', name: 'Pricing15_ Free Trial Banner', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing15_ Free Trial Banner' },
  { id: 'Pricing16_MultiCurrencyTable', name: 'Pricing16_ Multi Currency Table', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing16_ Multi Currency Table' },
  { id: 'Pricing17_LifetimeLicenseCard', name: 'Pricing17_ Lifetime License Card', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing17_ Lifetime License Card' },
  { id: 'Pricing18_PerSeatCollaborative', name: 'Pricing18_ Per Seat Collaborative', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing18_ Per Seat Collaborative' },
  { id: 'Pricing19_CardSchemeAcquiring', name: 'Pricing19_ Card Scheme Acquiring', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing19_ Card Scheme Acquiring' },
  { id: 'Pricing20_HardwareLeasingGrid', name: 'Pricing20_ Hardware Leasing Grid', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing20_ Hardware Leasing Grid' },
  { id: 'Pricing21_DeveloperAPITiers', name: 'Pricing21_ Developer A P I Tiers', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing21_ Developer A P I Tiers' },
  { id: 'Pricing22_VolumeDiscountTier', name: 'Pricing22_ Volume Discount Tier', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing22_ Volume Discount Tier' },
  { id: 'Pricing23_DedicatedSLAContract', name: 'Pricing23_ Dedicated S L A Contract', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing23_ Dedicated S L A Contract' },
  { id: 'Pricing24_CryptoFiatGateway', name: 'Pricing24_ Crypto Fiat Gateway', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing24_ Crypto Fiat Gateway' },
  { id: 'Pricing25_BespokeEnterpriseQuote', name: 'Pricing25_ Bespoke Enterprise Quote', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing25_ Bespoke Enterprise Quote' },
  { id: 'Pricing26_SeasonalPromotionCard', name: 'Pricing26_ Seasonal Promotion Card', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing26_ Seasonal Promotion Card' },
  { id: 'Pricing27_WhiteLabelPlatform', name: 'Pricing27_ White Label Platform', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing27_ White Label Platform' },
  { id: 'Pricing28_AgencyPartnerTier', name: 'Pricing28_ Agency Partner Tier', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing28_ Agency Partner Tier' },
  { id: 'Pricing29_MarketplaceSplitTier', name: 'Pricing29_ Marketplace Split Tier', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing29_ Marketplace Split Tier' },
  { id: 'Pricing30_CorporateTreasury', name: 'Pricing30_ Corporate Treasury', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing30_ Corporate Treasury' },
  { id: 'Pricing31_InstantPayoutCards', name: 'Pricing31_ Instant Payout Cards', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing31_ Instant Payout Cards' },
  { id: 'Pricing32_ComplianceShieldTier', name: 'Pricing32_ Compliance Shield Tier', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing32_ Compliance Shield Tier' },
  { id: 'Pricing33_OpenBankingA2A', name: 'Pricing33_ Open Banking A2 A', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing33_ Open Banking A2 A' },
  { id: 'Pricing34_CustomDeploymentPaaS', name: 'Pricing34_ Custom Deployment Paa S', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing34_ Custom Deployment Paa S' },
  { id: 'Pricing35_AllFeaturesFullComparison', name: 'Pricing35_ All Features Full Comparison', category: 'pricing' as any, subcategory: 'pricing', description: 'Untitled UI pricing section component: Pricing35_ All Features Full Comparison' },
  { id: 'Testimonials01_ExecutiveHeadshots', name: 'Testimonials01_ Executive Headshots', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials01_ Executive Headshots' },
  { id: 'Testimonials02_Quote3ColGrid', name: 'Testimonials02_ Quote3 Col Grid', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials02_ Quote3 Col Grid' },
  { id: 'Testimonials03_StarRatingCarousel', name: 'Testimonials03_ Star Rating Carousel', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials03_ Star Rating Carousel' },
  { id: 'Testimonials04_CustomerMetricsHighlight', name: 'Testimonials04_ Customer Metrics Highlight', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials04_ Customer Metrics Highlight' },
  { id: 'Testimonials05_DarkTestimonialBanner', name: 'Testimonials05_ Dark Testimonial Banner', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials05_ Dark Testimonial Banner' },
  { id: 'Testimonials06_SplitMediaQuote', name: 'Testimonials06_ Split Media Quote', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials06_ Split Media Quote' },
  { id: 'Testimonials07_LogoCloudReviews', name: 'Testimonials07_ Logo Cloud Reviews', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials07_ Logo Cloud Reviews' },
  { id: 'Testimonials08_VideoTestimonialCards', name: 'Testimonials08_ Video Testimonial Cards', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials08_ Video Testimonial Cards' },
  { id: 'Testimonials09_MasonrySocialWall', name: 'Testimonials09_ Masonry Social Wall', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials09_ Masonry Social Wall' },
  { id: 'Testimonials10_EnterpriseCaseStudyRow', name: 'Testimonials10_ Enterprise Case Study Row', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials10_ Enterprise Case Study Row' },
  { id: 'Testimonials11_SingleFeaturedHeroQuote', name: 'Testimonials11_ Single Featured Hero Quote', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials11_ Single Featured Hero Quote' },
  { id: 'Testimonials12_AvatarTickerMarquee', name: 'Testimonials12_ Avatar Ticker Marquee', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials12_ Avatar Ticker Marquee' },
  { id: 'Testimonials13_IndustrySpecificTabs', name: 'Testimonials13_ Industry Specific Tabs', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials13_ Industry Specific Tabs' },
  { id: 'Testimonials14_FounderLetterStatement', name: 'Testimonials14_ Founder Letter Statement', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials14_ Founder Letter Statement' },
  { id: 'Testimonials15_Compact2ColMinimal', name: 'Testimonials15_ Compact2 Col Minimal', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials15_ Compact2 Col Minimal' },
  { id: 'Testimonials16_StatsPairedReview', name: 'Testimonials16_ Stats Paired Review', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials16_ Stats Paired Review' },
  { id: 'Testimonials17_TrustScoreHeader', name: 'Testimonials17_ Trust Score Header', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials17_ Trust Score Header' },
  { id: 'Testimonials18_CustomerMapPinpoints', name: 'Testimonials18_ Customer Map Pinpoints', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials18_ Customer Map Pinpoints' },
  { id: 'Testimonials19_DetailedTimelineReview', name: 'Testimonials19_ Detailed Timeline Review', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials19_ Detailed Timeline Review' },
  { id: 'Testimonials20_SecurityAuditorQuote', name: 'Testimonials20_ Security Auditor Quote', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials20_ Security Auditor Quote' },
  { id: 'Testimonials21_CardSliderControls', name: 'Testimonials21_ Card Slider Controls', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials21_ Card Slider Controls' },
  { id: 'Testimonials22_SpeechBubbleCards', name: 'Testimonials22_ Speech Bubble Cards', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials22_ Speech Bubble Cards' },
  { id: 'Testimonials23_KycSuccessStory', name: 'Testimonials23_ Kyc Success Story', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials23_ Kyc Success Story' },
  { id: 'Testimonials24_B2CMerchantSpotlight', name: 'Testimonials24_ B2 C Merchant Spotlight', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials24_ B2 C Merchant Spotlight' },
  { id: 'Testimonials25_CfoPerspectiveQuote', name: 'Testimonials25_ Cfo Perspective Quote', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials25_ Cfo Perspective Quote' },
  { id: 'Testimonials26_DeveloperApiPraise', name: 'Testimonials26_ Developer Api Praise', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials26_ Developer Api Praise' },
  { id: 'Testimonials27_CustomerAwardShowcase', name: 'Testimonials27_ Customer Award Showcase', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials27_ Customer Award Showcase' },
  { id: 'Testimonials28_BeforeAfterNarrative', name: 'Testimonials28_ Before After Narrative', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials28_ Before After Narrative' },
  { id: 'Testimonials29_CommunityQuotesWall', name: 'Testimonials29_ Community Quotes Wall', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials29_ Community Quotes Wall' },
  { id: 'Testimonials30_FinalCalloutQuote', name: 'Testimonials30_ Final Callout Quote', category: 'testimonials' as any, subcategory: 'testimonials', description: 'Untitled UI testimonials section component: Testimonials30_ Final Callout Quote' },
  { id: 'Faqs01_RadixAccordionSingle', name: 'Faqs01_ Radix Accordion Single', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs01_ Radix Accordion Single' },
  { id: 'Faqs02_TwoColumnSearchable', name: 'Faqs02_ Two Column Searchable', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs02_ Two Column Searchable' },
  { id: 'Faqs03_SupportCalloutBanner', name: 'Faqs03_ Support Callout Banner', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs03_ Support Callout Banner' },
  { id: 'Faqs04_CategoryTabbedAccordion', name: 'Faqs04_ Category Tabbed Accordion', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs04_ Category Tabbed Accordion' },
  { id: 'Faqs05_BorderedCardGrid', name: 'Faqs05_ Bordered Card Grid', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs05_ Bordered Card Grid' },
  { id: 'Faqs06_AirwallexKycSpecific', name: 'Faqs06_ Airwallex Kyc Specific', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs06_ Airwallex Kyc Specific' },
  { id: 'Faqs07_PricingBillingDetails', name: 'Faqs07_ Pricing Billing Details', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs07_ Pricing Billing Details' },
  { id: 'Faqs08_TechnicalIntegrationFaq', name: 'Faqs08_ Technical Integration Faq', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs08_ Technical Integration Faq' },
  { id: 'Faqs09_DarkMinimalAccordion', name: 'Faqs09_ Dark Minimal Accordion', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs09_ Dark Minimal Accordion' },
  { id: 'Faqs10_SplitSideHeading', name: 'Faqs10_ Split Side Heading', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs10_ Split Side Heading' },
  { id: 'Faqs11_HelpCenterHeader', name: 'Faqs11_ Help Center Header', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs11_ Help Center Header' },
  { id: 'Faqs12_MultiColumnMinimal', name: 'Faqs12_ Multi Column Minimal', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs12_ Multi Column Minimal' },
  { id: 'Faqs13_CardAccordionBordered', name: 'Faqs13_ Card Accordion Bordered', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs13_ Card Accordion Bordered' },
  { id: 'Faqs14_SlaUptimeQuestions', name: 'Faqs14_ Sla Uptime Questions', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs14_ Sla Uptime Questions' },
  { id: 'Faqs15_PhysicalShippingFaq', name: 'Faqs15_ Physical Shipping Faq', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs15_ Physical Shipping Faq' },
  { id: 'Faqs16_InteractiveFilterChips', name: 'Faqs16_ Interactive Filter Chips', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs16_ Interactive Filter Chips' },
  { id: 'Faqs17_ConsultationMeetingFaq', name: 'Faqs17_ Consultation Meeting Faq', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs17_ Consultation Meeting Faq' },
  { id: 'Faqs18_ComplianceGdprFaq', name: 'Faqs18_ Compliance Gdpr Faq', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs18_ Compliance Gdpr Faq' },
  { id: 'Faqs19_PaymentGatewayMethods', name: 'Faqs19_ Payment Gateway Methods', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs19_ Payment Gateway Methods' },
  { id: 'Faqs20_FullWidthExpansionHero', name: 'Faqs20_ Full Width Expansion Hero', category: 'faqs' as any, subcategory: 'faqs', description: 'Untitled UI faqs section component: Faqs20_ Full Width Expansion Hero' },
  { id: 'Contact01_TwoColWithMap', name: 'Contact01_ Two Col With Map', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact01_ Two Col With Map' },
  { id: 'Contact02_FormspreeLeadRouter', name: 'Contact02_ Formspree Lead Router', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact02_ Formspree Lead Router' },
  { id: 'Contact03_MeetingBookingWidget', name: 'Contact03_ Meeting Booking Widget', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact03_ Meeting Booking Widget' },
  { id: 'Contact04_SplitCardOfficeHours', name: 'Contact04_ Split Card Office Hours', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact04_ Split Card Office Hours' },
  { id: 'Contact05_DarkContrastForm', name: 'Contact05_ Dark Contrast Form', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact05_ Dark Contrast Form' },
  { id: 'Contact06_FloatingChatTrigger', name: 'Contact06_ Floating Chat Trigger', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact06_ Floating Chat Trigger' },
  { id: 'Contact07_DirectDepartmentRouting', name: 'Contact07_ Direct Department Routing', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact07_ Direct Department Routing' },
  { id: 'Contact08_MinimalistCleanInputs', name: 'Contact08_ Minimalist Clean Inputs', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact08_ Minimalist Clean Inputs' },
  { id: 'Contact09_PhonePriorityHotline', name: 'Contact09_ Phone Priority Hotline', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact09_ Phone Priority Hotline' },
  { id: 'Contact10_SecurityVulnerabilityDesk', name: 'Contact10_ Security Vulnerability Desk', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact10_ Security Vulnerability Desk' },
  { id: 'Contact11_RfqQuoteConfigurator', name: 'Contact11_ Rfq Quote Configurator', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact11_ Rfq Quote Configurator' },
  { id: 'Contact12_AirwallexKycSupportDesk', name: 'Contact12_ Airwallex Kyc Support Desk', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact12_ Airwallex Kyc Support Desk' },
  { id: 'Contact13_SalesDemoScheduler', name: 'Contact13_ Sales Demo Scheduler', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact13_ Sales Demo Scheduler' },
  { id: 'Contact14_SocialChannelGrid', name: 'Contact14_ Social Channel Grid', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact14_ Social Channel Grid' },
  { id: 'Contact15_EmergencyIncidentEscalation', name: 'Contact15_ Emergency Incident Escalation', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact15_ Emergency Incident Escalation' },
  { id: 'Contact16_WholesaleB2BInquiry', name: 'Contact16_ Wholesale B2 B Inquiry', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact16_ Wholesale B2 B Inquiry' },
  { id: 'Contact17_PressAndMediaRelations', name: 'Contact17_ Press And Media Relations', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact17_ Press And Media Relations' },
  { id: 'Contact18_PhysicalHQVisitorGuide', name: 'Contact18_ Physical H Q Visitor Guide', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact18_ Physical H Q Visitor Guide' },
  { id: 'Contact19_FeedbackSurveyForm', name: 'Contact19_ Feedback Survey Form', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact19_ Feedback Survey Form' },
  { id: 'Contact20_InvestorRelationsDesk', name: 'Contact20_ Investor Relations Desk', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact20_ Investor Relations Desk' },
  { id: 'Contact21_RecruitmentTalentForm', name: 'Contact21_ Recruitment Talent Form', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact21_ Recruitment Talent Form' },
  { id: 'Contact22_VendorProcurementPortal', name: 'Contact22_ Vendor Procurement Portal', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact22_ Vendor Procurement Portal' },
  { id: 'Contact23_BespokePartnershipProposal', name: 'Contact23_ Bespoke Partnership Proposal', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact23_ Bespoke Partnership Proposal' },
  { id: 'Contact24_MultiLocationDirectory', name: 'Contact24_ Multi Location Directory', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact24_ Multi Location Directory' },
  { id: 'Contact25_DirectWhatsappButtonHero', name: 'Contact25_ Direct Whatsapp Button Hero', category: 'contact' as any, subcategory: 'contact', description: 'Untitled UI contact section component: Contact25_ Direct Whatsapp Button Hero' },
  { id: 'Footers01_ComplianceFinePrintBar', name: 'Footers01_ Compliance Fine Print Bar', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers01_ Compliance Fine Print Bar' },
  { id: 'Footers02_CardSchemeBadges', name: 'Footers02_ Card Scheme Badges', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers02_ Card Scheme Badges' },
  { id: 'Footers03_FourColumnEnterprise', name: 'Footers03_ Four Column Enterprise', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers03_ Four Column Enterprise' },
  { id: 'Footers04_DarkHighContrast', name: 'Footers04_ Dark High Contrast', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers04_ Dark High Contrast' },
  { id: 'Footers05_AirwallexPartnerBadge', name: 'Footers05_ Airwallex Partner Badge', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers05_ Airwallex Partner Badge' },
  { id: 'Footers06_LegalDisclaimersExpanded', name: 'Footers06_ Legal Disclaimers Expanded', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers06_ Legal Disclaimers Expanded' },
  { id: 'Footers07_CentredMinimalist', name: 'Footers07_ Centred Minimalist', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers07_ Centred Minimalist' },
  { id: 'Footers08_NewsletterEmbedded', name: 'Footers08_ Newsletter Embedded', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers08_ Newsletter Embedded' },
  { id: 'Footers09_MultiLanguageCurrency', name: 'Footers09_ Multi Language Currency', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers09_ Multi Language Currency' },
  { id: 'Footers10_SecurityBadgesRow', name: 'Footers10_ Security Badges Row', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers10_ Security Badges Row' },
  { id: 'Footers11_SplitNewsletterDirectory', name: 'Footers11_ Split Newsletter Directory', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers11_ Split Newsletter Directory' },
  { id: 'Footers12_SocialMediaBar', name: 'Footers12_ Social Media Bar', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers12_ Social Media Bar' },
  { id: 'Footers13_StatusPageIndicator', name: 'Footers13_ Status Page Indicator', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers13_ Status Page Indicator' },
  { id: 'Footers14_EcommercePolicyFocused', name: 'Footers14_ Ecommerce Policy Focused', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers14_ Ecommerce Policy Focused' },
  { id: 'Footers15_SaaSAppCompact', name: 'Footers15_ Saa S App Compact', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers15_ Saa S App Compact' },
  { id: 'Footers16_OfficeLocationsRow', name: 'Footers16_ Office Locations Row', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers16_ Office Locations Row' },
  { id: 'Footers17_MegaFooterSitemap', name: 'Footers17_ Mega Footer Sitemap', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers17_ Mega Footer Sitemap' },
  { id: 'Footers18_BackToTopFloating', name: 'Footers18_ Back To Top Floating', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers18_ Back To Top Floating' },
  { id: 'Footers19_WhitelabelCleanBar', name: 'Footers19_ Whitelabel Clean Bar', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers19_ Whitelabel Clean Bar' },
  { id: 'Footers20_TrustSealRow', name: 'Footers20_ Trust Seal Row', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers20_ Trust Seal Row' },
  { id: 'Footers21_SimpleCopyrightOnly', name: 'Footers21_ Simple Copyright Only', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers21_ Simple Copyright Only' },
  { id: 'Footers22_AppDownloadButtons', name: 'Footers22_ App Download Buttons', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers22_ App Download Buttons' },
  { id: 'Footers23_CookiePreferencesBar', name: 'Footers23_ Cookie Preferences Bar', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers23_ Cookie Preferences Bar' },
  { id: 'Footers24_DualTierStatutory', name: 'Footers24_ Dual Tier Statutory', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers24_ Dual Tier Statutory' },
  { id: 'Footers25_ModernGlassmorphic', name: 'Footers25_ Modern Glassmorphic', category: 'footers' as any, subcategory: 'footers', description: 'Untitled UI footers section component: Footers25_ Modern Glassmorphic' },
  { id: 'Policies01_SowTermsOfService', name: 'Policies01_ Sow Terms Of Service', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies01_ Sow Terms Of Service' },
  { id: 'Policies02_PhysicalRmaReturns', name: 'Policies02_ Physical Rma Returns', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies02_ Physical Rma Returns' },
  { id: 'Policies03_SaaSCommercialSla', name: 'Policies03_ Saa S Commercial Sla', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies03_ Saa S Commercial Sla' },
  { id: 'Policies04_GdprPrivacyFramework', name: 'Policies04_ Gdpr Privacy Framework', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies04_ Gdpr Privacy Framework' },
  { id: 'Policies05_AirwallexMerchantTerms', name: 'Policies05_ Airwallex Merchant Terms', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies05_ Airwallex Merchant Terms' },
  { id: 'Policies06_AcceptableUsePolicy', name: 'Policies06_ Acceptable Use Policy', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies06_ Acceptable Use Policy' },
  { id: 'Policies07_SecurityVulnerabilityPolicy', name: 'Policies07_ Security Vulnerability Policy', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies07_ Security Vulnerability Policy' },
  { id: 'Policies08_ShippingFreightPolicy', name: 'Policies08_ Shipping Freight Policy', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies08_ Shipping Freight Policy' },
  { id: 'Policies09_CookiePolicyAndTracking', name: 'Policies09_ Cookie Policy And Tracking', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies09_ Cookie Policy And Tracking' },
  { id: 'Policies10_IntellectualPropertyCopyright', name: 'Policies10_ Intellectual Property Copyright', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies10_ Intellectual Property Copyright' },
  { id: 'Policies11_AntiMoneyLaunderingAml', name: 'Policies11_ Anti Money Laundering Aml', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies11_ Anti Money Laundering Aml' },
  { id: 'Policies12_SubprocessorsList', name: 'Policies12_ Subprocessors List', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies12_ Subprocessors List' },
  { id: 'Policies13_DisputeResolutionEscrow', name: 'Policies13_ Dispute Resolution Escrow', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies13_ Dispute Resolution Escrow' },
  { id: 'Policies14_ConsumerWarrantyNotice', name: 'Policies14_ Consumer Warranty Notice', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies14_ Consumer Warranty Notice' },
  { id: 'Policies15_MasterServiceAgreement', name: 'Policies15_ Master Service Agreement', category: 'policies' as any, subcategory: 'policies', description: 'Untitled UI policies section component: Policies15_ Master Service Agreement' },
  { id: 'Ctas01_DarkModeBanner', name: 'Ctas01_ Dark Mode Banner', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas01_ Dark Mode Banner' },
  { id: 'Ctas02_NewsletterSubscription', name: 'Ctas02_ Newsletter Subscription', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas02_ Newsletter Subscription' },
  { id: 'Ctas03_ConsultationTrigger', name: 'Ctas03_ Consultation Trigger', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas03_ Consultation Trigger' },
  { id: 'Ctas04_FreeTrialInstantAccess', name: 'Ctas04_ Free Trial Instant Access', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas04_ Free Trial Instant Access' },
  { id: 'Ctas05_SplitCardWithMetrics', name: 'Ctas05_ Split Card With Metrics', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas05_ Split Card With Metrics' },
  { id: 'Ctas06_AccentGradientHero', name: 'Ctas06_ Accent Gradient Hero', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas06_ Accent Gradient Hero' },
  { id: 'Ctas07_AirwallexKycFastTrack', name: 'Ctas07_ Airwallex Kyc Fast Track', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas07_ Airwallex Kyc Fast Track' },
  { id: 'Ctas08_TwoTierActionChoice', name: 'Ctas08_ Two Tier Action Choice', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas08_ Two Tier Action Choice' },
  { id: 'Ctas09_MinimalistInlineBar', name: 'Ctas09_ Minimalist Inline Bar', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas09_ Minimalist Inline Bar' },
  { id: 'Ctas10_AppStoreMobilePrompt', name: 'Ctas10_ App Store Mobile Prompt', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas10_ App Store Mobile Prompt' },
  { id: 'Ctas11_EnterpriseRfqBanner', name: 'Ctas11_ Enterprise Rfq Banner', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas11_ Enterprise Rfq Banner' },
  { id: 'Ctas12_InteractiveEstimatorCta', name: 'Ctas12_ Interactive Estimator Cta', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas12_ Interactive Estimator Cta' },
  { id: 'Ctas13_CardOverlapElevated', name: 'Ctas13_ Card Overlap Elevated', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas13_ Card Overlap Elevated' },
  { id: 'Ctas14_DeveloperApiDocumentation', name: 'Ctas14_ Developer Api Documentation', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas14_ Developer Api Documentation' },
  { id: 'Ctas15_UrgentLimitedWindow', name: 'Ctas15_ Urgent Limited Window', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas15_ Urgent Limited Window' },
  { id: 'Ctas16_ContactSalesSplitCard', name: 'Ctas16_ Contact Sales Split Card', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas16_ Contact Sales Split Card' },
  { id: 'Ctas17_CommunityDiscordJoin', name: 'Ctas17_ Community Discord Join', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas17_ Community Discord Join' },
  { id: 'Ctas18_WholesaleVolumeInquiry', name: 'Ctas18_ Wholesale Volume Inquiry', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas18_ Wholesale Volume Inquiry' },
  { id: 'Ctas19_GuaranteedMoneyBack', name: 'Ctas19_ Guaranteed Money Back', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas19_ Guaranteed Money Back' },
  { id: 'Ctas20_WhiteLabelResellerTrigger', name: 'Ctas20_ White Label Reseller Trigger', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas20_ White Label Reseller Trigger' },
  { id: 'Ctas21_SecurityAuditReportDownload', name: 'Ctas21_ Security Audit Report Download', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas21_ Security Audit Report Download' },
  { id: 'Ctas22_ZeroDowntimeMigration', name: 'Ctas22_ Zero Downtime Migration', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas22_ Zero Downtime Migration' },
  { id: 'Ctas23_VideoProductTourPrompt', name: 'Ctas23_ Video Product Tour Prompt', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas23_ Video Product Tour Prompt' },
  { id: 'Ctas24_InvestorPitchDeckRequest', name: 'Ctas24_ Investor Pitch Deck Request', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas24_ Investor Pitch Deck Request' },
  { id: 'Ctas25_MultiLocationGlobalCta', name: 'Ctas25_ Multi Location Global Cta', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas25_ Multi Location Global Cta' },
  { id: 'Ctas26_PhysicalTerminalOrdering', name: 'Ctas26_ Physical Terminal Ordering', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas26_ Physical Terminal Ordering' },
  { id: 'Ctas27_AnnualDiscountBanner', name: 'Ctas27_ Annual Discount Banner', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas27_ Annual Discount Banner' },
  { id: 'Ctas28_ExecutivePodcastWebinar', name: 'Ctas28_ Executive Podcast Webinar', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas28_ Executive Podcast Webinar' },
  { id: 'Ctas29_CustomerLoyaltyPerks', name: 'Ctas29_ Customer Loyalty Perks', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas29_ Customer Loyalty Perks' },
  { id: 'Ctas30_FinalClosingCallToAction', name: 'Ctas30_ Final Closing Call To Action', category: 'ctas' as any, subcategory: 'ctas', description: 'Untitled UI ctas section component: Ctas30_ Final Closing Call To Action' },
  { id: 'HeaderStickyBlurDefault', name: 'Header Sticky Blur Default', category: 'headers', subcategory: 'sticky-blur', description: 'Sleek frosted glass sticky nav with pill status badge and primary action button' },
  { id: 'HeaderStickyBlurBordered', name: 'Header Sticky Blur Bordered', category: 'headers', subcategory: 'sticky-blur', description: 'Subtle hairline border sticky blur header with clean typography and search toggle' },
  { id: 'HeaderStickyBlurDark', name: 'Header Sticky Blur Dark', category: 'headers', subcategory: 'sticky-blur', description: 'Ultra-dark slate frosted glass nav with emerald live status beacon' },
  { id: 'HeaderStickyBlurFloating', name: 'Header Sticky Blur Floating', category: 'headers', subcategory: 'sticky-blur', description: 'Floating rounded-2xl island header with backdrop blur and dual CTAs' },
  { id: 'HeaderStickyBlurMinimal', name: 'Header Sticky Blur Minimal', category: 'headers', subcategory: 'sticky-blur', description: 'Minimalist frosted header with slim logo mark and quick contact trigger' },
  { id: 'HeaderMegaMenuSolutions', name: 'Header Mega Menu Solutions', category: 'headers', subcategory: 'mega-menu', description: 'Enterprise SaaS navigation with multi-column solutions dropdown grid' },
  { id: 'HeaderMegaMenuDeveloper', name: 'Header Mega Menu Developer', category: 'headers', subcategory: 'mega-menu', description: 'Developer API platform header featuring interactive code previews and SDK links' },
  { id: 'HeaderMegaMenuFintech', name: 'Header Mega Menu Fintech', category: 'headers', subcategory: 'mega-menu', description: 'Global treasury & payouts mega menu with compliance security badges' },
  { id: 'HeaderMegaMenuEnterprise', name: 'Header Mega Menu Enterprise', category: 'headers', subcategory: 'mega-menu', description: 'Multi-tiered enterprise navigation with resource hub and customer stories' },
  { id: 'HeaderMegaMenuTwoColumn', name: 'Header Mega Menu Two-Column', category: 'headers', subcategory: 'mega-menu', description: 'Split dual-panel mega menu with featured card highlights and direct CTA' },
  { id: 'HeaderEcomCartDefault', name: 'Header E-Com Cart Default', category: 'headers', subcategory: 'e-com-cart', description: 'Direct-to-consumer store header with animated cart counter and quick checkout trigger' },
  { id: 'HeaderEcomCartSearch', name: 'Header E-Com Cart Search', category: 'headers', subcategory: 'e-com-cart', description: 'High-conversion ecommerce header with prominent search bar and wishlist indicator' },
  { id: 'HeaderEcomCartPromoBar', name: 'Header E-Com Cart Promo Bar', category: 'headers', subcategory: 'e-com-cart', description: 'Top promotional banner notification bar combined with e-commerce cart navigation' },
  { id: 'HeaderEcomCartCompact', name: 'Header E-Com Cart Compact', category: 'headers', subcategory: 'e-com-cart', description: 'Space-saving compact commerce header with currency selector and checkout drawer' },
  { id: 'HeaderEcomCartLuxury', name: 'Header E-Com Cart Luxury', category: 'headers', subcategory: 'e-com-cart', description: 'High-end luxury brand header with refined typography and subtle bag indicator' },
  { id: 'HeaderMonogramClassic', name: 'Header Monogram Classic', category: 'headers', subcategory: 'minimal-monogram', description: 'Refined geometric monogram badge with minimalist single-row navigation' },
  { id: 'HeaderMonogramModern', name: 'Header Monogram Modern', category: 'headers', subcategory: 'minimal-monogram', description: 'Ultra-clean monogram emblem with subtle hover underline links' },
  { id: 'HeaderMonogramBold', name: 'Header Monogram Bold', category: 'headers', subcategory: 'minimal-monogram', description: 'High-contrast blackletter monogram icon with pill action button' },
  { id: 'HeaderMonogramAgency', name: 'Header Monogram Agency', category: 'headers', subcategory: 'minimal-monogram', description: 'Design studio monogram navigation with interactive theme switcher indicator' },
  { id: 'HeaderSplitLinksBalanced', name: 'Header Split Links Balanced', category: 'headers', subcategory: 'split-links', description: 'Centered logo with symmetrically balanced navigation links on left and right' },
  { id: 'HeaderSplitLinksWide', name: 'Header Split Links Wide', category: 'headers', subcategory: 'split-links', description: 'Full-bleed split links header with product categories left and company right' },
  { id: 'HeaderSplitLinksAction', name: 'Header Split Links Action', category: 'headers', subcategory: 'split-links', description: 'Split layout with secondary utility links on left and primary conversion CTA on right' },
  { id: 'HeaderCenteredStack', name: 'Header Centered Stack', category: 'headers', subcategory: 'centered', description: 'Two-tier stacked centered navigation with prominent brand identity on top' },
  { id: 'HeaderCenteredClean', name: 'Header Centered Clean', category: 'headers', subcategory: 'centered', description: 'Unified single-line centered navigation layout with balanced action triggers' },
  { id: 'HeaderCenteredEditorial', name: 'Header Centered Editorial', category: 'headers', subcategory: 'centered', description: 'Magazine-style editorial header with centered brand headline and category tabs' },
  { id: 'HeroSplitDefault', name: 'Hero Split Default', category: 'heros', subcategory: 'split-screen', description: 'Balanced 2-column split hero with headline, dual CTA, and responsive app showcase' },
  { id: 'HeroSplitReverse', name: 'Hero Split Reverse', category: 'heros', subcategory: 'split-screen', description: 'Inverted split hero with visual asset on left and compelling value proposition on right' },
  { id: 'HeroSplitForm', name: 'Hero Split Lead Form', category: 'heros', subcategory: 'split-screen', description: 'High-intent lead generation hero with interactive email signup and instant onboarding card' },
  { id: 'HeroSplitCards', name: 'Hero Split Feature Stack', category: 'heros', subcategory: 'split-screen', description: 'Split hero paired with floating glassmorphism feature cards and metric pills' },
  { id: 'HeroSplitStats', name: 'Hero Split Metrics', category: 'heros', subcategory: 'split-screen', description: 'Split hero highlighting live throughput stats and tier-1 partner trust badges' },
  { id: 'HeroSplitTerminal', name: 'Hero Split Code Terminal', category: 'heros', subcategory: 'split-screen', description: 'Developer API platform hero with interactive shell command and syntax preview' },
  { id: 'HeroSplitCheckout', name: 'Hero Split Checkout Preview', category: 'heros', subcategory: 'split-screen', description: 'Fintech split hero with interactive simulated payment modal and live rates' },
  { id: 'HeroSplitGradient', name: 'Hero Split Aurora Glow', category: 'heros', subcategory: 'split-screen', description: 'Vibrant mesh aurora background with angled glass device preview' },
  { id: 'HeroCenteredBadgeDefault', name: 'Hero Centered Badge Default', category: 'heros', subcategory: 'centered-badge', description: 'Iconic Untitled UI centered headline with pill badge and social proof row' },
  { id: 'HeroCenteredBadgeGlow', name: 'Hero Centered Badge Glow', category: 'heros', subcategory: 'centered-badge', description: 'Centered hero with radiant ambient background glow and rounded action buttons' },
  { id: 'HeroCenteredBadgeMinimal', name: 'Hero Centered Badge Minimal', category: 'heros', subcategory: 'centered-badge', description: 'Hyper-minimalist centered typography with understated pill version chip' },
  { id: 'HeroCenteredBadgeRatings', name: 'Hero Centered Badge Ratings', category: 'heros', subcategory: 'centered-badge', description: 'Centered headline anchored by 5-star customer review rating pill and avatars' },
  { id: 'HeroCenteredBadgeDualCta', name: 'Hero Centered Badge Dual CTA', category: 'heros', subcategory: 'centered-badge', description: 'Centered layout with primary trial CTA and secondary watch-demo video trigger' },
  { id: 'HeroCenteredBadgeSearch', name: 'Hero Centered Badge Search', category: 'heros', subcategory: 'centered-badge', description: 'Centered discovery hero with integrated search input and popular suggestion tags' },
  { id: 'HeroCenteredBadgeLaunch', name: 'Hero Centered Badge Product Hunt', category: 'heros', subcategory: 'centered-badge', description: 'Centered launch celebration hero with #1 Product of the Day badge' },
  { id: 'HeroAppMockupBrowser', name: 'Hero App Mockup Browser', category: 'heros', subcategory: 'app-mockup', description: 'Full-width macOS browser window frame with tabs, address bar, and shadow depth' },
  { id: 'HeroAppMockupDashboard', name: 'Hero App Mockup Dashboard', category: 'heros', subcategory: 'app-mockup', description: 'Interactive SaaS dashboard preview with analytics charts and transaction tables' },
  { id: 'HeroAppMockupDarkStudio', name: 'Hero App Mockup Dark Studio', category: 'heros', subcategory: 'app-mockup', description: 'Linear/Vercel inspired dark workspace mockup with ambient rim light' },
  { id: 'HeroAppMockupFloatingCards', name: 'Hero App Mockup Floating Cards', category: 'heros', subcategory: 'app-mockup', description: 'Central workspace frame flanked by floating notification and stat overlays' },
  { id: 'HeroAppMockupIsometric', name: 'Hero App Mockup 3D Isometric', category: 'heros', subcategory: 'app-mockup', description: '3D perspective tilted dashboard frame emphasizing multi-layer architecture' },
  { id: 'HeroAppMockupGlass', name: 'Hero App Mockup Glass Canvas', category: 'heros', subcategory: 'app-mockup', description: 'Translucent frosted glass UI container with hairline borders and backdrop blur' },
  { id: 'HeroAppMockupInteractive', name: 'Hero App Mockup Interactive Tabs', category: 'heros', subcategory: 'app-mockup', description: 'Application preview with switchable workflow tabs showing real feature states' },
  { id: 'HeroVideoBackdropCinematic', name: 'Hero Video Cinematic', category: 'heros', subcategory: 'video-backdrop', description: 'High-impact cinematic video background with dark overlay and bold typography' },
  { id: 'HeroVideoBackdropModal', name: 'Hero Video Modal Trigger', category: 'heros', subcategory: 'video-backdrop', description: 'Ambient loop backdrop with pulsating center play button opening video modal' },
  { id: 'HeroVideoBackdropSplit', name: 'Hero Video Split Showcase', category: 'heros', subcategory: 'video-backdrop', description: 'Split hero featuring embedded video player with custom sleek playback controls' },
  { id: 'HeroVideoBackdropMinimal', name: 'Hero Video Subtle Loop', category: 'heros', subcategory: 'video-backdrop', description: 'Minimal headline over muted monochrome motion texture' },
  { id: 'HeroVideoBackdropProduct', name: 'Hero Video Product Reel', category: 'heros', subcategory: 'video-backdrop', description: 'Product feature reel showcase with synchronized bullet points' },
  { id: 'HeroVideoBackdropTestimonial', name: 'Hero Video Founder Story', category: 'heros', subcategory: 'video-backdrop', description: 'Story-driven hero with founder narrative video preview and quote snippet' },
  { id: 'HeroMultiDeviceDesktopMobile', name: 'Hero Desktop & Mobile Pair', category: 'heros', subcategory: 'multi-device', description: 'Desktop monitor mockup paired with responsive smartphone viewport overlay' },
  { id: 'HeroMultiDeviceTrio', name: 'Hero Device Ecosystem Trio', category: 'heros', subcategory: 'multi-device', description: 'Laptop, tablet, and mobile trio demonstrating cross-platform parity' },
  { id: 'HeroMultiDeviceFloating', name: 'Hero Floating Device Stack', category: 'heros', subcategory: 'multi-device', description: 'Dynamic layered smartphones showing native mobile app screens' },
  { id: 'HeroMultiDeviceTabletFocus', name: 'Hero Tablet POS Showcase', category: 'heros', subcategory: 'multi-device', description: 'Tablet point-of-sale interface preview with handheld terminal companion' },
  { id: 'HeroMultiDeviceResponsive', name: 'Hero Adaptive Layout Demo', category: 'heros', subcategory: 'multi-device', description: 'Side-by-side viewport demonstration with synchronized live interaction' },
  { id: 'HeroMultiDeviceCardGrid', name: 'Hero Multi-Device Micro-Screens', category: 'heros', subcategory: 'multi-device', description: 'Cluster of miniature device viewports highlighting modular capabilities' },
  { id: 'HeroBentoAsymmetric', name: 'Hero Bento Asymmetric 3-Tile', category: 'heros', subcategory: 'bento-hero', description: 'Asymmetric 3-tile bento hero blending key metric, live chart, and primary action' },
  { id: 'HeroBentoInteractive', name: 'Hero Bento Interactive Matrix', category: 'heros', subcategory: 'bento-hero', description: 'Bento hero featuring live tab switcher, code snippet tile, and customer quote' },
  { id: 'HeroBentoFintech', name: 'Hero Bento Treasury Grid', category: 'heros', subcategory: 'bento-hero', description: 'Treasury management bento hero with currency exchange tile and security seal' },
  { id: 'HeroBentoSaaS', name: 'Hero Bento Growth Engine', category: 'heros', subcategory: 'bento-hero', description: 'SaaS conversion bento hero with pipeline velocity gauge and user counter' },
  { id: 'HeroBentoDarkGrid', name: 'Hero Bento Dark Cyberpunk', category: 'heros', subcategory: 'bento-hero', description: 'High-contrast dark grid bento hero with neon green metric accents' },
  { id: 'HeroBentoMinimal', name: 'Hero Bento Clean Bento', category: 'heros', subcategory: 'bento-hero', description: 'Soft grayscale bento hero emphasizing clarity, typography, and whitespace' },
  { id: 'HeroMinimalEditorial', name: 'Hero Minimal Editorial', category: 'heros', subcategory: 'minimal-headline', description: 'Serif-infused editorial headline with elegant author byline and single link' },
  { id: 'HeroMinimalSans', name: 'Hero Minimal Pure Sans', category: 'heros', subcategory: 'minimal-headline', description: 'Ultra-clean Swiss modern typography hero with zero clutter' },
  { id: 'HeroMinimalStatement', name: 'Hero Minimal Bold Statement', category: 'heros', subcategory: 'minimal-headline', description: 'Monumental 72px statement headline designed for industry disruptors' },
  { id: 'HeroMinimalBadgeOnly', name: 'Hero Minimal Tagged Headline', category: 'heros', subcategory: 'minimal-headline', description: 'Understated headline preceded by dual category tags and read-time badge' },
  { id: 'HeroMinimalSplitText', name: 'Hero Minimal Split Typography', category: 'heros', subcategory: 'minimal-headline', description: 'Left-aligned massive headline with right-aligned contextual paragraph' },
  { id: 'LogoGridMonochrome5', name: 'Logo Grid Monochrome 5-Col', category: 'logos', subcategory: 'monochrome-grid', description: 'Clean 5-column monochrome partner logo grid with hover opacity transition' },
  { id: 'LogoGridMonochrome6', name: 'Logo Grid Monochrome 6-Col', category: 'logos', subcategory: 'monochrome-grid', description: 'Wide 6-column enterprise client logo showcase with subtle hairline borders' },
  { id: 'LogoGridMonochromeCards', name: 'Logo Grid Card Tiles', category: 'logos', subcategory: 'monochrome-grid', description: 'Logos encapsulated inside soft rounded card tiles with brand initials' },
  { id: 'LogoGridMonochromeSplit', name: 'Logo Grid Split Trust Copy', category: 'logos', subcategory: 'monochrome-grid', description: 'Left-side trust statement copy paired with 4-column client logo matrix' },
  { id: 'LogoGridMonochromeStats', name: 'Logo Grid with Throughput Stat', category: 'logos', subcategory: 'monochrome-grid', description: 'Logo grid anchored by an impressive $10B+ processed transaction stat' },
  { id: 'LogoMarqueeTickerDefault', name: 'Logo Marquee Infinite Scroll', category: 'logos', subcategory: 'marquee-tickers', description: 'Seamless continuous horizontal logo marquee with gradient edge fade' },
  { id: 'LogoMarqueeTickerDual', name: 'Logo Marquee Dual Reverse', category: 'logos', subcategory: 'marquee-tickers', description: 'Dual row reverse-direction logo marquee ticker for dynamic social proof' },
  { id: 'LogoMarqueeTickerCards', name: 'Logo Marquee Floating Pills', category: 'logos', subcategory: 'marquee-tickers', description: 'Floating rounded pill badges ticker showing verified enterprise customers' },
  { id: 'LogoMarqueeTickerDark', name: 'Logo Marquee Dark Stealth', category: 'logos', subcategory: 'marquee-tickers', description: 'Deep black background ticker with glowing brand emblems' },
  { id: 'LogoMarqueeTickerQuotes', name: 'Logo Marquee Logo + Snippet', category: 'logos', subcategory: 'marquee-tickers', description: 'Continuous marquee pairing partner logos with 1-line customer quotes' },
  { id: 'LogoInvestorBadgesTopTier', name: 'Logo Investor Tier-1 VC Grid', category: 'logos', subcategory: 'investor-badges', description: 'Backed by Sequoia, a16z, Y Combinator, and Accel prestige investment proof' },
  { id: 'LogoInvestorBadgesFunding', name: 'Logo Investor Series B Banner', category: 'logos', subcategory: 'investor-badges', description: 'Funding round announcement banner displaying lead institutional investors' },
  { id: 'LogoInvestorBadgesAngelRow', name: 'Logo Investor Angel Operators', category: 'logos', subcategory: 'investor-badges', description: 'Operator angels and industry veteran backing badges with profile avatars' },
  { id: 'LogoInvestorBadgesCards', name: 'Logo Investor Elevated Cards', category: 'logos', subcategory: 'investor-badges', description: 'Prominent investor cards detailing total capital raised and partner quotes' },
  { id: 'LogoInvestorBadgesMinimal', name: 'Logo Investor Minimal Wordmarks', category: 'logos', subcategory: 'investor-badges', description: 'Quiet luxury monochrome wordmarks of top global venture firms' },
  { id: 'LogoTrustRatingPillG2', name: 'Logo Trust Rating G2 & Capterra', category: 'logos', subcategory: 'trust-rating-pills', description: 'Dual G2 Leader 4.9/5 and Capterra verified review badges with gold stars' },
  { id: 'LogoTrustRatingPillTrustpilot', name: 'Logo Trust Rating Trustpilot 4.9', category: 'logos', subcategory: 'trust-rating-pills', description: 'Official Trustpilot Excellent 4.9/5 pill with 2,400+ real verified customer reviews' },
  { id: 'LogoTrustRatingPillSecurity', name: 'Logo Trust Rating SOC2 & ISO27001', category: 'logos', subcategory: 'trust-rating-pills', description: 'Enterprise security seals: SOC2 Type II, ISO 27001, and GDPR compliant' },
  { id: 'LogoTrustRatingPillAvatars', name: 'Logo Trust Rating 10k+ Customers', category: 'logos', subcategory: 'trust-rating-pills', description: 'Customer avatar stack pill with live count: "Trusted by 12,000+ teams"' },
  { id: 'LogoTrustRatingPillCombined', name: 'Logo Trust Rating Unified Proof Bar', category: 'logos', subcategory: 'trust-rating-pills', description: 'All-in-one proof bar combining review rating, security seals, and client logos' },
  { id: 'BentoAsymLargeLeft', name: 'Bento Asym Large Left Hero Card', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Dominant 2/3 left card with preview and 1/3 right column with stacked sub-features' },
  { id: 'BentoAsymLargeRight', name: 'Bento Asym Large Right Feature', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Left column feature list with dominant 2/3 right interactive preview module' },
  { id: 'BentoAsymSplitDiagonal', name: 'Bento Asym Diagonal Flow', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Asymmetric alternating card heights creating an energetic visual reading rhythm' },
  { id: 'BentoAsymStatHighlight', name: 'Bento Asym Hero Metric Left', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Left card spotlighting 99.99% uptime SLA with right telemetry telemetry feed' },
  { id: 'BentoAsymCardOverhang', name: 'Bento Asym Overhanging Asset', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Asymmetric 2-column layout with partially overflowing UI canvas mockup' },
  { id: 'BentoAsymFintechFlow', name: 'Bento Asym Multi-Currency Flow', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Left real-time currency conversion card with right automated FX rules' },
  { id: 'BentoAsymDeveloperSplit', name: 'Bento Asym Webhook Debugger', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Left real-time event log with right instant webhook retry simulator' },
  { id: 'BentoAsymSecurityVault', name: 'Bento Asym Zero-Knowledge Vault', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Left AES-256 encryption visual with right audit access controls' },
  { id: 'BentoAsymAnalyticsSplit', name: 'Bento Asym Conversion Funnel', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Dominant visual checkout drop-off analysis with right automated recovery actions' },
  { id: 'BentoAsymTeamCollab', name: 'Bento Asym Multi-Tenant Access', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Role-based permission matrix on left with audit trails log on right' },
  { id: 'BentoAsymSpeedLatency', name: 'Bento Asym Global Edge Routing', category: 'bentos', subcategory: 'asymmetric-2col', description: 'World map edge server latency preview paired with instant cache purging' },
  { id: 'BentoAsymEcomInventory', name: 'Bento Asym Smart Stock Sync', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Multi-warehouse stock sync engine left with backorder notifications right' },
  { id: 'BentoAsymAutomationRules', name: 'Bento Asym No-Code Workflow', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Visual if-this-then-that automation builder with prebuilt trigger library' },
  { id: 'BentoAsymInvoiceEngine', name: 'Bento Asym Automated Billing', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Recurring invoice generation preview paired with automated dunning alerts' },
  { id: 'BentoAsymComplianceShield', name: 'Bento Asym Automated KYC/KYB', category: 'bentos', subcategory: 'asymmetric-2col', description: 'Real-time passport OCR verification with global sanction lists scanning' },
  { id: 'Bento3x3Classic', name: 'Bento 3x3 Universal Grid', category: 'bentos', subcategory: '3x3-grids', description: 'Standard 9-tile balanced feature grid with iconography and sleek card borders' },
  { id: 'Bento3x3CenterHighlight', name: 'Bento 3x3 Center Anchor Card', category: 'bentos', subcategory: '3x3-grids', description: '3x3 grid where the center card is visually highlighted with gradient border' },
  { id: 'Bento3x3TopSpan', name: 'Bento 3x3 Top Banner Span', category: 'bentos', subcategory: '3x3-grids', description: 'Top full-width row span with two rows of three compact capability tiles' },
  { id: 'Bento3x3BottomSpan', name: 'Bento 3x3 Bottom Summary Span', category: 'bentos', subcategory: '3x3-grids', description: 'Six feature cards on top with wide summary integration banner below' },
  { id: 'Bento3x3Mosaic', name: 'Bento 3x3 Mosaic Irregular', category: 'bentos', subcategory: '3x3-grids', description: 'Mixed col-span 1 and 2 tiles creating an architectural mosaic aesthetic' },
  { id: 'Bento3x3DarkCyber', name: 'Bento 3x3 High-Contrast Slate', category: 'bentos', subcategory: '3x3-grids', description: 'Deep slate 3x3 tiles with lime green active state indicators' },
  { id: 'Bento3x3MetricsGrid', name: 'Bento 3x3 Performance KPI Board', category: 'bentos', subcategory: '3x3-grids', description: '9-card executive dashboard displaying key operational and growth KPIs' },
  { id: 'Bento3x3Integrations', name: 'Bento 3x3 Ecosystem Stack', category: 'bentos', subcategory: '3x3-grids', description: 'Platform connectivity grid showcasing Stripe, AWS, Slack, GitHub, etc.' },
  { id: 'Bento3x3SecurityStack', name: 'Bento 3x3 Defense in Depth', category: 'bentos', subcategory: '3x3-grids', description: '9 enterprise security layers from DDoS mitigation to hardware security keys' },
  { id: 'Bento3x3EcommerceTools', name: 'Bento 3x3 Omnichannel Suite', category: 'bentos', subcategory: '3x3-grids', description: 'POS, online store, multi-currency, checkout, tax, and returns all in one' },
  { id: 'Bento3x3AIAssistant', name: 'Bento 3x3 AI Copilot Capabilities', category: 'bentos', subcategory: '3x3-grids', description: 'Natural language queries, predictive forecasting, auto-categorization' },
  { id: 'Bento3x3DevExperience', name: 'Bento 3x3 DX Toolchain', category: 'bentos', subcategory: '3x3-grids', description: 'CLI tools, TypeScript SDKs, sandboxes, webhooks, and GitHub actions' },
  { id: 'Bento3x3GlobalReach', name: 'Bento 3x3 Cross-Border Engine', category: 'bentos', subcategory: '3x3-grids', description: 'Local payment methods across EU, US, APAC, LATAM, and Middle East' },
  { id: 'Bento3x3CustomerCare', name: 'Bento 3x3 Concierge Support', category: 'bentos', subcategory: '3x3-grids', description: '24/7 dedicated Slack channels, 15-min SLA, designated technical account manager' },
  { id: 'Bento3x3MinimalMono', name: 'Bento 3x3 Clean Minimal Mono', category: 'bentos', subcategory: '3x3-grids', description: 'Monochrome minimalist wireframe style with refined Swiss typography' },
  { id: 'BentoTabsSolutions', name: 'Bento Tabs Solutions Matrix', category: 'bentos', subcategory: 'interactive-tabs', description: 'Interactive tabbed bento for Startups, Scaleups, and Enterprise workflows' },
  { id: 'BentoTabsDevelopers', name: 'Bento Tabs Language SDKs', category: 'bentos', subcategory: 'interactive-tabs', description: 'Switchable code tabs for Node.js, Python, Go, Ruby, and cURL endpoints' },
  { id: 'BentoTabsIndustries', name: 'Bento Tabs Industry Verticals', category: 'bentos', subcategory: 'interactive-tabs', description: 'Specialized feature matrices for SaaS, Marketplaces, Creator, and Retail' },
  { id: 'BentoTabsLifecycle', name: 'Bento Tabs Customer Journey', category: 'bentos', subcategory: 'interactive-tabs', description: 'Interactive tabs showing Onboarding, Activation, Retention, and Scale' },
  { id: 'BentoTabsArchitecture', name: 'Bento Tabs Cloud Infrastructure', category: 'bentos', subcategory: 'interactive-tabs', description: 'Switch between Edge Compute, Storage Cluster, and Database Replicas' },
  { id: 'BentoTabsCompliance', name: 'Bento Tabs Global Regulations', category: 'bentos', subcategory: 'interactive-tabs', description: 'Jurisdiction selector toggling UK FCA, EU PSD2, US FinCEN, and SG MAS' },
  { id: 'BentoTabsPaymentMethods', name: 'Bento Tabs Payment Rails', category: 'bentos', subcategory: 'interactive-tabs', description: 'Tabs toggling Cards, SEPA/ACH Direct Debit, Digital Wallets, and Wire Transfers' },
  { id: 'BentoTabsPricingTiers', name: 'Bento Tabs Tier Comparison Bento', category: 'bentos', subcategory: 'interactive-tabs', description: 'Interactive plan switcher updating included bento feature capacities' },
  { id: 'BentoTabsDataAnalytics', name: 'Bento Tabs Real-Time Reports', category: 'bentos', subcategory: 'interactive-tabs', description: 'Switch views between Revenue, Churn, ARPU, and LTV telemetry' },
  { id: 'BentoTabsAutomationTemplates', name: 'Bento Tabs Workflow Blueprints', category: 'bentos', subcategory: 'interactive-tabs', description: 'Pre-packaged recipes for subscription billing, refunds, and dunning' },
  { id: 'BentoMetricProcessingVolume', name: 'Bento Metric $50B+ Volume', category: 'bentos', subcategory: 'metric-highlight', description: 'Giant glowing processing figure surrounded by latency and uptime counters' },
  { id: 'BentoMetricUptimeSLA', name: 'Bento Metric 99.999% SLA', category: 'bentos', subcategory: 'metric-highlight', description: 'High-availability metric card with 90-day incident-free status timeline' },
  { id: 'BentoMetricGlobalCountries', name: 'Bento Metric 180+ Countries', category: 'bentos', subcategory: 'metric-highlight', description: 'Global coverage stat card paired with real-time settlement speed stats' },
  { id: 'BentoMetricCustomerGrowth', name: 'Bento Metric 10x Velocity', category: 'bentos', subcategory: 'metric-highlight', description: 'Speed-to-market highlight with 3-minute average onboarding timer' },
  { id: 'BentoMetricCostSavings', name: 'Bento Metric 40% Lower Fees', category: 'bentos', subcategory: 'metric-highlight', description: 'Cost optimization benchmark comparing legacy banking interchange fees' },
  { id: 'BentoMetricSubMillisecond', name: 'Bento Metric 12ms Response', category: 'bentos', subcategory: 'metric-highlight', description: 'Sub-second API execution latency verified across 45 edge regions' },
  { id: 'BentoMetricFraudPrevention', name: 'Bento Metric 99.4% Fraud Block', category: 'bentos', subcategory: 'metric-highlight', description: 'Machine learning fraud detection rate with zero legitimate transaction drop' },
  { id: 'BentoMetricDeveloperAdoption', name: 'Bento Metric 500k+ Developers', category: 'bentos', subcategory: 'metric-highlight', description: 'Developer community milestone card with 25M monthly API calls' },
  { id: 'BentoMetricCarbonNeutral', name: 'Bento Metric 100% Green Energy', category: 'bentos', subcategory: 'metric-highlight', description: 'Sustainable cloud computing metric with net-zero carbon certification' },
  { id: 'BentoMetricROIExecutive', name: 'Bento Metric 320% Average ROI', category: 'bentos', subcategory: 'metric-highlight', description: 'Independent Forrester Total Economic Impact study metric highlight' },
  { id: 'BentoCodeRestAPI', name: 'Bento Code REST API Quickstart', category: 'bentos', subcategory: 'code-window', description: 'Interactive cURL/Fetch terminal showing clean JSON response payload' },
  { id: 'BentoCodeWebhooks', name: 'Bento Code Webhook Event Payload', category: 'bentos', subcategory: 'code-window', description: 'Real-time JSON event stream showing signed signature verification' },
  { id: 'BentoCodeReactComponent', name: 'Bento Code React SDK Snippet', category: 'bentos', subcategory: 'code-window', description: 'Drop-in checkout element code snippet with live visual preview' },
  { id: 'BentoCodeGraphQLQuery', name: 'Bento Code GraphQL Explorer', category: 'bentos', subcategory: 'code-window', description: 'Precise schema query editor with autocomplete and instantaneous output' },
  { id: 'BentoCodePythonData', name: 'Bento Code Python Data Client', category: 'bentos', subcategory: 'code-window', description: 'Pandas & Jupyter integration snippet for automated financial reconciliations' },
  { id: 'BentoCodeMobileSwift', name: 'Bento Code iOS Swift SDK', category: 'bentos', subcategory: 'code-window', description: 'Native Apple Pay and biometric authentication snippet for Swift 6' },
  { id: 'BentoCodeGoMicroservice', name: 'Bento Code Go High-Concurrency', category: 'bentos', subcategory: 'code-window', description: 'Go routine batch processing snippet with connection pooling' },
  { id: 'BentoCodeDockerCompose', name: 'Bento Code Dokploy / Docker Spec', category: 'bentos', subcategory: 'code-window', description: 'One-click self-hosted deployment config for isolated staging environments' },
  { id: 'BentoCodeSQLReconciliation', name: 'Bento Code SQL Ledger Audit', category: 'bentos', subcategory: 'code-window', description: 'Double-entry immutability verification query with cryptographic proofs' },
  { id: 'BentoCodeAuthTokens', name: 'Bento Code JWT Bearer Auth', category: 'bentos', subcategory: 'code-window', description: 'OAuth 2.0 scoped credential issuance and mTLS handshake preview' },
];

export const puckConfig: PuckConfig = {
  categories: {
    stats: {
      title: 'Stats & Metrics (20)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Stats01_Simple4Col",
        "Stats02_BorderedPills",
        "Stats03_AccentBackground",
        "Stats04_TimelineGrowth",
        "Stats05_CardGridWithIcons",
        "Stats06_SplitWithHeading",
        "Stats07_DarkMinimalist",
        "Stats08_ComparisonMetrics",
        "Stats09_FloatingCardOverlap",
        "Stats10_GradientBorderCards",
        "Stats11_KpiDeltaIndicators",
        "Stats12_GlobalFootprint",
        "Stats13_CustomerTrustBar",
        "Stats14_StackedDividerGrid",
        "Stats15_GlassmorphicTiles",
        "Stats16_AirwallexKycStats",
        "Stats17_CircularProgressStats",
        "Stats18_InteractiveTabsStats",
        "Stats19_MarqueeTicker",
        "Stats20_BannerWithCTA"
]
    },
    pricing: {
      title: 'Pricing & Commercial (35)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Pricing01_TieredSaaS3Cards",
        "Pricing02_MonthlyAnnualSwitch",
        "Pricing03_PhysicalB2CGrid",
        "Pricing04_SowRetainerTable",
        "Pricing05_EnterpriseFeatureMatrix",
        "Pricing06_UsageBasedSlider",
        "Pricing07_HorizontalSingleCard",
        "Pricing08_FourTierCorporate",
        "Pricing09_DarkGlowSpotlight",
        "Pricing10_EcommerceBundleCards",
        "Pricing11_PayAsYouGoMeter",
        "Pricing12_StartupDiscountTier",
        "Pricing13_HighTicketRetainer",
        "Pricing14_AddonAdditives",
        "Pricing15_FreeTrialBanner",
        "Pricing16_MultiCurrencyTable",
        "Pricing17_LifetimeLicenseCard",
        "Pricing18_PerSeatCollaborative",
        "Pricing19_CardSchemeAcquiring",
        "Pricing20_HardwareLeasingGrid",
        "Pricing21_DeveloperAPITiers",
        "Pricing22_VolumeDiscountTier",
        "Pricing23_DedicatedSLAContract",
        "Pricing24_CryptoFiatGateway",
        "Pricing25_BespokeEnterpriseQuote",
        "Pricing26_SeasonalPromotionCard",
        "Pricing27_WhiteLabelPlatform",
        "Pricing28_AgencyPartnerTier",
        "Pricing29_MarketplaceSplitTier",
        "Pricing30_CorporateTreasury",
        "Pricing31_InstantPayoutCards",
        "Pricing32_ComplianceShieldTier",
        "Pricing33_OpenBankingA2A",
        "Pricing34_CustomDeploymentPaaS",
        "Pricing35_AllFeaturesFullComparison"
]
    },
    testimonials: {
      title: 'Testimonials & Reviews (30)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Testimonials01_ExecutiveHeadshots",
        "Testimonials02_Quote3ColGrid",
        "Testimonials03_StarRatingCarousel",
        "Testimonials04_CustomerMetricsHighlight",
        "Testimonials05_DarkTestimonialBanner",
        "Testimonials06_SplitMediaQuote",
        "Testimonials07_LogoCloudReviews",
        "Testimonials08_VideoTestimonialCards",
        "Testimonials09_MasonrySocialWall",
        "Testimonials10_EnterpriseCaseStudyRow",
        "Testimonials11_SingleFeaturedHeroQuote",
        "Testimonials12_AvatarTickerMarquee",
        "Testimonials13_IndustrySpecificTabs",
        "Testimonials14_FounderLetterStatement",
        "Testimonials15_Compact2ColMinimal",
        "Testimonials16_StatsPairedReview",
        "Testimonials17_TrustScoreHeader",
        "Testimonials18_CustomerMapPinpoints",
        "Testimonials19_DetailedTimelineReview",
        "Testimonials20_SecurityAuditorQuote",
        "Testimonials21_CardSliderControls",
        "Testimonials22_SpeechBubbleCards",
        "Testimonials23_KycSuccessStory",
        "Testimonials24_B2CMerchantSpotlight",
        "Testimonials25_CfoPerspectiveQuote",
        "Testimonials26_DeveloperApiPraise",
        "Testimonials27_CustomerAwardShowcase",
        "Testimonials28_BeforeAfterNarrative",
        "Testimonials29_CommunityQuotesWall",
        "Testimonials30_FinalCalloutQuote"
]
    },
    faqs: {
      title: 'FAQs & Support (20)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Faqs01_RadixAccordionSingle",
        "Faqs02_TwoColumnSearchable",
        "Faqs03_SupportCalloutBanner",
        "Faqs04_CategoryTabbedAccordion",
        "Faqs05_BorderedCardGrid",
        "Faqs06_AirwallexKycSpecific",
        "Faqs07_PricingBillingDetails",
        "Faqs08_TechnicalIntegrationFaq",
        "Faqs09_DarkMinimalAccordion",
        "Faqs10_SplitSideHeading",
        "Faqs11_HelpCenterHeader",
        "Faqs12_MultiColumnMinimal",
        "Faqs13_CardAccordionBordered",
        "Faqs14_SlaUptimeQuestions",
        "Faqs15_PhysicalShippingFaq",
        "Faqs16_InteractiveFilterChips",
        "Faqs17_ConsultationMeetingFaq",
        "Faqs18_ComplianceGdprFaq",
        "Faqs19_PaymentGatewayMethods",
        "Faqs20_FullWidthExpansionHero"
]
    },
    contact: {
      title: 'Contact & Lead Routing (25)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Contact01_TwoColWithMap",
        "Contact02_FormspreeLeadRouter",
        "Contact03_MeetingBookingWidget",
        "Contact04_SplitCardOfficeHours",
        "Contact05_DarkContrastForm",
        "Contact06_FloatingChatTrigger",
        "Contact07_DirectDepartmentRouting",
        "Contact08_MinimalistCleanInputs",
        "Contact09_PhonePriorityHotline",
        "Contact10_SecurityVulnerabilityDesk",
        "Contact11_RfqQuoteConfigurator",
        "Contact12_AirwallexKycSupportDesk",
        "Contact13_SalesDemoScheduler",
        "Contact14_SocialChannelGrid",
        "Contact15_EmergencyIncidentEscalation",
        "Contact16_WholesaleB2BInquiry",
        "Contact17_PressAndMediaRelations",
        "Contact18_PhysicalHQVisitorGuide",
        "Contact19_FeedbackSurveyForm",
        "Contact20_InvestorRelationsDesk",
        "Contact21_RecruitmentTalentForm",
        "Contact22_VendorProcurementPortal",
        "Contact23_BespokePartnershipProposal",
        "Contact24_MultiLocationDirectory",
        "Contact25_DirectWhatsappButtonHero"
]
    },
    footers: {
      title: 'Compliance Footers (25)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Footers01_ComplianceFinePrintBar",
        "Footers02_CardSchemeBadges",
        "Footers03_FourColumnEnterprise",
        "Footers04_DarkHighContrast",
        "Footers05_AirwallexPartnerBadge",
        "Footers06_LegalDisclaimersExpanded",
        "Footers07_CentredMinimalist",
        "Footers08_NewsletterEmbedded",
        "Footers09_MultiLanguageCurrency",
        "Footers10_SecurityBadgesRow",
        "Footers11_SplitNewsletterDirectory",
        "Footers12_SocialMediaBar",
        "Footers13_StatusPageIndicator",
        "Footers14_EcommercePolicyFocused",
        "Footers15_SaaSAppCompact",
        "Footers16_OfficeLocationsRow",
        "Footers17_MegaFooterSitemap",
        "Footers18_BackToTopFloating",
        "Footers19_WhitelabelCleanBar",
        "Footers20_TrustSealRow",
        "Footers21_SimpleCopyrightOnly",
        "Footers22_AppDownloadButtons",
        "Footers23_CookiePreferencesBar",
        "Footers24_DualTierStatutory",
        "Footers25_ModernGlassmorphic"
]
    },
    policies: {
      title: 'Statutory Policies (15)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Policies01_SowTermsOfService",
        "Policies02_PhysicalRmaReturns",
        "Policies03_SaaSCommercialSla",
        "Policies04_GdprPrivacyFramework",
        "Policies05_AirwallexMerchantTerms",
        "Policies06_AcceptableUsePolicy",
        "Policies07_SecurityVulnerabilityPolicy",
        "Policies08_ShippingFreightPolicy",
        "Policies09_CookiePolicyAndTracking",
        "Policies10_IntellectualPropertyCopyright",
        "Policies11_AntiMoneyLaunderingAml",
        "Policies12_SubprocessorsList",
        "Policies13_DisputeResolutionEscrow",
        "Policies14_ConsumerWarrantyNotice",
        "Policies15_MasterServiceAgreement"
]
    },
    ctas: {
      title: 'High-Impact CTAs (30)',
      visible: true,
      defaultExpanded: true,
      components: [
        "Ctas01_DarkModeBanner",
        "Ctas02_NewsletterSubscription",
        "Ctas03_ConsultationTrigger",
        "Ctas04_FreeTrialInstantAccess",
        "Ctas05_SplitCardWithMetrics",
        "Ctas06_AccentGradientHero",
        "Ctas07_AirwallexKycFastTrack",
        "Ctas08_TwoTierActionChoice",
        "Ctas09_MinimalistInlineBar",
        "Ctas10_AppStoreMobilePrompt",
        "Ctas11_EnterpriseRfqBanner",
        "Ctas12_InteractiveEstimatorCta",
        "Ctas13_CardOverlapElevated",
        "Ctas14_DeveloperApiDocumentation",
        "Ctas15_UrgentLimitedWindow",
        "Ctas16_ContactSalesSplitCard",
        "Ctas17_CommunityDiscordJoin",
        "Ctas18_WholesaleVolumeInquiry",
        "Ctas19_GuaranteedMoneyBack",
        "Ctas20_WhiteLabelResellerTrigger",
        "Ctas21_SecurityAuditReportDownload",
        "Ctas22_ZeroDowntimeMigration",
        "Ctas23_VideoProductTourPrompt",
        "Ctas24_InvestorPitchDeckRequest",
        "Ctas25_MultiLocationGlobalCta",
        "Ctas26_PhysicalTerminalOrdering",
        "Ctas27_AnnualDiscountBanner",
        "Ctas28_ExecutivePodcastWebinar",
        "Ctas29_CustomerLoyaltyPerks",
        "Ctas30_FinalClosingCallToAction"
]
    },

    headers: {
      title: 'Navigation Headers (25)',
      visible: true,
      defaultExpanded: true,
      components: [
        'HeaderStickyBlurDefault',
        'HeaderStickyBlurBordered',
        'HeaderStickyBlurDark',
        'HeaderStickyBlurFloating',
        'HeaderStickyBlurMinimal',
        'HeaderMegaMenuSolutions',
        'HeaderMegaMenuDeveloper',
        'HeaderMegaMenuFintech',
        'HeaderMegaMenuEnterprise',
        'HeaderMegaMenuTwoColumn',
        'HeaderEcomCartDefault',
        'HeaderEcomCartSearch',
        'HeaderEcomCartPromoBar',
        'HeaderEcomCartCompact',
        'HeaderEcomCartLuxury',
        'HeaderMonogramClassic',
        'HeaderMonogramModern',
        'HeaderMonogramBold',
        'HeaderMonogramAgency',
        'HeaderSplitLinksBalanced',
        'HeaderSplitLinksWide',
        'HeaderSplitLinksAction',
        'HeaderCenteredStack',
        'HeaderCenteredClean',
        'HeaderCenteredEditorial'
      ]
    },
    heros: {
      title: 'Hero Sections (45)',
      visible: true,
      defaultExpanded: true,
      components: [
        'HeroSplitDefault',
        'HeroSplitReverse',
        'HeroSplitForm',
        'HeroSplitCards',
        'HeroSplitStats',
        'HeroSplitTerminal',
        'HeroSplitCheckout',
        'HeroSplitGradient',
        'HeroCenteredBadgeDefault',
        'HeroCenteredBadgeGlow',
        'HeroCenteredBadgeMinimal',
        'HeroCenteredBadgeRatings',
        'HeroCenteredBadgeDualCta',
        'HeroCenteredBadgeSearch',
        'HeroCenteredBadgeLaunch',
        'HeroAppMockupBrowser',
        'HeroAppMockupDashboard',
        'HeroAppMockupDarkStudio',
        'HeroAppMockupFloatingCards',
        'HeroAppMockupIsometric',
        'HeroAppMockupGlass',
        'HeroAppMockupInteractive',
        'HeroVideoBackdropCinematic',
        'HeroVideoBackdropModal',
        'HeroVideoBackdropSplit',
        'HeroVideoBackdropMinimal',
        'HeroVideoBackdropProduct',
        'HeroVideoBackdropTestimonial',
        'HeroMultiDeviceDesktopMobile',
        'HeroMultiDeviceTrio',
        'HeroMultiDeviceFloating',
        'HeroMultiDeviceTabletFocus',
        'HeroMultiDeviceResponsive',
        'HeroMultiDeviceCardGrid',
        'HeroBentoAsymmetric',
        'HeroBentoInteractive',
        'HeroBentoFintech',
        'HeroBentoSaaS',
        'HeroBentoDarkGrid',
        'HeroBentoMinimal',
        'HeroMinimalEditorial',
        'HeroMinimalSans',
        'HeroMinimalStatement',
        'HeroMinimalBadgeOnly',
        'HeroMinimalSplitText'
      ]
    },
    logos: {
      title: 'Social Proof & Partner Logos (20)',
      visible: true,
      defaultExpanded: true,
      components: [
        'LogoGridMonochrome5',
        'LogoGridMonochrome6',
        'LogoGridMonochromeCards',
        'LogoGridMonochromeSplit',
        'LogoGridMonochromeStats',
        'LogoMarqueeTickerDefault',
        'LogoMarqueeTickerDual',
        'LogoMarqueeTickerCards',
        'LogoMarqueeTickerDark',
        'LogoMarqueeTickerQuotes',
        'LogoInvestorBadgesTopTier',
        'LogoInvestorBadgesFunding',
        'LogoInvestorBadgesAngelRow',
        'LogoInvestorBadgesCards',
        'LogoInvestorBadgesMinimal',
        'LogoTrustRatingPillG2',
        'LogoTrustRatingPillTrustpilot',
        'LogoTrustRatingPillSecurity',
        'LogoTrustRatingPillAvatars',
        'LogoTrustRatingPillCombined'
      ]
    },
    bentos: {
      title: 'Bento Grid Features (60)',
      visible: true,
      defaultExpanded: true,
      components: [
        'BentoAsymLargeLeft',
        'BentoAsymLargeRight',
        'BentoAsymSplitDiagonal',
        'BentoAsymStatHighlight',
        'BentoAsymCardOverhang',
        'BentoAsymFintechFlow',
        'BentoAsymDeveloperSplit',
        'BentoAsymSecurityVault',
        'BentoAsymAnalyticsSplit',
        'BentoAsymTeamCollab',
        'BentoAsymSpeedLatency',
        'BentoAsymEcomInventory',
        'BentoAsymAutomationRules',
        'BentoAsymInvoiceEngine',
        'BentoAsymComplianceShield',
        'Bento3x3Classic',
        'Bento3x3CenterHighlight',
        'Bento3x3TopSpan',
        'Bento3x3BottomSpan',
        'Bento3x3Mosaic',
        'Bento3x3DarkCyber',
        'Bento3x3MetricsGrid',
        'Bento3x3Integrations',
        'Bento3x3SecurityStack',
        'Bento3x3EcommerceTools',
        'Bento3x3AIAssistant',
        'Bento3x3DevExperience',
        'Bento3x3GlobalReach',
        'Bento3x3CustomerCare',
        'Bento3x3MinimalMono',
        'BentoTabsSolutions',
        'BentoTabsDevelopers',
        'BentoTabsIndustries',
        'BentoTabsLifecycle',
        'BentoTabsArchitecture',
        'BentoTabsCompliance',
        'BentoTabsPaymentMethods',
        'BentoTabsPricingTiers',
        'BentoTabsDataAnalytics',
        'BentoTabsAutomationTemplates',
        'BentoMetricProcessingVolume',
        'BentoMetricUptimeSLA',
        'BentoMetricGlobalCountries',
        'BentoMetricCustomerGrowth',
        'BentoMetricCostSavings',
        'BentoMetricSubMillisecond',
        'BentoMetricFraudPrevention',
        'BentoMetricDeveloperAdoption',
        'BentoMetricCarbonNeutral',
        'BentoMetricROIExecutive',
        'BentoCodeRestAPI',
        'BentoCodeWebhooks',
        'BentoCodeReactComponent',
        'BentoCodeGraphQLQuery',
        'BentoCodePythonData',
        'BentoCodeMobileSwift',
        'BentoCodeGoMicroservice',
        'BentoCodeDockerCompose',
        'BentoCodeSQLReconciliation',
        'BentoCodeAuthTokens'
      ]
    }
  },
  components: {
    Stats01_Simple4Col: {
      label: 'Stats01_ Simple4 Col',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats01_Simple4Col'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats02_BorderedPills: {
      label: 'Stats02_ Bordered Pills',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats02_BorderedPills'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats03_AccentBackground: {
      label: 'Stats03_ Accent Background',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats03_AccentBackground'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats04_TimelineGrowth: {
      label: 'Stats04_ Timeline Growth',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats04_TimelineGrowth'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats05_CardGridWithIcons: {
      label: 'Stats05_ Card Grid With Icons',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats05_CardGridWithIcons'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats06_SplitWithHeading: {
      label: 'Stats06_ Split With Heading',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats06_SplitWithHeading'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats07_DarkMinimalist: {
      label: 'Stats07_ Dark Minimalist',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats07_DarkMinimalist'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats08_ComparisonMetrics: {
      label: 'Stats08_ Comparison Metrics',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats08_ComparisonMetrics'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats09_FloatingCardOverlap: {
      label: 'Stats09_ Floating Card Overlap',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats09_FloatingCardOverlap'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats10_GradientBorderCards: {
      label: 'Stats10_ Gradient Border Cards',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats10_GradientBorderCards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats11_KpiDeltaIndicators: {
      label: 'Stats11_ Kpi Delta Indicators',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats11_KpiDeltaIndicators'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats12_GlobalFootprint: {
      label: 'Stats12_ Global Footprint',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats12_GlobalFootprint'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats13_CustomerTrustBar: {
      label: 'Stats13_ Customer Trust Bar',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats13_CustomerTrustBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats14_StackedDividerGrid: {
      label: 'Stats14_ Stacked Divider Grid',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats14_StackedDividerGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats15_GlassmorphicTiles: {
      label: 'Stats15_ Glassmorphic Tiles',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats15_GlassmorphicTiles'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats16_AirwallexKycStats: {
      label: 'Stats16_ Airwallex Kyc Stats',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats16_AirwallexKycStats'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats17_CircularProgressStats: {
      label: 'Stats17_ Circular Progress Stats',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats17_CircularProgressStats'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats18_InteractiveTabsStats: {
      label: 'Stats18_ Interactive Tabs Stats',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats18_InteractiveTabsStats'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats19_MarqueeTicker: {
      label: 'Stats19_ Marquee Ticker',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats19_MarqueeTicker'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Stats20_BannerWithCTA: {
      label: 'Stats20_ Banner With C T A',
      render: (props: any) => {
        const Comp = (StatsBlocks as any)['Stats20_BannerWithCTA'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing01_TieredSaaS3Cards: {
      label: 'Pricing01_ Tiered Saa S3 Cards',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing01_TieredSaaS3Cards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing02_MonthlyAnnualSwitch: {
      label: 'Pricing02_ Monthly Annual Switch',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing02_MonthlyAnnualSwitch'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing03_PhysicalB2CGrid: {
      label: 'Pricing03_ Physical B2 C Grid',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing03_PhysicalB2CGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing04_SowRetainerTable: {
      label: 'Pricing04_ Sow Retainer Table',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing04_SowRetainerTable'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing05_EnterpriseFeatureMatrix: {
      label: 'Pricing05_ Enterprise Feature Matrix',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing05_EnterpriseFeatureMatrix'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing06_UsageBasedSlider: {
      label: 'Pricing06_ Usage Based Slider',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing06_UsageBasedSlider'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing07_HorizontalSingleCard: {
      label: 'Pricing07_ Horizontal Single Card',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing07_HorizontalSingleCard'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing08_FourTierCorporate: {
      label: 'Pricing08_ Four Tier Corporate',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing08_FourTierCorporate'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing09_DarkGlowSpotlight: {
      label: 'Pricing09_ Dark Glow Spotlight',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing09_DarkGlowSpotlight'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing10_EcommerceBundleCards: {
      label: 'Pricing10_ Ecommerce Bundle Cards',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing10_EcommerceBundleCards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing11_PayAsYouGoMeter: {
      label: 'Pricing11_ Pay As You Go Meter',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing11_PayAsYouGoMeter'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing12_StartupDiscountTier: {
      label: 'Pricing12_ Startup Discount Tier',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing12_StartupDiscountTier'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing13_HighTicketRetainer: {
      label: 'Pricing13_ High Ticket Retainer',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing13_HighTicketRetainer'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing14_AddonAdditives: {
      label: 'Pricing14_ Addon Additives',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing14_AddonAdditives'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing15_FreeTrialBanner: {
      label: 'Pricing15_ Free Trial Banner',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing15_FreeTrialBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing16_MultiCurrencyTable: {
      label: 'Pricing16_ Multi Currency Table',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing16_MultiCurrencyTable'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing17_LifetimeLicenseCard: {
      label: 'Pricing17_ Lifetime License Card',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing17_LifetimeLicenseCard'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing18_PerSeatCollaborative: {
      label: 'Pricing18_ Per Seat Collaborative',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing18_PerSeatCollaborative'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing19_CardSchemeAcquiring: {
      label: 'Pricing19_ Card Scheme Acquiring',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing19_CardSchemeAcquiring'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing20_HardwareLeasingGrid: {
      label: 'Pricing20_ Hardware Leasing Grid',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing20_HardwareLeasingGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing21_DeveloperAPITiers: {
      label: 'Pricing21_ Developer A P I Tiers',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing21_DeveloperAPITiers'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing22_VolumeDiscountTier: {
      label: 'Pricing22_ Volume Discount Tier',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing22_VolumeDiscountTier'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing23_DedicatedSLAContract: {
      label: 'Pricing23_ Dedicated S L A Contract',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing23_DedicatedSLAContract'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing24_CryptoFiatGateway: {
      label: 'Pricing24_ Crypto Fiat Gateway',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing24_CryptoFiatGateway'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing25_BespokeEnterpriseQuote: {
      label: 'Pricing25_ Bespoke Enterprise Quote',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing25_BespokeEnterpriseQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing26_SeasonalPromotionCard: {
      label: 'Pricing26_ Seasonal Promotion Card',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing26_SeasonalPromotionCard'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing27_WhiteLabelPlatform: {
      label: 'Pricing27_ White Label Platform',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing27_WhiteLabelPlatform'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing28_AgencyPartnerTier: {
      label: 'Pricing28_ Agency Partner Tier',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing28_AgencyPartnerTier'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing29_MarketplaceSplitTier: {
      label: 'Pricing29_ Marketplace Split Tier',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing29_MarketplaceSplitTier'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing30_CorporateTreasury: {
      label: 'Pricing30_ Corporate Treasury',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing30_CorporateTreasury'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing31_InstantPayoutCards: {
      label: 'Pricing31_ Instant Payout Cards',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing31_InstantPayoutCards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing32_ComplianceShieldTier: {
      label: 'Pricing32_ Compliance Shield Tier',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing32_ComplianceShieldTier'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing33_OpenBankingA2A: {
      label: 'Pricing33_ Open Banking A2 A',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing33_OpenBankingA2A'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing34_CustomDeploymentPaaS: {
      label: 'Pricing34_ Custom Deployment Paa S',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing34_CustomDeploymentPaaS'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Pricing35_AllFeaturesFullComparison: {
      label: 'Pricing35_ All Features Full Comparison',
      render: (props: any) => {
        const Comp = (PricingBlocks as any)['Pricing35_AllFeaturesFullComparison'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials01_ExecutiveHeadshots: {
      label: 'Testimonials01_ Executive Headshots',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials01_ExecutiveHeadshots'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials02_Quote3ColGrid: {
      label: 'Testimonials02_ Quote3 Col Grid',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials02_Quote3ColGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials03_StarRatingCarousel: {
      label: 'Testimonials03_ Star Rating Carousel',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials03_StarRatingCarousel'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials04_CustomerMetricsHighlight: {
      label: 'Testimonials04_ Customer Metrics Highlight',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials04_CustomerMetricsHighlight'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials05_DarkTestimonialBanner: {
      label: 'Testimonials05_ Dark Testimonial Banner',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials05_DarkTestimonialBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials06_SplitMediaQuote: {
      label: 'Testimonials06_ Split Media Quote',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials06_SplitMediaQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials07_LogoCloudReviews: {
      label: 'Testimonials07_ Logo Cloud Reviews',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials07_LogoCloudReviews'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials08_VideoTestimonialCards: {
      label: 'Testimonials08_ Video Testimonial Cards',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials08_VideoTestimonialCards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials09_MasonrySocialWall: {
      label: 'Testimonials09_ Masonry Social Wall',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials09_MasonrySocialWall'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials10_EnterpriseCaseStudyRow: {
      label: 'Testimonials10_ Enterprise Case Study Row',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials10_EnterpriseCaseStudyRow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials11_SingleFeaturedHeroQuote: {
      label: 'Testimonials11_ Single Featured Hero Quote',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials11_SingleFeaturedHeroQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials12_AvatarTickerMarquee: {
      label: 'Testimonials12_ Avatar Ticker Marquee',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials12_AvatarTickerMarquee'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials13_IndustrySpecificTabs: {
      label: 'Testimonials13_ Industry Specific Tabs',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials13_IndustrySpecificTabs'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials14_FounderLetterStatement: {
      label: 'Testimonials14_ Founder Letter Statement',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials14_FounderLetterStatement'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials15_Compact2ColMinimal: {
      label: 'Testimonials15_ Compact2 Col Minimal',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials15_Compact2ColMinimal'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials16_StatsPairedReview: {
      label: 'Testimonials16_ Stats Paired Review',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials16_StatsPairedReview'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials17_TrustScoreHeader: {
      label: 'Testimonials17_ Trust Score Header',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials17_TrustScoreHeader'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials18_CustomerMapPinpoints: {
      label: 'Testimonials18_ Customer Map Pinpoints',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials18_CustomerMapPinpoints'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials19_DetailedTimelineReview: {
      label: 'Testimonials19_ Detailed Timeline Review',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials19_DetailedTimelineReview'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials20_SecurityAuditorQuote: {
      label: 'Testimonials20_ Security Auditor Quote',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials20_SecurityAuditorQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials21_CardSliderControls: {
      label: 'Testimonials21_ Card Slider Controls',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials21_CardSliderControls'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials22_SpeechBubbleCards: {
      label: 'Testimonials22_ Speech Bubble Cards',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials22_SpeechBubbleCards'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials23_KycSuccessStory: {
      label: 'Testimonials23_ Kyc Success Story',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials23_KycSuccessStory'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials24_B2CMerchantSpotlight: {
      label: 'Testimonials24_ B2 C Merchant Spotlight',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials24_B2CMerchantSpotlight'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials25_CfoPerspectiveQuote: {
      label: 'Testimonials25_ Cfo Perspective Quote',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials25_CfoPerspectiveQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials26_DeveloperApiPraise: {
      label: 'Testimonials26_ Developer Api Praise',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials26_DeveloperApiPraise'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials27_CustomerAwardShowcase: {
      label: 'Testimonials27_ Customer Award Showcase',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials27_CustomerAwardShowcase'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials28_BeforeAfterNarrative: {
      label: 'Testimonials28_ Before After Narrative',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials28_BeforeAfterNarrative'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials29_CommunityQuotesWall: {
      label: 'Testimonials29_ Community Quotes Wall',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials29_CommunityQuotesWall'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Testimonials30_FinalCalloutQuote: {
      label: 'Testimonials30_ Final Callout Quote',
      render: (props: any) => {
        const Comp = (TestimonialsBlocks as any)['Testimonials30_FinalCalloutQuote'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs01_RadixAccordionSingle: {
      label: 'Faqs01_ Radix Accordion Single',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs01_RadixAccordionSingle'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs02_TwoColumnSearchable: {
      label: 'Faqs02_ Two Column Searchable',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs02_TwoColumnSearchable'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs03_SupportCalloutBanner: {
      label: 'Faqs03_ Support Callout Banner',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs03_SupportCalloutBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs04_CategoryTabbedAccordion: {
      label: 'Faqs04_ Category Tabbed Accordion',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs04_CategoryTabbedAccordion'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs05_BorderedCardGrid: {
      label: 'Faqs05_ Bordered Card Grid',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs05_BorderedCardGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs06_AirwallexKycSpecific: {
      label: 'Faqs06_ Airwallex Kyc Specific',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs06_AirwallexKycSpecific'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs07_PricingBillingDetails: {
      label: 'Faqs07_ Pricing Billing Details',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs07_PricingBillingDetails'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs08_TechnicalIntegrationFaq: {
      label: 'Faqs08_ Technical Integration Faq',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs08_TechnicalIntegrationFaq'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs09_DarkMinimalAccordion: {
      label: 'Faqs09_ Dark Minimal Accordion',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs09_DarkMinimalAccordion'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs10_SplitSideHeading: {
      label: 'Faqs10_ Split Side Heading',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs10_SplitSideHeading'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs11_HelpCenterHeader: {
      label: 'Faqs11_ Help Center Header',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs11_HelpCenterHeader'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs12_MultiColumnMinimal: {
      label: 'Faqs12_ Multi Column Minimal',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs12_MultiColumnMinimal'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs13_CardAccordionBordered: {
      label: 'Faqs13_ Card Accordion Bordered',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs13_CardAccordionBordered'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs14_SlaUptimeQuestions: {
      label: 'Faqs14_ Sla Uptime Questions',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs14_SlaUptimeQuestions'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs15_PhysicalShippingFaq: {
      label: 'Faqs15_ Physical Shipping Faq',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs15_PhysicalShippingFaq'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs16_InteractiveFilterChips: {
      label: 'Faqs16_ Interactive Filter Chips',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs16_InteractiveFilterChips'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs17_ConsultationMeetingFaq: {
      label: 'Faqs17_ Consultation Meeting Faq',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs17_ConsultationMeetingFaq'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs18_ComplianceGdprFaq: {
      label: 'Faqs18_ Compliance Gdpr Faq',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs18_ComplianceGdprFaq'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs19_PaymentGatewayMethods: {
      label: 'Faqs19_ Payment Gateway Methods',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs19_PaymentGatewayMethods'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Faqs20_FullWidthExpansionHero: {
      label: 'Faqs20_ Full Width Expansion Hero',
      render: (props: any) => {
        const Comp = (FaqsBlocks as any)['Faqs20_FullWidthExpansionHero'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact01_TwoColWithMap: {
      label: 'Contact01_ Two Col With Map',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact01_TwoColWithMap'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact02_FormspreeLeadRouter: {
      label: 'Contact02_ Formspree Lead Router',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact02_FormspreeLeadRouter'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact03_MeetingBookingWidget: {
      label: 'Contact03_ Meeting Booking Widget',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact03_MeetingBookingWidget'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact04_SplitCardOfficeHours: {
      label: 'Contact04_ Split Card Office Hours',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact04_SplitCardOfficeHours'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact05_DarkContrastForm: {
      label: 'Contact05_ Dark Contrast Form',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact05_DarkContrastForm'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact06_FloatingChatTrigger: {
      label: 'Contact06_ Floating Chat Trigger',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact06_FloatingChatTrigger'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact07_DirectDepartmentRouting: {
      label: 'Contact07_ Direct Department Routing',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact07_DirectDepartmentRouting'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact08_MinimalistCleanInputs: {
      label: 'Contact08_ Minimalist Clean Inputs',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact08_MinimalistCleanInputs'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact09_PhonePriorityHotline: {
      label: 'Contact09_ Phone Priority Hotline',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact09_PhonePriorityHotline'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact10_SecurityVulnerabilityDesk: {
      label: 'Contact10_ Security Vulnerability Desk',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact10_SecurityVulnerabilityDesk'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact11_RfqQuoteConfigurator: {
      label: 'Contact11_ Rfq Quote Configurator',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact11_RfqQuoteConfigurator'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact12_AirwallexKycSupportDesk: {
      label: 'Contact12_ Airwallex Kyc Support Desk',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact12_AirwallexKycSupportDesk'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact13_SalesDemoScheduler: {
      label: 'Contact13_ Sales Demo Scheduler',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact13_SalesDemoScheduler'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact14_SocialChannelGrid: {
      label: 'Contact14_ Social Channel Grid',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact14_SocialChannelGrid'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact15_EmergencyIncidentEscalation: {
      label: 'Contact15_ Emergency Incident Escalation',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact15_EmergencyIncidentEscalation'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact16_WholesaleB2BInquiry: {
      label: 'Contact16_ Wholesale B2 B Inquiry',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact16_WholesaleB2BInquiry'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact17_PressAndMediaRelations: {
      label: 'Contact17_ Press And Media Relations',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact17_PressAndMediaRelations'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact18_PhysicalHQVisitorGuide: {
      label: 'Contact18_ Physical H Q Visitor Guide',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact18_PhysicalHQVisitorGuide'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact19_FeedbackSurveyForm: {
      label: 'Contact19_ Feedback Survey Form',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact19_FeedbackSurveyForm'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact20_InvestorRelationsDesk: {
      label: 'Contact20_ Investor Relations Desk',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact20_InvestorRelationsDesk'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact21_RecruitmentTalentForm: {
      label: 'Contact21_ Recruitment Talent Form',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact21_RecruitmentTalentForm'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact22_VendorProcurementPortal: {
      label: 'Contact22_ Vendor Procurement Portal',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact22_VendorProcurementPortal'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact23_BespokePartnershipProposal: {
      label: 'Contact23_ Bespoke Partnership Proposal',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact23_BespokePartnershipProposal'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact24_MultiLocationDirectory: {
      label: 'Contact24_ Multi Location Directory',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact24_MultiLocationDirectory'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Contact25_DirectWhatsappButtonHero: {
      label: 'Contact25_ Direct Whatsapp Button Hero',
      render: (props: any) => {
        const Comp = (ContactBlocks as any)['Contact25_DirectWhatsappButtonHero'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers01_ComplianceFinePrintBar: {
      label: 'Footers01_ Compliance Fine Print Bar',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers01_ComplianceFinePrintBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers02_CardSchemeBadges: {
      label: 'Footers02_ Card Scheme Badges',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers02_CardSchemeBadges'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers03_FourColumnEnterprise: {
      label: 'Footers03_ Four Column Enterprise',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers03_FourColumnEnterprise'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers04_DarkHighContrast: {
      label: 'Footers04_ Dark High Contrast',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers04_DarkHighContrast'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers05_AirwallexPartnerBadge: {
      label: 'Footers05_ Airwallex Partner Badge',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers05_AirwallexPartnerBadge'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers06_LegalDisclaimersExpanded: {
      label: 'Footers06_ Legal Disclaimers Expanded',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers06_LegalDisclaimersExpanded'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers07_CentredMinimalist: {
      label: 'Footers07_ Centred Minimalist',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers07_CentredMinimalist'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers08_NewsletterEmbedded: {
      label: 'Footers08_ Newsletter Embedded',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers08_NewsletterEmbedded'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers09_MultiLanguageCurrency: {
      label: 'Footers09_ Multi Language Currency',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers09_MultiLanguageCurrency'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers10_SecurityBadgesRow: {
      label: 'Footers10_ Security Badges Row',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers10_SecurityBadgesRow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers11_SplitNewsletterDirectory: {
      label: 'Footers11_ Split Newsletter Directory',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers11_SplitNewsletterDirectory'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers12_SocialMediaBar: {
      label: 'Footers12_ Social Media Bar',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers12_SocialMediaBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers13_StatusPageIndicator: {
      label: 'Footers13_ Status Page Indicator',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers13_StatusPageIndicator'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers14_EcommercePolicyFocused: {
      label: 'Footers14_ Ecommerce Policy Focused',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers14_EcommercePolicyFocused'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers15_SaaSAppCompact: {
      label: 'Footers15_ Saa S App Compact',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers15_SaaSAppCompact'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers16_OfficeLocationsRow: {
      label: 'Footers16_ Office Locations Row',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers16_OfficeLocationsRow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers17_MegaFooterSitemap: {
      label: 'Footers17_ Mega Footer Sitemap',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers17_MegaFooterSitemap'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers18_BackToTopFloating: {
      label: 'Footers18_ Back To Top Floating',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers18_BackToTopFloating'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers19_WhitelabelCleanBar: {
      label: 'Footers19_ Whitelabel Clean Bar',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers19_WhitelabelCleanBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers20_TrustSealRow: {
      label: 'Footers20_ Trust Seal Row',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers20_TrustSealRow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers21_SimpleCopyrightOnly: {
      label: 'Footers21_ Simple Copyright Only',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers21_SimpleCopyrightOnly'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers22_AppDownloadButtons: {
      label: 'Footers22_ App Download Buttons',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers22_AppDownloadButtons'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers23_CookiePreferencesBar: {
      label: 'Footers23_ Cookie Preferences Bar',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers23_CookiePreferencesBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers24_DualTierStatutory: {
      label: 'Footers24_ Dual Tier Statutory',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers24_DualTierStatutory'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Footers25_ModernGlassmorphic: {
      label: 'Footers25_ Modern Glassmorphic',
      render: (props: any) => {
        const Comp = (FootersBlocks as any)['Footers25_ModernGlassmorphic'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies01_SowTermsOfService: {
      label: 'Policies01_ Sow Terms Of Service',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies01_SowTermsOfService'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies02_PhysicalRmaReturns: {
      label: 'Policies02_ Physical Rma Returns',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies02_PhysicalRmaReturns'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies03_SaaSCommercialSla: {
      label: 'Policies03_ Saa S Commercial Sla',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies03_SaaSCommercialSla'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies04_GdprPrivacyFramework: {
      label: 'Policies04_ Gdpr Privacy Framework',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies04_GdprPrivacyFramework'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies05_AirwallexMerchantTerms: {
      label: 'Policies05_ Airwallex Merchant Terms',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies05_AirwallexMerchantTerms'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies06_AcceptableUsePolicy: {
      label: 'Policies06_ Acceptable Use Policy',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies06_AcceptableUsePolicy'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies07_SecurityVulnerabilityPolicy: {
      label: 'Policies07_ Security Vulnerability Policy',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies07_SecurityVulnerabilityPolicy'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies08_ShippingFreightPolicy: {
      label: 'Policies08_ Shipping Freight Policy',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies08_ShippingFreightPolicy'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies09_CookiePolicyAndTracking: {
      label: 'Policies09_ Cookie Policy And Tracking',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies09_CookiePolicyAndTracking'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies10_IntellectualPropertyCopyright: {
      label: 'Policies10_ Intellectual Property Copyright',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies10_IntellectualPropertyCopyright'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies11_AntiMoneyLaunderingAml: {
      label: 'Policies11_ Anti Money Laundering Aml',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies11_AntiMoneyLaunderingAml'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies12_SubprocessorsList: {
      label: 'Policies12_ Subprocessors List',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies12_SubprocessorsList'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies13_DisputeResolutionEscrow: {
      label: 'Policies13_ Dispute Resolution Escrow',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies13_DisputeResolutionEscrow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies14_ConsumerWarrantyNotice: {
      label: 'Policies14_ Consumer Warranty Notice',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies14_ConsumerWarrantyNotice'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Policies15_MasterServiceAgreement: {
      label: 'Policies15_ Master Service Agreement',
      render: (props: any) => {
        const Comp = (PoliciesBlocks as any)['Policies15_MasterServiceAgreement'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas01_DarkModeBanner: {
      label: 'Ctas01_ Dark Mode Banner',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas01_DarkModeBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas02_NewsletterSubscription: {
      label: 'Ctas02_ Newsletter Subscription',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas02_NewsletterSubscription'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas03_ConsultationTrigger: {
      label: 'Ctas03_ Consultation Trigger',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas03_ConsultationTrigger'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas04_FreeTrialInstantAccess: {
      label: 'Ctas04_ Free Trial Instant Access',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas04_FreeTrialInstantAccess'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas05_SplitCardWithMetrics: {
      label: 'Ctas05_ Split Card With Metrics',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas05_SplitCardWithMetrics'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas06_AccentGradientHero: {
      label: 'Ctas06_ Accent Gradient Hero',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas06_AccentGradientHero'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas07_AirwallexKycFastTrack: {
      label: 'Ctas07_ Airwallex Kyc Fast Track',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas07_AirwallexKycFastTrack'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas08_TwoTierActionChoice: {
      label: 'Ctas08_ Two Tier Action Choice',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas08_TwoTierActionChoice'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas09_MinimalistInlineBar: {
      label: 'Ctas09_ Minimalist Inline Bar',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas09_MinimalistInlineBar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas10_AppStoreMobilePrompt: {
      label: 'Ctas10_ App Store Mobile Prompt',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas10_AppStoreMobilePrompt'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas11_EnterpriseRfqBanner: {
      label: 'Ctas11_ Enterprise Rfq Banner',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas11_EnterpriseRfqBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas12_InteractiveEstimatorCta: {
      label: 'Ctas12_ Interactive Estimator Cta',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas12_InteractiveEstimatorCta'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas13_CardOverlapElevated: {
      label: 'Ctas13_ Card Overlap Elevated',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas13_CardOverlapElevated'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas14_DeveloperApiDocumentation: {
      label: 'Ctas14_ Developer Api Documentation',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas14_DeveloperApiDocumentation'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas15_UrgentLimitedWindow: {
      label: 'Ctas15_ Urgent Limited Window',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas15_UrgentLimitedWindow'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas16_ContactSalesSplitCard: {
      label: 'Ctas16_ Contact Sales Split Card',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas16_ContactSalesSplitCard'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas17_CommunityDiscordJoin: {
      label: 'Ctas17_ Community Discord Join',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas17_CommunityDiscordJoin'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas18_WholesaleVolumeInquiry: {
      label: 'Ctas18_ Wholesale Volume Inquiry',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas18_WholesaleVolumeInquiry'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas19_GuaranteedMoneyBack: {
      label: 'Ctas19_ Guaranteed Money Back',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas19_GuaranteedMoneyBack'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas20_WhiteLabelResellerTrigger: {
      label: 'Ctas20_ White Label Reseller Trigger',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas20_WhiteLabelResellerTrigger'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas21_SecurityAuditReportDownload: {
      label: 'Ctas21_ Security Audit Report Download',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas21_SecurityAuditReportDownload'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas22_ZeroDowntimeMigration: {
      label: 'Ctas22_ Zero Downtime Migration',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas22_ZeroDowntimeMigration'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas23_VideoProductTourPrompt: {
      label: 'Ctas23_ Video Product Tour Prompt',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas23_VideoProductTourPrompt'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas24_InvestorPitchDeckRequest: {
      label: 'Ctas24_ Investor Pitch Deck Request',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas24_InvestorPitchDeckRequest'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas25_MultiLocationGlobalCta: {
      label: 'Ctas25_ Multi Location Global Cta',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas25_MultiLocationGlobalCta'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas26_PhysicalTerminalOrdering: {
      label: 'Ctas26_ Physical Terminal Ordering',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas26_PhysicalTerminalOrdering'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas27_AnnualDiscountBanner: {
      label: 'Ctas27_ Annual Discount Banner',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas27_AnnualDiscountBanner'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas28_ExecutivePodcastWebinar: {
      label: 'Ctas28_ Executive Podcast Webinar',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas28_ExecutivePodcastWebinar'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas29_CustomerLoyaltyPerks: {
      label: 'Ctas29_ Customer Loyalty Perks',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas29_CustomerLoyaltyPerks'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },
    Ctas30_FinalClosingCallToAction: {
      label: 'Ctas30_ Final Closing Call To Action',
      render: (props: any) => {
        const Comp = (CtasBlocks as any)['Ctas30_FinalClosingCallToAction'];
        return Comp ? React.createElement(Comp, props) : null;
      },
      fields: {
        badge: { type: 'text' },
        headline: { type: 'text' },
        description: { type: 'textarea' },
      }
    },

    // 25 Headers
    HeaderStickyBlurDefault: HeaderStickyBlurDefaultConfig,
    HeaderStickyBlurBordered: HeaderStickyBlurBorderedConfig,
    HeaderStickyBlurDark: HeaderStickyBlurDarkConfig,
    HeaderStickyBlurFloating: HeaderStickyBlurFloatingConfig,
    HeaderStickyBlurMinimal: HeaderStickyBlurMinimalConfig,
    HeaderMegaMenuSolutions: HeaderMegaMenuSolutionsConfig,
    HeaderMegaMenuDeveloper: HeaderMegaMenuDeveloperConfig,
    HeaderMegaMenuFintech: HeaderMegaMenuFintechConfig,
    HeaderMegaMenuEnterprise: HeaderMegaMenuEnterpriseConfig,
    HeaderMegaMenuTwoColumn: HeaderMegaMenuTwoColumnConfig,
    HeaderEcomCartDefault: HeaderEcomCartDefaultConfig,
    HeaderEcomCartSearch: HeaderEcomCartSearchConfig,
    HeaderEcomCartPromoBar: HeaderEcomCartPromoBarConfig,
    HeaderEcomCartCompact: HeaderEcomCartCompactConfig,
    HeaderEcomCartLuxury: HeaderEcomCartLuxuryConfig,
    HeaderMonogramClassic: HeaderMonogramClassicConfig,
    HeaderMonogramModern: HeaderMonogramModernConfig,
    HeaderMonogramBold: HeaderMonogramBoldConfig,
    HeaderMonogramAgency: HeaderMonogramAgencyConfig,
    HeaderSplitLinksBalanced: HeaderSplitLinksBalancedConfig,
    HeaderSplitLinksWide: HeaderSplitLinksWideConfig,
    HeaderSplitLinksAction: HeaderSplitLinksActionConfig,
    HeaderCenteredStack: HeaderCenteredStackConfig,
    HeaderCenteredClean: HeaderCenteredCleanConfig,
    HeaderCenteredEditorial: HeaderCenteredEditorialConfig,

    // 45 Heros
    HeroSplitDefault: HeroSplitDefaultConfig,
    HeroSplitReverse: HeroSplitReverseConfig,
    HeroSplitForm: HeroSplitFormConfig,
    HeroSplitCards: HeroSplitCardsConfig,
    HeroSplitStats: HeroSplitStatsConfig,
    HeroSplitTerminal: HeroSplitTerminalConfig,
    HeroSplitCheckout: HeroSplitCheckoutConfig,
    HeroSplitGradient: HeroSplitGradientConfig,
    HeroCenteredBadgeDefault: HeroCenteredBadgeDefaultConfig,
    HeroCenteredBadgeGlow: HeroCenteredBadgeGlowConfig,
    HeroCenteredBadgeMinimal: HeroCenteredBadgeMinimalConfig,
    HeroCenteredBadgeRatings: HeroCenteredBadgeRatingsConfig,
    HeroCenteredBadgeDualCta: HeroCenteredBadgeDualCtaConfig,
    HeroCenteredBadgeSearch: HeroCenteredBadgeSearchConfig,
    HeroCenteredBadgeLaunch: HeroCenteredBadgeLaunchConfig,
    HeroAppMockupBrowser: HeroAppMockupBrowserConfig,
    HeroAppMockupDashboard: HeroAppMockupDashboardConfig,
    HeroAppMockupDarkStudio: HeroAppMockupDarkStudioConfig,
    HeroAppMockupFloatingCards: HeroAppMockupFloatingCardsConfig,
    HeroAppMockupIsometric: HeroAppMockupIsometricConfig,
    HeroAppMockupGlass: HeroAppMockupGlassConfig,
    HeroAppMockupInteractive: HeroAppMockupInteractiveConfig,
    HeroVideoBackdropCinematic: HeroVideoBackdropCinematicConfig,
    HeroVideoBackdropModal: HeroVideoBackdropModalConfig,
    HeroVideoBackdropSplit: HeroVideoBackdropSplitConfig,
    HeroVideoBackdropMinimal: HeroVideoBackdropMinimalConfig,
    HeroVideoBackdropProduct: HeroVideoBackdropProductConfig,
    HeroVideoBackdropTestimonial: HeroVideoBackdropTestimonialConfig,
    HeroMultiDeviceDesktopMobile: HeroMultiDeviceDesktopMobileConfig,
    HeroMultiDeviceTrio: HeroMultiDeviceTrioConfig,
    HeroMultiDeviceFloating: HeroMultiDeviceFloatingConfig,
    HeroMultiDeviceTabletFocus: HeroMultiDeviceTabletFocusConfig,
    HeroMultiDeviceResponsive: HeroMultiDeviceResponsiveConfig,
    HeroMultiDeviceCardGrid: HeroMultiDeviceCardGridConfig,
    HeroBentoAsymmetric: HeroBentoAsymmetricConfig,
    HeroBentoInteractive: HeroBentoInteractiveConfig,
    HeroBentoFintech: HeroBentoFintechConfig,
    HeroBentoSaaS: HeroBentoSaaSConfig,
    HeroBentoDarkGrid: HeroBentoDarkGridConfig,
    HeroBentoMinimal: HeroBentoMinimalConfig,
    HeroMinimalEditorial: HeroMinimalEditorialConfig,
    HeroMinimalSans: HeroMinimalSansConfig,
    HeroMinimalStatement: HeroMinimalStatementConfig,
    HeroMinimalBadgeOnly: HeroMinimalBadgeOnlyConfig,
    HeroMinimalSplitText: HeroMinimalSplitTextConfig,

    // 20 Social Proof Logos
    LogoGridMonochrome5: LogoGridMonochrome5Config,
    LogoGridMonochrome6: LogoGridMonochrome6Config,
    LogoGridMonochromeCards: LogoGridMonochromeCardsConfig,
    LogoGridMonochromeSplit: LogoGridMonochromeSplitConfig,
    LogoGridMonochromeStats: LogoGridMonochromeStatsConfig,
    LogoMarqueeTickerDefault: LogoMarqueeTickerDefaultConfig,
    LogoMarqueeTickerDual: LogoMarqueeTickerDualConfig,
    LogoMarqueeTickerCards: LogoMarqueeTickerCardsConfig,
    LogoMarqueeTickerDark: LogoMarqueeTickerDarkConfig,
    LogoMarqueeTickerQuotes: LogoMarqueeTickerQuotesConfig,
    LogoInvestorBadgesTopTier: LogoInvestorBadgesTopTierConfig,
    LogoInvestorBadgesFunding: LogoInvestorBadgesFundingConfig,
    LogoInvestorBadgesAngelRow: LogoInvestorBadgesAngelRowConfig,
    LogoInvestorBadgesCards: LogoInvestorBadgesCardsConfig,
    LogoInvestorBadgesMinimal: LogoInvestorBadgesMinimalConfig,
    LogoTrustRatingPillG2: LogoTrustRatingPillG2Config,
    LogoTrustRatingPillTrustpilot: LogoTrustRatingPillTrustpilotConfig,
    LogoTrustRatingPillSecurity: LogoTrustRatingPillSecurityConfig,
    LogoTrustRatingPillAvatars: LogoTrustRatingPillAvatarsConfig,
    LogoTrustRatingPillCombined: LogoTrustRatingPillCombinedConfig,

    // 60 Bento Grids
    BentoAsymLargeLeft: BentoAsymLargeLeftConfig,
    BentoAsymLargeRight: BentoAsymLargeRightConfig,
    BentoAsymSplitDiagonal: BentoAsymSplitDiagonalConfig,
    BentoAsymStatHighlight: BentoAsymStatHighlightConfig,
    BentoAsymCardOverhang: BentoAsymCardOverhangConfig,
    BentoAsymFintechFlow: BentoAsymFintechFlowConfig,
    BentoAsymDeveloperSplit: BentoAsymDeveloperSplitConfig,
    BentoAsymSecurityVault: BentoAsymSecurityVaultConfig,
    BentoAsymAnalyticsSplit: BentoAsymAnalyticsSplitConfig,
    BentoAsymTeamCollab: BentoAsymTeamCollabConfig,
    BentoAsymSpeedLatency: BentoAsymSpeedLatencyConfig,
    BentoAsymEcomInventory: BentoAsymEcomInventoryConfig,
    BentoAsymAutomationRules: BentoAsymAutomationRulesConfig,
    BentoAsymInvoiceEngine: BentoAsymInvoiceEngineConfig,
    BentoAsymComplianceShield: BentoAsymComplianceShieldConfig,
    Bento3x3Classic: Bento3x3ClassicConfig,
    Bento3x3CenterHighlight: Bento3x3CenterHighlightConfig,
    Bento3x3TopSpan: Bento3x3TopSpanConfig,
    Bento3x3BottomSpan: Bento3x3BottomSpanConfig,
    Bento3x3Mosaic: Bento3x3MosaicConfig,
    Bento3x3DarkCyber: Bento3x3DarkCyberConfig,
    Bento3x3MetricsGrid: Bento3x3MetricsGridConfig,
    Bento3x3Integrations: Bento3x3IntegrationsConfig,
    Bento3x3SecurityStack: Bento3x3SecurityStackConfig,
    Bento3x3EcommerceTools: Bento3x3EcommerceToolsConfig,
    Bento3x3AIAssistant: Bento3x3AIAssistantConfig,
    Bento3x3DevExperience: Bento3x3DevExperienceConfig,
    Bento3x3GlobalReach: Bento3x3GlobalReachConfig,
    Bento3x3CustomerCare: Bento3x3CustomerCareConfig,
    Bento3x3MinimalMono: Bento3x3MinimalMonoConfig,
    BentoTabsSolutions: BentoTabsSolutionsConfig,
    BentoTabsDevelopers: BentoTabsDevelopersConfig,
    BentoTabsIndustries: BentoTabsIndustriesConfig,
    BentoTabsLifecycle: BentoTabsLifecycleConfig,
    BentoTabsArchitecture: BentoTabsArchitectureConfig,
    BentoTabsCompliance: BentoTabsComplianceConfig,
    BentoTabsPaymentMethods: BentoTabsPaymentMethodsConfig,
    BentoTabsPricingTiers: BentoTabsPricingTiersConfig,
    BentoTabsDataAnalytics: BentoTabsDataAnalyticsConfig,
    BentoTabsAutomationTemplates: BentoTabsAutomationTemplatesConfig,
    BentoMetricProcessingVolume: BentoMetricProcessingVolumeConfig,
    BentoMetricUptimeSLA: BentoMetricUptimeSLAConfig,
    BentoMetricGlobalCountries: BentoMetricGlobalCountriesConfig,
    BentoMetricCustomerGrowth: BentoMetricCustomerGrowthConfig,
    BentoMetricCostSavings: BentoMetricCostSavingsConfig,
    BentoMetricSubMillisecond: BentoMetricSubMillisecondConfig,
    BentoMetricFraudPrevention: BentoMetricFraudPreventionConfig,
    BentoMetricDeveloperAdoption: BentoMetricDeveloperAdoptionConfig,
    BentoMetricCarbonNeutral: BentoMetricCarbonNeutralConfig,
    BentoMetricROIExecutive: BentoMetricROIExecutiveConfig,
    BentoCodeRestAPI: BentoCodeRestAPIConfig,
    BentoCodeWebhooks: BentoCodeWebhooksConfig,
    BentoCodeReactComponent: BentoCodeReactComponentConfig,
    BentoCodeGraphQLQuery: BentoCodeGraphQLQueryConfig,
    BentoCodePythonData: BentoCodePythonDataConfig,
    BentoCodeMobileSwift: BentoCodeMobileSwiftConfig,
    BentoCodeGoMicroservice: BentoCodeGoMicroserviceConfig,
    BentoCodeDockerCompose: BentoCodeDockerComposeConfig,
    BentoCodeSQLReconciliation: BentoCodeSQLReconciliationConfig,
    BentoCodeAuthTokens: BentoCodeAuthTokensConfig
  }
};

export default puckConfig;
