'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroInfo } from '@/lib/constants';

interface HeroSectionProps {
  hero: HeroInfo;
  layout?: 'centered' | 'split';
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export function HeroSection({
  hero,
  layout = 'centered',
  onPrimaryCta,
  onSecondaryCta,
}: HeroSectionProps) {
  if (layout === 'split') {
    return (
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Dot Status Pill */}
              {hero.badge && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-border shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{hero.badge}</span>
                </div>
              )}

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                {hero.headline}{' '}
                <span className="text-primary">{hero.accentText}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button size="lg" onClick={onPrimaryCta} className="h-12 px-7 text-base shadow-sm font-semibold">
                  {hero.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {hero.secondaryCta && (
                  <Button size="lg" variant="outline" onClick={onSecondaryCta} className="h-12 px-7 text-base">
                    {hero.secondaryCta}
                  </Button>
                )}
              </div>

              {/* Trust Badges */}
              {hero.trustBadges && hero.trustBadges.length > 0 && (
                <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/60">
                  {hero.trustBadges.map((badge, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Showcase Image Column */}
            <div className="lg:col-span-5">
              {hero.image && (
                <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-card group">
                  <img
                    src={hero.image}
                    alt={hero.headline}
                    className="w-full h-auto aspect-4/3 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Centered Hero Layout (Default)
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Dot Status Pill */}
          {hero.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold mb-6 border border-border shadow-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>{hero.badge}</span>
            </div>
          )}

          {/* Display Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
            {hero.headline}{' '}
            <span className="text-primary">{hero.accentText}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            {hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <Button size="lg" onClick={onPrimaryCta} className="h-12 px-7 text-base shadow-sm font-semibold">
              {hero.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {hero.secondaryCta && (
              <Button size="lg" variant="outline" onClick={onSecondaryCta} className="h-12 px-7 text-base">
                {hero.secondaryCta}
              </Button>
            )}
          </div>

          {/* Trust Badges */}
          {hero.trustBadges && hero.trustBadges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
              {hero.trustBadges.map((badge, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Image Showcase */}
        {hero.image && (
          <div className="mt-12 md:mt-16 rounded-2xl overflow-hidden border border-border/80 shadow-2xl relative bg-card max-w-5xl mx-auto">
            <img
              src={hero.image}
              alt={hero.headline}
              className="w-full h-auto max-h-[540px] object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </section>
  );
}
