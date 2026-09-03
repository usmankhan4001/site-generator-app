'use client';

import { useEffect } from 'react';

/**
 * Rendered inside the preview (iframe). Bridges section selection between the
 * generated page and the studio workspace:
 *  - click on a `[data-section-id]` element  → postMessage `{ type: 'section:select', id }`
 *  - message `{ type: 'section:scrollTo', id }` from parent → smooth-scroll to it
 *  - message `{ type: 'section:highlight', id }` → outline that section
 */
export function PreviewBridge() {
  useEffect(() => {
    const root = document.documentElement;

    const findSection = (el: EventTarget | null): HTMLElement | null => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.sectionId) return node;
        node = node.parentElement;
      }
      return null;
    };

    const onClick = (e: MouseEvent) => {
      const section = findSection(e.target);
      if (!section) return;
      // Let real navigation links work; only intercept plain content clicks.
      const anchor = (e.target as HTMLElement).closest('a,button');
      if (anchor) return;
      e.preventDefault();
      window.parent?.postMessage(
        { source: 'site-preview', type: 'section:select', id: section.dataset.sectionId },
        '*',
      );
    };

    const clearHighlights = () => {
      root.querySelectorAll('[data-section-id]').forEach((n) => {
        (n as HTMLElement).style.outline = '';
        (n as HTMLElement).style.outlineOffset = '';
      });
    };

    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || data.source !== 'studio') return;
      if (data.type === 'section:scrollTo' || data.type === 'section:highlight') {
        const el = root.querySelector(`[data-section-id="${data.id}"]`) as HTMLElement | null;
        if (!el) return;
        if (data.type === 'section:scrollTo') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        clearHighlights();
        el.style.outline = '2px solid var(--primary)';
        el.style.outlineOffset = '-2px';
      }
      if (data.type === 'section:clear') clearHighlights();
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('message', onMessage);
    window.parent?.postMessage({ source: 'site-preview', type: 'ready' }, '*');

    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}
