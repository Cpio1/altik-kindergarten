import type { Dictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { Cloud, Star } from "../decor";
import { GalleryGrid } from "../gallery-grid";
import { Icon } from "../icons";

/**
 * Фото берутся из public/images автоматически (см. scripts/detect-images.mjs).
 * Пока снимков нет — показываем приглашение в Instagram, а не чужие фотографии.
 */
export function Gallery({ t }: { t: Dictionary }) {
  const photos = images.gallery;
  const g = t.gallery;

  return (
    <section id="gallery" className="section overflow-hidden">
      <Star className="animate-wiggle absolute top-12 right-[6%] hidden w-9 md:block" color="var(--color-sky)" />
      <div className="container-x">
        <div className="text-center">
          <p data-reveal className="eyebrow bg-sky-soft text-sky-deep">
            <Icon name="camera" className="size-4" />
            {g.eyebrow}
          </p>
          <h2 data-reveal className="section-title mt-3">
            {g.title}
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-ink-soft">
            {g.intro}
          </p>
        </div>

        <div data-reveal className="mt-10">
          {photos.length > 0 ? (
            <GalleryGrid
              photos={photos}
              labels={{
                showMore: g.showMore,
                showLess: g.showLess,
                photoAlt: g.photoAlt,
                openPhoto: g.openPhoto,
                close: g.close,
                prev: g.prev,
                next: g.next,
              }}
            />
          ) : (
            <div className="shape-cloud relative mx-auto max-w-2xl overflow-hidden bg-gradient-to-br from-sky-soft to-mint-soft px-6 py-10 text-center sm:px-10">
              <Cloud className="animate-float-slow absolute -top-2 -left-4 w-24 opacity-90" />
              <span className="shape-pebble relative mx-auto grid size-16 place-items-center bg-white text-sky-deep shadow-soft">
                <Icon name="camera" className="size-8" />
              </span>
              <h3 className="relative mt-4 text-[1.3rem] font-black">{g.emptyTitle}</h3>
              <p className="relative mx-auto mt-2 max-w-md text-ink-soft">{g.emptyText}</p>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-insta relative mt-6">
                <Icon name="instagram" className="size-5" />
                {g.emptyBtn}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
