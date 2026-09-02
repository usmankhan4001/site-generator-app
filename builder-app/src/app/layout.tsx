import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { mantineTheme } from "@/theme/mantine";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airwallex Site Cloner | Mantine v7 Studio",
  description:
    "Enterprise Untitled UI site builder with 80 templates, 350+ blocks, and Airwallex compliance engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} font-sans min-h-full bg-[#090d16] text-[#f8fafc] antialiased selection:bg-[#6366f1] selection:text-white`}
      >
        <MantineProvider defaultColorScheme="dark" theme={mantineTheme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
