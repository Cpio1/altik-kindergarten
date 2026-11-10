import { kk, type Dictionary } from "./kk";

/** Подключённые языки. Для русской версии: import { ru } from "./ru"; и добавьте ru в объект. */
const dictionaries = { kk } satisfies Record<string, Dictionary>;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "kk";

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}

/** Подставляет значения в шаблон вида "фото {n}". */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export type { Dictionary };
