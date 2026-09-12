import { describe, expect, it, vi } from "vitest";

import {
  formatBsportClassDate,
  formatBsportClassTime,
  getNextAvailableClasses,
} from "./offers";

function jsonResponse(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

describe("getNextAvailableClasses", () => {
  it("finds the first upcoming date and returns every class on that date", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          results: [
            {
              activity_name: "Morning Muay Thai",
              custom_level: 1,
              date_start: "2026-09-14T09:30:00+02:00",
              duration_minute: 60,
              id: 2,
            },
          ],
        }),
      )
      .mockResolvedValueOnce(
        jsonResponse({
          results: [
            {
              activity_name: "Morning Muay Thai",
              custom_level: 1,
              date_start: "2026-09-14T09:30:00+02:00",
              duration_minute: 60,
              id: 2,
            },
            {
              activity_name: "Early Bird Muay Thai",
              custom_level: 1,
              date_start: "2026-09-14T08:30:00+02:00",
              duration_minute: 60,
              id: 1,
            },
          ],
        }),
      );

    const result = await getNextAvailableClasses({
      companyId: 6720,
      fetcher,
      now: new Date("2026-09-12T12:00:00+02:00"),
    });

    expect(result?.date).toBe("2026-09-14");
    expect(result?.classes.map((offer) => offer.activityName)).toEqual([
      "Early Bird Muay Thai",
      "Morning Muay Thai",
    ]);

    const firstUrl = new URL(String(fetcher.mock.calls[0]?.[0]));
    const secondUrl = new URL(String(fetcher.mock.calls[1]?.[0]));
    expect(firstUrl.searchParams.get("company")).toBe("6720");
    expect(firstUrl.searchParams.get("min_date")).toBe("2026-09-13");
    expect(firstUrl.searchParams.get("page_size")).toBe("1");
    expect(secondUrl.searchParams.get("min_date")).toBe("2026-09-14");
    expect(secondUrl.searchParams.get("max_date")).toBe("2026-09-14");
  });

  it("returns null when bsport has no upcoming classes", async () => {
    const fetcher = vi.fn().mockResolvedValue(jsonResponse({ results: [] }));

    await expect(
      getNextAvailableClasses({ companyId: 6720, fetcher }),
    ).resolves.toBeNull();
    expect(fetcher).toHaveBeenCalledOnce();
  });
});

describe("bsport class formatting", () => {
  const offer = {
    activityName: "Morning Muay Thai",
    dateStart: "2026-09-14T09:30:00+02:00",
    durationMinutes: 60,
    id: 2,
    levelId: 1,
  };

  it("formats the class date in the selected locale", () => {
    expect(formatBsportClassDate("2026-09-14", "en-GB")).toBe(
      "Monday 14 September",
    );
    expect(formatBsportClassDate("2026-09-14", "de-DE")).toBe(
      "Montag, 14. September",
    );
  });

  it("formats the full class time range in Berlin time", () => {
    expect(formatBsportClassTime(offer, "en-GB")).toBe("09:30 – 10:30");
  });
});
