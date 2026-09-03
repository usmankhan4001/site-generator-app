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

export interface SiteRendererProps {
  content: SiteContent;
  /** Route path ('/', '/about', '/policies/privacy', …) or a page `key`. */
  page: string;
  /** Studio preview mode — adds data-attributes used for click-to-select. */
  preview?: boolean;
}

export function SiteRenderer({ content, page, preview = false }: SiteRendererProps) {
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

  const sections = enabledSections(resolved);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Header content={content} />

      <main className="flex-1">
        {sections.map((section) => {
          const Component = getSectionComponent(section.type);
          if (!Component) return null;
          return (
            <div
              key={section.id}
              data-section-id={preview ? section.id : undefined}
              data-section-type={preview ? section.type : undefined}
            >
              {/* props shape is guaranteed by the discriminated union on Section */}
              <Component props={section.props as never} content={content} />
            </div>
          );
        })}
      </main>

      <Footer content={content} />
    </div>
  );
}

export default SiteRenderer;
