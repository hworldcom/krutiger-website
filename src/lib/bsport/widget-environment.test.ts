/** @vitest-environment jsdom */

import { afterEach, describe, expect, it, vi } from "vitest";

import { bsportWidgetScriptUrl, prepareBsportWidgetMount } from "./widget";

afterEach(() => {
  document.body.replaceChildren();
  window.localStorage.clear();
  document.cookie = "i18next=; Max-Age=0; path=/";
  delete window.__krutigerBsportWidgetMountElement;
  delete window.__krutigerBsportWidgetLanguage;
  delete window.__krutigerBsportWidgetReloadPending;
  delete window.__krutigerBsportWidgetScriptUrl;
});

function createMountElement() {
  const element = document.createElement("div");
  document.body.append(element);
  return element;
}

describe("bsport widget runtime preparation", () => {
  it("keeps navigation client-side for repeated setup on the active element", () => {
    const mountElement = createMountElement();
    const reload = vi.fn();

    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "de",
        reload,
      ),
    ).toBe(true);
    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "de",
        reload,
      ),
    ).toBe(true);
    expect(reload).not.toHaveBeenCalled();
  });

  it("requests one clean reload when the bsport environment changes", () => {
    const mountElement = createMountElement();
    const reload = vi.fn();

    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "de",
        reload,
      ),
    ).toBe(true);
    expect(
      prepareBsportWidgetMount(
        "https://cdn.staging.bsport.io/scripts/widget.js",
        mountElement,
        "de",
        reload,
      ),
    ).toBe(false);
    expect(reload).toHaveBeenCalledOnce();
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(bsportWidgetScriptUrl);
  });

  it("requests one clean reload when React replaces the widget element", () => {
    const firstMountElement = createMountElement();
    const reload = vi.fn();

    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        firstMountElement,
        "de",
        reload,
      ),
    ).toBe(true);

    firstMountElement.remove();
    const nextMountElement = createMountElement();

    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        nextMountElement,
        "de",
        reload,
      ),
    ).toBe(false);
    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        nextMountElement,
        "de",
        reload,
      ),
    ).toBe(false);
    expect(reload).toHaveBeenCalledOnce();
  });

  it("requests one clean reload when the route language changes", () => {
    const mountElement = createMountElement();
    const reload = vi.fn();

    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "de",
        reload,
      ),
    ).toBe(true);
    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "en",
        reload,
      ),
    ).toBe(false);
    expect(
      prepareBsportWidgetMount(
        bsportWidgetScriptUrl,
        mountElement,
        "en",
        reload,
      ),
    ).toBe(false);
    expect(reload).toHaveBeenCalledOnce();
    expect(window.__krutigerBsportWidgetLanguage).toBe("de");
    expect(document.cookie).toContain("i18next=en");
  });

  it("does not claim the runtime when the mount element is unavailable", () => {
    const reload = vi.fn();

    expect(
      prepareBsportWidgetMount(bsportWidgetScriptUrl, null, "de", reload),
    ).toBe(false);
    expect(reload).not.toHaveBeenCalled();
    expect(window.__krutigerBsportWidgetScriptUrl).toBeUndefined();
  });
});
