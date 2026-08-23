/**
 * Page content — the stories, team, sponsors and partners, plus which of the
 * Spotlight voices the landing page carries.
 *
 * Every name, role, bio and logo is taken from the live Top Fintech Voices
 * site (topfintechvoices.com). Nothing here is invented: these are real
 * people, so nothing is attributed to them that they did not say.
 */

import { voices, voicesBySlug, type Voice } from "@/lib/voices";
import { currentEdition } from "@/lib/magazine";

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

/**
 * The News Hub carries the same 28 pieces as the Spotlight — every post on the
 * site sits in both categories — so the landing page's story cards are three of
 * those profiles, shown with the wider event photography rather than the
 * portrait, and linking to the profile page rather than back to WordPress.
 */
export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  href: string;
};

const FEATURED_STORIES = [
  { slug: "jones-amegbor", category: "Spotlight", image: "/stories/payangel.jpg" },
  { slug: "abdul-jaleel-hussein", category: "Spotlight", image: "/stories/affinity-ghana.jpg" },
  { slug: "nancy-imadi", category: "Policy", image: "/stories/bog-licensing.jpg" },
] as const;

export const stories: Story[] = FEATURED_STORIES.map(({ slug, category, image }) => {
  const voice = voicesBySlug.get(slug);
  if (!voice) throw new Error(`Unknown voice slug in FEATURED_STORIES: ${slug}`);
  return {
    slug,
    title: voice.org ? `${voice.name}, ${voice.org}` : voice.name,
    excerpt: voice.summary,
    category,
    date: "June 2024",
    image,
    href: `/spotlight/${slug}`,
  };
});

/**
 * Roles here follow the Volume 2 masthead, which is the current credit — the
 * WordPress About page still lists the maiden edition's titles, and disagreed
 * with the edition on two of them. Bios are the About page's own copy.
 */
/**
 * The people who make the magazine.
 *
 * This used to hold only the five the WordPress About page had portraits and
 * bios for, which quietly dropped four of the nine contributors credited in
 * Vol 2 — they appeared in the credits list further down /team and nowhere
 * else. Everyone credited is now here, portrait or not: `image` and `bio` are
 * optional, and a member without a portrait gets an initials monogram rather
 * than being left out. Nobody's face is guessed at, and no bio is invented.
 */
export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

export const team: TeamMember[] = [
  {
    name: "Martin Kwame Awagah",
    role: "Executive Publisher",
    image: "/voices/martin-awagah.jpg",
    bio: "President of the Ghana Fintech and Payments Association, and a Digital Economy Specialist working across economic research, governance and financial inclusion.",
  },
  {
    name: "Solomon Sedinam Agbemenya",
    role: "Editor-in-Chief",
    image: "/team/solomon-agbemenya.jpg",
    bio: "A strategy and business consulting professional with leadership roles at Pod Solutions, El-Evangel Publications, S&D Chartered Accountants, Fido, MEST and First Atlantic Bank.",
  },
  {
    name: "Charles Anyiri",
    role: "Editorial & Administrative Coordinator",
    image: "/team/charles-anyiri.png",
    bio: "Digital Marketing & Content Consultant for the Ghana FinTech Awards, with over a decade in professional design and marketing.",
  },
  {
    name: "Amanda Nyante",
    role: "Editor",
    bio: "A law student and SRC Vice President at the Ghana School of Law, UPSA campus, working where law meets technology and digital policy.",
  },
  {
    name: "Prince Tettevi",
    role: "Editor",
    image: "/team/prince-tettevi.jpg",
    bio: "Editor and data analyst who has driven growth for organisations including the Ghana Fintech and Payments Association.",
  },
  {
    name: "Bismark Kwabena Baiden",
    role: "Creative Designer",
  },
  {
    name: "Lynette Maja",
    role: "Growth and Strategy",
    bio: "A conversational strategist and moderator known as “The Conversator”, working across fintech, digital marketing, storytelling and strategy to connect generations.",
  },
  {
    name: "Salome Asare",
    role: "Photography",
    image: "/team/salome-asare.jpg",
  },
  {
    name: "Morenike Ayodele",
    role: "Social Media Manager",
    image: "/team/morenike-ayodele.jpg",
    bio: "Marketing and communications professional with 8+ years of experience in strategic storytelling and brand growth.",
  },
  {
    name: "Leslie Botchway",
    role: "Software Engineer",
    image: "/team/leslie-botchway.jpg",
    bio: "A software engineer and cloud solutions architect with leadership roles at The Methodist Church, Mas Africa UK, and First Atlantic Bank.",
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
    name: "El-Evangel Publications",
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
  { value: `${voices.length}`, label: "voices in the spotlight" },
  { value: `${currentEdition.pages}`, label: `pages, ${currentEdition.label.toLowerCase()}` },
  { value: `${sponsors.length}`, label: "sponsors and partners" },
  { value: "02", label: "new editions in the works" },
];
