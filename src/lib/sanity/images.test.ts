import { describe, expect, it } from "vitest";

import {
  createSanityImageUrlFactory,
  SANITY_IMAGE_MAX_DIMENSION,
} from "./images";

const createImageUrl = createSanityImageUrlFactory({
  dataset: "development",
  projectId: "nsznfiun",
});

const image = {
  asset: {
    _ref: "image-928ac96d53b0c9049836c86ff25fd3c009039a16-2000x1200-jpg",
  },
  crop: { bottom: 0.1, left: 0.05, right: 0.05, top: 0.1 },
  hotspot: { height: 0.5, width: 0.5, x: 0.45, y: 0.4 },
};

describe("Sanity image URLs", () => {
  it("creates a project-scoped, dimensioned CDN URL", () => {
    const url = new URL(createImageUrl(image, { height: 1_000, width: 1_600 }));

    expect(url.origin).toBe("https://cdn.sanity.io");
    expect(url.pathname).toContain("/images/nsznfiun/development/");
    expect(url.searchParams.get("w")).toBe("1600");
    expect(url.searchParams.get("h")).toBe("1000");
    expect(url.searchParams.get("fit")).toBe("crop");
    expect(url.searchParams.get("auto")).toBe("format");
    expect(url.searchParams.get("q")).toBe("80");
    expect(url.searchParams.get("rect")).not.toBeNull();
  });

  it("rejects oversized or invalid requests", () => {
    expect(() =>
      createImageUrl(image, {
        height: 1_000,
        width: SANITY_IMAGE_MAX_DIMENSION + 1,
      }),
    ).toThrow(/between 1 and 2400/);
    expect(() =>
      createImageUrl(image, { height: 1_000, quality: 101, width: 1_600 }),
    ).toThrow(/quality/);
  });
});
