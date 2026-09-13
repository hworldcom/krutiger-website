import { defineArrayMember, defineField, defineType } from "sanity";

export const classType = defineType({
  name: "classType",
  title: "Training class",
  type: "document",
  description:
    "Marketing information about a training format. Live sessions, availability, and booking remain in bsport.",
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      description:
        "Stable content identifier; it does not control the website route.",
      options: { source: "name.de", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Class name",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedRichText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: [
          { title: "Beginners", value: "beginners" },
          { title: "All levels", value: "allLevels" },
          { title: "Advanced", value: "advanced" },
          { title: "Fighters", value: "fighters" },
          { title: "Children", value: "children" },
          { title: "Private training", value: "private" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "durationMinutes",
      title: "Typical duration in minutes",
      type: "number",
      description:
        "Descriptive duration only. Individual session times remain in bsport.",
      validation: (Rule) => Rule.required().integer().min(15).max(240),
    }),
    defineField({
      name: "audience",
      title: "Who it is for",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "equipment",
      title: "Recommended equipment",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Class image",
      type: "editorialImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Call-to-action label",
      type: "localizedString",
      description:
        "Only the label is editable. The application owns the destination.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      name: "displayOrder",
      title: "Display order",
      by: [
        { field: "order", direction: "asc" },
        { field: "name.de", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name.de",
      englishTitle: "name.en",
      level: "level",
      media: "image",
    },
    prepare({ title, englishTitle, level, media }) {
      return {
        title: title || englishTitle || "Untitled training class",
        subtitle: level,
        media,
      };
    },
  },
});
