import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { MonthlyPassPricing } from "./monthly-pass-pricing";

describe("MonthlyPassPricing", () => {
  it("renders the four monthly passes and their bsport purchase links", () => {
    const markup = renderToStaticMarkup(
      <MonthlyPassPricing
        copy={de.integrations.pricing.monthlyPasses}
        locale="de"
      />,
    );

    expect(markup.match(/<article/g)).toHaveLength(4);
    expect(markup).toContain("4 Teilnahmen");
    expect(markup).toContain("Unbegrenzte Teilnahmen");
    expect(markup).toContain(
      "https://backoffice.bsport.io/customer/payment/pass/792602/?membership=6720&amp;force=true",
    );
    expect(markup).toContain(
      "https://backoffice.bsport.io/customer/payment/pass/792762/?membership=6720&amp;force=true",
    );
    expect(
      markup.match(/Gültig für 1 Monat ab dem Abrechnungsdatum\./g),
    ).toHaveLength(1);
  });

  it("renders the monthly-pass terms in English", () => {
    const markup = renderToStaticMarkup(
      <MonthlyPassPricing
        copy={en.integrations.pricing.monthlyPasses}
        locale="en"
      />,
    );

    expect(markup).toContain("Monthly passes");
    expect(markup).toContain("Valid for 1 month from the billing date.");
    expect(markup).toContain("Unlimited sessions");
  });
});
