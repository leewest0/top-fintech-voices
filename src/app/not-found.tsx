import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail, Weave } from "@/components/ui/weave";
import { site } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p
            className="mb-6 font-mono text-[11px] tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Error 404
          </p>
          <h1 className="font-display text-[2.4rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-[3.2rem]">
            A thread we haven&rsquo;t woven yet.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            That page doesn&rsquo;t exist — it may have moved when the site was rebuilt. The
            Platform is the best place to pick the trail back up.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/platform"
              className="btn btn-solid inline-flex items-center gap-2 px-6 py-3.5 text-sm"
            >
              Browse the Platform <ArrowRight size={16} />
            </Link>
            <Link href="/" className="btn btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              Back to the homepage
            </Link>
          </div>

          <p className="mt-8 text-sm" style={{ color: "var(--muted)" }}>
            Looking for something specific?{" "}
            <a href={`mailto:${site.email}`} className="navlink">
              {site.email}
            </a>
          </p>
        </div>

        <div
          className="hidden h-[360px] overflow-hidden rounded-2xl p-5 lg:block"
          style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
        >
          <Weave cols={7} rows={12} />
        </div>
      </main>

      <LoomRail />
      <SiteFooter />
    </>
  );
}
