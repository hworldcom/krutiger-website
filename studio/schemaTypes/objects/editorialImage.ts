import { defineField, defineType } from "sanity";

type LocalizedAlternativeTextValue = {
  de?: unknown;
  en?: unknown;
};

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: {
    hotspot: {
      previews: [
        { title: "Landscape 16:9", aspectRatio: 16 / 9 },
        { title: "Landscape 3:2", aspectRatio: 3 / 2 },
        { title: "Portrait 4:5", aspectRatio: 4 / 5 },
        { title: "Square", aspectRatio: 1 },
      ],
    },
  },
  fields: [
    defineField({
      name: "decorative",
      title: "Decorative image",
      type: "boolean",
      description:
        "Enable only when the image conveys no information. Decorative images do not need alternative text.",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alternativeText",
      title: "Alternative text",
      type: "localizedAlternativeText",
      description:
        "Describe the image's purpose in each language. Do not start with ‘image of’. Leave empty only for decorative images.",
      hidden: ({ parent }) =>
        Boolean((parent as { decorative?: boolean } | undefined)?.decorative),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { decorative?: boolean } | undefined;

          if (parent?.decorative) {
            return true;
          }

          const localized = value as LocalizedAlternativeTextValue | undefined;

          if (!hasText(localized?.de) || !hasText(localized?.en)) {
            return "Add meaningful German and English alternative text, or mark the image as decorative.";
          }

          return true;
        }),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
      description: "Optional visible caption. Complete both languages if used.",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description:
        "Where the image came from, for example the photographer, archive, or Instagram post URL.",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "rightsHolder",
      title: "Rights holder",
      type: "string",
      description: "Person or organization that owns or licensed the image.",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "rightsStatus",
      title: "Usage rights",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Approved for website use", value: "approved" },
        ],
      },
      initialValue: "pending",
      validation: (Rule) =>
        Rule.required().custom((status) =>
          status === "approved"
            ? true
            : "Confirm that this image is approved for website use before publishing.",
        ),
    }),
    defineField({
      name: "peopleConsent",
      title: "Depicted-person consent",
      type: "string",
      description:
        "Choose an explicit status whenever a recognizable person appears in the image.",
      options: {
        layout: "radio",
        list: [
          {
            title: "Not applicable — no recognizable person",
            value: "notApplicable",
          },
          { title: "Consent confirmed", value: "confirmed" },
          { title: "Pending confirmation", value: "pending" },
        ],
      },
      validation: (Rule) =>
        Rule.required().custom((status) =>
          status === "confirmed" || status === "notApplicable"
            ? true
            : "Confirm depicted-person consent, or state that it is not applicable, before publishing.",
        ),
    }),
  ],
});
