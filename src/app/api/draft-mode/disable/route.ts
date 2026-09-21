import { cookies, draftMode } from "next/headers";

import { handleDisableDraftMode } from "@/lib/sanity/draft-mode";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleDisableDraftMode(request, async () => {
    const cookieStore = await cookies();
    const partitioned = cookieStore.has("sanity-preview-partitioned");
    const secure = process.env.NODE_ENV === "production";
    const draft = await draftMode();
    draft.disable();

    for (const name of [
      "__prerender_bypass",
      "sanity-preview-perspective",
      "sanity-preview-variant",
      "sanity-preview-partitioned",
    ]) {
      cookieStore.delete({
        name,
        httpOnly: true,
        partitioned,
        path: "/",
        sameSite: secure ? "none" : "lax",
        secure,
      });
    }
  });
}
