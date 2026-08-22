import type { Metadata } from "next";
import { EditionReader } from "@/components/reader/edition-reader";
import { site } from "@/lib/site";
import { currentEdition, features } from "@/lib/magazine";

const { volume, pages, cover, coverStory } = currentEdition;

export const metadata: Metadata = {
  title: "Read the magazine",
  description: `Read ${site.name} ${volume} in your browser — all ${pages} pages, with ${coverStory.name} on the cover.`,
  alternates: { canonical: "/read" },
  openGraph: {
    title: `Read ${volume} — ${site.name}`,
    description: `All ${pages} pages, in your browser.`,
    url: `${site.url}/read`,
    images: [{ url: cover, alt: `${site.name} ${volume} cover` }],
  },
};

export default function ReadPage() {
  return <EditionReader edition={currentEdition} features={features} download />;
}
