/**
 * Project-backed live preview — the iframe target inside the studio workspace.
 * Reads the project's `SiteContent` from the DB and renders exactly what a
 * generated site would, scoped with the theme's CSS variables.
 */

import { notFound } from 'next/navigation';
import { SiteRenderer } from '@/site/SiteRenderer';
import { getTheme, themeToStyleObject } from '@/site/themes';
import { getProject } from '@/lib/studio/projects';
import { PreviewBridge } from '@/components/preview/PreviewBridge';

export const dynamic = 'force-dynamic';

function googleFontsHref(families: string[]): string {
  const q = families
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

export default async function ProjectPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page = '/' } = await searchParams;

  const project = await getProject(id);
  if (!project) notFound();

  const { content } = project;
  const theme = getTheme(content.themeId);
  const style = themeToStyleObject(theme, content.accent);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={googleFontsHref(theme.googleFonts)} />
      <div className={theme.isDark ? 'dark' : undefined} style={style} data-preview-root>
        <SiteRenderer content={content} page={page} preview />
      </div>
      <PreviewBridge />
    </>
  );
}
