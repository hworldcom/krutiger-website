/** @vitest-environment jsdom */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { createKidsPageFallback } from "@/content/page-fallbacks";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";
import {
  kidsTrialSessionPassCheckoutUrl,
  trialSessionPassCheckoutUrl,
} from "@/lib/bsport/passes";

import { KidsPage } from "./kids-page";

afterEach(cleanup);

describe("KidsPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)(
    "offers the correct kids trial and localized next steps in %s",
    (locale, dictionary) => {
      const content = createKidsPageFallback(dictionary);
      const { container } = render(
        <KidsPage content={content} contentSource="fallback" locale={locale} />,
      );
      const trial = screen.getByRole("link", {
        name: content.hero.trialAction,
      });
      expect(trial.getAttribute("href")).toBe(kidsTrialSessionPassCheckoutUrl);
      expect(trial.getAttribute("target")).toBe("_blank");
      expect(
        container.querySelector(`a[href="${trialSessionPassCheckoutUrl}"]`),
      ).toBeNull();
      expect(
        screen
          .getByRole("link", { name: content.nextSteps.scheduleAction })
          .getAttribute("href"),
      ).toBe(`/${locale}/schedule`);
      expect(
        screen
          .getByRole("link", { name: content.nextSteps.pricesAction })
          .getAttribute("href"),
      ).toBe(`/${locale}/prices`);
      expect(
        screen
          .getByRole("link", { name: content.faq.contactAction })
          .getAttribute("href"),
      ).toBe(`/${locale}/contact`);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      const sections = container.querySelectorAll("section");
      expect(sections).toHaveLength(4);
      expect(sections[1].getAttribute("aria-labelledby")).toBe(
        "kids-benefits-title",
      );
      expect(sections[2].textContent).toContain("6–8");
      expect(sections[2].textContent).toContain("9–12");
      expect(sections[2].textContent).toContain("13+");
      expect(sections[2].textContent).not.toContain("12–16");
      content.faq.items.forEach((item) =>
        expect(container.textContent).toContain(item.answer),
      );
      expect(container.querySelectorAll("details[open]")).toHaveLength(1);
      expect(container.querySelector("script")).toBeNull();
    },
  );

  it("shows the fallback reason only when the route provides a draft warning", () => {
    const { container } = render(
      <KidsPage
        content={createKidsPageFallback(en)}
        contentSource="fallback"
        locale="en"
        draftContentIssue="English content needs review."
      />,
    );
    expect(screen.getByRole("alert").textContent).toBe(
      "English content needs review.",
    );
    expect(
      container
        .querySelector("[data-content-source]")
        ?.getAttribute("data-content-source"),
    ).toBe("fallback");
  });
});
