/**
 * Validation and message rendering for Emerging Voices nominations.
 *
 * Same shape as orders and sponsorship enquiries — parse on the server
 * regardless of what the form did, render both a text and an HTML body — with
 * its own fields, so it gets its own module rather than a branch inside one of
 * theirs. The shared parts live in `form.ts`.
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

export type Nomination = {
  nomineeName: string;
  nomineeRole: string;
  nomineeOrg: string;
  nomineeLink: string;
  reason: string;
  yourName: string;
  yourEmail: string;
};

export type ParseResult =
  | { ok: true; nomination: Nomination }
  | { ok: false; errors: Partial<Record<keyof Nomination, string>> };

export function parseNomination(input: Record<string, unknown>): ParseResult {
  const nomination: Nomination = {
    nomineeName: str(input.nomineeName).slice(0, MAX_TEXT),
    nomineeRole: str(input.nomineeRole).slice(0, MAX_TEXT),
    nomineeOrg: str(input.nomineeOrg).slice(0, MAX_TEXT),
    nomineeLink: str(input.nomineeLink).slice(0, MAX_TEXT),
    reason: str(input.reason).slice(0, MAX_MESSAGE),
    yourName: str(input.yourName).slice(0, MAX_TEXT),
    yourEmail: str(input.yourEmail).slice(0, MAX_TEXT),
  };

  const errors: Partial<Record<keyof Nomination, string>> = {};

  if (!nomination.nomineeName) errors.nomineeName = "Who are you nominating?";
  if (!nomination.nomineeRole) {
    errors.nomineeRole = "What do they do?";
  }
  if (!nomination.reason) {
    errors.reason = "Tell us why they deserve to be featured.";
  }
  if (!nomination.yourName) errors.yourName = "Please give us your name too.";
  if (!nomination.yourEmail) {
    errors.yourEmail = "We need your email in case we have questions.";
  } else if (!EMAIL.test(nomination.yourEmail)) {
    errors.yourEmail = "That email address doesn't look right.";
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, nomination };
}

export function nominationSubject(nomination: Nomination): string {
  return `Emerging Voices nomination — ${nomination.nomineeName}`;
}

export function nominationText(nomination: Nomination): string {
  return [
    "New Emerging Voices nomination",
    "",
    `Nominee:      ${nomination.nomineeName}`,
    `Role:         ${nomination.nomineeRole}`,
    `Organisation: ${nomination.nomineeOrg || "—"}`,
    `Link:         ${nomination.nomineeLink || "—"}`,
    "",
    "Why they deserve to be featured:",
    nomination.reason,
    "",
    `Nominated by: ${nomination.yourName} <${nomination.yourEmail}>`,
  ].join("\n");
}

export function nominationHtml(nomination: Nomination): string {
  return [
    `<div style="font:14px system-ui;color:#0f456a">`,
    `<h2 style="font-size:18px;margin:0 0 4px">New Emerging Voices nomination</h2>`,
    `<p style="margin:0 0 20px;color:#55697a">Nominated by ${escapeHtml(nomination.yourName)}</p>`,
    `<table style="border-collapse:collapse">`,
    emailRow("Nominee", nomination.nomineeName),
    emailRow("Role", nomination.nomineeRole),
    emailRow("Organisation", nomination.nomineeOrg || "—"),
    emailRow("Link", nomination.nomineeLink || "—"),
    emailRow("Nominated by", `${nomination.yourName} <${nomination.yourEmail}>`),
    `</table>`,
    `<p style="margin:20px 0 6px;color:#55697a;font-weight:600">Why they deserve to be featured</p>`,
    `<p style="margin:0;white-space:pre-wrap">${escapeHtml(nomination.reason)}</p>`,
    `</div>`,
  ].join("");
}
