import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { TeamPortrait } from "@/components/ui/team-portrait";
import { site } from "@/lib/site";
import { currentEdition, masthead } from "@/lib/magazine";
import { team } from "@/lib/content";

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
  const credited = masthead.reduce((n, entry) => n + entry.names.length, 0);

  return (
    <PageShell
      eyebrow="The masthead"
      title="Meet the team."
      intro={
        <p>
          The people who commission, edit, design, shoot and ship the magazine — {team.length} of
          them, and {credited} credits across {masthead.length} desks in {currentEdition.volume}.
        </p>
      }
    >
      {/* ---------- everyone ---------- */}
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={(i % 5) * 90}>
              <article className="card flex h-full flex-col overflow-hidden rounded-2xl">
                <div className="frame aspect-4/5 relative">
                  <TeamPortrait
                    name={member.name}
                    image={member.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="p-5">
                  <p
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: "var(--accent)" }}
                  >
                    {member.role}
                  </p>
                  <h2 className="font-display mt-2 text-base leading-snug font-semibold tracking-[-0.02em]">
                    {member.name}
                  </h2>
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
            Want to write for us, or be in the next edition?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            We commission from across the ecosystem — founders, regulators, lawyers and analysts.
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
