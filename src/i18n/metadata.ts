import type { Metadata } from "next";

import { siteConfig } from "../lib/site";

import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";
import { getLanguageAlternates, getLocalizedPath } from "./routing";

const socialImagePath = "/images/home/main.png";
const socialLocales: Record<Locale, string> = {
  de: "de_DE",
  en: "en_GB",
};

function createSocialMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  const canonical = getLocalizedPath(locale, path);

  return {
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: socialLocales[locale],
      alternateLocale: [socialLocales[locale === "de" ? "en" : "de"]],
      images: [
        {
          url: socialImagePath,
          width: 1536,
          height: 1024,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImagePath, alt: title }],
    },
  };
}

export function createLocalizedMetadata(
  locale: Locale,
  dictionary: Dictionary,
  path = "/",
): Metadata {
  const title = dictionary.metadata.title;
  const description = dictionary.metadata.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description,
    alternates: {
      canonical: getLocalizedPath(locale, path),
      languages: getLanguageAlternates(path),
    },
    icons: {
      icon: [
        {
          url: "/images/home/kru-tiger-logo.png",
          type: "image/png",
          sizes: "any",
        },
      ],
      apple: "/images/home/kru-tiger-logo.png",
    },
    ...createSocialMetadata(locale, title, description, path),
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
    ...createSocialMetadata(locale, title, description, path),
  };
}
