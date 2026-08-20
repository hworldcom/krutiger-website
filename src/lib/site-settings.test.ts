import { describe, expect, it } from "vitest";

import { locales } from "../i18n/config";
import { siteSettings } from "./site-settings";

describe("site settings", () => {
  it("keeps development contact values explicitly marked as placeholders", () => {
    expect(siteSettings.contact.status).toBe("placeholder");
    expect(siteSettings.contact.address.lines.length).toBeGreaterThan(0);
    expect(() => new URL(siteSettings.contact.address.mapUrl)).not.toThrow();
    expect(siteSettings.contact.email.href).toMatch(/^mailto:/);
    expect(siteSettings.contact.phone.href).toMatch(/^tel:/);
  });

  it("provides localized values for every opening-hours entry", () => {
    for (const entry of siteSettings.contact.openingHours) {
      for (const locale of locales) {
        expect(entry.days[locale]).toBeTruthy();
        expect(entry.hours[locale]).toBeTruthy();
      }
    }
  });

  it("uses the approved KRUTIGER Instagram account", () => {
    expect(siteSettings.social.instagram.url).toBe(
      "https://www.instagram.com/krutiger.muay_thai_in_berlin/",
    );
  });
});
