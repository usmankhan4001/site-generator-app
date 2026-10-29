import type { Metadata } from 'next';
import { Workspace } from '@/components/studio/Workspace';

export const metadata: Metadata = {
  title: 'Live Interactive Demo — Site Studio',
  description: 'Test all 12 modern components, visual theme studio, in-canvas HUD, and multi-cloud deployments.',
};

export default function DemoPage() {
  return <Workspace projectId="demo" />;
}
