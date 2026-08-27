import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Only real, existing URLs — this is a single-page site today. No
 * city/service landing pages are listed here until they actually exist
 * (see docs/CONTENT-CONTRACT.md → SEO local).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
