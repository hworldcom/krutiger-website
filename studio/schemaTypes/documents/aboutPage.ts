import { defineArrayMember, defineField, defineType } from "sanity";

import { validateUniqueInternalKeys } from "../validation";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  description:
    "The bilingual KRUTIGER story, its approved archive imagery, and philosophy.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "story", title: "Story" },
    { name: "philosophy", title: "Philosophy" },
    { name: "seo", title: "SEO" },
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
      name: "heroTitlePrimary",
      title: "Primary hero title",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitleSecondary",
      title: "Secondary hero title",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
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
      name: "storyHeading",
      title: "Story section heading",
      type: "localizedString",
      group: "story",
      description:
        "Accessible section heading. It may be visually hidden by the fixed design.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chapters",
      title: "Story chapters",
      type: "array",
      group: "story",
      description:
        "Exactly four chapters are required. Drag entries to control their display order.",
      of: [defineArrayMember({ type: "aboutChapter" })],
      validation: (Rule) =>
        Rule.required().min(4).max(4).custom(validateUniqueInternalKeys),
    }),
    defineField({
      name: "philosophyTitle",
      title: "Philosophy title",
      type: "localizedString",
      group: "philosophy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "philosophyValues",
      title: "Philosophy values",
      type: "array",
      group: "philosophy",
      description:
        "Exactly four values are required. Drag entries to control their display order.",
      of: [defineArrayMember({ type: "philosophyValue" })],
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
  ],
  preview: {
    prepare() {
      return {
        title: "About page",
        subtitle: "German and English story content",
      };
    },
  },
});
