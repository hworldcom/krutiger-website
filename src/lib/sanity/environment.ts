const datasetPattern = /^[a-z0-9][-_a-z0-9]{0,62}[a-z0-9]$/;
const projectIdPattern = /^[-a-z0-9]+$/i;
const apiVersionPattern = /^\d{4}-\d{2}-\d{2}$/;

type SanityEnvironmentSource = Readonly<
  Partial<
    Record<
      | "NEXT_PUBLIC_SANITY_PROJECT_ID"
      | "NEXT_PUBLIC_SANITY_DATASET"
      | "NEXT_PUBLIC_SANITY_API_VERSION"
      | "NEXT_PUBLIC_SANITY_STUDIO_URL",
      string
    >
  >
>;

function requireValue(value: string | undefined, variableName: string) {
  const candidate = value?.trim();

  if (!candidate) {
    throw new Error(`Missing required environment variable: ${variableName}.`);
  }

  return candidate;
}

export function requireSanityProjectId(
  value: string | undefined,
  variableName = "NEXT_PUBLIC_SANITY_PROJECT_ID",
) {
  const projectId = requireValue(value, variableName);

  if (!projectIdPattern.test(projectId)) {
    throw new Error(
      `${variableName} may contain only letters, numbers, and dashes.`,
    );
  }

  return projectId;
}

export function requireSanityDataset(
  value: string | undefined,
  variableName = "NEXT_PUBLIC_SANITY_DATASET",
) {
  const dataset = requireValue(value, variableName);

  if (
    dataset.length > 64 ||
    dataset.length < 2 ||
    !datasetPattern.test(dataset)
  ) {
    throw new Error(
      `${variableName} must be 2–64 lowercase letters, numbers, dashes, or underscores and must start and end with a letter or number.`,
    );
  }

  return dataset;
}

export function requireSanityApiVersion(
  value: string | undefined,
  variableName = "NEXT_PUBLIC_SANITY_API_VERSION",
) {
  const apiVersion = requireValue(value, variableName);
  const parsedDate = new Date(`${apiVersion}T00:00:00.000Z`);

  if (
    !apiVersionPattern.test(apiVersion) ||
    Number.isNaN(parsedDate.valueOf()) ||
    !parsedDate.toISOString().startsWith(apiVersion)
  ) {
    throw new Error(`${variableName} must be a valid YYYY-MM-DD date.`);
  }

  return apiVersion;
}

export function requireSanityStudioUrl(
  value: string | undefined,
  variableName = "NEXT_PUBLIC_SANITY_STUDIO_URL",
) {
  const candidate = requireValue(value, variableName);
  let studioUrl: URL;

  try {
    studioUrl = new URL(candidate);
  } catch {
    throw new Error(`${variableName} must be an absolute HTTP(S) URL.`);
  }

  if (
    !["http:", "https:"].includes(studioUrl.protocol) ||
    studioUrl.username ||
    studioUrl.password ||
    studioUrl.search ||
    studioUrl.hash
  ) {
    throw new Error(
      `${variableName} must be an absolute HTTP(S) URL without credentials, a query, or a fragment.`,
    );
  }

  return studioUrl.href.replace(/\/$/, "");
}

export function resolveSanityEnvironment(environment: SanityEnvironmentSource) {
  return Object.freeze({
    projectId: requireSanityProjectId(
      environment.NEXT_PUBLIC_SANITY_PROJECT_ID,
    ),
    dataset: requireSanityDataset(environment.NEXT_PUBLIC_SANITY_DATASET),
    apiVersion: requireSanityApiVersion(
      environment.NEXT_PUBLIC_SANITY_API_VERSION,
    ),
    studioUrl: requireSanityStudioUrl(
      environment.NEXT_PUBLIC_SANITY_STUDIO_URL,
    ),
  });
}
