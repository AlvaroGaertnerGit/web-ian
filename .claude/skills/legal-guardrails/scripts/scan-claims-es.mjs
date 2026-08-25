#!/usr/bin/env node
// Scans Spanish copy for legally/ethically risky claims (illegal access,
// absolute guarantees, absolute judicial-validity claims) per
// CLAUDE.md §8. Heuristic regex-based — flags candidates for human
// review, it does not judge legality and it never edits files.
// Node >= 18, no deps.
//
// Usage: node .claude/skills/legal-guardrails/scripts/scan-claims-es.mjs <file> [file...] [--json]

import { readFileSync } from "node:fs";
import { extname } from "node:path";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const files = args.filter((a) => a !== "--json");

if (files.length === 0) {
  console.error(
    "Usage: scan-claims-es.mjs <file> [file...] [--json]  (.md, .ts, .tsx, .jsx)"
  );
  process.exit(2);
}

// --- text extraction (heuristic, not a real parser) ---------------------
// Deliberately duplicated (not imported) from copywriting-legal-es's
// script — each skill stays self-contained and independently removable.

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

// --- claim pattern table -------------------------------------------------
// Kept in sync with reference/claim-patterns.md — update both together.

const CLAIM_PATTERNS = [
  {
    category: "illegal-access-claim",
    patterns: [
      /\bhacke(ar|amos|a|amos)\b/i,
      /acced(?:emos|es|e|er)?\s+a\s+(tu|su|cualquier)?\s*(m[oó]vil|tel[eé]fono|whatsapp)/i,
      /clonamos?\s+(el\s+)?(m[oó]vil|whatsapp)/i,
      /acced(?:emos|es|e|er)?\s+a\s+(mensajes|conversaciones|cuentas|dispositivos)\b/i,
      /interceptamos?\s+(llamadas|mensajes|comunicaciones)/i,
      /\bespiamos\b/i,
    ],
    why: "Sugiere acceso no autorizado a dispositivos, cuentas o comunicaciones de terceros — puede constituir un delito contra el secreto de las comunicaciones (art. 197 CP) y expone al despacho a responsabilidad si se lee como oferta real del servicio.",
    alternative:
      'Describe el método lícito real, p. ej.: "obtenemos evidencias mediante vigilancia y documentación directa, dentro del marco legal vigente", sin mencionar acceso a dispositivos, cuentas o comunicaciones.',
  },
  {
    category: "unlawful-data-obtaining",
    patterns: [/(obtenemos|conseguimos) (sus|tus)? ?datos sin (consentimiento|autorizaci[oó]n)/i],
    why: "Implica obtención de datos personales sin base legal, contrario a la normativa de protección de datos (LOPDGDD/RGPD).",
    alternative:
      'Encuadra la obtención de información en el marco legal: "recabamos información dentro del marco legal de protección de datos vigente".',
  },
  {
    category: "indiscriminate-surveillance-claim",
    patterns: [
      /localizamos a cualquier persona/i,
      /seguimiento indiscriminado/i,
      /vigilancia (total|absoluta|sin l[ií]mites)/i,
      /podemos (encontrar|localizar) a (cualquiera|quien sea)/i,
    ],
    why: "Implica capacidad de vigilancia o localización sin las limitaciones legales de interés legítimo y proporcionalidad — puede leerse como promesa de vigilancia ilegal.",
    alternative:
      'Acota la afirmación al marco legal: "localizamos personas dentro del marco legal, cuando existe un interés legítimo acreditado".',
  },
  {
    category: "absolute-result-guarantee",
    patterns: [
      /garantizamos( el)?\s*(resultado|[eé]xito|pruebas?)/i,
      /100\s*%\s*(de\s*)?([eé]xito|resultados?)/i,
      /siempre (obtenemos|conseguimos)/i,
      /en todos los casos (conseguimos|obtenemos)/i,
      /resultado garantizado/i,
      /[eé]xito garantizado/i,
    ],
    why: "El resultado de una investigación depende de los hechos y no puede garantizarse; una promesa absoluta puede constituir publicidad engañosa (Ley General de Publicidad / Ley de Competencia Desleal) y genera expectativas que el despacho no controla.",
    alternative:
      'Describe el proceso, no el resultado: "investigamos con rigor para maximizar las posibilidades de obtener evidencia válida".',
  },
  {
    category: "judicial-validity-absolute-claim",
    patterns: [
      /v[aá]lid[oa]s? (ante|en) cualquier juzgado/i,
      /admisibles? en cualquier procedimiento/i,
      /validez judicial garantizada/i,
    ],
    why: "La admisibilidad de una prueba la determina el juez caso por caso; afirmar validez judicial universal o garantizada es una afirmación legal absoluta que el despacho no puede respaldar.",
    alternative:
      'Hedge la afirmación: "elaboramos los informes siguiendo la metodología habitual para que puedan aportarse como prueba, si el juzgado así lo determina".',
  },
];

// Heuristic: a preceding "no " within ~4 words of the match may mean this
// is a compliance reassurance, not a claim. Not a verdict — a hint for
// the reviewer, per SKILL.md.
function looksLikeCompliance(text, matchIndex) {
  const before = text.slice(Math.max(0, matchIndex - 30), matchIndex);
  return /\bno\s+\S*\s*\S*\s*$/i.test(before) || /\bnunca\s+\S*\s*\S*\s*$/i.test(before);
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

    for (const rule of CLAIM_PATTERNS) {
      for (const re of rule.patterns) {
        const m = text.match(re);
        if (!m) continue;
        findings.push({
          file,
          line,
          category: rule.category,
          match: m[0],
          context: text.trim(),
          why: rule.why,
          alternative: rule.alternative,
          possibleCompliance: looksLikeCompliance(text, m.index ?? 0),
        });
      }
    }
  }
}

if (asJson) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  if (findings.length === 0) {
    console.log("legal-guardrails: 0 findings");
  } else {
    for (const f of findings) {
      const flag = f.possibleCompliance ? " [posible aclaración de cumplimiento — revisar antes de reescribir]" : "";
      console.log(`${f.file}:${f.line} [${f.category}] "${f.match}"${flag}`);
      console.log(`  contexto: ${f.context}`);
      console.log(`  por qué: ${f.why}`);
      console.log(`  alternativa: ${f.alternative}\n`);
    }
    console.log(`${findings.length} finding(s)`);
  }
}

process.exit(findings.length > 0 ? 1 : 0);
