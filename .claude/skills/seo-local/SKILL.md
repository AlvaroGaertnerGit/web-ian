---
name: seo-local
description: Plan or audit SEO for this private-investigation-firm website — page architecture (service/city pages), keywords and search intent, title/meta description, headings, URLs, canonical, Open Graph, sitemap, robots, internal linking, breadcrumbs, and Schema.org (LocalBusiness/ProfessionalService/FAQPage). Use when creating a new landing/service/city page, or when asked to audit SEO, find duplicate/thin content, or check structured data for fabricated fields. Never create a page for a city or service combination that isn't real — see Rules.
---

This skill owns **SEO structure and mechanics**. It does not own the
wording of that structure's text — pair it with `copywriting-legal-es`
for title/description/heading wording, and with `legal-guardrails` when
Schema.org or copy touches claims (ratings, reviews, guarantees).
Core Web Vitals and rendering strategy stay with `performance` — don't
duplicate that skill's audit here.

## Purpose

SEO here exists to get real prospective clients — searching with real
intent, in a real service area — to a page that actually answers their
question (`CLAUDE.md` §17). It does not exist to manipulate rankings
with pages that have no genuine content behind them.

## When to use

- Deciding whether a new landing page (city, service, or
  service+city combination) is warranted.
- Writing/reviewing `title`, `description`, headings, URL, canonical,
  Open Graph, or Schema.org for a page.
- Auditing existing pages for duplicate/thin content, generic metadata,
  or broken internal linking.

## When NOT to use

- Writing the actual sentence-level copy — `copywriting-legal-es`.
- Checking whether a claim inside a page (or a Schema.org field) is
  legally risky — `legal-guardrails` (this skill only flags that a
  Schema.org field is *unverifiable*, not whether the prose around it
  is a risky claim).
- Bundle size, Core Web Vitals, Server/Client boundaries — `performance`.
- Deciding where a new route's files live in the tree — `architecture`
  (this skill decides *whether* the page should exist and what it needs
  for SEO; `architecture` decides where the code goes).

## Page architecture

Potential URL patterns (`CLAUDE.md` §10):

```
/detectives-privados-[ciudad]
/servicios/[servicio]
/servicios/[servicio]/[ciudad]
```

### The decision rule — before creating any page

Only create a page when **all** of these are true:

1. **Real service** — the firm actually offers it (check against the
   confirmed service list; never invent one — `CLAUDE.md` §7/§28).
2. **Real coverage area** — the firm actually operates in that city;
   never generate a city page just because it's a populated search term.
3. **Genuine search intent** — the combination is something a real
   person searches for with a specific need, not an arbitrary
   service×city cross-product built for coverage.

A `/servicios/[servicio]/[ciudad]` page with the same three paragraphs
as every other city, differing only in the city name, fails rule 3 even
if rules 1-2 hold — that's thin/duplicate content, see below.

## Workflow

### Before creating a page

1. Confirm the page passes the three-point decision rule above.
2. Draft `title`/`description`/H1 wording with `copywriting-legal-es`.
3. Decide the canonical URL and whether this page or a broader one
   (e.g. the general service page) should be canonical if content
   overlaps heavily.

### After writing or changing a page

```bash
node .claude/skills/seo-local/scripts/audit-seo.mjs <path>
```

Defaults to `src` if no path given. Flags, per file:line:

| Rule | Catches |
|---|---|
| `missing-metadata` | Route file with no `metadata`/`generateMetadata` export |
| `title-length` | Title outside ~15-60 characters |
| `description-length` | Description outside ~70-160 characters |
| `placeholder-metadata` | Leftover scaffolding text ("Create Next App", "Lorem ipsum", generic "Home") |
| `duplicate-title` / `duplicate-description` | Same title/description string reused across 2+ files |
| `missing-open-graph` | No `openGraph` block in a page's metadata |
| `thin-content` | A `page.tsx`'s extracted body text is under ~120 words |
| `schema-unverifiable-field` | A `@type`d JSON-LD object sets `aggregateRating`, `review`, `priceRange`, `telephone`, `address`, `openingHours`, `numberOfEmployees`, or a founding-date/years field with a concrete (non-placeholder) value |

`--json` for machine-readable output. Exit code `1` if findings exist.

For **content duplication** across service/city pages (not just
metadata strings), don't reimplement a similarity checker here — run
`architecture`'s existing line-shingling detector on the content/data
files:

```bash
node .claude/skills/architecture/scripts/find-duplicates.mjs src/components/sections
```

## Rules

### Never fabricate in Schema.org

Never set: `aggregateRating`, `review`, prices, `address`, `telephone`,
`openingHours`, `numberOfEmployees`, years-in-business/`foundingDate`
unless the user has confirmed the real value. An absent field is
correct and safe; a plausible-looking fake one is a Schema.org
violation *and* a false-advertising risk — cross-check anything flagged
here with `legal-guardrails`.

### Only use the Schema.org types that actually fit

`LocalBusiness` / `ProfessionalService` for the firm itself, `FAQPage`
for a real FAQ section with real questions, `Article` for blog content.
Don't add a type because it "might help" — incorrect or unsupported
structured data can trigger a Search Console manual action.

### No artificial local pages

See the decision rule above. If asked to generate a batch of city pages
for SEO coverage without confirmed real coverage in each city, push
back and ask which cities are real before creating any of them.

## Examples

**Good page architecture:**
> Firm operates in Madrid and Barcelona, offers infidelity and
> corporate-fraud investigation → `/servicios/infidelidades/madrid`,
> `/servicios/infidelidades/barcelona`, `/servicios/fraude-empresarial/madrid`
> — each with genuinely different local context (not just a swapped city
> name in an otherwise identical template).

**Bad — content-farm pattern:**
> Auto-generating `/servicios/[servicio]/[ciudad]` for all 52 Spanish
> provincial capitals from one template with a `{{city}}` variable and
> no real coverage in most of them.

**Good Schema.org:**
```json
{ "@type": "ProfessionalService", "name": "[NOMBRE DEL DESPACHO]", "areaServed": "[CIUDAD]" }
```

**Bad Schema.org (flagged as `schema-unverifiable-field`):**
```json
{ "@type": "ProfessionalService", "aggregateRating": { "ratingValue": "4.9", "reviewCount": "127" } }
```

## Anti-patterns

- Building the full service×city matrix "for SEO" without checking real
  coverage first.
- Copying the audit's `title-length`/`description-length` fix without
  also running `copywriting-legal-es` — a technically-correct-length
  title can still be generic or off-tone.
- Adding `aggregateRating` with a plausible number "to look established"
  — this is both a Schema.org policy violation and a `legal-guardrails`
  finding waiting to happen.
- Treating `find-duplicates.mjs` findings on content files as
  false positives because "the city name is different" — near-identical
  template text with a swapped noun is exactly the duplicate/thin
  content pattern search engines penalize.

## Verification checklist

- [ ] Every page passes the three-point decision rule (real service,
      real coverage, real search intent)
- [ ] `audit-seo.mjs` returns 0 findings for anything touched
- [ ] `architecture`'s `find-duplicates.mjs` shows no new duplication
      across service/city content files
- [ ] No Schema.org field states a rating, review, price, address,
      phone, hours, employee count, or years-in-business that isn't
      user-confirmed real data
- [ ] Title/description wording also passes `copywriting-legal-es`
- [ ] Internal links connect this page to/from the relevant service and
      city hubs (no orphan pages)

## Related skills

- **`copywriting-legal-es`** — the actual wording of title/description/
  headings; this skill only governs their structure and limits.
- **`legal-guardrails`** — claims embedded in Schema.org or nearby copy
  (ratings, guarantees) are a legal-risk problem, not just an SEO one.
- **`architecture`** — where route/content files live, and its
  `find-duplicates.mjs` for cross-page content duplication.
- **`performance`** — Core Web Vitals affect ranking but are that
  skill's audit, not this one's.
