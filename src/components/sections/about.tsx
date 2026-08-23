import { Reveal } from "@/components/ui/reveal";
import { TeamPortrait } from "@/components/ui/team-portrait";
import { LinkedInGlyph } from "@/components/ui/linkedin-glyph";
import { team } from "@/lib/content";
import { currentEdition } from "@/lib/magazine";

const pillars = [
  {
    label: "Mission",
    copy: "Empowering fintech collaboration and innovation globally.",
    thread: "var(--w1)",
  },
  {
    label: "Vision",
    copy: "Identifying fintech innovators for an inclusive, impactful world.",
    thread: "var(--w3)",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
      <Reveal className="mb-10 max-w-2xl">
        <p
          className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          About the publication
        </p>
        <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-5xl">
          Know us better.
        </h2>
        <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          Our publication provides a comprehensive platform for the fintech community, featuring
          in-depth interviews, cutting-edge research, insightful case studies and thought-provoking
          opinion pieces from the most influential figures in the industry. The maiden edition
          launched in Accra in March 2024; {currentEdition.volume} followed in{" "}
          {currentEdition.date}, with two more — francophone African and pan-African anglophone —
          on the way.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.label} delay={i * 120} className="card rounded-2xl p-8">
            <div className="mb-6 flex gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((k) => (
                <span
                  key={k}
                  style={{ width: 4, height: 22, background: pillar.thread, opacity: 1 - k * 0.17 }}
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
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
      <Reveal className="mb-10">
        <p
          className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          The masthead
        </p>
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
          Meet the team.
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {/* .card sits on the inner element rather than the Reveal: on the
            Reveal itself its transition would win and slow the hover lift. */}
        {team.map((member, i) => (
          <Reveal key={member.name} delay={(i % 5) * 90}>
            <div className="card h-full overflow-hidden rounded-2xl">
              <div className="frame aspect-4/5 relative">
                <TeamPortrait
                  name={member.name}
                  image={member.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
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
                <p className="font-display mt-2 text-base leading-snug font-semibold tracking-[-0.02em]">
                  {member.name}
                </p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
