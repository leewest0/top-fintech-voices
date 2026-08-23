import Image from "next/image";

/**
 * A team member's portrait, or their initials when we haven't got one.
 *
 * Four of the nine people credited in Vol 2 have no photograph on file. The
 * previous answer was to leave them off the page entirely, which is the one
 * outcome worth avoiding. A monogram says "no photo yet"; an omission says
 * "not on the team".
 *
 * The face strip on the edition's Contributors page is deliberately not used
 * as a source: it is nine portraits in a row with no captions, so matching a
 * face to a name would be a guess, and guessing wrong puts the wrong person's
 * face against a real name.
 */

/** First and last initial — "Amanda Nyante" → "AN". */
function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** Stable per-name pick from the weave threads, so a face keeps its colour. */
function thread(name: string): string {
  const sum = [...name].reduce((n, c) => n + c.charCodeAt(0), 0);
  return `var(--w${(sum % 4) + 1})`;
}

export function TeamPortrait({
  name,
  image,
  sizes,
}: {
  name: string;
  image?: string;
  sizes: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: "var(--surface-2)" }}
      // The name is already the heading right below this, so the monogram is
      // decoration — announcing "AN" to a screen reader adds nothing.
      aria-hidden="true"
    >
      <span
        className="font-display text-4xl font-bold tracking-[-0.03em] select-none sm:text-5xl"
        style={{ color: thread(name) }}
      >
        {initials(name)}
      </span>
    </div>
  );
}
