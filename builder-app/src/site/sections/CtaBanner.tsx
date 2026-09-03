import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CtaBannerProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';

/**
 * CtaBanner — centred conversion band. Up to two <Link> CTAs plus an optional
 * small guarantee line underneath.
 */
export default function CtaBanner({ props }: { props: CtaBannerProps; content: SiteContent }) {
  const { headline, subtitle, primaryCta, secondaryCta, guarantee } = props;
  if (!headline) return null;

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">{headline}</h2>
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}

        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            {primaryCta && (
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold shadow-sm">
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
          </div>
        )}

        {guarantee && <p className="mt-5 text-xs text-muted-foreground">{guarantee}</p>}
      </div>
    </section>
  );
}
