'use client';

import { useState, useEffect } from 'react';
import type { SiteContent } from '@/site/schema';
import { SiteRenderer } from '@/site/SiteRenderer';
import { getTheme, themeToStyleObject } from '@/site/themes';
import { PreviewBridge } from './PreviewBridge';

function googleFontsHref(families: string[]): string {
  const q = families
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700`)
    .join('&');
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

export function LivePreviewContainer({
  initialContent,
  page,
}: {
  initialContent: SiteContent;
  page: string;
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.source !== 'studio') return;
      if (d.type === 'content:update' && d.content) {
        setContent(d.content);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

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
