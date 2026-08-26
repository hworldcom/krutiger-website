import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { NotFoundContent } from "./not-found-content";

describe("NotFoundContent", () => {
  it("offers clear recovery links in both supported languages", () => {
    const markup = renderToStaticMarkup(<NotFoundContent />);

    expect(markup).toContain(`<h1`);
    expect(markup).toContain(de.notFound.title);
    expect(markup).toContain(en.notFound.title);
    expect(markup).toContain(`href="/de"`);
    expect(markup).toContain(`href="/en"`);
    expect(markup).toContain(`lang="en"`);
  });
});
