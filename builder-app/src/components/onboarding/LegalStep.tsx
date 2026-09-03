'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useJurisdictionPresets } from '@/components/studio/panels/useOptionalData';
import { Field, textareaClass } from './primitives';
import type { LegalDetails, OnboardingData } from './types';

export function LegalStep({
  data,
  patchLegal,
}: {
  data: OnboardingData;
  patchLegal: (p: Partial<LegalDetails>) => void;
}) {
  const presets = useJurisdictionPresets();
  const [formatHint, setFormatHint] = useState<string | null>(null);
  const l = data.legal;

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Optional for now — you can finish these later. When set, they power the footer legal
        bar, the contact section and the policy pages on your site.
      </p>

      {presets && presets.length ? (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Quick-fill by jurisdiction</p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                title={p.regNumberFormat}
                onClick={() => {
                  patchLegal({ jurisdiction: p.jurisdiction });
                  setFormatHint(p.regNumberFormat ?? null);
                }}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Legal entity name" htmlFor="entityName" optional className="sm:col-span-2">
          <Input
            id="entityName"
            value={l.entityName}
            onChange={(e) => patchLegal({ entityName: e.target.value })}
            placeholder="Acme Technologies Pte. Ltd."
          />
        </Field>

        <Field
          label="Registration number"
          htmlFor="registrationNumber"
          optional
          hint={formatHint ?? undefined}
        >
          <Input
            id="registrationNumber"
            value={l.registrationNumber}
            onChange={(e) => patchLegal({ registrationNumber: e.target.value })}
          />
        </Field>

        <Field label="Jurisdiction" htmlFor="jurisdiction" optional>
          <Input
            id="jurisdiction"
            value={l.jurisdiction}
            onChange={(e) => patchLegal({ jurisdiction: e.target.value })}
            placeholder="Singapore"
          />
        </Field>

        <Field
          label="Registered address"
          htmlFor="registeredAddress"
          optional
          className="sm:col-span-2"
        >
          <textarea
            id="registeredAddress"
            rows={2}
            value={l.registeredAddress}
            onChange={(e) => patchLegal({ registeredAddress: e.target.value })}
            className={textareaClass}
          />
        </Field>

        <Field label="Contact email" htmlFor="contactEmail" optional>
          <Input
            id="contactEmail"
            type="email"
            value={l.contactEmail}
            onChange={(e) => patchLegal({ contactEmail: e.target.value })}
            placeholder="hello@acme.com"
          />
        </Field>

        <Field label="Contact phone" htmlFor="contactPhone" optional>
          <Input
            id="contactPhone"
            value={l.contactPhone}
            onChange={(e) => patchLegal({ contactPhone: e.target.value })}
            placeholder="+65 6123 4567"
          />
        </Field>
      </div>
    </div>
  );
}
