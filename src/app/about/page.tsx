import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { currentEdition, firstEdition } from "@/lib/magazine";
import { voices } from "@/lib/voices";
import { pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Top Fintech Voices is a magazine for the fintech community — in-depth interviews, research, case studies and opinion from the most influential figures in the industry.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: site.description,
    url: `${site.url}/about`,
  },
};

const milestones = [
  {
    date: "9 March 2024",
    title: "The maiden edition launches in Accra",
    copy: `${firstEdition.coverStory.name} of GhIPSS on the cover, and 28 founders, regulators and operators featured in Voices.`,
  },
  {
    date: currentEdition.date,
    title: `${currentEdition.volume} — the second edition`,
    copy: `${currentEdition.pages} pages with ${currentEdition.coverStory.name} on the cover, widening from Ghana to the continent.`,
  },
  {
    date: "Next",
    title: "Francophone and pan-African editions",
    copy: "Two new editions in the works, each tuned to the needs and interests of its market.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About the publication"
      title="Our Story"
      intro={
        <>
          <p
            className="font-display text-xl font-semibold tracking-[-0.02em]"
            style={{ color: "var(--text)" }}
          >
            Born in Ghana. Built for Africa.
          </p>
          <p className="mt-4">
            Top Fintech Voices began in Accra with a simple ambition: to
            recognise and amplify the people behind fintech&rsquo;s progress.
            Our maiden edition launched in 2024, followed by our second edition
            in 2025.
          </p>
          <p className="mt-4">
            Today, that ambition is growing beyond one market. As Top Fintech
            Voices expands across Anglophone and Francophone Africa, we are
            building a platform where the continent&rsquo;s fintech community
            can be seen, heard, challenged and connected.
          </p>
          <p className="mt-4">
            Because Africa doesn&rsquo;t have a shortage of innovation. It has
            stories, ideas and voices that deserve a bigger platform.
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
      {/* ---------- mission / vision ---------- */}
      <section className="mx-auto grid max-w-[1240px] gap-6 px-5 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal
            key={pillar.label}
            delay={i * 120}
            className="card rounded-2xl p-8"
          >
            <div className="mb-6 flex gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((k) => (
                <span
                  key={k}
                  style={{
                    width: 4,
                    height: 22,
                    background: pillar.thread,
                    opacity: 1 - k * 0.17,
                  }}
                />
              ))}
            </div>
            <p
              className="mb-4 font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              {pillar.label}
            </p>
            <p className="font-display text-xl leading-snug font-medium tracking-[-0.02em] md:text-2xl">
              {pillar.copy}
            </p>
          </Reveal>
        ))}
      </section>

      {/* ---------- the story so far ---------- */}
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
              The story so far
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              Two editions in, and expanding.
            </h2>
          </Reveal>

          <ol className="grid gap-5 md:grid-cols-3">
            {milestones.map((milestone, i) => (
              <li key={milestone.title}>
                <Reveal
                  delay={i * 100}
                  className="bordered h-full rounded-2xl p-6"
                >
                  <p
                    className="font-mono text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {milestone.date}
                  </p>
                  <h3 className="font-display mt-3 text-lg leading-snug font-semibold tracking-[-0.02em]">
                    {milestone.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--muted)" }}
                  >
                    {milestone.copy}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={320}>
            <p
              className="mt-10 max-w-3xl text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Given the rapidly growing fintech markets in Africa and beyond, we
              are expanding our reach with two new editions, a francophone
              African version and a pan-African anglophone version, each
              catering to the unique needs and interests of those markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- where to go next ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              href: "/voices",
              label: "Voices",
              copy: `${voices.length} founders, regulators and operators, profiled in full.`,
            },
            {
              href: "/team",
              label: "The masthead",
              copy: "The editors, designers and photographers who make each edition.",
            },
            {
              href: "/contact",
              label: "Get in touch",
              copy: "For pitches, partnerships and press, send an email to our editorial team and they’ll get back to you.",
            },
          ].map((card, i) => (
            <Reveal key={card.href} delay={i * 90}>
              <Link
                href={card.href}
                className="card flex h-full flex-col rounded-2xl p-6"
              >
                <h2 className="font-display text-lg font-semibold tracking-[-0.02em]">
                  {card.label}
                </h2>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {card.copy}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  Open <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={280}
          className="panel mt-14 rounded-3xl p-8 text-center md:p-12"
        >
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            Read the current edition.
          </h2>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={site.orderUrl}
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Order the magazine <ArrowRight size={16} />
            </Link>
            <Link
              href={site.readUrl}
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              <BookOpen size={16} /> Read it online
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
