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

  it("shows the four 24-month memberships and their bsport checkouts", () => {
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
        .getByRole("link", { name: /Basic, 24 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/55692?force=true",
    );
    expect(screen.getByText("4 Teilnahmen im Monat an:")).toBeTruthy();
    expect(screen.getByText("Unbegrenzter Zugang zu:")).toBeTruthy();
    expect(
      screen.getAllByText("Zahlung jeweils am 3. des Monats"),
    ).toHaveLength(1);
    expect(
      screen.getAllByText(
        "Deine Mitgliedschaft verlängert sich nach Ablauf der gewählten Vertragslaufzeit automatisch, sofern sie nicht fristgerecht gekündigt wird.",
      ),
    ).toHaveLength(1);
  });

  it("keeps the existing 12-month memberships available", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "12 Monate" }));

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen
        .getByRole("link", { name: /Flex, 12 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/55344?force=true",
    );
  });

  it("shows the confirmed Student prices, eligibility, and checkout links", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Studierende" }));

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen.getByText(
        "Mitgliedschaften für Schüler und Studierende. Ein gültiger Schüler- oder Studentenausweis ist erforderlich.",
      ),
    ).toBeTruthy();
    expect(
      screen
        .getByRole("link", { name: /Basic, 24 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/56092?force=true",
    );
    expect(
      screen.queryAllByRole("button", { name: "Bald buchbar" }),
    ).toHaveLength(0);
  });

  it("keeps every Student duration connected to its confirmed checkout", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Studierende" }));

    const expectations = [
      ["12 Monate", "Flex", 56096],
      ["6 Monate", "Plus", 56099],
      ["3 Monate", "Unlimited", 56102],
    ] as const;

    for (const [duration, tier, checkoutId] of expectations) {
      fireEvent.click(screen.getByRole("tab", { name: duration }));
      expect(
        screen
          .getByRole("link", { name: new RegExp(`${tier}, ${duration}`) })
          .getAttribute("href"),
      ).toBe(
        `https://backoffice.bsport.io/checkout/6720/subscription/${checkoutId}?force=true`,
      );
    }
  });

  it("shows the confirmed Kids prices and checkout links", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Kinder" }));

    expect(screen.getAllByRole("article")).toHaveLength(4);
    expect(
      screen.getByText(
        "Mitgliedschaften für Kinder und Jugendliche bis 16 Jahre.",
      ),
    ).toBeTruthy();
    expect(
      screen.getAllByText("Altersgerechten Muay-Thai-Kursen"),
    ).toHaveLength(4);
    expect(
      screen
        .getByRole("link", { name: /Basic, 24 Monate/ })
        .getAttribute("href"),
    ).toBe(
      "https://backoffice.bsport.io/checkout/6720/subscription/56117?force=true",
    );
    expect(
      screen.queryAllByRole("button", { name: "Bald buchbar" }),
    ).toHaveLength(0);
  });

  it("keeps every Kids duration connected to its confirmed checkout", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Kinder" }));

    const expectations = [
      ["12 Monate", "Flex", 56123],
      ["6 Monate", "Plus", 56127],
      ["3 Monate", "Unlimited", 56130],
    ] as const;

    for (const [duration, tier, checkoutId] of expectations) {
      fireEvent.click(screen.getByRole("tab", { name: duration }));
      expect(
        screen
          .getByRole("link", { name: new RegExp(`${tier}, ${duration}`) })
          .getAttribute("href"),
      ).toBe(
        `https://backoffice.bsport.io/checkout/6720/subscription/${checkoutId}?force=true`,
      );
    }
  });

  it("supports arrow-key navigation between membership groups", () => {
    render(
      <MembershipPricing
        copy={de.integrations.pricing}
        locale="de"
        memberships={memberships}
      />,
    );

    const adultsTab = screen.getByRole("tab", { name: "Erwachsene" });
    fireEvent.keyDown(adultsTab, { key: "ArrowRight" });

    expect(
      screen
        .getByRole("tab", { name: "Studierende" })
        .getAttribute("aria-selected"),
    ).toBe("true");
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
