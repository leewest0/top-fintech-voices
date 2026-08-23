import assert from "node:assert/strict";
import { masthead } from "../src/lib/magazine.ts";
import { team } from "../src/lib/content.ts";

/**
 * The client noticed people missing from /team, and they were right: the team
 * grid was seeded from the WordPress About page, which had five of the nine
 * contributors Vol 2 credits. The other four appeared only in the credits list
 * at the foot of the page, so they read as "not on the team".
 *
 * Everyone the edition credits must have a card. The reverse does not hold —
 * the site's own people (engineering, say) are not in a printed masthead, and
 * adding them to it would misstate what the edition says.
 */

const credited = [...new Set(masthead.flatMap((entry) => entry.names))];
const onTeam = new Set(team.map((member) => member.name));

const missing = credited.filter((name) => !onTeam.has(name));
assert.deepEqual(
  missing,
  [],
  `credited in the edition but missing from the team grid: ${missing.join(", ")}`,
);

// Every card needs a name and a role; a portrait and a bio are optional, since
// a monogram beats dropping someone for want of a photograph.
for (const member of team) {
  assert.ok(member.name?.trim(), "a team member has no name");
  assert.ok(member.role?.trim(), `${member.name} has no role`);
  if (member.image !== undefined) {
    assert.match(member.image, /^\/(team|voices)\/[\w.-]+$/, `${member.name}: odd image path`);
  }
}

// Two people holding one name would collide on the React key and silently
// render one card.
const names = team.map((m) => m.name);
assert.equal(new Set(names).size, names.length, "duplicate names in the team list");

// A LinkedIn link is the one field that goes out into the world unattended —
// a stray query string or a copy-pasted tracking parameter would sit there
// unnoticed. Personal profile URLs only, no query string, no trailing slash.
for (const member of team) {
  if (member.linkedin === undefined) continue;
  assert.match(
    member.linkedin,
    /^https:\/\/www\.linkedin\.com\/in\/[\w-]+$/,
    `${member.name}: linkedin should be a bare personal-profile URL, got ${member.linkedin}`,
  );
}

console.log(
  `team: ${team.length} people, all ${credited.length} credited in the edition accounted for`,
);
