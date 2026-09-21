import { defineArrayMember, defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description:
    "Global KRUTIGER contact, social, footer, and default search metadata.",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social media" },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "gymName",
      title: "Gym name",
      type: "localizedString",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerStatement",
      title: "Footer statement",
      type: "localizedText",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactStatus",
      title: "Contact information status",
      type: "string",
      group: "contact",
      description:
        "Keep this as placeholder until the gym has verified every contact field.",
      options: {
        layout: "radio",
        list: [
          { title: "Placeholder — not ready to publish", value: "placeholder" },
          { title: "Verified by KRUTIGER", value: "verified" },
        ],
      },
      initialValue: "placeholder",
      validation: (Rule) =>
        Rule.required().custom((status) =>
          status === "verified"
            ? true
            : "KRUTIGER must verify the contact information before this document can be published.",
        ),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "postalAddress",
      group: "contact",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "telephone",
      title: "Telephone",
      type: "string",
      group: "contact",
      description: "Include the international country code, for example +49.",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && /^\+?[0-9 ()/\-]{6,}$/.test(value)
            ? true
            : "Enter a valid telephone number, preferably including the country code.",
        ),
    }),
    defineField({
      name: "openingHours",
      title: "Opening information",
      type: "array",
      group: "contact",
      description: "Drag entries to control their display order.",
      of: [defineArrayMember({ type: "openingHoursEntry" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram profile URL",
      type: "url",
      group: "social",
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: false,
          scheme: ["https"],
        }),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      type: "string",
      group: "social",
      description: "Include the @ prefix.",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          typeof value === "string" && /^@[A-Za-z0-9._]+$/.test(value)
            ? true
            : "Enter a valid Instagram handle beginning with @.",
        ),
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO and social sharing",
      type: "seoMetadata",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineEditorialStateField(),
  ],
  preview: {
    select: {
      contactStatus: "contactStatus",
      editorialState: "editorialState",
      englishName: "gymName.en",
      media: "defaultSeo.shareImage",
    },
    prepare({ contactStatus, editorialState, englishName, media }) {
      return {
        title: "Site settings",
        subtitle: createEditorialPreviewSubtitle({
          detail:
            contactStatus === "verified"
              ? "Contact verified"
              : "Contact placeholder",
          editorialState,
          englishValue: englishName,
        }),
        media,
      };
    },
  },
});
