'use client';

import type { SectionType } from '@/site/schema';
import { cn } from '@/lib/utils';

/**
 * Muted-gray static wireframes that schematically preview each section type's
 * real layout. Built entirely from plain divs so they stay monochrome, quiet,
 * and dependency-free.
 */

/* ---- small building blocks ---- */

function Bar({ className }: { className?: string }) {
  return <div className={cn('rounded-sm bg-muted', className)} />;
}

function Line({ className }: { className?: string }) {
  return <div className={cn('h-1.5 rounded-sm bg-muted/70', className)} />;
}

function Box({ className }: { className?: string }) {
  return <div className={cn('rounded-md border border-border/60 bg-muted/50', className)} />;
}

function Card({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn('rounded-lg border border-border/60 bg-muted/30', className)}>{children}</div>
  );
}

function Dot({ className }: { className?: string }) {
  return <div className={cn('rounded-full bg-muted', className)} />;
}

function Chip({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn('rounded-md bg-muted/70', className)}>{children}</div>;
}

/* ---- per-type schematics ---- */

function HeroSkeleton() {
  return (
    <div className="flex h-full w-full flex-col p-3">
      <div className="flex items-center justify-between">
        <Bar className="h-2 w-14" />
        <div className="flex gap-1.5">
          <Bar className="h-2 w-8" />
          <Bar className="h-2 w-8" />
          <Bar className="h-2 w-8" />
        </div>
      </div>
      <div className="mt-3 flex flex-1 gap-3">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <Bar className="h-3 w-11/12" />
          <Bar className="h-3 w-3/4" />
          <Line className="mt-1 w-5/6" />
          <div className="mt-2 flex gap-2">
            <div className="h-4 w-16 rounded-md bg-muted" />
            <div className="h-4 w-16 rounded-md border border-border/60 bg-muted/40" />
          </div>
        </div>
        <Box className="w-2/5" />
      </div>
    </div>
  );
}

function StatsBarSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 p-3">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="flex flex-1 flex-col items-center gap-1.5 p-2">
          <Bar className="h-3 w-3/4" />
          <Line className="w-1/2" />
        </Card>
      ))}
    </div>
  );
}

function TrustBarSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 p-3">
      {[0, 1, 2, 3].map((i) => (
        <Chip key={i} className="flex h-5 flex-1 items-center justify-center">
          <Bar className="h-1.5 w-10" />
        </Chip>
      ))}
    </div>
  );
}

function FeatureGridSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3">
      <Bar className="mx-auto h-2.5 w-1/2" />
      <Line className="mx-auto w-1/3" />
      <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="flex flex-col gap-1.5 p-2">
            <div className="h-4 w-4 rounded bg-muted" />
            <Bar className="h-1.5 w-3/4" />
            <Line className="w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function PricingTiersSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3">
      <Bar className="mx-auto h-2.5 w-1/2" />
      <Line className="mx-auto w-1/3" />
      <div className="mt-1 flex flex-1 items-end gap-2">
        <Card className="flex flex-1 flex-col items-center gap-1.5 p-2">
          <Bar className="h-2 w-12" />
          <Bar className="h-3 w-10" />
          <Line className="w-3/4" />
          <Line className="w-2/3" />
        </Card>
        <Card className="flex h-[92%] flex-1 flex-col items-center gap-1.5 border-primary/40 bg-muted/50 p-2">
          <Bar className="h-2 w-12" />
          <Bar className="h-3 w-10" />
          <Line className="w-3/4" />
          <Line className="w-2/3" />
          <div className="mt-auto h-3.5 w-3/4 rounded-md bg-muted" />
        </Card>
        <Card className="flex flex-1 flex-col items-center gap-1.5 p-2">
          <Bar className="h-2 w-12" />
          <Bar className="h-3 w-10" />
          <Line className="w-3/4" />
          <Line className="w-2/3" />
        </Card>
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3">
      <Bar className="mx-auto h-2.5 w-1/2" />
      <div className="mt-1 grid flex-1 grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} className="flex flex-col gap-1.5 p-1.5">
            <div className="aspect-square w-full rounded bg-muted/60" />
            <Bar className="h-1.5 w-3/4" />
            <Line className="w-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="flex h-full w-full items-center gap-2 p-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex flex-1 flex-col gap-1.5 p-2">
          <Line className="w-full" />
          <Line className="w-5/6" />
          <div className="mt-auto flex items-center gap-1.5">
            <Dot className="h-3.5 w-3.5" />
            <div className="flex flex-col gap-1">
              <Bar className="h-1.5 w-12" />
              <Line className="w-8" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function FaqSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-3">
      <Bar className="mx-auto h-2.5 w-1/3" />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between rounded-md border border-border/60 bg-muted/30 px-2 py-1.5">
          <Bar className="h-1.5 w-2/3" />
          <div className="h-2 w-2 rounded-sm bg-muted" />
        </div>
      ))}
    </div>
  );
}

function CtaBannerSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3">
      <Bar className="h-2.5 w-2/3" />
      <Line className="w-1/2" />
      <div className="mt-1 h-4 w-20 rounded-md bg-muted" />
    </div>
  );
}

function PageHeaderSkeleton() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1.5 p-3">
      <Bar className="h-1.5 w-16" />
      <Bar className="h-3 w-2/3" />
      <Line className="w-1/2" />
      <div className="mt-1 flex items-center gap-1">
        <Dot className="h-1.5 w-1.5" />
        <Dot className="h-1.5 w-1.5" />
        <Dot className="h-1.5 w-1.5" />
      </div>
    </div>
  );
}

function ProseSkeleton() {
  return (
    <div className="flex h-full w-full gap-3 p-3">
      <div className="flex flex-1 flex-col gap-2">
        <Bar className="h-3 w-3/4" />
        <Line className="w-full" />
        <Line className="w-full" />
        <Line className="w-5/6" />
        <Line className="w-2/3" />
      </div>
      <Box className="w-2/5" />
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-0 p-3">
      <div className="relative ml-2 flex flex-col gap-2.5">
        <div className="absolute bottom-1 left-0 top-1 w-px bg-muted" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="relative flex items-center gap-2 pl-3">
            <Dot className="absolute left-[-4px] h-2 w-2" />
            <Bar className="h-1.5 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamGridSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 p-3">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="flex flex-1 flex-col items-center gap-1.5 p-2">
          <Dot className="h-8 w-8" />
          <Bar className="h-1.5 w-3/4" />
          <Line className="w-1/2" />
        </Card>
      ))}
    </div>
  );
}

function ValueGridSkeleton() {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-2 p-3">
      {[0, 1, 2, 3].map((i) => (
        <Card key={i} className="flex items-center gap-2 p-2">
          <div className="h-5 w-5 shrink-0 rounded bg-muted" />
          <div className="flex flex-1 flex-col gap-1">
            <Bar className="h-1.5 w-3/4" />
            <Line className="w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function ProcessStepsSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-1.5 p-3">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex flex-1 items-center gap-1.5">
          <Card className="flex flex-1 flex-col items-center gap-1.5 p-2">
            <div className="h-3.5 w-3.5 rounded-full bg-muted" />
            <Bar className="h-1.5 w-3/4" />
            <Line className="w-full" />
          </Card>
          {i < 3 && <div className="h-px w-2 shrink-0 bg-muted" />}
        </div>
      ))}
    </div>
  );
}

function SlaTableSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-3">
      <Bar className="h-2.5 w-1/3" />
      <div className="flex flex-1 flex-col overflow-hidden rounded-md border border-border/60">
        <div className="flex gap-1 border-b border-border/60 bg-muted/40 px-2 py-1.5">
          <Bar className="h-1.5 flex-1" />
          <Bar className="h-1.5 flex-1" />
          <Bar className="h-1.5 flex-1" />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1 border-b border-border/40 px-2 py-1.5 last:border-0">
            <Line className="flex-1" />
            <Line className="flex-1" />
            <Line className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationListSkeleton() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 p-3">
      {[0, 1, 2].map((i) => (
        <Card key={i} className="flex items-center gap-2 p-2">
          <div className="h-3.5 w-3.5 rounded bg-muted" />
          <div className="flex flex-1 flex-col gap-1">
            <Bar className="h-1.5 w-1/3" />
            <Line className="w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function CorporateRegistrationSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center p-3">
      <Card className="flex w-4/5 flex-col gap-2 p-2.5">
        <Bar className="h-2.5 w-1/2" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Bar className="h-1.5 w-1/4" />
            <Line className="flex-1" />
          </div>
        ))}
      </Card>
    </div>
  );
}

function ContactPanelSkeleton() {
  return (
    <div className="flex h-full w-full gap-3 p-3">
      <div className="flex flex-1 flex-col justify-center gap-2">
        <Bar className="h-2.5 w-3/4" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded bg-muted" />
            <Line className="w-1/2" />
          </div>
        ))}
      </div>
      <Card className="flex w-1/2 flex-col gap-1.5 p-2">
        <div className="h-3.5 rounded-md bg-muted/60" />
        <div className="h-3.5 rounded-md bg-muted/60" />
        <div className="h-6 flex-1 rounded-md bg-muted/40" />
        <div className="h-3.5 w-1/2 rounded-md bg-muted" />
      </Card>
    </div>
  );
}

function PolicyDocumentSkeleton() {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-3">
      <Bar className="h-3 w-1/2" />
      <Line className="w-full" />
      <Line className="w-full" />
      <Line className="w-full" />
      <Line className="w-11/12" />
      <Line className="w-full" />
      <Line className="w-4/5" />
    </div>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="flex h-full w-full gap-3 p-3">
      <div className="flex flex-1 flex-col gap-1.5">
        <Bar className="h-2.5 w-1/3" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3.5 rounded-md bg-muted/50" />
        ))}
      </div>
      <Card className="flex w-2/5 flex-col gap-1.5 p-2">
        <Bar className="h-2 w-1/2" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <Line className="w-1/3" />
            <Line className="w-1/4" />
          </div>
        ))}
        <div className="mt-auto h-3.5 rounded-md bg-muted" />
      </Card>
    </div>
  );
}

/* ---- dispatcher ---- */

const SKELETONS: Record<SectionType, () => React.JSX.Element> = {
  hero: HeroSkeleton,
  statsBar: StatsBarSkeleton,
  trustBar: TrustBarSkeleton,
  featureGrid: FeatureGridSkeleton,
  pricingTiers: PricingTiersSkeleton,
  productGrid: ProductGridSkeleton,
  testimonials: TestimonialsSkeleton,
  faq: FaqSkeleton,
  ctaBanner: CtaBannerSkeleton,
  pageHeader: PageHeaderSkeleton,
  prose: ProseSkeleton,
  timeline: TimelineSkeleton,
  teamGrid: TeamGridSkeleton,
  valueGrid: ValueGridSkeleton,
  processSteps: ProcessStepsSkeleton,
  slaTable: SlaTableSkeleton,
  locationList: LocationListSkeleton,
  corporateRegistration: CorporateRegistrationSkeleton,
  contactPanel: ContactPanelSkeleton,
  policyDocument: PolicyDocumentSkeleton,
  checkout: CheckoutSkeleton,
};

export function SectionSkeleton({ type }: { type: SectionType }) {
  const Skeleton = SKELETONS[type];
  return <div className="h-full w-full">{Skeleton ? <Skeleton /> : null}</div>;
}