/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportGiftCardElementId,
  bsportShopElementId,
  bsportShopWidgetScriptUrl,
  type BsportWidgetConfig,
  createBsportGiftCardConfig,
  createBsportShopConfig,
} from "@/lib/bsport/widget";

import { BsportShopWidget } from "./bsport-shop-widget";

type ScriptHandlers = {
  onError?: () => void;
  onReady?: () => void;
};

let scriptHandlers: ScriptHandlers = {};

vi.mock("next/script", () => ({
  default: ({
    id,
    onError,
    onReady,
    src,
  }: ScriptHandlers & { id: string; src: string }) => {
    scriptHandlers = { onError, onReady };
    return <div data-src={src} data-testid="bsport-script" id={id} />;
  },
}));

beforeEach(() => {
  scriptHandlers = {};
});

afterEach(() => {
  cleanup();
  delete window.__krutigerBsportWidgetMountElement;
  delete window.__krutigerBsportWidgetLanguage;
  delete window.__krutigerBsportWidgetReloadPending;
  delete window.__krutigerBsportWidgetScriptUrl;
  delete window.BsportWidget;
});

describe("BsportShopWidget", () => {
  it("loads one route-scoped script and mounts shop and gift cards once", async () => {
    const mount = vi.fn((config: BsportWidgetConfig) => {
      document.getElementById(config.parentElement)?.append("Content");
    });
    window.BsportWidget = { mount };

    render(
      <BsportShopWidget
        copy={de.integrations.shop}
        giftCardCopy={de.integrations.giftCards}
        locale="de"
      />,
    );

    expect(screen.getByText(de.integrations.shop.loading)).toBeTruthy();
    expect(screen.getByText(de.integrations.giftCards.loading)).toBeTruthy();
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportShopWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledTimes(2);
    expect(mount).toHaveBeenNthCalledWith(
      1,
      createBsportShopConfig(bsportShopElementId, "de"),
    );
    expect(mount).toHaveBeenNthCalledWith(
      2,
      createBsportGiftCardConfig(bsportGiftCardElementId, "de"),
    );
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(
      bsportShopWidgetScriptUrl,
    );
    await waitFor(() =>
      expect(screen.queryAllByRole("status")).toHaveLength(0),
    );
    expect(
      document
        .querySelector('[data-integration-boundary="shop"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
    expect(
      document
        .querySelector('[data-integration-boundary="giftCards"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(
      <BsportShopWidget
        copy={de.integrations.shop}
        giftCardCopy={de.integrations.giftCards}
        locale="de"
      />,
    );

    act(() => scriptHandlers.onError?.());

    expect(screen.getByText(de.integrations.shop.error)).toBeTruthy();
    expect(screen.getByText(de.integrations.giftCards.error)).toBeTruthy();
  });
});
