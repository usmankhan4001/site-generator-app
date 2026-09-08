import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/content/site";
import { getPage } from "@/site/schema";
import SiteRenderer from "@/site/SiteRenderer";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getPage(SITE, "/" + slug.join("/"));
  const title = page?.navLabel ?? page?.title ?? SITE.business.shortName;
  return { title };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const path = slug.length === 0 ? "/" : "/" + slug.join("/");
  if (!getPage(SITE, path)) notFound();
  return <SiteRenderer content={SITE} page={path} />;
}