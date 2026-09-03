'use client';

import { useEffect } from 'react';

/**
 * Rendered inside the preview (iframe). Bridges section selection between the
 * generated page and the studio workspace, and keeps navigation contained:
 *  - click on an in-app `<a href="/...">` → `e.preventDefault()` + postMessage
 *    `{ type: 'navigate', path }` so the studio (not the iframe) drives page changes
 *  - click on an `<a href="#...">` → smooth-scroll to the target in-frame
 *  - click on an external / `mailto:` / `tel:` link → open in a new tab
 *  - click on a `[data-section-id]` element (not an anchor/button) → postMessage
 *    `{ type: 'section:select', id }`
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
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a') as HTMLAnchorElement | null;

      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) {
          e.preventDefault();
          return;
        }

        // In-page anchor → scroll to it inside the frame.
        if (href.startsWith('#')) {
          e.preventDefault();
          if (href.length > 1) {
            try {
              document
                .querySelector(href)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch {
              /* invalid selector — ignore */
            }
          }
          return;
        }

        // External / protocol links → new tab, never navigate the iframe.
        if (href.startsWith('//') || /^(https?:|mailto:|tel:)/i.test(href)) {
          e.preventDefault();
          window.open(href, '_blank', 'noopener');
          return;
        }

        // In-app route → let the studio switch the previewed page.
        if (href.startsWith('/')) {
          e.preventDefault();
          const path = href.split(/[?#]/)[0] || '/';
          window.parent?.postMessage(
            { source: 'site-preview', type: 'navigate', path },
            '*',
          );
          return;
        }

        // Anything else (relative paths, unknown schemes) → contain it.
        e.preventDefault();
        return;
      }

      // Non-anchor clicks: keep click-to-select, but leave buttons alone.
      if (target?.closest?.('button')) return;
      const section = findSection(e.target);
      if (!section) return;
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
