import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail } from "@/components/ui/weave";
import { Flipbook } from "@/components/reader/flipbook";
import { FeatureJumps } from "@/components/reader/feature-jumps";
import { site } from "@/lib/site";
import type { Edition, Feature } from "@/lib/magazine";

/**
 * One edition, page by page. Shared by /read (the current edition) and
 * /read/[edition] (the back catalogue) so the two cannot drift apart.
 *
 * `features` is optional because only the current edition has its contents
 * transcribed. Without them the reader still has its own thumbnail index, so
 * an archive edition loses the jump list and nothing else — better than
 * inventing page numbers for an edition nobody has indexed.
 *
 * `download` is optional for the same kind of reason: the Drive PDF is the
 * current edition, so offering it under a back issue would hand the reader the
 * wrong magazine.
 */
export function EditionReader({
  edition,
  features,
  download = false,
  intro,
}: {
  edition: Edition;
  features?: Feature[];
  download?: boolean;
  intro?: React.ReactNode;
}) {
  const { volume, label, date, pages, reader } = edition;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pt-10 pb-8 md:px-10 md:pt-14">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p
                className="mb-3 font-mono text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {volume} · {label} · {date}
              </p>
              <h1 className="font-display text-[2rem] leading-[1.05] font-bold tracking-[-0.03em] sm:text-[2.6rem]">
                Read it here.
              </h1>
              <p
                className="mt-3 max-w-lg text-base leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {intro ?? (
                  <>All {pages} pages. Turn with the arrows, your keyboard, or by swiping.</>
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {download && (
                <a
                  href={site.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost inline-flex items-center gap-2 px-5 py-2.5 text-sm"
                >
                  <Download size={15} /> Download the PDF
                </a>
              )}
              <Link
                href={site.orderUrl}
                className="btn btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                Order in print <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="px-4 py-10 sm:px-6 md:py-14"
          style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}
        >
          <Flipbook pages={pages} aspect={reader.aspect} slug={reader.slug} />
        </section>

        <LoomRail />

        {features && features.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
            <h2 className="font-display mb-8 text-2xl font-bold tracking-[-0.03em] md:text-3xl">
              Jump to a feature
            </h2>
            <FeatureJumps features={features} />
          </section>
        )}
      </main>

      <LoomRail />
      <SiteFooter />
    </>
  );
}
