import { defineArrayMember, defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import { validateUniqueInternalKeys } from "../validation";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  description:
    "Editable marketing content for the German and English homepages. Schedule data remains in bsport.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "values", title: "Why KRUTIGER" },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleLines",
      title: "Hero title lines",
      type: "array",
      group: "hero",
      description: "Exactly three lines are required by the approved design.",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
    defineField({
      name: "heroIntroduction",
      title: "Hero introduction",
      type: "localizedText",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "editorialImage",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trialActionLabel",
      title: "Trial-class action label",
      type: "localizedString",
      group: "hero",
      description:
        "Only the label is editable. The website owns the Contact destination.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "scheduleActionLabel",
      title: "Schedule action label",
      type: "localizedString",
      group: "hero",
      description:
        "Only the label is editable. The website owns the Schedule destination.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesEyebrow",
      title: "Values eyebrow",
      type: "localizedString",
      group: "values",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesTitle",
      title: "Values title",
      type: "localizedString",
      group: "values",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesTitleAccent",
      title: "Values title accent",
      type: "localizedString",
      group: "values",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valuesIntroduction",
      title: "Values introduction",
      type: "localizedText",
      group: "values",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "Homepage features",
      type: "array",
      group: "values",
      description:
        "Exactly four features are required. Drag entries to control their display order.",
      of: [defineArrayMember({ type: "homepageFeature" })],
      validation: (Rule) =>
        Rule.required().min(4).max(4).custom(validateUniqueInternalKeys),
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
      englishTitle: "heroTitlePrimary.en",
      media: "heroImage",
    },
    prepare({ editorialState, englishTitle, media }) {
      return {
        title: "Homepage",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishTitle,
        }),
        media,
      };
    },
  },
});
