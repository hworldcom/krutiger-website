import type { ProjectionResult, SanityContentResult } from "./result";

export function toUnavailableContentResult(
  error: unknown,
): SanityContentResult<never> {
  const isConfigurationError =
    error instanceof Error && error.message.includes("NEXT_PUBLIC_SANITY_");

  return {
    status: "unavailable",
    reason: isConfigurationError ? "configuration" : "request",
  };
}

export function resolveListProjection<T>(
  projection: ProjectionResult<readonly T[]>,
): SanityContentResult<readonly T[]> {
  if (projection.status === "ready" && projection.value.length === 0) {
    return { status: "missing" };
  }

  return projection;
}
