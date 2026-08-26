import { describe, expect, it } from "vitest";

import de from "./dictionaries/de";
import en from "./dictionaries/en";
import { contentRoutes } from "../lib/routes";
import {
  createLocalizedMetadata,
  createLocalizedPageMetadata,
} from "./metadata";

describe("localized metadata", () => {
  it.each([
    ["de" as const, de, "/de"],
    ["en" as const, en, "/en"],
  ])("creates metadata for the %s locale", (locale, dictionary, canonical) => {
    const metadata = createLocalizedMetadata(locale, dictionary);

    expect(metadata.title).toEqual({
      default: dictionary.metadata.title,
      template: "%s | KRUTIGER",
    });
    expect(metadata.description).toBe(dictionary.metadata.description);
    expect(metadata.alternates).toEqual({
      canonical,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/de",
      },
    });
    expect(metadata.icons).toEqual({
      icon: [
        {
          url: "/images/home/kru-tiger-logo.png",
          type: "image/png",
          sizes: "any",
        },
      ],
      apple: "/images/home/kru-tiger-logo.png",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: canonical,
      locale: locale === "de" ? "de_DE" : "en_GB",
      images: [
        {
          url: "/images/home/main.png",
          width: 1536,
          height: 1024,
          alt: dictionary.metadata.title,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: dictionary.metadata.title,
      images: [
        {
          url: "/images/home/main.png",
          alt: dictionary.metadata.title,
        },
      ],
    });
  });

  it("creates localized metadata for a nested content page", () => {
    const metadata = createLocalizedPageMetadata(
      "en",
      en.routes.training.title,
      en.routes.training.description,
      "/training",
    );

    expect(metadata.title).toBe(en.routes.training.title);
    expect(metadata.description).toBe(en.routes.training.description);
    expect(metadata.alternates).toEqual({
      canonical: "/en/training",
      languages: {
        de: "/de/training",
        en: "/en/training",
        "x-default": "/de/training",
      },
    });
    expect(metadata.openGraph).toMatchObject({
      title: en.routes.training.title,
      url: "/en/training",
      locale: "en_GB",
    });
  });

  it.each([["de", de] as const, ["en", en] as const])(
    "gives every %s route a unique localized title",
    (_locale, dictionary) => {
      const titles = [
        dictionary.metadata.title,
        ...contentRoutes.map((route) => dictionary.routes[route.id].title),
      ];

      expect(new Set(titles).size).toBe(titles.length);
    },
  );
});
