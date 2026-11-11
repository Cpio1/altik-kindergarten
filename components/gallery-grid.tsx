"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SiteImage } from "@/lib/images";
import { Icon } from "./icons";

type Labels = {
  showMore: string;
  showLess: string;
  photoAlt: string;
  openPhoto: string;
  close: string;
  prev: string;
  next: string;
};

const INITIAL = 6;
const shapes = ["shape-leaf", "shape-petal", "shape-leaf-alt", "shape-petal", "shape-leaf-alt", "shape-leaf"];
// Мозаика: размер плитки зависит от ориентации фото, чтобы обрезка была минимальной.
// Ячейка ≈3:2 — для горизонтальных фото; вертикальные занимают две ячейки по высоте (≈3:4);
// часть горизонтальных становится крупной плиткой 2×2 — так, чтобы в сетке не было пустот.
type Tile = "1x1" | "2x2" | "1x2";
const BREAKPOINTS = [
  { cols: 2, cls: { "1x1": "", "2x2": "col-span-2 row-span-2", "1x2": "row-span-2" } },
  { cols: 3, cls: { "1x1": "sm:col-span-1 sm:row-span-1", "2x2": "sm:col-span-2 sm:row-span-2", "1x2": "sm:col-span-1 sm:row-span-2" } },
  { cols: 4, cls: { "1x1": "lg:col-span-1 lg:row-span-1", "2x2": "lg:col-span-2 lg:row-span-2", "1x2": "lg:col-span-1 lg:row-span-2" } },
] as const;

const isPortrait = (p: SiteImage) => p.height > p.width * 1.05;

/** Пустоты при авто-размещении CSS Grid: внутренние (дыры) и в хвосте последнего ряда. */
function countHoles(tiles: Tile[], cols: number) {
  const grid: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    for (let rr = r; rr < r + h; rr++) {
      grid[rr] ??= Array(cols).fill(false);
      for (let cc = c; cc < c + w; cc++) if (grid[rr][cc]) return false;
    }
    return true;
  };
  for (const t of tiles) {
    const w = t === "2x2" ? 2 : 1;
    const h = t === "1x1" ? 1 : 2;
    for (let r = 0, placed = false; !placed; r++) {
      for (let c = 0; c + w <= cols && !placed; c++) {
        if (!free(r, c, w, h)) continue;
        for (let rr = r; rr < r + h; rr++) for (let cc = c; cc < c + w; cc++) grid[rr][cc] = true;
        placed = true;
      }
    }
  }
  const last = grid[grid.length - 1] ?? [];
  const trailing = last.length - 1 - last.lastIndexOf(true);
  const total = grid.reduce((n, row) => n + row.filter((x) => !x).length, 0);
  return { inner: total - trailing, trailing };
}

/** Подбирает, какие горизонтальные фото сделать 2×2: без дыр, с минимумом крупных плиток, ближе к началу. */
function layout(photos: SiteImage[], cols: number) {
  const base: Tile[] = photos.map((p) => (isPortrait(p) ? "1x2" : "1x1"));
  const wide = base.flatMap((t, i) => (t === "1x1" ? [i] : [])).slice(0, 10);
  let best = { tiles: base, score: Infinity };
  for (let mask = 0; mask < 1 << wide.length; mask++) {
    const tiles = [...base];
    let score = 0;
    wide.forEach((idx, k) => {
      if (mask & (1 << k)) {
        tiles[idx] = "2x2";
        score += 10 + idx;
      }
    });
    const holes = countHoles(tiles, cols);
    score += holes.inner * 1000 + holes.trailing * 100;
    if (score < best.score) best = { tiles, score };
  }
  return best;
}

/** Чередует горизонтальные и вертикальные фото так, чтобы мозаика складывалась без дыр. */
function arrange(photos: SiteImage[]) {
  const land = photos.filter((p) => !isPortrait(p));
  const port = photos.filter(isPortrait);
  const interleave = (a: SiteImage[], b: SiteImage[], ka: number, kb: number) => {
    const out: SiteImage[] = [];
    for (let i = 0, j = 0; i < a.length || j < b.length; i += ka, j += kb) out.push(...a.slice(i, i + ka), ...b.slice(j, j + kb));
    return out;
  };
  const candidates = [photos];
  for (const [ka, kb] of [[1, 1], [2, 2], [2, 1], [1, 2], [2, 3], [3, 2]]) {
    candidates.push(interleave(land, port, ka, kb), interleave(port, land, kb, ka));
  }
  const cost = (order: SiteImage[]) =>
    BREAKPOINTS.reduce(
      (sum, bp) => sum + layout(order.slice(0, INITIAL), bp.cols).score + layout(order, bp.cols).score,
      0,
    );
  return candidates.map((order) => ({ order, c: cost(order) })).reduce((a, b) => (b.c < a.c ? b : a)).order;
}

const fill = (s: string, n: number) => s.replace("{n}", String(n));

export function GalleryGrid({ photos: source, labels }: { photos: SiteImage[]; labels: Labels }) {
  const photos = useMemo(() => arrange(source), [source]);
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = useMemo(() => (expanded ? photos : photos.slice(0, INITIAL)), [expanded, photos]);
  const spans = useMemo(() => {
    const perBp = BREAKPOINTS.map((bp) => layout(visible, bp.cols).tiles);
    return visible.map((_, i) => BREAKPOINTS.map((bp, b) => bp.cls[perBp[b][i]]).join(" "));
  }, [visible]);
  const isOpen = index !== null;

  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + photos.length) % photos.length)),
    [photos.length],
  );
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, go]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[7rem] grid-cols-2 gap-3 sm:auto-rows-[8.5rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[11.5rem] lg:grid-cols-4">
        {visible.map((photo, i) => (
          <li
            key={photo.src}
            className={`${spans[i]} animate-[pop-in_0.5s_ease_both]`}
            style={{ animationDelay: i >= INITIAL ? `${(i - INITIAL) * 50}ms` : undefined }}
          >
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={fill(labels.openPhoto, i + 1)}
              className={`group relative block size-full overflow-hidden bg-sky-soft shadow-soft ${shapes[i % shapes.length]}`}
            >
              <Image
                src={photo.src}
                alt={fill(labels.photoAlt, i + 1)}
                fill
                sizes="(min-width: 1024px) 50vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
                <span className="grid size-11 scale-75 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Icon name="camera" className="size-5" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {photos.length > INITIAL && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setExpanded((v) => !v)} className="btn btn-sky" aria-expanded={expanded}>
            {expanded ? labels.showLess : labels.showMore}
          </button>
        </div>
      )}

      {current && index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={fill(labels.photoAlt, index + 1)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-3 backdrop-blur-sm sm:p-8"
          onClick={close}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <figure
            key={current.src}
            className="relative animate-[pop-in_0.3s_ease_both]"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: `min(92vw, calc(82vh * ${current.width / current.height}), ${current.width}px)`,
              aspectRatio: `${current.width} / ${current.height}`,
            }}
          >
            <Image
              src={current.src}
              alt={fill(labels.photoAlt, index + 1)}
              fill
              sizes="92vw"
              className="rounded-3xl object-contain"
              priority
            />
            <figcaption className="absolute -bottom-9 left-0 w-full text-center text-sm font-semibold text-white/80">
              {index + 1} / {photos.length}
            </figcaption>
          </figure>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="absolute top-3 right-3 grid size-12 place-items-center rounded-full bg-white text-ink shadow-lift transition-transform hover:rotate-90"
          >
            <Icon name="close" className="size-6" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label={labels.prev}
                className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift hover:bg-white sm:left-5"
              >
                <Icon name="chevronLeft" className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label={labels.next}
                className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift hover:bg-white sm:right-5"
              >
                <Icon name="chevronRight" className="size-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
