import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const classType = defineType({
  name: "classType",
  title: "Training class",
  type: "document",
  description:
    "Marketing information about a training format. Live sessions, availability, and booking remain in bsport.",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Training details" },
    { name: "media", title: "Image" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      group: "workflow",
      description:
        "Stable content identifier; it does not control the website route. Do not change it after the class has been published.",
      options: { source: "name.de", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Class name",
      type: "localizedString",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localizedText",
      group: "content",
      description:
        "Short card introduction. Keep each language concise and focused on what the class offers.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedRichText",
      group: "content",
      description:
        "Full marketing description. Do not add live times, availability, or prices; those remain in bsport.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Beginners", value: "beginners" },
          { title: "Intermediate", value: "intermediate" },
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
      group: "details",
      description:
        "Descriptive duration only. Individual session times remain in bsport.",
      validation: (Rule) => Rule.required().integer().min(15).max(240),
    }),
    defineField({
      name: "audience",
      title: "Who it is for",
      type: "localizedText",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Class image",
      type: "editorialImage",
      group: "media",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaLabel",
      title: "Call-to-action label",
      type: "localizedString",
      group: "content",
      description:
        "Only the label is editable. The application owns the destination.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "workflow",
      description:
        "Lower numbers appear first on the website. Use increments of 10 to leave room for later additions.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      group: "workflow",
      description:
        "Turn this off to keep the class in Sanity while omitting it from the public website.",
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
      order: "order",
      active: "active",
      editorialState: "editorialState",
    },
    prepare({
      active,
      editorialState,
      englishTitle,
      level,
      media,
      order,
      title,
    }) {
      const detail = [
        typeof order === "number" ? `Order ${order}` : null,
        typeof level === "string" ? level : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        title: title || englishTitle || "Untitled training class",
        subtitle: createEditorialPreviewSubtitle({
          active,
          detail,
          editorialState,
          englishValue: englishTitle,
        }),
        media,
      };
    },
  },
});
