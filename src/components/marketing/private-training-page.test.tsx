import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { PrivateTrainingPage } from "./private-training-page";

describe("PrivateTrainingPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)("renders the dedicated %s booking page", (locale, dictionary) => {
    const markup = renderToStaticMarkup(
      <PrivateTrainingPage
        content={dictionary.routes.privateTraining}
        guide={dictionary.privateTrainingPage}
        integration={dictionary.integrations.privateTraining}
        locale={locale}
      />,
    );

    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain(dictionary.routes.privateTraining.title);
    expect(markup).toContain(dictionary.routes.privateTraining.description);
    expect(markup).toContain(dictionary.privateTrainingPage.title);
    dictionary.privateTrainingPage.steps.forEach((step) => {
      expect(markup).toContain(step.title);
    });
    expect(markup).toContain('data-integration-boundary="privateTraining"');
    expect(markup).toContain('id="bsport-widget-856944"');
  });
});
