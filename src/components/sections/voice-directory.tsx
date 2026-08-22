"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { VoiceCard } from "@/components/ui/voice-card";
import type { Voice } from "@/lib/voices";

/**
 * The full Spotlight roster with a filter across name, role and organisation.
 * Twenty-eight cards is enough that scanning for one person is a chore, and
 * filtering client-side keeps it instant without a round trip.
 */
export function VoiceDirectory({ voices }: { voices: Voice[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const inputId = useId();

  const matches = useMemo(() => {
    const needle = deferred.trim().toLowerCase();
    if (!needle) return voices;
    return voices.filter((voice) =>
      `${voice.name} ${voice.role} ${voice.org}`.toLowerCase().includes(needle),
    );
  }, [voices, deferred]);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2"
            style={{ color: "var(--muted)" }}
          />
          <label htmlFor={inputId} className="sr-only">
            Filter voices by name, role or organisation
          </label>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by name, role or company"
            className="w-full rounded-full py-3 pr-10 pl-10 text-sm outline-none"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              color: "var(--text)",
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear filter"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1"
              style={{ color: "var(--muted)" }}
            >
              <X size={15} />
            </button>
          )}
        </div>

        <p
          className="font-mono text-[11px] tracking-[0.2em] uppercase"
          role="status"
          aria-live="polite"
          style={{ color: "var(--muted)" }}
        >
          {matches.length === voices.length
            ? `${voices.length} voices`
            : `${matches.length} of ${voices.length} voices`}
        </p>
      </div>

      {matches.length === 0 ? (
        <p className="py-16 text-center text-base" style={{ color: "var(--muted)" }}>
          No voices match &ldquo;{query.trim()}&rdquo;. Try a company or a role instead.
        </p>
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {matches.map((voice, i) => (
            <li key={voice.slug}>
              <VoiceCard voice={voice} priority={i < 4} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
