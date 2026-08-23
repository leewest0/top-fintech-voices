import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { NominationForm } from "@/components/sections/nomination-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emerging Voices",
  description:
    "TFV Emerging Voices identifies and amplifies the next generation of African fintech — young founders, engineers, researchers, creators and entrepreneurs changing the conversation.",
  alternates: { canonical: "/emerging-voices" },
  openGraph: {
    title: `Emerging Voices — ${site.name}`,
    description: "The next generation of African fintech, before they're the cover story.",
    url: `${site.url}/emerging-voices`,
  },
};

export default function EmergingVoicesPage() {
  return (
    <PageShell
      eyebrow="Emerging Voices"
      title="The next voices deserve to be heard too."
      intro={
        <>
          <p>
            The future of African fintech will not only be shaped by today&rsquo;s CEOs. It is
            also being built by young founders, engineers, researchers, creators and
            entrepreneurs who are challenging how financial services should work.
          </p>
          <p className="mt-4">
            TFV Emerging Voices identifies and amplifies the next generation of people changing
            the conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#discover"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Discover Emerging Voices <ArrowDown size={16} />
            </a>
            <a
              href="#nominate"
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Nominate a Voice
            </a>
          </div>
        </>
      }
    >
      {/* ---------- discover: honest about where this stands ---------- */}
      <section id="discover" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
        <Reveal className="panel rounded-3xl p-8 text-center md:p-14">
          <span
            className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            aria-hidden="true"
          >
            <Sparkles size={20} />
          </span>
          <h2 className="font-display mt-6 text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            The first cohort is being built right now.
          </h2>
          <p
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Emerging Voices profiles are still in progress — nothing published yet means nothing
            invented in the meantime. Nominate someone below, or meet the people already featured
            in the magazine while the first cohort comes together.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#nominate"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Nominate a Voice <ArrowRight size={16} />
            </a>
            <Link
              href="/spotlight"
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Meet who&rsquo;s already featured
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------- nominate ---------- */}
      <section
        id="nominate"
        className="py-16"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}
      >
        <div className="mx-auto max-w-[760px] px-5 md:px-10">
          <Reveal className="mb-9">
            <p
              className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              Nominate a Voice
            </p>
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              Know someone who should be on this list?
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
              Tell us who they are and what they&rsquo;re building. The editorial desk reads
              every nomination.
            </p>
          </Reveal>

          <Reveal delay={120} className="panel rounded-3xl p-7 md:p-10">
            <NominationForm />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
