import { defineArrayMember, defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";
import {
  formatEuroCents,
  formatVerificationDate,
  membershipAudiences,
  membershipBenefits,
  membershipDurations,
  validateAccessType,
  validateBsportCheckoutUrl,
  validateMembershipBenefitSelection,
  validateMembershipAudience,
  validateMembershipDuration,
  validateSessionAllowance,
  validateVerificationTimestamp,
} from "../pricingCards";

type AccessParent = Readonly<{
  accessType?: unknown;
}>;

type MembershipSourceDocument = Readonly<{
  audience?: unknown;
  durationMonths?: unknown;
  name?: Readonly<{
    de?: unknown;
  }>;
}>;

export const membershipCard = defineType({
  name: "membershipCard",
  title: "Membership card",
  type: "document",
  description:
    "Website presentation for an existing bSport membership. bSport remains the product, price, and checkout source of truth.",
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
        "Stable website identifier. Generate it from the name, membership group, and duration, then do not change it after publication.",
      options: {
        source: (document) => {
          const sourceDocument = document as MembershipSourceDocument;
          const name =
            typeof sourceDocument.name?.de === "string"
              ? sourceDocument.name.de
              : "";
          const duration =
            typeof sourceDocument.durationMonths === "number"
              ? sourceDocument.durationMonths
              : "";
          const audience =
            typeof sourceDocument.audience === "string"
              ? sourceDocument.audience
              : "adult";

          return `${name}-${audience}-${duration}`;
        },
        maxLength: 64,
      },
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
      name: "audience",
      title: "Membership group",
      type: "string",
      group: "card",
      description:
        "Controls whether the card appears under Adults, Students, or Kids on the pricing page. Existing cards without a selection are treated as Adults.",
      options: {
        layout: "radio",
        list: [...membershipAudiences],
      },
      initialValue: "adult",
      validation: (Rule) =>
        Rule.custom((value) =>
          value == null ? true : validateMembershipAudience(value),
        ),
    }),
    defineField({
      name: "monthlyPriceCents",
      title: "Monthly price in euro cents",
      type: "number",
      group: "card",
      description:
        "Reviewed display value only. Enter €69.00 as 6900. The amount charged is always controlled by bSport.",
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: "durationMonths",
      title: "Contract duration",
      type: "number",
      group: "card",
      options: {
        layout: "radio",
        list: membershipDurations.map((months) => ({
          title: `${months} months`,
          value: months,
        })),
      },
      validation: (Rule) => Rule.required().custom(validateMembershipDuration),
    }),
    defineField({
      name: "accessType",
      title: "Monthly access",
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
      name: "monthlySessions",
      title: "Sessions per month",
      type: "number",
      group: "card",
      description: "Required only when Monthly access is Limited sessions.",
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
      name: "benefits",
      title: "Included benefits",
      type: "array",
      group: "card",
      description:
        "Choose the application-owned benefits confirmed for this bSport product. Display labels are translated by the website.",
      of: [
        defineArrayMember({
          type: "string",
          options: { list: [...membershipBenefits] },
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .unique()
          .custom(validateMembershipBenefitSelection),
    }),
    defineField({
      name: "checkoutUrl",
      title: "bSport checkout URL",
      type: "url",
      group: "checkout",
      description:
        "Copy the complete checkout URL from the matching membership in bSport. The Studio accepts only KRUTIGER membership destinations.",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          validateBsportCheckoutUrl(value, "membership"),
        ),
    }),
    defineField({
      name: "verifiedAt",
      title: "Verified against bSport at",
      type: "datetime",
      group: "checkout",
      description:
        "Record when the name, price, access, benefits, duration, and checkout URL were last checked against bSport.",
      validation: (Rule) =>
        Rule.required().custom(validateVerificationTimestamp),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "workflow",
      description:
        "Lower numbers appear first within the selected duration. Use increments of 10.",
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
      title: "Membership group, duration, and display order",
      by: [
        { field: "audience", direction: "asc" },
        { field: "durationMonths", direction: "desc" },
        { field: "order", direction: "asc" },
        { field: "name.de", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      active: "active",
      audience: "audience",
      durationMonths: "durationMonths",
      editorialState: "editorialState",
      englishName: "name.en",
      name: "name.de",
      monthlyPriceCents: "monthlyPriceCents",
      verifiedAt: "verifiedAt",
    },
    prepare({
      active,
      audience,
      durationMonths,
      editorialState,
      englishName,
      monthlyPriceCents,
      name,
      verifiedAt,
    }) {
      const duration =
        typeof durationMonths === "number"
          ? `${durationMonths} months`
          : "Duration missing";
      const detail = [
        "Membership",
        typeof audience === "string" ? audience : "adult",
        duration,
        `${formatEuroCents(monthlyPriceCents)}/month`,
        formatVerificationDate(verifiedAt),
      ].join(" · ");

      return {
        title: name || englishName || "Untitled membership card",
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
