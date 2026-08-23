/**
 * Where this site lives — one fact, stated once.
 *
 * Canonicals, OG images and JSON-LD have to be absolute, so this cannot be a
 * relative path, and a hard-coded host goes stale the moment the domain moves.
 * So it resolves at build time, most specific first:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set it in Vercel and nothing else needs changing.
 *   2. Vercel's own values. In production that is the project's production
 *      domain, which upgrades itself to the custom domain as soon as one is
 *      attached; on a preview build it is that deployment's own URL, so a
 *      preview never claims production's canonical.
 *   3. localhost, for `next dev`.
 *
 * No deployment host is written down anywhere in this repo, deliberately: every
 * copy of a domain is a copy that goes stale on its own. Vercel always supplies
 * its own values, so step 3 is only ever reached locally; host it elsewhere and
 * NEXT_PUBLIC_SITE_URL is the one variable to set.
 *
 * The NEXT_PUBLIC_ variants are deliberate too: this module is imported by
 * client components, and Next only inlines prefixed variables into the browser
 * bundle. A bare VERCEL_URL would be `undefined` on the client.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const host =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
      ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      : process.env.NEXT_PUBLIC_VERCEL_URL;
  if (host) return `https://${host}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "Top Fintech Voices",
  tagline: "Innovators, Trailblazers & Visionaries",
  description:
    "The magazine celebrating fintech excellence — spotlighting the founders, regulators and operators shaping the future of finance in Ghana and across Africa.",
  url: siteUrl,
  /**
   * From the Contributors page of Vol 2, which prints it as the editorial
   * address. It replaces info@topfintechvoices.org, which cannot receive mail:
   * that domain returns NXDOMAIN — it is not registered — so every contact
   * click and every order notification was bouncing. topfintechvoices.com has
   * working MX records, and this is the address the edition itself gives.
   */
  email: "editorial@topfintechvoices.com",
  /**
   * Both desk numbers, as the edition prints them. This replaces the single
   * +(233) 24 133 9037 carried over from the WordPress site.
   */
  phones: [
    { display: "+233 24 325 1339", href: "+233243251339" },
    { display: "+233 54 122 1223", href: "+233541221223" },
  ],
  location: "Accra, Ghana",
  /** Print orders are taken by the form at /order, which emails via Resend. */
  orderUrl: "/order",
  /** The edition, readable in the browser. A route in this app, so it is
      written as one — it resolves to whatever host is serving the page, which
      is what an absolute URL was only ever approximating. */
  readUrl: "/read",
  /** The same edition as a PDF, hosted on the client's Google Drive. */
  downloadUrl:
    "https://drive.google.com/file/d/1qr7znbRDYvdFrbSho0FttpAB4PU6yoXc/view?usp=drive_link",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/topfintechvoices/" },
    { label: "Facebook", href: "https://www.facebook.com/topfintechvoices" },
    { label: "X", href: "https://x.com/topfintechvoice" },
    { label: "YouTube", href: "https://www.youtube.com/@topfintechvoices" },
  ],
} as const;

/**
 * The contact block, rendered on both the landing page and /contact. It lived
 * as two identical literals until the desk gained a second phone number and
 * they had to be edited in lockstep — which is the point at which one of them
 * gets forgotten.
 *
 * A detail carries a list rather than a single value, since "Call now" is now
 * two numbers and any of these could gain a second entry later.
 */
export const contactDetails = [
  { label: "Email", items: [{ value: site.email, href: `mailto:${site.email}` }] },
  {
    label: "Call now",
    items: site.phones.map(({ display, href }) => ({ value: display, href: `tel:${href}` })),
  },
  { label: "Address", items: [{ value: site.location, href: undefined }] },
];

/**
 * Does this nav item describe the page at `pathname`?
 *
 * Prefix-matching, not equality, so a profile marks Spotlight current and a
 * back issue marks Read — someone three levels in should still see where they
 * are. The boundary check is the whole subtlety: a bare `startsWith` would let
 * "/read" claim "/reading-list", and nothing about that fails a build.
 */
export function isCurrentNav(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Every menu item is a real page. */
export const nav = [
  { label: "Voices", href: "/voices" },
  { label: "The Magazine", href: "/magazine" },
  // Was "Stories", which listed the same features /magazine already lists in
  // full. The reader is the thing worth a menu slot.
  { label: "Read", href: "/read" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Everything the footer links to: `nav` plus the pages that don't get a
 * header slot. The header wraps onto two lines at 1024px with seven items —
 * verified when Partners was added — so a page can go here and still be one
 * click from every page without fighting for space in the primary bar.
 */
export const footerNav = [...nav, { label: "Emerging Voices", href: "/emerging-voices" }] as const;
