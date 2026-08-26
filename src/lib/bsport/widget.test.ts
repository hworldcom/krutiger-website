import { describe, expect, it } from "vitest";

import {
  bsportMemberAreaElementId,
  bsportScheduleElementId,
  bsportWidgetScriptUrl,
  createBsportCalendarConfig,
  createBsportLoginConfig,
  resolveBsportCompanyId,
} from "./widget";

describe("bsport widget configuration", () => {
  it("uses the supplied staging calendar configuration", () => {
    expect(bsportWidgetScriptUrl).toBe(
      "https://cdn.staging.bsport.io/scripts/widget.js",
    );
    expect(createBsportCalendarConfig(bsportScheduleElementId)).toEqual({
      parentElement: "bsport-widget-163824",
      companyId: 14416,
      franchiseId: null,
      dialogMode: 1,
      widgetType: "calendar",
      showFab: false,
      fullScreenPopup: false,
      config: { calendar: {} },
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

  it("accepts only positive integer company IDs", () => {
    expect(resolveBsportCompanyId()).toBe(14416);
    expect(resolveBsportCompanyId(" 42 ")).toBe(42);
    expect(() => resolveBsportCompanyId("0")).toThrow(/positive integer/);
    expect(() => resolveBsportCompanyId("not-a-number")).toThrow(
      /positive integer/,
    );
  });
});
