import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "../../i18n/dictionaries/de";
import en from "../../i18n/dictionaries/en";

import { AboutPage } from "./about-page";

describe("AboutPage", () => {
  it("renders the complete ordered story and uploaded image set", () => {
    const markup = renderToStaticMarkup(<AboutPage content={de.aboutPage} />);

    expect(markup).toContain("<h1");
    expect(markup).toContain("<ol");
    expect(markup.match(/<img\b/g)).toHaveLength(6);

    for (const chapter of de.aboutPage.chapters) {
      expect(markup).toContain(`data-chapter-number="${chapter.number}"`);
      expect(markup).toContain(chapter.title);
      expect(markup).toContain(`alt="${chapter.imageAlt}"`);

      if (
        "secondaryImageAlt" in chapter &&
        typeof chapter.secondaryImageAlt === "string"
      ) {
        expect(markup).toContain(`alt="${chapter.secondaryImageAlt}"`);
      }
    }

    for (const value of de.aboutPage.philosophy.values) {
      expect(markup).toContain(value.title);
    }
  });

  it("renders English page copy without leaking the German hero", () => {
    const markup = renderToStaticMarkup(<AboutPage content={en.aboutPage} />);

    expect(markup).toContain(en.aboutPage.hero.titlePrimary);
    expect(markup).toContain(en.aboutPage.hero.titleSecondary);
    expect(markup).toContain(en.aboutPage.philosophy.title);
    expect(markup).not.toContain(de.aboutPage.hero.titlePrimary);
  });
});
