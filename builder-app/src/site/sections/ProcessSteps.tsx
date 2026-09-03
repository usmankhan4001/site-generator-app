import type { ProcessStepsProps, SiteContent } from '@/site/schema';

const LG_COLS = ['', 'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4'];

/**
 * Numbered step cards — horizontal on `lg` with a connector between the step
 * markers, stacked on mobile.
 */
export default function ProcessSteps({
  props,
}: {
  props: ProcessStepsProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, steps } = props;

  if (!steps?.length) return null;

  const lgCols = LG_COLS[Math.min(steps.length, 4)];

  return (
    <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {eyebrow ? (
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-foreground">
            {title ?? 'How We Work'}
          </h2>
          {description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          ) : null}
        </div>

        <ol className={`grid gap-8 ${lgCols}`}>
          {steps.map((s, i) => (
            <li key={i} className="flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                  {s.step}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden lg:block h-px flex-1 bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="card-elevated rounded-2xl p-6 border border-border bg-card flex-1">
                <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
                {s.duration ? (
                  <div className="mt-4 text-xs font-medium text-primary">{s.duration}</div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
