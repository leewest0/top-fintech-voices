"use client";

import { useCallback, useSyncExternalStore, type ReactNode } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "tfv-theme";

/**
 * Runs before the rest of the body parses, so a stored dark-mode choice never
 * flashes light first. It also marks the document as scripted, which is what
 * arms the reveal-on-scroll animation — without it every section renders in
 * its final state instead of waiting for an observer that will never run.
 */
const bootstrapScript = `
(function () {
  document.documentElement.classList.add("js");
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    if (stored === "light" || stored === "dark") {
      document.documentElement.dataset.theme = stored;
    }
  } catch (e) {}
})();
`;

/**
 * `<html data-theme>` is the single source of truth — the bootstrap script above
 * writes it before React ever runs — so the toggle reads it rather than keeping
 * a second copy that would start out disagreeing on the first paint.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const getServerSnapshot = (): Theme => "light";

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private browsing — the choice just won't persist.
    }
  }, []);

  return { theme, toggle };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      {children}
    </>
  );
}
