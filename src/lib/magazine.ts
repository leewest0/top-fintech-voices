/**
 * The current edition. Every fact here is read off the edition itself — the
 * masthead, the cover and the contents pages of the Volume 2 PDF the client
 * distributes — rather than from the older copy still on the WordPress site,
 * which describes the maiden edition.
 */

export const currentEdition = {
  volume: "Vol. 2",
  label: "Second Edition",
  date: "November 2025",
  pages: 78,
  cover: "/magazine/cover-vol2.jpg",
  coverStory: {
    name: "Adoma Owusu",
    line: "Leading with vision, innovation & impact",
  },
  /**
   * The on-site reader. Pages are pre-rasterised from the PDF by
   * scripts/render-magazine.py — the source file is ~84MB, so it is never sent
   * to a browser. `aspect` is height/width of a page, printed by that script.
   */
  reader: {
    slug: "vol2",
    aspect: 1.4143,
  },
  /** Pulled from the cover itself. */
  coverLines: [
    "The Fintech-Fueled Digital Economy: Ghana's Road to a Cashlite Society",
    "Cybersecurity & Trust: Securing Ghana's Digital Gold",
    "Breaking the Binary: Women Leading Ghana's Fintech Future",
  ],
} as const;

export const firstEdition = {
  volume: "Vol. 1",
  label: "Maiden Edition",
  date: "March 2024",
  pages: 48,
  cover: "/magazine/cover-issue-01.jpg",
  coverStory: { name: "Archie Hesse", line: "Chief Executive, GhIPSS" },
  /**
   * Readable here too. The source PDF was the one the old WordPress site fed to
   * its flipbook plugin, pulled off that server before it is switched off, and
   * rasterised by the same script as Vol 2. A4 like Vol 2, so the same aspect.
   */
  reader: {
    slug: "vol1",
    aspect: 1.4143,
  },
} as const;

/**
 * The back catalogue, newest first — what /magazine lists and what
 * /read/[edition] will serve. The current edition is deliberately not in here:
 * it has its own page at /read, and listing it twice would give the same
 * edition two URLs to be found at.
 */
export const pastEditions = [firstEdition] as const;

export type Edition = (typeof pastEditions)[number] | typeof currentEdition;

/** Where an edition is read. The current one owns the bare /read. */
export function readerHref(edition: Edition): string {
  return edition.reader.slug === currentEdition.reader.slug
    ? "/read"
    : `/read/${edition.reader.slug}`;
}

export type Feature = {
  title: string;
  standfirst?: string;
  section: string;
  page: number;
};

/** The contents of Volume 2, in the order they run. */
export const features: Feature[] = [
  {
    title: "The Editorial Note",
    standfirst:
      "Solomon Sedinam Agbemenya on why Africa's fintech revolution is a collective journey rather than a solo pursuit.",
    section: "Editorial",
    page: 6,
  },
  {
    title: "Adoma Owusu",
    standfirst: "Leading with vision, innovation and impact — the cover story.",
    section: "Cover Story",
    page: 8,
  },
  {
    title: "Building Bridges, Not Silos: Why Fintech Collaboration Matters",
    standfirst: "Fintech is not a solo sport.",
    section: "Collaboration",
    page: 16,
  },
  {
    title: "Collaboration & Ecosystem Building",
    standfirst: "The power of partnerships in Ghana's fintech growth.",
    section: "Ecosystem",
    page: 24,
  },
  {
    title: "Breaking the Binary: Women Leading Ghana's Fintech Future",
    standfirst: "The future of fintech is not just about technology, it's about readiness.",
    section: "Leadership",
    page: 30,
  },
  {
    title: "Ghana's Most Influential Woman Driving Africa's Tech Ecosystem",
    standfirst: "Ethel Cofie, a formidable force within Africa's technology landscape.",
    section: "Profile",
    page: 36,
  },
  {
    title: "Championing Digital Finance for Francophone Africa's Future",
    standfirst:
      "Mariéme Ndiaye, one of francophone Africa's most dynamic forces in digital finance.",
    section: "Profile",
    page: 42,
  },
  {
    title: "Cross-Border Innovation & Remittances",
    section: "Payments",
    page: 48,
  },
  {
    title: "Ghana Fintech Awards 2024",
    section: "Report",
    page: 51,
  },
  {
    title: "Cybersecurity & Trust: Securing Ghana's Digital Gold",
    section: "Security",
    page: 58,
  },
  {
    title: "Ghana Fintech Meets Côte d'Ivoire",
    standfirst:
      "When a delegation from Ghana's fintech ecosystem landed in Abidjan — inside the corridor.",
    section: "Cross-border",
    page: 60,
  },
  {
    title: "Navigating Regulation in a Digital Era",
    standfirst: "Ghana's fintech regulatory framework, and the balance it has to strike.",
    section: "Policy",
    page: 64,
  },
  {
    title: "The New Face of Financial Inclusion",
    section: "Inclusion",
    page: 68,
  },
  {
    title: "Where's the Money? Funding Trends in Ghana's Fintech Scene",
    section: "Capital",
    page: 70,
  },
  {
    title: "Africa at the Digital Crossroads",
    standfirst: "How Ghana is leading a continental shift in digital finance.",
    section: "Analysis",
    page: 72,
  },
];

/** The Volume 2 masthead, exactly as it is credited in the edition. */
export const masthead = [
  { role: "Executive Publisher", names: ["Martin Kwame Awagah"] },
  { role: "Editor-in-Chief", names: ["Solomon Sedinam Agbemenya"] },
  { role: "Editorial & Administrative Coordinator", names: ["Charles Anyiri"] },
  { role: "Editors", names: ["Amanda Nyante", "Prince Tettevi"] },
  { role: "Information Technology", names: ["Charles Anyiri"] },
  { role: "Creative Designer", names: ["Bismark Kwabena Baiden"] },
  { role: "Growth and Strategy", names: ["Lynette Maja"] },
  { role: "Photography", names: ["Salome Asare"] },
  { role: "Social Media Manager", names: ["Prince Tettevi", "Morenike Ayodele"] },
];

/** Where the reader finds a given page image. */
export function pageImage(
  slug: string,
  page: number,
  size: "page" | "thumb" = "page",
): string {
  const file = `page-${String(page).padStart(2, "0")}.webp`;
  const folder = `/magazine/${slug}`;
  return size === "thumb" ? `${folder}/thumb/${file}` : `${folder}/${file}`;
}
