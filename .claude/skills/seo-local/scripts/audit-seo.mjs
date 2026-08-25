#!/usr/bin/env node
// SEO metadata + Schema.org fabrication audit for this project.
// Heuristic regex-based (like the design-system/performance audits),
// not a real parser — treat findings as leads to investigate.
// Node >= 18, no deps.
//
// Usage: node .claude/skills/seo-local/scripts/audit-seo.mjs [path] [--json]

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const target = args.find((a) => a !== "--json") || "src";

function walk(dir, files = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, files);
    else if ([".ts", ".tsx", ".js", ".jsx"].includes(extname(entry))) files.push(full);
  }
  return files;
}

let targetFiles;
try {
  targetFiles = statSync(target).isDirectory() ? walk(target) : [target];
} catch (err) {
  console.error(`Path not found: ${target}`);
  process.exit(2);
}

const findings = [];
const titleMap = new Map(); // title text -> [files]
const descriptionMap = new Map();

const PLACEHOLDER_TEXT = [
  /create next app/i,
  /generado por next\.?js/i,
  /lorem ipsum/i,
  /^home$/i,
  /my next\.?js app/i,
];

const SCHEMA_KEYS = [
  "aggregateRating",
  "review",
  "priceRange",
  "telephone",
  "address",
  "openingHours",
  "numberOfEmployees",
  "foundingDate",
  "yearsInBusiness",
  "ratingValue",
  "reviewCount",
];

function extractBalancedBlock(content, startIdx) {
  const braceStart = content.indexOf("{", startIdx);
  if (braceStart === -1) return null;
  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      depth--;
      if (depth === 0) return { text: content.slice(braceStart, i + 1), start: braceStart, end: i + 1 };
    }
  }
  return null;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function extractStringField(block, field) {
  const re = new RegExp(`\\b${field}\\s*:\\s*(["'\`])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1`, "i");
  const m = block.match(re);
  return m ? m[2] : null;
}

function extractJsxText(content) {
  const jsxTextRe = />([^<>{}\n]{2,})</g;
  let m;
  let words = 0;
  while ((m = jsxTextRe.exec(content))) {
    const t = m[1].trim();
    if (t) words += t.split(/\s+/).filter(Boolean).length;
  }
  return words;
}

for (const file of targetFiles) {
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  const rel = relative(process.cwd(), file);
  const isRouteFile = /[\\/](page|layout)\.(tsx|jsx)$/.test(file);
  const isPageFile = /[\\/]page\.(tsx|jsx)$/.test(file);

  const hasStaticMetadata = /export const metadata\b/.test(content);
  const hasDynamicMetadata = /export (async )?function generateMetadata\b/.test(content);

  if (isRouteFile && !hasStaticMetadata && !hasDynamicMetadata) {
    findings.push({
      file: rel,
      line: 1,
      rule: "missing-metadata",
      detail: "route file has no `metadata` or `generateMetadata` export",
    });
  }

  if (hasStaticMetadata) {
    const idx = content.indexOf("export const metadata");
    const block = extractBalancedBlock(content, idx);
    if (block) {
      const line = lineOf(content, block.start);
      const title = extractStringField(block.text, "title");
      const description = extractStringField(block.text, "description");

      if (title) {
        if (title.length < 15 || title.length > 60) {
          findings.push({ file: rel, line, rule: "title-length", detail: `"${title}" (${title.length} chars)` });
        }
        if (PLACEHOLDER_TEXT.some((re) => re.test(title))) {
          findings.push({ file: rel, line, rule: "placeholder-metadata", detail: `title: "${title}"` });
        }
        if (!titleMap.has(title)) titleMap.set(title, []);
        titleMap.get(title).push(rel);
      }

      if (description) {
        if (description.length < 70 || description.length > 160) {
          findings.push({
            file: rel,
            line,
            rule: "description-length",
            detail: `"${description}" (${description.length} chars)`,
          });
        }
        if (PLACEHOLDER_TEXT.some((re) => re.test(description))) {
          findings.push({ file: rel, line, rule: "placeholder-metadata", detail: `description: "${description}"` });
        }
        if (!descriptionMap.has(description)) descriptionMap.set(description, []);
        descriptionMap.get(description).push(rel);
      }

      if (!/openGraph\s*:/.test(block.text)) {
        findings.push({ file: rel, line, rule: "missing-open-graph", detail: "no `openGraph` block in metadata" });
      }
    }
  }

  if (isPageFile) {
    const words = extractJsxText(content);
    if (words > 0 && words < 120) {
      findings.push({ file: rel, line: 1, rule: "thin-content", detail: `~${words} words of extracted body text` });
    }
  }

  if (/@type/.test(content)) {
    for (const key of SCHEMA_KEYS) {
      const re = new RegExp(`\\b${key}\\s*:\\s*("([^"]*)"|'([^']*)'|\`([^\`]*)\`|[\\d.]+)`, "gi");
      let m;
      while ((m = re.exec(content))) {
        const value = m[2] ?? m[3] ?? m[4] ?? m[1];
        if (typeof value === "string" && value.includes("[")) continue; // bracketed placeholder
        findings.push({
          file: rel,
          line: lineOf(content, m.index),
          rule: "schema-unverifiable-field",
          detail: `"${key}: ${m[1]}" — confirm this is real data or remove/placeholder it`,
        });
      }
    }
  }
}

for (const [title, files] of titleMap) {
  if (files.length > 1) {
    findings.push({
      file: files.join(", "),
      line: 0,
      rule: "duplicate-title",
      detail: `"${title}" reused across ${files.length} files`,
    });
  }
}
for (const [description, files] of descriptionMap) {
  if (files.length > 1) {
    findings.push({
      file: files.join(", "),
      line: 0,
      rule: "duplicate-description",
      detail: `"${description}" reused across ${files.length} files`,
    });
  }
}

if (asJson) {
  console.log(JSON.stringify(findings, null, 2));
} else {
  if (findings.length === 0) {
    console.log("seo-local: 0 findings");
  } else {
    for (const f of findings) {
      console.log(`${f.file}:${f.line} [${f.rule}] ${f.detail}`);
    }
    console.log(`\n${findings.length} finding(s)`);
  }
}

process.exit(findings.length > 0 ? 1 : 0);
