/**
 * Builds the `mailto:` the contact form hands to the visitor's mail client.
 *
 * Kept out of the component so it can be checked on its own — a browser will
 * not let a test observe a `mailto:` navigation, and encoding mistakes here
 * are silent: the mail app just opens with a mangled subject or body.
 */
export function buildMailto({
  to,
  topic,
  name,
  email,
  message,
}: {
  to: string;
  topic: string;
  name: string;
  email: string;
  message: string;
}): string {
  const subject = `${topic} — ${name.trim() || "Website enquiry"}`;
  const body = [message.trim(), "", "—", name.trim(), email.trim()]
    .filter((line, i) => line !== "" || i === 1)
    .join("\n");

  const params = new URLSearchParams({ subject, body });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}
