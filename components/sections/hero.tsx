import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import { Cloud, Dot, Flower, Squiggle, Star, Sun, Wave } from "../decor";
import { Icon } from "../icons";
import { KindergartenIllustration } from "../illustrations";
import { Logo } from "../logo";

export function Hero({ t }: { t: Dictionary }) {
  const photo = images.hero;
  const logo = images.logo;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-gradient-to-b from-sky-soft to-[#f6fbff] pt-[76px] lg:pt-[96px]">
      {/* фоновые фигурки — только по краям, чтобы не перекрывать текст */}
      <Cloud className="animate-float-slow absolute top-20 -left-6 -z-10 w-24 opacity-90 sm:w-32 lg:top-28 lg:left-6" />
      <Cloud className="animate-float absolute top-16 right-[38%] -z-10 hidden w-24 opacity-80 lg:block" />
      <Dot className="absolute bottom-24 left-[46%] -z-10 hidden size-4 lg:block" color="var(--color-peach)" />
      <Star className="animate-wiggle absolute top-[42%] left-[3%] -z-10 hidden w-8 lg:block" color="var(--color-mint)" />

      <div className="container-x grid items-center gap-8 pb-10 sm:pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-16">
        <div className="relative z-10 text-center lg:text-left">
          <p data-reveal className="eyebrow bg-white/80 text-sky-deep shadow-soft">
            <Icon name="pin" className="size-4" />
            {t.hero.location}
          </p>

          <h1 data-reveal style={{ ["--delay" as string]: "80ms" }} className="mt-4 font-black text-ink">
            <span className="relative inline-block text-[clamp(2.7rem,10vw,5rem)] leading-none text-peach-deep">
              {t.hero.titleName}
              <Squiggle className="absolute -bottom-3.5 left-1/2 h-3 w-[64%] -translate-x-1/2 sm:h-3.5 lg:left-1 lg:translate-x-0" color="var(--color-sun)" />
            </span>
            <span className="mt-4 block text-[clamp(1.45rem,4.6vw,2.4rem)] leading-tight">{t.hero.titleRest}</span>
          </h1>

          <p
            data-reveal
            style={{ ["--delay" as string]: "160ms" }}
            className="mx-auto mt-4 max-w-[30rem] text-[1.05rem] text-ink-soft sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </p>

          <div
            data-reveal
            style={{ ["--delay" as string]: "240ms" }}
            className="mt-7 flex flex-col justify-center gap-3 min-[420px]:flex-row lg:justify-start"
          >
            <a href="#about" className="btn btn-primary">
              {t.hero.aboutBtn}
              <Icon name="arrow" className="size-5" />
            </a>
            <a href="#contacts" className="btn btn-ghost">
              {t.hero.contactBtn}
            </a>
          </div>

          <ul
            data-reveal
            style={{ ["--delay" as string]: "320ms" }}
            className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
          >
            {t.hero.chips.map((chip, i) => (
              <li
                key={chip}
                className={`rounded-full px-3.5 py-1.5 font-display text-sm font-extrabold ${
                  ["bg-sun-soft text-sun-deep", "bg-mint-soft text-mint-deep", "bg-peach-soft text-peach-deep"][i % 3]
                }`}
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Композиция: фото в органической форме + плавающие фигурки */}
        <div data-reveal="zoom" className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
          <div aria-hidden="true" className="animate-morph absolute -inset-3 -z-10 rotate-6 bg-sun/70 sm:-inset-4" />
          <div aria-hidden="true" className="animate-morph absolute -inset-1 -z-10 -rotate-6 bg-mint/60 [animation-delay:-5s]" />

          <div className="animate-morph relative aspect-square overflow-hidden bg-white shadow-lift ring-[6px] ring-white">
            {photo ? (
              <Image
                src={photo.src}
                alt={t.a11y.heroPhotoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 90vw"
                className="object-cover"
              />
            ) : (
              <KindergartenIllustration className="size-full" title={t.a11y.illustrationAlt} />
            )}
          </div>

          <Sun className="animate-spin-slow absolute -top-5 -right-2 w-16 sm:-top-6 sm:w-20" />
          <Star className="animate-float absolute top-[18%] -left-4 w-9 sm:-left-7 sm:w-11" color="var(--color-peach)" />
          <Flower className="animate-wiggle absolute -bottom-3 left-[12%] w-10 sm:w-12" color="var(--color-sky)" />
          <Dot className="animate-float-slow absolute right-[8%] bottom-[6%] size-5" color="var(--color-peach)" />

          {logo && (
            <div className="shape-pebble animate-float-slow absolute -right-1 bottom-[14%] grid size-24 place-items-center bg-white p-3 shadow-lift sm:-right-5 sm:size-28">
              <Logo height={64} alt={t.a11y.logoAlt} />
            </div>
          )}
        </div>
      </div>

      <Wave fill="#ffffff" className="-mb-px" />
    </section>
  );
}
