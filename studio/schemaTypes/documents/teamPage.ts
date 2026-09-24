import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team page",
  type: "document",
  description:
    "Page-level bilingual copy for Team. Individual profiles remain separate Team member documents.",
  groups: [
    { name: "hero", title: "Page introduction", default: true },
    { name: "team", title: "Team section" },
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
      name: "teamHeading",
      title: "Team section heading",
      type: "localizedString",
      group: "team",
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
        title: "Team page",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishTitle,
        }),
      };
    },
  },
});
