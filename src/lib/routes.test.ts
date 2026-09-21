import { describe, expect, it } from "vitest";

import {
  contentRoutes,
  footerRoutes,
  getRouteById,
  getRouteBySegments,
  legalNavigationRoutes,
  primaryNavigationRoutes,
  routeIds,
  secondaryNavigationRoutes,
  siteRoutes,
} from "./routes";

describe("site route configuration", () => {
  it("defines every route id and path exactly once", () => {
    expect(new Set(siteRoutes.map((route) => route.id)).size).toBe(
      routeIds.length,
    );
    expect(new Set(siteRoutes.map((route) => route.path)).size).toBe(
      siteRoutes.length,
    );
  });

  it("contains the complete MVP and legal route map", () => {
    expect(siteRoutes.map((route) => route.path)).toEqual([
      "/",
      "/training",
      "/private",
      "/schedule",
      "/prices",
      "/shop",
      "/coaches",
      "/about",
      "/faq",
      "/contact",
      "/member-area",
      "/gift-cards",
      "/impressum",
      "/datenschutz",
    ]);
  });

  it("keeps navigation groups centralized and intentionally small", () => {
    expect(primaryNavigationRoutes.map((route) => route.id)).toEqual([
      "home",
      "training",
      "privateTraining",
      "schedule",
      "prices",
      "shop",
      "coaches",
      "about",
    ]);
    expect(secondaryNavigationRoutes.map((route) => route.id)).toEqual([
      "faq",
      "contact",
      "memberArea",
      "giftCards",
    ]);
    expect(legalNavigationRoutes.map((route) => route.id)).toEqual([
      "imprint",
      "privacy",
    ]);
    expect(footerRoutes).toHaveLength(siteRoutes.length - 1);
  });

  it("resolves known path segments and rejects unknown paths", () => {
    expect(getRouteBySegments(["gift-cards"])?.id).toBe("giftCards");
    expect(getRouteBySegments(["shop"])?.id).toBe("shop");
    expect(getRouteBySegments(["private"])?.id).toBe("privateTraining");
    expect(getRouteBySegments(["training", "advanced"])).toBeUndefined();
    expect(getRouteBySegments(["unknown"])).toBeUndefined();
    expect(contentRoutes.map((route) => route.path)).not.toContain("/");
  });

  it("marks only operational pages with future integration boundaries", () => {
    expect(getRouteById("schedule").integration).toBe("schedule");
    expect(getRouteById("privateTraining").integration).toBe("privateTraining");
    expect(getRouteById("prices").integration).toBe("pricing");
    expect(getRouteById("shop").integration).toBe("shop");
    expect(getRouteById("memberArea").integration).toBe("memberArea");
    expect(getRouteById("giftCards").integration).toBe("giftCards");
    expect(getRouteById("training").integration).toBeUndefined();
  });
});
