import { describe, expect, it } from "vitest";

import de from "./dictionaries/de";
import en from "./dictionaries/en";
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
  });
});
