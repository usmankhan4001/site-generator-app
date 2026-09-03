import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { PageHeaderProps, SiteContent } from '@/site/schema';

/**
 * Inner-page hero band. Optional breadcrumb trail, dot-pill eyebrow, the page
 * `<h1>`, a subtitle and an optional meta line (e.g. a response-time promise).
 */
export default function PageHeader({
  props,
}: {
  props: PageHeaderProps;
  content: SiteContent;
}) {
  const { eyebrow, headline, subtitle, meta, breadcrumb } = props;

  return (
    <section className="border-b border-border bg-muted/20 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb?.length ? (
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-6"
          >
            {breadcrumb.map((crumb, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <span key={`${crumb.href}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
                  {isLast ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? (
            <div className="dot-pill mb-4">
              <span className="dot-indicator" />
              <span>{eyebrow}</span>
            </div>
          ) : null}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {headline}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          ) : null}
          {meta ? (
            <p className="mt-4 text-sm font-medium text-primary">{meta}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
