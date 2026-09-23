import { describe, expect, it } from "vitest";

import {
  getHeaderCtaHref,
  headerNavigationConfig,
  isNavigationPathActive,
} from "./header-navigation";

describe("header navigation configuration", () => {
  it("links the trial-class action to the localized information page", () => {
    expect(headerNavigationConfig.trialClassDestination).toEqual({
      kind: "internal",
      routeId: "trialClass",
    });
    expect(getHeaderCtaHref("de")).toBe("/de/trial");
    expect(getHeaderCtaHref("en")).toBe("/en/trial");
  });

  it("can switch to a future external bsport destination without header changes", () => {
    expect(
      getHeaderCtaHref("de", {
        kind: "external",
        href: "https://example.bsport.io/trial",
      }),
    ).toBe("https://example.bsport.io/trial");
  });

  it("identifies exact and nested active navigation paths", () => {
    expect(isNavigationPathActive("/de/training", "/de/training")).toBe(true);
    expect(
      isNavigationPathActive(
        "/de/training/beginners/",
        "/de/training?source=header",
      ),
    ).toBe(true);
    expect(isNavigationPathActive("/de/prices", "/de/training")).toBe(false);
    expect(isNavigationPathActive("/de", "/de", true)).toBe(true);
    expect(isNavigationPathActive("/de/training", "/de", true)).toBe(false);
  });
});
