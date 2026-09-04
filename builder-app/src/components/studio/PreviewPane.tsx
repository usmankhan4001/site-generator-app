'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useStudio, DEVICE_WIDTH } from '@/store/studio';

const CANVAS_PAD = 24; // keep in sync with the p-6 on the scroll container
const CHROME_H = 30; // height (real px, unscaled) of the simulated browser-window chrome bar

export function PreviewPane() {
  const projectId = useStudio((s) => s.meta?.id ?? '');
  const activePagePath = useStudio((s) => s.activePagePath);
  const content = useStudio((s) => s.content);
  const device = useStudio((s) => s.device);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const setActivePage = useStudio((s) => s.setActivePage);
  const selectSection = useStudio((s) => s.selectSection);
  const setStep = useStudio((s) => s.setStep);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const skipScrollRef = useRef(false);

  const dw = DEVICE_WIDTH[device];
  const src = `/preview/project/${projectId}?page=${encodeURIComponent(activePagePath)}`;

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
  // The chrome bar sits above the (scaled) iframe inside the same fixed-height
  // wrapper, so its height must come out of the iframe's visual budget, not
  // be added on top of it — otherwise the bottom of the page gets clipped.
  const frameVisualH = Math.max(0, availH - CHROME_H);
  const frameH = scale > 0 ? frameVisualH / scale : frameVisualH;
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

  // Real-time live update: push content directly to the iframe without page reload
  useEffect(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !readyRef.current || !content) return;
    win.postMessage({ source: 'studio', type: 'content:update', content }, '*');
  }, [content]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== 'site-preview') return;
      if (d.type === 'ready') {
        readyRef.current = true;
        const currentContent = useStudio.getState().content;
        if (currentContent && iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            { source: 'studio', type: 'content:update', content: currentContent },
            '*',
          );
        }
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

  // src changes (page switch) reload the iframe → wait for `ready`
  useEffect(() => {
    readyRef.current = false;
  }, [src]);

  // selection changed → push highlight (+ scroll unless it came from the iframe)
  useEffect(() => {
    postToFrame(!skipScrollRef.current);
    skipScrollRef.current = false;
  }, [postToFrame]);

  return (
    <div className="studio-canvas flex h-full flex-col">
      {/* Slim quiet sub-header: dw/scale readout + open-in-new-tab (the device
          toggle and page selector now live in TopBar). */}
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-border bg-card/70 px-3 text-[11px] text-muted-foreground">
        <span className="tabular-nums">
          {dw}px{scale < 1 ? ` · ${Math.round(scale * 100)}%` : ''}
        </span>

        <a
          href={`/preview/project/${projectId}?page=${encodeURIComponent(activePagePath)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-foreground"
        >
          <ExternalLink className="h-3 w-3" />
          Open in new tab
        </a>
      </div>

      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-auto p-6">
        {canRender ? (
          <div
            className="mx-auto overflow-hidden rounded-lg border border-border bg-white shadow-xl"
            style={{ width: dw * scale, height: availH }}
          >
            {/* Simulated browser-window chrome — quiet/neutral dots, not traffic lights. */}
            <div
              className="flex items-center gap-1.5 border-b border-border/60 bg-muted/50 px-3"
              style={{ height: CHROME_H }}
            >
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
            </div>

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
