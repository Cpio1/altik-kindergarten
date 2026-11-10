import type { Dictionary } from "@/lib/i18n";
import { fullAddress, site, twoGisRouteUrl, twoGisUrl, whatsappUrl } from "@/lib/site";
import { Cloud, Star } from "../decor";
import { Icon } from "../icons";
import { MapView } from "../map-view";

export function Contacts({ t }: { t: Dictionary }) {
  const c = t.contacts;
  const wa = whatsappUrl(c.whatsappMessage);

  const rows = [
    { icon: "pin", label: c.addressLabel, value: fullAddress, tone: "bg-peach-soft text-peach-deep" },
    { icon: "clock", label: c.hoursLabel, value: `${site.hours.open}–${site.hours.close}`, tone: "bg-sun-soft text-sun-deep" },
    {
      icon: "instagram",
      label: c.instagramLabel,
      value: site.instagram.handle,
      href: site.instagram.url,
      tone: "bg-sky-soft text-sky-deep",
    },
  ];

  return (
    <section id="contacts" className="section overflow-hidden">
      <Cloud className="animate-float-slow absolute top-16 -right-8 hidden w-32 md:block" color="var(--color-sky-soft)" />
      <Star className="animate-wiggle absolute bottom-24 left-[2%] hidden w-8 md:block" color="var(--color-mint)" />

      <div className="container-x">
        <div className="text-center">
          <p data-reveal className="eyebrow bg-mint-soft text-mint-deep">
            <Icon name="pin" className="size-4" />
            {c.eyebrow}
          </p>
          <h2 data-reveal className="section-title mt-3">
            {c.title}
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-ink-soft">
            {c.intro}
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-reveal="left" className="card shape-petal flex flex-col p-5 sm:p-7">
            <ul className="grid gap-4">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4">
                  <span className={`shape-pebble grid size-12 shrink-0 place-items-center ${r.tone}`}>
                    <Icon name={r.icon} className="size-6" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-display text-[0.85rem] font-extrabold tracking-wide text-ink-soft uppercase">{r.label}</p>
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display text-[1.1rem] font-extrabold break-words text-sky-deep hover:underline"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <p className="font-display text-[1.05rem] leading-snug font-bold break-words">{r.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-insta">
                <Icon name="instagram" className="size-5" />
                {c.instagramBtn}
              </a>
              {/* WhatsApp появится автоматически, когда в lib/site.ts будет указан номер */}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <Icon name="whatsapp" className="size-5" />
                  {c.whatsappBtn}
                </a>
              )}
            </div>
          </div>

          <div data-reveal="right" className="flex flex-col gap-3">
            <div className="shape-leaf relative h-[280px] overflow-hidden bg-sky-soft shadow-soft ring-4 ring-white sm:h-[340px] lg:h-[300px]">
              <MapView
                lat={site.geo.lat}
                lon={site.geo.lon}
                title={c.mapTitle}
                activateLabel={c.mapActivate}
                loadingLabel={c.mapLoading}
                popup={`${t.hero.titleName} ${t.hero.titleRest}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={twoGisUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-3 !text-[0.95rem]">
                <Icon name="external" className="size-5 shrink-0" />
                {c.open2gis}
              </a>
              <a href={twoGisRouteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-3 !text-[0.95rem]">
                <Icon name="route" className="size-5 shrink-0" />
                {c.route}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
