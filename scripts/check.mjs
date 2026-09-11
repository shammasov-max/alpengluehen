#!/usr/bin/env node
// Site guard: enforces STYLEGUIDE.md invariants that a natural-language edit
// can silently break. Runs locally (`node scripts/check.mjs`) and in CI.
// Exit 1 on any error. Warnings never fail the build.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REF = "index.html"; // header/menu/footer are compared against this page
const pages = readdirSync(ROOT).filter(f => f.endsWith(".html")).sort();
const css = readFileSync(join(ROOT, "assets/css/main.css"), "utf8");
const js = readFileSync(join(ROOT, "assets/js/main.js"), "utf8");

// Classes that are legal: everything selected in main.css + everything main.js toggles.
const known = new Set();
for (const m of css.matchAll(/\.([A-Za-z_][\w-]*)/g)) known.add(m[1]);
for (const m of js.matchAll(/classList\.(?:add|remove|toggle)\(\s*["']([\w-]+)["']/g)) known.add(m[1]);
for (const m of js.matchAll(/["']([\w-]+)["']\s*(?:,|\))/g)) if (/^(is-|has-)/.test(m[1])) known.add(m[1]);

// Germany-German words that STYLEGUIDE forbids in favour of Austrian ones.
const GERMANISMS = {
  Januar: "Jänner", Februar: "Feber", Kartoffel: "Erdäpfel", Tomate: "Paradeiser",
  Sahne: "Obers", Quark: "Topfen", Hackfleisch: "Faschiertes", Aprikose: "Marille",
  Blumenkohl: "Karfiol", Meerrettich: "Kren", Brotzeit: "Jause", Tüte: "Sackerl",
  Treppe: "Stiege", Straßenbahn: "Bim", "grüne Bohnen": "Fisolen",
};

const errors = [], warnings = [];
const err = (p, m) => errors.push(`${p}: ${m}`);
const warn = (p, m) => warnings.push(`${p}: ${m}`);

const block = (html, open, close) => {
  const s = html.indexOf(open), e = html.indexOf(close, s);
  // Whitespace-insensitive: formatting differences between pages are not a drift.
  return s < 0 || e < 0 ? null : html.slice(s, e + close.length).replace(/>\s+</g, "><").replace(/\s+/g, " ");
};
const refHtml = readFileSync(join(ROOT, REF), "utf8");
const shared = {
  header: block(refHtml, "<header ", "</header>"),
  menu: block(refHtml, '<div class="mobile-menu"', "</nav>"),
  footer: block(refHtml, "<footer ", "</footer>"),
};

for (const p of pages) {
  const html = readFileSync(join(ROOT, p), "utf8");
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "");

  if (!/<html[^>]*\blang="de-AT"/.test(html)) err(p, 'missing <html lang="de-AT">');
  if (/<style[\s>]/i.test(html)) err(p, "<style> block found — only classes from main.css are allowed");
  if (!/<main id="main">/.test(html)) err(p, '<main id="main"> missing');
  if (!/<title>[^<]+<\/title>/.test(html)) err(p, "<title> missing");
  if (!/<meta name="description"/.test(html)) err(p, "meta description missing");

  for (const k of Object.keys(shared)) {
    const got = block(html, k === "header" ? "<header " : k === "menu" ? '<div class="mobile-menu"' : "<footer ",
                            k === "header" ? "</header>" : k === "menu" ? "</nav>" : "</footer>");
    if (!got) err(p, `${k} block missing`);
    else if (got !== shared[k]) err(p, `${k} block differs from ${REF} — shared blocks must be identical on every page`);
  }

  const scripts = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map(m => m[1]);
  const iMain = scripts.findIndex(s => s.endsWith("assets/js/main.js"));
  const iLeaf = scripts.findIndex(s => s.includes("leaflet"));
  if (iMain < 0) err(p, "assets/js/main.js not included");
  if (/data-map=/.test(html) && iLeaf < 0) err(p, "page has [data-map] but no Leaflet script");
  if (iLeaf >= 0 && iMain >= 0 && iLeaf > iMain) err(p, "Leaflet must load before main.js");

  for (const m of html.matchAll(/class="([^"]*)"/g))
    for (const c of m[1].split(/\s+/).filter(Boolean))
      if (!known.has(c)) err(p, `unknown class "${c}" — not defined in main.css (STYLEGUIDE: do not invent classes)`);

  for (const m of html.matchAll(/<img\b[^>]*>/g))
    if (!/\balt=/.test(m[0])) err(p, `<img> without alt: ${m[0].slice(0, 80)}`);

  for (const m of html.matchAll(/(?:href|src)="([^"#:]+)"/g)) {
    const target = m[1].split("?")[0];
    if (target && !existsSync(join(ROOT, target))) err(p, `broken local link: ${m[1]}`);
  }

  const text = body.replace(/<[^>]+>/g, " ");
  for (const [de, at] of Object.entries(GERMANISMS)) {
    const re = new RegExp(`(?<![\\wäöüÄÖÜß])${de}(?![\\wäöüÄÖÜß])`, "g");
    const n = (text.match(re) || []).length;
    if (n) err(p, `Germany-German "${de}" ×${n} — use "${at}"`);
  }
  const inline = (html.match(/ style="/g) || []).length;
  if (inline > 8) warn(p, `${inline} inline style= attributes — keep tweaks tiny, prefer main.css`);
}

for (const w of warnings) console.log("warn  " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(`\n${pages.length} pages · ${errors.length} errors · ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
