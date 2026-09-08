'use client';

/**
 * Shared presentational building blocks for the deployment guide pages
 * (`/guides/*`). Quiet, hairline-bordered, theme-token driven — no gradients.
 * Keeps the three platform pages DRY and visually consistent.
 */

import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe,
  Info,
  Rocket,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ layout -- */

export function GuideShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      {/* top nav — back to the app / guide hub */}
      <nav className="mb-10 flex items-center justify-between text-sm">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All guides
        </Link>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to the app
        </Link>
      </nav>

      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="space-y-10">{children}</div>

      <footer className="mt-14 border-t border-border pt-6">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all deployment guides
        </Link>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------- step section -- */

export function StepSection({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {step}
        </span>
        {title}
      </h2>
      <div className="space-y-3 pl-0">{children}</div>
    </section>
  );
}

export function GuideParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground">
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- code block -- */

export function CodeBlock({
  title,
  code,
}: {
  title?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {title ? (
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
          <span className="font-mono text-[11px] text-muted-foreground">{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ----------------------------------------------------------------- callout -- */

export function Callout({
  variant = 'info',
  title,
  children,
}: {
  variant?: 'info' | 'domain';
  title: string;
  children: ReactNode;
}) {
  const Icon = variant === 'domain' ? Globe : Info;
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3.5',
        variant === 'domain'
          ? 'border-primary/30 bg-primary/5'
          : 'border-border bg-muted/40',
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          variant === 'domain' ? 'text-primary' : 'text-muted-foreground',
        )}
      />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <div className="text-[13px] leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- checklist -- */

export function Checklist({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Rocket className="h-4 w-4 text-primary" />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------- external link -- */

export function ExternalLinkText({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
