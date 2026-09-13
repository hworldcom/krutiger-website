import { describe, expect, it } from "vitest";

import { schemaTypes } from "../../../studio/schemaTypes";

type FieldDefinition = {
  name: string;
  type: string;
  validation?: unknown;
};

type SchemaDefinition = {
  fields?: FieldDefinition[];
  name: string;
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
});
