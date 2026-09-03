import type { TrustBarProps, SiteContent } from '@/site/schema';

/**
 * TrustBar — thin reassurance band.
 *  - `variant: 'pills'`  → row of text chips (dot-pill utility)
 *  - `variant: 'logos'`  → greyscale wordmark row (each string as a styled wordmark)
 */
export default function TrustBar({ props }: { props: TrustBarProps; content: SiteContent }) {
  if (!props.items?.length) return null;
  const variant = props.variant ?? 'pills';

  return (
    <section className="py-8 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {props.title && (
          <p className="text-center text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-5">
            {props.title}
          </p>
        )}

        {variant === 'logos' ? (
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {props.items.map((item, idx) => (
              <span
                key={idx}
                className="text-lg sm:text-xl font-bold tracking-tight text-foreground opacity-60 grayscale"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {props.items.map((item, idx) => (
              <span key={idx} className="dot-pill">
                <span className="dot-indicator" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
