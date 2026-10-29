'use client';

import React, { useState } from 'react';
import { Download, CheckCircle2, AlertCircle, FileText, Lock, Sparkles } from 'lucide-react';
import type { LeadMagnetProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveArchetypeStyle, sectionPadding } from '@/site/archetypes';
import { cn } from '@/site/lib/cn';
import { Button } from '@/site/ui/button';

export default function LeadMagnet({
  props,
  content,
}: {
  props: LeadMagnetProps;
  content: SiteContent;
}) {
  const {
    eyebrow,
    title,
    description,
    badge = 'Free 42-Page PDF',
    guideTitle = 'The 2026 Global Treasury & Cross-Border Optimization Guide',
    guideSubtitle = 'Strategies for minimizing transaction drag, streamlining multi-currency cash pools, and automating compliance.',
    coverImage = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    bulletPoints = [
      'Actionable blueprints to cut FX spreads from 3.0% to 0.4%',
      'Multi-entity banking structure design for UK, US, EU, and APAC',
      'Automated reconciliation checklists compatible with NetSuite & Xero',
      'Corporate card spend controls that prevent budget overruns',
    ],
    buttonLabel = 'Download Instant PDF',
    successMessage = 'Success! Your guide has been sent to your inbox. Check your email for instant access.',
    privacyNotice = 'Zero spam guarantee. Unsubscribe at any time with a single click.',
    downloadUrl,
    socialProofText = 'Downloaded by 4,200+ finance directors & CFOs worldwide.',
  } = props;

  const style = resolveArchetypeStyle(content);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorText('Please enter a valid business email address.');
      return;
    }

    setStatus('loading');
    // Simulate instant capture/download
    setTimeout(() => {
      setStatus('success');
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
      }
    }, 600);
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

        <div className="card-elevated relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* 3D Guide Cover Preview (Left 5 Cols on desktop) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-xs w-full [perspective:1200px]">
                {/* 3D Tilted Book Wrapper */}
                <div className="relative transform-gpu transition-transform duration-500 [transform:rotateY(-12deg)_rotateX(4deg)] group-hover:[transform:rotateY(-4deg)_rotateX(0deg)]">
                  {/* Book Spine Simulation */}
                  <div className="relative rounded-r-xl rounded-l-xs overflow-hidden shadow-2xl border-l-8 border-primary bg-muted">
                    {coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverImage}
                        alt={guideTitle}
                        className="w-full h-auto aspect-[3/4] object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-primary/90 to-primary/60 p-6 flex flex-col justify-between text-white">
                        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs uppercase font-bold tracking-widest opacity-80">
                            Industry Report
                          </div>
                          <div className="text-xl font-black mt-2 leading-tight">
                            {guideTitle}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Gloss / Sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />
                  </div>

                  {/* Simulated Book Pages (Bottom/Right edge) */}
                  <div className="absolute -bottom-2 right-1 left-2 h-2 bg-muted/80 rounded-b-xs border-b border-border shadow-xs" />
                </div>
              </div>
            </div>

            {/* Content & Lead Form (Right 7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 w-fit mb-4">
                  <Sparkles className="w-3 h-3" />
                  {badge}
                </span>
              )}

              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-3">
                {guideTitle}
              </h3>

              {guideSubtitle && (
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  {guideSubtitle}
                </p>
              )}

              {/* Bullet Points Checklist */}
              {bulletPoints.length > 0 && (
                <ul className="space-y-2.5 mb-8">
                  {bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Email Capture Form / Instant Download */}
              {status === 'success' ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex items-center gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <p className="text-sm font-semibold">{successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your work email address"
                      className={cn(
                        'flex-1 px-4 py-3 rounded-xl border bg-background text-foreground text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-colors',
                        status === 'error' ? 'border-destructive focus:ring-destructive/30' : 'border-border'
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      size="lg"
                      className="gap-2 h-11 shrink-0 font-bold"
                    >
                      <Download className="w-4 h-4" />
                      {status === 'loading' ? 'Sending...' : buttonLabel}
                    </Button>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-1.5 text-xs text-destructive font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-muted-foreground/70" />
                      {privacyNotice}
                    </span>
                    {socialProofText && <span className="font-medium text-foreground/75">{socialProofText}</span>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
