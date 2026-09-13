import { describe, expect, it } from "vitest";

import { schemaTypes } from "../../../studio/schemaTypes";
import { validateUniqueInternalKeys } from "../../../studio/schemaTypes/validation";
import { singletonTypes } from "../../../studio/structure";

type FieldDefinition = {
  name: string;
  of?: { type: string }[];
  type: string;
  validation?: unknown;
};

type SchemaDefinition = {
  fields?: FieldDefinition[];
  name: string;
  orderings?: unknown[];
  type: string;
};

const definitions = schemaTypes as SchemaDefinition[];

function getType(name: string) {
  const definition = definitions.find((candidate) => candidate.name === name);

  if (!definition) {
    throw new Error(`Missing schema type: ${name}`);
  }

  return definition;
}

function fieldNames(typeName: string) {
  return getType(typeName).fields?.map((field) => field.name) ?? [];
}

function getField(typeName: string, fieldName: string) {
  const field = getType(typeName).fields?.find(
    (candidate) => candidate.name === fieldName,
  );

  if (!field) {
    throw new Error(`Missing field: ${typeName}.${fieldName}`);
  }

  return field;
}

describe("Sanity schema contract", () => {
  it("registers every schema with a unique name", () => {
    const names = definitions.map((definition) => definition.name);

    expect(new Set(names).size).toBe(names.length);
  });

  it.each([
    "localizedString",
    "localizedText",
    "localizedRichText",
    "localizedAlternativeText",
  ])("models explicit German and English fields for %s", (typeName) => {
    expect(fieldNames(typeName)).toEqual(["de", "en"]);
  });

  it("registers image accessibility and approval metadata", () => {
    expect(fieldNames("editorialImage")).toEqual([
      "decorative",
      "alternativeText",
      "caption",
      "source",
      "rightsHolder",
      "rightsStatus",
      "peopleConsent",
    ]);
  });

  it("defines the first singleton document contract", () => {
    const settings = getType("siteSettings");

    expect(settings.type).toBe("document");
    expect(fieldNames("siteSettings")).toEqual([
      "gymName",
      "footerStatement",
      "contactStatus",
      "address",
      "email",
      "telephone",
      "openingHours",
      "instagramUrl",
      "instagramHandle",
      "defaultSeo",
    ]);
    expect(
      settings.fields?.every((field) => typeof field.validation === "function"),
    ).toBe(true);
  });

  it("registers every intended document type", () => {
    expect(
      definitions
        .filter((definition) => definition.type === "document")
        .map((definition) => definition.name),
    ).toEqual([
      "siteSettings",
      "homepage",
      "aboutPage",
      "classType",
      "coach",
      "faq",
    ]);
  });

  it("protects each fixed page as a singleton", () => {
    expect([...singletonTypes]).toEqual([
      "siteSettings",
      "homepage",
      "aboutPage",
    ]);
  });

  it("constrains ordered page sections to compatible object types", () => {
    expect(getField("homepage", "features").of).toEqual([
      { type: "homepageFeature" },
    ]);
    expect(getField("aboutPage", "chapters").of).toEqual([
      { type: "aboutChapter" },
    ]);
    expect(getField("aboutPage", "philosophyValues").of).toEqual([
      { type: "philosophyValue" },
    ]);
  });

  it.each(["classType", "coach", "faq"])(
    "provides deterministic ordering and visibility for %s",
    (typeName) => {
      expect(fieldNames(typeName)).toContain("order");
      expect(fieldNames(typeName)).toContain("active");
      expect(getType(typeName).orderings).toHaveLength(1);
    },
  );

  it("rejects repeated stable keys in fixed page sections", () => {
    expect(
      validateUniqueInternalKeys([
        { internalKey: "community" },
        { internalKey: "community" },
      ]),
    ).toBe("Each internal key can be used only once.");
    expect(
      validateUniqueInternalKeys([
        { internalKey: "community" },
        { internalKey: "technique" },
      ]),
    ).toBe(true);
  });
});
