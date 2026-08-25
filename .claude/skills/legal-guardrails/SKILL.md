---
name: legal-guardrails
description: Scan this private-investigation-firm website's content for legally/ethically risky claims — illegal access (hacking, phone/account access, communication interception), indiscriminate surveillance, absolute result/success guarantees, and absolute judicial-validity claims. Use whenever content describes what the firm does, how it works, or what a client will get — drafts, service pages, FAQ, CTAs. Does NOT give legal advice to the end client and does NOT judge overall site legality — it's an internal content-risk linter for the team producing the site, not a lawyer.
---

## Purpose

`CLAUDE.md` §8 sets a hard rule: this site must never claim or imply
illegal capability, and must never promise a result. This skill is the
enforcement layer for that rule — it scans copy for the specific
phrasings that cross the line, explains *why* each one is risky, and
proposes a prudent rewrite. It is pattern-matching, not legal counsel:
final judgment on any specific claim always belongs to the user/a real
lawyer, not to this skill's output.

**This skill does not provide legal advice to the website's visitors.**
Nothing it produces should ever be published as legal guidance to a
client — it only reviews what *this team* is about to publish about
itself.

## When to use

- Reviewing any copy that describes a service, a method, a capability,
  or an outcome (service descriptions, "cómo trabajamos", FAQ, hero
  claims, CTA subtext, testimonials/case summaries).
- Before publishing any new page or editing an existing one that touches
  what the firm does or promises.
- When `copywriting-legal-es` flags something borderline and you need
  the legal-risk read specifically, not the tone read.

## When NOT to use

- Pure tone/cliché/naturalness review with no claims about capability or
  outcome — that's `copywriting-legal-es` alone.
- SEO metadata structure, Schema.org field fabrication — `seo-local`
  (though its schema audit will point here for claim-shaped fields like
  reviews/ratings).
- General code correctness — `code-review`.
- Actually drafting the site's real terms of service / privacy policy —
  that requires a real lawyer, not this skill.

## Workflow

1. Run the scanner on the file(s) you're about to publish or just wrote:
   ```bash
   node .claude/skills/legal-guardrails/scripts/scan-claims-es.mjs <file> [file...]
   ```
2. For every finding:
   - Read the **category** and **why** — understand the specific legal/
     ethical concern, don't just pattern-match the fix.
   - Check whether the flagged line is actually a **compliance
     reassurance** ("No accedemos a dispositivos sin autorización
     judicial") rather than a claim — the script flags both because
     regex can't tell them apart; `possibleCompliance: true` in the
     output is a hint, not a verdict. **Never silently delete or reword
     a flagged line without explaining what you changed and why** — a
     legitimate reassurance rewritten into something vaguer is a
     regression, not a fix.
   - Propose the suggested alternative from `reference/claim-patterns.md`
     or a closer variant that keeps the sentence's real meaning.
3. Re-run until clean, or until every remaining finding has a written
   justification (e.g. "this is the compliance disclaimer, kept as-is").
4. For anything genuinely ambiguous — is this a factual claim, a
   commercial claim, or a legal explanation? — use the classification
   guide in `reference/claim-patterns.md` §Differentiating claim types.

## Rules

### Categories this skill detects

| Category | Covers |
|---|---|
| `illegal-access-claim` | Hacking, accessing phones/WhatsApp/accounts, intercepting calls/messages, cloning devices |
| `unlawful-data-obtaining` | Obtaining someone's data without consent/authorization |
| `indiscriminate-surveillance-claim` | Locating/surveilling "anyone", surveillance without legal limits |
| `absolute-result-guarantee` | "Garantizamos resultado/éxito", "100% de éxito", "siempre obtenemos pruebas" |
| `judicial-validity-absolute-claim` | "Válido en cualquier juzgado", "admisible en cualquier procedimiento" |

See `reference/claim-patterns.md` for the full pattern table, the "why
problematic" reasoning, and a prudent alternative for each.

### Never auto-delete

The script only reports — it never edits files. When you (the agent)
fix a finding, always state what changed and why in your summary; don't
silently strip a sentence that might have been a legitimate compliance
statement.

### Differentiate claim types before acting

Not every match is a violation. Classify the flagged sentence as one of:

- **Factual statement** — a fact about the regulatory framework ("la
  investigación privada está regulada en España") — usually fine.
- **Commercial claim** — a promise about this firm's capability/result —
  the highest-risk category, rewrite per `reference/claim-patterns.md`.
- **Service description** — what the firm does, in neutral terms — fine
  if it doesn't imply illegal method or guaranteed outcome.
- **Legal explanation** — general info about legality/admissibility —
  keep it general and hedged ("puede aportarse como prueba, si el
  juzgado lo determina"), never absolute.
- **Promise of outcome** — anything implying the client will get what
  they want — always rewrite to describe the process, not the result.

## Examples

**Flagged, correctly:**
> "Accedemos a WhatsApp y redes sociales para obtener las pruebas que
> necesitas." → `illegal-access-claim`

**Flagged, but a compliance reassurance (keep, don't delete):**
> "No accedemos a dispositivos ni cuentas de terceros sin autorización
> judicial." → matches the pattern lexically but is the *correct*
> statement; the script marks `possibleCompliance: true` for this case.

**Flagged, correctly:**
> "Garantizamos el éxito de la investigación en el 100% de los casos."
> → `absolute-result-guarantee`

**Not flagged, and shouldn't be:**
> "Documentamos la investigación en un informe detallado que puede
> aportarse como prueba, si el juzgado lo determina." — hedged, no
> absolute claim.

## Anti-patterns

- Treating every match as a violation and rewriting compliance
  disclaimers into something vaguer — that makes the page *less*
  trustworthy, not more compliant.
- Using this skill to draft actual legal/regulatory guidance for the
  site (e.g. a "Marco legal" page's substantive legal content) — that
  needs a real lawyer; this skill only catches risky marketing phrasing.
- Rewriting a flagged claim into a synonym that keeps the same risk
  ("garantizamos" → "aseguramos el éxito") instead of changing what's
  actually being promised.
- Running only `copywriting-legal-es` on service/method copy and
  skipping this skill because the tone already sounds fine — tone and
  legal risk are independent; calm-sounding copy can still promise
  something illegal.

## Verification checklist

- [ ] `scan-claims-es.mjs` returns 0 findings, or every remaining one has
      a written justification
- [ ] No claim implies access to a device, account, or communication
      without the owner's consent/legal basis
- [ ] No absolute guarantee of result, success, or evidence
- [ ] No absolute claim of judicial validity/admissibility
- [ ] Every legal-adjacent statement is hedged to reflect case-by-case
      reality, not stated as universal fact
- [ ] Changes explained, not silently applied — a human reviewer can see
      what was flagged and why it was kept or changed

## Related skills

- **`copywriting-legal-es`** — tone/naturalness/language on the same
  copy; run both on anything describing services or methods.
- **`seo-local`** — its schema audit flags fabricated `aggregateRating`/
  `review`/price fields; those are a claims problem too (false
  advertising risk), cross-check with this skill's categories.
- **`code-review`** — its "Conventions (CLAUDE.md)" angle checks
  CLAUDE.md rule violations generally but doesn't have this skill's
  curated claim-pattern table; run this skill explicitly on any diff
  touching public copy, don't rely on code-review alone.
