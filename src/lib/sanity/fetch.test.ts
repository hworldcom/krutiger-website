import { describe, expect, it } from "vitest";

import {
  createSanityQueryPlan,
  SANITY_PUBLISHED_REVALIDATE_SECONDS,
} from "./fetch-plan";

describe("Sanity query mode", () => {
  it("uses the anonymous published client and tagged cache normally", () => {
    expect(createSanityQueryPlan(false, ["sanity:classType"])).toEqual({
      client: "published",
      request: {
        next: {
          revalidate: SANITY_PUBLISHED_REVALIDATE_SECONDS,
          tags: ["sanity:classType"],
        },
      },
    });
  });

  it("uses the authenticated client and bypasses caches in Draft Mode", () => {
    expect(createSanityQueryPlan(true, ["sanity:classType"])).toEqual({
      client: "preview",
      request: { cache: "no-store" },
    });
  });
});
