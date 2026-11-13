import { defineArrayMember, defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import { validateUniqueInternalKeys } from "../validation";

const localized = (
  name: string,
  title: string,
  group: string,
  type = "localizedString",
) =>
  defineField({
    name,
    title,
    group,
    type,
    validation: (Rule) => Rule.required(),
  });

export const kidsPage = defineType({
  name: "kidsPage",
  title: "Kids & Teens page",
  type: "document",
  description:
    "The fixed bilingual Kids & Teens page. Class times, places, payments and the trial checkout destination remain owned by bsport and the website.",
  groups: [
    { name: "hero", title: "Introduction", default: true },
    { name: "benefits", title: "Why Muay Thai?" },
    { name: "classes", title: "Age groups" },
    { name: "faq", title: "Practical questions" },
    { name: "actions", title: "Next steps" },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    localized("heroEyebrow", "Hero eyebrow", "hero"),
    defineField({
      name: "heroTitleLines",
      title: "Hero title lines",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
    localized("heroIntroduction", "Introduction", "hero", "localizedText"),
    localized("trialActionLabel", "Free-trial button label", "hero"),
    defineField({
      name: "heroImage",
      title: "Hero illustration",
      type: "editorialImage",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    localized("benefitsEyebrow", "Benefits eyebrow", "benefits"),
    localized("benefitsHeading", "Benefits heading", "benefits"),
    localized(
      "benefitsIntroduction",
      "Coaching philosophy",
      "benefits",
      "localizedText",
    ),
    defineField({
      name: "benefits",
      title: "Training benefits",
      type: "array",
      group: "benefits",
      of: [defineArrayMember({ type: "kidsBenefit" })],
      validation: (Rule) =>
        Rule.required().min(4).max(4).custom(validateUniqueInternalKeys),
    }),
    localized("classesEyebrow", "Classes eyebrow", "classes"),
    localized("classesHeading", "Classes heading", "classes"),
    localized(
      "classesIntroduction",
      "Classes introduction",
      "classes",
      "localizedText",
    ),
    localized("ageUnit", "Age unit (Jahre / years)", "classes"),
    defineField({
      name: "classes",
      title: "Age groups",
      type: "array",
      group: "classes",
      of: [defineArrayMember({ type: "kidsClass" })],
      validation: (Rule) =>
        Rule.required().min(3).max(3).custom(validateUniqueInternalKeys),
    }),
    localized("faqEyebrow", "FAQ eyebrow", "faq"),
    localized("faqHeading", "FAQ heading", "faq"),
    defineField({
      name: "faqs",
      title: "Questions and answers",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "kidsFaq" })],
      validation: (Rule) =>
        Rule.required().min(1).max(10).custom(validateUniqueInternalKeys),
    }),
    localized("contactPrompt", "Contact prompt", "faq"),
    localized("contactActionLabel", "Contact link label", "faq"),
    localized("nextStepsEyebrow", "Next steps eyebrow", "actions"),
    localized("nextStepsHeading", "Next steps heading", "actions"),
    localized("scheduleActionLabel", "Schedule button label", "actions"),
    localized("pricesActionLabel", "Pricing button label", "actions"),
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
      englishTitle: "heroIntroduction.en",
      media: "heroImage",
    },
    prepare({ editorialState, englishTitle, media }) {
      return {
        title: "Kids & Teens page",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishTitle,
        }),
        media,
      };
    },
  },
});
