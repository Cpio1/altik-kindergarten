import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { RevealObserver } from "@/components/reveal-observer";
import { About } from "@/components/sections/about";
import { Clubs } from "@/components/sections/clubs";
import { Contacts } from "@/components/sections/contacts";
import { Documents } from "@/components/sections/documents";
import { Gallery } from "@/components/sections/gallery";
import { Groups } from "@/components/sections/groups";
import { Hero } from "@/components/sections/hero";
import { Nutrition } from "@/components/sections/nutrition";
import { getDictionary } from "@/lib/i18n";

export default function HomePage() {
  const t = getDictionary();
  return (
    <>
      <Header
        nav={t.nav}
        labels={t.a11y}
        ctaLabel={t.hero.contactBtn}
        logo={<Logo height={42} alt={t.a11y.logoAlt} priority />}
      />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Groups t={t} />
        <Nutrition t={t} />
        <Clubs t={t} />
        <Gallery t={t} />
        <Documents t={t} />
        <Contacts t={t} />
      </main>
      <Footer t={t} />
      <RevealObserver />
    </>
  );
}
