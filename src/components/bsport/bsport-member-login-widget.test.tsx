/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportMemberAreaElementId,
  bsportWidgetScriptUrl,
  createBsportLoginConfig,
} from "@/lib/bsport/widget";

import { BsportMemberLoginWidget } from "./bsport-member-login-widget";

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

describe("BsportMemberLoginWidget", () => {
  it("loads the route-scoped script and mounts the supplied login once", async () => {
    const mount = vi.fn(() => {
      document.getElementById(bsportMemberAreaElementId)?.append("Sign in");
    });
    window.BsportWidget = { mount };

    render(<BsportMemberLoginWidget copy={de.integrations.memberArea} />);

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.memberArea.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportLoginConfig(bsportMemberAreaElementId),
    );
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(bsportWidgetScriptUrl);
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="memberArea"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("staging");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(<BsportMemberLoginWidget copy={de.integrations.memberArea} />);

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.memberArea.error,
    );
  });
});
