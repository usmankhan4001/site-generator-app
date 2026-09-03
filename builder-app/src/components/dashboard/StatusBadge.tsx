import { cn } from '@/lib/utils';

type Status = 'draft' | 'deploying' | 'live' | 'error' | (string & {});

const STYLES: Record<
  string,
  { label: string; dot: string; text: string; ring: string }
> = {
  draft: {
    label: 'Draft',
    dot: 'bg-muted-foreground',
    text: 'text-muted-foreground',
    ring: 'border-border bg-muted/40',
  },
  deploying: {
    label: 'Deploying',
    dot: 'bg-amber-400 animate-pulse',
    text: 'text-amber-300',
    ring: 'border-amber-500/30 bg-amber-500/10',
  },
  live: {
    label: 'Live',
    dot: 'bg-emerald-400',
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
  const s = STYLES[status] ?? {
    label: status ? status[0].toUpperCase() + status.slice(1) : 'Unknown',
    dot: 'bg-muted-foreground',
    text: 'text-muted-foreground',
    ring: 'border-border bg-muted/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium',
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
