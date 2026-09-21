import {
  requireSanityApiVersion,
  requireSanityDataset,
  requireSanityProjectId,
} from "../src/lib/sanity/environment";

function optionalValue(value: string | undefined) {
  const candidate = value?.trim();
  return candidate || undefined;
}

export function requireStudioPreviewOrigin(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    throw new Error(
      "Missing required environment variable: SANITY_STUDIO_PREVIEW_URL.",
    );
  }

  let previewUrl: URL;

  try {
    previewUrl = new URL(candidate);
  } catch {
    throw new Error(
      "SANITY_STUDIO_PREVIEW_URL must be an absolute HTTP(S) origin.",
    );
  }

  if (
    !["http:", "https:"].includes(previewUrl.protocol) ||
    previewUrl.username ||
    previewUrl.password ||
    previewUrl.pathname !== "/" ||
    previewUrl.search ||
    previewUrl.hash
  ) {
    throw new Error(
      "SANITY_STUDIO_PREVIEW_URL must be an HTTP(S) origin without credentials, a path, query, or hash.",
    );
  }

  return previewUrl.origin;
}

export const studioEnvironment = Object.freeze({
  projectId: requireSanityProjectId(
    process.env.SANITY_STUDIO_PROJECT_ID,
    "SANITY_STUDIO_PROJECT_ID",
  ),
  dataset: requireSanityDataset(
    process.env.SANITY_STUDIO_DATASET,
    "SANITY_STUDIO_DATASET",
  ),
  apiVersion: requireSanityApiVersion(
    process.env.SANITY_STUDIO_API_VERSION,
    "SANITY_STUDIO_API_VERSION",
  ),
  title:
    optionalValue(process.env.SANITY_STUDIO_TITLE) ?? "KRUTIGER Content Studio",
  appId: optionalValue(process.env.SANITY_STUDIO_APP_ID),
  previewOrigin: requireStudioPreviewOrigin(
    process.env.SANITY_STUDIO_PREVIEW_URL,
  ),
});
