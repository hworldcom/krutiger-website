import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

type LegalPageType = "imprintPage" | "privacyPage";

function createLegalPageType(
  name: LegalPageType,
  title: string,
  description: string,
) {
  return defineType({
    name,
    title,
    type: "document",
    description,
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "seo", title: "SEO" },
      { name: "workflow", title: "Workflow" },
    ],
    fields: [
      defineField({
        name: "eyebrow",
        title: "Eyebrow",
        type: "localizedString",
        group: "content",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "title",
        title: "Page title",
        type: "localizedString",
        group: "content",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "introduction",
        title: "Introduction",
        type: "localizedText",
        group: "content",
        description:
          "A short summary shown directly below the page title in each language.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "body",
        title: "Legal content",
        type: "localizedRichText",
        group: "content",
        description:
          "The complete legally reviewed text. Use headings, lists, and links to keep long documents readable.",
        validation: (Rule) => Rule.required(),
      }),
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
        englishTitle: "title.en",
        title: "title.de",
      },
      prepare({ editorialState, englishTitle, title: germanTitle }) {
        return {
          title: germanTitle || englishTitle || title,
          subtitle: createEditorialPreviewSubtitle({
            editorialState,
            englishValue: englishTitle,
          }),
        };
      },
    },
  });
}

export const imprintPage = createLegalPageType(
  "imprintPage",
  "Imprint page",
  "Bilingual, legally reviewed provider information for the Impressum page.",
);

export const privacyPage = createLegalPageType(
  "privacyPage",
  "Privacy page",
  "Bilingual, legally reviewed privacy information for the Datenschutz page.",
);
