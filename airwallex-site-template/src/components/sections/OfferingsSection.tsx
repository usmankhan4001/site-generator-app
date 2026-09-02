'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { OfferingItem } from '@/lib/constants';

interface OfferingsSectionProps {
  offerings: OfferingItem[];
  onSelectOffering: (item: OfferingItem) => void;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function OfferingsSection({
  offerings,
  onSelectOffering,
  eyebrow = 'Transparent Investment',
  title = 'Packages Built For Your Scale',
  description = 'Clear pricing, full intellectual property ownership, and direct milestone guarantees with no hidden fees.',
}: OfferingsSectionProps) {
  if (!offerings || offerings.length === 0) return null;

  return (
    <section id="offerings" className="py-20 md:py-28 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Offerings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {offerings.map((item) => {
            const isHighTicket = item.price >= 1000;
            const ctaLabel = isHighTicket ? `Select ${item.name}` : `Order ${item.name}`;

            return (
              <Card
                key={item.id}
                className={`card-elevated flex flex-col justify-between relative transition-all duration-300 ${
                  item.popular
                    ? 'ring-2 ring-primary shadow-xl md:-translate-y-1 bg-card'
                    : 'bg-card/80 hover:bg-card'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-md flex items-center gap-1">
                      <Zap className="h-3 w-3 fill-current" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}

                <CardHeader className="pt-6 pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl font-bold text-foreground">
                      {item.name}
                    </CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed min-h-[36px]">
                    {item.description}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                      ${item.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold uppercase">
                      USD
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <Separator className="mb-4" />
                  <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                    {item.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 pb-6">
                  <Button
                    className="w-full h-11 text-sm font-semibold shadow-sm transition-transform active:scale-98"
                    variant={item.popular ? 'default' : 'outline'}
                    onClick={() => onSelectOffering(item)}
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
