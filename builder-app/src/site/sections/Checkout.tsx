import Link from 'next/link';
import { Lock, ShieldCheck, ArrowRight, CreditCard } from 'lucide-react';
import type { CheckoutProps, SiteContent } from '@/site/schema';
import { Button } from '@/site/ui/button';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/**
 * Checkout — hand-off to the client's own Airwallex-hosted payment page.
 * We never hold their Airwallex API credentials (each generated site
 * belongs to a different merchant); `content.airwallexCheckoutUrl` is a
 * Payment Link / Hosted Payment Page URL the client generates themselves
 * and connects, the same pattern as `formspreeId`. Copy differs by
 * `content.mode`: ecommerce frames this as completing an order, services
 * frames it as securing a deposit/engagement. When no URL is connected yet
 * this degrades honestly to a "not connected" state — it never fakes a
 * pay button that goes nowhere.
 */
export default function Checkout({
  props,
  content,
}: {
  props: CheckoutProps;
  content: SiteContent;
}) {
  const b = content.business;
  const isEcommerce = content.mode === 'ecommerce';

  const {
    eyebrow = 'Secure Checkout',
    title = isEcommerce ? 'Complete Your Order' : 'Secure Your Engagement',
    description = isEcommerce
      ? 'Review your order, then complete payment securely through Airwallex — the same infrastructure used by leading global merchants.'
      : `Confirm your engagement with ${b.name} and complete your deposit or setup payment securely through Airwallex.`,
    payLabel = isEcommerce ? 'Pay with Airwallex' : 'Pay Deposit with Airwallex',
    note = 'You will be redirected to an Airwallex-hosted payment page. We never see or store your card details.',
  } = props;

  const url = content.airwallexCheckoutUrl;

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-12"
        />

        <div className="max-w-md mx-auto">
          <div className="card-elevated rounded-2xl border border-border bg-card p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-border/70 pb-5">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {isEcommerce ? 'Payable to' : 'Engagement with'}
                </div>
                <div className="text-sm font-bold text-foreground mt-0.5">{b.name}</div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>

            {url ? (
              <>
                <Button asChild size="lg" className="w-full h-12 text-base font-semibold">
                  <a href={url}>
                    <Lock className="mr-2 h-4 w-4" />
                    {payLabel}
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-relaxed">{note}</p>
              </>
            ) : (
              <>
                <div className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                  Online payment isn&apos;t connected yet. Reach out and we&apos;ll get you set up.
                </div>
                <Button asChild size="lg" variant="outline" className="w-full h-12 text-base font-semibold">
                  <Link href="/contact">
                    <span>Contact Us to Proceed</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}

            <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Secured by Airwallex &middot; PCI-DSS compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
