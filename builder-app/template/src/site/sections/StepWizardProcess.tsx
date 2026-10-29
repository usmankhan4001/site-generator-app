'use client';

import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import type { StepWizardProcessProps, StepWizardItem, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

function getStepIcon(name?: string) {
  if (name && (Icons as any)[name]) {
    return (Icons as any)[name];
  }
  return Sparkles;
}

export default function StepWizardProcess({
  props,
  content,
}: {
  props: StepWizardProcessProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    steps = [],
    layout = 'horizontal',
    showProgressLine = true,
    cta,
  } = props;

  const style = resolveArchetypeStyle(content);

  if (!steps || steps.length === 0) {
    return null;
  }

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
            className="mb-12 lg:mb-16"
          />
        )}

        {/* Horizontal or Vertical Steps Container */}
        {layout === 'horizontal' ? (
          <div className="relative">
            {/* Connecting progress line for desktop horizontal */}
            {showProgressLine && steps.length > 1 && (
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 -z-0"
              />
            )}

            <div
              className={cn(
                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10',
                steps.length === 4 && 'lg:grid-cols-4'
              )}
            >
              {steps.map((step, idx) => {
                const StepIcon = getStepIcon(step.icon);
                const stepNum = step.stepNumber !== undefined ? String(step.stepNumber).padStart(2, '0') : String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={idx}
                    className="group relative rounded-3xl bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Step Number Circle & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                          {stepNum}
                        </div>

                        <div className="flex items-center gap-2">
                          {step.timeEstimate && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60">
                              <Clock className="w-3 h-3" />
                              {step.timeEstimate}
                            </span>
                          )}
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                            <StepIcon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-xl font-bold tracking-tight text-foreground mb-3">
                        {step.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Optional Code Snippet or Badge */}
                    {step.codeSnippet && (
                      <div className="mt-6 p-3 rounded-xl bg-muted/70 font-mono text-xs text-foreground/90 overflow-x-auto border border-border/60">
                        <code>{step.codeSnippet}</code>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vertical Stepper layout */
          <div className="max-w-3xl mx-auto space-y-6 relative">
            {/* Connecting line */}
            {showProgressLine && steps.length > 1 && (
              <div
                aria-hidden="true"
                className="absolute top-8 bottom-8 left-6 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/20 -z-0"
              />
            )}

            {steps.map((step, idx) => {
              const StepIcon = getStepIcon(step.icon);
              const stepNum = step.stepNumber !== undefined ? String(step.stepNumber).padStart(2, '0') : String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={idx}
                  className="relative z-10 flex items-start gap-6 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground font-black text-lg flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                    {stepNum}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="text-lg sm:text-xl font-bold text-foreground">
                        {step.title}
                      </h4>
                      {step.timeEstimate && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 shrink-0">
                          <Clock className="w-3 h-3" />
                          {step.timeEstimate}
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {cta && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gap-2">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
