import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

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
            The Magazine
          </p>
          <h2 className="font-display text-3xl leading-[1.05] font-bold tracking-[-0.03em] md:text-5xl">
            Issue 01 is printed, bound and shipping from Accra.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Cover stories, portrait sessions and market analysis from Ghana&rsquo;s fintech front
            line — with Archie Hesse of GhIPSS on the cover. Order the print edition, or get in
            touch about bulk copies for your team.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.orderUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Order your copy <ArrowUpRight size={16} />
            </a>
            <a href={`mailto:${site.email}?subject=Bulk%20order`} className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Enquire about bulk orders
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:max-w-md">
            {[
              { src: "/magazine/covers-fan.jpg", alt: "Copies of Issue 01 on display" },
              { src: "/magazine/launch.jpg", alt: "A reader with Issue 01 at the Accra launch" },
            ].map((shot) => (
              <div key={shot.src} className="frame overflow-hidden rounded-xl" style={{ border: "1px solid var(--line)" }}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1024}
                  height={683}
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="h-28 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="flex justify-center">
          <Image
            src="/magazine/model-01.png"
            alt="Reader holding the Top Fintech Voices magazine"
            width={447}
            height={388}
            sizes="(max-width: 768px) 80vw, 420px"
            className="float h-auto w-full max-w-[420px] object-contain drop-shadow-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
