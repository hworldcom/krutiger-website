import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const pricingPage = defineType({
  name: "pricingPage",
  title: "Pricing page",
  type: "document",
  description:
    "Page-level bilingual copy and reviewed shared terms. Purchasable products and checkout remain in bSport.",
  groups: [
    { name: "hero", title: "Page introduction", default: true },
    { name: "memberships", title: "Memberships" },
    { name: "passes", title: "Passes" },
    { name: "checkout", title: "Checkout disclosure" },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Page eyebrow",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Page title",
      type: "localizedString",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroIntroduction",
      title: "Page introduction",
      type: "localizedText",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "membershipHeading",
      title: "Membership section heading",
      type: "localizedString",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "membershipIntroduction",
      title: "Membership section introduction",
      type: "localizedText",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adultAudienceDescription",
      title: "Adult membership description",
      type: "localizedText",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "studentAudienceDescription",
      title: "Student membership description",
      type: "localizedText",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kidAudienceDescription",
      title: "Kids membership description",
      type: "localizedText",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "termsHeading",
      title: "Shared terms heading",
      type: "localizedString",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "billingDay",
      title: "Monthly billing day",
      type: "number",
      group: "memberships",
      description:
        "Reviewed display value only. bSport and the signed contract remain authoritative.",
      validation: (Rule) => Rule.required().integer().min(1).max(28),
    }),
    defineField({
      name: "joiningFeeCents",
      title: "Joining fee in cents",
      type: "number",
      group: "memberships",
      description:
        "Enter the complete Euro amount in cents, for example 2900 for €29.",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "autoRenewalExplanation",
      title: "Automatic-renewal explanation",
      type: "localizedText",
      group: "memberships",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "termsVerifiedAt",
      title: "Shared terms last verified",
      type: "datetime",
      group: "memberships",
      description:
        "When the joining fee, billing day, and renewal explanation were last checked against bSport and the approved contract terms.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "passesHeading",
      title: "Pass section heading",
      type: "localizedString",
      group: "passes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "passesIntroduction",
      title: "Pass section introduction",
      type: "localizedText",
      group: "passes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkoutNotice",
      title: "bSport checkout disclosure",
      type: "localizedText",
      group: "checkout",
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
      englishTitle: "heroTitle.en",
    },
    prepare({ editorialState, englishTitle }) {
      return {
        title: "Pricing page",
        subtitle: createEditorialPreviewSubtitle({
          editorialState,
          englishValue: englishTitle,
        }),
      };
    },
  },
});
