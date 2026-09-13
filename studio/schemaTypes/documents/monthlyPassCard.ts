import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import {
  formatEuroCents,
  formatVerificationDate,
  validateAccessType,
  validateBsportCheckoutUrl,
  validatePositiveInteger,
  validateSessionAllowance,
  validateVerificationTimestamp,
} from "../pricingCards";

type AccessParent = Readonly<{
  accessType?: unknown;
}>;

export const monthlyPassCard = defineType({
  name: "monthlyPassCard",
  title: "Monthly-pass card",
  type: "document",
  description:
    "Website presentation for an existing bSport pass. bSport remains the product, price, and checkout source of truth.",
  groups: [
    { name: "card", title: "Card content", default: true },
    { name: "checkout", title: "bSport verification" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      group: "workflow",
      description:
        "Stable website identifier. Generate it from the display name, then do not change it after publication.",
      options: { source: "name.de", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Display name",
      type: "localizedString",
      group: "card",
      description:
        "Name shown on the card. Complete German and English explicitly even when the product name is identical.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceCents",
      title: "Price in euro cents",
      type: "number",
      group: "card",
      description:
        "Reviewed display value only. Enter €100.00 as 10000. The amount charged is always controlled by bSport.",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "validityMonths",
      title: "Validity in months",
      type: "number",
      group: "card",
      initialValue: 1,
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validatePositiveInteger(value, "Validity"),
        ),
    }),
    defineField({
      name: "accessType",
      title: "Pass access",
      type: "string",
      group: "card",
      options: {
        layout: "radio",
        list: [
          { title: "Limited sessions", value: "limited" },
          { title: "Unlimited sessions", value: "unlimited" },
        ],
      },
      initialValue: "limited",
      validation: (Rule) => Rule.required().custom(validateAccessType),
    }),
    defineField({
      name: "sessions",
      title: "Sessions",
      type: "number",
      group: "card",
      description: "Required only when Pass access is Limited sessions.",
      hidden: ({ parent }) =>
        (parent as AccessParent | undefined)?.accessType === "unlimited",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          validateSessionAllowance(
            value,
            (context.parent as AccessParent | undefined)?.accessType,
          ),
        ),
    }),
    defineField({
      name: "checkoutUrl",
      title: "bSport checkout URL",
      type: "url",
      group: "checkout",
      description:
        "Copy the complete payment URL from the matching pass in bSport. The Studio accepts only KRUTIGER pass destinations.",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateBsportCheckoutUrl(value, "monthlyPass"),
        ),
    }),
    defineField({
      name: "verifiedAt",
      title: "Verified against bSport at",
      type: "datetime",
      group: "checkout",
      description:
        "Record when the name, price, access, validity, and checkout URL were last checked against bSport.",
      validation: (Rule) =>
        Rule.required().custom(validateVerificationTimestamp),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "workflow",
      description:
        "Lower numbers appear first in the monthly-pass section. Use increments of 10.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      group: "workflow",
      description:
        "Turning this off hides the card only; it does not change or cancel the bSport product.",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineEditorialStateField(),
  ],
  orderings: [
    {
      name: "displayOrder",
      title: "Display order",
      by: [
        { field: "order", direction: "asc" },
        { field: "name.de", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      active: "active",
      editorialState: "editorialState",
      englishName: "name.en",
      name: "name.de",
      priceCents: "priceCents",
      validityMonths: "validityMonths",
      verifiedAt: "verifiedAt",
    },
    prepare({
      active,
      editorialState,
      englishName,
      name,
      priceCents,
      validityMonths,
      verifiedAt,
    }) {
      const validity =
        typeof validityMonths === "number"
          ? `${validityMonths} month validity`
          : "Validity missing";
      const detail = [
        "Monthly pass",
        validity,
        formatEuroCents(priceCents),
        formatVerificationDate(verifiedAt),
      ].join(" · ");

      return {
        title: name || englishName || "Untitled monthly-pass card",
        subtitle: createEditorialPreviewSubtitle({
          active,
          detail,
          editorialState,
          englishValue: englishName,
        }),
      };
    },
  },
});
