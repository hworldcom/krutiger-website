/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import axe from "axe-core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";

import { SiteShell } from "./site-shell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/de",
}));

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => {
  cleanup();
  document.documentElement.style.overflow = "";
});

function renderShell() {
  return render(
    <SiteShell dictionary={de} locale="de">
      <section aria-labelledby="test-page-heading">
        <h1 id="test-page-heading">Test page</h1>
        <p>Test content</p>
      </section>
    </SiteShell>,
  );
}

describe("SiteShell", () => {
  it("has no critical or serious automated accessibility violations", async () => {
    const { container } = renderShell();
    const results = await axe.run(container, {
      rules: {
        // jsdom does not calculate rendered colors; contrast remains a manual gate.
        "color-contrast": { enabled: false },
      },
    });
    const highImpactViolations = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );

    expect(highImpactViolations).toEqual([]);
  });

  it("provides a keyboard skip target", () => {
    renderShell();

    const skipLink = screen.getByRole("link", {
      name: de.shell.skipToContent,
    });
    const main = screen.getByRole("main");

    expect(skipLink.getAttribute("href")).toBe("#main-content");
    expect(main.id).toBe("main-content");
    expect(main.tabIndex).toBe(-1);
  });

  it("uses one compact language dropdown in each navigation layout", () => {
    const { container } = renderShell();
    const switchers = container.querySelectorAll("[data-language-switcher]");

    expect(switchers).toHaveLength(2);

    for (const switcher of switchers) {
      const summary = switcher.querySelector("summary");
      const languageLinks = switcher.querySelectorAll(
        "[data-bsport-language-switch]",
      );

      expect(summary?.textContent).toContain("DE");
      expect(
        summary?.querySelector('[data-language-flag="de"]'),
      ).not.toBeNull();
      expect(languageLinks).toHaveLength(2);
      expect(languageLinks[0]?.getAttribute("aria-current")).toBe("page");
      expect(languageLinks[0]?.getAttribute("href")).toBe("/de");
      expect(languageLinks[1]?.getAttribute("href")).toBe("/en");
    }
  });

  it("opens and closes the mobile navigation while restoring focus and scroll", () => {
    renderShell();

    const openButton = screen.getByRole("button", {
      name: de.shell.header.openMenu,
    });

    fireEvent.click(openButton);

    expect(openButton.getAttribute("aria-expanded")).toBe("true");
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: de.shell.header.closeMenu }),
    );

    fireEvent.click(
      screen.getByRole("button", { name: de.shell.header.closeMenu }),
    );

    expect(openButton.getAttribute("aria-expanded")).toBe("false");
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.activeElement).toBe(openButton);
  });
});
