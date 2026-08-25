# SEO architecture reference

## URL patterns

```
/                                     Inicio
/servicios/[servicio]                 Service hub (e.g. /servicios/infidelidades)
/servicios/[servicio]/[ciudad]        Service × city landing (only when justified — see SKILL.md's decision rule)
/detectives-privados-[ciudad]         City hub, if the firm has real, distinct coverage there
/sobre-nosotros
/como-trabajamos
/casos                                Anonymous case studies, if any exist
/preguntas-frecuentes
/blog
/blog/[slug]
/contacto
```

Route segments follow Next.js App Router conventions — file placement is
`architecture`'s call, this doc only covers what SEO needs from each
route once it exists.

## Canonical

- Every page sets its own canonical to itself unless it's a genuine
  near-duplicate of a broader page (rare — prefer not creating the
  duplicate in the first place, per the decision rule in `SKILL.md`).
- Use `alternates.canonical` in the route's `metadata` export, an
  absolute URL built from `metadataBase` (set once in the root layout).
- Never canonicalize a real, distinct page to another page — that
  removes it from the index entirely.

## Breadcrumbs

- Mirror the URL hierarchy: Inicio → Servicios → [Servicio] →
  [Servicio en Ciudad]. Every service/city page links back up its chain.
- Pair the visual breadcrumb with `BreadcrumbList` Schema.org markup
  (see `schema-checklist.md`) — only if the visual breadcrumb is
  actually rendered; don't ship schema for UI that doesn't exist.

## Internal linking

- Every service/city page is linked from: its service hub, its city hub
  (if one exists), and the main navigation or a relevant blog post —
  no orphan pages (a page with zero internal inlinks essentially doesn't
  exist to search engines).
- Cross-link adjacent services when genuinely relevant (e.g. an
  infidelity investigation page linking to the custody-investigation
  page) — not a "related services" grid stuffed with every service
  regardless of relevance.

## Sitemap and robots

- `sitemap.xml` (via Next.js's `app/sitemap.ts`) includes every real,
  indexable page — exclude anything that shouldn't rank (thank-you/
  confirmation pages, internal-only routes).
- `robots.txt` (via `app/robots.ts`) allows crawling of public content
  and disallows anything transactional/private; point it at the sitemap.
- Keep both in sync with what's actually live — a sitemap listing pages
  that 404, or missing pages that exist, is worse than no sitemap.

## Keywords and search intent

- Ground every page's target keyword in a real question a prospective
  client would type (`CLAUDE.md` §1's three questions), not a
  volume-driven keyword list disconnected from actual services.
- One primary search intent per page. A page trying to rank for
  "detective privado [ciudad]" AND "investigación de bajas laborales
  [ciudad]" AND "detective para herencias [ciudad]" simultaneously
  usually ranks for none of them — split into separate pages only when
  each has genuine standalone content (see the decision rule).
- Match content depth to intent: a high-intent transactional page
  (a specific service in a specific city) needs a clear CTA above the
  fold; an informational page (a blog post explaining a legal concept)
  can go deeper without pushing the CTA as hard.
