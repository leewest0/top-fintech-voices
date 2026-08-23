import assert from "node:assert/strict";
import { footerNav, isCurrentNav, nav } from "../src/lib/site.ts";

/**
 * Which menu item lights up on which page.
 *
 * The rule has to be prefix-matching so a profile marks Platform and a back
 * issue marks Read, and the boundary check is the part that breaks silently: a
 * bare `startsWith` lets "/read" claim "/reading-list", and nothing about that
 * fails a build or a lint.
 */

// [pathname, the single nav href that should be current, or null]
const cases = [
  ["/", null],
  ["/platform", "/platform"],
  ["/platform/archie-hesse", "/platform"],
  ["/magazine", "/magazine"],
  ["/read", "/read"],
  ["/read/vol1", "/read"],
  ["/about", "/about"],
  ["/team", "/team"],
  ["/partners", "/partners"],
  ["/contact", "/contact"],
  // Real routes with no menu item of their own — nothing should light up.
  ["/order", null],
  ["/some-unknown-page", null],
];

for (const [pathname, expected] of cases) {
  const current = nav.filter((item) => isCurrentNav(item.href, pathname));
  assert.ok(
    current.length <= 1,
    `${pathname} lit up ${current.length} items: ${current.map((c) => c.href).join(", ")}`,
  );
  assert.equal(
    current[0]?.href ?? null,
    expected,
    `${pathname} should mark ${expected ?? "nothing"}`,
  );
}

// The boundary, stated directly: a sibling that merely starts with the same
// characters is a different page.
assert.ok(!isCurrentNav("/read", "/reading-list"));
assert.ok(!isCurrentNav("/team", "/teams"));
assert.ok(!isCurrentNav("/partners", "/partnership"));
assert.ok(isCurrentNav("/read", "/read/vol1"));

// Every menu item must be able to mark itself, or it can never appear current.
for (const item of nav) {
  assert.ok(isCurrentNav(item.href, item.href), `${item.href} cannot mark its own page`);
}

// The footer carries pages that don't fit the header — verified to wrap at
// seven items — so it must be a strict superset of the header, never a
// smaller or different list a visitor could reach one way but not the other.
const navHrefs = new Set(nav.map((i) => i.href));
const footerHrefs = new Set(footerNav.map((i) => i.href));
for (const href of navHrefs) {
  assert.ok(footerHrefs.has(href), `${href} is in the header but missing from the footer`);
}
assert.ok(footerHrefs.size > navHrefs.size, "footerNav should carry at least one page the header doesn't");
assert.equal(
  new Set(footerNav.map((i) => i.href)).size,
  footerNav.length,
  "duplicate hrefs in footerNav",
);

console.log(`nav: ${nav.length} items, ${cases.length} paths resolve to one item or none`);
console.log(`footer: ${footerNav.length} items, a superset of the header's ${nav.length}`);
