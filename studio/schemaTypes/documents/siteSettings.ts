import { defineArrayMember, defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import {
  validateLocalizedMaximumLength,
  validateOptionalLocalizedPair,
} from "../validation";

type PromotionDocument = {
  promotionEnabled?: boolean;
  promotionLinkLabel?: unknown;
  promotionLinkUrl?: string;
};

type LocalizedValue = {
  de?: unknown;
  en?: unknown;
};

export const promotionMessageMaximumLength = 250;

function hasLocalizedPair(value: unknown) {
  if (!value || typeof value !== "object") {
    return false;
  }

  const localized = value as LocalizedValue;

  return [localized.de, localized.en].every(
    (candidate) => typeof candidate === "string" && candidate.trim(),
  );
}

function hasPromotionLinkLabel(document: PromotionDocument | undefined) {
  return hasLocalizedPair(document?.promotionLinkLabel);
}

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description:
    "Global KRUTIGER promotion, contact, social, footer, and default search metadata.",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "promotion", title: "Promotion banner" },
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
      name: "promotionEnabled",
      title: "Show promotion banner",
      type: "boolean",
      group: "promotion",
      description:
        "Turn this on to show the promotion strip above the website navigation. Turn it off to hide the strip without deleting its content.",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "promotionMessage",
      title: "Banner message",
      type: "localizedText",
      group: "promotion",
      description:
        "Required in German and English while the promotion banner is enabled. Line breaks are preserved. Maximum 250 characters per language.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as PromotionDocument | undefined;

          if (!document?.promotionEnabled) {
            const localizedPair = validateOptionalLocalizedPair(value);

            if (localizedPair !== true) {
              return localizedPair;
            }
          }

          if (document?.promotionEnabled && !hasLocalizedPair(value)) {
            return "Complete the German and English banner messages before enabling the promotion.";
          }

          return validateLocalizedMaximumLength(
            value,
            promotionMessageMaximumLength,
            "Promotion message",
          );
        }),
    }),
    defineField({
      name: "promotionLinkLabel",
      title: "Optional link label",
      type: "localizedString",
      group: "promotion",
      description:
        "Complete both languages only when the banner should link to another page or offer.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const localizedPair = validateOptionalLocalizedPair(value);

          if (localizedPair !== true) {
            return localizedPair;
          }

          const length = validateLocalizedMaximumLength(
            value,
            40,
            "Promotion link label",
          );

          if (length !== true) {
            return length;
          }

          const document = context.document as PromotionDocument | undefined;

          return hasLocalizedPair(value) === Boolean(document?.promotionLinkUrl)
            ? true
            : "Complete both link labels and the link destination, or leave all three empty.";
        }),
    }),
    defineField({
      name: "promotionLinkUrl",
      title: "Optional link destination",
      type: "url",
      group: "promotion",
      description:
        "Use a root-relative website path such as /de/prices, or a complete HTTPS URL.",
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ["https"] }).custom(
          (value, context) => {
            const document = context.document as PromotionDocument | undefined;

            return Boolean(value) === hasPromotionLinkLabel(document)
              ? true
              : "Add both German and English link labels, or remove the destination.";
          },
        ),
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
      description:
        "Optional. Leave empty to hide the telephone entry on the website. Include the international country code when provided, for example +49.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value == null || value.trim() === "") {
            return true;
          }

          return /^\+?[0-9 ()/\-]{6,}$/.test(value)
            ? true
            : "Enter a valid telephone number, preferably including the country code.";
        }),
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
