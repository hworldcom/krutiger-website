export const SANITY_PUBLISHED_REVALIDATE_SECONDS = 300;

export type SanityQueryPlan =
  | Readonly<{
      client: "published";
      request: {
        next: { revalidate: number; tags: string[] };
      };
    }>
  | Readonly<{
      client: "published";
      request: { cache: "no-store" };
    }>
  | Readonly<{
      client: "preview";
      request: { cache: "no-store" };
    }>;

export function createSanityQueryPlan(
  previewEnabled: boolean,
  tags: readonly string[],
  bypassPublishedCache = false,
): SanityQueryPlan {
  if (previewEnabled) {
    return {
      client: "preview",
      request: { cache: "no-store" },
    };
  }

  if (bypassPublishedCache) {
    return {
      client: "published",
      request: { cache: "no-store" },
    };
  }

  return {
    client: "published",
    request: {
      next: {
        revalidate: SANITY_PUBLISHED_REVALIDATE_SECONDS,
        tags: [...tags],
      },
    },
  };
}
