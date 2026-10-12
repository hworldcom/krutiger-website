import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import {
  handleSanityRevalidation,
  type SanityRevalidationPayload,
} from "@/lib/sanity/revalidation";

export const dynamic = "force-dynamic";

export function POST(request: NextRequest) {
  return handleSanityRevalidation(request, {
    parseWebhook: (webhookRequest, secret) =>
      parseBody<SanityRevalidationPayload>(webhookRequest, secret, true),
    revalidateCacheTag: (tag) => revalidateTag(tag, { expire: 0 }),
    secret: process.env.SANITY_REVALIDATE_SECRET,
  });
}
