"use client";

import { gotoPage } from "@/components/reader/flipbook";
import type { Feature } from "@/lib/magazine";

/**
 * The contents list under the reader. Buttons rather than links, because these
 * do not navigate anywhere — they turn the book that is already on the page.
 * The href-shaped version looked like a link and behaved like nothing.
 */
export function FeatureJumps({ features }: { features: Feature[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <li key={feature.title}>
          <button
            type="button"
            onClick={() => gotoPage(feature.page)}
            className="card flex h-full w-full items-baseline gap-4 rounded-xl p-4 text-left"
          >
            <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
              {String(feature.page).padStart(2, "0")}
            </span>
            <span className="font-display text-sm leading-snug font-semibold tracking-[-0.02em]">
              {feature.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
