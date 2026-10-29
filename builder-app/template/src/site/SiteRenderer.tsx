/**
 * SiteRenderer — the one component that turns `SiteContent` + a page path into
 * the rendered page. Used by the studio preview and by every generated site's
 * per-route page shell (each shell is ~3 lines around this).
 *
 * Server component. Theme application (CSS variables / fonts) is the caller's
 * job: generated sites get it from the globals.css :root block; the studio
 * preview wraps this in a scoped style object (see themeToStyleObject).
 */

import type { SiteContent } from '@/site/schema';
import { getPage, enabledSections } from '@/site/schema';
import Header from '@/site/sections/Header';
import Footer from '@/site/sections/Footer';
import { getSectionComponent } from '@/site/sections/registry';
import { CartDrawer } from '@/site/commerce/CartDrawer';
import { MobileStickyBar } from '@/site/sections/_shared/MobileStickyBar';

export interface SiteRendererProps {
  content: SiteContent;
  /** Route path ('/', '/about', '/policies/privacy', …) or a page `key`. */
  page: string;
  /** Studio preview mode — adds data-attributes used for click-to-select. */
  preview?: boolean;
  /** Active device context for explicit preview filtering */
  device?: 'desktop' | 'tablet' | 'mobile';
}

export function SiteRenderer({ content, page, preview = false, device }: SiteRendererProps) {
  const resolved =
    getPage(content, page) ?? content.pages.find((p) => p.key === page);

  if (!resolved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p className="text-sm text-muted-foreground">
          Page not found: <code>{page}</code>
        </p>
      </div>
    );
  }

  const sections = enabledSections(resolved).filter((section) => {
    const vis = section.breakpointVisibility ?? 'all';
    if (vis === 'all') return true;
    if (device === 'mobile' && vis === 'desktop-only') return false;
    if (device === 'desktop' && vis === 'mobile-only') return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      {/* Enforce fluid typography clamps on all section titles and subtitles */}
      <style>{`
        [data-section-id] h1,
        [data-section-id] .section-title,
        [data-edit-prop="title"],
        [data-edit-prop="headline"] {
          font-size: clamp(1.85rem, 1.25rem + 2.5vw, 3.5rem) !important;
          line-height: 1.15 !important;
        }
        [data-section-id] h2 {
          font-size: clamp(1.65rem, 1.15rem + 2vw, 2.75rem) !important;
          line-height: 1.2 !important;
        }
        [data-section-id] .section-subtitle,
        [data-edit-prop="subtitle"],
        [data-edit-prop="description"] {
          font-size: clamp(0.95rem, 0.85rem + 0.5vw, 1.25rem) !important;
          line-height: 1.55 !important;
        }
      `}</style>
      <div
        data-section-id={preview ? 'header' : undefined}
        data-section-type={preview ? 'header' : undefined}
      >
        <Header content={content} />
      </div>

      <main className="flex-1">
        {sections.map((section) => {
          const Component = getSectionComponent(section.type);
          if (!Component) return null;
          const visibilityClass =
            section.breakpointVisibility === 'desktop-only'
              ? 'hidden md:block'
              : section.breakpointVisibility === 'mobile-only'
              ? 'block md:hidden'
              : undefined;

          return (
            <div
              key={section.id}
              data-section-id={preview ? section.id : undefined}
              data-section-type={preview ? section.type : undefined}
              className={visibilityClass}
            >
              {/* props shape is guaranteed by the discriminated union on Section */}
              <Component props={section.props as never} content={content} />
            </div>
          );
        })}
      </main>

      <div
        data-section-id={preview ? 'footer' : undefined}
        data-section-type={preview ? 'footer' : undefined}
      >
        <Footer content={content} />
      </div>
      <MobileStickyBar content={content} currentPagePath={resolved.path} />
      <CartDrawer
        merchantName={content.business?.name}
        checkoutUrl={content.airwallexCheckoutUrl || '/checkout'}
      />
    </div>
  );
}

export default SiteRenderer;
