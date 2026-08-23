import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { SponsorForm } from "@/components/sections/sponsor-form";
import { site } from "@/lib/site";
import { currentEdition, firstEdition, features } from "@/lib/magazine";
import { partners, sponsors } from "@/lib/content";
import { voices } from "@/lib/voices";

export const metadata: Metadata = {
  title: "Sponsor & advertise",
  description: `Advertise in ${site.name} or sponsor a section. The magazine reaches the founders, regulators and operators building financial technology in Ghana and across Africa.`,
  alternates: { canonical: "/sponsor" },
  openGraph: {
    title: `Sponsor & advertise — ${site.name}`,
    description: `Put your brand alongside the people building African fintech.`,
    url: `${site.url}/sponsor`,
    images: [{ url: currentEdition.cover, alt: `${site.name} ${currentEdition.volume}` }],
  },
};

/**
 * Every number on this page is one we can stand behind — page counts and
 * profile counts read off the editions themselves. No circulation, readership
 * or impression figures appear anywhere, because we do not have them, and an
 * invented one is the sort of thing a media buyer checks.
 */
const facts = [
  { value: "2", label: "editions published" },
  { value: String(voices.length), label: "executives profiled" },
  { value: String(currentEdition.pages), label: `pages in ${currentEdition.volume}` },
  { value: String(features.length), label: "features and reports" },
];

const options = [
  {
    title: "Advertising",
    copy: "Full-page and double-page placements in the print edition, which runs the same page-for-page in the online reader — so a page bought once is read in both.",
    thread: "var(--w1)",
  },
  {
    title: "Section sponsorship",
    copy: `Attach your name to a strand of the edition — cybersecurity, regulation, cross-border payments, the women leading Ghana's fintech future — across the feature well.`,
    thread: "var(--w2)",
  },
  {
    title: "Partnership",
    copy: "A longer-run association across editions and events, in the company of the knowledge and publishing partners already credited in the magazine.",
    thread: "var(--w3)",
  },
  {
    title: "The next markets",
    copy: "Two further editions are in preparation — a francophone African edition and a pan-African anglophone one. Early placements in those are open now.",
    thread: "var(--w4)",
  },
];

export default function SponsorPage() {
  return (
    <PageShell
      eyebrow="Sponsor & advertise"
      title="Reach the people building African fintech."
      intro={
        <>
          <p>
            Top Fintech Voices is read by the founders, regulators, bankers and operators who
            decide what gets built and what gets licensed — the same people it profiles. If those
            are your customers, this is a short route to them.
          </p>
          <p className="mt-4">
            Tell us what you have in mind and we&rsquo;ll send the rate card and what&rsquo;s still
            open in {currentEdition.volume === "Vol. 2" ? "the next edition" : currentEdition.volume}.
          </p>
        </>
      }
      aside={
        <div className="flex justify-center lg:justify-end">
          <Image
            src={currentEdition.cover}
            alt={`${site.name} ${currentEdition.volume} cover`}
            width={1200}
            height={1691}
            priority
            sizes="(max-width: 1024px) 60vw, 340px"
            className="float w-full max-w-[340px] rounded-xl shadow-2xl"
            style={{ border: "1px solid var(--line)" }}
          />
        </div>
      }
    >
      {/* ---------- what the magazine is ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 80}>
              <dd className="font-display text-4xl font-bold md:text-5xl" style={{ color: "var(--accent)" }}>
                {fact.value}
              </dd>
              <dt
                className="mt-2 font-mono text-[11px] tracking-widest uppercase"
                style={{ color: "var(--muted)" }}
              >
                {fact.label}
              </dt>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={340}>
          <p className="mt-10 max-w-2xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            {firstEdition.volume} launched in Accra in {firstEdition.date};{" "}
            {currentEdition.volume} followed in {currentEdition.date} with{" "}
            {currentEdition.coverStory.name} on the cover. Both are free to read in full on this
            site, and both circulate in print.
          </p>
        </Reveal>
      </section>

      {/* ---------- what's available ---------- */}
      <section
        className="py-16"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <Reveal className="mb-10">
            <p
              className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              What&rsquo;s available
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              Four ways in.
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {options.map((option, i) => (
              <Reveal key={option.title} delay={i * 90} className="card h-full rounded-2xl p-7">
                <div className="mb-6 flex gap-[3px]" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <span
                      key={k}
                      style={{ width: 4, height: 22, background: option.thread, opacity: 1 - k * 0.17 }}
                    />
                  ))}
                </div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.02em] md:text-xl">
                  {option.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {option.copy}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <p className="mt-10 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Rates depend on placement and edition, so they go out on request rather than sitting
              on a page that goes stale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- who already backs it ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <Reveal className="mb-10">
          <p
            className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            In good company
          </p>
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
            Who already backs the magazine.
          </h2>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {[...sponsors, ...partners].map((logo, i) => (
            <Reveal key={logo.name} delay={i * 50}>
              <div className="logo-tile relative h-[92px] w-[160px] overflow-hidden rounded-xl">
                <Image src={logo.image} alt={logo.name} fill sizes="160px" className="object-contain p-4" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- the enquiry ---------- */}
      <section
        id="enquiry"
        className="py-16"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}
      >
        <div className="mx-auto max-w-[760px] px-5 md:px-10">
          <Reveal className="mb-9">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              Ask for the rate card.
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              A few details and the desk in Accra will come back to you with rates, formats and
              what&rsquo;s still open.
            </p>
          </Reveal>

          <Reveal delay={120} className="panel rounded-3xl p-7 md:p-10">
            <SponsorForm />
          </Reveal>
        </div>
      </section>

      {/* ---------- see it first ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <Reveal className="panel rounded-3xl p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            Have a look at what you&rsquo;d be in.
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {currentEdition.volume} is free to read in full, page by page, right here.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={site.readUrl}
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              <BookOpen size={16} /> Read the edition
            </Link>
            <Link
              href="/magazine"
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              What&rsquo;s inside <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
