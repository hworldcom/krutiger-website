import type { SanityContentResult } from "./result";

export type ContentFallbackReason = Exclude<
  SanityContentResult<never>["status"],
  "ready"
>;

export type ResolvedContent<T> = Readonly<{
  value: T;
  source: "sanity" | "fallback";
  fallbackReason?: ContentFallbackReason;
}>;

type DraftContentMessages = Readonly<{
  incompleteContent: string;
  missingContent: string;
  unavailableContent: string;
}>;

export function resolveContent<T>(
  result: SanityContentResult<T>,
  fallback: T,
): ResolvedContent<T> {
  if (result.status === "ready") {
    return { value: result.value, source: "sanity" };
  }

  return {
    value: fallback,
    source: "fallback",
    fallbackReason: result.status,
  };
}

export function getDraftContentFallbackMessage(
  reason: ContentFallbackReason | undefined,
  messages: DraftContentMessages,
) {
  if (reason === "missingTranslation" || reason === "invalid") {
    return messages.incompleteContent;
  }

  if (reason === "missing") {
    return messages.missingContent;
  }

  if (reason === "unavailable") {
    return messages.unavailableContent;
  }

  return undefined;
}
