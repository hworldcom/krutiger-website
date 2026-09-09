"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  bsportCalendarWidgetScriptUrl,
  bsportScheduleElementId,
  createBsportCalendarConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportScheduleWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["schedule"];
}>;

type WidgetStatus = "loading" | "mounted" | "error";

export function BsportScheduleWidget({ copy }: BsportScheduleWidgetProps) {
  const hasMounted = useRef(false);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(bsportScheduleElementId);

    if (!mountElement) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus((currentStatus) =>
        currentStatus === "loading" ? "error" : currentStatus,
      );
    }, 30_000);
    const markReadyWhenContentRenders = () => {
      if (mountElement.textContent?.trim()) {
        window.clearTimeout(timeoutId);
        setStatus("mounted");
      }
    };
    const observer = new MutationObserver(markReadyWhenContentRenders);

    observer.observe(mountElement, {
      characterData: true,
      childList: true,
      subtree: true,
    });
    markReadyWhenContentRenders();

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const mountWidget = useCallback(() => {
    const mountElement = document.getElementById(bsportScheduleElementId);

    if (
      hasMounted.current ||
      !window.BsportWidget ||
      !prepareBsportWidgetMount(bsportCalendarWidgetScriptUrl, mountElement)
    ) {
      return;
    }

    try {
      window.BsportWidget.mount(
        createBsportCalendarConfig(bsportScheduleElementId),
      );
      hasMounted.current = true;
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const mountAttemptId = window.setTimeout(mountWidget, 0);

    return () => window.clearTimeout(mountAttemptId);
  }, [mountWidget]);

  return (
    <section
      aria-labelledby="schedule-integration-heading"
      className="mt-12"
      data-integration-boundary="schedule"
      data-widget-environment="production"
    >
      <div className="max-w-copy">
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="schedule-integration-heading"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
      </div>

      <div
        aria-busy={status === "loading"}
        className="mt-8 min-h-[40rem] rounded-control border border-line bg-panel text-copy"
      >
        {status === "loading" ? (
          <p className="p-6 text-base text-copy-muted" role="status">
            {copy.loading}
          </p>
        ) : null}
        {status === "error" ? (
          <p
            className="p-6 text-base text-signal"
            data-widget-fallback="error"
            role="alert"
          >
            {copy.error}
          </p>
        ) : null}
        <div className="min-h-[40rem] w-full" id={bsportScheduleElementId} />
      </div>

      <Script
        id="bsport-calendar-widget-cdn"
        onError={() => setStatus("error")}
        onReady={mountWidget}
        src={bsportCalendarWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </section>
  );
}
