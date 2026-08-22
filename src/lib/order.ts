/**
 * Validation and message rendering for magazine orders.
 *
 * Kept apart from both the form and the route handler so the rules are stated
 * once and can be tested without a browser or a Resend key. The route trusts
 * nothing from the client: whatever the form does, `parseOrder` runs again on
 * the server before anything is sent.
 */

export type OrderInput = Record<string, unknown>;

export type Order = {
  name: string;
  company: string;
  copies: number;
  country: string;
  email: string;
  phone: string;
  message: string;
};

export type ParseResult =
  | { ok: true; order: Order }
  | { ok: false; errors: Partial<Record<keyof Order, string>> };

/** Matches the fields the client's existing WordPress order form collects. */
export const MAX_COPIES = 5000;
const MAX_TEXT = 200;
const MAX_MESSAGE = 4000;

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Deliberately loose: the point is to catch typos, not to adjudicate RFC 5322.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseOrder(input: OrderInput): ParseResult {
  const order: Order = {
    name: str(input.name).slice(0, MAX_TEXT),
    company: str(input.company).slice(0, MAX_TEXT),
    country: str(input.country).slice(0, MAX_TEXT),
    email: str(input.email).slice(0, MAX_TEXT),
    phone: str(input.phone).slice(0, MAX_TEXT),
    message: str(input.message).slice(0, MAX_MESSAGE),
    copies: Number(input.copies),
  };

  const errors: Partial<Record<keyof Order, string>> = {};

  if (!order.name) errors.name = "Please give us a name for the order.";
  if (!order.email) errors.email = "We need an email address to confirm the order.";
  else if (!EMAIL.test(order.email)) errors.email = "That email address doesn't look right.";
  if (!order.country) errors.country = "Please tell us which country we're shipping to.";

  if (!Number.isFinite(order.copies) || !Number.isInteger(order.copies)) {
    errors.copies = "How many copies would you like?";
  } else if (order.copies < 1) {
    errors.copies = "Orders start at one copy.";
  } else if (order.copies > MAX_COPIES) {
    errors.copies = `For more than ${MAX_COPIES} copies, email us and we'll quote you directly.`;
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, order };
}

/** True when a bot filled the field that is hidden from people. */
export function isHoneypotTripped(input: OrderInput): boolean {
  return str(input.website) !== "";
}

export function orderSubject(order: Order, edition: string): string {
  const copies = `${order.copies} ${order.copies === 1 ? "copy" : "copies"}`;
  return `Magazine order — ${order.name}, ${copies} (${edition})`;
}

export function orderText(order: Order, edition: string): string {
  return [
    `New order for ${edition}`,
    "",
    `Name:     ${order.name}`,
    `Company:  ${order.company || "—"}`,
    `Copies:   ${order.copies}`,
    `Country:  ${order.country}`,
    `Email:    ${order.email}`,
    `Phone:    ${order.phone || "—"}`,
    "",
    "Message:",
    order.message || "—",
  ].join("\n");
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export function orderHtml(order: Order, edition: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#55697a;font:600 13px system-ui">${label}</td>` +
    `<td style="padding:6px 0;font:14px system-ui">${escapeHtml(value)}</td></tr>`;

  return [
    `<div style="font:14px system-ui;color:#0f456a">`,
    `<h2 style="font-size:18px;margin:0 0 4px">New magazine order</h2>`,
    `<p style="margin:0 0 20px;color:#55697a">${escapeHtml(edition)}</p>`,
    `<table style="border-collapse:collapse">`,
    row("Name", order.name),
    row("Company", order.company || "—"),
    row("Copies", String(order.copies)),
    row("Country", order.country),
    row("Email", order.email),
    row("Phone", order.phone || "—"),
    `</table>`,
    order.message
      ? `<p style="margin:20px 0 6px;color:#55697a;font-weight:600">Message</p>` +
        `<p style="margin:0;white-space:pre-wrap">${escapeHtml(order.message)}</p>`
      : "",
    `</div>`,
  ].join("");
}
