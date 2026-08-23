import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail } from "@/components/ui/weave";
import { VoiceDirectory } from "@/components/sections/voice-directory";
import { site } from "@/lib/site";
import { voices } from "@/lib/voices";

export const metadata: Metadata = {
  title: "Spotlight",
  description:
    "The leaders, builders, policymakers and innovators featured in Top Fintech Voices, a platform for the people shaping financial technology in Ghana and across Africa.",
  alternates: { canonical: "/spotlight" },
  openGraph: {
    title: `Spotlight — ${site.name}`,
    description: `All ${voices.length} voices featured in Top Fintech Voices.`,
    url: `${site.url}/spotlight`,
    images: [{ url: voices[0].image, alt: voices[0].name }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Spotlight — ${site.name}`,
  url: `${site.url}/spotlight`,
  isPartOf: { "@type": "Periodical", name: site.name, url: site.url },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: voices.length,
    itemListElement: voices.map((voice, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: voice.name,
        jobTitle: voice.role,
        description: voice.summary,
        image: `${site.url}${voice.image}`,
        // The profile as it lives here. This used to name the old WordPress
        // post, which told search engines each person's page was somewhere this
        // site will shortly stop serving.
        url: `${site.url}/spotlight/${voice.slug}`,
        sameAs: voice.linkedin || undefined,
        ...(voice.org && { worksFor: { "@type": "Organization", name: voice.org } }),
      },
    })),
  },
};

export default function SpotlightPage() {
  const organisations = new Set(voices.map((v) => v.org).filter(Boolean));

  return (
    <>
      <a
        href="#roster"
        className="btn btn-solid sr-only px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:inline-flex"
      >
        Skip to the voices
      </a>

      <SiteHeader />

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pt-12 pb-12 md:px-10 md:pt-20">
          <p
            className="rise mb-6 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            The Platform
          </p>
          <h1
            className="rise font-display max-w-3xl text-[2.4rem] leading-[1] font-bold tracking-[-0.03em] sm:text-[3.2rem] lg:text-[3.8rem]"
            style={{ animationDelay: "80ms" }}
          >
            A platform for Africa&rsquo;s
            <br className="hidden sm:block" /> fintech voices.
          </h1>
          <div
            className="rise mt-7 max-w-xl space-y-4 text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--muted)", animationDelay: "220ms" }}
          >
            <p>
              Africa&rsquo;s fintech story is being written by people solving some of the
              continent&rsquo;s biggest challenges — from financial inclusion and payments to
              artificial intelligence, digital identity, cybersecurity and cross-border commerce.
            </p>
            <p>
              Top Fintech Voices exists to find those people, amplify their thinking and bring
              the ecosystem together.
            </p>
            <p>
              We connect leaders, builders, policymakers, investors and the next generation of
              innovators through four core platforms:
            </p>
          </div>

          <dl
            className="rise mt-10 flex flex-wrap gap-x-12 gap-y-6"
            style={{ animationDelay: "340ms" }}
          >
            {[
              [voices.length, "voices in the issue"],
              [organisations.size, "organisations represented"],
            ].map(([value, label]) => (
              <div key={label}>
                <dd
                  className="font-display text-3xl font-bold md:text-4xl"
                  style={{ color: "var(--accent)" }}
                >
                  {value}
                </dd>
                <dt
                  className="mt-2 font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        <LoomRail />

        <section id="roster" className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
          <VoiceDirectory voices={voices} />
        </section>

        <section className="mx-auto max-w-[1240px] px-5 pb-20 md:px-10">
          <div className="panel rounded-3xl p-8 text-center md:p-14">
            <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
              Read them at full length.
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Every profile here runs in full in the magazine, alongside the cover story, market
              analysis and the portrait sessions from Accra.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={site.orderUrl}
                className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                Order the magazine <ArrowRight size={16} />
              </Link>
              <Link
                href={site.readUrl}
                className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
                <BookOpen size={16} /> Read it online
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LoomRail />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
