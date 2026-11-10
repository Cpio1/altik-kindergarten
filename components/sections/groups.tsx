import type { Dictionary } from "@/lib/i18n";
import { Cloud, Star, Wave } from "../decor";
import { Icon } from "../icons";

const tones = [
  { badge: "bg-sky text-white", soft: "bg-sky-soft", shape: "shape-leaf", accent: "var(--color-sky)" },
  { badge: "bg-sun text-ink", soft: "bg-sun-soft", shape: "shape-petal", accent: "var(--color-sun)" },
  { badge: "bg-peach text-white", soft: "bg-peach-soft", shape: "shape-leaf-alt", accent: "var(--color-peach)" },
  { badge: "bg-mint-deep text-white", soft: "bg-mint-soft", shape: "shape-petal", accent: "var(--color-mint)" },
];

export function Groups({ t }: { t: Dictionary }) {
  return (
    <section id="groups" className="relative">
      <Wave fill="var(--color-mint-soft)" />
      <div className="section overflow-hidden bg-mint-soft">
        <Cloud className="animate-float-slow absolute top-8 -right-6 w-28 sm:w-36" />
        <Star className="animate-wiggle absolute bottom-16 left-[3%] hidden w-9 md:block" color="var(--color-peach)" />

        <div className="container-x relative">
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div className="text-center lg:text-left">
              <p data-reveal className="eyebrow bg-white text-mint-deep">
                <Icon name="kids" className="size-4" />
                {t.groups.eyebrow}
              </p>
              <h2 data-reveal className="section-title mt-3">
                {t.groups.title}
              </h2>
              <p data-reveal className="mx-auto mt-3 max-w-xl text-ink-soft lg:mx-0">
                {t.groups.intro}
              </p>
            </div>

            {/* Общее количество групп — отдельно от возрастных категорий */}
            <div
              data-reveal="zoom"
              className="shape-blob mx-auto flex items-center gap-4 bg-white px-7 py-5 shadow-soft lg:mx-0"
            >
              <span className="font-display text-[3.2rem] leading-none font-black text-mint-deep">{t.groups.totalValue}</span>
              <span className="max-w-[11rem] font-display text-[1rem] leading-snug font-extrabold">{t.groups.totalLabel}</span>
            </div>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.groups.items.map((g, i) => {
              const tone = tones[i];
              return (
                <li
                  key={g.name}
                  data-reveal
                  style={{ ["--delay" as string]: `${i * 100}ms` }}
                  className={`card card-hover group relative overflow-hidden p-6 pt-7 ${tone.shape}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -top-10 -right-10 size-28 rounded-full transition-transform duration-500 group-hover:scale-125 ${tone.soft}`}
                  />
                  <span
                    className={`shape-pebble relative grid size-16 place-items-center font-display text-[1rem] leading-none font-black ${tone.badge}`}
                  >
                    {g.age}
                  </span>
                  <h3 className="relative mt-4 text-[1.2rem] font-black">{g.name}</h3>
                  <p className="relative mt-2 text-[0.93rem] leading-relaxed text-ink-soft">{g.text}</p>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-6 h-1.5 w-12 rounded-t-full"
                    style={{ background: tone.accent }}
                  />
                </li>
              );
            })}
          </ul>

          <p data-reveal className="mx-auto mt-8 max-w-2xl text-center text-[0.9rem] text-ink-soft">
            {t.groups.note}
          </p>
        </div>
      </div>
      <Wave fill="var(--color-mint-soft)" flip />
    </section>
  );
}
