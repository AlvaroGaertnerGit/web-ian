/**
 * Single source of truth for anything that needs the site's real,
 * deployed URL (canonical links, Open Graph, sitemap, robots). No domain
 * is hardcoded/invented here — set `NEXT_PUBLIC_SITE_URL` in production.
 * Until then this falls back to localhost, which is harmless for local
 * dev/build but must be overridden before deploy (see
 * docs/CONTENT-CONTRACT.md → SEO pendiente).
 */
export const siteConfig = {
  name: "Búho Detectives",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_ES",
} as const;
