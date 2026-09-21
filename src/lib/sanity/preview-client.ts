import "server-only";

import { createClient, type SanityClient } from "next-sanity";

import { resolveSanityEnvironment } from "./environment";

let previewClient: SanityClient | undefined;

export function getPreviewSanityClient() {
  if (previewClient) {
    return previewClient;
  }

  const token = process.env.SANITY_API_READ_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "Missing required environment variable: SANITY_API_READ_TOKEN.",
    );
  }

  const environment = resolveSanityEnvironment({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  });

  previewClient = createClient({
    apiVersion: environment.apiVersion,
    dataset: environment.dataset,
    perspective: "drafts",
    projectId: environment.projectId,
    stega: false,
    token,
    useCdn: false,
  });

  return previewClient;
}
