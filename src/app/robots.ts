import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No se bloquea nada: CSS/JS/imágenes se sirven desde /_next/ y
      // /brand/, y no hay ninguna ruta privada que excluir todavía.
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
