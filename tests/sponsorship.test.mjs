import assert from "node:assert/strict";
import {
  INTERESTS,
  isHoneypotTripped,
  parseSponsorship,
  sponsorshipHtml,
  sponsorshipSubject,
  sponsorshipText,
} from "../src/lib/sponsorship.ts";

const valid = {
  name: "  Ama Mensah ",
  organisation: "Brassica Pay",
  email: "ama@example.com",
  phone: "+233 24 000 0000",
  interest: INTERESTS[1],
  message: "We'd like a spread in the next edition.",
};

// --- happy path -------------------------------------------------------------
{
  const r = parseSponsorship(valid);
  assert.ok(r.ok, "a complete enquiry should parse");
  assert.equal(r.enquiry.name, "Ama Mensah", "whitespace is trimmed");
  assert.equal(r.enquiry.interest, INTERESTS[1]);
}

// --- required fields --------------------------------------------------------
for (const field of ["name", "organisation", "email"]) {
  const r = parseSponsorship({ ...valid, [field]: "   " });
  assert.ok(!r.ok && r.errors[field], `${field} must be required`);
}

// Phone and message are optional — an enquiry with only the essentials is
// still a lead, and demanding more loses it.
{
  const r = parseSponsorship({ ...valid, phone: "", message: "" });
  assert.ok(r.ok, "phone and message must stay optional");
}

// --- email shape ------------------------------------------------------------
for (const bad of ["ama", "ama@", "@example.com", "ama@example", "a b@c.com"]) {
  const r = parseSponsorship({ ...valid, email: bad });
  assert.ok(!r.ok && r.errors.email, `"${bad}" should be rejected`);
}
assert.ok(parseSponsorship({ ...valid, email: "a.b+tag@sub.example.co.uk" }).ok);

// --- interest is a closed list, but never a reason to drop an enquiry --------
for (const odd of ["", "  ", "Something else", "<script>", undefined, 42]) {
  const r = parseSponsorship({ ...valid, interest: odd });
  assert.ok(r.ok, `interest ${JSON.stringify(odd)} should not fail the enquiry`);
  assert.ok(
    INTERESTS.includes(r.enquiry.interest),
    `interest must be coerced onto the list, got ${r.enquiry.interest}`,
  );
}

// --- honeypot ---------------------------------------------------------------
assert.ok(isHoneypotTripped({ ...valid, website: "http://spam.example" }));
assert.ok(!isHoneypotTripped(valid));

// --- hostile input never reaches the email as markup ------------------------
{
  const nasty = {
    ...valid,
    name: '</td><script>alert("xss")</script>',
    organisation: 'Acme " onmouseover="evil()',
    message: "<img src=x onerror=alert(1)>",
  };
  const r = parseSponsorship(nasty);
  assert.ok(r.ok);

  const html = sponsorshipHtml(r.enquiry);
  assert.ok(!html.includes("<script>"), "script tags must be escaped");
  assert.ok(!html.includes("<img src=x"), "img tags must be escaped");
  assert.ok(html.includes("&lt;script&gt;"), "the text should survive, escaped");
  assert.ok(!/onmouseover="evil/.test(html), "attribute breakouts must be escaped");

  // The plain-text part carries it verbatim, which is correct — it is text.
  assert.ok(sponsorshipText(r.enquiry).includes("<img src=x onerror=alert(1)>"));
}

// --- the subject tells the desk what it is ----------------------------------
{
  const { enquiry } = parseSponsorship(valid);
  const subject = sponsorshipSubject(enquiry);
  assert.match(subject, /Sponsorship enquiry/);
  assert.ok(subject.includes("Brassica Pay"), "the organisation belongs in the subject");
  assert.ok(subject.includes(INTERESTS[1]), "so does what they asked about");
}

console.log("sponsorship: all assertions passed");
