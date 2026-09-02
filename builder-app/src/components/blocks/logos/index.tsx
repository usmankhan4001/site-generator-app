// Auto-generated Untitled UI Social Proof & Logos Block Registry (20 components)
'use client';

import React from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Users, 
  Lock, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { LogoProofBlockProps, PuckComponentConfig } from '../types';

export interface LogoBlockProps extends LogoProofBlockProps {
  className?: string;
}

const DEFAULT_LOGOS = [
  { name: 'Stripe', symbol: 'S', rating: '4.9', label: 'Payment Rail' },
  { name: 'Supabase', symbol: '⚡', rating: '5.0', label: 'Postgres DB' },
  { name: 'Vercel', symbol: '▲', rating: '4.9', label: 'Edge Network' },
  { name: 'Amazon AWS', symbol: '☁', rating: '4.8', label: 'Global Compute' },
  { name: 'GitHub', symbol: '🐙', rating: '5.0', label: 'Codebase CI/CD' },
  { name: 'Dokploy', symbol: '🐳', rating: '4.9', label: 'PaaS Engine' }
];

export function BaseLogoRenderer({
  variant = 'monochrome-grid',
  eyebrow = 'TRUSTED BY GLOBAL TEAMS',
  headline = 'Powering 12,000+ modern enterprises worldwide',
  description = 'Integrated directly with tier-1 payment gateways, institutional cloud infrastructure, and audited compliance networks.',
  logos = DEFAULT_LOGOS,
  ratingScore = '4.9/5',
  reviewCount = '2,400+ reviews',
  trustBadge = 'SOC2 Type II Certified',
  tickerSpeed = 25,
  className = ''
}: LogoBlockProps) {
  const isMarquee = variant.startsWith('marquee-tickers');
  const isInvestor = variant.startsWith('investor-badges');
  const isPill = variant.startsWith('trust-rating-pills');
  const isGrid = variant.startsWith('monochrome-grid');

  return (
    <section className={`py-12 sm:py-16 border-y border-border/50 bg-background/50 relative overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Eyebrow & Trust Rating */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              {eyebrow}
            </p>
          )}
          {headline && (
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
              {headline}
            </h3>
          )}
          {description && (
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {/* Social Proof Rating Bar (Star Rating & Avatars) */}
          {(isPill || variant.includes('Ratings') || variant.includes('Combined')) && (
            <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-muted/60 border border-border text-xs text-foreground">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold">{ratingScore}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{reviewCount}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {trustBadge}
              </span>
            </div>
          )}
        </div>

        {/* 1. MARQUEE TICKER DISPLAY */}
        {isMarquee && (
          <div className="relative w-full overflow-hidden mask-fade py-2">
            <div className="flex gap-8 sm:gap-12 animate-marquee whitespace-nowrap items-center">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    {logo.symbol || logo.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground tracking-tight">{logo.name}</span>
                    {logo.label && <p className="text-[10px] text-muted-foreground">{logo.label}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. INVESTOR VC CARDS DISPLAY */}
        {isInvestor && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {logos.slice(0, 4).map((logo, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-card border border-border/80 text-center hover:border-primary/50 transition-all hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center text-lg font-bold mb-3 group-hover:scale-110 transition-transform">
                  {logo.symbol || logo.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-foreground text-sm">{logo.name}</h4>
                <p className="text-[11px] text-muted-foreground mt-1">{logo.label || 'Lead Institutional'}</p>
                <div className="mt-2 text-[10px] text-emerald-500 font-medium inline-flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Tier-1 Partner
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. MONOCHROME LOGO GRID DISPLAY (Default) */}
        {!isMarquee && !isInvestor && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer group p-2"
              >
                <div className="w-8 h-8 rounded-lg bg-foreground/5 border border-border/60 flex items-center justify-center font-bold text-xs text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                  {logo.symbol || logo.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs sm:text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {logo.name}
                  </span>
                  {logo.rating && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {logo.rating}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export const logoPuckConfig: PuckComponentConfig<LogoBlockProps> = {
  label: 'Logo Social Proof Bar',
  defaultProps: {
    eyebrow: 'TRUSTED BY GLOBAL TEAMS',
    headline: 'Powering 12,000+ modern enterprises worldwide',
    description: 'Direct integrations with global banks, cloud hosts, and compliance providers.',
    ratingScore: '4.9/5',
    reviewCount: '2,400+ reviews',
    trustBadge: 'SOC2 Type II Certified'
  },
  fields: {
    eyebrow: { type: 'text', label: 'Eyebrow Text' },
    headline: { type: 'text', label: 'Headline' },
    description: { type: 'textarea', label: 'Description' },
    ratingScore: { type: 'text', label: 'Rating Score (e.g. 4.9/5)' },
    reviewCount: { type: 'text', label: 'Review Count' },
    trustBadge: { type: 'text', label: 'Security Badge' }
  },
  render: (props) => <BaseLogoRenderer {...props} />
};

// Logo Grid Monochrome 5-Col (monochrome-grid)
export function LogoGridMonochrome5(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="monochrome-grid"
      headline="Grid Monochrome 5-Col"
      {...props}
    />
  );
}

export const LogoGridMonochrome5Config: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Grid Monochrome 5-Col',
  render: (props) => <LogoGridMonochrome5 {...props} />
};

// Logo Grid Monochrome 6-Col (monochrome-grid)
export function LogoGridMonochrome6(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="monochrome-grid"
      headline="Grid Monochrome 6-Col"
      {...props}
    />
  );
}

export const LogoGridMonochrome6Config: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Grid Monochrome 6-Col',
  render: (props) => <LogoGridMonochrome6 {...props} />
};

// Logo Grid Card Tiles (monochrome-grid)
export function LogoGridMonochromeCards(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="monochrome-grid"
      headline="Grid Card Tiles"
      {...props}
    />
  );
}

export const LogoGridMonochromeCardsConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Grid Card Tiles',
  render: (props) => <LogoGridMonochromeCards {...props} />
};

// Logo Grid Split Trust Copy (monochrome-grid)
export function LogoGridMonochromeSplit(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="monochrome-grid"
      headline="Grid Split Trust Copy"
      {...props}
    />
  );
}

export const LogoGridMonochromeSplitConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Grid Split Trust Copy',
  render: (props) => <LogoGridMonochromeSplit {...props} />
};

// Logo Grid with Throughput Stat (monochrome-grid)
export function LogoGridMonochromeStats(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="monochrome-grid"
      headline="Grid with Throughput Stat"
      {...props}
    />
  );
}

export const LogoGridMonochromeStatsConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Grid with Throughput Stat',
  render: (props) => <LogoGridMonochromeStats {...props} />
};

// Logo Marquee Infinite Scroll (marquee-tickers)
export function LogoMarqueeTickerDefault(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="marquee-tickers"
      headline="Marquee Infinite Scroll"
      {...props}
    />
  );
}

export const LogoMarqueeTickerDefaultConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Marquee Infinite Scroll',
  render: (props) => <LogoMarqueeTickerDefault {...props} />
};

// Logo Marquee Dual Reverse (marquee-tickers)
export function LogoMarqueeTickerDual(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="marquee-tickers"
      headline="Marquee Dual Reverse"
      {...props}
    />
  );
}

export const LogoMarqueeTickerDualConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Marquee Dual Reverse',
  render: (props) => <LogoMarqueeTickerDual {...props} />
};

// Logo Marquee Floating Pills (marquee-tickers)
export function LogoMarqueeTickerCards(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="marquee-tickers"
      headline="Marquee Floating Pills"
      {...props}
    />
  );
}

export const LogoMarqueeTickerCardsConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Marquee Floating Pills',
  render: (props) => <LogoMarqueeTickerCards {...props} />
};

// Logo Marquee Dark Stealth (marquee-tickers)
export function LogoMarqueeTickerDark(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="marquee-tickers"
      headline="Marquee Dark Stealth"
      {...props}
    />
  );
}

export const LogoMarqueeTickerDarkConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Marquee Dark Stealth',
  render: (props) => <LogoMarqueeTickerDark {...props} />
};

// Logo Marquee Logo + Snippet (marquee-tickers)
export function LogoMarqueeTickerQuotes(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="marquee-tickers"
      headline="Marquee Logo + Snippet"
      {...props}
    />
  );
}

export const LogoMarqueeTickerQuotesConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Marquee Logo + Snippet',
  render: (props) => <LogoMarqueeTickerQuotes {...props} />
};

// Logo Investor Tier-1 VC Grid (investor-badges)
export function LogoInvestorBadgesTopTier(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="investor-badges"
      headline="Investor Tier-1 VC Grid"
      {...props}
    />
  );
}

export const LogoInvestorBadgesTopTierConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Investor Tier-1 VC Grid',
  render: (props) => <LogoInvestorBadgesTopTier {...props} />
};

// Logo Investor Series B Banner (investor-badges)
export function LogoInvestorBadgesFunding(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="investor-badges"
      headline="Investor Series B Banner"
      {...props}
    />
  );
}

export const LogoInvestorBadgesFundingConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Investor Series B Banner',
  render: (props) => <LogoInvestorBadgesFunding {...props} />
};

// Logo Investor Angel Operators (investor-badges)
export function LogoInvestorBadgesAngelRow(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="investor-badges"
      headline="Investor Angel Operators"
      {...props}
    />
  );
}

export const LogoInvestorBadgesAngelRowConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Investor Angel Operators',
  render: (props) => <LogoInvestorBadgesAngelRow {...props} />
};

// Logo Investor Elevated Cards (investor-badges)
export function LogoInvestorBadgesCards(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="investor-badges"
      headline="Investor Elevated Cards"
      {...props}
    />
  );
}

export const LogoInvestorBadgesCardsConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Investor Elevated Cards',
  render: (props) => <LogoInvestorBadgesCards {...props} />
};

// Logo Investor Minimal Wordmarks (investor-badges)
export function LogoInvestorBadgesMinimal(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="investor-badges"
      headline="Investor Minimal Wordmarks"
      {...props}
    />
  );
}

export const LogoInvestorBadgesMinimalConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Investor Minimal Wordmarks',
  render: (props) => <LogoInvestorBadgesMinimal {...props} />
};

// Logo Trust Rating G2 & Capterra (trust-rating-pills)
export function LogoTrustRatingPillG2(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="trust-rating-pills"
      headline="Trust Rating G2 & Capterra"
      {...props}
    />
  );
}

export const LogoTrustRatingPillG2Config: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Trust Rating G2 & Capterra',
  render: (props) => <LogoTrustRatingPillG2 {...props} />
};

// Logo Trust Rating Trustpilot 4.9 (trust-rating-pills)
export function LogoTrustRatingPillTrustpilot(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="trust-rating-pills"
      headline="Trust Rating Trustpilot 4.9"
      {...props}
    />
  );
}

export const LogoTrustRatingPillTrustpilotConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Trust Rating Trustpilot 4.9',
  render: (props) => <LogoTrustRatingPillTrustpilot {...props} />
};

// Logo Trust Rating SOC2 & ISO27001 (trust-rating-pills)
export function LogoTrustRatingPillSecurity(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="trust-rating-pills"
      headline="Trust Rating SOC2 & ISO27001"
      {...props}
    />
  );
}

export const LogoTrustRatingPillSecurityConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Trust Rating SOC2 & ISO27001',
  render: (props) => <LogoTrustRatingPillSecurity {...props} />
};

// Logo Trust Rating 10k+ Customers (trust-rating-pills)
export function LogoTrustRatingPillAvatars(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="trust-rating-pills"
      headline="Trust Rating 10k+ Customers"
      {...props}
    />
  );
}

export const LogoTrustRatingPillAvatarsConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Trust Rating 10k+ Customers',
  render: (props) => <LogoTrustRatingPillAvatars {...props} />
};

// Logo Trust Rating Unified Proof Bar (trust-rating-pills)
export function LogoTrustRatingPillCombined(props: LogoBlockProps) {
  return (
    <BaseLogoRenderer
      variant="trust-rating-pills"
      headline="Trust Rating Unified Proof Bar"
      {...props}
    />
  );
}

export const LogoTrustRatingPillCombinedConfig: PuckComponentConfig<LogoBlockProps> = {
  ...logoPuckConfig,
  label: 'Logo Trust Rating Unified Proof Bar',
  render: (props) => <LogoTrustRatingPillCombined {...props} />
};
