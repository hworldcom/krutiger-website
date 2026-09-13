import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      description:
        "Stable content identifier; it does not control the website route.",
      options: { source: "question.de", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedRichText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Stable category used by the website. Display labels remain application-owned.",
      options: {
        list: [
          { title: "Getting started", value: "gettingStarted" },
          { title: "Equipment", value: "equipment" },
          { title: "Training", value: "training" },
          { title: "Memberships", value: "memberships" },
          { title: "Other", value: "other" },
        ],
      },
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
        { field: "question.de", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "question.de",
      englishTitle: "question.en",
      subtitle: "category",
    },
    prepare({ title, englishTitle, subtitle }) {
      return {
        title: title || englishTitle || "Untitled question",
        subtitle,
      };
    },
  },
});
