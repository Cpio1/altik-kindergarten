import Image from "next/image";
import { images } from "@/lib/images";

/**
 * Логотип из public/images/logo.* с сохранением пропорций (object-contain, без растягивания).
 * Если файла нет — аккуратная текстовая эмблема с названием (не выдуманный логотип).
 */
export function Logo({ height = 44, alt, priority = false }: { height?: number; alt: string; priority?: boolean }) {
  const logo = images.logo;
  if (logo) {
    const width = Math.round((logo.width / logo.height) * height);
    return (
      <Image
        src={logo.src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        className="max-w-full object-contain"
        style={{ height, width: "auto" }}
        unoptimized={logo.src.endsWith(".svg")}
      />
    );
  }
  return (
    <span className="flex items-center gap-2" style={{ height }}>
      <span
        aria-hidden="true"
        className="shape-pebble grid shrink-0 place-items-center bg-sun font-display font-black text-ink"
        style={{ width: height, height, fontSize: height * 0.5 }}
      >
        А
      </span>
      <span className="font-display text-[1.35rem] leading-none font-black text-ink">
        Альтик
        <span className="sr-only"> бөбекжай-балабақшасы</span>
      </span>
    </span>
  );
}

export const hasLogo = Boolean(images.logo);
