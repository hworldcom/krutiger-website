import "server-only";

import { draftMode } from "next/headers";

import { getPublishedSanityClient } from "./client";
import { createSanityQueryPlan } from "./fetch-plan";
import { getPreviewSanityClient } from "./preview-client";

type RegisteredQuery = keyof SanityQueries & string;

/**
 * Ordinary reads use Sanity's published perspective and Next's five-minute
 * data cache. Draft Mode switches to the server-only authenticated client and
 * bypasses both the CDN and the published cache.
 */
export async function fetchSanityQuery<const Query extends RegisteredQuery>(
  query: Query,
  tags: readonly string[],
): Promise<SanityQueries[Query]> {
  const { isEnabled } = await draftMode();
  const plan = createSanityQueryPlan(isEnabled, tags);
  const client =
    plan.client === "preview"
      ? getPreviewSanityClient()
      : getPublishedSanityClient();

  return client.fetch(query, {}, plan.request);
}
