import { describe, expect, it } from "vitest";

import { siteConfig } from "./site";

describe("siteConfig", () => {
  it("provides non-empty default metadata", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.thaiName).toBe("ครูเสือ");
    expect(siteConfig.description).toBeTruthy();
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });
});
