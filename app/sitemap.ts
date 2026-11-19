import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { articles } from "@/content/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/projects/keel`, changeFrequency: "monthly", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${SITE.url}/writing/${a.slug}`,
      lastModified: a.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
