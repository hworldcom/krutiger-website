import { defineArrayMember, defineField, defineType } from "sanity";

export const postalAddress = defineType({
  name: "postalAddress",
  title: "Postal address",
  type: "object",
  fields: [
    defineField({
      name: "lines",
      title: "Address lines",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (Rule) => Rule.required().max(120),
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: false,
          scheme: ["https"],
        }),
    }),
  ],
});

export const openingHoursEntry = defineType({
  name: "openingHoursEntry",
  title: "Opening hours entry",
  type: "object",
  fields: [
    defineField({
      name: "days",
      title: "Days",
      type: "localizedString",
      description: "For example, Montag–Freitag / Monday–Friday.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "localizedString",
      description: "For example, 16:00–22:00 or Geschlossen / Closed.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      days: "days.de",
      hours: "hours.de",
    },
    prepare({ days, hours }) {
      return {
        title: days || "Opening hours",
        subtitle: hours,
      };
    },
  },
});
