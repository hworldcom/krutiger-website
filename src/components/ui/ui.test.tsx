import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  Button,
  ButtonLink,
  Container,
  ContentCard,
  IconLink,
  Logo,
  SectionHeader,
} from ".";

describe("core UI primitives", () => {
  it("renders an action as a native button with safe defaults", () => {
    const markup = renderToStaticMarkup(
      <Button data-testid="action" disabled>
        Save
      </Button>,
    );

    expect(markup).toContain("<button");
    expect(markup).toContain('type="button"');
    expect(markup).toContain("disabled");
    expect(markup).toContain('data-testid="action"');
    expect(markup).toContain("bg-brand");
  });

  it("renders navigation as a link", () => {
    const markup = renderToStaticMarkup(
      <ButtonLink href="/de/training" variant="secondary">
        Training
      </ButtonLink>,
    );

    expect(markup).toMatch(/^<a\b/);
    expect(markup).toContain('href="/de/training"');
    expect(markup).toContain("border-line");
    expect(markup).not.toContain("<button");
  });

  it("forwards suitable container and card attributes", () => {
    const container = renderToStaticMarkup(
      <Container data-layout="copy" id="intro" size="copy">
        Introduction
      </Container>,
    );
    const card = renderToStaticMarkup(
      <ContentCard aria-label="Summary" as="div" tone="warm">
        Summary
      </ContentCard>,
    );

    expect(container).toContain('id="intro"');
    expect(container).toContain('data-layout="copy"');
    expect(container).toContain("max-w-copy");
    expect(card).toContain('<div aria-label="Summary"');
    expect(card).toContain("bg-warm-canvas");
  });

  it("uses the selected semantic heading level", () => {
    const markup = renderToStaticMarkup(
      <SectionHeader
        description="Supporting copy"
        eyebrow="Overview"
        headingId="classes-heading"
        level={3}
        title="Classes"
      />,
    );

    expect(markup).toContain('<h3 class="');
    expect(markup).toContain('id="classes-heading"');
    expect(markup).toContain(">Classes</h3>");
    expect(markup).toContain("Supporting copy");
  });

  it("keeps decorative and meaningful logo alternatives distinct", () => {
    const meaningful = renderToStaticMarkup(<Logo alt="KRUTIGER Muay Thai" />);
    const decorative = renderToStaticMarkup(<Logo decorative />);

    expect(meaningful).toContain('alt="KRUTIGER Muay Thai"');
    expect(meaningful).toContain("images%2Fhome%2Fkru-tiger-logo.png");
    expect(meaningful).toContain('data-logo="kru-tiger-logo"');
    expect(decorative).toContain('alt=""');
    expect(decorative).toContain('aria-hidden="true"');
  });

  it("hides decorative icons while retaining link text for assistive technology", () => {
    const markup = renderToStaticMarkup(
      <IconLink href="/de" icon={<svg />} label="Home" />,
    );

    expect(markup).toContain('aria-hidden="true"');
    expect(markup).toContain('class="sr-only"');
    expect(markup).toContain(">Home</span>");
  });
});
