/**
 * Фактические данные садика. Всё, что здесь пусто, на сайте не показывается.
 * Чтобы добавить WhatsApp или ссылку на документы — заполните поле и пересоберите сайт.
 */
export const site = {
  fullName: "ЖШС «Альтик» бөбекжай-балабақшасы",
  shortName: "«Альтик»",
  address: {
    region: "Алматы облысы",
    district: "Жамбыл ауданы",
    locality: "Ұзынағаш ауылы",
    street: "Сәтпаев көшесі, 287",
    postalCode: "040600",
  },
  hours: { open: "07:30", close: "18:00" },
  groupsCount: 6,
  ages: { from: 2, to: 5 },
  instagram: {
    url: "https://www.instagram.com/altik_sadik/",
    handle: "@altik_sadik",
  },
  /** Номер WhatsApp в международном формате без «+» и пробелов, напр. "77001234567". Пока не предоставлен. */
  whatsapp: "",
  /** Ссылка на папку Google Drive с документами. Пока не предоставлена. */
  documentsUrl: "",
  /** Координаты здания (Сәтпаев көшесі, 287, Ұзынағаш). */
  geo: { lat: 43.1983365, lon: 76.3222495 },
} as const;

export const fullAddress = [
  site.address.region,
  site.address.district,
  site.address.locality,
  site.address.street,
].join(", ");

export const twoGisUrl = `https://2gis.kz/almaty?m=${site.geo.lon}%2C${site.geo.lat}%2F17`;
export const twoGisRouteUrl = `https://2gis.kz/almaty/directions/points/%7C${site.geo.lon}%2C${site.geo.lat}`;

export function whatsappUrl(message: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Адрес сайта для canonical, sitemap и Open Graph. Свой домен задаётся через NEXT_PUBLIC_SITE_URL,
 * иначе на Vercel берётся production-адрес проекта.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
