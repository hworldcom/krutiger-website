import { describe, expect, it } from "vitest";

import {
  getLanguageAlternates,
  getLocalizedPath,
  getPathLocale,
  replacePathLocale,
  stripLocaleFromPath,
} from "./routing";

describe("localized route helpers", () => {
  it("adds a locale prefix to root and nested paths", () => {
    expect(getLocalizedPath("de")).toBe("/de");
    expect(getLocalizedPath("en", "/training")).toBe("/en/training");
  });

  it("replaces a supported locale without losing the route or URL suffix", () => {
    expect(replacePathLocale("/de/training?level=beginner#times", "en")).toBe(
      "/en/training?level=beginner#times",
    );
    expect(replacePathLocale("/en", "de")).toBe("/de");
  });

  it("does not mistake an unsupported leading segment for a locale", () => {
    expect(getPathLocale("/fr/training")).toBeUndefined();
    expect(replacePathLocale("/fr/training", "de")).toBe("/de/fr/training");
  });

  it("removes only a supported locale prefix", () => {
    expect(stripLocaleFromPath("/de/prices")).toBe("/prices");
    expect(stripLocaleFromPath("/training")).toBe("/training");
  });

  it("builds reciprocal alternates with German as x-default", () => {
    expect(getLanguageAlternates("/coaches")).toEqual({
      de: "/de/coaches",
      en: "/en/coaches",
      "x-default": "/de/coaches",
    });
  });
});
