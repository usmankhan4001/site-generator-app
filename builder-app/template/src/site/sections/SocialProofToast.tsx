'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { CheckCircle2, ShieldCheck, X, Sparkles, ExternalLink } from 'lucide-react';
import type { SocialProofToastProps, ToastNotification, SiteContent } from '@/site/schema';
import { cn } from '@/site/lib/cn';

function getToastIcon(name?: string) {
  if (name && (Icons as any)[name]) {
    return (Icons as any)[name];
  }
  return ShieldCheck;
}

export default function SocialProofToast({
  props,
  content,
}: {
  props: SocialProofToastProps;
  content: SiteContent;
}) {
  const {
    position = 'bottom-left',
    notifications = [
      {
        title: 'Enterprise Merchant Verified',
        description: 'Aura Logistics (London, UK) activated Global Treasury Account.',
        timestamp: '2 minutes ago',
        verifiedBadge: true,
        icon: 'ShieldCheck',
      },
      {
        title: 'Transaction Processed',
        description: '€48,500 settled via SEPA Instant rail with 0.1% interchange.',
        timestamp: '4 minutes ago',
        verifiedBadge: true,
        icon: 'Zap',
      },
      {
        title: 'New Card Issued',
        description: 'Apex Studios provisioned 15 corporate debit cards with spend limits.',
        timestamp: '7 minutes ago',
        verifiedBadge: true,
        icon: 'CreditCard',
      },
    ],
    cycleIntervalSeconds = 6,
    dismissible = true,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Rotation cycle with enter/exit transition
  useEffect(() => {
    if (isDismissed || notifications.length <= 1) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 400);
    }, cycleIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [cycleIntervalSeconds, notifications.length, isDismissed]);

  if (isDismissed || !notifications || notifications.length === 0) {
    return null;
  }

  const current = notifications[currentIndex];
  const ToastIcon = getToastIcon(current.icon);

  const positionClass = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'top-left': 'top-20 left-6',
    'top-right': 'top-20 right-6',
  }[position] || 'bottom-6 left-6';

  const pillContent = (
    <div
      className={cn(
        'fixed z-40 max-w-sm w-[calc(100vw-3rem)] sm:w-96 rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-2xl p-4 transition-all duration-400 transform-gpu',
        positionClass,
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
      )}
    >
      <div className="flex items-start gap-3.5">
        {/* Icon / Avatar */}
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <ToastIcon className="w-5 h-5" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-foreground tracking-tight">
              {current.title}
            </span>
            {current.verifiedBadge && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-xs text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Verified
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2 leading-relaxed">
            {current.description}
          </p>

          {current.timestamp && (
            <div className="text-[10px] text-muted-foreground/75 font-medium mt-1">
              {current.timestamp}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDismissed(true);
            }}
            aria-label="Dismiss toast"
            className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors focus:outline-hidden"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );

  return current.href ? (
    <Link href={current.href} className="focus:outline-hidden">
      {pillContent}
    </Link>
  ) : (
    pillContent
  );
}
