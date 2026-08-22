import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LinkedInGlyph } from "@/components/ui/linkedin-glyph";
import type { Voice } from "@/lib/voices";

/**
 * One profile in the Spotlight grid. The whole card is not a single link:
 * it carries two destinations (the profile piece and the person's LinkedIn),
 * so each gets its own control rather than nesting interactive elements.
 */
export function VoiceCard({ voice, priority = false }: { voice: Voice; priority?: boolean }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="frame aspect-4/5 relative">
        <Image
          src={voice.image}
          alt={voice.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg leading-snug font-semibold tracking-[-0.02em]">
          {voice.name}
        </h3>
        <p className="mt-1.5 text-sm leading-snug" style={{ color: "var(--muted)" }}>
          {voice.role}
          {voice.org && (
            <>
              {" — "}
              <span style={{ color: "var(--accent)" }}>{voice.org}</span>
            </>
          )}
        </p>

        <p className="mt-4 mb-5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          {voice.summary}
        </p>

        {/* mt-auto pins the footer to the bottom so it lines up across a row
            of cards whose summaries run to different lengths. */}
        <div
          className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm font-semibold"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <Link href={`/spotlight/${voice.slug}`} className="navlink inline-flex items-center gap-1.5">
            Read the profile <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href={voice.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${voice.name} on LinkedIn`}
            className="navlink inline-flex items-center"
          >
            <LinkedInGlyph />
          </a>
        </div>
      </div>
    </article>
  );
}
