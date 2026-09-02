'use client';

import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { TestimonialItem } from '@/lib/constants';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
  eyebrow?: string;
  title?: string;
}

export function Testimonials({
  testimonials,
  eyebrow = 'Client Validation',
  title = 'Trusted by Forward-Thinking Leaders',
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4">
            {title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              className="card-elevated p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-card"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Author Info with Headshot */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-border/70">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border shadow-xs"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-medium">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
