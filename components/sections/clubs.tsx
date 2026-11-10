import type { Dictionary } from "@/lib/i18n";
import { Cloud, Dot, Star, Sun, Wave } from "../decor";
import { Icon } from "../icons";

const palette = [
  { icon: "bg-sky text-white", glow: "bg-sky-soft", shape: "shape-leaf" },
  { icon: "bg-peach text-white", glow: "bg-peach-soft", shape: "shape-petal" },
  { icon: "bg-mint-deep text-white", glow: "bg-mint-soft", shape: "shape-leaf-alt" },
  { icon: "bg-sun text-ink", glow: "bg-sun-soft", shape: "shape-petal" },
  { icon: "bg-sky-deep text-white", glow: "bg-sky-soft", shape: "shape-leaf" },
];

export function Clubs({ t }: { t: Dictionary }) {
  return (
    <section id="clubs" className="relative">
      <Wave fill="var(--color-sun-soft)" />
      <div className="section isolate overflow-hidden bg-gradient-to-b from-sun-soft via-[#fff3e6] to-peach-soft">
        <Sun className="animate-spin-slow absolute top-6 right-[5%] -z-10 w-16 opacity-80 sm:w-20" />
        <Cloud className="animate-float absolute bottom-10 -left-8 -z-10 w-28 sm:w-36" />
        <Star className="animate-wiggle absolute top-[30%] left-[4%] -z-10 hidden w-8 md:block" color="var(--color-sky)" />
        <Dot className="absolute right-[12%] bottom-[18%] -z-10 hidden size-5 md:block" color="var(--color-mint)" />

        <div className="container-x">
          <div className="text-center">
            <p data-reveal className="eyebrow bg-white text-peach-deep">
              <Icon name="sparkle" className="size-4" />
              {t.clubs.eyebrow}
            </p>
            <h2 data-reveal className="section-title mt-3">
              {t.clubs.title}
            </h2>
            <p data-reveal className="mx-auto mt-3 max-w-xl text-ink-soft">
              {t.clubs.intro}
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5">
            {t.clubs.items.map((c, i) => (
              <li
                key={c.title}
                data-reveal
                style={{ ["--delay" as string]: `${i * 90}ms` }}
                className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
              >
                <article className={`card card-hover group relative h-full overflow-hidden p-6 ${palette[i].shape}`}>
                  <span
                    aria-hidden="true"
                    className={`absolute -right-8 -bottom-8 size-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${palette[i].glow}`}
                  />
                  <div className="relative flex items-start gap-4">
                    <span
                      className={`shape-pebble grid size-14 shrink-0 place-items-center transition-transform duration-500 group-hover:rotate-[14deg] group-hover:scale-110 ${palette[i].icon}`}
                    >
                      <Icon name={c.icon} className="size-7" />
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] font-black">{c.title}</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">{c.text}</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Wave fill="var(--color-peach-soft)" flip />
    </section>
  );
}
