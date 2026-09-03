'use client';

import { useStudio } from '@/store/studio';
import type {
  Section,
  HeroProps,
  StatsBarProps,
  TrustBarProps,
  FeatureGridProps,
  PricingTiersProps,
  ProductGridProps,
  TestimonialsProps,
  FaqProps,
  CtaBannerProps,
  PageHeaderProps,
  ProseProps,
  TimelineProps,
  TeamGridProps,
  ValueGridProps,
  ProcessStepsProps,
  SlaTableProps,
  LocationListProps,
  CorporateRegistrationProps,
  ContactPanelProps,
  PolicyDocumentProps,
  CatalogItem,
  Testimonial,
  Faq,
  Milestone,
  TeamMember,
  IconItem,
  ProcessStep,
  SlaRow,
  StatItem,
  PolicyBlock,
} from '@/site/schema';
import {
  TextField,
  TextArea,
  NumberField,
  SwitchField,
  SelectField,
  ImageField,
  CtaField,
  StringListField,
  RecordField,
  ListField,
  SectionLabel,
} from './fields';

/** Section-heading fields shared by most editors. */
function HeadingFields<T extends { eyebrow?: string; title?: string; description?: string }>({
  props,
  patch,
}: {
  props: T;
  patch: (p: Partial<T>) => void;
}) {
  return (
    <>
      <TextField label="Eyebrow" value={props.eyebrow} onChange={(v) => patch({ eyebrow: v || undefined } as Partial<T>)} />
      <TextField label="Title" value={props.title} onChange={(v) => patch({ title: v } as Partial<T>)} />
      <TextArea
        label="Description"
        value={props.description}
        onChange={(v) => patch({ description: v || undefined } as Partial<T>)}
        rows={2}
      />
    </>
  );
}

export function SectionEditor({ section }: { section: Section }) {
  const updateSectionProps = useStudio((s) => s.updateSectionProps);
  const patch = (p: Record<string, unknown>) => updateSectionProps(section.id, p);

  switch (section.type) {
    case 'hero':
      return <HeroEditor props={section.props} patch={patch} />;
    case 'statsBar':
      return <StatsBarEditor props={section.props} patch={patch} />;
    case 'trustBar':
      return <TrustBarEditor props={section.props} patch={patch} />;
    case 'featureGrid':
      return <FeatureGridEditor props={section.props} patch={patch} />;
    case 'pricingTiers':
      return <PricingTiersEditor props={section.props} patch={patch} />;
    case 'productGrid':
      return <ProductGridEditor props={section.props} patch={patch} />;
    case 'testimonials':
      return <TestimonialsEditor props={section.props} patch={patch} />;
    case 'faq':
      return <FaqEditor props={section.props} patch={patch} />;
    case 'ctaBanner':
      return <CtaBannerEditor props={section.props} patch={patch} />;
    case 'pageHeader':
      return <PageHeaderEditor props={section.props} patch={patch} />;
    case 'prose':
      return <ProseEditor props={section.props} patch={patch} />;
    case 'timeline':
      return <TimelineEditor props={section.props} patch={patch} />;
    case 'teamGrid':
      return <TeamGridEditor props={section.props} patch={patch} />;
    case 'valueGrid':
      return <ValueGridEditor props={section.props} patch={patch} />;
    case 'processSteps':
      return <ProcessStepsEditor props={section.props} patch={patch} />;
    case 'slaTable':
      return <SlaTableEditor props={section.props} patch={patch} />;
    case 'locationList':
      return <LocationListEditor props={section.props} patch={patch} />;
    case 'corporateRegistration':
      return <CorporateRegistrationEditor props={section.props} patch={patch} />;
    case 'contactPanel':
      return <ContactPanelEditor props={section.props} patch={patch} />;
    case 'policyDocument':
      return <PolicyDocumentEditor props={section.props} patch={patch} />;
    default:
      return <p className="text-xs text-muted-foreground">No editor for this section yet.</p>;
  }
}

/* ------------------------------------------------------------------ hero -- */

function HeroEditor({ props, patch }: { props: HeroProps; patch: (p: Partial<HeroProps>) => void }) {
  return (
    <>
      <TextField label="Badge" value={props.badge} onChange={(v) => patch({ badge: v || undefined })} />
      <TextField label="Headline" value={props.headline} onChange={(v) => patch({ headline: v })} />
      <TextField
        label="Accent text"
        value={props.accentText}
        onChange={(v) => patch({ accentText: v || undefined })}
        hint="Appended after the headline in the primary colour."
      />
      <TextArea label="Subtitle" value={props.subtitle} onChange={(v) => patch({ subtitle: v })} rows={2} />
      <SelectField
        label="Layout"
        value={props.layout ?? 'centered'}
        onChange={(v) => patch({ layout: v })}
        options={[
          { value: 'centered', label: 'Centered' },
          { value: 'split', label: 'Split (image right)' },
        ]}
      />
      <ImageField value={props.image} onChange={(v) => patch({ image: v })} />
      <CtaField label="Primary CTA" value={props.primaryCta} onChange={(v) => patch({ primaryCta: v })} />
      <CtaField label="Secondary CTA" value={props.secondaryCta} onChange={(v) => patch({ secondaryCta: v })} />
      <StringListField
        label="Trust badges"
        items={props.trustBadges}
        onChange={(v) => patch({ trustBadges: v })}
        placeholder="99.99% Uptime SLA"
        addLabel="Add trust badge"
      />
    </>
  );
}

/* -------------------------------------------------------------- stats bar -- */

function StatsBarEditor({ props, patch }: { props: StatsBarProps; patch: (p: Partial<StatsBarProps>) => void }) {
  return (
    <ListField<StatItem>
      label="Metrics"
      items={props.items}
      onChange={(v) => patch({ items: v })}
      newItem={() => ({ value: '100%', label: 'New metric' })}
      itemTitle={(it) => `${it.value} — ${it.label}`}
      addLabel="Add metric"
      renderItem={(it, update) => (
        <>
          <TextField label="Value" value={it.value} onChange={(v) => update({ value: v })} />
          <TextField label="Label" value={it.label} onChange={(v) => update({ label: v })} />
          <TextField label="Subtext" value={it.subtext} onChange={(v) => update({ subtext: v || undefined })} />
        </>
      )}
    />
  );
}

/* -------------------------------------------------------------- trust bar -- */

function TrustBarEditor({ props, patch }: { props: TrustBarProps; patch: (p: Partial<TrustBarProps>) => void }) {
  return (
    <>
      <SelectField
        label="Style"
        value={props.variant ?? 'pills'}
        onChange={(v) => patch({ variant: v })}
        options={[
          { value: 'pills', label: 'Text pills' },
          { value: 'logos', label: 'Logo wall' },
        ]}
      />
      <TextField label="Title" value={props.title} onChange={(v) => patch({ title: v || undefined })} />
      <StringListField
        label="Items"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        placeholder="AWS & GCP Certified"
      />
    </>
  );
}

/* ---------------------------------------------------------- feature grid -- */

function FeatureGridEditor({
  props,
  patch,
}: {
  props: FeatureGridProps;
  patch: (p: Partial<FeatureGridProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<FeatureGridProps['items'][number]>
        label="Features"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        newItem={() => ({ title: 'New feature', description: '' })}
        itemTitle={(it) => it.title}
        addLabel="Add feature"
        renderItem={(it, update) => (
          <>
            <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
            <TextField label="Badge" value={it.badge} onChange={(v) => update({ badge: v || undefined })} />
            <TextField label="Icon (lucide name)" value={it.icon} onChange={(v) => update({ icon: v || undefined })} />
            <ImageField value={it.image} onChange={(v) => update({ image: v })} />
          </>
        )}
      />
    </>
  );
}

/* --------------------------------------------------------- catalog items -- */

function CatalogItemFields({
  it,
  update,
  variant,
}: {
  it: CatalogItem;
  update: (patch: Partial<CatalogItem>) => void;
  variant: 'tier' | 'product' | 'plan';
}) {
  return (
    <>
      <TextField label="Name" value={it.name} onChange={(v) => update({ name: v })} />
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Price" value={it.price} onChange={(v) => update({ price: v ?? 0 })} min={0} />
        <TextField label="Price unit" value={it.priceUnit} onChange={(v) => update({ priceUnit: v || undefined })} placeholder="/mo" />
      </div>
      <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
      <StringListField label="Features" items={it.features} onChange={(v) => update({ features: v })} addLabel="Add feature" />
      <div className="grid grid-cols-2 gap-2">
        <SwitchField label="Popular" checked={!!it.popular} onChange={(v) => update({ popular: v })} />
        <TextField label="Badge" value={it.badge} onChange={(v) => update({ badge: v || undefined })} />
      </div>
      {variant === 'product' ? (
        <>
          <ImageField value={it.image} onChange={(v) => update({ image: v })} />
          <div className="grid grid-cols-2 gap-2">
            <TextField label="SKU" value={it.sku} onChange={(v) => update({ sku: v || undefined })} />
            <TextField label="Category" value={it.category} onChange={(v) => update({ category: v || undefined })} />
          </div>
          <SwitchField label="In stock" checked={it.inStock !== false} onChange={(v) => update({ inStock: v })} />
        </>
      ) : null}
      {variant === 'plan' ? (
        <>
          <RecordField
            label="Specs"
            value={it.specs}
            onChange={(v) => update({ specs: v })}
            keyPlaceholder="CPU"
            valuePlaceholder="8 vCPU"
          />
          <TextField label="SLA" value={it.sla} onChange={(v) => update({ sla: v || undefined })} />
          <StringListField label="Locations" items={it.locations} onChange={(v) => update({ locations: v })} />
        </>
      ) : null}
    </>
  );
}

function PricingTiersEditor({
  props,
  patch,
}: {
  props: PricingTiersProps;
  patch: (p: Partial<PricingTiersProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <TextField label="Currency" value={props.currency} onChange={(v) => patch({ currency: v || undefined })} placeholder="USD" />
      <TextField label="CTA link" value={props.ctaHref} onChange={(v) => patch({ ctaHref: v || undefined })} placeholder="/contact" />
      <ListField<CatalogItem>
        label="Tiers"
        items={props.tiers}
        onChange={(v) => patch({ tiers: v })}
        newItem={() => ({ id: `tier-${Date.now().toString(36)}`, name: 'New tier', price: 0, description: '', features: [] })}
        itemTitle={(it) => it.name}
        addLabel="Add tier"
        renderItem={(it, update) => <CatalogItemFields it={it} update={update} variant="tier" />}
      />
    </>
  );
}

function ProductGridEditor({
  props,
  patch,
}: {
  props: ProductGridProps;
  patch: (p: Partial<ProductGridProps>) => void;
}) {
  const variant = props.layout === 'plans' ? 'plan' : 'product';
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <SelectField
        label="Layout"
        value={props.layout ?? 'products'}
        onChange={(v) => patch({ layout: v })}
        options={[
          { value: 'products', label: 'Products (image cards)' },
          { value: 'plans', label: 'Plans (spec cards)' },
        ]}
      />
      <TextField label="Currency" value={props.currency} onChange={(v) => patch({ currency: v || undefined })} placeholder="USD" />
      <StringListField label="Filter categories" items={props.categories} onChange={(v) => patch({ categories: v })} />
      <CtaField label="Bottom CTA" value={props.cta} onChange={(v) => patch({ cta: v })} />
      <ListField<CatalogItem>
        label="Items"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        newItem={() => ({ id: `item-${Date.now().toString(36)}`, name: 'New item', price: 0, description: '', features: [] })}
        itemTitle={(it) => it.name}
        addLabel="Add item"
        renderItem={(it, update) => <CatalogItemFields it={it} update={update} variant={variant} />}
      />
    </>
  );
}

/* --------------------------------------------------------- testimonials -- */

function TestimonialsEditor({
  props,
  patch,
}: {
  props: TestimonialsProps;
  patch: (p: Partial<TestimonialsProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<Testimonial>
        label="Quotes"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        newItem={() => ({ name: 'New client', role: '', text: '' })}
        itemTitle={(it) => it.name}
        addLabel="Add quote"
        renderItem={(it, update) => (
          <>
            <TextArea label="Quote" value={it.text} onChange={(v) => update({ text: v })} rows={3} />
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Name" value={it.name} onChange={(v) => update({ name: v })} />
              <TextField label="Role" value={it.role} onChange={(v) => update({ role: v })} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Company" value={it.company} onChange={(v) => update({ company: v || undefined })} />
              <NumberField label="Rating (1-5)" value={it.rating} onChange={(v) => update({ rating: v })} min={1} />
            </div>
            <ImageField label="Avatar" value={it.avatar} onChange={(v) => update({ avatar: v })} />
          </>
        )}
      />
    </>
  );
}

/* ------------------------------------------------------------------- faq -- */

function FaqEditor({ props, patch }: { props: FaqProps; patch: (p: Partial<FaqProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<Faq>
        label="Questions"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        newItem={() => ({ q: 'New question?', a: '' })}
        itemTitle={(it) => it.q}
        addLabel="Add question"
        renderItem={(it, update) => (
          <>
            <TextField label="Question" value={it.q} onChange={(v) => update({ q: v })} />
            <TextArea label="Answer" value={it.a} onChange={(v) => update({ a: v })} rows={3} />
          </>
        )}
      />
    </>
  );
}

/* -------------------------------------------------------------- cta banner -- */

function CtaBannerEditor({
  props,
  patch,
}: {
  props: CtaBannerProps;
  patch: (p: Partial<CtaBannerProps>) => void;
}) {
  return (
    <>
      <TextField label="Headline" value={props.headline} onChange={(v) => patch({ headline: v })} />
      <TextArea label="Subtitle" value={props.subtitle} onChange={(v) => patch({ subtitle: v || undefined })} rows={2} />
      <CtaField label="Primary CTA" value={props.primaryCta} onChange={(v) => patch({ primaryCta: v })} />
      <CtaField label="Secondary CTA" value={props.secondaryCta} onChange={(v) => patch({ secondaryCta: v })} />
      <TextField label="Guarantee line" value={props.guarantee} onChange={(v) => patch({ guarantee: v || undefined })} />
    </>
  );
}

/* ------------------------------------------------------------- page header -- */

function PageHeaderEditor({
  props,
  patch,
}: {
  props: PageHeaderProps;
  patch: (p: Partial<PageHeaderProps>) => void;
}) {
  return (
    <>
      <TextField label="Eyebrow" value={props.eyebrow} onChange={(v) => patch({ eyebrow: v || undefined })} />
      <TextField label="Headline" value={props.headline} onChange={(v) => patch({ headline: v })} />
      <TextArea label="Subtitle" value={props.subtitle} onChange={(v) => patch({ subtitle: v || undefined })} rows={2} />
      <TextField label="Meta line" value={props.meta} onChange={(v) => patch({ meta: v || undefined })} />
    </>
  );
}

/* ------------------------------------------------------------------- prose -- */

function ProseEditor({ props, patch }: { props: ProseProps; patch: (p: Partial<ProseProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ImageField value={props.image} onChange={(v) => patch({ image: v })} />
      <ListField<PolicyBlock>
        label="Blocks"
        items={props.blocks}
        onChange={(v) => patch({ blocks: v })}
        newItem={() => ({ heading: '', body: '' })}
        itemTitle={(it) => it.heading || 'Block'}
        addLabel="Add block"
        renderItem={(it, update) => (
          <>
            <TextField label="Heading" value={it.heading} onChange={(v) => update({ heading: v })} />
            <TextArea label="Body (markdown)" value={it.body} onChange={(v) => update({ body: v })} rows={4} />
          </>
        )}
      />
      <StringListField
        label="Highlights checklist"
        items={props.highlights}
        onChange={(v) => patch({ highlights: v })}
      />
    </>
  );
}

/* ---------------------------------------------------------------- timeline -- */

function TimelineEditor({ props, patch }: { props: TimelineProps; patch: (p: Partial<TimelineProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<Milestone>
        label="Milestones"
        items={props.milestones}
        onChange={(v) => patch({ milestones: v })}
        newItem={() => ({ year: new Date().getFullYear().toString(), title: 'New milestone', description: '' })}
        itemTitle={(it) => `${it.year} — ${it.title}`}
        addLabel="Add milestone"
        renderItem={(it, update) => (
          <>
            <TextField label="Year" value={it.year} onChange={(v) => update({ year: v })} />
            <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
          </>
        )}
      />
    </>
  );
}

/* --------------------------------------------------------------- team grid -- */

function TeamGridEditor({ props, patch }: { props: TeamGridProps; patch: (p: Partial<TeamGridProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<TeamMember>
        label="Members"
        items={props.members}
        onChange={(v) => patch({ members: v })}
        newItem={() => ({ name: 'New member', role: '', bio: '' })}
        itemTitle={(it) => it.name}
        addLabel="Add member"
        renderItem={(it, update) => (
          <>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Name" value={it.name} onChange={(v) => update({ name: v })} />
              <TextField label="Role" value={it.role} onChange={(v) => update({ role: v })} />
            </div>
            <TextArea label="Bio" value={it.bio} onChange={(v) => update({ bio: v })} rows={2} />
            <TextField label="Credentials" value={it.credentials} onChange={(v) => update({ credentials: v || undefined })} />
            <ImageField label="Avatar" value={it.avatar} onChange={(v) => update({ avatar: v })} />
          </>
        )}
      />
    </>
  );
}

/* -------------------------------------------------------------- value grid -- */

function ValueGridEditor({ props, patch }: { props: ValueGridProps; patch: (p: Partial<ValueGridProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <NumberField label="Columns" value={props.columns} onChange={(v) => patch({ columns: v })} min={2} />
      <ListField<IconItem>
        label="Values"
        items={props.items}
        onChange={(v) => patch({ items: v })}
        newItem={() => ({ title: 'New value', description: '' })}
        itemTitle={(it) => it.title}
        addLabel="Add value"
        renderItem={(it, update) => (
          <>
            <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
            <TextField label="Icon (lucide name)" value={it.icon} onChange={(v) => update({ icon: v || undefined })} />
          </>
        )}
      />
    </>
  );
}

/* ----------------------------------------------------------- process steps -- */

function ProcessStepsEditor({
  props,
  patch,
}: {
  props: ProcessStepsProps;
  patch: (p: Partial<ProcessStepsProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<ProcessStep>
        label="Steps"
        items={props.steps}
        onChange={(v) => patch({ steps: v })}
        newItem={(): ProcessStep => ({
          step: String((props.steps?.length ?? 0) + 1).padStart(2, '0'),
          title: 'New step',
          description: '',
        })}
        itemTitle={(it) => `${it.step} — ${it.title}`}
        addLabel="Add step"
        renderItem={(it, update) => (
          <>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Step label" value={it.step} onChange={(v) => update({ step: v })} />
              <TextField label="Duration" value={it.duration} onChange={(v) => update({ duration: v || undefined })} />
            </div>
            <TextField label="Title" value={it.title} onChange={(v) => update({ title: v })} />
            <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
          </>
        )}
      />
    </>
  );
}

/* --------------------------------------------------------------- sla table -- */

function SlaTableEditor({ props, patch }: { props: SlaTableProps; patch: (p: Partial<SlaTableProps>) => void }) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <ListField<SlaRow>
        label="Rows"
        items={props.rows}
        onChange={(v) => patch({ rows: v })}
        newItem={() => ({ metric: 'New metric', commitment: '', description: '' })}
        itemTitle={(it) => it.metric}
        addLabel="Add row"
        renderItem={(it, update) => (
          <>
            <TextField label="Metric" value={it.metric} onChange={(v) => update({ metric: v })} />
            <TextField label="Commitment" value={it.commitment} onChange={(v) => update({ commitment: v })} />
            <TextArea label="Description" value={it.description} onChange={(v) => update({ description: v })} rows={2} />
          </>
        )}
      />
    </>
  );
}

/* ----------------------------------------------------------- location list -- */

function LocationListEditor({
  props,
  patch,
}: {
  props: LocationListProps;
  patch: (p: Partial<LocationListProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <StringListField label="Locations" items={props.locations} onChange={(v) => patch({ locations: v })} />
      <ListField<NonNullable<LocationListProps['places']>[number]>
        label="Detailed places (optional)"
        items={props.places}
        onChange={(v) => patch({ places: v })}
        newItem={() => ({ city: 'New city' })}
        itemTitle={(it) => it.city}
        addLabel="Add place"
        renderItem={(it, update) => (
          <>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="City" value={it.city} onChange={(v) => update({ city: v })} />
              <TextField label="Facility" value={it.facility} onChange={(v) => update({ facility: v || undefined })} />
            </div>
            <TextField label="Address" value={it.address} onChange={(v) => update({ address: v || undefined })} />
            <TextField label="Role" value={it.role} onChange={(v) => update({ role: v || undefined })} />
          </>
        )}
      />
    </>
  );
}

/* ------------------------------------------------------ corp registration -- */

function CorporateRegistrationEditor({
  props,
  patch,
}: {
  props: CorporateRegistrationProps;
  patch: (p: Partial<CorporateRegistrationProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <p className="text-[11px] text-muted-foreground">
        Every field below falls back to the business details from the Company step when left
        blank — only fill these in to override the section for this specific page.
      </p>
      <TextField label="Entity name override" value={props.entityName} onChange={(v) => patch({ entityName: v || undefined })} />
      <TextField label="Registration number override" value={props.registrationNumber} onChange={(v) => patch({ registrationNumber: v || undefined })} />
      <TextField label="Jurisdiction override" value={props.jurisdiction} onChange={(v) => patch({ jurisdiction: v || undefined })} />
      <TextField label="Governing law override" value={props.governingLaw} onChange={(v) => patch({ governingLaw: v || undefined })} />
      <TextArea label="Registered address override" value={props.registeredAddress} onChange={(v) => patch({ registeredAddress: v || undefined })} rows={2} />
      <TextField label="Tax ID override" value={props.taxId} onChange={(v) => patch({ taxId: v || undefined })} />
      <TextField label="AS number override" value={props.asNumber} onChange={(v) => patch({ asNumber: v || undefined })} />
    </>
  );
}

/* ------------------------------------------------------------ contact panel -- */

function ContactPanelEditor({
  props,
  patch,
}: {
  props: ContactPanelProps;
  patch: (p: Partial<ContactPanelProps>) => void;
}) {
  return (
    <>
      <HeadingFields props={props} patch={patch} />
      <SelectField
        label="Form variant"
        value={props.formVariant ?? 'standard'}
        onChange={(v) => patch({ formVariant: v })}
        options={[
          { value: 'standard', label: 'Standard' },
          { value: 'enterprise', label: 'Enterprise (requires company)' },
          { value: 'wholesale', label: 'Wholesale' },
          { value: 'noc', label: 'NOC / technical' },
        ]}
      />
      <TextField label="Submit button label" value={props.submitLabel} onChange={(v) => patch({ submitLabel: v || undefined })} />
      <StringListField
        label="Inquiry type options"
        items={props.inquiryOptions}
        onChange={(v) => patch({ inquiryOptions: v })}
      />
      <SwitchField
        label="Show entity/hours column"
        checked={props.showDetails !== false}
        onChange={(v) => patch({ showDetails: v })}
      />
      <TextField label="Support hours override" value={props.supportHours} onChange={(v) => patch({ supportHours: v || undefined })} />
      <ListField<NonNullable<ContactPanelProps['offices']>[number]>
        label="Offices"
        items={props.offices}
        onChange={(v) => patch({ offices: v })}
        newItem={() => ({ city: 'New office' })}
        itemTitle={(it) => it.city}
        addLabel="Add office"
        renderItem={(it, update) => (
          <>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="City" value={it.city} onChange={(v) => update({ city: v })} />
              <TextField label="Facility" value={it.facility} onChange={(v) => update({ facility: v || undefined })} />
            </div>
            <TextField label="Address" value={it.address} onChange={(v) => update({ address: v || undefined })} />
            <TextField label="Role" value={it.role} onChange={(v) => update({ role: v || undefined })} />
          </>
        )}
      />
    </>
  );
}

/* ---------------------------------------------------------- policy document -- */

function PolicyDocumentEditor({
  props,
  patch,
}: {
  props: PolicyDocumentProps;
  patch: (p: Partial<PolicyDocumentProps>) => void;
}) {
  return (
    <>
      <TextField label="Title" value={props.title} onChange={(v) => patch({ title: v })} />
      <TextField label="Last updated" value={props.lastUpdated} onChange={(v) => patch({ lastUpdated: v })} />
      <SectionLabel>Clauses</SectionLabel>
      <ListField<PolicyBlock>
        label={undefined}
        items={props.sections}
        onChange={(v) => patch({ sections: v })}
        newItem={() => ({ heading: 'New clause', body: '' })}
        itemTitle={(it) => it.heading}
        addLabel="Add clause"
        renderItem={(it, update) => (
          <>
            <TextField label="Heading" value={it.heading} onChange={(v) => update({ heading: v })} />
            <TextArea label="Body (markdown)" value={it.body} onChange={(v) => update({ body: v })} rows={5} />
          </>
        )}
      />
    </>
  );
}
