import { describe, expect, it } from "vitest";

import de from "@/i18n/dictionaries/de";

import { createSiteSettingsFallback } from "../content/page-fallbacks";
import { siteConfig } from "./site";
import {
  createSiteStructuredData,
  serializeStructuredData,
} from "./structured-data";

describe("site structured data", () => {
  it("identifies the official site and Berlin business", () => {
    const data = createSiteStructuredData(createSiteSettingsFallback(de, "de"));

    expect(data["@graph"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "@type": "WebSite",
          name: "KRUTIGER",
          url: `${siteConfig.url}/`,
        }),
        expect.objectContaining({
          "@type": "SportsActivityLocation",
          address: expect.objectContaining({
            streetAddress: "Karl-Marx-Allee 3",
            postalCode: "10178",
            addressLocality: "Berlin",
          }),
        }),
      ]),
    );
  });

  it("escapes markup-significant characters before rendering JSON-LD", () => {
    expect(serializeStructuredData({ name: "</script>" })).toBe(
      '{"name":"\\u003c/script>"}',
    );
  });
});
