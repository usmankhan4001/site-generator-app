'use client';

import { RightPanelContent } from './panels/RightPanelContent';

/**
 * Contextual panel — left of the preview, driven by `step` (and the selected
 * section, which swaps in the Inspector). The parent `<aside>` in `Workspace`
 * already provides the 380px width, border and vertical scroll; this just
 * renders the panel content for the current step.
 */
export function RightPanel() {
  return <RightPanelContent />;
}
