import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { handleEnableDraftMode } from "@/lib/sanity/draft-mode";
import { getPreviewSanityClient } from "@/lib/sanity/preview-client";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return handleEnableDraftMode(request, (validatedRequest) => {
    let handler: ReturnType<typeof defineEnableDraftMode>;

    try {
      handler = defineEnableDraftMode({ client: getPreviewSanityClient() });
    } catch {
      return new Response("Draft preview is not configured.", {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    return handler.GET(validatedRequest);
  });
}
