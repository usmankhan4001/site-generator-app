'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BentoFeature } from '@/lib/constants';

interface BentoGridProps {
  features: BentoFeature[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function BentoGrid({
  features,
  eyebrow = 'Engineered Capabilities',
  title = 'Designed for Speed, Security & Precision',
  description = 'Explore our purpose-built technical foundations engineered to deliver unmatched reliability and performance.',
}: BentoGridProps) {
  if (!features || features.length === 0) return null;

  return (
    <section id="features" className="py-20 md:py-28">
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

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            // Give the first card a prominent asymmetric emphasis if 3 items
            const isFeatured = idx === 0 && features.length === 3;

            return (
              <Card
                key={idx}
                className={`card-elevated flex flex-col justify-between overflow-hidden group border border-border/80 ${
                  isFeatured ? 'md:col-span-1' : ''
                }`}
              >
                {/* Image Container with Tag Badge */}
                <div className="h-52 sm:h-56 overflow-hidden relative bg-muted">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {feature.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-background/90 text-foreground backdrop-blur-sm shadow-xs border border-border/50">
                        {feature.badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6 pt-5">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-bold text-foreground">
                      {feature.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
