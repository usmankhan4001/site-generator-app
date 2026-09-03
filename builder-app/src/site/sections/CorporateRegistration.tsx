import { Building2 } from 'lucide-react';
import { cn } from '@/site/lib/cn';
import type { CorporateRegistrationProps, SiteContent } from '@/site/schema';

/**
 * "Statutory Entity Profile" panel ported from the template about page — a
 * `.card-elevated` box of label / value rows. Every field falls back to
 * `content.business.*`. Registration numbers / domain / IDs use `font-mono`.
 */
export default function CorporateRegistration({
  props,
  content,
}: {
  props: CorporateRegistrationProps;
  content: SiteContent;
}) {
  const b = content.business;

  const entityName = props.entityName ?? b.name;
  const registrationNumber = props.registrationNumber ?? b.registrationNumber;
  const jurisdiction = props.jurisdiction ?? b.jurisdiction;
  const governingLaw = props.governingLaw ?? b.governingLaw;
  const registeredAddress = props.registeredAddress ?? b.registeredAddress;
  const domain = b.website;
  const taxId = props.taxId ?? b.taxId;
  const asNumber = props.asNumber ?? b.asNumber;
  const email = props.contactEmail ?? b.email;
  const phone = props.contactPhone ?? b.phone;

  const rows: { label: string; value: string; mono?: boolean }[] = [
    { label: 'Registration No.', value: registrationNumber, mono: true },
    { label: 'Governing Jurisdiction', value: jurisdiction },
    { label: 'Governing Law', value: governingLaw },
    { label: 'Registered Address', value: registeredAddress },
    { label: 'Official Domain', value: domain, mono: true },
    ...(taxId ? [{ label: 'Tax ID', value: taxId, mono: true }] : []),
    ...(asNumber ? [{ label: 'AS Number', value: asNumber, mono: true }] : []),
    { label: 'Official Desk', value: email },
    ...(phone ? [{ label: 'Telephone', value: phone, mono: true }] : []),
  ];

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          {props.eyebrow ? (
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {props.eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2 mb-4 text-foreground">
            {props.title ?? 'Statutory Entity Profile'}
          </h2>
          {props.description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {props.description}
            </p>
          ) : null}
        </div>

        <div className="card-elevated rounded-2xl p-8 border border-border bg-card space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">{entityName}</h3>
              <p className="text-xs text-muted-foreground">Statutory Entity Profile</p>
            </div>
          </div>

          <dl className="pt-2 border-t border-border text-sm">
            {rows.map((row, i) => (
              <div
                key={i}
                className="flex justify-between gap-4 py-3 border-b border-border/60 last:border-0"
              >
                <dt className="text-muted-foreground shrink-0">{row.label}</dt>
                <dd
                  className={cn(
                    'font-medium text-foreground text-right',
                    row.mono && 'font-mono',
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
