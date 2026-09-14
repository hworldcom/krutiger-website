import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getTrainingClasses } from "@/content/training";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { TrainingClassCard } from "./training-class-card";
import { TrainingPage } from "./training-page";

describe("TrainingPage", () => {
  it("renders one German page heading and four reusable course cards", () => {
    const trainingClasses = getTrainingClasses("de");
    const markup = renderToStaticMarkup(
      <TrainingPage
        content={de.routes.training}
        labels={de.trainingPage}
        locale="de"
        trainingClasses={trainingClasses}
      />,
    );

    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain(de.routes.training.title);
    expect(markup.match(/data-training-class=/g)).toHaveLength(4);
    expect(markup).toContain('data-training-class="muay-thai-basic"');
    expect(markup).toContain(trainingClasses[0].description);
    expect(markup).toContain(
      `alt="${trainingClasses[0].image.alternativeText}"`,
    );
  });

  it("renders explicit English copy without leaking German descriptions", () => {
    const englishClasses = getTrainingClasses("en");
    const germanClasses = getTrainingClasses("de");
    const markup = renderToStaticMarkup(
      <TrainingPage
        content={en.routes.training}
        labels={en.trainingPage}
        locale="en"
        trainingClasses={englishClasses}
      />,
    );

    expect(markup).toContain(en.routes.training.title);
    expect(markup).toContain(englishClasses[0].description);
    expect(markup).not.toContain(germanClasses[0].description);
    expect(markup).toContain('href="/en/schedule"');
  });

  it("makes incomplete draft content visible to the editor", () => {
    const markup = renderToStaticMarkup(
      <TrainingPage
        content={en.routes.training}
        draftContentIssue={en.draftMode.incompleteContent}
        labels={en.trainingPage}
        locale="en"
        trainingClasses={getTrainingClasses("en")}
      />,
    );

    expect(markup).toContain("data-draft-content-issue");
    expect(markup).toContain(en.draftMode.incompleteContent);
    expect(markup).toContain('role="alert"');
  });
});

describe("TrainingClassCard", () => {
  it("gives the localized schedule link a descriptive accessible name", () => {
    const trainingClass = getTrainingClasses("de")[1];
    const markup = renderToStaticMarkup(
      <TrainingClassCard
        index={1}
        labels={de.trainingPage}
        locale="de"
        trainingClass={trainingClass}
      />,
    );

    expect(markup).toContain(
      `aria-label="Kursplan für ${trainingClass.name} öffnen"`,
    );
    expect(markup).toContain('href="/de/schedule"');
    expect(markup).toContain("02");
  });
});
