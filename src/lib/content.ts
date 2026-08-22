/**
 * Every name, role, bio and logo below is taken from the live Top Fintech
 * Voices site (topfintechvoices.com) — the Spotlight page, the News Hub and
 * the About page. Bios are the publication's own copy, trimmed to a
 * single sentence for the index. Nothing here is invented: these are real
 * people, so nothing is attributed to them that they did not say.
 */

export type Voice = {
  slug: string;
  name: string;
  role: string;
  org: string;
  image: string;
  bio: string;
};

/** The voices carried on the landing page index, in issue order. */
export const voices: Voice[] = [
  {
    slug: "archie-hesse",
    name: "Archie Hesse",
    role: "Chief Executive Officer",
    org: "GhIPSS",
    image: "/voices/archie-hesse.jpg",
    bio: "Chief Executive of Ghana Interbank Payment and Settlement Systems — the wholly owned subsidiary of the Central Bank that runs the country's shared payment rails.",
  },
  {
    slug: "kwame-oppong",
    name: "Kwame Oppong",
    role: "Director, Fintech and Innovation Office",
    org: "Bank of Ghana",
    image: "/voices/kwame-oppong.webp",
    bio: "Directs Fintech and Innovation at the Bank of Ghana, responsible for licensing and the supervision of mobile money and payment service providers.",
  },
  {
    slug: "nancy-imadi",
    name: "Nancy Arhinfuwaa Imadi",
    role: "Head of Licensing and Product Approvals",
    org: "Fintech and Innovation Office, Bank of Ghana",
    image: "/voices/nancy-imadi.jpg",
    bio: "A lawyer who heads the Licensing and Product Approvals Unit of the FinTech and Innovation Office at the Bank of Ghana.",
  },
  {
    slug: "romeo-bugyei",
    name: "Romeo Bugyei",
    role: "Managing Director",
    org: "IT Consortium",
    image: "/voices/romeo-bugyei.jpg",
    bio: "The visionary Managing Director of IT Consortium, one of the pioneering fintech companies in Ghana, with over two decades of executive experience.",
  },
  {
    slug: "mary-boateng-coleman",
    name: "Mary Boateng-Coleman",
    role: "Co-founder",
    org: "BrassicaPay",
    image: "/voices/mary-boateng-coleman.jpg",
    bio: "Co-founder of Brassica Pay and Brassica Capital, and a consummate entrepreneur who founded and currently presides over a network for women in finance.",
  },
  {
    slug: "martin-awagah",
    name: "Martin Kwame Awagah",
    role: "President",
    org: "Ghana Fintech and Payments Association",
    image: "/voices/martin-awagah.jpg",
    bio: "A Digital Economy Specialist and FinTech Expert with expertise in economic research, governance, public policy and financial inclusion.",
  },
  {
    slug: "jones-amegbor",
    name: "Jones Amegbor",
    role: "Founder & Chief Executive Officer",
    org: "PayAngel",
    image: "/voices/jones-amegbor.jpg",
    bio: "A Chartered Certified Accountant by training whose work at PayAngel sits at the convergence of financial acuity and technological innovation.",
  },
  {
    slug: "abdul-jaleel-hussein",
    name: "Abdul-Jaleel Hussein",
    role: "Chief Executive Officer",
    org: "Affinity Ghana",
    image: "/voices/abdul-jaleel-hussein.jpg",
    bio: "Leads Affinity Ghana, a trailblazing financial institution dedicated to providing affordable banking services to the underserved and the unbanked.",
  },
  {
    slug: "alex-bram",
    name: "Alex Bram",
    role: "Chief Executive Officer",
    org: "Hubtel",
    image: "/voices/alex-bram.jpg",
    bio: "Co-founded Hubtel on 12 May 2005 — the very last school day at Kwame Nkrumah University of Science and Technology in Kumasi.",
  },
  {
    slug: "thomas-baafi",
    name: "Thomas Akwasi Baafi",
    role: "Founder & Chief Executive Officer",
    org: "Bsystems",
    image: "/voices/thomas-baafi.jpg",
    bio: "Founder and Chief Executive of Bsystems Limited, where he has facilitated significant investment in Ghanaian software solutions.",
  },
  {
    slug: "razak-awudulai",
    name: "Razak Awudulai",
    role: "Founder & Chief Executive Officer",
    org: "Broadspectrum Limited",
    image: "/voices/razak-awudulai.jpg",
    bio: "A leading figure in Ghana's entrepreneurial and technology landscape, known for visionary leadership and impactful initiatives.",
  },
  {
    slug: "darryl-abraham",
    name: "Darryl K. Mawutor Abraham",
    role: "Director for Growth, Africa",
    org: "TapTap Send",
    image: "/voices/darryl-abraham.jpg",
    bio: "More than 21 years a fintech leader, having launched, built and scaled products across UK financial services and African markets.",
  },
];

/** Additional portraits used for the marquee strip; the full list lives on the site. */
export const moreVoices = [
  { name: "Ernest Apenteng", org: "Hubtel", image: "/voices/ernest-apenteng.jpg" },
  { name: "Jeremy Quainoo", org: "JUMO", image: "/voices/jeremy-quainoo.jpg" },
  { name: "Louis Amenyo", org: "Eganow", image: "/voices/louis-amenyo.jpg" },
  { name: "John Apea", org: "eTranzact Ghana", image: "/voices/john-apea.jpg" },
  { name: "Richard Nunekpeku", org: "Sustineri Attorneys", image: "/voices/richard-nunekpeku.jpg" },
  { name: "Nobert Dziwornu", org: "StartOA", image: "/voices/nobert-dziwornu.jpg" },
];

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
