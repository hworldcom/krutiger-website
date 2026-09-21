import { defineField, defineType } from "sanity";

export const aboutChapter = defineType({
  name: "aboutChapter",
  title: "About chapter",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Chapter",
      type: "string",
      description:
        "Stable identifier used by the fixed page design. Chapter numbers and visual treatment come from the website.",
      options: {
        layout: "radio",
        list: [
          { title: "Kru Tiger", value: "kruTiger" },
          { title: "Roots in Thailand", value: "rootsThailand" },
          { title: "Experience in the ring", value: "ringExperience" },
          { title: "From Thailand to Berlin", value: "thailandToBerlin" },
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
    defineField({
      name: "accent",
      title: "Accent line",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryImage",
      title: "Primary image",
      type: "editorialImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryImage",
      title: "Secondary image",
      type: "editorialImage",
      description:
        "Optional second image. The current design uses it only for the Thailand-to-Berlin chapter.",
    }),
  ],
  preview: {
    select: {
      title: "title.de",
      subtitle: "internalKey",
      media: "primaryImage",
    },
  },
});

export const philosophyValue = defineType({
  name: "philosophyValue",
  title: "Philosophy value",
  type: "object",
  fields: [
    defineField({
      name: "internalKey",
      title: "Value",
      type: "string",
      description:
        "Stable identifier used to select the website icon. It is not displayed as text.",
      options: {
        layout: "radio",
        list: [
          { title: "Technique", value: "technique" },
          { title: "Discipline", value: "discipline" },
          { title: "Respect", value: "respect" },
          { title: "Community", value: "community" },
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
