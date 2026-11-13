import { defineField, defineType } from "sanity";

import { kidsBenefitKeys, kidsClassKeys } from "../../../src/content/kids";

const localized = (name: string, title: string, type = "localizedString") =>
  defineField({ name, title, type, validation: (Rule) => Rule.required() });

export const kidsBenefit = defineType({
  name: "kidsBenefit",
  title: "Kids training benefit",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Benefit / icon",
      type: "string",
      options: {
        list: kidsBenefitKeys.map((value) => ({ title: value, value })),
      },
      validation: (Rule) => Rule.required(),
    }),
    localized("title", "Title"),
    localized("description", "Description", "localizedText"),
  ],
  preview: { select: { title: "title.de", subtitle: "internalKey" } },
});

export const kidsClass = defineType({
  name: "kidsClass",
  title: "Kids age group",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Group",
      type: "string",
      options: {
        list: kidsClassKeys.map((value) => ({ title: value, value })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ageRange",
      title: "Age range",
      type: "string",
      description:
        "For example: 6–8, 9–12, or 13+. Keep this consistent with the course and FAQ descriptions.",
      validation: (Rule) => Rule.required().max(20),
    }),
    localized("name", "Class name"),
    localized("focus", "Training focus"),
    localized("description", "Description", "localizedText"),
  ],
  preview: { select: { title: "name.de", subtitle: "ageRange" } },
});

export const kidsFaq = defineType({
  name: "kidsFaq",
  title: "Kids training question",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "string",
      description:
        "A unique stable identifier, such as beginners or equipment.",
      validation: (Rule) => Rule.required(),
    }),
    localized("question", "Question"),
    localized("answer", "Answer", "localizedText"),
  ],
  preview: { select: { title: "question.de", subtitle: "internalKey" } },
});
