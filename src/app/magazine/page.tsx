import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import {
  currentEdition,
  upcomingEdition,
  features,
  pastEditions,
  readerHref,
} from "@/lib/magazine";
import { partners, sponsors } from "@/lib/content";

const { volume, label, date, pages, cover, coverStory, coverLines } =
  currentEdition;

export const metadata: Metadata = {
  title: "The Magazine",
  description: `${volume}, the ${label.toLowerCase()} of ${site.name} — ${pages} pages, published ${date}, with ${coverStory.name} on the cover. Order your copy or read the digital edition free.`,
  alternates: { canonical: "/magazine" },
  openGraph: {
    title: `The Magazine — ${site.name}`,
    description: `${volume} · ${date} · ${pages} pages`,
    url: `${site.url}/magazine`,
    images: [{ url: cover, alt: `${site.name} ${volume} cover` }],
  },
};

export default function MagazinePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PublicationIssue",
    issueNumber: 2,
    name: `${site.name} — ${label}`,
    datePublished: "2025-11",
    numberOfPages: pages,
    image: `${site.url}${cover}`,
    url: `${site.url}/magazine`,
    isPartOf: { "@type": "Periodical", name: site.name, url: site.url },
  };

  return (
    <PageShell
      eyebrow="The Magazine"
      title="Stories worth slowing down for."
      intro={
        <>
          <p>
            Our flagship publication goes beyond headlines to explore the
            people, ideas and decisions shaping financial technology across
            Africa.
          </p>
          <p className="mt-4">
            Featuring in-depth interviews, research, perspectives and industry
            analysis across:
          </p>
          <p
            className="mt-5 font-mono text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Payments • Financial Inclusion • AI • Cybersecurity • Regulation •
            Investment • Digital Commerce • Cross-Border Payments • Innovation
          </p>
        </>
      }
    >
      {/* ---------- the next edition ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <p
              className="mb-6 font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Coming Soon
            </p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-5xl">
              {site.name} Volume 3
            </h2>
            <p
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--muted)" }}
            >
              {upcomingEdition.volume}, the {upcomingEdition.label}, arrives{" "}
              {upcomingEdition.date}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#available-now"
                className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
              >
                Available Soon
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <Image
              src={upcomingEdition.cover}
              alt={`${site.name} ${upcomingEdition.volume} — ${upcomingEdition.coverStory.name} on the cover`}
              width={1200}
              height={1682}
              priority
              sizes="(max-width: 1024px) 70vw, 400px"
              className="w-full max-w-[400px] rounded-xl shadow-2xl"
              style={{ border: "1px solid var(--line)" }}
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- available now ---------- */}
      <section
        id="available-now"
        className="py-14"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal>
              <p
                className="mb-6 font-mono text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                Available Now
              </p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-5xl">
                {site.name} Volume 2
              </h2>
              <p
                className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--muted)" }}
              >
                {pages} pages of conversations and perspectives exploring
                collaboration, cybersecurity, regulation, funding and the women
                reshaping the industry from Ghana to Côte d&rsquo;Ivoire and
                beyond.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={site.orderUrl}
                  className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
                >
                  Order Your Copy <ArrowRight size={16} />
                </Link>
                <Link
                  href={site.readUrl}
                  className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
                >
                  <BookOpen size={16} /> Read the Digital Edition
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120} className="flex justify-center lg:justify-end">
              <Image
                src={cover}
                alt={`${site.name} ${volume} — ${coverStory.name} on the cover`}
                width={1200}
                height={1691}
                sizes="(max-width: 1024px) 70vw, 400px"
                className="w-full max-w-[400px] rounded-xl shadow-2xl"
                style={{ border: "1px solid var(--line)" }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- what's on the cover ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <Reveal className="mb-8">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            On the cover
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {coverLines.map((line, i) => (
            <Reveal key={line} delay={i * 90}>
              <div className="bordered h-full rounded-2xl p-6">
                <p
                  className="font-mono text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display mt-3 text-lg leading-snug font-medium tracking-[-0.02em]">
                  {line}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- contents ---------- */}
      <section
        className="py-16"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                Contents
              </p>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
                What&rsquo;s inside {volume}.
              </h2>
            </div>
            <Link
              href={site.readUrl}
              className="btn btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Read it online <ArrowRight size={14} />
            </Link>
          </Reveal>

          <ol style={{ borderTop: "1px solid var(--line)" }}>
            {features.map((feature) => (
              <li
                key={feature.title}
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                {/* Each line opens the reader at that page. The list used to be
                    inert text, which is a strange thing for a contents page. */}
                <Link
                  href={`${site.readUrl}#page-${feature.page}`}
                  className="contents-row flex items-baseline gap-5 py-4"
                >
                  <span
                    className="w-8 shrink-0 font-mono text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    {String(feature.page).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display block text-base leading-snug font-semibold tracking-[-0.02em] sm:text-lg">
                      {feature.title}
                    </span>
                    {feature.standfirst && (
                      <span
                        className="mt-1 block text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        {feature.standfirst}
                      </span>
                    )}
                  </span>
                  <span
                    className="hidden shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase sm:block"
                    style={{ color: "var(--muted)" }}
                  >
                    {feature.section}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- the back catalogue ---------- */}
      <section
        id="archive"
        className="mx-auto max-w-[1240px] px-5 py-16 md:px-10"
      >
        <Reveal className="mb-10">
          <p
            className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Back issues
          </p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
            Every edition, still readable.
          </h2>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Nothing goes out of print here. Each past edition turns page by page
            in the same reader as the current one.
          </p>
        </Reveal>

        <ul className="grid gap-6">
          {pastEditions.map((edition, i) => (
            <li key={edition.reader.slug}>
              <Reveal
                delay={i * 100}
                className="bordered grid items-center gap-8 rounded-3xl p-8 sm:grid-cols-[auto_1fr] md:p-12"
              >
                <Link href={readerHref(edition)} className="shrink-0">
                  <Image
                    src={edition.cover}
                    alt={`${site.name} ${edition.volume} — ${edition.coverStory.name} on the cover`}
                    width={1814}
                    height={2560}
                    sizes="180px"
                    className="float w-[140px] rounded-lg sm:w-[180px]"
                    style={{ border: "1px solid var(--line)" }}
                  />
                </Link>
                <div>
                  <p
                    className="font-mono text-[11px] tracking-[0.25em] uppercase"
                    style={{ color: "var(--muted)" }}
                  >
                    {edition.volume} · {edition.label} · {edition.date} ·{" "}
                    {edition.pages} pages
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold tracking-[-0.03em] md:text-3xl">
                    Where it started.
                  </h3>
                  <p
                    className="mt-4 max-w-lg text-base leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    The maiden edition launched in Accra on 9 March 2024 with{" "}
                    {edition.coverStory.name}, {edition.coverStory.line}, on the
                    cover and the{" "}
                    <Link
                      href="/voices"
                      className="navlink"
                      style={{ color: "var(--accent)" }}
                    >
                      28 voices
                    </Link>{" "}
                    who set the tone for everything since.
                  </p>
                  <Link
                    href={readerHref(edition)}
                    className="btn btn-ghost mt-7 inline-flex items-center gap-2 px-5 py-3 text-sm"
                  >
                    <BookOpen size={15} /> Read {edition.volume}
                  </Link>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- backers ---------- */}
      <section
        className="py-14"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <Reveal className="mb-8">
            <h2
              className="font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              Sponsors &amp; partners
            </h2>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[...sponsors, ...partners].map((logo, i) => (
              <Reveal key={logo.name} delay={i * 50}>
                <div className="logo-tile relative h-[92px] w-[160px] overflow-hidden rounded-xl">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    sizes="160px"
                    className="object-contain p-4"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageShell>
  );
}
