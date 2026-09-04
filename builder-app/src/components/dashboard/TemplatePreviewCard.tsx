'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A clipped, fixed-height preview card for a template/starter-set thumbnail.
 * On hover, slowly pans the (usually much taller than the card) full-page
 * screenshot upward so more of the page is revealed without changing the
 * card's footprint in a grid.
 *
 * Renders as a `<button>` when `onClick` is supplied (picker use), otherwise
 * as a plain `<div>` (static display use).
 */
export function TemplatePreviewCard({
  src,
  alt,
  label,
  sublabel,
  onClick,
}: {
  src: string;
  alt: string;
  label: string;
  sublabel?: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sanitize path if it matches known ad-blocker filter triggers
  const safeSrc = src.replace('saas-analytics.jpg', 'saas-metrics.jpg');

  const content = (
    <>
      {!imageError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={safeSrc}
          alt={alt}
          onError={() => setImageError(true)}
          className="absolute inset-x-0 top-0 h-auto w-full object-cover object-top transition-transform ease-in-out"
          style={{
            transitionDuration: '6s',
            transform: hovered ? 'translateY(-60%)' : 'translateY(0%)',
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-center text-zinc-300">
          <div className="text-2xl font-bold tracking-tight text-white/90">{label}</div>
          <div className="mt-1 text-xs text-zinc-400">{sublabel || 'Turnkey Website Preview'}</div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white">
        <div className="truncate text-sm font-semibold tracking-tight">{label}</div>
        {sublabel && <div className="truncate text-xs text-white/75">{sublabel}</div>}
      </div>
    </>
  );

  const className = cn(
    'group relative h-72 w-full overflow-hidden rounded-lg border border-border/80 bg-card/60 transition-all duration-200',
    onClick && 'cursor-pointer hover:border-foreground/25 hover:shadow-sm',
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      {content}
    </div>
  );
}
