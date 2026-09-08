import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CheckCircle2 } from 'lucide-react';
import type { ProseProps, SiteContent } from '@/site/schema';
import { SectionHeader } from '@/site/sections/_shared/SectionHeader';
import { resolveLayoutSystem } from '@/site/layoutSystems';

/**
 * Narrative section: eyebrow + `<h2>` + a stack of body blocks (each with an
 * optional `<h3>` heading, body rendered as markdown). Optional image beside the
 * text on `lg`, optional highlights checklist.
 */
export default function Prose({
  props,
  content,
}: {
  props: ProseProps;
  content: SiteContent;
}) {
  const { eyebrow, title, description, blocks, image, highlights } = props;

  if (!blocks?.length && !highlights?.length) return null;

  const body = (
    <div className="space-y-8">
      {(eyebrow || title || description) && (
        <SectionHeader
          system={resolveLayoutSystem(content)}
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      )}

      {blocks?.length ? (
        <div className="space-y-8">
          {blocks.map((block, i) => (
            <div key={i} className="space-y-3">
              {block.heading && (
                <h3 className="text-lg font-bold text-foreground">{block.heading}</h3>
              )}
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.body}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {highlights?.length ? (
        <ul className="space-y-3 pt-2">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );

  return (
    <section className="py-20 md:py-28 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {image ? (
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {body}
            <div className="rounded-2xl overflow-hidden border border-border/80">
              <img
                src={image}
                alt={title || 'Illustration'}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl">{body}</div>
        )}
      </div>
    </section>
  );
}
