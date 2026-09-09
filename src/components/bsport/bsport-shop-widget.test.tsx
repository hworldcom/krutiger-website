/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportShopElementId,
  bsportShopWidgetScriptUrl,
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
  delete window.__krutigerBsportWidgetReloadPending;
  delete window.__krutigerBsportWidgetScriptUrl;
  delete window.BsportWidget;
});

describe("BsportShopWidget", () => {
  it("loads the route-scoped script and mounts the supplied shop once", async () => {
    const mount = vi.fn(() => {
      document.getElementById(bsportShopElementId)?.append("Products");
    });
    window.BsportWidget = { mount };

    render(<BsportShopWidget copy={de.integrations.shop} />);

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.shop.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportShopWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportShopConfig(bsportShopElementId),
    );
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(
      bsportShopWidgetScriptUrl,
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="shop"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(<BsportShopWidget copy={de.integrations.shop} />);

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.shop.error,
    );
  });
});
