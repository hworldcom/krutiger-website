/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportPricingElementId,
  bsportPricingWidgetScriptUrl,
  createBsportSubscriptionConfig,
} from "@/lib/bsport/widget";

import { BsportPricingWidget } from "./bsport-pricing-widget";

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
  delete window.__krutigerBsportWidgetScriptUrl;
  delete window.BsportWidget;
});

describe("BsportPricingWidget", () => {
  it("loads the route-scoped script and mounts the supplied subscription widget once", async () => {
    const mount = vi.fn(() => {
      document.getElementById(bsportPricingElementId)?.append("Subscriptions");
    });
    window.BsportWidget = { mount };

    render(<BsportPricingWidget copy={de.integrations.pricing} />);

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.pricing.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportPricingWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportSubscriptionConfig(bsportPricingElementId),
    );
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(
      bsportPricingWidgetScriptUrl,
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="pricing"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(<BsportPricingWidget copy={de.integrations.pricing} />);

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.pricing.error,
    );
  });
});
