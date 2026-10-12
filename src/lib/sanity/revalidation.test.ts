import { NextRequest } from "next/server";
import { describe, expect, it, vi } from "vitest";

import {
  getSanityCacheTag,
  handleSanityRevalidation,
  SANITY_REVALIDATABLE_DOCUMENT_TYPES,
} from "./revalidation";

const request = new NextRequest("https://www.example.com/api/revalidate", {
  method: "POST",
});

describe("Sanity on-demand revalidation", () => {
  it.each(SANITY_REVALIDATABLE_DOCUMENT_TYPES)(
    "maps %s to its existing cache tag",
    (documentType) => {
      expect(getSanityCacheTag(documentType)).toBe(`sanity:${documentType}`);
    },
  );

  it.each([undefined, null, "", "sanity:homepage", "unknownType"])(
    "rejects the unsupported document type %s",
    (documentType) => {
      expect(getSanityCacheTag(documentType)).toBeNull();
    },
  );

  it("requires the server-only revalidation secret", async () => {
    const parseWebhook = vi.fn();
    const revalidateCacheTag = vi.fn();
    const response = await handleSanityRevalidation(request, {
      parseWebhook,
      revalidateCacheTag,
      secret: "",
    });

    expect(response.status).toBe(503);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(parseWebhook).not.toHaveBeenCalled();
    expect(revalidateCacheTag).not.toHaveBeenCalled();
  });

  it("rejects a webhook with an invalid signature", async () => {
    const revalidateCacheTag = vi.fn();
    const response = await handleSanityRevalidation(request, {
      parseWebhook: vi.fn(async () => ({
        body: { _type: "homepage" },
        isValidSignature: false,
      })),
      revalidateCacheTag,
      secret: "test-secret",
    });

    expect(response.status).toBe(401);
    expect(revalidateCacheTag).not.toHaveBeenCalled();
  });

  it("acknowledges unrelated documents without invalidating a cache tag", async () => {
    const revalidateCacheTag = vi.fn();
    const response = await handleSanityRevalidation(request, {
      parseWebhook: vi.fn(async () => ({
        body: { _type: "sanity.imageAsset" },
        isValidSignature: true,
      })),
      revalidateCacheTag,
      secret: "test-secret",
    });

    expect(response.status).toBe(202);
    expect(await response.json()).toMatchObject({ revalidated: false });
    expect(revalidateCacheTag).not.toHaveBeenCalled();
  });

  it("invalidates only the tag for the published document type", async () => {
    const parseWebhook = vi.fn(async () => ({
      body: { _type: "coach" },
      isValidSignature: true,
    }));
    const revalidateCacheTag = vi.fn();
    const response = await handleSanityRevalidation(request, {
      parseWebhook,
      revalidateCacheTag,
      secret: "  test-secret  ",
    });

    expect(parseWebhook).toHaveBeenCalledWith(request, "test-secret");
    expect(revalidateCacheTag).toHaveBeenCalledOnce();
    expect(revalidateCacheTag).toHaveBeenCalledWith("sanity:coach");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      revalidated: true,
      tag: "sanity:coach",
    });
  });
});
