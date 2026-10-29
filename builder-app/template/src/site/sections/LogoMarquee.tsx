'use client';

import React from 'react';
import Link from 'next/link';
import type { LogoMarqueeProps, MarqueeItem, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';

function normalizeItem(item: string | MarqueeItem): MarqueeItem {
  if (typeof item === 'string') {
    return { name: item };
  }
  return item;
}

export default function LogoMarquee({
  props,
  content,
}: {
  props: LogoMarqueeProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    items = [],
    speed = 'normal',
    direction = 'left',
    pauseOnHover = true,
    variant = 'cards',
  } = props;

  const style = resolveArchetypeStyle(content);

  if (!items || items.length === 0) {
    return null;
  }

  const normalized = items.map(normalizeItem);
  // Duplicate for seamless infinite loop
  const marqueeList = [...normalized, ...normalized, ...normalized, ...normalized];

  const durationSec = speed === 'slow' ? 50 : speed === 'fast' ? 18 : 30;
  const animDirection = direction === 'right' ? 'reverse' : 'normal';

  return (
    <section className={cn(sectionPadding(style), 'relative overflow-hidden bg-background')}>
      {/* Dynamic Keyframes for smooth infinite ticker */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll ${durationSec}s linear infinite ${animDirection};
        }
        .marquee-container:hover .marquee-track {
          ${pauseOnHover ? 'animation-play-state: paused;' : ''}
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <SectionHeader
            system={style.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-8 lg:mb-12"
          />
        )}
      </div>

      {/* Marquee Wrapper with Edge Fade Gradients */}
      <div className="relative w-full overflow-hidden marquee-container py-4">
        {/* Left and right fade gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-track flex items-center gap-6 sm:gap-8 px-4">
          {marqueeList.map((item, idx) => {
            const cardContent = (
              <div
                className={cn(
                  'flex items-center gap-3.5 px-6 py-4 rounded-xl transition-all duration-300 select-none group',
                  variant === 'cards' &&
                    'bg-card border border-border/70 hover:border-primary/40 shadow-xs hover:shadow-md hover:-translate-y-0.5',
                  variant === 'glass' &&
                    'bg-card/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xs hover:shadow-lg',
                  variant === 'minimal' &&
                    'border border-transparent hover:border-border/60 hover:bg-muted/40',
                  variant === 'default' &&
                    'bg-muted/30 border border-transparent hover:border-border hover:bg-muted/60'
                )}
              >
                {item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-7 w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-black text-sm flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform">
                    {item.name.charAt(0)}
                  </div>
                )}

                <div className="text-left">
                  <div className="text-sm sm:text-base font-semibold text-foreground/80 group-hover:text-foreground tracking-tight transition-colors">
                    {item.name}
                  </div>
                  {item.subtext && (
                    <div className="text-xs text-muted-foreground font-normal">
                      {item.subtext}
                    </div>
                  )}
                </div>

                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {item.badge}
                  </span>
                )}
              </div>
            );

            return item.href ? (
              <Link
                key={`marquee-${idx}`}
                href={item.href}
                className="cursor-pointer focus:outline-hidden"
              >
                {cardContent}
              </Link>
            ) : (
              <div key={`marquee-${idx}`}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
