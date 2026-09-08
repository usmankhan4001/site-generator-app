'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import type { SiteContent, SitePage } from '@/site/schema';
import { CanvasToolbar, type SectionRect } from '@/components/studio/CanvasToolbar';

const EMPTY: SitePage[] = [];

const CANVAS_PAD = 24; // keep in sync with the p-6 on the scroll container
const CHROME_H = 30; // height (real px, unscaled) of the simulated browser-window chrome bar

interface PreviewPaneProps {
  dw: number;
  projectId: string;
  onOpenAddSectionAt?: (index: number) => void;
}

export function PreviewPane({ dw, projectId, onOpenAddSectionAt }: PreviewPaneProps) {
  const activePagePath = useStudio((s) => s.activePagePath);
  const content = useStudio((s) => s.content);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);
  const setActivePage = useStudio((s) => s.setActivePage);
  const pages = useStudio((s) => s.content?.pages ?? EMPTY);
  const selectSection = useStudio((s) => s.selectSection);
  const setStep = useStudio((s) => s.setStep);
  const toggleSection = useStudio((s) => s.toggleSection);
  const removeSection = useStudio((s) => s.removeSection);
  const reorderSections = useStudio((s) => s.reorderSections);
  const mutate = useStudio((s) => s.mutate);
  const viewMode = useStudio((s) => s.viewMode);
  const isPreview = viewMode === 'preview';

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);
  const skipScrollRef = useRef(false);

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
  const frameVisualH = Math.max(0, availH - (isPreview ? 0 : CHROME_H));
  const frameH = scale > 0 ? frameVisualH / scale : frameVisualH;
  const canRender = availW > 0 && availH > 0 && projectId !== '';

  const cardW = dw * scale;
  const overlayLeft = CANVAS_PAD + Math.max(0, (availW - cardW) / 2);
  const overlayTop = CANVAS_PAD + (isPreview ? 0 : CHROME_H);

  // Hover + selection chrome living on the host page (not inside the iframe).
  const [hoverRect, setHoverRect] = useState<SectionRect | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selRect, setSelRect] = useState<SectionRect | null>(null);

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

  const pushHighlight = useCallback((id: string) => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !readyRef.current) return;
    win.postMessage({ source: 'studio', type: 'section:highlight', id }, '*');
  }, []);

  const pushScrollTo = useCallback((id: string) => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !readyRef.current) return;
    win.postMessage(
      { source: 'studio', type: 'section:scrollTo', id },
      '*',
    );
    win.postMessage({ source: 'studio', type: 'section:highlight', id }, '*');
  }, []);

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
        postRef.current(false);
      } else if (d.type === 'section:select' && d.id) {
        skipScrollRef.current = true;
        selectSection(d.id);
        setStep('sections');
      } else if (d.type === 'section:hover' && d.rect) {
        setHoverRect(d.rect);
        setHoverId(d.id);
        if (useStudio.getState().selectedSectionId === d.id) setSelRect(d.rect);
      } else if (d.type === 'section:rect' && d.rect) {
        if (useStudio.getState().selectedSectionId === d.id) setSelRect(d.rect);
      } else if (d.type === 'section:leave') {
        setHoverRect(null);
        setHoverId(null);
      } else if (d.type === 'section:deselect') {
        setSelRect(null);
        selectSection(null);
      } else if (
        d.type === 'section:updateText' &&
        d.sectionId &&
        typeof d.oldText === 'string' &&
        typeof d.newText === 'string'
      ) {
        handleUpdateText(d.sectionId, d.oldText, d.newText, typeof d.tag === 'string' ? d.tag : undefined);
      } else if (d.type === 'navigate' && typeof d.path === 'string') {
        setActivePage(d.path);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [selectSection, setStep, setActivePage]);

  useEffect(() => {
    readyRef.current = false;
    setSelRect(null);
  }, [src]);

  useEffect(() => {
    postToFrame(!skipScrollRef.current);
    skipScrollRef.current = false;
  }, [postToFrame]);

  const activePage = useActivePage();
  const activeSections = activePage?.sections ?? [];
  const selIndex = activeSections.findIndex((s) => s.id === selectedSectionId);
  const sel = selIndex !== -1 ? activeSections[selIndex] : null;
  const showToolbar = !!sel && !!selRect;
  const canMoveUp = selIndex > 0;
  const canMoveDown = selIndex !== -1 && selIndex < activeSections.length - 1;

  const handleEdit = () => {
    if (!sel) return;
    if (selectedSectionId !== sel.id) selectSection(sel.id);
    pushScrollTo(sel.id);
  };

  const handleMove = (dir: -1 | 1) => {
    if (selIndex === -1) return;
    const to = Math.max(0, Math.min(activeSections.length - 1, selIndex + dir));
    if (to === selIndex) return;
    reorderSections(activePagePath, selIndex, to);
    if (selectedSectionId) pushHighlight(selectedSectionId);
  };

  const handleDuplicate = () => {
    if (!sel) return;
    mutate((draft) => {
      for (const page of draft.pages) {
        const i = page.sections.findIndex((s) => s.id === sel.id);
        if (i === -1) continue;
        const copy = JSON.parse(JSON.stringify(page.sections[i]));
        copy.id = `${sel.id}-copy-${Date.now().toString(36)}`;
        page.sections.splice(i + 1, 0, copy);
        return;
      }
    });
  };

  const handleToggle = () => {
    if (!sel) return;
    toggleSection(sel.id);
    if (sel.enabled) {
      setSelRect(null);
      selectSection(null);
    }
  };

  const handleDelete = () => {
    if (!sel) return;
    removeSection(sel.id);
    setSelRect(null);
    selectSection(null);
  };

  const handleUpdateText = (sectionId: string, oldText: string, newText: string, tag?: string) => {
    if (!oldText || oldText === newText) return;
    const state = useStudio.getState();
    if (state.selectedSectionId !== sectionId) state.selectSection(sectionId);
    state.mutate((draft) => {
      const props = findSectionProps(draft, sectionId);
      let reconciled = false;
      if (props) {
        reconciled = reconcileText(props, oldText, newText, tag);
      }
      if (!reconciled) {
        if (draft.brand && draft.brand.logoText === oldText) {
          draft.brand.logoText = newText;
          reconciled = true;
        } else if (draft.business && draft.business.name === oldText) {
          draft.business.name = newText;
          reconciled = true;
        } else if (draft.brand && draft.brand.logoText && oldText.includes(draft.brand.logoText)) {
          draft.brand.logoText = newText;
          reconciled = true;
        } else if (draft.business && draft.business.name && oldText.includes(draft.business.name)) {
          draft.business.name = newText;
          reconciled = true;
        }
      }
    });
  };

  return (
    <div className="studio-canvas flex h-full flex-col">
      <div ref={scrollRef} className="relative min-h-0 flex-1 overflow-auto p-6">
        {canRender ? (
          <div
            className="mx-auto overflow-hidden rounded-xl border border-border bg-white shadow-2xl transition-all"
            style={{ width: dw * scale, height: availH }}
          >
            {!isPreview && (
              <div
                className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-3"
                style={{ height: CHROME_H }}
              >
                <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/25" />
              </div>
            )}

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
          <div className="mx-auto h-full max-w-4xl animate-pulse rounded-xl border border-border bg-muted/30" />
        )}

        {!isPreview && (
          <div
            className="pointer-events-none absolute z-20"
            style={{ left: overlayLeft, top: overlayTop, width: cardW, height: frameVisualH }}
          >
            {/* Hover affordance */}
            {hoverRect && (
              <div
                className="pointer-events-none absolute rounded-xs border-2 border-dashed border-primary/50 transition-all"
                style={{
                  left: hoverRect.x * scale,
                  top: hoverRect.y * scale,
                  width: hoverRect.w * scale,
                  height: hoverRect.h * scale,
                }}
              />
            )}

            {/* Double-click to edit hint */}
            {hoverRect && hoverId && hoverId !== selectedSectionId && (
              <div
                className="pointer-events-none absolute"
                style={{ left: (hoverRect.x + hoverRect.w) * scale, top: hoverRect.y * scale }}
              >
                <div
                  title="Double-click to edit"
                  className="pointer-events-none -translate-x-full -translate-y-full inline-flex items-center gap-1 rounded-full border border-border/60 bg-card/90 px-2 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm"
                >
                  <Pencil className="h-3 w-3" />
                  Double-click to edit
                </div>
              </div>
            )}

            {/* In-canvas section toolbar */}
            {showToolbar && sel && (
              <CanvasToolbar
                rect={selRect}
                scale={scale}
                section={{ id: sel.id, enabled: sel.enabled }}
                canMoveUp={canMoveUp}
                canMoveDown={canMoveDown}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onMoveUp={() => handleMove(-1)}
                onMoveDown={() => handleMove(1)}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function findSectionProps(draft: SiteContent, sectionId: string): unknown {
  if (sectionId === 'header') {
    return {
      ...(draft.header ?? {}),
      brand: draft.brand,
      business: draft.business,
      nav: draft.nav,
      headerCta: draft.headerCta,
    };
  }
  if (sectionId === 'footer') {
    return {
      ...(draft.footer ?? {}),
      brand: draft.brand,
      business: draft.business,
    };
  }
  for (const page of draft.pages) {
    const sec = page.sections.find((s) => s.id === sectionId);
    if (sec) return sec.props;
  }
  return null;
}

interface StringLeaf {
  path: (string | number)[];
  value: string;
}

function collectStringLeaves(node: unknown, path: (string | number)[] = [], out: StringLeaf[] = []): StringLeaf[] {
  if (typeof node === 'string') {
    out.push({ path: [...path], value: node });
  } else if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) collectStringLeaves(node[i], [...path, i], out);
  } else if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    for (const k of Object.keys(record)) collectStringLeaves(record[k], [...path, k], out);
  }
  return out;
}

function setAtPath(node: unknown, path: (string | number)[], value: string): void {
  let cur = node;
  for (let i = 0; i < path.length - 1; i++) {
    if (cur && typeof cur === 'object') cur = (cur as Record<string, unknown>)[path[i]];
    else return;
  }
  if (cur && typeof cur === 'object') (cur as Record<string, unknown>)[path[path.length - 1]] = value;
}

function longestCommonPrefix(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

function longestCommonSuffix(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[a.length - 1 - i] === b[b.length - 1 - i]) i++;
  return i;
}

function normalizeWs(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

function candidateScore(leaf: StringLeaf, tag?: string): number {
  const hasIndex = leaf.path.some((s) => typeof s === 'number');
  let score = leaf.path.length * 100 + (hasIndex ? 10 : 0);
  const isHeading = tag ? /^h[1-6]$/.test(tag) : false;
  if (tag === 'li' && !hasIndex) score += 30;
  if (isHeading && hasIndex) score += 30;
  const key = leaf.path[leaf.path.length - 1];
  if (typeof key === 'string') {
    const k = key.toLowerCase();
    if (k.includes('headline') || k.includes('title')) score -= 5;
    if (k.includes('subtitle') || k.includes('text') || k.includes('label') || k.includes('logotext') || k.includes('name')) score -= 3;
  }
  return score;
}

function reconcileText(props: unknown, oldText: string, newText: string, tag?: string): boolean {
  const leaves = collectStringLeaves(props);
  if (leaves.length === 0) return false;

  const exact = leaves.filter((l) => l.value === oldText);
  if (exact.length > 0) {
    exact.sort((a, b) => candidateScore(a, tag) - candidateScore(b, tag));
    setAtPath(props, exact[0].path, newText);
    return true;
  }

  const lcp = longestCommonPrefix(oldText, newText);
  const lcs = longestCommonSuffix(oldText, newText);
  const changedOld = oldText.slice(lcp, oldText.length - lcs);
  const changedNew = newText.slice(lcp, newText.length - lcs);
  if (!changedOld || !changedNew) return false;

  const changedOldNorm = normalizeWs(changedOld);
  const candidates = leaves.filter((l) => {
    const v = l.value;
    if (!v) return false;
    return changedOld.includes(v) || normalizeWs(v) === changedOldNorm;
  });
  if (candidates.length === 0) return false;

  candidates.sort((a, b) => {
    const byLen = b.value.length - a.value.length;
    return byLen !== 0 ? byLen : candidateScore(a, tag) - candidateScore(b, tag);
  });

  for (const cand of candidates) {
    if (leaves.filter((l) => l.value === cand.value).length > 1) continue;
    setAtPath(props, cand.path, changedNew.trim());
    return true;
  }
  return false;
}