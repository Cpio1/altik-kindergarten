"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

type Props = { lat: number; lon: number; title: string; activateLabel: string; loadingLabel: string; popup: string };

/**
 * Интерактивная карта на тайлах 2ГИС (Leaflet). Чтобы карта не «перехватывала» прокрутку страницы,
 * перетаскивание и масштаб колёсиком включаются после первого нажатия на карту.
 */
export function MapView({ lat, lon, title, activateLabel, loadingLabel, popup }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(false);
  const mapRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    // Карта загружается, только когда блок приближается к экрану
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || map) return;
        io.disconnect();
        const L = (await import("leaflet")).default;
        if (cancelled) return;
        map = L.map(el, {
          center: [lat, lon],
          zoom: 16,
          scrollWheelZoom: false,
          dragging: false,
          tapHold: false,
          zoomControl: true,
          attributionControl: true,
        });
        L.tileLayer("https://tile{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1", {
          subdomains: "0123",
          maxZoom: 18,
          attribution: '&copy; <a href="https://2gis.kz" target="_blank" rel="noopener noreferrer">2ГИС</a>',
        }).addTo(map);
        const icon = L.divIcon({
          className: "altik-marker",
          iconSize: [44, 54],
          iconAnchor: [22, 52],
          popupAnchor: [0, -46],
          html: `<svg width="44" height="54" viewBox="0 0 44 54" aria-hidden="true"><path d="M22 52S4 34 4 21a18 18 0 0 1 36 0c0 13-18 31-18 31z" fill="#e27a33" stroke="#fff" stroke-width="3"/><circle cx="22" cy="21" r="7.5" fill="#ffd96b"/></svg>`,
        });
        L.marker([lat, lon], { icon, title: popup, alt: popup }).addTo(map).bindPopup(`<strong>${popup}</strong>`);
        mapRef.current = map;
        setReady(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
      mapRef.current = null;
    };
  }, [lat, lon, popup]);

  const activate = () => {
    const map = mapRef.current;
    if (!map) return;
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    setActive(true);
  };

  return (
    <div className="relative size-full">
      <div ref={ref} role="region" aria-label={title} className="absolute inset-0 z-0" />
      {!ready && (
        <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-ink-soft">{loadingLabel}</div>
      )}
      {ready && !active && (
        <button
          type="button"
          onClick={activate}
          className="absolute inset-0 z-[500] flex items-end justify-center bg-transparent pb-4"
        >
          <span className="rounded-full bg-white/95 px-4 py-2 font-display text-sm font-extrabold text-ink shadow-soft">
            {activateLabel}
          </span>
        </button>
      )}
    </div>
  );
}
