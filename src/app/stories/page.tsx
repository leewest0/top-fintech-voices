import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { currentEdition, features } from "@/lib/magazine";
import { voices } from "@/lib/voices";

export const metadata: Metadata = {
  title: "Stories",
  description: `The features running in ${currentEdition.volume} of ${site.name} — collaboration, cybersecurity, regulation, funding and the women reshaping Ghana's fintech industry.`,
  alternates: { canonical: "/stories" },
  openGraph: {
    title: `Stories — ${site.name}`,
    description: `${features.length} features from ${currentEdition.volume}.`,
    url: `${site.url}/stories`,
    images: [{ url: currentEdition.cover, alt: `${site.name} ${currentEdition.volume}` }],
  },
};

/** Three profiles to point at from the foot of the page. */
const PROFILE_TEASERS = ["adoma-owusu", "archie-hesse", "kwame-oppong", "mary-boateng-coleman"]
  .map((slug) => voices.find((v) => v.slug === slug))
  .filter((v): v is NonNullable<typeof v> => Boolean(v))
  .slice(0, 3);

export default function StoriesPage() {
  return (
    <PageShell
      eyebrow={`${currentEdition.volume} · ${currentEdition.date}`}
      title="The features, essays and reports."
      intro={
        <>
          <p>
            {features.length} pieces running across {currentEdition.pages} pages — from why fintech
            is not a solo sport, to the Ghana&ndash;Côte d&rsquo;Ivoire corridor, to where the
            funding is actually going. Each one runs in full in the edition.
          </p>
          <div className="mt-8">
            <a
              href={site.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              <Download size={16} /> Read the edition free
            </a>
          </div>
        </>
      }
    >
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li key={feature.title}>
              <Reveal delay={(i % 3) * 90}>
                <a
                  href={site.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="card flex h-full flex-col rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      {feature.section}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: "var(--muted)" }}
                    >
                      p.{feature.page}
                    </span>
                  </div>

                  <h2 className="font-display mt-4 text-lg leading-snug font-semibold tracking-[-0.02em]">
                    {feature.title}
                  </h2>

                  {feature.standfirst && (
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {feature.standfirst}
                    </p>
                  )}

                  <span
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold"
                    style={{ color: "var(--muted)" }}
                  >
                    Read in the edition <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="py-16"
        style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}
      >
        <div className="mx-auto max-w-[1240px] px-5 md:px-10">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p
                className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                Also on the site
              </p>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
                The profiles, in full.
              </h2>
            </div>
            <Link
              href="/spotlight"
              className="btn btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              All {voices.length} profiles <ArrowRight size={14} />
            </Link>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {PROFILE_TEASERS.map((voice, i) => (
              <Reveal key={voice.slug} delay={i * 90}>
                <Link
                  href={`/spotlight/${voice.slug}`}
                  className="card flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <div className="frame h-44">
                    <Image
                      src={voice.image}
                      alt={voice.name}
                      width={900}
                      height={900}
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em]">
                      {voice.name}
                    </h3>
                    <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
                      {voice.role}
                      {voice.org && ` — ${voice.org}`}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold"
                      style={{ color: "var(--muted)" }}
                    >
                      Read the profile <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
