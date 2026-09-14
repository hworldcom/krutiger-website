"use client";

import { usePathname } from "next/navigation";

import { validatePreviewDestination } from "@/lib/sanity/draft-mode";

type PreviewBannerProps = Readonly<{
  fallbackDestination: string;
  labels: Readonly<{
    landmarkLabel: string;
    status: string;
    exitAction: string;
  }>;
}>;

export function PreviewBanner({ fallbackDestination, labels }: PreviewBannerProps) {
  const pathname = usePathname();
  const validatedDestination = validatePreviewDestination(pathname);
  const destination = validatedDestination.ok
    ? validatedDestination.destination
    : fallbackDestination;

  return (
    <aside
      aria-label={labels.landmarkLabel}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-black/30 bg-brand px-4 py-3 text-brand-ink shadow-[0_-1rem_3rem_rgb(0_0_0/0.45)]"
      data-draft-preview-banner
    >
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center sm:justify-between sm:text-left">
        <p className="m-0 font-bold" role="status">
          {labels.status}
        </p>
        <form action="/api/draft-mode/disable" method="post">
          <input name="destination" type="hidden" value={destination} />
          <button
            className="min-h-10 cursor-pointer rounded-control border border-brand-ink bg-brand-ink px-4 py-2 font-display text-sm font-bold tracking-wide text-brand uppercase transition-colors hover:bg-panel focus-visible:outline-black"
            type="submit"
          >
            {labels.exitAction}
          </button>
        </form>
      </div>
    </aside>
  );
}
