'use client';

import { useState } from 'react';
import type { TrustBarItem, TrustBarProps, SiteContent } from '@/site/schema';
import { resolveLogoUrl } from '@/site/lib/logo';

function itemName(item: TrustBarItem): string {
  return typeof item === 'string' ? item : item.name;
}

function itemDomain(item: TrustBarItem): string | undefined {
  return typeof item === 'string' ? undefined : item.domain;
}

/** A real logo image with an honest fallback to the text wordmark on load failure. */
function LogoMark({ name, domain }: { name: string; domain?: string }) {
  const [failed, setFailed] = useState(false);

  if (!domain || failed) {
    return (
      <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground opacity-60 grayscale">
        {name}
      </span>
    );
  }

  return (
    <img
      src={resolveLogoUrl(domain)}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-6 sm:h-7 w-auto object-contain opacity-60 grayscale transition-opacity hover:opacity-90 hover:grayscale-0"
    />
  );
}

/**
 * TrustBar — thin reassurance band.
 *  - `variant: 'pills'`  → row of text chips (dot-pill utility)
 *  - `variant: 'logos'`  → real company logos fetched by domain, each with
 *    an honest text-wordmark fallback if the logo can't load
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
              <LogoMark key={idx} name={itemName(item)} domain={itemDomain(item)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {props.items.map((item, idx) => (
              <span key={idx} className="dot-pill">
                <span className="dot-indicator" />
                <span>{itemName(item)}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
