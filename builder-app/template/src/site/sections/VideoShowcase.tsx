'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import type { VideoShowcaseProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

function formatVideoEmbed(url?: string): { isEmbed: boolean; src: string; isMp4: boolean } {
  if (!url) return { isEmbed: false, src: '', isMp4: false };

  // MP4 file
  if (url.endsWith('.mp4') || url.includes('.mp4?')) {
    return { isEmbed: false, src: url, isMp4: true };
  }

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1].split('?')[0];
    }
    return {
      isEmbed: true,
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      isMp4: false,
    };
  }

  // Vimeo
  if (url.includes('vimeo.com')) {
    const parts = url.split('/');
    const vimeoId = parts[parts.length - 1].split('?')[0];
    return {
      isEmbed: true,
      src: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
      isMp4: false,
    };
  }

  return { isEmbed: true, src: url, isMp4: false };
}

export default function VideoShowcase({
  props,
  content,
}: {
  props: VideoShowcaseProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    posterImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    badge = '2-Minute Walkthrough',
    duration = '2:15',
    accentGlow = true,
    featurePills = ['Automated Ledger', 'Live FX Converter', 'Virtual Card Creation', 'Custom Approvals'],
    cta,
  } = props;

  const style = resolveArchetypeStyle(content);
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const embedInfo = formatVideoEmbed(videoUrl);

  return (
    <section className={cn(sectionPadding(style), 'relative overflow-hidden bg-background')}>
      {/* Ambient background glow */}
      {accentGlow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 flex justify-center"
        >
          <div className="w-[45rem] h-[25rem] rounded-full bg-primary/15 blur-[120px] opacity-70" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || description) && (
          <SectionHeader
            system={style.treatment}
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            className="mb-10 lg:mb-14"
          />
        )}

        {/* Video Card Spotlight */}
        <div className="relative group rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-border/80 via-border/40 to-border/80 shadow-2xl">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-muted/60">
            {/* Poster Image */}
            {posterImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterImage}
                alt={title || 'Video Showcase Poster'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            )}

            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Top Badge & Duration */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
              {badge && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                  {badge}
                </span>
              )}
              {duration && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-black/60 text-white/80 backdrop-blur-md border border-white/20">
                  {duration}
                </span>
              )}
            </div>

            {/* Pulsating Play Button */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Play video showcase"
              className="absolute inset-0 m-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center cursor-pointer group/btn focus:outline-hidden"
            >
              {/* Outer pulsating wave */}
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75" />
              {/* Inner button container */}
              <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 border-2 border-white/40">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* Feature Pills */}
        {featurePills.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {featurePills.map((pill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-muted/60 text-foreground border border-border"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* Optional CTA */}
        {cta && (
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-black/90 flex items-center justify-center transition-colors border border-white/20 focus:outline-hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <div className="aspect-[16/9] w-full">
              {embedInfo.isMp4 ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  src={embedInfo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={embedInfo.src}
                  title="Product Video Showcase"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
