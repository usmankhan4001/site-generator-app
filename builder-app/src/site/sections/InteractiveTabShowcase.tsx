'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { InteractiveTabShowcaseProps, ShowcaseTab, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

function getTabIcon(name?: string) {
  if (name && (Icons as any)[name]) {
    return (Icons as any)[name];
  }
  return Sparkles;
}

export default function InteractiveTabShowcase({
  props,
  content,
}: {
  props: InteractiveTabShowcaseProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    tabs = [],
    variant = 'pills',
  } = props;

  const style = resolveArchetypeStyle(content);
  const [activeTabId, setActiveTabId] = useState<string>(
    tabs.length > 0 ? tabs[0].id : ''
  );

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <section className={cn(sectionPadding(style), 'bg-background relative overflow-hidden')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Tab Controls Navigation */}
        <div className="flex justify-center mb-10 lg:mb-14">
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-2 p-1.5',
              variant === 'pills' && 'bg-muted/60 backdrop-blur-md rounded-2xl border border-border/80 shadow-xs',
              variant === 'cards' && 'gap-3',
              variant === 'underline' && 'border-b border-border/80 rounded-none bg-transparent gap-6'
            )}
          >
            {tabs.map((tab) => {
              const TabIcon = getTabIcon(tab.icon);
              const isActive = tab.id === activeTab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-hidden',
                    variant === 'pills' &&
                      (isActive
                        ? 'bg-card text-foreground shadow-sm border border-border/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'),
                    variant === 'cards' &&
                      (isActive
                        ? 'bg-card text-foreground shadow-md border-2 border-primary'
                        : 'bg-card/50 text-muted-foreground hover:text-foreground border border-border/70 hover:bg-card'),
                    variant === 'underline' &&
                      (isActive
                        ? 'text-primary border-b-2 border-primary rounded-none pb-3'
                        : 'text-muted-foreground hover:text-foreground rounded-none pb-3')
                  )}
                >
                  <TabIcon className={cn('w-4 h-4', isActive ? 'text-primary' : 'text-muted-foreground')} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider',
                        isActive
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content Panel with Crossfade */}
        <div className="relative rounded-3xl bg-card border border-border/80 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-14 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Copy, Metrics, Bullet Points & CTA (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {activeTab.label}
                </span>
                {activeTab.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {activeTab.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-4">
                {activeTab.headline}
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                {activeTab.description}
              </p>

              {/* Bullet Points */}
              {activeTab.bulletPoints && activeTab.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {activeTab.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Metrics */}
              {activeTab.metrics && activeTab.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-border/60">
                  {activeTab.metrics.map((metric, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-muted/40 border border-border/40">
                      <div className="text-2xl font-black text-foreground tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {activeTab.cta && (
                <div>
                  <Button asChild size="lg" className="gap-2">
                    <Link href={activeTab.cta.href}>
                      {activeTab.cta.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Screenshot / Browser Mockup (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-muted/30">
                {/* Browser Top Window Bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-card border-b border-border/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  <div className="ml-2 text-[11px] font-mono text-muted-foreground truncate max-w-xs">
                    https://console.platform.io/{activeTab.id}
                  </div>
                </div>

                {/* Screenshot Display */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted/40">
                  {activeTab.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={activeTab.image}
                      alt={activeTab.headline}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-8 text-center text-muted-foreground">
                      <div className="space-y-2">
                        <Sparkles className="w-8 h-8 text-primary mx-auto opacity-70" />
                        <div className="text-sm font-semibold">{activeTab.headline}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
