import type { TimelineProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/**
 * Vertical timeline of milestones — a left rail with dots, `.card-elevated`
 * content panels, section header from eyebrow / title / description.
 */
export default function Timeline({
  props,
  content,
}: {
  props: TimelineProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, milestones } = props;

  if (!milestones?.length) return null;

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title ?? 'Our Journey'}
          description={description}
          align="center"
          className="mb-14"
        />

        <div className="relative max-w-3xl mx-auto">
          <div
            className="absolute left-3 top-2 bottom-2 w-px bg-border"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {milestones.map((m, i) => (
              <li key={i} className="relative pl-12">
                <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 ring-4 ring-background">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <div className="card-elevated rounded-2xl p-6 border border-border bg-card">
                  <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">
                    {m.year}
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
