'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import type { RoiCalculatorProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

function formatCurrency(amount: number, currency: string = '$'): string {
  return `${currency}${Math.round(amount).toLocaleString('en-US')}`;
}

export default function RoiCalculator({
  props,
  content,
}: {
  props: RoiCalculatorProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    minVolume = 10000,
    maxVolume = 1000000,
    step = 10000,
    defaultVolume = 150000,
    currency = '$',
    traditionalFeePercent = 2.9,
    traditionalFixedFee = 0.3,
    ourFeePercent = 1.2,
    ourFixedFee = 0.1,
    primaryCta = { label: 'Start Saving Now', href: '/contact' },
    secondaryCta = { label: 'Schedule Pricing Review', href: '/about' },
    metricHighlights = [
      { label: 'Average Savings', value: '58%', subtext: 'Lower processing overhead' },
      { label: 'Zero Hidden Fees', value: '$0', subtext: 'No monthly account keeping fees' },
      { label: 'Payout Speed', value: 'T+0', subtext: 'Instant treasury settlement' },
    ],
    disclaimer = 'Estimates based on blended interchange-plus rates vs standard 2.9% + 30¢ flat card processing.',
  } = props;

  const style = resolveArchetypeStyle(content);
  const sliderId = useId();
  const [volume, setVolume] = useState<number>(defaultVolume);

  // Approximate average transaction size around $75
  const estimatedTxCount = Math.max(1, Math.round(volume / 75));

  const monthlyTraditional =
    volume * (traditionalFeePercent / 100) + estimatedTxCount * traditionalFixedFee;
  const monthlyOur = volume * (ourFeePercent / 100) + estimatedTxCount * ourFixedFee;
  const monthlySavings = Math.max(0, monthlyTraditional - monthlyOur);
  const annualSavings = monthlySavings * 12;
  const savingsPercent =
    monthlyTraditional > 0 ? Math.round((monthlySavings / monthlyTraditional) * 100) : 58;

  const sliderPercent = ((volume - minVolume) / (maxVolume - minVolume)) * 100;

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Slider Console */}
          <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Interactive Volume Estimator
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                  Monthly Processing Volume
                </h3>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {formatCurrency(volume, currency)}
                </span>
                <span className="block text-xs text-muted-foreground font-medium">/ month</span>
              </div>
            </div>

            {/* Slider Input with Progress Fill */}
            <div className="relative mb-6">
              <label htmlFor={sliderId} className="sr-only">
                Monthly Processing Volume
              </label>
              <input
                id={sliderId}
                type="range"
                min={minVolume}
                max={maxVolume}
                step={step}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-hidden"
                style={{
                  background: `linear-gradient(to right, var(--primary, #2563eb) 0%, var(--primary, #2563eb) ${sliderPercent}%, var(--muted, #e2e8f0) ${sliderPercent}%, var(--muted, #e2e8f0) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground font-medium mt-2">
                <span>{formatCurrency(minVolume, currency)}</span>
                <span>{formatCurrency(maxVolume / 2, currency)}</span>
                <span>{formatCurrency(maxVolume, currency)}</span>
              </div>
            </div>

            {/* Fee Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/60">
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">
                  Traditional Gateways ({traditionalFeePercent}% + {traditionalFixedFee * 100}¢)
                </div>
                <div className="text-2xl font-bold text-muted-foreground line-through decoration-destructive/60">
                  {formatCurrency(monthlyTraditional, currency)}
                  <span className="text-xs font-normal text-muted-foreground no-underline ml-1">/ mo</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(monthlyTraditional * 12, currency)} / year in total fees
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-primary/[0.06] border border-primary/25">
                <div className="text-xs font-semibold uppercase text-primary mb-1">
                  With Our Platform ({ourFeePercent}% + {ourFixedFee * 100}¢)
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(monthlyOur, currency)}
                  <span className="text-xs font-normal text-foreground/80 ml-1">/ mo</span>
                </div>
                <div className="text-xs text-primary font-medium mt-1">
                  Saves ~{savingsPercent}% on merchant processing
                </div>
              </div>
            </div>

            {/* Quick highlight checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-border/40">
              {metricHighlights.map((m, idx) => (
                <div key={idx} className="text-left">
                  <div className="text-lg font-extrabold text-foreground">{m.value}</div>
                  <div className="text-xs font-medium text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Annual Savings Counter Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl"
            />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm border border-white/25 mb-6">
                <Zap className="w-3.5 h-3.5 fill-current" />
                Estimated Net Savings
              </span>

              <div className="text-sm font-medium text-primary-foreground/80">
                You could save an estimated:
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white my-3">
                {formatCurrency(annualSavings, currency)}
              </div>
              <div className="text-base font-semibold text-primary-foreground/90">
                every year in merchant processing fees.
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 space-y-2.5 text-xs text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Transparent interchange-plus pricing with zero markups</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>No monthly subscription, gateway, or termination fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Automatic volume discounts as your business scales</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 space-y-3">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-white/95 font-bold shadow-lg text-base h-12"
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}

              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent text-sm h-11"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        {disclaimer && (
          <p className="mt-8 text-center text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            * {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
