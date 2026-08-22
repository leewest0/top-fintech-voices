import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/**
 * Guards the one ordering the theme depends on.
 *
 * `:root` and `[data-theme="dark"]` have the same specificity (0,1,0) and both
 * match <html>, so the later declaration wins. If the dark block is written
 * first, dark mode silently stops working — and because the logo rules are more
 * specific they keep switching, leaving the white wordmark on a light page.
 * Nothing about that fails a build or a lint, so it is asserted here.
 */
const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

const light = css.indexOf(':root,\n[data-theme="light"] {');
const dark = css.indexOf('[data-theme="dark"] {');

assert.notEqual(light, -1, 'expected a `:root, [data-theme="light"]` token block');
assert.notEqual(dark, -1, 'expected a `[data-theme="dark"]` token block');
assert.ok(
  light < dark,
  "the default (:root) palette must be declared BEFORE [data-theme='dark'] — " +
    "same specificity means the later rule wins, so this order is what lets the " +
    "dark toggle override anything at all",
);

// Both blocks must define the same tokens, or a theme inherits stray values.
const block = (start) => css.slice(start, css.indexOf("}", start));
const tokensIn = (text) => new Set([...text.matchAll(/(--[a-z0-9-]+):/g)].map((m) => m[1]));

const lightTokens = tokensIn(block(light));
const darkTokens = tokensIn(block(dark));
const missing = [...lightTokens].filter((t) => !darkTokens.has(t));
const extra = [...darkTokens].filter((t) => !lightTokens.has(t));

assert.deepEqual(missing, [], `dark mode is missing tokens: ${missing.join(", ")}`);
assert.deepEqual(extra, [], `dark mode defines tokens light does not: ${extra.join(", ")}`);

// The wordmark swap has to point the opposite way to the palette default.
assert.ok(
  css.includes(".logo-dark-only {\n  display: none;\n}"),
  "the white wordmark must be hidden by default, since the site opens light",
);
assert.ok(
  css.includes('[data-theme="dark"] .logo-dark-only {\n  display: block;\n}'),
  "the white wordmark must come back in dark mode",
);

console.log(`theme: token order and ${lightTokens.size} paired tokens all check out`);
