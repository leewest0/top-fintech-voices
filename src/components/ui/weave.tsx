/**
 * The signature motif: a kente-style warp and weft, woven from the brand
 * palette. Purely decorative — one strip per voice, as the strapline goes.
 */
export function Weave({ cols = 9, rows = 14 }: { cols?: number; rows?: number }) {
  const palette = ["var(--w1)", "var(--w2)", "var(--w3)", "var(--w4)"];

  return (
    <div
      aria-hidden="true"
      className="grid h-full w-full gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const isWarp = (col + row) % 3 === 0;
        const isStrong = (col * 3 + row * 5) % 7 === 0;

        return (
          <span
            key={i}
            className={`block rounded-[2px] thread ${isStrong ? "thread-glow" : ""}`}
            style={{
              backgroundColor: palette[(col * 2 + row) % palette.length],
              opacity: isStrong ? 0.9 : isWarp ? 0.32 : 0.12,
              height: isWarp ? 14 : 8,
              animationDelay: `${row * 40 + col * 55}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

/** The animated warp rail used as a section divider. */
export function LoomRail() {
  return <div className="loom-rail" aria-hidden="true" />;
}
