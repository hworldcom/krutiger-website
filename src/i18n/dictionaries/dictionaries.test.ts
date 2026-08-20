import { describe, expect, it } from "vitest";

import { locales } from "../config";
import de from "./de";
import en from "./en";

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (typeof value !== "object" || value === null) {
    return [];
  }

  return Object.values(value).flatMap(collectStrings);
}

describe("application dictionaries", () => {
  it.each([
    ["de", de],
    ["en", en],
  ])("contains no blank values in the %s dictionary", (_locale, dictionary) => {
    expect(
      collectStrings(dictionary).every((value) => value.trim().length > 0),
    ).toBe(true);
  });

  it("provides an accessible switch label for every target locale", () => {
    for (const locale of locales) {
      expect(de.locale.switchTo[locale]).toBeTruthy();
      expect(en.locale.switchTo[locale]).toBeTruthy();
    }

    expect(de.locale.navigationLabel).toBeTruthy();
    expect(en.locale.navigationLabel).toBeTruthy();
    expect(de.locale.currentLanguageLabel).toBeTruthy();
    expect(en.locale.currentLanguageLabel).toBeTruthy();
  });
});
