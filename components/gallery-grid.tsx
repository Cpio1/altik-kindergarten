"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
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
// Мозаика на десктопе: крупные и обычные плитки чередуются
const spans = ["lg:col-span-2 lg:row-span-2", "", "lg:row-span-2", "", "lg:col-span-2", "lg:col-span-2"];

const fill = (s: string, n: number) => s.replace("{n}", String(n));

export function GalleryGrid({ photos, labels }: { photos: SiteImage[]; labels: Labels }) {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = expanded ? photos : photos.slice(0, INITIAL);
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
      <ul className="grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[11.5rem] lg:grid-cols-4">
        {visible.map((photo, i) => (
          <li
            key={photo.src}
            className={`${i < INITIAL ? spans[i] : ""} animate-[pop-in_0.5s_ease_both]`}
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
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 33vw, 50vw"
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
