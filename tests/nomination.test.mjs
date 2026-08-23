import assert from "node:assert/strict";
import {
  isHoneypotTripped,
  nominationHtml,
  nominationSubject,
  nominationText,
  parseNomination,
} from "../src/lib/nomination.ts";

const valid = {
  nomineeName: "  Ama Mensah ",
  nomineeRole: "Building a savings app for market traders",
  nomineeOrg: "Brassica Pay",
  nomineeLink: "https://www.linkedin.com/in/ama-mensah",
  reason: "She built it from nothing while still in school.",
  yourName: "Kofi Test",
  yourEmail: "kofi@example.com",
};

// --- happy path -------------------------------------------------------------
{
  const r = parseNomination(valid);
  assert.ok(r.ok, "a complete nomination should parse");
  assert.equal(r.nomination.nomineeName, "Ama Mensah", "whitespace is trimmed");
}

// --- required fields ---------------------------------------------------------
for (const field of ["nomineeName", "nomineeRole", "reason", "yourName", "yourEmail"]) {
  const r = parseNomination({ ...valid, [field]: "   " });
  assert.ok(!r.ok && r.errors[field], `${field} must be required`);
}

// Organisation and a link are optional — plenty of real nominees won't have
// a company name or a URL to hand, and that shouldn't lose the nomination.
{
  const r = parseNomination({ ...valid, nomineeOrg: "", nomineeLink: "" });
  assert.ok(r.ok, "nomineeOrg and nomineeLink must stay optional");
}

// --- the nominator's email is validated the same way every other form does --
for (const bad of ["kofi", "kofi@", "@example.com", "kofi@example", "a b@c.com"]) {
  const r = parseNomination({ ...valid, yourEmail: bad });
  assert.ok(!r.ok && r.errors.yourEmail, `"${bad}" should be rejected`);
}
assert.ok(parseNomination({ ...valid, yourEmail: "a.b+tag@sub.example.co.uk" }).ok);

// --- honeypot ---------------------------------------------------------------
assert.ok(isHoneypotTripped({ ...valid, website: "http://spam.example" }));
assert.ok(!isHoneypotTripped(valid));

// --- hostile input never reaches the email as markup ------------------------
{
  const nasty = {
    ...valid,
    nomineeName: '</td><script>alert("xss")</script>',
    nomineeOrg: 'Acme " onmouseover="evil()',
    reason: "<img src=x onerror=alert(1)>",
  };
  const r = parseNomination(nasty);
  assert.ok(r.ok);

  const html = nominationHtml(r.nomination);
  assert.ok(!html.includes("<script>"), "script tags must be escaped");
  assert.ok(!html.includes("<img src=x"), "img tags must be escaped");
  assert.ok(html.includes("&lt;script&gt;"), "the text should survive, escaped");
  assert.ok(!/onmouseover="evil/.test(html), "attribute breakouts must be escaped");

  // The plain-text part carries it verbatim, which is correct — it is text.
  assert.ok(nominationText(r.nomination).includes("<img src=x onerror=alert(1)>"));
}

// --- the subject names the nominee, not just "a nomination" -----------------
{
  const { nomination } = parseNomination(valid);
  const subject = nominationSubject(nomination);
  assert.match(subject, /Emerging Voices nomination/);
  assert.ok(subject.includes("Ama Mensah"), "the nominee's name belongs in the subject");
}

console.log("nomination: all assertions passed");
