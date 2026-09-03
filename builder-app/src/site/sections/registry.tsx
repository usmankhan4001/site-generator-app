/**
 * Section registry — maps every `SectionType` to its renderer.
 *
 * Renderers are plain default exports with the signature
 * `({ props, content }: { props: <XxxProps>; content: SiteContent }) => JSX`.
 * `SiteRenderer` looks components up here by `section.type`.
 */

import type { ComponentType } from 'react';
import type { SectionType, SiteContent, AnySectionProps } from '@/site/schema';

import Hero from './Hero';
import StatsBar from './StatsBar';
import TrustBar from './TrustBar';
import FeatureGrid from './FeatureGrid';
import PricingTiers from './PricingTiers';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import Faq from './Faq';
import CtaBanner from './CtaBanner';
import PageHeader from './PageHeader';
import Prose from './Prose';
import Timeline from './Timeline';
import TeamGrid from './TeamGrid';
import ValueGrid from './ValueGrid';
import ProcessSteps from './ProcessSteps';
import SlaTable from './SlaTable';
import LocationList from './LocationList';
import CorporateRegistration from './CorporateRegistration';
import ContactPanel from './ContactPanel';
import PolicyDocument from './PolicyDocument';

export type SectionComponent = ComponentType<{
  props: AnySectionProps;
  content: SiteContent;
}>;

export const SECTION_REGISTRY: Record<SectionType, SectionComponent> = {
  hero: Hero as SectionComponent,
  statsBar: StatsBar as SectionComponent,
  trustBar: TrustBar as SectionComponent,
  featureGrid: FeatureGrid as SectionComponent,
  pricingTiers: PricingTiers as SectionComponent,
  productGrid: ProductGrid as SectionComponent,
  testimonials: Testimonials as SectionComponent,
  faq: Faq as SectionComponent,
  ctaBanner: CtaBanner as SectionComponent,
  pageHeader: PageHeader as SectionComponent,
  prose: Prose as SectionComponent,
  timeline: Timeline as SectionComponent,
  teamGrid: TeamGrid as SectionComponent,
  valueGrid: ValueGrid as SectionComponent,
  processSteps: ProcessSteps as SectionComponent,
  slaTable: SlaTable as SectionComponent,
  locationList: LocationList as SectionComponent,
  corporateRegistration: CorporateRegistration as SectionComponent,
  contactPanel: ContactPanel as SectionComponent,
  policyDocument: PolicyDocument as SectionComponent,
};

export function getSectionComponent(type: SectionType): SectionComponent | undefined {
  return SECTION_REGISTRY[type];
}
