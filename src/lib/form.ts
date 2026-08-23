/**
 * The bits every enquiry form on the site shares.
 *
 * Orders and sponsorship enquiries validate different fields but agree on the
 * boring parts: trim strings, cap their length, recognise an email, escape user
 * text before it goes anywhere near HTML, and answer bots quietly. Those live
 * here so a second form cannot pick up a slightly different idea of any of them
 * — particularly the escaping, where "slightly different" means a hole.
 */

export const MAX_TEXT = 200;
export const MAX_MESSAGE = 4000;

export const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Deliberately loose: the point is to catch typos, not to adjudicate RFC 5322. */
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/** True when a bot filled the field that is hidden from people. */
export function isHoneypotTripped(input: Record<string, unknown>): boolean {
  return str(input.website) !== "";
}

/** One row of an enquiry email, escaped. */
export function emailRow(label: string, value: string): string {
  return (
    `<tr><td style="padding:6px 16px 6px 0;color:#55697a;font:600 13px system-ui">${label}</td>` +
    `<td style="padding:6px 0;font:14px system-ui">${escapeHtml(value)}</td></tr>`
  );
}
