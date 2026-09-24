import { describe, expect, it } from "vitest";

import {
  getTrainingClasses,
  localizeTrainingClasses,
  type TrainingClassSource,
} from "./training";

function createSourceClass(
  overrides: Partial<TrainingClassSource>,
): TrainingClassSource {
  return {
    internalKey: "class",
    name: { de: "Kurs", en: "Class" },
    summary: { de: "Deutsche Kurzfassung.", en: "English summary." },
    description: {
      de: "Deutsche Beschreibung.",
      en: "English description.",
    },
    level: "beginners",
    durationMinutes: 60,
    audience: { de: "Deutsches Publikum.", en: "English audience." },
    image: {
      src: "/class.jpg",
      alternativeText: {
        de: "Deutschsprachiger Alternativtext.",
        en: "English alternative text.",
      },
    },
    ctaLabel: { de: "Kurs ansehen", en: "View class" },
    order: 0,
    active: true,
    ...overrides,
  };
}

describe("training content adapter", () => {
  it("orders active classes deterministically and omits inactive classes", () => {
    const source = [
      createSourceClass({
        internalKey: "second",
        name: { de: "Zulu", en: "Zulu" },
        order: 20,
      }),
      createSourceClass({
        active: false,
        internalKey: "hidden",
        name: { de: "Verborgen", en: "Hidden" },
        order: 0,
      }),
      createSourceClass({
        internalKey: "tie-b",
        name: { de: "Beta", en: "Beta" },
        order: 10,
      }),
      createSourceClass({
        internalKey: "tie-a",
        name: { de: "Alpha", en: "Alpha" },
        order: 10,
      }),
    ] as const;

    expect(
      localizeTrainingClasses(source, "de").map(
        ({ internalKey }) => internalKey,
      ),
    ).toEqual(["tie-a", "tie-b", "second"]);
    expect(source.map(({ internalKey }) => internalKey)).toEqual([
      "second",
      "hidden",
      "tie-b",
      "tie-a",
    ]);
  });

  it("returns the four initial training formats", () => {
    expect(
      getTrainingClasses("de").map(({ internalKey }) => internalKey),
    ).toEqual([
      "muay-thai-basic",
      "muay-thai-intermediate",
      "muay-thai-advanced",
      "muay-thai-all-levels",
    ]);
  });

  it("selects explicit content for each language without fallback", () => {
    const germanClass = getTrainingClasses("de")[0];
    const englishClass = getTrainingClasses("en")[0];

    expect(germanClass.summary).toContain("Dein Einstieg");
    expect(englishClass.summary).toContain("Your introduction");
    expect(englishClass.summary).not.toBe(germanClass.summary);
    expect(englishClass.audience).not.toBe(germanClass.audience);
    expect(englishClass.image.alternativeText).not.toBe(
      germanClass.image.alternativeText,
    );
  });
});
