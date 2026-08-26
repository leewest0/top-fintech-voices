import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { currentEdition, upcomingEdition } from "@/lib/magazine";

export function Magazine() {
  return (
    <section
      id="magazine"
      className="py-20"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:grid-cols-2 md:px-10">
        <Reveal>
          <p
            className="mb-5 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Coming Soon
          </p>
          <h2 className="font-display text-3xl leading-[1.05] font-bold tracking-[-0.03em] md:text-5xl">
            {upcomingEdition.coverStory.name} leads the third edition.
          </h2>
          <p
            className="mt-6 max-w-md text-base leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {upcomingEdition.volume}, the {upcomingEdition.label}, arrives{" "}
            {upcomingEdition.date}.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/magazine#available-now"
              className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Available Soon
            </Link>
          </div>

          <div
            className="mt-10 pt-8"
            style={{ borderTop: "1px solid var(--line)" }}
          >
            <p
              className="mb-4 font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              {currentEdition.volume} — available now
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={site.orderUrl}
                className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
              >
                Order your copy <ArrowRight size={16} />
              </Link>
              <Link
                href={site.readUrl}
                className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm"
              >
                <BookOpen size={16} /> Read it online
              </Link>
            </div>
            <p className="mt-6">
              <Link
                href="/magazine"
                className="navlink inline-flex items-center gap-1.5 text-sm font-semibold"
              >
                See what&rsquo;s inside {currentEdition.volume}{" "}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <Image
            src={upcomingEdition.cover}
            alt={`${site.name} ${upcomingEdition.volume} — ${upcomingEdition.coverStory.name} on the cover`}
            width={1200}
            height={1682}
            sizes="(max-width: 768px) 70vw, 380px"
            className="float h-auto w-full max-w-[380px] rounded-xl shadow-2xl"
            style={{ border: "1px solid var(--line)" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
