import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import { Dot, Flower, Star } from "../decor";
import { Icon } from "../icons";

const statStyles = [
  "bg-sky-soft text-sky-deep shape-pebble",
  "bg-sun-soft text-sun-deep shape-leaf",
  "bg-mint-soft text-mint-deep shape-petal",
  "bg-peach-soft text-peach-deep shape-leaf-alt",
];

const advantageColors = [
  { bg: "bg-sky-soft", fg: "text-sky-deep" },
  { bg: "bg-peach-soft", fg: "text-peach-deep" },
  { bg: "bg-mint-soft", fg: "text-mint-deep" },
  { bg: "bg-sun-soft", fg: "text-sun-deep" },
  { bg: "bg-sky-soft", fg: "text-sky-deep" },
];

export function About({ t }: { t: Dictionary }) {
  const photo = images.about;

  return (
    <section id="about" className="section overflow-hidden">
      <Flower className="animate-spin-slow absolute top-10 right-[4%] hidden w-12 opacity-80 md:block" color="var(--color-mint)" />
      <Dot className="absolute bottom-20 left-[2%] hidden size-6 md:block" color="var(--color-sun)" />

      <div className="container-x">
        <div className={`grid items-center gap-10 ${photo ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
          {photo && (
            <div data-reveal="left" className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
              <div aria-hidden="true" className="shape-blob absolute -inset-3 -z-10 -rotate-3 bg-peach-soft" />
              <div className="shape-petal relative aspect-[4/3.4] overflow-hidden shadow-lift">
                <Image
                  src={photo.src}
                  alt={t.a11y.aboutPhotoAlt}
                  fill
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover"
                />
              </div>
              <Star className="animate-wiggle absolute -top-4 -right-3 w-10" />
            </div>
          )}

          <div className={photo ? "" : "mx-auto max-w-3xl text-center"}>
            <p data-reveal className="eyebrow bg-peach-soft text-peach-deep">
              <Icon name="heart" className="size-4" />
              {t.about.eyebrow}
            </p>
            <h2 data-reveal className="section-title mt-3">
              {t.about.title}
            </h2>
            <div data-reveal className="mt-4 space-y-3 text-ink-soft sm:text-[1.05rem]">
              {t.about.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {t.about.stats.map((s, i) => (
                <li
                  key={s.label}
                  data-reveal="zoom"
                  style={{ ["--delay" as string]: `${i * 90}ms` }}
                  className={`flex flex-col items-center justify-center px-3 py-4 text-center ${statStyles[i]}`}
                >
                  <span className="font-display text-[1.9rem] leading-none font-black">{s.value}</span>
                  <span className="mt-1.5 text-[0.82rem] leading-snug font-semibold text-ink">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Блок преимуществ */}
        <div className="relative mt-14 sm:mt-16">
          <div aria-hidden="true" className="shape-cloud absolute inset-0 -z-10 bg-gradient-to-br from-sun-soft via-white to-mint-soft" />
          <div className="px-4 py-8 sm:px-8 sm:py-10">
            <h3 data-reveal className="text-center text-[clamp(1.35rem,3.5vw,1.9rem)] font-black">
              {t.about.advantagesTitle}
            </h3>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {t.about.advantages.map((a, i) => (
                <li
                  key={a.title}
                  data-reveal
                  style={{ ["--delay" as string]: `${i * 80}ms` }}
                  className={`card card-hover p-5 ${i % 2 ? "shape-leaf-alt" : "shape-leaf"} ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <span className={`shape-pebble grid size-12 place-items-center ${advantageColors[i].bg} ${advantageColors[i].fg}`}>
                    <Icon name={a.icon} className="size-6" />
                  </span>
                  <h4 className="mt-3 text-[1.05rem] font-extrabold">{a.title}</h4>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-soft">{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
