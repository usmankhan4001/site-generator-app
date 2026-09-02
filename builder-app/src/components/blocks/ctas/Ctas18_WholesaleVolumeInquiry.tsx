'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export interface Ctas18_WholesaleVolumeInquiryProps {
  badge?: string;
  headline?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  trustNotes?: string[];
}

export const Ctas18_WholesaleVolumeInquiry: React.FC<Ctas18_WholesaleVolumeInquiryProps> = ({
  badge = 'Wholesale Pricing',
  headline = 'Wholesale B2B Catalog Download',
  description = 'Instant PDF specification download trigger for corporate procurement desks.',
  primaryCtaText = 'Initiate Deployment',
  secondaryCtaText = 'Schedule Consultation',
  trustNotes = ['Zero Upfront Commitments', 'T+0 Same-Day Clearance', 'SOC2 Certified'],
}) => {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white border-b border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <div className="space-y-4 max-w-3xl mx-auto">
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Zap className="w-3.5 h-3.5" />
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {headline}
          </h2>
          {description && (
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {secondaryCtaText && (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <span>{secondaryCtaText}</span>
            </button>
          )}
        </div>

        {trustNotes && trustNotes.length > 0 && (
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400">
            {trustNotes.map((note, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {note}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Ctas18_WholesaleVolumeInquiry;
