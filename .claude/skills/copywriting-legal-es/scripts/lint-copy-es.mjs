#!/usr/bin/env node
// Spanish-language copy linter for this project: tone, clichés, thriller/
// hacker vocabulary, English leftovers, and invented facts. Heuristic
// regex-based (like the design-system/performance audits), not a real
// parser — treat findings as leads to investigate. Node >= 18, no deps.
//
// Usage: node .claude/skills/copywriting-legal-es/scripts/lint-copy-es.mjs <file> [file...] [--json]

import { readFileSync } from "node:fs";
import { extname } from "node:path";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const files = args.filter((a) => a !== "--json");

if (files.length === 0) {
  console.error(
    "Usage: lint-copy-es.mjs <file> [file...] [--json]  (.md, .ts, .tsx, .jsx)"
  );
  process.exit(2);
}

// --- text extraction (heuristic, not a real parser) ---------------------

function extractSegments(filePath, content) {
  const ext = extname(filePath);
  if (ext === ".md" || ext === ".mdx") {
    const cleaned = content
      .replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, " "))
      .replace(/`[^`]*`/g, (m) => m.replace(/./g, " "));
    return cleaned.split("\n").map((text, i) => ({ line: i + 1, text }));
  }

  const segments = [];
  const attrRe =
    /\b(title|description|alt|ariaLabel|aria-label|placeholder|label)\s*[:=]\s*(["'`])((?:(?!\2)[^\\]|\\.)*)\2/g;
  const jsxTextRe = />([^<>{}\n]{2,})</g;

  content.split("\n").forEach((line, i) => {
    let m;
    attrRe.lastIndex = 0;
    while ((m = attrRe.exec(line))) segments.push({ line: i + 1, text: m[3] });
    jsxTextRe.lastIndex = 0;
    while ((m = jsxTextRe.exec(line))) {
      const t = m[1].trim();
      if (t) segments.push({ line: i + 1, text: t });
    }
  });
  return segments;
}

// --- rules ----------------------------------------------------------------

const THRILLER_SPY_HACKER = [
  /descubr(e|es|ir|imos) la verdad( ahora)?/i,
  /casos? secretos?/i,
  /agentes? especiales?/i,
  /\bmisi[oó]n(es)?\b/i,
  /\boperaci[oó]n(es)? encubiert/i,
  /\bespionaje\b/i,
  /detective(s)? de pel[ií]cula/i,
  /agente(s)? secreto(s)?/i,
  /operativo(s)? encubierto(s)?/i,
  /\btrama(s)?\b/i,
  /conspiraci[oó]n(es)?/i,
  /\bhacke(ar|amos|a|amos)\b/i,
  /\bespiamos\b/i,
  /\bspyware\b/i,
];

const CLICHE_ES = [
  /l[ií]der(es)? (del sector|indiscutible)/i,
  /soluci[oó]n integral/i,
  /a la vanguardia/i,
  /en la era digital( actual)?/i,
  /no dude(s)? en contactar/i,
  /comprometidos con la excelencia/i,
  /de forma r[aá]pida y sencilla/i,
  /el mejor (despacho|equipo) de/i,
  /calidad (y|-) confianza/i,
  /a su entera disposici[oó]n/i,
];

const AGGRESSIVE_CTA = [
  /¡[^!\n]*(ahora|ya|urgente)[^!\n]*!/i,
  /no esperes m[aá]s/i,
  /act[uú]a ya/i,
  /[uú]ltima oportunidad/i,
];

const ENGLISH_LEFTOVER = [
  /\bclick here\b/i,
  /\blearn more\b/i,
  /\bread more\b/i,
  /\bget started\b/i,
  /\bcontact us\b/i,
  /\bfind out\b/i,
  /\bsign up\b/i,
  /\bsubmit\b/i,
  /\bhome\b/i,
];

const TESTIMONIAL_PATTERN = [/★{3,}/, /\b[0-5](\.\d)?\s*\/\s*5\b/, /\bestrellas\b/i];

const NUMERIC_CLAIM_RE =
  /\b\d+\+?\s*(a[nñ]os? de experiencia|casos?( resueltos)?|clientes?( satisfechos)?)/i;

const FABRICATED_CREDENTIAL_RE = /\b(TIP|RNSP)\b[^\n[]{0,15}?\d/gi;

function isInsideBrackets(line, matchIndex, matchLength) {
  const before = line.lastIndexOf("[", matchIndex);
  const after = line.indexOf("]", matchIndex);
  const openBefore = line.lastIndexOf("]", matchIndex);
  return before !== -1 && after !== -1 && before > openBefore;
}

function checkPatterns(text, patterns, rule) {
  const hits = [];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) hits.push({ rule, match: m[0] });
  }
  return hits;
}

// --- run --------------------------------------------------------------

const findings = [];

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch (err) {
    console.error(`(skipping ${file}: ${err.message.split("\n")[0]})`);
    continue;
  }

  const segments = extractSegments(file, content);

  for (const { line, text } of segments) {
    if (!text.trim()) continue;

    for (const hit of checkPatterns(text, THRILLER_SPY_HACKER, "thriller-spy-hacker-vocab")) {
      findings.push({ file, line, ...hit, context: text.trim() });
    }
    for (const hit of checkPatterns(text, CLICHE_ES, "cliche-marketing-es")) {
      findings.push({ file, line, ...hit, context: text.trim() });
    }
    for (const hit of checkPatterns(text, AGGRESSIVE_CTA, "aggressive-cta")) {
      findings.push({ file, line, ...hit, context: text.trim() });
    }
    for (const hit of checkPatterns(text, ENGLISH_LEFTOVER, "english-leftover")) {
      findings.push({ file, line, ...hit, context: text.trim() });
    }
    for (const hit of checkPatterns(text, TESTIMONIAL_PATTERN, "unverified-testimonial")) {
      findings.push({ file, line, ...hit, context: text.trim() });
    }

    const numMatch = text.match(NUMERIC_CLAIM_RE);
    if (numMatch && !isInsideBrackets(text, numMatch.index, numMatch[0].length)) {
      findings.push({
        file,
        line,
        rule: "unverified-numeric-claim",
        match: numMatch[0],
        context: text.trim(),
      });
    }

    for (const credMatch of text.matchAll(FABRICATED_CREDENTIAL_RE)) {
      findings.push({
        file,
        line,
        rule: "fabricated-credential",
        match: credMatch[0],
        context: text.trim(),
      });
    }

    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length > 30 && /[.!?]$/.test(text.trim())) {
      findings.push({
        file,
        line,
        rule: "long-sentence",
        match: `${words.length} words`,
        context: text.trim().slice(0, 80) + "…",
      });
    }
  }
}

if (asJson) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  if (findings.length === 0) {
    console.log("copywriting-legal-es: 0 findings");
  } else {
    for (const f of findings) {
      console.log(`${f.file}:${f.line} [${f.rule}] "${f.match}" — ${f.context}`);
    }
    console.log(`\n${findings.length} finding(s)`);
  }
}

process.exit(findings.length > 0 ? 1 : 0);
