import { defineField, defineType } from "sanity";

import { validateLocalizedMaximumLength } from "../validation";

export const seoMetadata = defineType({
  name: "seoMetadata",
  title: "Search and social sharing",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "localizedString",
      description:
        "Title shown by search engines and social platforms. Aim for approximately 50–60 characters.",
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((value) =>
          validateLocalizedMaximumLength(value, 65, "SEO title"),
        ).warning(),
      ],
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "localizedText",
      description:
        "Summary shown by search engines and social platforms. Aim for approximately 140–160 characters.",
      validation: (Rule) => [
        Rule.required(),
        Rule.custom((value) =>
          validateLocalizedMaximumLength(value, 170, "SEO description"),
        ).warning(),
      ],
    }),
    defineField({
      name: "shareImage",
      title: "Social share image",
      type: "editorialImage",
      description:
        "Recommended crop: 1.91:1. This image also requires rights metadata.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
