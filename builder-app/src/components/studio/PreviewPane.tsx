'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { useStudio, DEVICE_WIDTH, type PreviewDevice } from '@/store/studio';
import type { SitePage } from '@/site/schema';
import { cn } from '@/lib/utils';

const DEVICES: { id: PreviewDevice; label: string; icon: LucideIcon }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

const EMPTY: SitePage[] = [];
const CANVAS_PAD = 24; // keep in sync with the p-6 on the scroll container

export function PreviewPane() {
  const projectId = useStudio((s) => s.meta?.id ?? '');
  const pages = useStudio((s) => s.content?.pages ?? EMPTY);
  const activePagePath = useStudio((s) => s.activePagePath);
  const previewNonce = useStudio((s) => s.previewNonce);
  const device = useStudio((s) => s.device);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const setDevice = useStudio((s) => s.setDevice);
  const setActivePage = useStudio((s) => s.setActivePage);
  const selectSection = useStudio((s) => s.selectSection);
  const setStep = useStudio((s) => s.setStep);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const skipScrollRef = useRef(false);

  const dw = DEVICE_WIDTH[device];
  const src = `/preview/project/${projectId}?page=${encodeURIComponent(
    activePagePath,
  )}&n=${previewNonce}`;

  // --- scale-to-fit measurement -------------------------------------------------
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const availW = Math.max(0, box.w - CANVAS_PAD * 2);
  const availH = Math.max(0, box.h - CANVAS_PAD * 2);
  const scale = availW > 0 ? Math.min(1, availW / dw) : 1;
  const frameH = scale > 0 ? availH / scale : availH;
  const canRender = availW > 0 && availH > 0 && projectId !== '';

  // --- bridge -----------------------------------------------------------------
  const postToFrame = useCallback(
    (scroll: boolean) => {
      const win = iframeRef.current?.contentWindow;
      if (!win || !readyRef.current) return;
      if (selectedSectionId) {
        if (scroll) {
          win.postMessage(
            { source: 'studio', type: 'section:scrollTo', id: selectedSectionId },
            '*',
          );
        }
        win.postMessage(
          { source: 'studio', type: 'section:highlight', id: selectedSectionId },
          '*',
        );
      } else {
        win.postMessage({ source: 'studio', type: 'section:clear' }, '*');
      }
    },
    [selectedSectionId],
  );

  const postRef = useRef(postToFrame);
  useEffect(() => {
    postRef.current = postToFrame;
  }, [postToFrame]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== 'site-preview') return;
      if (d.type === 'ready') {
        readyRef.current = true;
        postRef.current(false); // re-apply highlight after a (re)load, no scroll
      } else if (d.type === 'section:select' && d.id) {
        skipScrollRef.current = true; // it's already on screen — don't yank the view
        selectSection(d.id);
        setStep('sections');
      } else if (d.type === 'navigate' && typeof d.path === 'string') {
        // A link inside the preview was clicked — switch the previewed page
        // here instead of letting the iframe navigate itself (containment).
        setActivePage(d.path);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [selectSection, setStep, setActivePage]);

  // src changes (page switch / save nonce) reload the iframe → wait for `ready`
  useEffect(() => {
    readyRef.current = false;
  }, [src]);

  // selection changed → push highlight (+ scroll unless it came from the iframe)
  useEffect(() => {
    postToFrame(!skipScrollRef.current);
    skipScrollRef.current = false;
  }, [postToFrame]);

  // --- page selector options ------------------------------------------------
  const pageOptions = useMemo(() => {
    const filtered = pages.filter((p) => p.nav || p.key.startsWith('policy') || p.key === 'checkout');
    const base = filtered.length ? filtered : pages;
    if (!base.some((p) => p.path === activePagePath)) {
      const active = pages.find((p) => p.path === activePagePath);
      if (active) return [active, ...base];
    }
    return base;
  }, [pages, activePagePath]);

  return (
    <div className="studio-canvas flex h-full flex-col">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-card/70 px-3 py-2">
        <div className="flex rounded-lg bg-muted p-0.5">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              title={`${d.label} · ${DEVICE_WIDTH[d.id]}px`}
              aria-pressed={device === d.id}
              className={cn(
                'inline-flex h-7 w-8 items-center justify-center rounded-md transition-colors',
                device === d.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <d.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <select
          value={activePagePath}
          onChange={(e) => setActivePage(e.target.value)}
          aria-label="Preview page"
          className="h-8 max-w-[240px] truncate rounded-md border border-input bg-background px-2 text-xs text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {pageOptions.map((p) => (
            <option key={p.key} value={p.path}>
              {(p.navLabel || p.title) + (p.path === '/' ? '' : `  ·  ${p.path}`)}
            </option>
          ))}
        </select>

        <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
          {dw}px{scale < 1 ? ` · ${Math.round(scale * 100)}%` : ''}
        </span>

        <a
          href={`/preview/project/${projectId}?page=${encodeURIComponent(activePagePath)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in new tab
        </a>
      </div>

      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-auto p-6">
        {canRender ? (
          <div
            className="mx-auto overflow-hidden rounded-lg border border-border bg-white shadow-xl"
            style={{ width: dw * scale, height: availH }}
          >
            <iframe
              ref={iframeRef}
              src={src}
              title="Site preview"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              className="block border-0 bg-white"
              style={{
                width: dw,
                height: frameH,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            />
          </div>
        ) : (
          <div className="mx-auto h-full max-w-4xl animate-pulse rounded-lg border border-border bg-muted/30" />
        )}
      </div>
    </div>
  );
}
