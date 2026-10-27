import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CtaBannerProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { cn } from '@/site/lib/cn';
import {
  resolveArchetypeStyle,
  sectionPadding,
  dividerClass,
  ctaProps,
} from '@/site/archetypes';

/**
 * CtaBanner — conversion band supporting:
 * - `centered` (default): centred headline, CTAs and optional guarantee line.
 * - `split_visual`: headline + CTAs on the left, a supporting image on the
 *   right — for businesses with a strong visual to close on.
 * - `gradient_banner`: full-bleed primary-colour gradient band with
 *   contrasting text — a bolder, higher-impact closer.
 */
export default function CtaBanner({
  props,
  content,
}: {
  props: CtaBannerProps;
  content: SiteContent;
}) {
  const { headline, subtitle, primaryCta, secondaryCta, guarantee, variant, image } = props;
  if (!headline) return null;

  const s = resolveArchetypeStyle(content);
  const cta = ctaProps(s);
  const isAtelier = s.treatment === 'atelier';
  const effectiveVariant = variant ?? 'centered';

  const headlineStyle = isAtelier ? { fontFamily: 'var(--font-display)' } : undefined;

  /* =========================================================================
   * 1. SPLIT VISUAL (copy + CTAs left, supporting image right)
   * ========================================================================= */
  if (effectiveVariant === 'split_visual' && image) {
    return (
      <section className={cn(sectionPadding(s), 'bg-muted/30 border-y border-border')}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-left">
              <h2
                data-edit-prop="headline"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
                style={headlineStyle}
              >
                {headline}
              </h2>
              {subtitle && (
                <p data-edit-prop="subtitle" className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  {primaryCta && (
                    <Button asChild size={cta.size} variant={cta.variant} className="h-12 px-7 text-base font-semibold shadow-sm">
                      <Link href={primaryCta.href}>
                        {primaryCta.label}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {secondaryCta && (
                    <Button asChild size={cta.size} variant="outline" className="h-12 px-7 text-base">
                      <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                    </Button>
                  )}
                </div>
              )}
              {guarantee && (
                <p className={cn('mt-5 text-xs text-muted-foreground', dividerClass(s) && 'pt-4 border-t border-border/40')}>
                  {guarantee}
                </p>
              )}
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
              <img
                src={image}
                alt={headline}
                loading="lazy"
                className="w-full h-auto aspect-4/3 object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 2. GRADIENT BANNER (bold full-bleed closer)
   * ========================================================================= */
  if (effectiveVariant === 'gradient_banner') {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-foreground/15 text-primary-foreground text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready when you are</span>
          </div>

          <h2
            data-edit-prop="headline"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground"
            style={headlineStyle}
          >
            {headline}
          </h2>
          {subtitle && (
            <p data-edit-prop="subtitle" className="mt-4 text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              {primaryCta && (
                <Button
                  asChild
                  size={cta.size}
                  className="h-12 px-7 text-base font-semibold shadow-lg bg-background text-foreground hover:bg-background/90"
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size={cta.size}
                  variant="outline"
                  className="h-12 px-7 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}

          {guarantee && (
            <p className="mt-5 text-xs text-primary-foreground/70">{guarantee}</p>
          )}
        </div>
      </section>
    );
  }

  /* =========================================================================
   * 3. DEFAULT (centred)
   * ========================================================================= */
  return (
    <section className={cn(sectionPadding(s), 'bg-muted/30 border-y border-border')}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          data-edit-prop="headline"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
          style={headlineStyle}
        >
          {headline}
        </h2>
        {subtitle && (
          <p data-edit-prop="subtitle" className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {primaryCta && (
              <Button
                asChild
                size={cta.size}
                variant={cta.variant}
                className="h-12 px-7 text-base font-semibold shadow-sm"
              >
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button asChild size={cta.size} variant="outline" className="h-12 px-7 text-base">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            )}
          </div>
        )}

        {guarantee && (
          <p
            className={cn(
              'mt-5 text-xs text-muted-foreground',
              dividerClass(s) && 'pt-4 border-t border-border/40',
            )}
          >
            {guarantee}
          </p>
        )}
      </div>
    </section>
  );
}
