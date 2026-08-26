import { describe, expect, it } from "vitest";

import { developmentSiteUrl, resolveSiteUrl, siteConfig } from "./site";

describe("siteConfig", () => {
  it("provides non-empty default metadata", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.thaiName).toBe("ครูเสือ");
    expect(siteConfig.description).toBeTruthy();
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it("uses a development-safe URL when no deployment origin is configured", () => {
    expect(resolveSiteUrl()).toBe(developmentSiteUrl);
    expect(resolveSiteUrl("   ")).toBe(developmentSiteUrl);
  });

  it("normalizes and validates configured deployment origins", () => {
    expect(resolveSiteUrl(" https://www.krutigermuaythai.de/ ")).toBe(
      "https://www.krutigermuaythai.de",
    );
    expect(() => resolveSiteUrl("ftp://example.com")).toThrow(/http or https/);
    expect(() => resolveSiteUrl("https://example.com/de")).toThrow(
      /without a path/,
    );
  });
});
