'use client';

import { useStudio } from '@/store/studio';
import { TemplatePanel } from './TemplatePanel';
import { CompanyForm } from './CompanyForm';
import { DesignPanel } from './DesignPanel';
import { SectionsPanel } from './SectionsPanel';
import { DeployPanel } from './DeployPanel';
import { Inspector } from './Inspector';

/** Dispatcher rendered by `Workspace`'s `<RightPanel>` — picks the panel for the
 *  active step, or the section Inspector when a section is selected. */
export function RightPanelContent() {
  const step = useStudio((s) => s.step);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);

  if (step === 'sections' && selectedSectionId) return <Inspector />;

  switch (step) {
    case 'template':
      return <TemplatePanel />;
    case 'company':
      return <CompanyForm />;
    case 'design':
      return <DesignPanel />;
    case 'sections':
      return <SectionsPanel />;
    case 'deploy':
      return <DeployPanel />;
    default:
      return null;
  }
}
