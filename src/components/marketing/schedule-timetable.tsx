"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { VisuallyHidden } from "@/components/ui";
import type { EditorialImage } from "@/content/editorial";

const minimumZoom = 100;
const initialZoom = 150;
const maximumZoom = 300;
const zoomStep = 50;

export type ScheduleTimetableLabels = Readonly<{
  hint: string;
  open: string;
  viewer: string;
  close: string;
  zoomIn: string;
  zoomOut: string;
  fit: string;
}>;

type ScheduleTimetableProps = Readonly<{
  image: EditorialImage;
  labels: ScheduleTimetableLabels;
}>;

function ViewerButton({
  children,
  disabled,
  label,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}>) {
  return (
    <button
      aria-label={label}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border border-line bg-panel font-display text-xl font-bold text-copy transition-colors hover:border-copy hover:bg-panel-raised disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

export function ScheduleTimetable({ image, labels }: ScheduleTimetableProps) {
  const [zoomPercent, setZoomPercent] = useState(initialZoom);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef("");

  function restorePageScroll() {
    document.documentElement.style.overflow = previousOverflowRef.current;
  }

  function openViewer() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setZoomPercent(initialZoom);
    dialog.showModal();
    closeButtonRef.current?.focus();
  }

  function closeViewer() {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }

  function handleDialogClose() {
    restorePageScroll();
    openButtonRef.current?.focus();
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeViewer();
    }
  }

  useEffect(
    () => () => {
      restorePageScroll();
    },
    [],
  );

  return (
    <figure className="mt-12">
      <button
        aria-label={labels.open}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-control bg-panel text-left outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        onClick={openViewer}
        ref={openButtonRef}
        type="button"
      >
        <Image
          alt={image.alternativeText}
          className="block h-auto w-full max-w-full"
          height={934}
          sizes="(min-width: 1440px) 1360px, 100vw"
          src={image.src}
          width={1640}
        />
        <span className="absolute right-2 bottom-2 rounded-control bg-canvas/90 px-3 py-2 text-xs font-semibold text-copy shadow-header backdrop-blur sm:right-4 sm:bottom-4 sm:text-sm">
          {labels.hint}
        </span>
      </button>

      {image.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-copy-muted">
          {image.caption}
        </figcaption>
      ) : null}

      <dialog
        aria-label={labels.viewer}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-canvas p-0 text-copy backdrop:bg-black/85"
        onClick={handleDialogClick}
        onClose={handleDialogClose}
        ref={dialogRef}
      >
        <div className="flex h-dvh flex-col bg-canvas">
          <div className="relative z-10 flex min-h-16 shrink-0 items-center justify-between gap-3 border-b border-line bg-canvas/95 px-3 py-2 shadow-header backdrop-blur sm:px-6">
            <p className="min-w-0 truncate text-sm font-semibold sm:text-base">
              {image.caption ?? image.alternativeText}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <ViewerButton
                disabled={zoomPercent <= minimumZoom}
                label={labels.zoomOut}
                onClick={() =>
                  setZoomPercent((current) =>
                    Math.max(minimumZoom, current - zoomStep),
                  )
                }
              >
                <span aria-hidden="true">−</span>
              </ViewerButton>
              <button
                aria-label={labels.fit}
                className="min-h-11 min-w-16 rounded-control border border-line bg-panel px-3 font-display text-sm font-bold text-copy transition-colors hover:border-copy hover:bg-panel-raised"
                onClick={() => setZoomPercent(minimumZoom)}
                title={labels.fit}
                type="button"
              >
                {zoomPercent}%
              </button>
              <ViewerButton
                disabled={zoomPercent >= maximumZoom}
                label={labels.zoomIn}
                onClick={() =>
                  setZoomPercent((current) =>
                    Math.min(maximumZoom, current + zoomStep),
                  )
                }
              >
                <span aria-hidden="true">+</span>
              </ViewerButton>
              <ViewerButton label={labels.close} onClick={closeViewer}>
                <span aria-hidden="true">×</span>
                <VisuallyHidden>{labels.close}</VisuallyHidden>
              </ViewerButton>
            </div>
          </div>

          <div className="flex-1 touch-pan-x touch-pan-y overflow-auto overscroll-contain p-2 sm:p-6">
            <div
              className="mx-auto min-w-full transition-[width] duration-150 ease-brand"
              data-timetable-zoom={zoomPercent}
              style={{ width: `${zoomPercent}%` }}
            >
              <Image
                alt={image.alternativeText}
                className="block h-auto w-full max-w-none"
                height={1367}
                sizes="300vw"
                src={image.src}
                width={2400}
              />
            </div>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
