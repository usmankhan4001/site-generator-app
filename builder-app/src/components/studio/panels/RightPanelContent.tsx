'use client';

import { useStudio } from '@/store/studio';
import { PagesPanel } from './PagesPanel';
import { SectionsPanel } from './SectionsPanel';
import { DesignPanel } from './DesignPanel';
import { CompanyForm } from './CompanyForm';
import { DeployPanel } from './DeployPanel';
import { TemplatePanel } from './TemplatePanel';
import { Inspector } from './Inspector';

/**
 * Dispatcher rendered by `Workspace`'s `<RightPanel>` — picks the panel for the
 * active studio navigation step (pages, sections, design, company, deploy),
 * or the section Inspector whenever a section is selected on the canvas.
 */
export function RightPanelContent() {
  const step = useStudio((s) => s.step);
  const selectedSectionId = useStudio((s) => s.selectedSectionId);

  if (selectedSectionId) return <Inspector />;

  switch (step) {
    case 'pages':
      return <PagesPanel />;
    case 'sections':
      return <SectionsPanel />;
    case 'design':
      return <DesignPanel />;
    case 'company':
      return <CompanyForm />;
    case 'deploy':
      return <DeployPanel />;
    case 'template':
      return <TemplatePanel />;
    default:
      return <SectionsPanel />;
  }
}
