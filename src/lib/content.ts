/**
 * Page content — the stories, team, sponsors and partners, plus which of the
 * Spotlight voices the landing page carries.
 *
 * Every name, role, bio and logo is taken from the live Top Fintech Voices
 * site (topfintechvoices.com). Nothing here is invented: these are real
 * people, so nothing is attributed to them that they did not say.
 */

import { voices, voicesBySlug, type Voice } from "@/lib/voices";

export type { Voice };

/**
 * The subset of the Spotlight carried on the landing page. The full roster —
 * names, roles, portraits and profile copy — lives in `voices.ts`, which is
 * generated from the live site by `scripts/fetch-voices.py`.
 */
const FEATURED_SLUGS = [
  "archie-hesse",
  "kwame-oppong",
  "nancy-imadi",
  "romeo-bugyei",
  "mary-boateng-coleman",
  "martin-awagah",
  "jones-amegbor",
  "abdul-jaleel-hussein",
  "alex-bram",
  "thomas-baafi",
  "razak-awudulai",
  "darryl-abraham",
] as const;

export const featuredVoices: Voice[] = FEATURED_SLUGS.map((slug) => {
  const voice = voicesBySlug.get(slug);
  if (!voice) throw new Error(`Unknown voice slug in FEATURED_SLUGS: ${slug}`);
  return voice;
});

/** The whole roster scrolls past in the hero ticker. */
export const tickerVoices: Voice[] = voices;

export type Story = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

export const stories: Story[] = [
  {
    title: "Jones Amegbor, CEO – PayAngel",
    excerpt:
      "The visionary founder of PayAngel on remittances, regulation, and what it takes to move money home without friction.",
    category: "Spotlight",
    date: "June 2024",
    image: "/stories/payangel.jpg",
    href: "https://topfintechvoices.com/category/news-hub/",
  },
  {
    title: "Abdul-Jaleel Hussein, CEO – Affinity Ghana",
    excerpt:
      "Building a bank for the customers the incumbents skipped — affordable services for the underserved and unbanked.",
    category: "Spotlight",
    date: "June 2024",
    image: "/stories/affinity-ghana.jpg",
    href: "https://topfintechvoices.com/category/news-hub/",
  },
  {
    title: "Nancy Arhinfuwaa Imadi, Bank of Ghana",
    excerpt:
      "The lawyer who heads Licensing and Product Approvals at the Bank of Ghana's FinTech and Innovation Office.",
    category: "Policy",
    date: "June 2024",
    image: "/stories/bog-licensing.jpg",
    href: "https://topfintechvoices.com/category/news-hub/",
  },
];

export const team = [
  {
    name: "Solomon Sedinam Agbemenya",
    role: "Publisher & Editor-in-Chief",
    image: "/team/solomon-agbemenya.jpg",
    bio: "A strategy and business consulting professional with leadership roles at S&D Chartered Accountants, Fido, MEST and First Atlantic Bank.",
  },
  {
    name: "Charles Anyiri",
    role: "Project Lead",
    image: "/team/charles-anyiri.png",
    bio: "Digital Marketing & Content Consultant for the Ghana FinTech Awards, with over a decade in professional design and marketing.",
  },
  {
    name: "Prince Tettevi",
    role: "Editor",
    image: "/team/prince-tettevi.jpg",
    bio: "Editor and data analyst who has driven growth for organisations including the Ghana Fintech and Payments Association.",
  },
  {
    name: "Morenike Ayodele",
    role: "PR & Marketing Consultant",
    image: "/team/morenike-ayodele.jpg",
    bio: "Marketing and communications professional with 8+ years of experience in strategic storytelling and brand growth.",
  },
];

export const sponsors = [
  { name: "GCB Bank", image: "/sponsors/gcb-bank.png" },
  { name: "Virtual Infosec Africa", image: "/sponsors/virtual-infosec-africa.png" },
  { name: "Eazytagg Technologies", image: "/sponsors/eazytagg.png" },
  { name: "Taptap Send", image: "/sponsors/taptap-send.png" },
  { name: "Ascend Digital Solutions", image: "/sponsors/ascend.png" },
  { name: "Smart Infraco", image: "/sponsors/smart-infraco.png" },
  { name: "SSNIT Guest House", image: "/sponsors/ssnit-guest-house.png" },
];

export const partners = [
  {
    name: "S&D Chartered Accountants",
    label: "Knowledge Partner",
    image: "/partners/snd-chartered-accountants.png",
  },
  {
    name: "Evangel Publications",
    label: "Publishing Partner",
    image: "/partners/evangel-publications.png",
  },
  {
    name: "Arkel Limited",
    label: "Powered by",
    image: "/partners/arkel-limited.png",
  },
];

export const stats = [
  { value: "28", label: "voices in the spotlight" },
  { value: "2024", label: "maiden edition, Accra" },
  { value: "07", label: "sponsors backing issue 01" },
  { value: "02", label: "new editions in the works" },
];
