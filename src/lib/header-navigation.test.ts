import { describe, expect, it } from "vitest";

import {
  getHeaderCtaHref,
  headerNavigationConfig,
  isNavigationPathActive,
} from "./header-navigation";
import { trialSessionPassCheckoutUrl } from "./bsport/passes";

describe("header navigation configuration", () => {
  it("links the trial-class action directly to the bsport pass", () => {
    expect(headerNavigationConfig.trialClassDestination).toEqual({
      kind: "external",
      href: trialSessionPassCheckoutUrl,
    });
    expect(getHeaderCtaHref("de")).toBe(trialSessionPassCheckoutUrl);
    expect(getHeaderCtaHref("en")).toBe(trialSessionPassCheckoutUrl);
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
