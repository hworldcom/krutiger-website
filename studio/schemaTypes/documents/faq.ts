import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  description:
    "A bilingual answer to a recurring practical question from visitors or members.",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      group: "workflow",
      description:
        "Stable content identifier; it does not control the website route. Do not change it after the answer has been published.",
      options: { source: "question.de", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
      group: "content",
      description:
        "Phrase the question as a visitor would ask it. Complete German and English independently.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedRichText",
      group: "content",
      description:
        "Give a concise, current answer. Do not duplicate live schedule, capacity, or pricing data from bsport.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
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
      group: "workflow",
      description:
        "Lower numbers appear first within the FAQ. Use increments of 10 to leave room for later additions.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      group: "workflow",
      description:
        "Turn this off to retain the answer in Sanity while omitting it from the public FAQ.",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineEditorialStateField(),
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
      category: "category",
      order: "order",
      active: "active",
      editorialState: "editorialState",
    },
    prepare({ active, category, editorialState, englishTitle, order, title }) {
      const detail = [
        typeof order === "number" ? `Order ${order}` : null,
        typeof category === "string" ? category : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        title: title || englishTitle || "Untitled question",
        subtitle: createEditorialPreviewSubtitle({
          active,
          detail,
          editorialState,
          englishValue: englishTitle,
        }),
      };
    },
  },
});
