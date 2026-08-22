import assert from "node:assert/strict";
import {
  MAX_COPIES,
  isHoneypotTripped,
  orderHtml,
  orderSubject,
  orderText,
  parseOrder,
} from "../src/lib/order.ts";

const valid = {
  name: "  Ama Mensah ",
  company: "Brassica Pay",
  copies: "25",
  country: "Ghana",
  email: "ama@example.com",
  phone: "+233 24 000 0000",
  message: "Deliver to the Accra office.",
};

// --- happy path -------------------------------------------------------------
{
  const r = parseOrder(valid);
  assert.ok(r.ok, "a complete order should parse");
  assert.equal(r.order.name, "Ama Mensah", "whitespace is trimmed");
  assert.equal(r.order.copies, 25, "copies arrives as a number");
}

// --- required fields --------------------------------------------------------
for (const field of ["name", "email", "country"]) {
  const r = parseOrder({ ...valid, [field]: "   " });
  assert.ok(!r.ok && r.errors[field], `${field} must be required`);
}

// --- email shape ------------------------------------------------------------
for (const bad of ["ama", "ama@", "@example.com", "ama@example", "a b@c.com"]) {
  const r = parseOrder({ ...valid, email: bad });
  assert.ok(!r.ok && r.errors.email, `"${bad}" should be rejected`);
}
assert.ok(parseOrder({ ...valid, email: "a.b+tag@sub.example.co.uk" }).ok);

// --- copies -----------------------------------------------------------------
for (const bad of ["0", "-3", "2.5", "", "many", String(MAX_COPIES + 1)]) {
  const r = parseOrder({ ...valid, copies: bad });
  assert.ok(!r.ok && r.errors.copies, `copies "${bad}" should be rejected`);
}
assert.ok(parseOrder({ ...valid, copies: 1 }).ok);
assert.ok(parseOrder({ ...valid, copies: MAX_COPIES }).ok);

// --- optional fields --------------------------------------------------------
{
  const r = parseOrder({ ...valid, company: "", phone: "", message: "" });
  assert.ok(r.ok, "company, phone and message are optional");
}

// --- honeypot ---------------------------------------------------------------
assert.equal(isHoneypotTripped({}), false);
assert.equal(isHoneypotTripped({ website: "  " }), false);
assert.equal(isHoneypotTripped({ website: "http://spam.example" }), true);

// --- rendering --------------------------------------------------------------
{
  const { order } = parseOrder(valid);
  const edition = "Vol. 2 — Second Edition, November 2025";

  assert.equal(orderSubject(order, edition), `Magazine order — Ama Mensah, 25 copies (${edition})`);
  assert.match(orderSubject(parseOrder({ ...valid, copies: 1 }).order, edition), /1 copy \(/);

  const text = orderText(order, edition);
  for (const needle of ["Ama Mensah", "Brassica Pay", "25", "Ghana", "ama@example.com"]) {
    assert.ok(text.includes(needle), `plain text should include ${needle}`);
  }

  // The email is HTML we assemble, so anything a stranger typed must be escaped.
  const hostile = parseOrder({
    ...valid,
    name: '<script>alert(1)</script>',
    message: 'a & b < c "quoted"',
  }).order;
  const html = orderHtml(hostile, edition);
  assert.ok(!html.includes("<script>"), "script tags must not survive into the email");
  assert.ok(html.includes("&lt;script&gt;"), "they should be escaped instead");
  assert.ok(html.includes("a &amp; b &lt; c &quot;quoted&quot;"), "message is escaped");
}

console.log("order: all assertions passed");
