import type { Metadata } from "next";

import { siteConfig } from "../lib/site";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";
import { getLanguageAlternates, getLocalizedPath } from "./routing";

export function createLocalizedMetadata(
  locale: Locale,
  dictionary: Dictionary,
  path = "/",
): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: dictionary.metadata.description,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: getLanguageAlternates(path),
    },
  };
}

export function createLocalizedPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: getLanguageAlternates(path),
    },
  };
}
