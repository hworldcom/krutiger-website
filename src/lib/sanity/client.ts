import "server-only";

import { createClient, type SanityClient } from "next-sanity";

import { resolveSanityEnvironment } from "./environment";

function getEnvironment() {
  return resolveSanityEnvironment({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  });
}

let publishedClient: SanityClient | undefined;

export function getPublishedSanityClient() {
  if (publishedClient) {
    return publishedClient;
  }

  const environment = getEnvironment();
  publishedClient = createClient({
    apiVersion: environment.apiVersion,
    dataset: environment.dataset,
    perspective: "published",
    projectId: environment.projectId,
    useCdn: true,
  });

  return publishedClient;
}

export function getSanityImageProject() {
  const { dataset, projectId } = getEnvironment();

  return { dataset, projectId };
}
