import { describe, expect, it } from "vitest";

import { defaultLocale, isLocale, locales } from "./config";

describe("locale configuration", () => {
  it("uses German as the default and supports German and English", () => {
    expect(defaultLocale).toBe("de");
    expect(locales).toEqual(["de", "en"]);
  });

  it("narrows only supported locale values", () => {
    expect(isLocale("de")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
