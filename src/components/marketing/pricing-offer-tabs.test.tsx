/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { createPricingPageFallback } from "@/content/page-fallbacks";
import de from "@/i18n/dictionaries/de";
import {
  membershipDurations,
  membershipsByDuration,
} from "@/lib/bsport/memberships";
import { monthlyPasses } from "@/lib/bsport/passes";

import { PricingOfferTabs } from "./pricing-offer-tabs";

afterEach(cleanup);

describe("PricingOfferTabs", () => {
  const memberships = membershipDurations.flatMap(
    (duration) => membershipsByDuration[duration],
  );

  it("starts with memberships and switches to the five passes", () => {
    render(
      <PricingOfferTabs
        copy={de.integrations.pricing}
        editorial={createPricingPageFallback(de)}
        locale="de"
        memberships={memberships}
        passes={monthlyPasses}
      />,
    );

    const membershipTab = screen.getByRole("tab", {
      name: "Mitgliedschaften",
    });
    const passesTab = screen.getByRole("tab", { name: "Pässe" });

    expect(membershipTab.getAttribute("aria-selected")).toBe("true");
    expect(
      screen.getByRole("tabpanel", { name: "Mitgliedschaften" }).hidden,
    ).toBe(false);

    fireEvent.click(passesTab);

    expect(passesTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel", { name: "Pässe" }).hidden).toBe(false);
    expect(screen.getAllByRole("article")).toHaveLength(5);
    expect(
      screen.getByRole("heading", { name: "Single Drop In" }),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { name: "50 x Pass" })).toBeTruthy();
  });

  it("supports arrow-key navigation between the offer tabs", () => {
    render(
      <PricingOfferTabs
        copy={de.integrations.pricing}
        editorial={createPricingPageFallback(de)}
        locale="de"
        memberships={memberships}
        passes={monthlyPasses}
      />,
    );

    const membershipTab = screen.getByRole("tab", {
      name: "Mitgliedschaften",
    });
    fireEvent.keyDown(membershipTab, { key: "ArrowRight" });

    expect(
      screen.getByRole("tab", { name: "Pässe" }).getAttribute("aria-selected"),
    ).toBe("true");
  });

  it("opens the passes tab from its direct-link hash", () => {
    window.history.replaceState({}, "", "/de/prices#pricing-offer-tab-passes");

    render(
      <PricingOfferTabs
        copy={de.integrations.pricing}
        editorial={createPricingPageFallback(de)}
        locale="de"
        memberships={memberships}
        passes={monthlyPasses}
      />,
    );

    expect(
      screen.getByRole("tab", { name: "Pässe" }).getAttribute("aria-selected"),
    ).toBe("true");

    window.history.replaceState({}, "", "/");
  });
});
