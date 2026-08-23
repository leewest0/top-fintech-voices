import assert from "node:assert/strict";
import { isCurrentNav, nav } from "../src/lib/site.ts";

/**
 * Which menu item lights up on which page.
 *
 * The rule has to be prefix-matching so a profile marks Spotlight and a back
 * issue marks Read, and the boundary check is the part that breaks silently: a
 * bare `startsWith` lets "/read" claim "/reading-list", and nothing about that
 * fails a build or a lint.
 */

// [pathname, the single nav href that should be current, or null]
const cases = [
  ["/", null],
  ["/spotlight", "/spotlight"],
  ["/spotlight/archie-hesse", "/spotlight"],
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

console.log(`nav: ${nav.length} items, ${cases.length} paths resolve to one item or none`);
