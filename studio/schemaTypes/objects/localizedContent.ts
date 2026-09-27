import { defineArrayMember, defineField, defineType } from "sanity";

const germanFieldDescription =
  "German is the source language and must be completed before publishing.";
const englishFieldDescription =
  "English must be entered explicitly; the website does not fall back to German.";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized short text",
  type: "object",
  description:
    "Enter the German source text and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "string",
      description: germanFieldDescription,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      description: englishFieldDescription,
      validation: (Rule) => Rule.required().max(160),
    }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  description:
    "Enter the German source text and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "text",
      rows: 4,
      description: germanFieldDescription,
      validation: (Rule) => Rule.required().max(1_000),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
      description: englishFieldDescription,
      validation: (Rule) => Rule.required().max(1_000),
    }),
  ],
});

export const localizedRichText = defineType({
  name: "localizedRichText",
  title: "Localized rich text",
  type: "object",
  description:
    "Enter the German source content and its explicit English translation.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "array",
      description: germanFieldDescription,
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({
                        allowRelative: false,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      description: englishFieldDescription,
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (Rule) =>
                      Rule.required().uri({
                        allowRelative: false,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "openInNewTab",
                    title: "Open in a new tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});

// Alternative text is conditionally required by `editorialImage`, so these
// language fields cannot be unconditionally required at the type level.
export const localizedAlternativeText = defineType({
  name: "localizedAlternativeText",
  title: "Localized alternative text",
  type: "object",
  description: "Describe the same image independently in German and English.",
  options: { columns: 2 },
  fields: [
    defineField({
      name: "de",
      title: "Deutsch (source)",
      type: "string",
      description: germanFieldDescription,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: "en",
      title: "English",
      type: "string",
      description: englishFieldDescription,
      validation: (Rule) => Rule.max(180),
    }),
  ],
});
