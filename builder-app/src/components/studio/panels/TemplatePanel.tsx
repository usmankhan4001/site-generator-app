'use client';

import Link from 'next/link';
import { TriangleAlert, FileStack, Layers } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { PanelHeader } from './fields';

export function TemplatePanel() {
  const content = useStudio((s) => s.content);
  if (!content) return null;

  const source = content.source;
  const pageCount = content.pages.length;
  const sectionCount = content.pages.reduce((n, p) => n + p.sections.length, 0);

  return (
    <div className="space-y-5 p-4">
      <PanelHeader
        title="Template"
        hint="Where this site started from. Everything below is now fully editable."
      />

      {source ? (
        <div className="space-y-3 rounded-lg border border-border bg-card p-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Source template</span>
            <span className="font-mono text-xs text-foreground">{source.templateId}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Sector</span>
            <span className="capitalize text-foreground">{source.sector}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Mode</span>
            <span className="text-foreground">
              {content.mode === 'ecommerce' ? 'Store (catalogue + checkout)' : 'Services'}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          This project has no recorded source template.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3">
          <FileStack className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-semibold text-foreground">{pageCount}</div>
            <div className="text-[11px] text-muted-foreground">Pages</div>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-3">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm font-semibold text-foreground">{sectionCount}</div>
            <div className="text-[11px] text-muted-foreground">Sections</div>
          </div>
        </div>
      </div>

      {source?.needsPersonalization ? (
        <div className="flex gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
          <TriangleAlert className="h-4 w-4 shrink-0 text-amber-400" />
          <p>
            This template&apos;s testimonials, FAQ and story copy were generated in bulk and
            repeat across similar sites. Rewrite the sections that matter most (Company,
            Sections steps) before deploying.
          </p>
        </div>
      ) : null}

      <Link
        href="/"
        className="block text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        Start a new site from a different template
      </Link>
    </div>
  );
}
