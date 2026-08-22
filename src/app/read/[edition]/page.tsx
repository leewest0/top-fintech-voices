import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditionReader } from "@/components/reader/edition-reader";
import { site } from "@/lib/site";
import { currentEdition, pastEditions } from "@/lib/magazine";

type Params = { edition: string };

/**
 * The back catalogue. The current edition is not here — it owns the bare /read,
 * and next.config.ts redirects /read/<its slug> there so the same magazine
 * never answers on two URLs.
 */
export function generateStaticParams(): Params[] {
  return pastEditions.map(({ reader }) => ({ edition: reader.slug }));
}

function find(slug: string) {
  return pastEditions.find((e) => e.reader.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const edition = find((await params).edition);
  if (!edition) return {};

  const { volume, label, pages, cover, coverStory, reader } = edition;
  return {
    title: `Read ${volume} — the ${label.toLowerCase()}`,
    description: `Read the ${label.toLowerCase()} of ${site.name} in your browser — all ${pages} pages, with ${coverStory.name} on the cover.`,
    alternates: { canonical: `/read/${reader.slug}` },
    openGraph: {
      title: `Read ${volume} — ${site.name}`,
      description: `The ${label.toLowerCase()}, all ${pages} pages, in your browser.`,
      url: `${site.url}/read/${reader.slug}`,
      images: [{ url: cover, alt: `${site.name} ${volume} cover` }],
    },
  };
}

export default async function ArchiveReadPage({ params }: { params: Promise<Params> }) {
  const edition = find((await params).edition);
  if (!edition) notFound();

  return (
    <EditionReader
      edition={edition}
      intro={
        <>
          The {edition.label.toLowerCase()}, {edition.date} — all {edition.pages} pages.{" "}
          <Link href="/read" className="navlink" style={{ color: "var(--accent)" }}>
            Read {currentEdition.volume} instead
          </Link>
          .
        </>
      }
    />
  );
}
