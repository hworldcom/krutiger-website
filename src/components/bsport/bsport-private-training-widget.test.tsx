/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportPrivateTrainingElementId,
  bsportPrivateTrainingWidgetScriptUrl,
  createBsportPrivateTrainingConfig,
} from "@/lib/bsport/widget";

import { BsportPrivateTrainingWidget } from "./bsport-private-training-widget";

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

describe("BsportPrivateTrainingWidget", () => {
  it("loads the production script and mounts private services once", async () => {
    const mount = vi.fn(() => {
      document
        .getElementById(bsportPrivateTrainingElementId)
        ?.append("Appointments");
    });
    window.BsportWidget = { mount };

    render(
      <BsportPrivateTrainingWidget
        copy={de.integrations.privateTraining}
        locale="de"
      />,
    );

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.privateTraining.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportPrivateTrainingWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportPrivateTrainingConfig(bsportPrivateTrainingElementId, "de"),
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="privateTraining"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(
      <BsportPrivateTrainingWidget
        copy={de.integrations.privateTraining}
        locale="de"
      />,
    );

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.privateTraining.error,
    );
  });
});
