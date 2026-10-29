'use client';

import {
  FileText,
  Plus,
  Sparkles,
  Sliders,
  Eye,
  Edit3,
  Layers,
} from 'lucide-react';
import { useStudio, useActivePage } from '@/store/studio';
import { cn } from '@/lib/utils';

interface MobileThumbDockProps {
  onTogglePages: () => void;
  onOpenAddSection: () => void;
  onToggleProperties: () => void;
  propertiesOpen: boolean;
  pagesOpen: boolean;
}

/**
 * Mobile-specific thumb dock anchored at the bottom of the studio screen (< 768px).
 * Eliminates top-bar reach fatigue and provides fluid navigation between
 * pages, block insertion, AI assistance, mode toggle, and properties sheet.
 */
export function MobileThumbDock({
  onTogglePages,
  onOpenAddSection,
  onToggleProperties,
  propertiesOpen,
  pagesOpen,
}: MobileThumbDockProps) {
  const viewMode = useStudio((s) => s.viewMode);
  const setViewMode = useStudio((s) => s.setViewMode);
  const activePage = useActivePage();
  const selectedSectionId = useStudio((s) => s.selectedSectionId);

  const isEditMode = viewMode === 'edit';

  return (
    <nav
      aria-label="Mobile Studio Controls"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden pointer-events-none pb-safe"
    >
      <div className="pointer-events-auto mx-auto max-w-sm px-3 pb-2 pt-1">
        <div className="flex items-center justify-around rounded-2xl border border-border/80 bg-card/95 py-1.5 px-2 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10">
          {/* Pages Sheet Button */}
          <button
            type="button"
            onClick={onTogglePages}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-xl py-1 px-2.5 transition-colors',
              pagesOpen
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground active:scale-95',
            )}
          >
            <FileText className="h-4 w-4" />
            <span className="text-[10px] truncate max-w-[50px]">
              {activePage?.navLabel || 'Pages'}
            </span>
          </button>

          {/* Add Block */}
          <button
            type="button"
            onClick={onOpenAddSection}
            className="flex flex-col items-center justify-center gap-1 rounded-xl py-1 px-2.5 text-primary font-semibold hover:text-primary active:scale-95 transition-colors"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Plus className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px]">Add</span>
          </button>

          {/* Edit / Browse Toggle */}
          <button
            type="button"
            onClick={() => setViewMode(isEditMode ? 'preview' : 'edit')}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-xl py-1 px-2.5 transition-colors',
              isEditMode
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground active:scale-95',
            )}
          >
            {isEditMode ? <Edit3 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="text-[10px]">{isEditMode ? 'Editing' : 'Browse'}</span>
          </button>

          {/* Properties / Inspector Drawer */}
          <button
            type="button"
            onClick={onToggleProperties}
            className={cn(
              'flex flex-col items-center justify-center gap-1 rounded-xl py-1 px-2.5 transition-colors',
              propertiesOpen || selectedSectionId
                ? 'text-primary font-bold'
                : 'text-muted-foreground hover:text-foreground active:scale-95',
            )}
          >
            <Sliders className="h-4 w-4" />
            <span className="text-[10px]">
              {selectedSectionId ? 'Block' : 'Inspect'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
