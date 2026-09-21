import { defineField, defineType } from "sanity";

export const homepageFeature = defineType({
  name: "homepageFeature",
  title: "Homepage feature",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Feature",
      type: "string",
      description:
        "Stable identifier used to select the website icon. It is not displayed as text.",
      options: {
        layout: "radio",
        list: [
          { title: "Authenticity", value: "authenticity" },
          { title: "All levels", value: "allLevels" },
          { title: "Community", value: "community" },
          { title: "Experienced coaches", value: "experiencedCoaches" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.de",
      subtitle: "internalKey",
    },
  },
});
