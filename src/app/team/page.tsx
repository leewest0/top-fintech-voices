import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { TeamPortrait } from "@/components/ui/team-portrait";
import { LinkedInGlyph } from "@/components/ui/linkedin-glyph";
import { site } from "@/lib/site";
import { currentEdition, masthead } from "@/lib/magazine";
import { teamByDepartment } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description: `The people behind ${site.name} — the publisher, editors, designers and photographers credited in ${currentEdition.volume}.`,
  alternates: { canonical: "/team" },
  openGraph: {
    title: `Team — ${site.name}`,
    description: `The masthead of ${currentEdition.volume}.`,
    url: `${site.url}/team`,
  },
};

export default function TeamPage() {
  return (
    <PageShell
      eyebrow="The Team"
      title="The people behind Top Fintech Voices."
      intro={
        <p>
          Behind every story, conversation and connection is a team committed to building a
          credible, inclusive platform for Africa&rsquo;s fintech ecosystem.
        </p>
      }
    >
      {/* ---------- everyone, by department ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <div className="space-y-14">
          {teamByDepartment.map((department, di) => (
            <div key={department.name}>
              <Reveal delay={di * 60}>
                <h2 className="font-display text-xl font-bold tracking-[-0.03em] md:text-2xl">
                  {department.name}
                </h2>
              </Reveal>
              <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(220px,260px))] gap-5">
                {department.members.map((member, i) => (
                  <Reveal key={member.name} delay={di * 60 + i * 90}>
                    <article className="card flex h-full flex-col overflow-hidden rounded-2xl">
                      <div className="frame aspect-4/5 relative">
                        <TeamPortrait
                          name={member.name}
                          image={member.image}
                          sizes="260px"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <p
                            className="font-mono text-[10px] tracking-[0.18em] uppercase"
                            style={{ color: "var(--accent)" }}
                          >
                            {member.role}
                          </p>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${member.name} on LinkedIn`}
                              className="navlink shrink-0"
                              style={{ color: "var(--muted)" }}
                            >
                              <LinkedInGlyph size={15} />
                            </a>
                          )}
                        </div>
                        <h3 className="font-display mt-2 text-base leading-snug font-semibold tracking-[-0.02em]">
                          {member.name}
                        </h3>
                        {member.bio && (
                          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                            {member.bio}
                          </p>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- the full credits ---------- */}
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
              Credits
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              {currentEdition.volume} in full.
            </h2>
          </Reveal>

          <dl style={{ borderTop: "1px solid var(--line)" }}>
            {masthead.map((entry, i) => (
              <Reveal
                key={entry.role}
                delay={i * 50}
                className="grid gap-2 py-4 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-8"
              >
                <dt
                  className="font-mono text-[11px] tracking-[0.18em] uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {entry.role}
                </dt>
                <dd className="font-display text-base font-semibold tracking-[-0.02em] sm:text-lg">
                  {entry.names.join(" · ")}
                </dd>
              </Reveal>
            ))}
          </dl>
          <div style={{ borderBottom: "1px solid var(--line)" }} />
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <Reveal className="panel rounded-3xl p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            Join the Conversation
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Africa&rsquo;s fintech story is still being written. And we want to hear from the
            people writing it.
          </p>
          <p
            className="mx-auto mt-3 max-w-lg text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Whether you&rsquo;re building something transformative, challenging conventional
            thinking, looking to collaborate, or know a voice that deserves to be heard — join
            the conversation.
          </p>
          {/* The five ways in, as a line — not buttons. None of these has a
              destination yet (a story-submission form, a conversations
              community, a newsletter): naming them here without linking
              anywhere is more honest than a button that goes nowhere real. */}
          <p
            className="mx-auto mt-7 max-w-2xl font-mono text-[11px] tracking-[0.15em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Nominate a Voice · Submit a Story · Partner With Us · Join TFV Conversations ·
            Subscribe
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
            <Link
              href="/spotlight"
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              See who we&rsquo;ve featured
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
