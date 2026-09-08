'use client';

import { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Settings2,
  Check,
} from 'lucide-react';
import { useStudio } from '@/store/studio';
import type { SitePage } from '@/site/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { defaultPropsFor } from '@/site/sections/defaults';
import { PanelHeader } from './fields';

const PAGE_TEMPLATES = [
  {
    title: 'About Us',
    path: '/about',
    navLabel: 'About',
    sections: ['pageHeader', 'prose', 'teamGrid', 'timeline', 'ctaBanner'],
    description: 'Company story, executive team, credentials and company milestones.',
  },
  {
    title: 'Services & Solutions',
    path: '/services',
    navLabel: 'Services',
    sections: ['pageHeader', 'featureGrid', 'processSteps', 'pricingTiers', 'ctaBanner'],
    description: 'Comprehensive service offerings, workflow process, and engagement tiers.',
  },
  {
    title: 'Pricing & Plans',
    path: '/pricing',
    navLabel: 'Pricing',
    sections: ['pageHeader', 'pricingTiers', 'faq', 'ctaBanner'],
    description: 'Transparent plan tiers, comparison matrix, and billing options.',
  },
  {
    title: 'Contact Us',
    path: '/contact',
    navLabel: 'Contact',
    sections: ['pageHeader', 'contactPanel', 'locationList', 'faq'],
    description: 'Inquiry forms, support hours, global office facilities.',
  },
  {
    title: 'Privacy Policy',
    path: '/policies/privacy',
    navLabel: 'Privacy',
    sections: ['policyDocument'],
    description: 'GDPR / CCPA / statutory privacy data protection policy.',
  },
  {
    title: 'Terms of Service',
    path: '/policies/terms',
    navLabel: 'Terms',
    sections: ['policyDocument'],
    description: 'Statutory merchant terms of service and governing law clauses.',
  },
  {
    title: 'Custom Blank Page',
    path: '/new-page',
    navLabel: 'New Page',
    sections: ['pageHeader', 'prose'],
    description: 'Blank canvas ready for custom section arrangement.',
  },
];

export function PagesPanel() {
  const content = useStudio((s) => s.content);
  const activePagePath = useStudio((s) => s.activePagePath);
  const setActivePage = useStudio((s) => s.setActivePage);
  const mutate = useStudio((s) => s.mutate);

  const [addOpen, setAddOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  if (!content) return null;

  const pages = content.pages ?? [];

  const handleToggleNav = (pageKey: string) => {
    mutate((draft) => {
      const page = draft.pages.find((p) => p.key === pageKey);
      if (page) {
        page.nav = !page.nav;
        // Sync with draft.nav
        if (page.nav) {
          const exists = draft.nav.some((n) => n.href === page.path);
          if (!exists) {
            draft.nav.push({ label: page.navLabel || page.title, href: page.path });
          }
        } else {
          draft.nav = draft.nav.filter((n) => n.href !== page.path);
        }
      }
    });
  };

  const handleDeletePage = (pageKey: string, pageTitle: string) => {
    if (pages.length <= 1) {
      alert('You cannot delete the only remaining page.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete the "${pageTitle}" page?`)) {
      let fallbackPath: string | null = null;
      mutate((draft) => {
        const idx = draft.pages.findIndex((p) => p.key === pageKey);
        if (idx !== -1) {
          const deleted = draft.pages.splice(idx, 1)[0];
          draft.nav = draft.nav.filter((n) => n.href !== deleted.path);
          fallbackPath = draft.pages[0]?.path ?? '/';
        }
      });
      if (fallbackPath && activePagePath === pages.find((p) => p.key === pageKey)?.path) {
        setActivePage(fallbackPath);
      }
    }
  };

  const handleAddPage = (tpl: (typeof PAGE_TEMPLATES)[number]) => {
    let newPagePath = tpl.path;
    mutate((draft) => {
      let candidatePath = tpl.path;
      let counter = 1;
      while (draft.pages.some((p) => p.path === candidatePath)) {
        candidatePath = `${tpl.path}-${counter++}`;
      }
      newPagePath = candidatePath;

      const newKey = `page-${Date.now().toString(36)}`;
      const newPage: SitePage = {
        key: newKey,
        path: candidatePath,
        title: tpl.title,
        navLabel: tpl.navLabel,
        nav: true,
        sections: tpl.sections.map((type, i) => {
          const defaults = defaultPropsFor(type as any);
          return {
            id: `${newKey}-${type}-${i}`,
            type: type as any,
            enabled: true,
            props: {
              ...defaults,
              ...(type === 'pageHeader' ? { headline: tpl.title, subtitle: tpl.description } : {}),
              ...(type === 'policyDocument' ? { title: tpl.title } : {}),
            },
          };
        }),
      };

      draft.pages.push(newPage);
      draft.nav.push({ label: newPage.navLabel || newPage.title, href: newPage.path });
    });
    setActivePage(newPagePath);
    setAddOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 p-4 pb-2">
        <PanelHeader
          title="Pages & Navigation"
          hint="Create and manage multi-page routes, navigation visibility, and titles."
        />
      </div>

      <div className="thin-scroll min-h-0 flex-1 space-y-2 overflow-y-auto p-4 pt-1">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <span>Site Pages ({pages.length})</span>
          <span>In Nav</span>
        </div>

        {pages.map((page) => {
          const isActive = page.path === activePagePath;
          const isHome = page.path === '/';
          const isEditing = editingKey === page.key;

          return (
            <div
              key={page.key}
              className={cn(
                'group rounded-xl border p-3 transition-all',
                isActive
                  ? 'border-primary ring-1 ring-primary/40 bg-primary/5 shadow-sm'
                  : 'border-border bg-card hover:border-border hover:bg-accent/30',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActivePage(page.path)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <div
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground group-hover:text-foreground',
                    )}
                  >
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-semibold text-foreground">
                        {page.navLabel || page.title}
                      </span>
                      {isHome ? (
                        <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold text-primary uppercase tracking-wider">
                          Home
                        </span>
                      ) : null}
                    </div>
                    <span className="truncate font-mono text-[10px] text-muted-foreground">
                      {page.path} &middot; {page.sections.length} section{page.sections.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </button>

                <div className="flex shrink-0 items-center gap-2">
                  <Switch
                    checked={page.nav}
                    onCheckedChange={() => handleToggleNav(page.key)}
                    aria-label="Include in navigation bar"
                    title="Include in navigation bar"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                    onClick={() => setEditingKey(isEditing ? null : page.key)}
                    title="Page settings"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                  </Button>
                  {!isHome && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeletePage(page.key, page.title)}
                      title="Delete page"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Inline Page Settings */}
              {isEditing && (
                <div className="mt-3 space-y-2 border-t border-border/70 pt-3">
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-foreground">
                      Page Title
                    </label>
                    <Input
                      value={page.title}
                      onChange={(e) =>
                        mutate((draft) => {
                          const p = draft.pages.find((x) => x.key === page.key);
                          if (p) p.title = e.target.value;
                        })
                      }
                      className="h-8 text-xs"
                      placeholder="About Our Company"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-foreground">
                      Nav Bar Label
                    </label>
                    <Input
                      value={page.navLabel || ''}
                      onChange={(e) =>
                        mutate((draft) => {
                          const p = draft.pages.find((x) => x.key === page.key);
                          if (p) {
                            p.navLabel = e.target.value;
                            const navItem = draft.nav.find((n) => n.href === p.path);
                            if (navItem) navItem.label = e.target.value;
                          }
                        })
                      }
                      className="h-8 text-xs"
                      placeholder="About"
                    />
                  </div>
                  {!isHome && (
                    <div>
                      <label className="mb-1 block text-[11px] font-medium text-foreground">
                        URL Path
                      </label>
                      <Input
                        value={page.path}
                        onChange={(e) => {
                          const newPath = e.target.value.startsWith('/')
                            ? e.target.value
                            : `/${e.target.value}`;
                          const oldPath = page.path;
                          mutate((draft) => {
                            const p = draft.pages.find((x) => x.key === page.key);
                            if (p) {
                              p.path = newPath;
                              const navItem = draft.nav.find((n) => n.href === oldPath);
                              if (navItem) navItem.href = newPath;
                            }
                          });
                          if (activePagePath === oldPath) {
                            setActivePage(newPath);
                          }
                        }}
                        className="h-8 font-mono text-xs"
                        placeholder="/about"
                      />
                    </div>
                  )}
                  <div className="pt-1 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => setEditingKey(null)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border p-4">
        <Button
          type="button"
          size="sm"
          className="w-full gap-1.5 font-semibold"
          onClick={() => setAddOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Page
        </Button>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Add a New Page</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Select a pre-composed multi-section page template or create a custom blank page.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 pt-2">
            {PAGE_TEMPLATES.map((tpl) => (
              <button
                key={tpl.path}
                type="button"
                onClick={() => handleAddPage(tpl)}
                className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-xs"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">{tpl.title}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{tpl.path}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
