import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { HeroProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { resolveVariant, resolveLayoutSystem } from '@/site/layoutSystems';
import { resolveArchetype, archetypeHeroVariant, hasArchetype } from '@/site/archetypes';

type HeroLayout = 'centered' | 'split' | 'stacked' | 'editorial';

/**
 * Hero — page opener. Renders the single <h1> for the home page.
 * `props.layout` is an explicit author override; otherwise the effective
 * layout is determined by the site's archetype (or per-template hash variant).
 * CTAs are real <Link> navigations, never onClick handlers.
 */
export default function Hero({ props, content }: { props: HeroProps; content: SiteContent }) {
  const {
    badge,
    headline,
    accentText,
    subtitle,
    primaryCta,
    secondaryCta,
    image,
    trustBadges,
  } = props;

  const layout: HeroLayout = !image
    ? 'centered'
    : (props.layout ??
      (hasArchetype(content)
        ? archetypeHeroVariant(resolveArchetype(content))
        : (['split', 'centered', 'stacked'] as const)[resolveVariant(content, 'hero', 3)]));

  const isAtelier = resolveLayoutSystem(content) === 'atelier';

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

  if (layout === 'editorial') {
    return (
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            {badge &&
              (isAtelier ? (
                <span
                  className="block text-sm italic text-primary tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {badge}
                </span>
              ) : (
                badgePill
              ))}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground leading-[1.05]"
              style={isAtelier ? { fontFamily: 'var(--font-display)' } : undefined}
            >
              {headline}
              {accentText && (
                <>
                  {' '}
                  <span className={isAtelier ? 'italic text-primary' : 'text-primary'}>
                    {accentText}
                  </span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              {subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">{ctaButtons}</div>
            {trust && (
              <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border/40">
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
            <div className="mt-12 md:mt-16 w-full overflow-hidden bg-muted">
              <img
                src={image}
                alt={headline}
                className="w-full h-auto max-h-[640px] md:max-h-[720px] object-cover object-center"
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

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

  if (layout === 'stacked') {
    return (
      <section className="relative pb-16 md:pb-24 overflow-hidden">
        {image && (
          <div className="w-full aspect-21/9 max-h-[520px] overflow-hidden">
            <img
              src={image}
              alt={headline}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center -mt-10 md:-mt-16 relative">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm">
              {badgePill && <div className="mb-5 flex justify-center">{badgePill}</div>}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-5">
                {headline}
                {accentText && <> <span className="text-primary">{accentText}</span></>}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-7">
                {subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3.5">{ctaButtons}</div>
              {trust && (
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground pt-6 mt-6 border-t border-border/60">
                  {trust.map((t, idx) => (
                    <div key={idx} className="inline-flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
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
