"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "./icons";

type NavItem = { id: string; label: string };
type Labels = { openMenu: string; closeMenu: string; mainNav: string; toHome: string };

export function Header({
  nav,
  labels,
  logo,
  ctaLabel,
}: {
  nav: NavItem[];
  labels: Labels;
  logo: ReactNode;
  ctaLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0]?.id ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка текущего раздела в меню
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [nav]);

  // Блокируем прокрутку страницы под открытым мобильным меню; Esc закрывает меню
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_6px_24px_-14px_rgb(35_49_73/0.35)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[60px] items-center justify-between gap-3 lg:h-[72px]">
        <a href="#home" onClick={close} aria-label={labels.toHome} className="flex h-10 shrink-0 items-center lg:h-12">
          {logo}
        </a>

        <nav aria-label={labels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`relative rounded-full px-2.5 py-2 font-display text-[0.95rem] font-bold transition-colors xl:px-3.5 ${
                    active === item.id ? "bg-sky-soft text-sky-deep" : "text-ink hover:bg-sun-soft"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#contacts" className="btn btn-primary hidden !min-h-10 !px-5 !text-[0.95rem] xl:inline-flex">
          {ctaLabel}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          className="grid size-11 place-items-center rounded-2xl bg-sun-soft text-ink transition-colors hover:bg-sun lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>
    </header>

      {/* Мобильное меню — вне <header>: backdrop-filter шапки иначе ограничил бы fixed-позиционирование */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[60px] bottom-0 z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-10 -right-14 size-44 rounded-full bg-sun-soft" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-10 -left-16 size-48 rounded-full bg-mint-soft" />
        <nav aria-label={labels.mainNav} className="relative container-x pt-4 pb-8">
          <ul className="grid gap-2">
            {nav.map((item, i) => (
              <li
                key={item.id}
                className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 font-display text-lg font-extrabold ${
                    active === item.id ? "bg-sky-soft text-sky-deep" : "text-ink active:bg-sun-soft"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ background: ["var(--color-peach)", "var(--color-sky)", "var(--color-mint)", "var(--color-sun)"][i % 4] }}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacts" onClick={close} className="btn btn-primary mt-6 w-full">
            {ctaLabel}
          </a>
        </nav>
      </div>
    </>
  );
}
