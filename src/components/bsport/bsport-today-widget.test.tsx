/** @vitest-environment jsdom */

import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import de from "@/i18n/dictionaries/de";
import {
  bsportCalendarWidgetScriptUrl,
  bsportTodayElementId,
  createBsportTodayConfig,
} from "@/lib/bsport/widget";

import { BsportTodayWidget } from "./bsport-today-widget";

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
  vi.unstubAllGlobals();
  delete window.__krutigerBsportWidgetMountElement;
  delete window.__krutigerBsportWidgetReloadPending;
  delete window.__krutigerBsportWidgetScriptUrl;
  delete window.BsportWidget;
});

describe("BsportTodayWidget", () => {
  it("loads and mounts the supplied today-only calendar once", async () => {
    const mount = vi.fn(() => {
      const widgetContent = document.createElement("div");
      widgetContent.textContent = "Today";
      document.getElementById(bsportTodayElementId)?.append(widgetContent);
    });
    window.BsportWidget = { mount };

    render(<BsportTodayWidget copy={de.homePage.schedule} locale="de" />);

    expect(screen.getByRole("status").textContent).toBe(
      de.homePage.schedule.loading,
    );
    expect(screen.getByTestId("bsport-script").getAttribute("data-src")).toBe(
      bsportCalendarWidgetScriptUrl,
    );

    act(() => scriptHandlers.onReady?.());
    act(() => scriptHandlers.onReady?.());

    expect(mount).toHaveBeenCalledOnce();
    expect(mount).toHaveBeenCalledWith(
      createBsportTodayConfig(bsportTodayElementId),
    );
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
  });

  it("mounts after navigation when the cached script does not call onReady again", async () => {
    const mount = vi.fn(() => {
      const widgetContent = document.createElement("div");
      widgetContent.textContent = "Today";
      document.getElementById(bsportTodayElementId)?.append(widgetContent);
    });
    window.BsportWidget = { mount };

    render(<BsportTodayWidget copy={de.homePage.schedule} locale="de" />);

    await waitFor(() => expect(mount).toHaveBeenCalledOnce());
    expect(mount).toHaveBeenCalledWith(
      createBsportTodayConfig(bsportTodayElementId),
    );
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows localized fallback copy when the script fails", () => {
    render(<BsportTodayWidget copy={de.homePage.schedule} locale="de" />);

    act(() => scriptHandlers.onError?.());

    expect(screen.getByRole("alert").textContent).toBe(
      de.homePage.schedule.error,
    );
  });

  it("replaces bsport's no-session output with localized copy", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              activity_name: "Early Bird Muay Thai All Level",
              custom_level: 1,
              date_start: "2026-09-14T08:30:00+02:00",
              duration_minute: 60,
              id: 1,
            },
          ],
        }),
        ok: true,
        status: 200,
      })
      .mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              activity_name: "Early Bird Muay Thai All Level",
              custom_level: 1,
              date_start: "2026-09-14T08:30:00+02:00",
              duration_minute: 60,
              id: 1,
            },
            {
              activity_name: "Morning Muay Thai All Level",
              custom_level: 1,
              date_start: "2026-09-14T09:30:00+02:00",
              duration_minute: 60,
              id: 2,
            },
          ],
        }),
        ok: true,
        status: 200,
      });
    vi.stubGlobal("fetch", fetchMock);
    window.BsportWidget = {
      mount: () => {
        const emptyState = document.createElement("div");
        emptyState.className = "bs-calendar--no-offer";
        document.getElementById(bsportTodayElementId)?.append(emptyState);
      },
    };

    render(<BsportTodayWidget copy={de.homePage.schedule} locale="de" />);
    act(() => scriptHandlers.onReady?.());

    await waitFor(() =>
      expect(screen.getByText("Early Bird Muay Thai All Level")).toBeTruthy(),
    );
    expect(screen.getByText(de.homePage.schedule.empty)).toBeTruthy();
    expect(screen.getByText("Morning Muay Thai All Level")).toBeTruthy();
    expect(screen.getAllByText(de.homePage.schedule.allLevels)).toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
