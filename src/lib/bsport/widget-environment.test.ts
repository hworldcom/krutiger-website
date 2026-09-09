/** @vitest-environment jsdom */

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  bsportWidgetScriptUrl,
  prepareBsportWidgetEnvironment,
} from "./widget";

afterEach(() => {
  delete window.__krutigerBsportWidgetScriptUrl;
});

describe("bsport widget script environments", () => {
  it("keeps navigation client-side when the requested environment is active", () => {
    window.__krutigerBsportWidgetScriptUrl = bsportWidgetScriptUrl;
    const reload = vi.fn();

    expect(prepareBsportWidgetEnvironment(bsportWidgetScriptUrl, reload)).toBe(
      true,
    );
    expect(reload).not.toHaveBeenCalled();
  });

  it("requests a clean reload when the bsport environment changes", () => {
    window.__krutigerBsportWidgetScriptUrl = bsportWidgetScriptUrl;
    const reload = vi.fn();

    expect(
      prepareBsportWidgetEnvironment(
        "https://cdn.staging.bsport.io/scripts/widget.js",
        reload,
      ),
    ).toBe(false);
    expect(reload).toHaveBeenCalledOnce();
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(bsportWidgetScriptUrl);
  });
});
