import { SiteRenderer } from "@/site/SiteRenderer";
import { SITE } from "@/content/site";

export default function HomePage() {
  return <SiteRenderer content={SITE} page="/" />;
}
