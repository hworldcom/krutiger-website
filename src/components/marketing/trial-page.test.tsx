import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import { trialSessionPassCheckoutUrl } from "@/lib/bsport/passes";

import { TrialPage } from "./trial-page";

describe("TrialPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)(
    "renders the localized %s offer before bSport checkout",
    (_, dictionary) => {
      const markup = renderToStaticMarkup(
        <TrialPage
          content={dictionary.routes.trialClass}
          details={dictionary.trialPage}
        />,
      );

      expect(markup.match(/<h1\b/g)).toHaveLength(1);
      expect(markup).toContain('data-trial-offer="true"');
      expect(markup).toContain(dictionary.trialPage.offerTitle);
      dictionary.trialPage.benefits.forEach((benefit) => {
        expect(markup).toContain(benefit.title);
      });
      expect(markup).toContain(
        `href="${trialSessionPassCheckoutUrl.replaceAll("&", "&amp;")}"`,
      );
    },
  );
});
