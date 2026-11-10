import type { Dictionary } from "@/lib/i18n";
import { Flower, Squiggle } from "../decor";
import { Icon } from "../icons";
import { FoodIllustration } from "../illustrations";

const blobs = [
  { bg: "bg-sun-soft", ring: "bg-sun/50", shape: "shape-blob" },
  { bg: "bg-mint-soft", ring: "bg-mint/50", shape: "shape-pebble" },
  { bg: "bg-peach-soft", ring: "bg-peach/45", shape: "shape-blob" },
  { bg: "bg-sky-soft", ring: "bg-sky/50", shape: "shape-pebble" },
];

export function Nutrition({ t }: { t: Dictionary }) {
  return (
    <section id="nutrition" className="section overflow-hidden">
      <Flower className="animate-spin-slow absolute top-14 left-[4%] hidden w-11 md:block" color="var(--color-sun)" />
      <div className="container-x">
        <div className="text-center">
          <p data-reveal className="eyebrow bg-sun-soft text-sun-deep">
            <Icon name="meal" className="size-4" />
            {t.nutrition.eyebrow}
          </p>
          <h2 data-reveal className="section-title mt-3">
            {t.nutrition.title}
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-ink-soft">
            {t.nutrition.intro}
          </p>
        </div>

        <div className="relative isolate mt-10">
          <Squiggle
            className="absolute top-[4.6rem] left-[10%] -z-10 hidden h-4 w-[80%] opacity-60 lg:block"
            color="var(--color-sky)"
          />
          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
            {t.nutrition.items.map((m, i) => (
              <li
                key={m.title}
                data-reveal
                style={{ ["--delay" as string]: `${i * 110}ms` }}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative size-32 sm:size-40">
                  <span
                    aria-hidden="true"
                    className={`animate-morph absolute inset-0 rotate-12 ${blobs[i].ring}`}
                    style={{ animationDelay: `${-i * 3}s` }}
                  />
                  <span
                    className={`${blobs[i].shape} absolute inset-2 grid place-items-center shadow-soft transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105 ${blobs[i].bg}`}
                  >
                    <FoodIllustration kind={m.icon} className="w-[72%]" />
                  </span>
                  <span className="absolute -top-1 -left-1 grid size-8 place-items-center rounded-full bg-white font-display text-sm font-black text-ink shadow-soft">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-[1.15rem] font-black">{m.title}</h3>
                <p className="mt-1 max-w-[15rem] text-[0.9rem] leading-relaxed text-ink-soft">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <p data-reveal className="mx-auto mt-10 max-w-xl text-center text-[0.9rem] text-ink-soft">
          {t.nutrition.note}
        </p>
      </div>
    </section>
  );
}
