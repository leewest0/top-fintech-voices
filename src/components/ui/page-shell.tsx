import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail } from "@/components/ui/weave";

/**
 * The frame every inner page shares: header, an intro band, the loom rail
 * divider, then the page's own content above the footer. Keeps the six menu
 * pages reading as one site rather than six separate designs.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional block set beside the intro — stats, a cover, a pull quote. */
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#content"
        className="btn btn-solid sr-only px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:inline-flex"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pt-12 pb-12 md:px-10 md:pt-20">
          <div
            className={
              aside ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16" : undefined
            }
          >
            <div>
              <p
                className="rise mb-6 font-mono text-[11px] tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {eyebrow}
              </p>
              <h1
                className="rise font-display max-w-3xl text-[2.4rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-[3.2rem] lg:text-[3.6rem]"
                style={{ animationDelay: "80ms" }}
              >
                {title}
              </h1>
              {intro && (
                <div
                  className="rise mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
                  style={{ color: "var(--muted)", animationDelay: "220ms" }}
                >
                  {intro}
                </div>
              )}
            </div>
            {aside && (
              <div className="rise" style={{ animationDelay: "340ms" }}>
                {aside}
              </div>
            )}
          </div>
        </section>

        <LoomRail />

        <div id="content">{children}</div>
      </main>

      <LoomRail />
      <SiteFooter />
    </>
  );
}
