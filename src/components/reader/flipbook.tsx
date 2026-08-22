"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { pageImage } from "@/lib/magazine";

const TURN_MS = 620;

type Turning = { dir: "forward" | "back"; front: number; back: number } | null;

/**
 * One page. Declared at module scope on purpose: a component created inside
 * render is a fresh type on every state change, so React would unmount and
 * refetch each page image on every turn.
 */
function Sheet({
  page,
  side,
  pages,
  spread,
}: {
  page: number;
  side: "left" | "right";
  pages: number;
  spread: boolean;
}) {
  const exists = page >= 1 && page <= pages;
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        side === "left" ? "page-gutter-left" : "page-gutter-right"
      }`}
      style={{ background: "var(--surface-2)" }}
    >
      {exists && (
        <Image
          src={pageImage(page)}
          alt={`Page ${page}`}
          fill
          sizes={spread ? "(max-width: 900px) 100vw, 48vw" : "100vw"}
          priority={page <= 2}
          className="object-contain"
        />
      )}
    </div>
  );
}

/**
 * A page-turning reader for a pre-rasterised edition.
 *
 * Paged like the printed magazine: leaf n carries pages 2n+1 and 2n+2, so the
 * cover sits alone on the right and every spread after it pairs an even page on
 * the left with the odd page that faces it. `leaf` is how many leaves have been
 * turned, which makes the visible pages 2·leaf and 2·leaf+1.
 *
 * Narrow screens read one page at a time instead — a spread at phone width puts
 * body text below the size anyone can read.
 */
export function Flipbook({ pages, aspect }: { pages: number; aspect: number }) {
  const leaves = Math.ceil(pages / 2);

  const [leaf, setLeaf] = useState(0);
  const [single, setSingle] = useState(1); // 1-based page, narrow layout
  const [spread, setSpread] = useState(true);
  const [turning, setTurning] = useState<Turning>(null);
  const [showIndex, setShowIndex] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One page or two, decided by width rather than by device guesswork.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const apply = () => setSpread(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const exists = (page: number) => page >= 1 && page <= pages;
  const leftPage = leaf * 2; // 0 on the cover spread, which shows nothing left
  const rightPage = leaf * 2 + 1;

  const go = useCallback(
    (dir: "forward" | "back") => {
      if (turning) return;

      if (!spread) {
        setSingle((p) => Math.min(pages, Math.max(1, p + (dir === "forward" ? 1 : -1))));
        return;
      }

      const target = dir === "forward" ? leaf + 1 : leaf - 1;
      if (target < 0 || target > leaves) return;

      // The faces of the sheet that moves: for a forward turn it is the page
      // being left behind and the one revealed beneath it.
      setTurning(
        dir === "forward"
          ? { dir, front: leaf * 2 + 1, back: leaf * 2 + 2 }
          : { dir, front: target * 2 + 1, back: target * 2 + 2 },
      );

      timer.current = setTimeout(() => {
        setLeaf(target);
        setTurning(null);
      }, TURN_MS);
    },
    [turning, spread, leaf, leaves, pages],
  );

  const jump = useCallback(
    (page: number) => {
      if (turning) return;
      setShowIndex(false);
      if (spread) setLeaf(Math.floor(page / 2));
      else setSingle(page);
    },
    [turning, spread],
  );

  // Deep links: /read#page-30 opens at that page, and the in-page contents
  // links work too, since the component does not remount between them.
  useEffect(() => {
    const fromHash = () => {
      const match = /^#page-(\d+)$/.exec(window.location.hash);
      if (!match) return;
      const page = Number(match[1]);
      if (page < 1 || page > pages) return;
      if (spread) setLeaf(Math.floor(page / 2));
      else setSingle(page);
      frameRef.current?.scrollIntoView({ block: "center" });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [pages, spread]);

  // Keyboard: arrows turn, Home/End jump, Escape leaves fullscreen.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        go("forward");
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go("back");
      } else if (event.key === "Home") {
        jump(1);
      } else if (event.key === "End") {
        jump(pages);
      } else if (event.key === "Escape") {
        if (showIndex) setShowIndex(false);
        else if (fullscreen) setFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, jump, pages, showIndex, fullscreen]);

  // Swipe.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const down = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
    };
    const up = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? "forward" : "back");
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [go]);

  const current = spread ? Math.max(1, rightPage) : single;
  const atStart = spread ? leaf === 0 : single === 1;
  const atEnd = spread ? leaf >= leaves : single >= pages;

  const label = spread
    ? exists(leftPage) && exists(rightPage)
      ? `Pages ${leftPage}–${rightPage}`
      : `Page ${exists(rightPage) ? rightPage : leftPage}`
    : `Page ${single}`;

  const book = (
    <div
      ref={frameRef}
      className="book relative mx-auto w-full touch-pan-y select-none"
      style={{
        // Height-led, so a spread always fits the window; the width follows
        // from the page aspect rather than being capped independently.
        width: `min(100%, calc(${fullscreen ? 82 : 74}vh * ${(spread ? 2 : 1) / aspect}))`,
        aspectRatio: `${(spread ? 2 : 1) / aspect}`,
      }}
    >
      <div className="absolute inset-0 flex" style={{ boxShadow: "var(--shadow)" }}>
        {spread && (
          <div className="relative h-full w-1/2">
            {/* Stays on the outgoing page: the turning leaf lands on top of
                it, the way a real sheet covers what was underneath. */}
            <Sheet page={turning?.dir === "back" ? leftPage - 2 : leftPage} side="left" pages={pages} spread={spread} />
          </div>
        )}

        <div className={`relative h-full ${spread ? "w-1/2" : "w-full"}`}>
          <Sheet
            page={
              !spread ? single : turning?.dir === "forward" ? rightPage + 2 : rightPage
            }
            side="right"
            pages={pages}
            spread={spread}
          />

          {turning && spread && (
            <div
              className={`leaf ${
                turning.dir === "forward" ? "leaf-turning-forward" : "leaf-turning-back"
              }`}
              style={{ ["--turn-duration" as string]: `${TURN_MS}ms` }}
              aria-hidden="true"
            >
              <div className="leaf-face page-gutter-right">
                <Sheet page={turning.front} side="right" pages={pages} spread={spread} />
              </div>
              <div className="leaf-face leaf-back page-gutter-left">
                <Sheet page={turning.back} side="left" pages={pages} spread={spread} />
              </div>
            </div>
          )}

          {turning && spread && <div className="leaf-shade" aria-hidden="true" />}
        </div>
      </div>

      {/* Click the outer third of either page to turn it. */}
      <button
        type="button"
        onClick={() => go("back")}
        disabled={atStart}
        aria-label="Previous page"
        className="absolute inset-y-0 left-0 w-1/4 cursor-w-resize disabled:cursor-default"
      />
      <button
        type="button"
        onClick={() => go("forward")}
        disabled={atEnd}
        aria-label="Next page"
        className="absolute inset-y-0 right-0 w-1/4 cursor-e-resize disabled:cursor-default"
      />
    </div>
  );

  const controls = (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => go("back")}
        disabled={atStart || !!turning}
        aria-label="Previous page"
        className="btn btn-ghost inline-flex rounded-full p-3 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      <p
        className="min-w-[10rem] text-center font-mono text-[11px] tracking-[0.2em] uppercase"
        aria-live="polite"
        style={{ color: "var(--muted)" }}
      >
        {label} <span style={{ opacity: 0.5 }}>of {pages}</span>
      </p>

      <button
        type="button"
        onClick={() => go("forward")}
        disabled={atEnd || !!turning}
        aria-label="Next page"
        className="btn btn-ghost inline-flex rounded-full p-3 disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>

      <span className="mx-1 hidden h-6 w-px sm:block" style={{ background: "var(--line)" }} />

      <button
        type="button"
        onClick={() => setShowIndex(true)}
        className="btn btn-ghost inline-flex items-center gap-2 px-4 py-2.5 text-sm"
      >
        <Grid3x3 size={15} /> All pages
      </button>
      <button
        type="button"
        onClick={() => setFullscreen((v) => !v)}
        className="btn btn-ghost inline-flex items-center gap-2 px-4 py-2.5 text-sm"
      >
        {fullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        {fullscreen ? "Exit" : "Fullscreen"}
      </button>
    </div>
  );

  return (
    <>
      {fullscreen ? (
        <div
          className="fixed inset-0 z-100 flex flex-col justify-center overflow-auto p-4 sm:p-8"
          style={{ background: "var(--bg)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Reading the magazine"
        >
          {book}
          {controls}
        </div>
      ) : (
        <>
          {book}
          {controls}
        </>
      )}

      {showIndex && (
        <div
          className="fixed inset-0 z-100 overflow-auto p-5 sm:p-10"
          style={{ background: "var(--bg)" }}
          role="dialog"
          aria-modal="true"
          aria-label="All pages"
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-8 flex items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em]">All {pages} pages</h2>
              <button
                type="button"
                onClick={() => setShowIndex(false)}
                aria-label="Close"
                className="btn btn-ghost inline-flex rounded-full p-2.5"
              >
                <X size={16} />
              </button>
            </div>

            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button
                    type="button"
                    onClick={() => jump(page)}
                    className="group block w-full"
                    aria-label={`Go to page ${page}`}
                    aria-current={page === current || undefined}
                  >
                    <span
                      className="relative block w-full overflow-hidden rounded"
                      style={{
                        aspectRatio: `${1 / aspect}`,
                        border: `1px solid ${page === current ? "var(--accent)" : "var(--line)"}`,
                        outline: page === current ? "1px solid var(--accent)" : undefined,
                      }}
                    >
                      <Image
                        src={pageImage(page, "thumb")}
                        alt=""
                        fill
                        sizes="160px"
                        loading="lazy"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                    <span
                      className="mt-1.5 block font-mono text-[10px]"
                      style={{ color: page === current ? "var(--accent)" : "var(--muted)" }}
                    >
                      {page}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
