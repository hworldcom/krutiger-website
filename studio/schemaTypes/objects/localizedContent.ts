import { defineArrayMember, defineField, defineType } from "sanity";

const germanFieldDescription =
  "German is the source language and must be completed before publishing.";
const englishFieldDescription =
  "English must be entered explicitly; the website does not fall back to German.";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized short text",
  type: "object",
  description:
    "Enter the German source text and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "string",
      description: germanFieldDescription,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      description: englishFieldDescription,
      validation: (Rule) => Rule.required().max(160),
    }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  description:
    "Enter the German source text and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "text",
      rows: 4,
      description: germanFieldDescription,
      validation: (Rule) => Rule.required().max(1_000),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      description: englishFieldDescription,
      validation: (Rule) => Rule.required().max(1_000),
    }),
  ],
});

export const localizedRichText = defineType({
  name: "localizedRichText",
  title: "Localized rich text",
  type: "object",
  description:
    "Enter the German source content and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "array",
      description: germanFieldDescription,
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      description: englishFieldDescription,
      of: [defineArrayMember({ type: "block" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

// Alternative text is conditionally required by `editorialImage`, so these
// language fields cannot be unconditionally required at the type level.
export const localizedAlternativeText = defineType({
  name: "localizedAlternativeText",
  title: "Localized alternative text",
  type: "object",
  description: "Describe the same image independently in German and English.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "string",
      description: germanFieldDescription,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      description: englishFieldDescription,
      validation: (Rule) => Rule.max(180),
    }),
  ],
});
