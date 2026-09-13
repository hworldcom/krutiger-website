import { describe, expect, it } from "vitest";

import {
  requireSanityApiVersion,
  requireSanityDataset,
  requireSanityProjectId,
  requireSanityStudioUrl,
  resolveSanityEnvironment,
} from "./environment";

const validEnvironment = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123xy",
  NEXT_PUBLIC_SANITY_DATASET: "development",
  NEXT_PUBLIC_SANITY_API_VERSION: "2026-09-01",
  NEXT_PUBLIC_SANITY_STUDIO_URL: "http://localhost:3333",
};

describe("Sanity environment", () => {
  it("returns normalized public configuration", () => {
    expect(
      resolveSanityEnvironment({
        ...validEnvironment,
        NEXT_PUBLIC_SANITY_STUDIO_URL: "https://krutiger.sanity.studio/",
      }),
    ).toEqual({
      projectId: "abc123xy",
      dataset: "development",
      apiVersion: "2026-09-01",
      studioUrl: "https://krutiger.sanity.studio",
    });
  });

  it("reports a missing project ID by variable name", () => {
    expect(() => requireSanityProjectId(undefined)).toThrow(
      "Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID.",
    );
  });

  it.each(["Production", "-development", "development-"])(
    "rejects the invalid dataset %s",
    (dataset) => {
      expect(() => requireSanityDataset(dataset)).toThrow(
        "NEXT_PUBLIC_SANITY_DATASET must be 2–64 lowercase letters, numbers, dashes, or underscores and must start and end with a letter or number.",
      );
    },
  );

  it("rejects an invalid API date", () => {
    expect(() => requireSanityApiVersion("2026-02-31")).toThrow(
      "NEXT_PUBLIC_SANITY_API_VERSION must be a valid YYYY-MM-DD date.",
    );
  });

  it.each([
    "krutiger.sanity.studio",
    "ftp://krutiger.example.com",
    "https://user:password@krutiger.example.com",
    "https://krutiger.example.com?token=secret",
  ])("rejects the unsafe Studio URL %s", (studioUrl) => {
    expect(() => requireSanityStudioUrl(studioUrl)).toThrow(
      /NEXT_PUBLIC_SANITY_STUDIO_URL must be an absolute HTTP\(S\) URL/,
    );
  });
});
