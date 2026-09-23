import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { MemberAreaPage } from "./member-area-page";

describe("MemberAreaPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)("shows the onboarding journey in %s", (locale, dictionary) => {
    const markup = renderToStaticMarkup(
      <MemberAreaPage
        content={dictionary.routes.memberArea}
        guide={dictionary.memberAreaPage}
        integration={dictionary.integrations.memberArea}
        locale={locale}
      />,
    );

    expect(markup).toContain(
      `href="/${locale}/prices#pricing-offer-tab-memberships"`,
    );
    expect(markup).toContain(
      `href="/${locale}/prices#pricing-offer-tab-passes"`,
    );
    expect(markup).toContain(`href="/${locale}/schedule"`);
    expect(markup).toContain('href="#member-login"');
    expect(markup).toContain('id="member-login"');
    expect(markup).toContain('data-integration-boundary="memberArea"');
    expect(markup).toContain(`href="/${locale}/trial"`);

    dictionary.memberAreaPage.steps.items.forEach((step) => {
      expect(markup).toContain(step.title);
    });
  });
});
