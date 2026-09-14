import { getLocalizedPath } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import { siteRoutes } from "@/lib/routes";

const previewSecretParameter = "sanity-preview-secret";
const previewPathnameParameter = "sanity-preview-pathname";

const approvedPreviewDestinations = new Set(
  locales.flatMap((locale) =>
    siteRoutes.map((route) => getLocalizedPath(locale, route.path)),
  ),
);

type DestinationValidation =
  Readonly<{ ok: true; destination: string }> | Readonly<{ ok: false }>;

type EnableDraftMode = (request: Request) => Response | Promise<Response>;
type DisableDraftMode = () => void | Promise<void>;

function noStoreResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function validatePreviewDestination(
  value: string | null,
): DestinationValidation {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    value.includes("?") ||
    value.includes("#")
  ) {
    return { ok: false };
  }

  let pathname: string;

  try {
    const destination = new URL(value, "https://preview.invalid");
    pathname = destination.pathname;
  } catch {
    return { ok: false };
  }

  if (pathname !== value || !approvedPreviewDestinations.has(pathname)) {
    return { ok: false };
  }

  return { ok: true, destination: pathname };
}

export async function handleEnableDraftMode(
  request: Request,
  enableDraftMode: EnableDraftMode,
) {
  const requestUrl = new URL(request.url);
  const secret = requestUrl.searchParams.get(previewSecretParameter)?.trim();

  if (!secret) {
    return noStoreResponse("Invalid preview credentials.", 401);
  }

  const destination = validatePreviewDestination(
    requestUrl.searchParams.get(previewPathnameParameter),
  );

  if (!destination.ok) {
    return noStoreResponse("Invalid preview destination.", 400);
  }

  return enableDraftMode(request);
}

export async function handleDisableDraftMode(
  request: Request,
  disableDraftMode: DisableDraftMode,
) {
  const requestUrl = new URL(request.url);
  const requestOrigin = request.headers.get("origin");

  if (requestOrigin && requestOrigin !== requestUrl.origin) {
    return noStoreResponse("Invalid request origin.", 403);
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return noStoreResponse("Invalid form submission.", 400);
  }

  const destinationValue = formData.get("destination");
  const destination = validatePreviewDestination(
    typeof destinationValue === "string" ? destinationValue : null,
  );

  if (!destination.ok) {
    return noStoreResponse("Invalid preview destination.", 400);
  }

  await disableDraftMode();

  return new Response(null, {
    status: 303,
    headers: {
      "Cache-Control": "no-store",
      Location: destination.destination,
    },
  });
}
