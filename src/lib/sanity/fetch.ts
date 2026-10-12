import "server-only";

import { draftMode } from "next/headers";

import { getPublishedSanityClient } from "./client";
import { createSanityQueryPlan } from "./fetch-plan";
import { getPreviewSanityClient } from "./preview-client";

type RegisteredQuery = keyof SanityQueries & string;

/**
 * Production reads use Sanity's published perspective and a tagged Next.js
 * data cache. A Sanity webhook invalidates affected tags on publication, while
 * a one-day TTL is retained as a safety net for missed webhook deliveries.
 * Local development and Draft Mode bypass this cache.
 */
export async function fetchSanityQuery<const Query extends RegisteredQuery>(
  query: Query,
  tags: readonly string[],
): Promise<SanityQueries[Query]> {
  const { isEnabled } = await draftMode();
  const plan = createSanityQueryPlan(
    isEnabled,
    tags,
    process.env.NODE_ENV === "development",
  );
  const client =
    plan.client === "preview"
      ? getPreviewSanityClient()
      : getPublishedSanityClient();

  return client.fetch(query, {}, plan.request);
}
