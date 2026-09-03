'use client';

import { Briefcase, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field, SelectableCard, textareaClass } from './primitives';
import type { OnboardingData } from './types';

export function BusinessStep({
  data,
  patch,
}: {
  data: OnboardingData;
  patch: (p: Partial<OnboardingData>) => void;
}) {
  return (
    <div className="space-y-8">
      <Field
        label="What does your business do?"
        htmlFor="niche"
        hint="A sentence or two, in plain language. This anchors everything we generate."
      >
        <textarea
          id="niche"
          rows={3}
          value={data.niche}
          onChange={(e) => patch({ niche: e.target.value })}
          placeholder="e.g. We help small dental clinics manage bookings, reminders and patient records in one place."
          className={textareaClass}
        />
      </Field>

      <Field label="Which best describes you?">
        <div className="grid gap-3 sm:grid-cols-2">
          <SelectableCard
            selected={data.preferredMode === 'services'}
            onClick={() => patch({ preferredMode: 'services' })}
            icon={<Briefcase />}
            title="We provide services"
            description="Consulting, agencies, software, professional or done-for-you work."
          />
          <SelectableCard
            selected={data.preferredMode === 'ecommerce'}
            onClick={() => patch({ preferredMode: 'ecommerce' })}
            icon={<ShoppingBag />}
            title="We sell products"
            description="Physical or digital goods, a catalogue, an online store."
          />
        </div>
      </Field>

      <Field
        label="Who are your customers?"
        htmlFor="targetAudience"
        optional
        hint="Helps us pitch the copy at the right audience."
      >
        <Input
          id="targetAudience"
          value={data.targetAudience}
          onChange={(e) => patch({ targetAudience: e.target.value })}
          placeholder="e.g. Independent dental practices in the UK"
        />
      </Field>
    </div>
  );
}
