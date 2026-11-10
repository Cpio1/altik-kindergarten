/**
 * Сканирует public/images и записывает найденные изображения и их размеры
 * в lib/images.generated.json. Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 * Соглашение об именах файлов:
 *   logo.*        — логотип (лучше PNG/WebP/SVG с прозрачным фоном)
 *   main-page.*   — фото главного экрана
 *   main-page2.*  — фото раздела «Біз туралы»
 *   любые другие  — попадают в галерею (сортировка по имени: 01.jpg, 02.jpg, …)
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
const SPECIAL = { logo: "logo", hero: "main-page", about: "main-page2" };

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
  const prev = byBase.get(base);
  if (!prev || EXT_RANK.indexOf(ext) < EXT_RANK.indexOf(path.extname(prev).toLowerCase())) byBase.set(base, file);
}

const result = { logo: null, hero: null, about: null, gallery: [] };
for (const [key, base] of Object.entries(SPECIAL)) {
  const file = byBase.get(base);
  if (file) result[key] = await describe(file);
}

const specialBases = new Set(Object.values(SPECIAL));
const galleryFiles = [...byBase.entries()]
  .filter(([base]) => !specialBases.has(base) && !base.startsWith("og"))
  .map(([, file]) => file)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

for (const file of galleryFiles) {
  const info = await describe(file);
  if (info) result.gallery.push(info);
}
// Фото главного экрана и «Біз туралы» тоже показываем в галерее — это реальные снимки садика.
for (const key of ["hero", "about"]) {
  if (result[key]) result.gallery.push(result[key]);
}

await writeFile(path.join(root, "lib", "images.generated.json"), JSON.stringify(result, null, 2) + "\n");
console.log(
  `[images] logo: ${result.logo ? "есть" : "нет"}, main-page: ${result.hero ? "есть" : "нет"}, ` +
    `main-page2: ${result.about ? "есть" : "нет"}, галерея: ${result.gallery.length}`,
);
