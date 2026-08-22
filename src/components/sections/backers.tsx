import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { partners, sponsors } from "@/lib/content";

export function Backers() {
  return (
    <section
      className="py-16"
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <h2
        className="mb-9 text-center font-mono text-[11px] tracking-[0.25em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        Sponsors &amp; partners
      </h2>

      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((pass) => (
            <ul key={pass} className="flex shrink-0" aria-hidden={pass === 1 || undefined}>
              {sponsors.map((sponsor) => (
                <li
                  key={`${pass}-${sponsor.name}`}
                  className="logo-tile relative mx-3 h-[110px] w-[190px] shrink-0 overflow-hidden rounded-xl"
                >
                  {/* The logos are trimmed to their own ink, so their aspect
                      ratios all differ — fill + contain keeps every one true. */}
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    sizes="190px"
                    className="object-contain p-4"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1240px] gap-5 px-5 sm:grid-cols-3 md:px-10">
        {partners.map((partner, i) => (
          <Reveal
            key={partner.name}
            delay={i * 90}
            className="bordered flex items-center gap-4 rounded-2xl p-5"
          >
            <div className="logo-tile relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                sizes="64px"
                className="object-contain p-1.5"
              />
            </div>
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {partner.label}
              </p>
              <p className="font-display mt-1.5 text-sm leading-snug font-semibold tracking-[-0.02em]">
                {partner.name}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
