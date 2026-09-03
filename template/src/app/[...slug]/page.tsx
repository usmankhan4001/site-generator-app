import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteRenderer } from "@/site/SiteRenderer";
import { SITE } from "@/content/site";

type Params = { slug: string[] };

function pathFor(slug: string[]): string {
  return "/" + slug.join("/");
}

export function generateStaticParams(): Params[] {
  return SITE.pages
    .filter((p) => p.path !== "/")
    .map((p) => ({ slug: p.path.replace(/^\//, "").split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = SITE.pages.find((p) => p.path === pathFor(slug));
  if (!page) return {};
  return {
    title: `${page.title} · ${SITE.business.name}`,
    description: SITE.meta.description,
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const page = SITE.pages.find((p) => p.path === pathFor(slug));
  if (!page) notFound();
  return <SiteRenderer content={SITE} page={page.path} />;
}
