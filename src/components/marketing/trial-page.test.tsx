/** @vitest-environment jsdom */

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { TrialPage } from "./trial-page";

afterEach(cleanup);

describe("TrialPage", () => {
  it.each([
    ["de", de],
    ["en", en],
  ] as const)(
    "offers the two localized %s trials with their matching bSport checkouts",
    (_, dictionary) => {
      const { container } = render(
        <TrialPage
          content={dictionary.routes.trialClass}
          details={dictionary.trialPage}
        />,
      );

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getAllByRole("article")).toHaveLength(2);

      const trialPass = screen.getByRole("article", {
        name: dictionary.trialPage.trialPass.title,
      });
      const singleSession = screen.getByRole("article", {
        name: dictionary.trialPage.singleSession.title,
      });

      expect(trialPass.textContent).toContain(
        dictionary.trialPage.recommendedBadge,
      );
      expect(singleSession.textContent).not.toContain(
        dictionary.trialPage.recommendedBadge,
      );
      expect(
        within(trialPass)
          .getByRole("link", {
            name: dictionary.trialPage.trialPass.bookingAction,
          })
          .getAttribute("href"),
      ).toBe(
        "https://backoffice.bsport.io/customer/payment/pass/795677/?membership=6720&force=true",
      );
      expect(
        within(singleSession)
          .getByRole("link", {
            name: dictionary.trialPage.singleSession.bookingAction,
          })
          .getAttribute("href"),
      ).toBe(
        "https://backoffice.bsport.io/customer/payment/pass/818953/?membership=6720&force=true",
      );

      for (const [card, copy] of [
        [trialPass, dictionary.trialPage.trialPass],
        [singleSession, dictionary.trialPage.singleSession],
      ] as const) {
        expect(card.textContent).toContain(copy.price);
        const mobileDetails = card.querySelector("details");
        expect(mobileDetails?.open).toBe(false);
        expect(mobileDetails?.textContent).toContain(copy.description);
        copy.benefits.forEach((benefit) => {
          expect(mobileDetails?.textContent).toContain(benefit);
        });
      }

      expect(container.textContent).not.toMatch(/20\s*€|€20/);
      expect(container.querySelector("script")).toBeNull();
    },
  );

  it("shows the agreed prices, validity and repeat booking limit", () => {
    render(<TrialPage content={de.routes.trialClass} details={de.trialPage} />);
    const trialPass = screen.getByRole("article", { name: "Trial Pass" });
    const singleSession = screen.getByRole("article", {
      name: "Einzelnes Probetraining",
    });

    expect(trialPass.textContent).toContain("30 €");
    expect(trialPass.textContent).toContain("3 Trainings, gültig für 14 Tage");
    expect(singleSession.textContent).toContain("15 €");
    expect(singleSession.textContent).toContain("Bis zu 3-mal buchbar");
  });
});
