import type { Locale } from "../config";
import type { Dictionary } from "./types";

const dictionaryLoaders: Record<Locale, () => Promise<Dictionary>> = {
  de: () => import("./de").then((module) => module.default),
  en: () => import("./en").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaryLoaders[locale]();
}

export type { Dictionary } from "./types";
