import { defineField, defineType } from "sanity";

import {
  createEditorialPreviewSubtitle,
  defineEditorialStateField,
} from "../editorialWorkflow";

export const coach = defineType({
  name: "coach",
  title: "Team member",
  type: "document",
  description:
    "Approved public profile information for a KRUTIGER team member.",
  groups: [
    { name: "profile", title: "Profile", default: true },
    { name: "media", title: "Photo" },
    { name: "workflow", title: "Workflow" },
  ],
  fields: [
    defineField({
      name: "internalKey",
      title: "Internal key",
      type: "slug",
      group: "workflow",
      description:
        "Stable content identifier; it does not control the website route. Do not change it after the profile has been published.",
      options: { source: "name", maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "profile",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "localizedString",
      group: "profile",
      description:
        "Use only the role approved for public display, entered explicitly in German and English.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "editorialImage",
      group: "media",
      description:
        "Use an approved portrait and complete its source, rights, consent, and alternative text.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "localizedRichText",
      group: "profile",
      description:
        "Use only reviewed biographical and qualification claims. Complete German and English independently.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialUrl",
      title: "Social profile URL",
      type: "url",
      group: "profile",
      description:
        "Optional approved public profile. Use the complete HTTPS address.",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["https"] }),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "workflow",
      description:
        "Lower numbers appear first on the Team page. Use increments of 10 to leave room for later additions.",
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "active",
      title: "Show on the website",
      type: "boolean",
      group: "workflow",
      description:
        "Turn this off to retain the profile in Sanity while omitting it from the public Team page.",
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
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      role: "role.de",
      englishRole: "role.en",
      media: "photo",
      order: "order",
      active: "active",
      editorialState: "editorialState",
    },
    prepare({
      active,
      editorialState,
      englishRole,
      media,
      order,
      role,
      title,
    }) {
      const detail = [
        typeof order === "number" ? `Order ${order}` : null,
        typeof role === "string" ? role : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        title: title || "Untitled team member",
        subtitle: createEditorialPreviewSubtitle({
          active,
          detail,
          editorialState,
          englishValue: englishRole,
        }),
        media,
      };
    },
  },
});
