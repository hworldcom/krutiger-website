import type { PortableTextBlock } from "@portabletext/types";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import type { LegalPageEditorialContent } from "@/content/editorial";

import { LegalPage } from "./legal-page";

const body = [
  {
    _key: "responsible-heading",
    _type: "block",
    children: [
      {
        _key: "responsible-heading-text",
        _type: "span",
        marks: [],
        text: "Responsible party",
      },
    ],
    markDefs: [],
    style: "h2",
  },
  {
    _key: "contact-paragraph",
    _type: "block",
    children: [
      {
        _key: "contact-prefix",
        _type: "span",
        marks: [],
        text: "Contact us by ",
      },
      {
        _key: "contact-link-text",
        _type: "span",
        marks: ["contact-link"],
        text: "email",
      },
    ],
    markDefs: [
      {
        _key: "contact-link",
        _type: "link",
        href: "mailto:info@krutigermuaythai.de",
        openInNewTab: false,
      },
    ],
    style: "normal",
  },
  {
    _key: "first-purpose",
    _type: "block",
    children: [
      {
        _key: "first-purpose-text",
        _type: "span",
        marks: [],
        text: "Process enquiries",
      },
    ],
    level: 1,
    listItem: "bullet",
    markDefs: [],
    style: "normal",
  },
] as PortableTextBlock[];

const content: LegalPageEditorialContent = {
  body,
  hero: {
    eyebrow: "Legal",
    introduction: "Current, legally reviewed information.",
    title: "Privacy policy",
  },
  seo: {
    description: "Privacy information",
    shareImage: {
      alternativeText: "KRUTIGER Muay Thai Berlin",
      src: "/images/home/main.png",
    },
    title: "Privacy policy",
  },
};

describe("LegalPage", () => {
  it("renders structured Portable Text and safe links", () => {
    const markup = renderToStaticMarkup(
      <LegalPage content={content} contentSource="sanity" />,
    );

    expect(markup).toContain('data-content-source="sanity"');
    expect(markup).toContain("<h1");
    expect(markup).toContain("Privacy policy");
    expect(markup).toContain("<h2");
    expect(markup).toContain("Responsible party");
    expect(markup).toContain("<ul");
    expect(markup).toContain('href="mailto:info@krutigermuaythai.de"');
    expect(markup).not.toContain('target="_blank"');
  });

  it("shows draft fallback feedback when supplied", () => {
    const markup = renderToStaticMarkup(
      <LegalPage
        content={{ ...content, body: [] }}
        contentSource="fallback"
        draftContentIssue="Draft content is incomplete."
      />,
    );

    expect(markup).toContain('data-content-source="fallback"');
    expect(markup).toContain("Draft content is incomplete.");
    expect(markup).not.toContain("<article");
  });
});
