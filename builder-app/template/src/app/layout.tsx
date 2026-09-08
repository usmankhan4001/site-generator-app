import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { getTheme } from "@/site/themes";

const theme = getTheme(SITE.themeId);

function googleFontsHref(families: string[]) {
  const q = families.map(f => `family=${encodeURIComponent(f)}:wght@400;500;600;700`).join("&");
  return `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

export function generateMetadata(): Metadata {
  return {
    title: { default: SITE.meta.title, template: `%s · ${SITE.business.shortName}` },
    description: SITE.meta.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={theme.isDark ? "dark" : undefined}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={googleFontsHref(theme.googleFonts)} />
      </head>
      <body className="min-h-dvh bg-background text-foreground">{children}</body>
    </html>
  );
}