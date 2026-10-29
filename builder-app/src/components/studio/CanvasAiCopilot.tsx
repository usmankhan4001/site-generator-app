'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  X,
  Check,
  ChevronDown,
  Wand2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const QUICK_SUGGESTIONS = [
  'Make headlines punchier and high-converting',
  'Add a clear money-back guarantee',
  'Emphasize local Dallas presence & speed',
  'Make the tone more premium and executive',
  'Add 3 compelling client testimonials',
];

export function CanvasAiCopilot() {
  const projectId = useStudio((s) => s.meta?.id);
  const activePage = useActivePage();
  const updateSectionProps = useStudio((s) => s.updateSectionProps);
  const content = useStudio((s) => s.content);

  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [scope, setScope] = useState<'page' | 'site'>('page');
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim() || !projectId) return;

    setState('running');
    setMessage(null);

    try {
      await useStudio.getState().saveNow();

      if (scope === 'site') {
        // Rewrite entire site with AI
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, prompt: finalPrompt }),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.success) {
          setMessage(data?.error || 'AI Copilot failed to update site.');
          setState('error');
          return;
        }

        const patches = (data.sections ?? {}) as Record<string, Record<string, unknown>>;
        let applied = 0;
        for (const [sectionId, patch] of Object.entries(patches)) {
          if (patch && Object.keys(patch).length > 0) {
            updateSectionProps(sectionId, patch);
            applied++;
          }
        }
        setMessage(`Updated ${applied} sections across the site!`);
        setState('done');
        setTimeout(() => {
          setState('idle');
          setOpen(false);
          setPrompt('');
        }, 1500);
      } else {
        // Rewrite sections on the current active page
        const pageSections = activePage?.sections.filter((s) => s.enabled) || [];
        let applied = 0;

        for (const sec of pageSections) {
          try {
            const res = await fetch('/api/ai/rewrite', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                projectId,
                sectionId: sec.id,
                prompt: finalPrompt,
              }),
            });
            const data = await res.json().catch(() => null);
            if (data?.success && data?.patch && Object.keys(data.patch).length > 0) {
              updateSectionProps(sec.id, data.patch);
              applied++;
            }
          } catch {
            // continue with next section
          }
        }

        setMessage(`Altered ${applied} sections on ${activePage?.title || 'this page'}!`);
        setState('done');
        setTimeout(() => {
          setState('idle');
          setOpen(false);
          setPrompt('');
        }, 1500);
      }
    } catch {
      setMessage('Network error during AI alteration.');
      setState('error');
    }
  };

  return (
    <div className="pointer-events-auto absolute bottom-4 inset-x-0 z-20 flex justify-center px-4">
      {!open ? (
        /* Collapsed Floating Pill */
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-2 text-xs font-semibold text-foreground shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:bg-card hover:border-primary/50"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span>AI Copilot: Ask AI to edit or refine...</span>
          <kbd className="hidden sm:inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground group-hover:text-foreground">
            ⌘K
          </kbd>
        </button>
      ) : (
        /* Expanded AI Copilot Command Card */
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card/95 p-3.5 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wand2 className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-foreground">Canvas AI Copilot</span>

              {/* Scope Selector */}
              <div className="flex rounded-lg bg-muted/60 p-0.5 ml-2">
                <button
                  type="button"
                  onClick={() => setScope('page')}
                  className={cn(
                    'px-2 py-0.5 text-[11px] font-medium rounded-md transition-colors',
                    scope === 'page'
                      ? 'bg-background text-foreground shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  Current Page
                </button>
                <button
                  type="button"
                  onClick={() => setScope('site')}
                  className={cn(
                    'px-2 py-0.5 text-[11px] font-medium rounded-md transition-colors',
                    scope === 'site'
                      ? 'bg-background text-foreground shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  Whole Site
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Prompt Textarea */}
          <div className="mt-2.5">
            <textarea
              ref={inputRef}
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={`Ask AI to edit headlines, adjust tone, add testimonials or rewrite ${
                scope === 'page' ? activePage?.title || 'this page' : 'the entire site'
              }…`}
              className="w-full resize-none rounded-xl border border-input bg-background/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {QUICK_SUGGESTIONS.slice(0, 3).map((sug) => (
              <button
                key={sug}
                type="button"
                onClick={() => {
                  setPrompt(sug);
                  handleSubmit(sug);
                }}
                disabled={state === 'running'}
                className="rounded-full border border-border/80 bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:bg-primary/10 hover:border-primary/40 hover:text-foreground active:scale-95 text-left"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/60">
            <span className="text-[11px] text-muted-foreground">
              {state === 'running' ? (
                <span className="flex items-center gap-1.5 text-primary font-medium">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Altering content…
                </span>
              ) : state === 'done' ? (
                <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
                  <Check className="h-3 w-3" />
                  {message || 'Updated!'}
                </span>
              ) : state === 'error' ? (
                <span className="text-amber-500">{message}</span>
              ) : (
                'Press ⌘+Enter to submit'
              )}
            </span>

            <Button
              size="sm"
              onClick={() => handleSubmit()}
              disabled={state === 'running' || !prompt.trim()}
              className="h-7 gap-1.5 px-3 text-xs font-semibold"
            >
              <Send className="h-3 w-3" />
              <span>Apply Changes</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
