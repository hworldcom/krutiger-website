import { describe, expect, it } from "vitest";

import {
  createEditorialPreviewSubtitle,
  editorialStates,
  getEditorialStateLabel,
  isEditorialState,
} from "../../../studio/schemaTypes/editorialWorkflow";

describe("Sanity editorial workflow", () => {
  it("defines the three documented progression states", () => {
    expect([...editorialStates]).toEqual(["draft", "review", "ready"]);
    expect(getEditorialStateLabel("draft")).toBe("In progress");
    expect(getEditorialStateLabel("review")).toBe("Ready for review");
    expect(getEditorialStateLabel("ready")).toBe("Publication-ready");
    expect(getEditorialStateLabel(undefined)).toBe("Editorial state missing");
  });

  it("rejects unknown workflow values", () => {
    expect(isEditorialState("ready")).toBe(true);
    expect(isEditorialState("published")).toBe(false);
  });

  it("builds a useful collection preview subtitle", () => {
    expect(
      createEditorialPreviewSubtitle({
        active: false,
        detail: "Order 20 · Kru",
        editorialState: "review",
        englishValue: "Coach",
      }),
    ).toBe(
      "Hidden from website · Ready for review · English added · Order 20 · Kru",
    );
  });

  it("makes a missing English value explicit", () => {
    expect(
      createEditorialPreviewSubtitle({
        editorialState: "draft",
        englishValue: " ",
      }),
    ).toBe("In progress · English missing");
  });
});
