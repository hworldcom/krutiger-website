import { defineField, defineType } from "sanity";

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "localizedText",
      description:
        "Summary shown by search engines and social platforms. Aim for approximately 140–160 characters.",
      validation: (Rule) => Rule.required(),
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
