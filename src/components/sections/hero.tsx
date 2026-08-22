import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Weave } from "@/components/ui/weave";
import { site } from "@/lib/site";
import { voices } from "@/lib/content";

const cover = voices[0];

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-5 pt-12 pb-14 md:px-10 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p
            className="rise mb-7 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Maiden edition · Launched in Accra, March 2024
          </p>

          <h1 className="font-display text-[2.4rem] leading-[0.98] font-bold tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.1rem]">
            <span className="rise block" style={{ animationDelay: "80ms" }}>
              The people
            </span>
            <span className="rise block" style={{ animationDelay: "180ms" }}>
              behind the
            </span>
            <span className="rise block" style={{ animationDelay: "280ms", color: "var(--accent)" }}>
              payments.
            </span>
          </h1>

          <p
            className="rise mt-7 max-w-lg text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--muted)", animationDelay: "400ms" }}
          >
            In-depth interviews, research and opinion from the founders, regulators and
            operators building Ghana&rsquo;s financial infrastructure — and, from the next
            editions, francophone and pan-African markets too.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "520ms" }}>
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Order the magazine <ArrowUpRight size={16} />
            </a>
            <a href="#spotlight" className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Read the Spotlight
            </a>
          </div>
        </div>

        {/* Weave panel with the issue-01 cover laid over it. The bottom
            padding reserves room for the cover's overhang. */}
        <div className="relative pb-12">
          <div
            /* Extra bottom room on lg, where the two-column layout narrows this
               panel enough for the caption to wrap onto a second line. */
            className="relative h-[340px] overflow-hidden rounded-2xl p-5 pb-12 sm:h-[420px] lg:pb-16"
            style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
          >
            <Weave />
            {/* Sits inside the panel, starting clear of the cover that
                overlaps its left side. On phones the cover fills too much of
                the panel for the line to fit, so it drops out entirely. */}
            <p
              className="absolute right-5 bottom-4 left-[250px] hidden text-right font-mono text-[10px] tracking-[0.2em] uppercase sm:block"
              style={{ color: "var(--muted)" }}
            >
              One strip, one voice — woven in Accra
            </p>
          </div>

          <div className="card absolute bottom-0 -left-2 w-[210px] overflow-hidden rounded-xl sm:-left-8 sm:w-[240px]">
            <div className="frame">
              <Image
                src="/magazine/cover-issue-01.jpg"
                alt={`${site.name} Issue 01, cover story: ${cover.name}`}
                width={1814}
                height={2560}
                priority
                sizes="(max-width: 640px) 210px, 240px"
                className="float h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
