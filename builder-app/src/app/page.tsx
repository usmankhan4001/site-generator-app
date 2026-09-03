import Link from 'next/link';
import { ALL_STUDIO_TEMPLATES } from '@/data/templates/allTemplates';

export const dynamic = 'force-static';

const GROUPS: { key: 'tech' | 'retail' | 'hosting'; label: string }[] = [
  { key: 'tech', label: 'Software & Tech Consulting' },
  { key: 'retail', label: 'E-Commerce & Retail' },
  { key: 'hosting', label: 'Web Hosting & Infrastructure' },
];

export default function StudioHome() {
  const total = ALL_STUDIO_TEMPLATES.length;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground">
          Airwallex Site Cloner — Studio
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Template catalogue</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {total} compliance-ready business templates. Open one to preview the real
          multi-page site the studio generates — every route, live theming. The
          configurator, editing and one-click deploy land in the next phases.
        </p>
      </header>

      {GROUPS.map((group) => {
        const items = ALL_STUDIO_TEMPLATES.filter((t) => t.group === group.key);
        if (!items.length) return null;
        return (
          <section key={group.key} className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
              <span className="ml-2 font-normal text-muted-foreground/60">{items.length}</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <Link
                  key={t.id}
                  href={`/preview/${t.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.previewImage}
                      alt={t.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: t.accentColor }}
                      />
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {t.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold leading-tight">{t.name}</h3>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {t.tagline || t.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
