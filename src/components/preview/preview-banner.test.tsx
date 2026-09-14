/** @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PreviewBanner } from "./preview-banner";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/en/training"),
}));

describe("PreviewBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("identifies Draft Mode and submits an exit request for the current route", () => {
    render(
      <PreviewBanner
        fallbackDestination="/en"
        labels={{
          exitAction: "Exit preview",
          landmarkLabel: "Draft preview",
          status: "Draft preview is active.",
        }}
      />,
    );

    expect(
      screen.getByRole("complementary", { name: "Draft preview" }),
    ).toBeTruthy();
    expect(screen.getByRole("status").textContent).toContain(
      "Draft preview is active.",
    );

    const button = screen.getByRole("button", { name: "Exit preview" });
    const form = button.closest("form");
    const destination = form?.querySelector<HTMLInputElement>(
      'input[name="destination"]',
    );

    expect(form?.getAttribute("action")).toBe("/api/draft-mode/disable");
    expect(form?.getAttribute("method")).toBe("post");
    expect(destination?.value).toBe("/en/training");
  });
});
