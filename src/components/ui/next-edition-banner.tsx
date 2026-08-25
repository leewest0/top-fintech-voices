import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { upcomingEdition } from "@/lib/magazine";

/** Announces the next edition ahead of its cover reveal — used on the
    landing page and /magazine, so the date and volume live in one place. */
export function NextEditionBanner() {
  return (
    <Link
      href="/magazine"
      className="card flex items-center gap-4 rounded-2xl p-4"
    >
      <Image
        src={upcomingEdition.cover}
        alt={`${site.name} ${upcomingEdition.volume} cover`}
        width={80}
        height={112}
        sizes="56px"
        className="h-14 w-10 shrink-0 rounded-md object-cover"
        style={{ border: "1px solid var(--line)" }}
      />
      <span className="min-w-0 flex-1">
        <span
          className="block font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          Coming {upcomingEdition.date}
        </span>
        <span className="font-display mt-1 block text-sm font-semibold tracking-[-0.01em] sm:text-base">
          {upcomingEdition.volume}: {upcomingEdition.label} coming soon
        </span>
      </span>
      <ArrowRight size={16} className="shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true" />
    </Link>
  );
}
