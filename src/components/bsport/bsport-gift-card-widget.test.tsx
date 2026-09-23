/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportGiftCardElementId,
  bsportGiftCardWidgetScriptUrl,
  createBsportGiftCardConfig,
} from "@/lib/bsport/widget";

import { BsportGiftCardWidget } from "./bsport-gift-card-widget";

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

describe("BsportGiftCardWidget", () => {
  it("loads the production script and mounts gift cards once", async () => {
    const mount = vi.fn(() => {
      document.getElementById(bsportGiftCardElementId)?.append("Gift cards");
    });
    window.BsportWidget = { mount };

    render(
      <BsportGiftCardWidget copy={de.integrations.giftCards} locale="de" />,
    );

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.giftCards.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportGiftCardWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportGiftCardConfig(bsportGiftCardElementId, "de"),
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="giftCards"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(
      <BsportGiftCardWidget copy={de.integrations.giftCards} locale="de" />,
    );

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.giftCards.error,
    );
  });
});
