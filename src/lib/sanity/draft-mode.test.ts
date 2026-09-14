import { describe, expect, it, vi } from "vitest";

import {
  handleDisableDraftMode,
  handleEnableDraftMode,
  validatePreviewDestination,
} from "./draft-mode";

describe("draft preview routes", () => {
  it.each([
    "/de",
    "/en",
    "/de/training",
    "/en/coaches",
    "/de/prices",
    "/en/datenschutz",
  ])("accepts the known localized destination %s", (destination) => {
    expect(validatePreviewDestination(destination)).toEqual({
      ok: true,
      destination,
    });
  });

  it.each([
    null,
    "/",
    "/training",
    "/fr/training",
    "/de/unknown",
    "https://attacker.example/de",
    "//attacker.example/de",
    "/de/training?next=https://attacker.example",
    "/de/training#draft",
    "/de%2ftraining",
    "/de\\training",
  ])("rejects the unsafe or unknown destination %s", (destination) => {
    expect(validatePreviewDestination(destination)).toEqual({ ok: false });
  });

  it("requires a preview credential before calling Sanity validation", async () => {
    const delegate = vi.fn<() => Promise<Response>>();
    const response = await handleEnableDraftMode(
      new Request(
        "https://www.example.com/api/draft-mode/enable?sanity-preview-pathname=%2Fde",
      ),
      delegate,
    );

    expect(response.status).toBe(401);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(delegate).not.toHaveBeenCalled();
  });

  it("rejects an unsafe destination before calling Sanity validation", async () => {
    const delegate = vi.fn<() => Promise<Response>>();
    const response = await handleEnableDraftMode(
      new Request(
        "https://www.example.com/api/draft-mode/enable?sanity-preview-secret=secret&sanity-preview-pathname=https%3A%2F%2Fattacker.example",
      ),
      delegate,
    );

    expect(response.status).toBe(400);
    expect(delegate).not.toHaveBeenCalled();
  });

  it("delegates cryptographic validation only for an approved request", async () => {
    const invalidSecret = new Response("Invalid secret", { status: 401 });
    const delegate = vi.fn(async () => invalidSecret);
    const request = new Request(
      "https://www.example.com/api/draft-mode/enable?sanity-preview-secret=untrusted&sanity-preview-pathname=%2Fen%2Fabout",
    );

    const response = await handleEnableDraftMode(request, delegate);

    expect(delegate).toHaveBeenCalledOnce();
    expect(delegate).toHaveBeenCalledWith(request);
    expect(response).toBe(invalidSecret);
    expect(response.status).toBe(401);
  });

  it("clears draft mode and preserves a valid localized destination", async () => {
    const disable = vi.fn();
    const body = new FormData();
    body.set("destination", "/en/training");
    const response = await handleDisableDraftMode(
      new Request("https://www.example.com/api/draft-mode/disable", {
        method: "POST",
        headers: { origin: "https://www.example.com" },
        body,
      }),
      disable,
    );

    expect(disable).toHaveBeenCalledOnce();
    expect(response.status).toBe(303);
    expect(response.headers.get("location")).toBe("/en/training");
  });

  it("does not clear draft mode for a cross-origin request", async () => {
    const disable = vi.fn();
    const body = new FormData();
    body.set("destination", "/de");
    const response = await handleDisableDraftMode(
      new Request("https://www.example.com/api/draft-mode/disable", {
        method: "POST",
        headers: { origin: "https://attacker.example" },
        body,
      }),
      disable,
    );

    expect(response.status).toBe(403);
    expect(disable).not.toHaveBeenCalled();
  });

  it("does not clear draft mode for an unsafe return destination", async () => {
    const disable = vi.fn();
    const body = new FormData();
    body.set("destination", "https://attacker.example");
    const response = await handleDisableDraftMode(
      new Request("https://www.example.com/api/draft-mode/disable", {
        method: "POST",
        body,
      }),
      disable,
    );

    expect(response.status).toBe(400);
    expect(disable).not.toHaveBeenCalled();
  });
});
