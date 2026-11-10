import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Flower, Wave } from "../decor";
import { Icon } from "../icons";

/** Кнопка Google Drive появляется только когда в lib/site.ts указана ссылка documentsUrl. */
export function Documents({ t }: { t: Dictionary }) {
  const d = t.documents;
  const hasLink = Boolean(site.documentsUrl);

  return (
    <section id="documents" className="relative">
      <Wave fill="var(--color-sky-soft)" />
      <div className="section overflow-hidden bg-sky-soft !py-12 sm:!py-16">
        <Flower className="animate-spin-slow absolute top-8 left-[5%] hidden w-10 md:block" color="var(--color-peach)" />
        <div className="container-x">
          <div
            data-reveal
            className="shape-leaf mx-auto flex max-w-3xl flex-col items-center gap-5 bg-white p-6 text-center shadow-soft sm:flex-row sm:p-8 sm:text-left"
          >
            <span className="shape-blob grid size-20 shrink-0 place-items-center bg-sun-soft text-sun-deep">
              <Icon name="folder" className="size-10" />
            </span>
            <div className="flex-1">
              <p className="eyebrow bg-sky-soft !px-3 !py-1 text-sky-deep">{d.eyebrow}</p>
              <h2 className="section-title mt-2 !text-[clamp(1.4rem,3.6vw,1.9rem)]">
                {hasLink ? d.title : d.pendingTitle}
              </h2>
              <p className="mt-2 text-ink-soft">{hasLink ? d.linkText : d.pendingText}</p>
            </div>
            {hasLink ? (
              <a href={site.documentsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sky shrink-0">
                {d.openBtn}
                <Icon name="external" className="size-5" />
              </a>
            ) : (
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-insta shrink-0">
                <Icon name="instagram" className="size-5" />
                {d.pendingBtn}
              </a>
            )}
          </div>
        </div>
      </div>
      <Wave fill="var(--color-sky-soft)" flip />
    </section>
  );
}
