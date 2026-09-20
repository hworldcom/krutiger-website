import { describe, expect, it } from "vitest";

import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "./resolve-content";

describe("Sanity content resolution", () => {
  it("uses validated Sanity content", () => {
    expect(
      resolveContent({ status: "ready", value: "Sanity" }, "Fallback"),
    ).toEqual({ value: "Sanity", source: "sanity" });
  });

  it.each([
    { status: "missing" as const },
    { status: "missingTranslation" as const, issues: [] },
    { status: "invalid" as const, issues: [] },
    { status: "unavailable" as const, reason: "request" as const },
  ])("uses an explicit fallback for $status", (result) => {
    expect(resolveContent(result, "Fallback")).toEqual({
      value: "Fallback",
      source: "fallback",
      fallbackReason: result.status,
    });
  });

  it("selects a distinct localized preview message for each fallback class", () => {
    const messages = {
      incompleteContent: "Incomplete",
      missingContent: "Missing",
      unavailableContent: "Unavailable",
    };

    expect(getDraftContentFallbackMessage("invalid", messages)).toBe(
      "Incomplete",
    );
    expect(getDraftContentFallbackMessage("missing", messages)).toBe("Missing");
    expect(getDraftContentFallbackMessage("unavailable", messages)).toBe(
      "Unavailable",
    );
    expect(getDraftContentFallbackMessage(undefined, messages)).toBeUndefined();
  });
});
