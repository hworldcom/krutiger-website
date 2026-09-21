import { defineField, type DocumentBadgeComponent } from "sanity";

export const editorialStates = ["draft", "review", "ready"] as const;

export type EditorialState = (typeof editorialStates)[number];

const editorialStatePresentation: Record<
  EditorialState,
  Readonly<{
    color: "primary" | "success" | "warning";
    label: string;
    optionTitle: string;
  }>
> = {
  draft: {
    color: "primary",
    label: "In progress",
    optionTitle: "In progress — incomplete draft",
  },
  review: {
    color: "warning",
    label: "Ready for review",
    optionTitle: "Ready for review",
  },
  ready: {
    color: "success",
    label: "Publication-ready",
    optionTitle: "Publication-ready — approved content",
  },
};

type PreviewSubtitleOptions = Readonly<{
  active?: unknown;
  detail?: string;
  englishValue?: unknown;
  editorialState?: unknown;
}>;

type EditorialDocument = Readonly<{
  _type?: unknown;
  contactStatus?: unknown;
  editorialState?: unknown;
}>;

export function isEditorialState(value: unknown): value is EditorialState {
  return editorialStates.some((state) => state === value);
}

export function getEditorialStateLabel(value: unknown) {
  return isEditorialState(value)
    ? editorialStatePresentation[value].label
    : "Editorial state missing";
}

function hasEnglishContent(value: unknown) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  return Array.isArray(value) && value.length > 0;
}

export function createEditorialPreviewSubtitle({
  active,
  detail,
  englishValue,
  editorialState,
}: PreviewSubtitleOptions) {
  const parts = [];

  if (active === true) {
    parts.push("Visible on website");
  } else if (active === false) {
    parts.push("Hidden from website");
  }

  parts.push(getEditorialStateLabel(editorialState));
  parts.push(
    hasEnglishContent(englishValue) ? "English added" : "English missing",
  );

  if (detail) {
    parts.push(detail);
  }

  return parts.join(" · ");
}

export function defineEditorialStateField() {
  return defineField({
    name: "editorialState",
    title: "Editorial state",
    type: "string",
    group: "workflow",
    description:
      "This label communicates progress to the editorial team. Choose Publication-ready only after content, translations, links, SEO, and image approvals have been reviewed. Sanity validation still controls whether publishing is allowed.",
    options: {
      layout: "radio",
      list: editorialStates.map((value) => ({
        title: editorialStatePresentation[value].optionTitle,
        value,
      })),
    },
    initialValue: "draft",
    validation: (Rule) => Rule.required(),
  });
}

function getCurrentDocument(
  draft: unknown,
  published: unknown,
): EditorialDocument | undefined {
  return (draft ?? published) as EditorialDocument | undefined;
}

export const editorialStateBadge: DocumentBadgeComponent = ({
  draft,
  published,
}) => {
  const document = getCurrentDocument(draft, published);
  const state = document?.editorialState;

  if (!isEditorialState(state)) {
    return {
      color: "warning",
      label: "Editorial state missing",
      title: "Choose an editorial state in the Workflow section.",
    };
  }

  const presentation = editorialStatePresentation[state];

  return {
    color: presentation.color,
    label: presentation.label,
    title: presentation.optionTitle,
  };
};

export const contactStatusBadge: DocumentBadgeComponent = ({
  draft,
  published,
}) => {
  const document = getCurrentDocument(draft, published);

  if (document?._type !== "siteSettings") {
    return null;
  }

  return document.contactStatus === "verified"
    ? {
        color: "success",
        label: "Contact verified",
        title: "KRUTIGER has verified the contact information.",
      }
    : {
        color: "warning",
        label: "Contact placeholder",
        title: "Contact information is not approved for publication.",
      };
};
