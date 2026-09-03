import { cn } from '@/lib/utils';

type Status = 'draft' | 'deploying' | 'publishing' | 'live' | 'error' | (string & {});

interface StatusConfig {
  label: string;
  dot: string;
  text: string;
  ring: string;
}

const STYLES: Record<string, StatusConfig> = {
  draft: {
    label: 'Draft',
    dot: 'bg-muted-foreground/60',
    text: 'text-muted-foreground',
    ring: 'border-border/70 bg-muted/30',
  },
  deploying: {
    label: 'Deploying',
    dot: 'bg-amber-400 animate-pulse',
    text: 'text-amber-300',
    ring: 'border-amber-500/30 bg-amber-500/10',
  },
  publishing: {
    label: 'Publishing',
    dot: 'bg-amber-400 animate-pulse',
    text: 'text-amber-300',
    ring: 'border-amber-500/30 bg-amber-500/10',
  },
  live: {
    label: 'Live',
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    text: 'text-emerald-300',
    ring: 'border-emerald-500/30 bg-emerald-500/10',
  },
  error: {
    label: 'Error',
    dot: 'bg-red-400',
    text: 'text-red-300',
    ring: 'border-red-500/30 bg-red-500/10',
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const normalized = (status || 'draft').toLowerCase();
  const s = STYLES[normalized] ?? {
    label: status ? status[0].toUpperCase() + status.slice(1) : 'Unknown',
    dot: 'bg-muted-foreground/60',
    text: 'text-muted-foreground',
    ring: 'border-border/70 bg-muted/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-tight',
        s.ring,
        s.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.dot)} />
      {s.label}
    </span>
  );
}
