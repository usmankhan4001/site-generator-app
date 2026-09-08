'use client';

import { PublishPopover } from '../PublishPopover';

/**
 * DeployPanel — thin wrapper that renders the compact publish popover
 * inside the right panel. All logic lives in PublishPopover.
 */
export function DeployPanel() {
  return <PublishPopover />;
}

export { DeployPanel as PublishPanel };
