/**
 * Studio live preview.
 *
 * Renders the exact `<SiteRenderer>` a generated site would, inside a wrapper
 * scoped with the theme's CSS variables so themes switch without touching a
 * stylesheet. Phase 1: `[id]` is a template id (from the normalizer). Phase 2
 * swaps this to a project id backed by Prisma and moves it into an iframe.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteRenderer } from '@/site/SiteRenderer';
import { getTheme, themeToStyleObject, THEMES_LIST } from '@/site/themes';
import { getNormalizedTemplate } from '@/lib/normalizeTemplates';

export const dynamic = 'force-dynamic';

function googleFontsHref(families: string[]): string {
  const q = families
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; theme?: string; accent?: string }>;
}) {
  const { id } = await params;
  const { page = '/', theme: themeOverride, accent } = await searchParams;

  const content = getNormalizedTemplate(id);
  if (!content) notFound();

  const theme = getTheme(themeOverride || content.themeId);
  // The project's brand accent applies to its own theme; when a reviewer is
  // explicitly trying another theme, show that theme's own primary unless an
  // accent is passed too.
  const effectiveAccent = accent || (themeOverride ? undefined : content.accent);
  const style = themeToStyleObject(theme, effectiveAccent);

  const mkHref = (next: Partial<{ page: string; theme: string }>) => {
    const sp = new URLSearchParams();
    sp.set('page', next.page ?? page);
    const t = next.theme ?? themeOverride;
    if (t) sp.set('theme', t);
    if (accent) sp.set('accent', accent);
    return `/preview/${id}?${sp.toString()}`;
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={googleFontsHref(theme.googleFonts)} />

      {/* Studio chrome — not part of the generated site */}
      <div className="sticky top-0 z-[100] flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border bg-background/95 px-4 py-2 text-xs backdrop-blur">
        <Link href="/" className="font-semibold text-muted-foreground hover:text-foreground">
          ← Studio
        </Link>
        <span className="text-foreground/90 font-medium">{content.business.name}</span>
        <nav className="flex flex-wrap items-center gap-1">
          {content.pages.map((p) => (
            <Link
              key={p.key}
              href={mkHref({ page: p.path })}
              className={`rounded px-2 py-1 transition-colors ${
                p.path === page
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {p.navLabel ?? p.title}
            </Link>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="text-muted-foreground">Theme</span>
          {THEMES_LIST.map((t) => (
            <Link
              key={t.id}
              href={mkHref({ theme: t.id })}
              title={t.name}
              className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
                t.id === theme.id ? 'border-foreground ring-1 ring-foreground' : 'border-border'
              }`}
              style={{ background: t.preview.accent }}
            />
          ))}
        </span>
      </div>

      <div className={theme.isDark ? 'dark' : undefined} style={style} data-preview-root>
        <SiteRenderer content={content} page={page} preview />
      </div>
    </>
  );
}
