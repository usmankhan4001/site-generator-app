'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';
import { useStudio } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SectionType } from '@/site/schema';

/**
 * Rewrites the currently selected section's copy with AI (OpenRouter). Only
 * text fields are touched — ids, prices, urls and enums are preserved.
 * Rendered inside SectionEditor so it's contextual to the section being edited.
 */
export function AiRewriteButton({ sectionType, sectionId }: { sectionType: SectionType; sectionId?: string }) {
  const projectId = useStudio((s) => s.meta?.id);
  const updateSectionProps = useStudio((s) => s.updateSectionProps);

  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  if (!sectionId) return null;

  const run = async () => {
    if (!projectId) return;
    setState('running');
    setMessage(null);
    try {
      await useStudio.getState().saveNow();
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, sectionId }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        setMessage(data?.error || 'AI rewrite failed.');
        setState(data?.code === 'AI_NOT_CONFIGURED' ? 'error' : 'error');
        return;
      }
      if (data.patch && Object.keys(data.patch).length > 0) {
        updateSectionProps(sectionId, data.patch);
      } else {
        setMessage('Nothing to rewrite in this section.');
        setState('idle');
        return;
      }
      setState('done');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setMessage('Network error while calling the AI service.');
      setState('error');
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={run}
          disabled={state === 'running'}
          className="w-full"
        >
          {state === 'running' ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Rewriting…
            </>
          ) : state === 'done' ? (
            <>
              <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              Updated
            </>
          ) : (
            <>
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-primary" />
              Rewrite copy with AI
            </>
          )}
        </Button>
      </div>
      {state === 'error' && message && (
        <p className={cn('flex items-start gap-1.5 text-[11px] text-amber-600', 'dark:text-amber-400')}>
          <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}