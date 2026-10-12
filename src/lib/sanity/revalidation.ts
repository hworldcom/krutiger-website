import type { NextRequest } from "next/server";

export const SANITY_REVALIDATABLE_DOCUMENT_TYPES = [
  "aboutPage",
  "classType",
  "coach",
  "faq",
  "homepage",
  "imprintPage",
  "membershipCard",
  "monthlyPassCard",
  "pricingPage",
  "privacyPage",
  "schedulePage",
  "siteSettings",
  "teamPage",
  "trainingPage",
] as const;

export type SanityRevalidationPayload = Readonly<{
  _type?: unknown;
}>;

type ParsedSanityWebhook = Readonly<{
  body: SanityRevalidationPayload | null;
  isValidSignature: boolean | null;
}>;

type ParseSanityWebhook = (
  request: NextRequest,
  secret: string,
) => Promise<ParsedSanityWebhook>;

type RevalidateCacheTag = (tag: string) => void;

const revalidatableDocumentTypes = new Set<string>(
  SANITY_REVALIDATABLE_DOCUMENT_TYPES,
);

function jsonResponse(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function getSanityCacheTag(documentType: unknown) {
  if (
    typeof documentType !== "string" ||
    !revalidatableDocumentTypes.has(documentType)
  ) {
    return null;
  }

  return `sanity:${documentType}`;
}

export async function handleSanityRevalidation(
  request: NextRequest,
  options: Readonly<{
    parseWebhook: ParseSanityWebhook;
    revalidateCacheTag: RevalidateCacheTag;
    secret: string | undefined;
  }>,
) {
  const secret = options.secret?.trim();

  if (!secret) {
    return jsonResponse(
      { message: "Sanity revalidation is not configured." },
      503,
    );
  }

  let parsedWebhook: ParsedSanityWebhook;

  try {
    parsedWebhook = await options.parseWebhook(request, secret);
  } catch {
    return jsonResponse({ message: "Invalid webhook payload." }, 400);
  }

  if (!parsedWebhook.isValidSignature) {
    return jsonResponse({ message: "Invalid webhook signature." }, 401);
  }

  const tag = getSanityCacheTag(parsedWebhook.body?._type);

  if (!tag) {
    return jsonResponse(
      {
        message: "Document type does not affect cached website content.",
        revalidated: false,
      },
      202,
    );
  }

  options.revalidateCacheTag(tag);

  return jsonResponse({ revalidated: true, tag }, 200);
}
