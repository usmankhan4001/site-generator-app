import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = SITE.themeId;
// Dark themes carry `class="dark"` on <html>. Kept as a literal list so this
// file has no runtime dependency on the theme registry.
const DARK_THEMES = new Set([
  "midnight-obsidian",
  "carbon-defense",
  "cyber-slate-volt",
  "crimson-velocity",
  "hyper-speed-ultramarine",
  "amethyst-violet",
  "deep-ocean-blue",
  "aurora-emerald",
]);

export const metadata: Metadata = {
  title: SITE.meta.title,
  description: SITE.meta.description,
  authors: [{ name: SITE.business.name }],
  openGraph: {
    title: SITE.meta.title,
    description: SITE.meta.description,
    type: "website",
    ...(SITE.meta.ogImage ? { images: [SITE.meta.ogImage] } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={DARK_THEMES.has(theme) ? "dark" : undefined}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
