import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const trainingPage = defineType({
  name: "trainingPage",
  title: "Training page",
  type: "document",
  description:
    "Page-level bilingual copy for Training. Individual formats remain separate Training class documents.",
  groups: [
    { name: "hero", title: "Page introduction", default: true },
    { name: "classes", title: "Classes section" },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Page eyebrow",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Page title",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroIntroduction",
      title: "Page introduction",
      type: "localizedText",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "classesHeading",
      title: "Classes section heading",
      type: "localizedString",
      group: "classes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "classesIntroduction",
      title: "Classes section introduction",
      type: "localizedText",
      group: "classes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scheduleNotice",
      title: "Live-schedule notice",
      type: "localizedText",
      group: "classes",
      description:
        "Explain that current dates, coaches, places, and booking remain in the live bSport schedule.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "Page SEO and social sharing",
      type: "seoMetadata",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineEditorialStateField(),
  ],
  preview: {
    select: {
      editorialState: "editorialState",
      englishTitle: "heroTitle.en",
    },
    prepare({ editorialState, englishTitle }) {
      return {
        title: "Training page",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishTitle,
        }),
      };
    },
  },
});
