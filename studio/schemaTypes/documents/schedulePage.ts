import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import { validateOptionalLocalizedPair } from "../validation";

export const schedulePage = defineType({
  name: "schedulePage",
  title: "Schedule page",
  type: "document",
  description:
    "The weekly timetable image shown above the live bSport schedule. The live widget remains the source for current availability and booking.",
  groups: [
    { name: "media", title: "Timetable image", default: true },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "timetableImage",
      title: "Timetable image",
      type: "image",
      group: "media",
      description:
        "Upload the complete weekly timetable graphic. A wide landscape image works best; editors can replace it without a code change.",
      fields: [
        defineField({
          name: "alternativeText",
          title: "Alternative text",
          type: "localizedAlternativeText",
          description:
            "Briefly identify this as the regular weekly timetable in both languages. The live, accessible schedule remains directly below it.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "localizedString",
          description:
            "Optional visible caption. Complete both languages if used.",
          validation: (Rule) => Rule.custom(validateOptionalLocalizedPair),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineEditorialStateField(),
  ],
  preview: {
    select: {
      editorialState: "editorialState",
      englishAlternativeText: "timetableImage.alternativeText.en",
      media: "timetableImage",
    },
    prepare({ editorialState, englishAlternativeText, media }) {
      return {
        title: "Schedule page",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishAlternativeText,
        }),
        media,
      };
    },
  },
});
