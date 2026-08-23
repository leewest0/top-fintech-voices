import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail } from "@/components/ui/weave";
import { LinkedInGlyph } from "@/components/ui/linkedin-glyph";
import { Share } from "@/components/ui/share";
import { site } from "@/lib/site";
import { voices } from "@/lib/voices";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return voices.map(({ slug }) => ({ slug }));
}

/** Also gives us the neighbours, for the prev/next pager at the foot. */
function findVoice(slug: string) {
  const index = voices.findIndex((v) => v.slug === slug);
  if (index === -1) return null;
  return {
    voice: voices[index],
    previous: voices[index - 1] ?? voices[voices.length - 1],
    next: voices[index + 1] ?? voices[0],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const found = findVoice((await params).slug);
  if (!found) return {};

  const { voice } = found;
  const title = voice.org ? `${voice.name} — ${voice.org}` : voice.name;

  return {
    title,
    description: voice.summary,
    alternates: { canonical: `/spotlight/${voice.slug}` },
    openGraph: {
      type: "profile",
      title: `${title} | ${site.name}`,
      description: voice.summary,
      url: `${site.url}/spotlight/${voice.slug}`,
      images: [{ url: voice.image, alt: voice.name }],
    },
    twitter: { card: "summary_large_image", title, description: voice.summary },
  };
}

export default async function VoicePage({ params }: { params: Promise<Params> }) {
  const found = findVoice((await params).slug);
  if (!found) notFound();

  const { voice, previous, next } = found;

  // Absolute, because a share target has to name a host.
  const profileUrl = `${site.url}/spotlight/${voice.slug}`;
  const shareTitle = voice.org ? `${voice.name}, ${voice.org}` : voice.name;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${site.url}/spotlight/${voice.slug}`,
    isPartOf: { "@type": "Periodical", name: site.name, url: site.url },
    mainEntity: {
      "@type": "Person",
      name: voice.name,
      jobTitle: voice.role,
      description: voice.summary,
      image: `${site.url}${voice.image}`,
      // Not voice.article: that URL redirects here, and sameAs is for other
      // authoritative pages about the person, not for a route back to this one.
      sameAs: [voice.linkedin].filter(Boolean),
      ...(voice.org && { worksFor: { "@type": "Organization", name: voice.org } }),
    },
  };

  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-[1240px] px-5 pt-10 md:px-10 md:pt-14">
        <Link
          href="/spotlight"
          className="navlink inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase"
        >
          <ArrowLeft size={14} aria-hidden="true" /> All voices
        </Link>

        <article className="mt-8 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="overflow-hidden rounded-2xl"
              style={{ border: "1px solid var(--line)" }}
            >
              <Image
                src={voice.image}
                alt={voice.name}
                width={900}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="aspect-4/5 h-auto w-full object-cover object-top"
              />
            </div>

            {/* No "Original" link any more. It pointed at this profile's post on
                the old WordPress site, which redirects here — so once the domain
                moves, it is a button that reloads the page you are already on.
                `voice.article` stays in the data as the record of where the copy
                came from, and as what the redirects are built from. */}
            {voice.linkedin && (
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={voice.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  {/* "LinkedIn profile", not "LinkedIn": the share row below
                      has a LinkedIn button too, and side by side the two read
                      as the same button twice. */}
                  <LinkedInGlyph /> LinkedIn profile
                </a>
              </div>
            )}

            {/* The person profiled here is the likeliest sharer, so this sits
                with their portrait rather than at the foot of the article. */}
            <div className="mt-7">
              <Share url={profileUrl} title={shareTitle} />
            </div>
          </div>

          <div>
            <p
              className="mb-5 font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              The Spotlight
            </p>
            <h1 className="font-display text-[2.1rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.8rem]">
              {voice.name}
            </h1>
            <p className="mt-4 text-lg leading-snug" style={{ color: "var(--muted)" }}>
              {voice.role}
              {voice.org && (
                <>
                  {" — "}
                  <span style={{ color: "var(--accent)" }}>{voice.org}</span>
                </>
              )}
            </p>

            <div className="mt-8 flex gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  style={{ width: 4, height: 22, background: "var(--w1)", opacity: 1 - i * 0.17 }}
                />
              ))}
            </div>

            <div className="mt-8 space-y-5 text-base leading-relaxed sm:text-[1.05rem]">
              {voice.bio.map((paragraph, i) => (
                <p key={i} style={i ? { color: "var(--muted)" } : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>

        <nav
          aria-label="More voices"
          className="mt-16 grid gap-4 pt-8 sm:grid-cols-2"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          {[
            { voice: previous, label: "Previous", icon: <ArrowLeft size={14} />, align: "" },
            { voice: next, label: "Next", icon: <ArrowRight size={14} />, align: "sm:text-right" },
          ].map(({ voice: neighbour, label, icon, align }) => (
            <Link
              key={label}
              href={`/spotlight/${neighbour.slug}`}
              className="card rounded-2xl p-5"
            >
              <span
                className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase ${
                  align ? "sm:justify-end" : ""
                }`}
                style={{ color: "var(--muted)" }}
              >
                {label === "Previous" && icon}
                {label}
                {label === "Next" && icon}
              </span>
              <span
                className={`font-display mt-2 block text-lg font-semibold tracking-[-0.02em] ${align}`}
              >
                {neighbour.name}
              </span>
            </Link>
          ))}
        </nav>

        <section className="panel mt-16 mb-20 rounded-3xl p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            {voice.name.split(" ")[0]}&rsquo;s profile runs in full in the magazine.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={site.orderUrl}
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Order the magazine <ArrowRight size={16} />
            </Link>
            <Link
              href={site.readUrl}
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              <BookOpen size={16} /> Read it online
            </Link>
          </div>
        </section>
      </main>

      <LoomRail />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
