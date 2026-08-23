import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { voices } from "../src/lib/voices.ts";

/**
 * The cutover check.
 *
 * Every profile on the old WordPress site lived at the root — /archie-hesse-ceo-ghipss/ —
 * and this app serves them under /spotlight/<slug>. The day the domain stops pointing at
 * WordPress, every one of those addresses arrives here instead, and without a redirect it
 * 404s. `legacy-urls.txt` is the list taken from the live wp-sitemap while it was still
 * up; these assertions hold the redirect map against it.
 */

const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const legacy = readFileSync(new URL("./fixtures/legacy-urls.txt", import.meta.url), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("#"))
  .map((path) => path.replace(/\/+$/, "") || "/");

// What the config actually redirects: the profiles, derived from voices.ts, plus
// the hand-listed section pages.
const profileSources = new Set(voices.map((v) => new URL(v.article).pathname.replace(/\/+$/, "")));
const sectionSources = new Set(
  [...config.matchAll(/^\s*"(\/[^"]*)":\s*"(\/[^"]*)"/gm)].map((m) => m[1]),
);
const redirected = new Set([...profileSources, ...sectionSources]);

// Paths this app serves itself, which need no redirect.
const served = new Set(["/", "/spotlight", "/contact", "/about", "/magazine", "/stories", "/team", "/order", "/read", "/partners"]);

// Theme demo pages that never held this publication's content. A 404 is correct
// for these — see the note in next.config.ts.
const themeJunk = /^\/(works|services|sample-page|skt-karate|project\/|service\/|service-category\/|matias-blocks\/)/;

// 1. Every profile URL on the old site is caught.
{
  const profiles = legacy.filter((p) => profileSources.has(p));
  assert.equal(
    profiles.length,
    voices.length,
    `expected all ${voices.length} profile URLs in the legacy list, matched ${profiles.length}`,
  );
}

// 2. Nothing real is left to 404. Anything in the legacy list must either be
//    redirected, still served at the same path, or explicitly theme junk.
{
  const orphans = legacy.filter(
    (p) => !redirected.has(p) && !served.has(p) && !themeJunk.test(p),
  );
  assert.deepEqual(orphans, [], `these old URLs would 404 after the cutover:\n  ${orphans.join("\n  ")}`);
}

// 3. Every redirect lands somewhere this app actually serves.
{
  const destinations = [
    ...voices.map((v) => `/spotlight/${v.slug}`),
    ...[...config.matchAll(/^\s*"(\/[^"]*)":\s*"(\/[^"]*)"/gm)].map((m) => m[2]),
  ];
  const slugs = new Set(voices.map((v) => `/spotlight/${v.slug}`));
  const broken = destinations.filter((d) => !served.has(d) && !slugs.has(d));
  assert.deepEqual(broken, [], `these redirects point at routes that do not exist: ${broken.join(", ")}`);
}

// 4. A redirect must never point at itself — that is an infinite loop in prod.
{
  const loops = [...redirected].filter((source) => {
    const voice = voices.find((v) => new URL(v.article).pathname.replace(/\/+$/, "") === source);
    return voice ? `/spotlight/${voice.slug}` === source : false;
  });
  assert.deepEqual(loops, [], `self-referential redirects: ${loops.join(", ")}`);
}

console.log(
  `redirects: ${profileSources.size} profiles + ${sectionSources.size} sections cover the old site`,
);
