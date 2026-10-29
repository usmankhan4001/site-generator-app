'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Quote, ArrowRight, Building2, TrendingUp } from 'lucide-react';
import type { CaseStudyCarouselProps, CaseStudyItem, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

export default function CaseStudyCarousel({
  props,
  content,
}: {
  props: CaseStudyCarouselProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    items = [],
    autoPlayInterval = 6000,
  } = props;

  const style = resolveArchetypeStyle(content);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (!autoPlayInterval || autoPlayInterval <= 0 || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, items.length]);

  if (!items || items.length === 0) {
    return null;
  }

  const current = items[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section className={cn(sectionPadding(style), 'bg-background relative overflow-hidden')}>
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

        <div className="card-elevated relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hero Metric & Company Pill (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/70 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  <Building2 className="w-3.5 h-3.5" />
                  {current.company}
                </span>
              </div>

              {/* Huge Hero Metric Display */}
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary tracking-tight">
                  {current.heroMetric}
                </div>
                <div className="text-sm sm:text-base font-semibold text-foreground/90 uppercase tracking-wide">
                  {current.heroMetricLabel}
                </div>
              </div>

              {current.tags && current.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {current.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {current.href && (
                <div className="mt-6">
                  <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Link href={current.href}>
                      Read Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Executive Quote & Author Bio (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="relative">
                <Quote className="w-12 h-12 text-primary/20 absolute -top-4 -left-4 -z-10" />
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-foreground leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {current.authorAvatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={current.authorAvatar}
                      alt={current.authorName}
                      className="w-12 h-12 rounded-full object-cover border border-border shadow-xs"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center border border-primary/20">
                      {current.authorName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-base font-bold text-foreground">
                      {current.authorName}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {current.authorRole} • <span className="font-medium text-foreground/80">{current.company}</span>
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Buttons */}
                {items.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous case study"
                      className="w-9 h-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-colors focus:outline-hidden"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next case study"
                      className="w-9 h-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-colors focus:outline-hidden"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Indicator Dots */}
          {items.length > 1 && (
            <div className="mt-8 flex justify-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 focus:outline-hidden',
                    currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
