/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportCalendarWidgetScriptUrl,
  bsportScheduleElementId,
  createBsportCalendarConfig,
} from "@/lib/bsport/widget";

import { BsportScheduleWidget } from "./bsport-schedule-widget";

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

describe("BsportScheduleWidget", () => {
  it("loads the route-scoped script and mounts the supplied calendar once", async () => {
    const mount = vi.fn(() => {
      document.getElementById(bsportScheduleElementId)?.append("Calendar");
    });
    window.BsportWidget = { mount };

    render(<BsportScheduleWidget copy={de.integrations.schedule} />);

    expect(screen.getByRole("status").textContent).toBe(
      de.integrations.schedule.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportCalendarWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportCalendarConfig(bsportScheduleElementId),
    );
    expect(window.__krutigerBsportWidgetScriptUrl).toBe(
      bsportCalendarWidgetScriptUrl,
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
    expect(
      document
        .querySelector('[data-integration-boundary="schedule"]')
        ?.getAttribute("data-widget-environment"),
    ).toBe("production");
  });

  it("shows localized fallback copy when the external script fails", () => {
    render(<BsportScheduleWidget copy={de.integrations.schedule} />);

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.integrations.schedule.error,
    );
  });
});
