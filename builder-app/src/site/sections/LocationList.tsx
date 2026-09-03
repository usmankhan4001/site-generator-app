import { MapPin } from 'lucide-react';
import type { LocationListProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/**
 * Locations / facilities. Rich `places` render as address cards; otherwise the
 * plain `locations` string list renders as a tidy chip grid. No real map.
 */
export default function LocationList({
  props,
  content,
}: {
  props: LocationListProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, places, locations } = props;

  if (!places?.length && !locations?.length) return null;

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title ?? 'Locations'}
          description={description}
          align="center"
          className="mb-14"
        />

        {places?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((p, i) => (
              <div
                key={i}
                className="card-elevated rounded-2xl p-6 border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground">{p.city}</h3>
                {p.facility ? (
                  <p className="text-xs font-semibold text-primary mt-1">{p.facility}</p>
                ) : null}
                {p.address ? (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {p.address}
                  </p>
                ) : null}
                {p.role ? (
                  <p className="text-xs text-muted-foreground mt-2">{p.role}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-2 text-sm font-medium text-foreground"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {loc}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
