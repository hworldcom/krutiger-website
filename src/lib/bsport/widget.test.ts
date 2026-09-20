import { describe, expect, it } from "vitest";

import {
  bsportCalendarWidgetScriptUrl,
  bsportGiftCardElementId,
  bsportGiftCardWidgetScriptUrl,
  bsportMemberAreaElementId,
  bsportPrivateTrainingElementId,
  bsportPrivateTrainingWidgetScriptUrl,
  bsportPricingElementId,
  bsportPricingWidgetScriptUrl,
  bsportScheduleElementId,
  bsportTodayElementId,
  bsportShopElementId,
  bsportShopWidgetScriptUrl,
  createBsportCalendarConfig,
  createBsportGiftCardConfig,
  createBsportLoginConfig,
  createBsportPrivateTrainingConfig,
  createBsportShopConfig,
  createBsportSubscriptionConfig,
  createBsportTodayConfig,
  resolveBsportCompanyId,
} from "./widget";

describe("bsport widget configuration", () => {
  it("uses the supplied production calendar configuration", () => {
    expect(bsportCalendarWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(createBsportCalendarConfig(bsportScheduleElementId, "de")).toEqual({
      parentElement: "bsport-widget-368485",
      companyId: 6720,
      franchiseId: null,
      language: "de",
      dialogMode: 3,
      widgetType: "calendar",
      showFab: false,
      fullScreenPopup: false,
      config: { calendar: { variant: "activityName" } },
    });
  });

  it("uses the supplied production today-only calendar configuration", () => {
    expect(createBsportTodayConfig(bsportTodayElementId, "en")).toEqual({
      parentElement: "bsport-widget-679237",
      companyId: 6720,
      franchiseId: null,
      language: "en",
      dialogMode: 1,
      widgetType: "calendar",
      showFab: false,
      fullScreenPopup: false,
      config: { calendar: { todayOnly: true, cardMode: false } },
    });
  });

  it("uses the supplied production member login configuration", () => {
    expect(createBsportLoginConfig(bsportMemberAreaElementId, "de")).toEqual({
      parentElement: "bsport-widget-832086",
      companyId: 6720,
      franchiseId: null,
      language: "de",
      dialogMode: 3,
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
    expect(
      createBsportSubscriptionConfig(bsportPricingElementId, "en"),
    ).toEqual({
      parentElement: "bsport-widget-361765",
      companyId: 6720,
      franchiseId: null,
      language: "en",
      dialogMode: 3,
      widgetType: "subscription",
      showFab: false,
      fullScreenPopup: false,
      config: {
        subscription: {},
      },
    });
  });

  it("uses the supplied production shop configuration", () => {
    expect(bsportShopWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(createBsportShopConfig(bsportShopElementId, "de")).toEqual({
      parentElement: "bsport-widget-140155",
      companyId: 6720,
      franchiseId: null,
      language: "de",
      dialogMode: 1,
      widgetType: "shop",
      showFab: false,
      fullScreenPopup: false,
      config: {
        shop: {},
      },
    });
  });

  it("uses the supplied production gift-card configuration", () => {
    expect(bsportGiftCardWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(createBsportGiftCardConfig(bsportGiftCardElementId, "en")).toEqual({
      parentElement: "bsport-widget-29534",
      companyId: 6720,
      franchiseId: null,
      language: "en",
      dialogMode: 1,
      widgetType: "giftcard",
      showFab: false,
      fullScreenPopup: false,
      config: {
        giftcard: {
          giftcards: [],
        },
      },
    });
  });

  it("uses the supplied production private-training configuration", () => {
    expect(bsportPrivateTrainingWidgetScriptUrl).toBe(
      "https://cdn.bsport.io/scripts/widget.js",
    );
    expect(
      createBsportPrivateTrainingConfig(bsportPrivateTrainingElementId, "de"),
    ).toEqual({
      parentElement: "bsport-widget-856944",
      companyId: 6720,
      franchiseId: null,
      language: "de",
      dialogMode: 1,
      widgetType: "privateService",
      showFab: false,
      fullScreenPopup: false,
      config: {
        privateService: {
          type: "detail",
          serviceId: 30595,
        },
      },
    });
  });

  it("accepts only positive integer company IDs", () => {
    expect(resolveBsportCompanyId()).toBe(6720);
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
        "NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_SERVICE_ID",
        30595,
      ),
    ).toBe(30595);
    expect(
      resolveBsportCompanyId("", "NEXT_PUBLIC_BSPORT_SHOP_COMPANY_ID", 6720),
    ).toBe(6720);
    expect(
      resolveBsportCompanyId(
        "",
        "NEXT_PUBLIC_BSPORT_GIFT_CARD_COMPANY_ID",
        6720,
      ),
    ).toBe(6720);
    expect(
      resolveBsportCompanyId("", "NEXT_PUBLIC_BSPORT_PRICING_COMPANY_ID", 6720),
    ).toBe(6720);
    expect(
      resolveBsportCompanyId(
        "",
        "NEXT_PUBLIC_BSPORT_PRIVATE_TRAINING_COMPANY_ID",
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
