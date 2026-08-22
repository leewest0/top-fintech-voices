import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { PageShell } from "@/components/ui/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { OrderForm } from "@/components/sections/order-form";
import { site } from "@/lib/site";
import { currentEdition } from "@/lib/magazine";

const { volume, label, date, pages, cover, coverStory } = currentEdition;

export const metadata: Metadata = {
  title: "Order the magazine",
  description: `Order print copies of ${site.name} ${volume} — ${pages} pages, published ${date}, with ${coverStory.name} on the cover.`,
  alternates: { canonical: "/order" },
  openGraph: {
    title: `Order the magazine — ${site.name}`,
    description: `${volume} · ${date} · ${pages} pages`,
    url: `${site.url}/order`,
    images: [{ url: cover, alt: `${site.name} ${volume} cover` }],
  },
};

export default function OrderPage() {
  return (
    <PageShell
      eyebrow={`${volume} · ${label} · ${date}`}
      title="Order the magazine."
      intro={
        <>
          <p>
            Print copies of {volume}, {pages} pages with {coverStory.name} on the cover. Tell us
            how many you need and where they&rsquo;re going, and we&rsquo;ll come back with
            payment and delivery.
          </p>
          <p className="mt-4">
            Just want to read it?{" "}
            <a
              href={site.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="navlink inline-flex items-center gap-1.5"
              style={{ color: "var(--accent)" }}
            >
              <Download size={14} aria-hidden="true" /> The digital edition is free
            </a>
            .
          </p>
        </>
      }
      aside={
        <div className="flex justify-center lg:justify-end">
          <Image
            src={cover}
            alt={`${site.name} ${volume} — ${coverStory.name} on the cover`}
            width={1200}
            height={1691}
            priority
            sizes="(max-width: 1024px) 60vw, 320px"
            className="w-full max-w-[320px] rounded-xl shadow-2xl"
            style={{ border: "1px solid var(--line)" }}
          />
        </div>
      }
    >
      <section className="mx-auto max-w-[1240px] px-5 py-14 md:px-10">
        <Reveal className="panel mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-3xl">
            Your order
          </h2>
          <p className="mt-3 mb-8 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Bulk and corporate orders welcome — say how many in the box below. Prefer to write?{" "}
            <a href={`mailto:${site.email}?subject=Magazine%20order`} className="navlink">
              {site.email}
            </a>
          </p>
          <OrderForm />
        </Reveal>
      </section>
    </PageShell>
  );
}
