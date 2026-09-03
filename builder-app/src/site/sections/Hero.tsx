import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { HeroProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';

/**
 * Hero — page opener. Renders the single <h1> for the home page.
 * `props.layout` selects the centered (default) or split presentation.
 * CTAs are real <Link> navigations, never onClick handlers.
 */
export default function Hero({ props }: { props: HeroProps; content: SiteContent }) {
  const {
    badge,
    headline,
    accentText,
    subtitle,
    primaryCta,
    secondaryCta,
    image,
    trustBadges,
    layout = 'centered',
  } = props;

  const ctaButtons = (
    <>
      {primaryCta && (
        <Button asChild size="lg" className="h-12 px-7 text-base shadow-sm font-semibold">
          <Link href={primaryCta.href}>
            {primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
      {secondaryCta && (
        <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
          <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
        </Button>
      )}
    </>
  );

  const badgePill = badge ? (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold border border-border shadow-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span>{badge}</span>
    </div>
  ) : null;

  const trust = trustBadges?.length ? trustBadges : null;

  if (layout === 'split') {
    return (
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 text-left space-y-6">
              {badgePill}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
                {headline}
                {accentText && <> <span className="text-primary">{accentText}</span></>}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">{ctaButtons}</div>
              {trust && (
                <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pt-4 border-t border-border/60">
                  {trust.map((t, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              {image && (
                <div className="relative rounded-xl overflow-hidden border border-border bg-card">
                  <img
                    src={image}
                    alt={headline}
                    className="w-full h-auto aspect-4/3 object-cover object-center"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {badgePill && <div className="mb-6">{badgePill}</div>}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
            {headline}
            {accentText && <> <span className="text-primary">{accentText}</span></>}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">{ctaButtons}</div>
          {trust && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
              {trust.map((t, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {image && (
          <div className="mt-12 md:mt-16 rounded-xl overflow-hidden border border-border bg-card max-w-5xl mx-auto">
            <img
              src={image}
              alt={headline}
              className="w-full h-auto max-h-[540px] object-cover object-center"
              loading="eager"
            />
          </div>
        )}
      </div>
    </section>
  );
}
