import type { TeamGridProps, SiteContent } from '@/site/schema';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '--';
  return (parts[0]!.charAt(0) + (parts[1]?.charAt(0) ?? '')).toUpperCase();
}

/**
 * Leadership / team grid ported from the template about page. Image card with
 * name, role in primary, bio and optional credentials. Missing avatar falls back
 * to an initials tile. 2–4 columns, adaptive to member count.
 */
export default function TeamGrid({
  props,
}: {
  props: TeamGridProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, members } = props;

  if (!members?.length) return null;

  const lgCols =
    members.length >= 4
      ? 'lg:grid-cols-4'
      : members.length === 3
        ? 'lg:grid-cols-3'
        : 'lg:grid-cols-2';

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {eyebrow ? (
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-foreground">
            {title ?? 'Executive Leadership'}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          ) : null}
        </div>

        <div className={`grid gap-8 sm:grid-cols-2 ${lgCols}`}>
          {members.map((m, i) => (
            <div
              key={i}
              className="card-elevated rounded-2xl overflow-hidden border border-border bg-card"
            >
              <div className="h-48 w-full overflow-hidden bg-muted flex items-center justify-center">
                {m.avatar ? (
                  <img
                    src={m.avatar}
                    alt={m.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-3xl font-bold text-muted-foreground">
                    {initials(m.name)}
                  </span>
                )}
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-bold text-foreground text-lg">{m.name}</h3>
                <p className="text-xs font-semibold text-primary">{m.role}</p>
                {m.credentials ? (
                  <p className="text-xs text-muted-foreground">{m.credentials}</p>
                ) : null}
                <p className="text-xs text-muted-foreground leading-relaxed pt-2">
                  {m.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
