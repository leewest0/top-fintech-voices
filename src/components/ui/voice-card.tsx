import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Voice } from "@/lib/voices";

/** lucide dropped its brand icons, so the LinkedIn mark is drawn inline. */
function LinkedInGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

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
          <a
            href={voice.article}
            target="_blank"
            rel="noreferrer"
            className="navlink inline-flex items-center gap-1.5"
          >
            Read the profile <ArrowUpRight size={14} aria-hidden="true" />
          </a>
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
