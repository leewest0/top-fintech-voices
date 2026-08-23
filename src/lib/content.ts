/**
 * Page content — the stories, team, sponsors and partners, plus which of the
 * Voices roster the landing page carries.
 *
 * Every name, role, bio and logo is taken from the live Top Fintech Voices
 * site (topfintechvoices.com). Nothing here is invented: these are real
 * people, so nothing is attributed to them that they did not say.
 */

import { voices, voicesBySlug, type Voice } from "@/lib/voices";
import { currentEdition } from "@/lib/magazine";

export type { Voice };

/**
 * The subset of Voices carried on the landing page. The full roster —
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
 * The News Hub carries the same 28 pieces as Voices — every post on the
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
  { slug: "jones-amegbor", category: "Voices", image: "/stories/payangel.jpg" },
  { slug: "abdul-jaleel-hussein", category: "Voices", image: "/stories/affinity-ghana.jpg" },
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
    href: `/voices/${slug}`,
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
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    name: "Martin Kwame Awagah",
    role: "Executive Publisher",
    image: "/voices/martin-awagah.jpg",
    bio: "President of the Ghana Fintech and Payments Association, and a Digital Economy Specialist working across economic research, governance and financial inclusion.",
    linkedin: "https://www.linkedin.com/in/fintechkwame",
  },
  {
    name: "Solomon Sedinam Agbemenya",
    role: "Editor-in-Chief",
    image: "/team/solomon-agbemenya.jpg",
    bio: "A strategy and business consulting professional with leadership roles at Pod Solutions, El-Evangel Publications, S&D Chartered Accountants, Fido and First Atlantic Bank.",
    linkedin: "https://www.linkedin.com/in/solomon-sedinam-agbemenya-87571665",
  },
  {
    name: "Charles Anyiri",
    role: "Administrative Coordinator",
    image: "/team/charles-anyiri.png",
    bio: "Digital Marketing & Content Consultant for the Ghana FinTech Awards, with over a decade in professional design and marketing.",
  },
  {
    name: "Amanda Nyante",
    role: "Editor",
    image: "/team/amanda-nyante.jpg",
    bio: "A law student and SRC Vice President at the Ghana School of Law, UPSA campus, working where law meets technology and digital policy.",
    linkedin: "https://www.linkedin.com/in/amanda-offeibea-nyante-b6362b285",
  },
  {
    name: "Prince Tettevi",
    role: "Editor",
    image: "/team/prince-tettevi.jpg",
    bio: "Editor and data analyst who has driven growth for organisations including the Ghana Fintech and Payments Association.",
    linkedin: "https://www.linkedin.com/in/princetettevi",
  },
  {
    name: "Bismark Kwabena Baiden",
    role: "Creative Designer",
    image: "/team/bismark-baiden.jpg",
    bio: "A senior graphic and web designer with over a decade in brand identity, magazine layouts and digital marketing, NIIT-certified with a practical edge in IT.",
    linkedin: "https://www.linkedin.com/in/bismark-kwabena-baiden-21b02826a",
  },
  {
    name: "Lynette Maja",
    role: "Growth and Strategy",
    bio: "A conversational strategist and moderator known as “The Conversator”, working across fintech, digital marketing, storytelling and strategy to connect generations.",
    linkedin: "https://www.linkedin.com/in/lynette-maja-3aa148162",
  },
  {
    name: "Salome Asare",
    role: "Photography",
    image: "/team/salome-asare.jpg",
    bio: "A creative entrepreneur and visual storyteller who helps brands capture the moments that matter, in work built to stay clean and timeless.",
    linkedin: "https://www.linkedin.com/in/salome-asare-147784211",
  },
  {
    name: "Morenike Ayodele",
    role: "Social Media Manager",
    image: "/team/morenike-ayodele.jpg",
    bio: "Marketing and communications professional with 8+ years of experience in strategic storytelling and brand growth.",
    linkedin: "https://www.linkedin.com/in/morenikeayodele",
  },
  {
    name: "Leslie Botchway",
    role: "Software Engineer",
    image: "/team/leslie-botchway.jpg",
    bio: "A software engineer and cloud solutions architect with leadership roles at The Methodist Church, Mas Africa UK, and First Atlantic Bank.",
    linkedin: "https://www.linkedin.com/in/leslie-botchway-25b58740",
  },
];

/**
 * How /team groups its cards — the client's structure, not the printed
 * masthead's. A person's `role` on their card is still their edition credit
 * (e.g. "Editor-in-Chief"); the department here is a second, independent
 * grouping layered on top, so the two are allowed to disagree — Charles
 * Anyiri's role is editorial, his department is Community & Events.
 */
const TEAM_DEPARTMENTS = [
  { name: "Executive Leadership", members: ["Martin Kwame Awagah", "Solomon Sedinam Agbemenya"] },
  { name: "Editorial", members: ["Prince Tettevi", "Amanda Nyante"] },
  { name: "Strategy & Growth", members: ["Lynette Maja"] },
  { name: "Partnerships", members: ["Morenike Ayodele"] },
  { name: "Community & Events", members: ["Charles Anyiri"] },
  { name: "Content & Digital", members: ["Bismark Kwabena Baiden", "Salome Asare", "Leslie Botchway"] },
] as const;

export const teamByDepartment: { name: string; members: TeamMember[] }[] = TEAM_DEPARTMENTS.map(
  ({ name, members }) => ({
    name,
    members: members.map((memberName) => {
      const member = team.find((m) => m.name === memberName);
      if (!member) throw new Error(`Unknown name in TEAM_DEPARTMENTS: ${memberName}`);
      return member;
    }),
  }),
);

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

/**
 * Purpose, Mission, Vision — stated once. This used to be a literal copied
 * into both /about and the landing page's teaser of it, and the two drifted:
 * the teaser kept an old Mission/Vision pair (and no Purpose at all) after
 * /about was rewritten. One export, used by both, so there is nothing left
 * to drift.
 */
export const pillars = [
  {
    label: "Purpose",
    copy: "We don't just report on Africa's fintech ecosystem, we bring together the people building it.",
    thread: "var(--w2)",
  },
  {
    label: "Mission",
    copy: "To amplify the people, ideas and conversations shaping Africa's fintech future and create meaningful connections across the ecosystem.",
    thread: "var(--w1)",
  },
  {
    label: "Vision",
    copy: "To become Africa's leading platform for fintech thought leadership, recognition and collaboration.",
    thread: "var(--w3)",
  },
] as const;

export const stats = [
  { value: `${voices.length}`, label: "voices featured" },
  { value: `${currentEdition.pages}`, label: `pages, ${currentEdition.label.toLowerCase()}` },
  { value: `${sponsors.length}`, label: "sponsors and partners" },
  { value: "02", label: "new editions in the works" },
];
