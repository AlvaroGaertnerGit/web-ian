# SEO title / meta description wording

This template covers the **wording**. For character-count limits,
duplicate-metadata checks, and structure, use the `seo-local` skill's
`audit-seo.mjs` alongside this.

## Shape

- **Title**: `[Servicio o página] | [Nombre del despacho]` or
  `Detectives privados en [Ciudad] | [Nombre del despacho]` — specific,
  not generic ("Inicio", "Servicios").
- **Description**: one sentence stating what the page covers + one
  sentence on why to choose this firm (concrete, not superlative) +
  implicit or explicit CTA.

## Do

- Front-load the specific service/city keyword a real searcher would
  type, in natural Spanish (not keyword-stuffed).
- Match the tone rules in this skill's `SKILL.md` — metadata text is
  still public-facing copy.

## Don't

- Don't leave scaffolding defaults ("Create Next App", "Generado por
  Next.js") — `seo-local`'s audit flags these as `placeholder-metadata`.
- Don't write clickbait ("La verdad que no te contaron") — it violates
  both the tone rules here and generates poor click-through quality.
- Don't duplicate the same title/description across two different pages
  — `seo-local`'s audit flags this as `duplicate-metadata`.

## Example rewrite

> Generic: "Detectives Privados - Los Mejores Profesionales"

> Specific: "Investigación de infidelidades en [Ciudad] | [Nombre del
> despacho]" — "Investigamos infidelidades con seguimiento discreto y
> evidencia documentada. Consulta confidencial sin compromiso."
