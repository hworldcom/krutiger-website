import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { createPricingPageFallback } from "@/content/page-fallbacks";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import { monthlyPasses } from "@/lib/bsport/passes";

import { MonthlyPassPricing } from "./monthly-pass-pricing";

describe("MonthlyPassPricing", () => {
  it("renders the five training passes and their bsport purchase links", () => {
    const markup = renderToStaticMarkup(
      <MonthlyPassPricing
        copy={de.integrations.pricing.monthlyPasses}
        editorial={createPricingPageFallback(de).passes}
        locale="de"
        passes={monthlyPasses}
      />,
    );

    expect(markup.match(/<article/g)).toHaveLength(5);
    expect(markup).toContain("Single Drop In");
    expect(markup).toContain("1 Teilnahme");
    expect(markup).toContain("50 x Pass");
    expect(markup).toContain("50 Teilnahmen");
    expect(markup).toContain(
      "https://backoffice.bsport.io/customer/payment/pass/795480/?membership=6720&amp;force=true",
    );
    expect(markup).toContain(
      "https://backoffice.bsport.io/customer/payment/pass/795529/?membership=6720&amp;force=true",
    );
    expect(markup).toContain("Gültig für 1 Monat");
    expect(markup).toContain("Gültig für 3 Monate");
    expect(markup).toContain("Gültig für 6 Monate");
  });

  it("renders the pass terms in English", () => {
    const markup = renderToStaticMarkup(
      <MonthlyPassPricing
        copy={en.integrations.pricing.monthlyPasses}
        editorial={createPricingPageFallback(en).passes}
        locale="en"
        passes={monthlyPasses}
      />,
    );

    expect(markup).toContain("Training passes");
    expect(markup).toContain("Valid for 1 month");
    expect(markup).toContain("Valid for 6 months");
    expect(markup).toContain("50 sessions");
  });
});
