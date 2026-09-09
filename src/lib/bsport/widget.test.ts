import { describe, expect, it } from "vitest";

import {
  bsportCalendarWidgetScriptUrl,
  bsportMemberAreaElementId,
  bsportPricingElementId,
  bsportPricingWidgetScriptUrl,
  bsportScheduleElementId,
  createBsportCalendarConfig,
  createBsportLoginConfig,
  createBsportSubscriptionConfig,
  resolveBsportCompanyId,
} from "./widget";

describe("bsport widget configuration", () => {
  it("uses the supplied production calendar configuration", () => {
    expect(bsportCalendarWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(createBsportCalendarConfig(bsportScheduleElementId)).toEqual({
      parentElement: "bsport-widget-368485",
      companyId: 6720,
      franchiseId: null,
      dialogMode: 3,
      widgetType: "calendar",
      showFab: false,
      fullScreenPopup: false,
      config: { calendar: { variant: "activityName" } },
    });
  });

  it("uses the supplied member login configuration", () => {
    expect(createBsportLoginConfig(bsportMemberAreaElementId)).toEqual({
      parentElement: "bsport-widget-235346",
      companyId: 14416,
      franchiseId: null,
      dialogMode: 1,
      widgetType: "loginButton",
      showFab: false,
      fullScreenPopup: false,
      config: {
        loginButton: {
          openMemberProfile: true,
        },
      },
    });
  });

  it("uses the supplied production subscription configuration", () => {
    expect(bsportPricingWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(createBsportSubscriptionConfig(bsportPricingElementId)).toEqual({
      parentElement: "bsport-widget-361765",
      companyId: 6720,
      franchiseId: null,
      dialogMode: 3,
      widgetType: "subscription",
      showFab: false,
      fullScreenPopup: false,
      config: {
        subscription: {},
      },
    });
  });

  it("accepts only positive integer company IDs", () => {
    expect(resolveBsportCompanyId()).toBe(14416);
    expect(
      resolveBsportCompanyId(
        "",
        "NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID",
        6720,
      ),
    ).toBe(6720);
    expect(
      resolveBsportCompanyId(
        "",
        "NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID",
        6720,
      ),
    ).toBe(6720);
    expect(resolveBsportCompanyId(" 42 ")).toBe(42);
    expect(() => resolveBsportCompanyId("0")).toThrow(/positive integer/);
    expect(() => resolveBsportCompanyId("not-a-number")).toThrow(
      /positive integer/,
    );
    expect(() =>
      resolveBsportCompanyId(
        "invalid",
        "NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID",
      ),
    ).toThrow(/NEXT_PUBLIC_BSPORT_CALENDAR_COMPANY_ID/);
  });
});
