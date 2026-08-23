"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { LinkedInGlyph } from "@/components/ui/linkedin-glyph";

/**
 * Share a profile.
 *
 * The people in the Spotlight are the ones most likely to post their own page,
 * so LinkedIn leads — it is where this audience actually is, and where a
 * profile share is worth the most.
 *
 * The share targets are plain links, not popups: a window.open call is what
 * blockers eat, and a normal link works with middle-click, "open in new tab"
 * and a keyboard. Only "copy link" needs JavaScript, and it falls back to
 * selecting the text if the clipboard is unavailable.
 */

/** lucide dropped its brand icons, so these two are drawn inline. */
function XGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93ZM17.6 20.65h2.04L6.48 3.24H4.3Z" />
    </svg>
  );
}

function WhatsAppGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 0 16.47Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.06s.89 2.39 1.01 2.56c.12.16 1.74 2.67 4.22 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const field = useRef<HTMLInputElement>(null);

  // A pending "Copied" reset would set state on an unmounted component when
  // the reader clicks through to the next profile.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // No clipboard permission, or an insecure context. Select the URL so it
      // can be copied by hand rather than leaving the button apparently dead.
      field.current?.focus();
      field.current?.select();
    }
  }

  const text = `${title} — ${SHARE_LINE}`;
  const targets = [
    {
      label: "Share on LinkedIn",
      short: "LinkedIn",
      icon: <LinkedInGlyph size={15} />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on X",
      short: "X",
      icon: <XGlyph size={14} />,
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on WhatsApp",
      short: "WhatsApp",
      icon: <WhatsAppGlyph size={15} />,
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    },
  ];

  return (
    <div>
      <p
        className="mb-3 font-mono text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "var(--muted)" }}
        id="share-heading"
      >
        Share this profile
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="share-heading">
        {targets.map((target) => (
          <a
            key={target.short}
            href={target.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={target.label}
            className="btn btn-ghost inline-flex items-center gap-2 px-4 py-2.5 text-sm"
          >
            {target.icon} {target.short}
          </a>
        ))}

        <button
          type="button"
          onClick={copy}
          className="btn btn-ghost inline-flex items-center gap-2 px-4 py-2.5 text-sm"
        >
          {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      {/* The fallback target for copy(), and never shown: `hidden` would make it
          unfocusable, so it is pulled out of the layout instead. */}
      <input
        ref={field}
        readOnly
        value={url}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {/* Announced rather than only shown, since the button's own label change
          is not reliably read out mid-interaction. */}
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to the clipboard" : ""}
      </p>
    </div>
  );
}

const SHARE_LINE = "featured in Top Fintech Voices";
