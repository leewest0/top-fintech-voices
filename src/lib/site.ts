/**
 * Where the site is actually served from today. Kept apart from `url` — which is
 * the eventual custom domain and is what canonical metadata points at — because
 * the reader is linked absolutely, and an absolute link has to name the host
 * that is really answering. Change this one line when the custom domain is live.
 */
const DEPLOYED_URL = "https://top-fintech-voices.vercel.app";

export const site = {
  name: "Top Fintech Voices",
  tagline: "Innovators, Trailblazers & Visionaries",
  description:
    "The magazine celebrating fintech excellence — spotlighting the founders, regulators and operators shaping the future of finance in Ghana and across Africa.",
  url: "https://topfintechvoices.com",
  email: "info@topfintechvoices.org",
  phone: "+(233) 24 133 9037",
  phoneHref: "+233241339037",
  location: "Accra, Ghana",
  /** Print orders are taken by the form at /order, which emails via Resend. */
  orderUrl: "/order",
  /** The edition, readable in the browser. Absolute, so it resolves from
      anywhere the button is reused. */
  readUrl: `${DEPLOYED_URL}/read`,
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

/** Every menu item is a real page. */
export const nav = [
  { label: "Spotlight", href: "/spotlight" },
  { label: "The Magazine", href: "/magazine" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
] as const;
