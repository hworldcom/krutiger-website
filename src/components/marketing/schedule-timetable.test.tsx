/** @vitest-environment jsdom */

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ScheduleTimetable } from "./schedule-timetable";

const labels = {
  hint: "Tap to enlarge",
  open: "Enlarge schedule",
  viewer: "Enlarged schedule",
  close: "Close enlarged schedule",
  zoomIn: "Zoom further into schedule",
  zoomOut: "Zoom out of schedule",
  fit: "Show the complete schedule",
};

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

afterEach(() => {
  cleanup();
  document.documentElement.style.overflow = "";
});

describe("ScheduleTimetable", () => {
  it("fits the complete timetable inline and opens an interactive zoom viewer", () => {
    render(
      <ScheduleTimetable
        image={{
          alternativeText: "Regular weekly timetable",
          caption: "Weekly timetable",
          src: "/images/schedule.png",
        }}
        labels={labels}
      />,
    );

    const previewButton = screen.getByRole("button", {
      name: labels.open,
    });
    const previewImage = within(previewButton).getByRole("img", {
      name: "Regular weekly timetable",
    });

    expect(previewImage.classList.contains("w-full")).toBe(true);
    expect(previewImage.className).not.toContain("min-w-");

    fireEvent.click(previewButton);

    const viewer = screen.getByRole("dialog", { name: labels.viewer });
    const zoomedImage = within(viewer).getByRole("img", {
      name: "Regular weekly timetable",
    });
    const zoomContainer = zoomedImage.parentElement;

    expect(viewer.hasAttribute("open")).toBe(true);
    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(zoomContainer?.getAttribute("data-timetable-zoom")).toBe("150");

    fireEvent.click(
      within(viewer).getByRole("button", { name: labels.zoomIn }),
    );
    expect(zoomContainer?.getAttribute("data-timetable-zoom")).toBe("200");

    fireEvent.click(within(viewer).getByRole("button", { name: labels.fit }));
    expect(zoomContainer?.getAttribute("data-timetable-zoom")).toBe("100");

    fireEvent.click(within(viewer).getByRole("button", { name: labels.close }));
    expect(viewer.hasAttribute("open")).toBe(false);
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.activeElement).toBe(previewButton);
  });
});
