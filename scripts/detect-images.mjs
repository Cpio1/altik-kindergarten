/**
 * Сканирует public/images и записывает найденные изображения и их размеры
 * в lib/images.generated.json. Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 * Соглашение об именах файлов:
 *   logo.*        — логотип (лучше PNG/WebP/SVG с прозрачным фоном)
 *   main-page.*   — фото главного экрана (если положить main-page.png, он возьмётся вместо JPEG)
 *   ABOUT_PHOTO   — фото раздела «Біз туралы» (имя без расширения задаётся ниже)
 *   EXCLUDED      — файлы, которые не показываются на сайте нигде (например, main-page2)
 *   любые другие  — попадают в галерею (сортировка по имени: image1, image2, …, image10)
 *
 * Если у файла несколько форматов с одним именем, берётся PNG → WebP → AVIF → JPG → SVG.
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, "public", "images");
const EXT_RANK = [".png", ".webp", ".avif", ".jpg", ".jpeg", ".svg"];
const SPECIAL = { logo: "logo", hero: "main-page" };
/** Фото для «Біз туралы» — одно из обычных фото; в галерее оно не дублируется. */
const ABOUT_PHOTO = "image5";
/** Эти файлы могут лежать в папке, но на сайт не попадают никогда. */
const EXCLUDED = new Set(["main-page2"]);

let files = [];
try {
  files = (await readdir(dir)).filter((f) => EXT_RANK.includes(path.extname(f).toLowerCase()) && !f.startsWith("."));
} catch {
  console.warn("[images] папка public/images не найдена");
}

async function describe(file) {
  const full = path.join(dir, file);
  try {
    const meta = await sharp(full).metadata();
    if (!meta.width || !meta.height) return null;
    const rotated = (meta.orientation ?? 1) >= 5; // EXIF 5–8 — поворот на 90°
    return {
      src: `/images/${encodeURIComponent(file)}`,
      width: rotated ? meta.height : meta.width,
      height: rotated ? meta.width : meta.height,
      transparent: Boolean(meta.hasAlpha) || meta.format === "svg",
    };
  } catch {
    console.warn(`[images] ${file}: не удалось прочитать файл — пропущен`);
    return null;
  }
}

/** Группируем по имени без расширения и оставляем лучший формат. */
const byBase = new Map();
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, path.extname(file)).toLowerCase();
  if (EXCLUDED.has(base)) continue;
  const prev = byBase.get(base);
  if (!prev || EXT_RANK.indexOf(ext) < EXT_RANK.indexOf(path.extname(prev).toLowerCase())) byBase.set(base, file);
}

const result = { logo: null, hero: null, about: null, gallery: [] };
for (const [key, base] of Object.entries(SPECIAL)) {
  const file = byBase.get(base);
  if (file) result[key] = await describe(file);
}
if (byBase.has(ABOUT_PHOTO)) result.about = await describe(byBase.get(ABOUT_PHOTO));


const specialBases = new Set([...Object.values(SPECIAL), ABOUT_PHOTO]);
const galleryFiles = [...byBase.entries()]
  .filter(([base]) => !specialBases.has(base) && !base.startsWith("og"))
  .map(([, file]) => file)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const file of galleryFiles) {
  const info = await describe(file);
  if (info) result.gallery.push(info);
}

await writeFile(path.join(root, "lib", "images.generated.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  `[images] logo: ${result.logo ? "есть" : "нет"}, main-page: ${result.hero ? "есть" : "нет"}, ` +
    `«Біз туралы»: ${result.about ? ABOUT_PHOTO : "нет"}, галерея: ${result.gallery.length}`,
);
