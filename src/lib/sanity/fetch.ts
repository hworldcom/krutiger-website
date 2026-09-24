import "server-only";

import { draftMode } from "next/headers";

import { getPublishedSanityClient } from "./client";
import { createSanityQueryPlan } from "./fetch-plan";
import { getPreviewSanityClient } from "./preview-client";

type RegisteredQuery = keyof SanityQueries & string;

/**
 * Production reads use Sanity's published perspective and Next's five-minute
 * data cache. Local development bypasses that cache so published edits can be
 * verified immediately. Draft Mode also bypasses caching and uses the
 * server-only authenticated client.
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
