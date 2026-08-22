import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { featuredVoices, stats } from "@/lib/content";
import { voices as allVoices } from "@/lib/voices";

export function Stats() {
  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 px-5 py-14 md:grid-cols-4 md:px-10">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 90}>
          <p className="font-display text-3xl font-bold md:text-4xl" style={{ color: "var(--accent)" }}>
            {stat.value}
          </p>
          <p
            className="mt-2 font-mono text-[11px] tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            {stat.label}
          </p>
        </Reveal>
      ))}
    </section>
  );
}

export function Spotlight() {
  return (
    <section id="spotlight" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            The Spotlight
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] md:text-5xl">
            The innovators, trailblazers
            <br />
            and visionaries.
          </h2>
        </div>
        <Link
          href="/spotlight"
          className="btn btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm"
        >
          All {allVoices.length} profiles <ArrowRight size={14} />
        </Link>
      </Reveal>

      <ul style={{ borderBottom: "1px solid var(--line)" }}>
        {featuredVoices.map((voice, i) => (
          <li key={voice.slug}>
            <Reveal delay={i * 60}>
              <Link href={`/spotlight/${voice.slug}`} className="voice-row block px-4 py-5 sm:px-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="voice-num hidden pt-4 font-mono text-xs sm:block"
                    style={{ color: "var(--muted)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className="h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16"
                    style={{ border: "1px solid var(--line)" }}
                  >
                    <Image
                      src={voice.image}
                      alt={voice.name}
                      width={200}
                      height={200}
                      sizes="64px"
                      className="voice-face h-full w-full object-cover object-top"
                    />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="font-display text-lg font-semibold tracking-[-0.02em] sm:text-2xl">
                      {voice.name}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                      {voice.role} — {voice.org}
                    </p>
                    <div className="voice-bio">
                      <p className="max-w-2xl text-sm leading-relaxed sm:text-base">
                        {voice.summary}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="voice-arrow mt-3 shrink-0" size={20} aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
