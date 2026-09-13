import {
  requireSanityApiVersion,
  requireSanityDataset,
  requireSanityProjectId,
} from "../src/lib/sanity/environment";

function optionalValue(value: string | undefined) {
  const candidate = value?.trim();
  return candidate || undefined;
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
});
