import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { createHomepageFallback } from "@/content/page-fallbacks";
import de from "../../i18n/dictionaries/de";
import en from "../../i18n/dictionaries/en";

import { HomePage } from "./home-page";

describe("HomePage", () => {
  it("renders the German hero, live schedule boundary, values, and localized actions", () => {
    const markup = renderToStaticMarkup(
      <HomePage
        content={createHomepageFallback(de)}
        contentSource="fallback"
        locale="de"
        schedule={de.homePage.schedule}
      />,
    );

    expect(markup).toContain("<h1");
    expect(markup).toContain("images%2Fhome%2Fmain.png");
    expect(markup).toContain('href="/de/contact"');
    expect(markup).toContain('href="/de/schedule"');
    expect(markup).toContain('data-integration-boundary="home-schedule"');
    expect(markup).toContain('id="bsport-widget-679237"');
    expect(markup).not.toContain('data-placeholder-data="true"');

    for (const item of de.homePage.values.items) {
      expect(markup).toContain(item.title);
    }
  });

  it("renders English copy and paths without leaking the German headline", () => {
    const markup = renderToStaticMarkup(
      <HomePage
        content={createHomepageFallback(en)}
        contentSource="fallback"
        locale="en"
        schedule={en.homePage.schedule}
      />,
    );

    expect(markup).toContain(en.homePage.hero.titleLines[0]);
    expect(markup).toContain('href="/en/contact"');
    expect(markup).toContain('href="/en/schedule"');
    expect(markup).not.toContain(de.homePage.hero.titleLines[0]);
  });
});
