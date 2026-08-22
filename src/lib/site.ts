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
  orderUrl: "https://topfintechvoices.com/order-magazine/",
  articlesUrl: "https://topfintechvoices.com/category/news-hub/",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/topfintechvoices/" },
    { label: "Facebook", href: "https://www.facebook.com/topfintechvoices" },
    { label: "X", href: "https://x.com/topfintechvoice" },
    { label: "YouTube", href: "https://www.youtube.com/@topfintechvoices" },
  ],
} as const;

/**
 * Section links are written root-relative (`/#magazine`) rather than as bare
 * fragments so the same nav works from every route, not just the landing page.
 */
export const nav = [
  { label: "Spotlight", href: "/spotlight" },
  { label: "The Magazine", href: "/#magazine" },
  { label: "Stories", href: "/#stories" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "Contact", href: "/#contact" },
] as const;
