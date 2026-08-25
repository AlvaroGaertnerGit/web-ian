# Schema.org checklist

Use JSON-LD (`<script type="application/ld+json">`) in the relevant
route's layout/page. Only add a type when the page genuinely has the
content that type describes.

## `LocalBusiness` / `ProfessionalService`

Use on the homepage and/or a dedicated "Sobre nosotros" or contact page
— one canonical instance of the firm's identity, not repeated with
different data on every page.

**Safe to include now** (structural facts, not claims):
- `@type`, `name` (or `[NOMBRE DEL DESPACHO]` placeholder), `url`,
  `areaServed` (only real cities), `description`.

**Only include once confirmed real** — the `audit-seo.mjs`
`schema-unverifiable-field` rule flags these if hardcoded:
- `telephone`, `address`, `openingHours`, `priceRange`,
  `aggregateRating`, `review`, `numberOfEmployees`,
  `foundingDate`/years-in-business.

**Never include:** an `aggregateRating`/`review` built from placeholder
or estimated numbers "to look established" — this is both a Schema.org
policy violation (Google can issue a manual action for fake review
markup) and a `legal-guardrails` `absolute-result-guarantee`-adjacent
risk if it reads as a success claim.

## `FAQPage`

Use only on the actual FAQ page/section, and only for questions that are
**visibly rendered on the page** — `FAQPage` markup for hidden or
non-existent Q&A is a Google spam-policy violation, not just bad
practice. Each `Question`/`acceptedAnswer` pair in the schema must match
the visible text verbatim (or near-verbatim) — don't write a punchier
schema answer than what's on the page.

## `BreadcrumbList`

Use only when a visual breadcrumb is actually rendered (see
`architecture.md`). Position values must match the real navigation
depth.

## `Article`

Use on blog posts. `datePublished`/`dateModified` must be real dates
this content was actually published/edited — not a fabricated
"freshness" signal.

## Before shipping any Schema.org block

- [ ] The `@type` matches content that genuinely exists on the page
- [ ] No field in the "only include once confirmed real" list has a
      hardcoded value unless the user confirmed it's real
- [ ] `FAQPage`/`Article` content matches the visible page content
- [ ] Ran `audit-seo.mjs` — 0 `schema-unverifiable-field` findings (or
      each one is user-confirmed real data)
