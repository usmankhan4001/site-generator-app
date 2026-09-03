import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { PolicyDocumentProps, SiteContent } from '@/site/schema';

/**
 * Full policy page body — title `<h1>`, "Last updated" line, a small statutory
 * line, then each section as an `<h2>` plus its markdown body rendered through
 * `react-markdown` + `remark-gfm` (fixes the bug where policy markdown rendered
 * literally).
 */
export default function PolicyDocument({
  props,
  content,
}: {
  props: PolicyDocumentProps;
  content: SiteContent;
}) {
  const { title, lastUpdated, sections } = props;
  const b = content.business;

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: {lastUpdated}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {b.name} · Registration No. {b.registrationNumber} · {b.jurisdiction}
      </p>

      <div className="mt-10 space-y-10">
        {sections?.map((s, i) => (
          <div key={i} className="space-y-3">
            {s.heading ? (
              <h2 className="text-xl font-bold text-foreground">{s.heading}</h2>
            ) : null}
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{s.body}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
