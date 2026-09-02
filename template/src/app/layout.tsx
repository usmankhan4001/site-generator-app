import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vantage Cloud Technologies Limited | Enterprise Cloud & DevOps Architecture",
  description: "We architect high-availability Kubernetes clusters, automated multi-cloud CI/CD pipelines, and zero-downtime migration strategies for high-growth enterprises.",
  keywords: [
    "Vantage",
    "Vantage Cloud Technologies Limited",
    "Enterprise Cloud & DevOps Architecture",
    "99.99% Uptime SLA",
    "AWS & GCP Certified",
    "Zero-Downtime Guarantee",
    "Automation",
    "Orchestration",
    "Observability",
    "enterprise solutions",
    "official website"
],
  authors: [{ name: "Vantage Cloud Technologies Limited" }],
  openGraph: {
    title: "Vantage Cloud Technologies Limited | Enterprise Cloud & DevOps Architecture",
    description: "We architect high-availability Kubernetes clusters, automated multi-cloud CI/CD pipelines, and zero-downtime migration strategies for high-growth enterprises.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
