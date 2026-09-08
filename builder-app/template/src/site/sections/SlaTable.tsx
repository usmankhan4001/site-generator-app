import type { SlaTableProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/**
 * Service-level commitments as a real table (scroll-wrapped on narrow screens)
 * inside a `.card-elevated` container. Columns: Metric | Commitment | Detail.
 */
export default function SlaTable({
  props,
  content,
}: {
  props: SlaTableProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, rows } = props;

  if (!rows?.length) return null;

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title ?? 'Service Level Commitments'}
          description={description}
          align="center"
          className="mb-14"
        />

        <div className="card-elevated rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-4 font-semibold text-foreground">Metric</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Commitment</th>
                  <th className="px-6 py-4 font-semibold text-foreground">Detail</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-4 align-top font-medium text-foreground whitespace-nowrap">
                      {r.metric}
                    </td>
                    <td className="px-6 py-4 align-top font-mono text-primary whitespace-nowrap">
                      {r.commitment}
                    </td>
                    <td className="px-6 py-4 align-top text-muted-foreground min-w-[16rem] leading-relaxed">
                      {r.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
