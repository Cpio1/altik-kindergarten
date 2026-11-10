import data from "./images.generated.json";

export type SiteImage = { src: string; width: number; height: number; transparent: boolean };

type ImagesData = {
  logo: SiteImage | null;
  hero: SiteImage | null;
  about: SiteImage | null;
  gallery: SiteImage[];
};

/** Результат scripts/detect-images.mjs (обновляется автоматически перед dev и build). */
export const images = data as ImagesData;
