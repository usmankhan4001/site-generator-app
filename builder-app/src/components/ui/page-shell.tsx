import * as React from "react";
import { cn } from "@/lib/utils";

const shellWidths = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[80rem]",
  full: "max-w-full",
} as const;

export interface PageShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content column width. Defaults to `xl` (80rem). */
  maxWidth?: keyof typeof shellWidths;
}

/**
 * Consistent page container — centered, generous 8px-grid padding.
 * Pair with `PageHeader` for a title + optional actions row.
 */
const PageShell = React.forwardRef<HTMLDivElement, PageShellProps>(
  ({ className, maxWidth = "xl", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto px-6 py-8", shellWidths[maxWidth], className)}
      {...props}
    />
  )
);
PageShell.displayName = "PageShell";

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Page title — rendered as an h1 (text-2xl font-semibold tracking-tight). */
  title: React.ReactNode;
  /** Optional supporting copy under the title. */
  description?: React.ReactNode;
  /** Optional actions (buttons, etc.) rendered right-aligned. */
  actions?: React.ReactNode;
}

/**
 * Page header — title + optional description on the left, actions on the right.
 * Wraps gracefully on narrow widths.
 */
const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, title, description, actions, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex flex-wrap items-start justify-between gap-4",
        className
      )}
      {...props}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </header>
  )
);
PageHeader.displayName = "PageHeader";

export { PageShell, PageHeader };