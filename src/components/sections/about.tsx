import { Reveal } from "@/components/ui/reveal";
import { pillars } from "@/lib/content";
import { currentEdition } from "@/lib/magazine";

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
          Our Story
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
