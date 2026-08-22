import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { currentEdition, features, firstEdition } from "@/lib/magazine";
import { partners, sponsors } from "@/lib/content";

const { volume, label, date, pages, cover, coverStory, coverLines } = currentEdition;

export const metadata: Metadata = {
  title: "The Magazine",
  description: `${volume}, the ${label.toLowerCase()} of ${site.name} — ${pages} pages, published ${date}, with ${coverStory.name} on the cover. Order the print edition or read it free.`,
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
      eyebrow={`${volume} · ${label} · ${date}`}
      title={
        <>
          {coverStory.name} on the cover of the second edition.
        </>
      }
      intro={
        <>
          <p>
            {pages} pages of interviews, research and analysis from across Ghana&rsquo;s fintech
            ecosystem and the wider continent — collaboration, cybersecurity, regulation, funding
            and the women reshaping the industry.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={site.orderUrl}
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Order the print edition <ArrowRight size={16} />
            </Link>
            <Link
              href={site.readUrl}
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              <BookOpen size={16} /> Read it online
            </Link>
          </div>
        </>
      }
      aside={
        <div className="flex justify-center lg:justify-end">
          <Image
            src={cover}
            alt={`${site.name} ${volume} — ${coverStory.name} on the cover`}
            width={1200}
            height={1691}
            priority
            sizes="(max-width: 1024px) 70vw, 400px"
            className="w-full max-w-[400px] rounded-xl shadow-2xl"
            style={{ border: "1px solid var(--line)" }}
          />
        </div>
      }
    >
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
              href="/stories"
              className="btn btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Browse the features <ArrowRight size={14} />
            </Link>
          </Reveal>

          <ol style={{ borderTop: "1px solid var(--line)" }}>
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-baseline gap-5 py-4"
                style={{ borderBottom: "1px solid var(--line)" }}
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
                    <span className="mt-1 block text-sm" style={{ color: "var(--muted)" }}>
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
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- the first edition ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <Reveal className="bordered grid items-center gap-8 rounded-3xl p-8 sm:grid-cols-[auto_1fr] md:p-12">
          <Image
            src={firstEdition.cover}
            alt={`${site.name} ${firstEdition.volume} — ${firstEdition.coverStory.name} on the cover`}
            width={1814}
            height={2560}
            sizes="180px"
            className="w-[140px] rounded-lg sm:w-[180px]"
            style={{ border: "1px solid var(--line)" }}
          />
          <div>
            <p
              className="font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              {firstEdition.volume} · {firstEdition.label} · {firstEdition.date}
            </p>
            <h2 className="font-display mt-3 text-xl font-bold tracking-[-0.03em] md:text-3xl">
              Where it started.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              The maiden edition launched in Accra on 9 March 2024 with{" "}
              {firstEdition.coverStory.name}, {firstEdition.coverStory.line}, on the cover — and the{" "}
              <Link href="/spotlight" className="navlink" style={{ color: "var(--accent)" }}>
                28 voices
              </Link>{" "}
              who set the tone for everything since.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- backers ---------- */}
      <section
        className="py-14"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}
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
