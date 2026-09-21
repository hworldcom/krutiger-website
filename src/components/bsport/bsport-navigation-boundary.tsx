"use client";

import type { MouseEvent, ReactNode } from "react";

type BsportNavigationBoundaryProps = Readonly<{
  children: ReactNode;
}>;

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLDivElement>) {
  return (
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  );
}

export function BsportNavigationBoundary({
  children,
}: BsportNavigationBoundaryProps) {
  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      !isUnmodifiedPrimaryClick(event) ||
      !window.__krutigerBsportWidgetMountElement ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const link = event.target.closest("a[href]");

    if (
      !(link instanceof HTMLAnchorElement) ||
      link.dataset.bsportLanguageSwitch === "true" ||
      link.closest('[id^="bsport-widget-"]') ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const staysOnCurrentDocument =
      destination.origin === current.origin &&
      destination.pathname === current.pathname &&
      destination.search === current.search;

    if (destination.origin !== current.origin || staysOnCurrentDocument) {
      return;
    }

    event.preventDefault();
    window.location.assign(destination.href);
  }

  return (
    <div className="contents" onClickCapture={handleClickCapture}>
      {children}
    </div>
  );
}
