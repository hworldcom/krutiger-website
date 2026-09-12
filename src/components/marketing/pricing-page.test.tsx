import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { PricingPage } from "./pricing-page";

describe("PricingPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)(
    "shows the shared bsport checkout notice once in %s",
    (locale, dictionary) => {
      const markup = renderToStaticMarkup(
        <PricingPage
          content={dictionary.routes.prices}
          integration={dictionary.integrations.pricing}
          locale={locale}
        />,
      );

      expect(
        markup.match(
          new RegExp(dictionary.integrations.pricing.secureCheckoutNotice, "g"),
        ),
      ).toHaveLength(1);
      expect(markup).toContain(
        'aria-describedby="pricing-secure-checkout-note"',
      );
      expect(markup).toContain('<sup aria-hidden="true">*</sup>');
      expect(
        markup.indexOf('id="pricing-secure-checkout-note"'),
      ).toBeGreaterThan(markup.indexOf("data-monthly-pass-pricing"));
    },
  );
});
