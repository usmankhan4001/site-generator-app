'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X, Sparkles, Bell } from 'lucide-react';
import type { AnnouncementBarProps, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';

export default function AnnouncementBar({
  props,
  content,
}: {
  props: AnnouncementBarProps;
  content: SiteContent;
}) {
  const {
    message,
    badge = 'Update',
    ctaLabel,
    ctaHref,
    dismissible = true,
    variant = 'glow',
    sticky = true,
  } = props;

  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || !message) {
    return null;
  }

  const variantContainerClass = {
    banner: 'bg-primary text-primary-foreground border-b border-primary-foreground/20',
    accent: 'bg-accent text-accent-foreground border-b border-border',
    glow: 'bg-gradient-to-r from-primary/15 via-primary/25 to-accent/20 text-foreground border-b border-primary/20 backdrop-blur-md',
    pill: 'bg-background/80 backdrop-blur-md border-b border-border text-foreground',
  }[variant] || 'bg-primary text-primary-foreground';

  return (
    <aside
      aria-label="Announcement"
      className={cn(
        'relative z-40 w-full px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300',
        sticky && 'sticky top-0 shadow-xs',
        variantContainerClass
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Center content wrapper */}
        <div className="flex-1 flex items-center justify-center gap-2.5 sm:gap-3 text-center truncate">
          {badge && (
            <span
              className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0',
                variant === 'banner'
                  ? 'bg-white/20 text-white border border-white/25'
                  : 'bg-primary/20 text-primary border border-primary/30'
              )}
            >
              <Sparkles className="w-3 h-3" />
              {badge}
            </span>
          )}

          <span className="truncate">{message}</span>

          {ctaLabel && ctaHref && (
            <Link
              href={ctaHref}
              className={cn(
                'inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:opacity-80 transition-opacity shrink-0 ml-1',
                variant === 'banner' ? 'text-white' : 'text-primary'
              )}
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss announcement"
            className="w-6 h-6 rounded-md hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors focus:outline-hidden"
          >
            <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
          </button>
        )}
      </div>
    </aside>
  );
}
