import type { Dictionary } from "@/lib/i18n";
import { fullAddress, site } from "@/lib/site";
import { Star, Wave } from "./decor";
import { Icon } from "./icons";
import { Logo } from "./logo";

export function Footer({ t }: { t: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-6">
      <Wave fill="var(--color-ink)" />
      <div className="relative overflow-hidden bg-ink pt-8 pb-8 text-white/85">
        <Star className="animate-spin-slow absolute top-6 right-[6%] w-10 opacity-60" />
        <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <a
              href="#home"
              aria-label={t.a11y.toHome}
              className="shape-leaf inline-flex h-16 items-center bg-white px-4 py-2"
            >
              <Logo height={44} alt={t.a11y.logoAlt} />
            </a>
            <p className="mt-4 font-display text-lg font-extrabold text-white">{site.fullName}</p>
            <p className="mt-1 max-w-xs text-sm text-white/70">{t.hero.subtitle}</p>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <p className="font-display font-extrabold text-sun">{t.footer.navTitle}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.95rem]">
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="inline-block py-1 hover:text-sun">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display font-extrabold text-sun">{t.footer.contactsTitle}</p>
            <ul className="mt-3 grid gap-2.5 text-[0.95rem]">
              <li className="flex gap-2.5">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-peach" />
                <span>{fullAddress}</span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-sun" />
                <span>
                  {site.hours.open}–{site.hours.close}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="instagram" className="mt-0.5 size-5 shrink-0 text-sky" />
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-sun">
                  {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-x mt-8 border-t border-white/10 pt-5 text-center text-[0.85rem] text-white/60">
          © {year} {site.fullName}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
