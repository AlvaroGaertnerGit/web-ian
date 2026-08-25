---
name: copywriting-legal-es
description: Write or review any Spanish (Spain) public-facing copy for this private-investigation-firm website — headlines, service descriptions, trust/credentials, FAQ, CTAs, forms, footer, SEO title/description text. Use whenever drafting or editing user-facing copy, or when checking tone, naturalness, clichés, or whether copy sounds like a thriller/hacker/spy movie instead of a serious professional firm. Does NOT cover legal-risk claims (hacking, guarantees, absolute promises) — load `legal-guardrails` for that. Does NOT cover metadata length/SEO structure — load `seo-local` for that.
---

This skill owns **tone, naturalness, and language** for this project's copy.
It does not own legal risk (`legal-guardrails`) or SEO mechanics
(`seo-local`) — load whichever of those applies alongside this one when a
change touches both; don't duplicate their rules here. All three exist
because `.claude/CLAUDE.md` §1.1, §6, §8, §9 and §28 define a strict,
sector-specific content bar that the generic `code-review` Conventions
angle isn't equipped to check line-by-line.

## Purpose

Every sentence a visitor reads must move them toward one of the three
questions in `CLAUDE.md` §1 (can this detective help me / can I trust
them / what do I do next) — in natural, professional **Spanish of
Spain**, with zero invented facts and zero thriller/spy vocabulary.

## When to use

- Drafting or rewriting any user-facing text: hero, service descriptions,
  trust/credentials, how-we-work steps, FAQ, CTAs, forms, footer, error/
  success messages, image `alt` text, `aria-label`s.
- Reviewing an existing page's copy for tone, clichés, or invented facts.
- Writing SEO `title`/`description` text (the *wording* — for character
  limits and structure, pair this with `seo-local`).

## When NOT to use

- Evaluating whether a claim is legally risky (hacking/access/guarantee
  language) — that's `legal-guardrails`, always run it too when the copy
  describes what the firm *does* or *promises*.
- Fixing SEO metadata length, canonical tags, or Schema.org — `seo-local`.
- Styling/CSS of text (font, size, color) — `design-system`.
- Component structure the copy lives in — `ui-components`.

## Workflow

1. **Draft from a template**, not a blank page — see `templates/`. Match
   the *structure*; never copy example sentences verbatim into the site.
2. **Lint the draft**:
   ```bash
   node .claude/skills/copywriting-legal-es/scripts/lint-copy-es.mjs <file> [file...]
   ```
   Works on `.md` drafts and directly on `.tsx`/`.jsx` (extracts JSX text
   nodes and `title`/`description`/`alt`/`aria-label`/`placeholder`
   string literals). Exit code `1` if anything is flagged.
3. **Fix** every flagged line, or record a deliberate, justified exception.
4. **Also run `legal-guardrails`** on the same file if the copy describes
   a service, a method, or an outcome — this skill does not check for
   legal-risk claims.
5. **Re-run the linter** until clean, then run `verify` (or just look at
   the rendered page) to confirm the text reads well in context, not just
   in isolation.

## Rules

### Tone (non-negotiable)

Professional, sereno, discreto, humano, preciso, elegante, confiable.
The site sells **información objetiva, investigación profesional,
evidencias, claridad, confianza, capacidad de decidir** — never "acción",
never suspense.

### Language

- **Spanish of Spain only.** No English UI copy anywhere user-facing (see
  `CLAUDE.md` §1.1 for the exhaustive list of surfaces this covers).
- **No i18n, no language switcher.** The first version is Spanish-only —
  don't scaffold `[locale]` routes, `next-intl`, or a language dropdown
  even if it seems like good practice. If asked to internationalize,
  flag that this contradicts the current project scope instead of doing it.
- Natural register: write sentences a person would actually say to a
  worried client, not a translated marketing deck.

### Banned vocabulary (thriller/spy/hacker register)

Never use, even stylistically: *descubre la verdad ahora, casos
secretos, agentes especiales, misión, operación (as a narrative device),
espionaje, detective de película, agente secreto, operativo encubierto,
trama, conspiración, hackeamos, espiamos*. These break `CLAUDE.md` §1's
explicit ban on movie-detective/spy/hacker/cyberpunk aesthetics — in
words, not just imagery.

### Clichés and filler

Avoid AI-marketing and generic-corporate filler: *líder del sector,
solución integral, a la vanguardia, en la era digital actual, no dude en
contactarnos, comprometidos con la excelencia, de forma rápida y
sencilla*. If a sentence would be equally true on any other firm's
website, it's too generic — make it specific to what this firm actually
does (`CLAUDE.md` §9).

### Never invent facts — use placeholders

Never invent: detective/despacho name, TIP, RNSP, city, years of
experience, number of cases, clients, testimonials, ratings, awards,
certifications, partnerships, prices, results, statistics, legal claims
(`CLAUDE.md` §28). Use bracketed placeholders until real data is
supplied:

```
[NOMBRE DEL DETECTIVE]   [NOMBRE DEL DESPACHO]   [TIP]   [RNSP]
[CIUDAD]                 [AÑOS DE EXPERIENCIA]   [TELÉFONO]
```

A number or credential written in plain prose (`"15 años de
experiencia"`, `"TIP 12345"`) without brackets is a fabrication, not a
placeholder — the linter flags this as `unverified-numeric-claim` /
`fabricated-credential`.

### Conversion without aggression

CTAs center on *"Cuéntanos tu caso"* and its calm variants (*Consulta
confidencial, Hablar con un detective, Solicitar valoración*). No
exclamation-heavy urgency ("¡Actúa ahora!", "¡No esperes más!") — the
visitor may be dealing with something sensitive; pressure reads as
exploitative, not persuasive.

## Examples

**Generic / AI-slop:**
> "Somos líderes indiscutibles en investigación privada, comprometidos
> con la excelencia y la innovación al servicio de nuestros clientes."

**This project's voice:**
> "Investigamos hechos concretos y documentamos evidencias para que
> puedas tomar decisiones con información objetiva."

**Thriller register (banned):**
> "Nuestros agentes especiales llevan a cabo operaciones encubiertas
> para descubrir la verdad."

**Correct:**
> "Realizamos un seguimiento discreto y documentamos lo que observamos,
> dentro del marco legal vigente."

**Invented fact (banned):**
> "Con más de 20 años de experiencia y cientos de casos resueltos con
> éxito."

**Correct (placeholder pending real data):**
> "Con [AÑOS DE EXPERIENCIA] de experiencia en investigación privada."

## Anti-patterns

- Writing "sounds fine to me" and skipping the linter — AI-generated
  cliché reads as fine to the model that wrote it; that's exactly the
  failure mode the linter exists to catch.
- Translating English SaaS/marketing copy literally into Spanish instead
  of writing the sentence a Spanish investigation firm would actually say.
- Filling a credibility gap with a plausible-sounding number instead of
  a placeholder.
- Reaching for spy/thriller vocabulary to make a paragraph feel more
  "detective" — the brand differentiates on trust and precision, not
  drama (`CLAUDE.md` §1).
- Treating a claim-risk problem ("garantizamos resultados") as a tone
  problem and rewording it prettier instead of routing it through
  `legal-guardrails`.

## Verification checklist

- [ ] `lint-copy-es.mjs` returns 0 findings (or every flag is a
      deliberate, noted exception)
- [ ] Zero English UI strings anywhere in the diff
- [ ] Zero thriller/spy/hacker vocabulary
- [ ] Every credential/number/testimonial is either real (confirmed by
      the user) or a bracketed placeholder
- [ ] `legal-guardrails` run on the same file if it describes a service,
      method, or outcome
- [ ] Read aloud once — if it doesn't sound like a calm professional
      talking to a worried client, it's not done

## Related skills

- **`legal-guardrails`** — claim/legal risk in the same copy (hacking,
  guarantees, absolute promises). Different concern from tone — run both.
- **`seo-local`** — length/structure rules for `title`/`description`;
  this skill only governs their wording.
- **`ui-components`** — where the copy is mounted (`data-slot`, props).
- **`architecture`** — where copy/content data files belong in the tree.
- **`verify`** — see the copy rendered on the real page before calling
  it done, not just linted in isolation.
