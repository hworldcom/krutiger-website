import { defineArrayMember, defineField, defineType } from "sanity";

export const coach = defineType({
  name: "coach",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      description:
        "Stable content identifier; it does not control the website route.",
      options: { source: "name", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "editorialImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "localizedRichText",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "socialUrl",
      title: "Social profile URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      name: "displayOrder",
      title: "Display order",
      by: [
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role.de",
      media: "photo",
    },
  },
});
