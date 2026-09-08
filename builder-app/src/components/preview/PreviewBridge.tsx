'use client';

import { useEffect } from 'react';

/** A section's bounding box in the iframe's own (unscaled) coordinate space. */
interface SectionRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Rendered inside the preview (iframe). Bridges section selection between the
 * generated page and the studio workspace, and keeps navigation contained:
 *  - click on an in-app `<a href="/...">` → `e.preventDefault()` + postMessage
 *    `{ type: 'navigate', path }` so the studio (not the iframe) drives page changes
 *  - click on an `<a href="#...">` → smooth-scroll to the target in-frame
 *  - click on an external / `mailto:` / `tel:` link → open in a new tab
 *  - click on a `[data-section-id]` element (not an anchor/button) → postMessage
 *    `{ type: 'section:select', id }`
 *  - click on non-section space (not an anchor/button) → postMessage
 *    `{ type: 'section:deselect' }` so the studio can clear its selection
 *  - `mouseover` a `[data-section-id]` element → postMessage
 *    `{ type: 'section:hover', id, rect }` (rect = getBoundingClientRect)
 *  - `mouseleave` the iframe / hover over non-section space → postMessage
 *    `{ type: 'section:leave' }`
 *  - as the studio scrolls the iframe, the currently-tracked (selected) section
 *    is reported again as `{ type: 'section:rect', id, rect }` so the parent's
 *    toolbar stays anchored without a mouse move
 *  - message `{ type: 'section:scrollTo', id }` from parent → smooth-scroll to it
 *  - message `{ type: 'section:highlight', id }` → outline that section + track it
 *  - message `{ type: 'section:clear' }` → clear outline + stop tracking
 *
 * Inline editing: double-clicking a text node inside a section turns it into a
 * contenteditable surface. On blur/Enter the new text is posted back as
 * `{ type: 'section:updateText', sectionId, oldText, newText }`; the parent
 * matches `oldText` against the section's props and replaces it with `newText`.
 */
export function PreviewBridge() {
  useEffect(() => {
    const root = document.documentElement;

    // The section the studio currently has selected — tracked so we can keep
    // reporting its rect on scroll even while the cursor isn't over it.
    let trackedId: string | null = null;

    // The element currently being edited inline (contenteditable), if any.
    let editingEl: HTMLElement | null = null;

    // Text-bearing tags we allow inline editing on. Interactive elements are
    // deliberately excluded so we never hijack links/buttons.
    const EDITABLE_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'li', 'strong', 'em']);

    // Pick the editable text element to edit. We prefer the click target itself
    // when it's already an editable leaf (e.g. the accent <span> inside a heading)
    // so we edit just that leaf instead of collapsing the whole container. Only
    // if the target isn't editable do we walk up to the closest editable ancestor,
    // stopping at the section boundary and bailing out if we cross an interactive
    // element. A click on a direct text node (whose parent is the container) still
    // edits the container, exactly as before.
    const findEditableText = (el: HTMLElement | null, section: HTMLElement): HTMLElement | null => {
      const isInteractive = (tag: string) =>
        tag === 'button' || tag === 'a' || tag === 'input' || tag === 'textarea' || tag === 'select';

      if (el) {
        const targetTag = el.tagName?.toLowerCase();
        if (
          !isInteractive(targetTag) &&
          EDITABLE_TAGS.has(targetTag) &&
          el.textContent?.trim() &&
          !el.closest('a, button, input, textarea, select')
        ) {
          return el;
        }
      }

      let node = el;
      while (node && node !== section && node !== document.body) {
        const tag = node.tagName?.toLowerCase();
        if (isInteractive(tag)) return null;
        if (EDITABLE_TAGS.has(tag) && node.textContent?.trim()) return node;
        node = node.parentElement;
      }
      return null;
    };

    const findSection = (el: EventTarget | null): HTMLElement | null => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.sectionId) return node;
        node = node.parentElement;
      }
      return null;
    };

    const postRect = (el: HTMLElement, mode: 'hover' | 'rect') => {
      const r = el.getBoundingClientRect();
      const rect: SectionRect = { x: r.left, y: r.top, w: r.width, h: r.height };
      window.parent?.postMessage(
        {
          source: 'site-preview',
          type: mode === 'hover' ? 'section:hover' : 'section:rect',
          id: el.dataset.sectionId,
          rect,
        },
        '*',
      );
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // While inline-editing, let caret placement work inside the editable node.
      if (editingEl && target && editingEl.contains(target)) return;
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
      if (!section) {
        // Clicked empty/header/footer space → tell the studio to clear selection.
        window.parent?.postMessage(
          { source: 'site-preview', type: 'section:deselect' },
          '*',
        );
        return;
      }
      e.preventDefault();
      window.parent?.postMessage(
        { source: 'site-preview', type: 'section:select', id: section.dataset.sectionId },
        '*',
      );
    };

    const onMouseOver = (e: MouseEvent) => {
      const section = findSection(e.target);
      if (section) postRect(section, 'hover');
      else window.parent?.postMessage({ source: 'site-preview', type: 'section:leave' }, '*');
    };

    const onDblClick = (e: MouseEvent) => {
      const section = findSection(e.target);
      if (!section) return;
      const sectionId = section.dataset.sectionId;
      const editable = findEditableText(e.target as HTMLElement | null, section);
      if (!editable) return;
      e.preventDefault();

      const oldText = editable.textContent ?? '';
      editingEl = editable;
      editable.contentEditable = 'plaintext-only';
      editable.focus();
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        range.selectNodeContents(editable);
        sel.removeAllRanges();
        sel.addRange(range);
      }

      let committed = false;
      const onKey = (ke: KeyboardEvent) => {
        if (ke.key === 'Enter') {
          ke.preventDefault();
          editable.blur();
        } else if (ke.key === 'Escape') {
          editable.textContent = oldText;
          editable.blur();
        }
      };
      const commit = () => {
        if (committed) return;
        committed = true;
        editingEl = null;
        editable.removeEventListener('keydown', onKey);
        const newText = (editable.textContent ?? '').trim();
        editable.contentEditable = 'false';
        if (newText !== oldText) {
          window.parent?.postMessage(
            {
              source: 'site-preview',
              type: 'section:updateText',
              sectionId,
              oldText,
              newText,
              tag: editable.tagName?.toLowerCase(),
            },
            '*',
          );
        }
      };
      editable.addEventListener('blur', commit, { once: true });
      editable.addEventListener('keydown', onKey);
    };

    const onMouseOut = (e: MouseEvent) => {
      // Leaving the document entirely (cursor exits the iframe) → drop the hover.
      if (!e.relatedTarget) {
        window.parent?.postMessage({ source: 'site-preview', type: 'section:leave' }, '*');
      }
    };

    const onScroll = () => {
      if (!trackedId) return;
      const el = root.querySelector(`[data-section-id="${trackedId}"]`) as HTMLElement | null;
      if (el) postRect(el, 'rect');
    };

    const clearHighlights = () => {
      root.querySelectorAll('[data-section-id]').forEach((n) => {
        (n as HTMLElement).style.outline = '';
        (n as HTMLElement).style.outlineOffset = '';
      });
    };

    const onMessage = (e: MessageEvent) => {
      // Validate origin to secure preview communication
      if (
        e.origin !== window.location.origin &&
        !e.origin.startsWith('http://localhost') &&
        !e.origin.startsWith('http://127.0.0.1')
      ) {
        return;
      }
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
        if (data.type === 'section:highlight') {
          trackedId = data.id;
          // Report immediately so the parent can anchor its toolbar even when
          // no scroll event follows (e.g. selection via the docked inspector).
          postRect(el, 'rect');
        }
      }
      if (data.type === 'section:clear') {
        clearHighlights();
        trackedId = null;
      }
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('dblclick', onDblClick, true);
    document.addEventListener('mouseover', onMouseOver, true);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('message', onMessage);
    window.parent?.postMessage({ source: 'site-preview', type: 'ready' }, '*');

    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('dblclick', onDblClick, true);
      document.removeEventListener('mouseover', onMouseOver, true);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return null;
}