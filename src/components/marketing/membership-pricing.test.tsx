/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  membershipDurations,
  membershipsByDuration,
} from "@/lib/bsport/memberships";

import { MembershipPricing } from "./membership-pricing";

afterEach(cleanup);

describe("MembershipPricing", () => {
  const memberships = membershipDurations.flatMap(
    (duration) => membershipsByDuration[duration],
  );

  it("shows the four 12-month memberships and their bsport checkouts", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen
        .getByRole("link", { name: /Basic, 12 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
    );
    expect(screen.getByText("4 Teilnahmen im Monat an:")).toBeTruthy();
    expect(screen.getByText("Unbegrenzter Zugang zu:")).toBeTruthy();
    expect(
      screen.getAllByText("Zahlung jeweils am 1. des Monats"),
    ).toHaveLength(1);
    expect(
      screen.getAllByText(
        "Deine Mitgliedschaft verlängert sich nach Ablauf der gewählten Vertragslaufzeit automatisch, sofern sie nicht fristgerecht gekündigt wird.",
      ),
    ).toHaveLength(1);
  });

  it("allows switching between membership durations", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "6 Monate" }));

    expect(
      screen
        .getByRole("tab", { name: "6 Monate" })
        .getAttribute("aria-selected"),
    ).toBe("true");
    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen.getByRole("link", { name: /Plus, 6 Monate/ }).getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/55349?force=true",
    );
    expect(
      screen.getAllByText(
        "Deine Mitgliedschaft verlängert sich nach Ablauf der gewählten Vertragslaufzeit automatisch, sofern sie nicht fristgerecht gekündigt wird.",
      ),
    ).toHaveLength(1);
  });

  it("shows the four 3-month memberships", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "3 Monate" }));

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen
        .getByRole("link", { name: /Unlimited, 3 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/55351?force=true",
    );
    expect(
      screen.getAllByText(
        "Deine Mitgliedschaft verlängert sich nach Ablauf der gewählten Vertragslaufzeit automatisch, sofern sie nicht fristgerecht gekündigt wird.",
      ),
    ).toHaveLength(1);
  });
});
