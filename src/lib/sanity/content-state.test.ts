import { describe, expect, it } from "vitest";

import type { ProjectionResult } from "./result";
import { resolveListProjection, toUnavailableContentResult } from "./state";

describe("Sanity content states", () => {
  it("treats an empty published collection as intentionally missing", () => {
    const projection: ProjectionResult<readonly string[]> = {
      status: "ready",
      value: [],
    };

    expect(resolveListProjection(projection)).toEqual({ status: "missing" });
  });

  it("preserves projection errors", () => {
    const projection: ProjectionResult<readonly string[]> = {
      status: "missingTranslation",
      issues: [
        {
          code: "missingTranslation",
          message: "English is missing.",
          path: "title.en",
        },
      ],
    };

    expect(resolveListProjection(projection)).toBe(projection);
  });

  it("separates configuration failures from request failures", () => {
    expect(
      toUnavailableContentResult(
        new Error(
          "Missing required environment variable: NEXT_PUBLIC_SANITY_DATASET.",
        ),
      ),
    ).toEqual({ status: "unavailable", reason: "configuration" });
    expect(
      toUnavailableContentResult(new Error("Sanity request timed out")),
    ).toEqual({ status: "unavailable", reason: "request" });
  });
});
