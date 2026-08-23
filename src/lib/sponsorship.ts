/**
 * Validation and message rendering for sponsorship and advertising enquiries.
 *
 * Same shape as orders — parse on the server regardless of what the form did,
 * render both a text and an HTML body — but the fields differ, so it gets its
 * own module rather than an `if` inside the order one. The shared parts live in
 * `form.ts`.
 */

import {
  EMAIL,
  MAX_MESSAGE,
  MAX_TEXT,
  emailRow,
  escapeHtml,
  str,
} from "@/lib/form";

export { isHoneypotTripped } from "@/lib/form";

/**
 * What the enquiry is about. Kept as a closed list so the desk can sort its
 * inbox, with "Not sure yet" present on purpose — an enquiry that does not fit
 * the options is still an enquiry, and forcing a choice loses it.
 */
export const INTERESTS = [
  "Advertising in the next edition",
  "Sponsoring a section",
  "Partnership",
  "Not sure yet",
] as const;

export type Interest = (typeof INTERESTS)[number];

export type Sponsorship = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  interest: Interest;
  message: string;
};

export type ParseResult =
  | { ok: true; enquiry: Sponsorship }
  | { ok: false; errors: Partial<Record<keyof Sponsorship, string>> };

export function parseSponsorship(input: Record<string, unknown>): ParseResult {
  const raw = str(input.interest);
  const enquiry: Sponsorship = {
    name: str(input.name).slice(0, MAX_TEXT),
    organisation: str(input.organisation).slice(0, MAX_TEXT),
    email: str(input.email).slice(0, MAX_TEXT),
    phone: str(input.phone).slice(0, MAX_TEXT),
    // Anything off the list is treated as unstated rather than rejected: the
    // value comes from a <select>, so a mismatch means a bot or a stale page,
    // and neither is worth losing a real enquiry over.
    interest: (INTERESTS as readonly string[]).includes(raw)
      ? (raw as Interest)
      : "Not sure yet",
    message: str(input.message).slice(0, MAX_MESSAGE),
  };

  const errors: Partial<Record<keyof Sponsorship, string>> = {};

  if (!enquiry.name) errors.name = "Please tell us who you are.";
  if (!enquiry.organisation) errors.organisation = "Which organisation is this for?";
  if (!enquiry.email) errors.email = "We need an email address to reply to.";
  else if (!EMAIL.test(enquiry.email)) errors.email = "That email address doesn't look right.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, enquiry };
}

export function sponsorshipSubject(enquiry: Sponsorship): string {
  return `Sponsorship enquiry — ${enquiry.organisation} (${enquiry.interest})`;
}

export function sponsorshipText(enquiry: Sponsorship): string {
  return [
    "New sponsorship enquiry",
    "",
    `Name:         ${enquiry.name}`,
    `Organisation: ${enquiry.organisation}`,
    `Interest:     ${enquiry.interest}`,
    `Email:        ${enquiry.email}`,
    `Phone:        ${enquiry.phone || "—"}`,
    "",
    "Message:",
    enquiry.message || "—",
  ].join("\n");
}

export function sponsorshipHtml(enquiry: Sponsorship): string {
  return [
    `<div style="font:14px system-ui;color:#0f456a">`,
    `<h2 style="font-size:18px;margin:0 0 4px">New sponsorship enquiry</h2>`,
    `<p style="margin:0 0 20px;color:#55697a">${escapeHtml(enquiry.interest)}</p>`,
    `<table style="border-collapse:collapse">`,
    emailRow("Name", enquiry.name),
    emailRow("Organisation", enquiry.organisation),
    emailRow("Interest", enquiry.interest),
    emailRow("Email", enquiry.email),
    emailRow("Phone", enquiry.phone || "—"),
    `</table>`,
    enquiry.message
      ? `<p style="margin:20px 0 6px;color:#55697a;font-weight:600">Message</p>` +
        `<p style="margin:0;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>`
      : "",
    `</div>`,
  ].join("");
}
