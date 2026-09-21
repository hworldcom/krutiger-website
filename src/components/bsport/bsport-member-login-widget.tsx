"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";
import {
  bsportMemberAreaElementId,
  bsportWidgetScriptUrl,
  createBsportLoginConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportMemberLoginWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["memberArea"];
  locale: Locale;
}>;

type WidgetStatus = "loading" | "mounted" | "error";

export function BsportMemberLoginWidget({
  copy,
  locale,
}: BsportMemberLoginWidgetProps) {
  const hasMounted = useRef(false);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(bsportMemberAreaElementId);

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
    const mountElement = document.getElementById(bsportMemberAreaElementId);

    if (
      !window.BsportWidget ||
      !prepareBsportWidgetMount(bsportWidgetScriptUrl, mountElement, locale) ||
      hasMounted.current
    ) {
      return;
    }

    try {
      window.BsportWidget.mount(
        createBsportLoginConfig(bsportMemberAreaElementId, locale),
      );
      hasMounted.current = true;
    } catch {
      setStatus("error");
    }
  }, [locale]);

  useEffect(() => {
    const mountAttemptId = window.setTimeout(mountWidget, 0);

    return () => window.clearTimeout(mountAttemptId);
  }, [mountWidget]);

  return (
    <section
      aria-labelledby="member-area-integration-heading"
      className="mt-12"
      data-integration-boundary="memberArea"
      data-widget-environment="production"
    >
      <div className="max-w-copy">
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="member-area-integration-heading"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
      </div>

      <div
        aria-busy={status === "loading"}
        className="mt-8 min-h-40 rounded-control border border-line bg-panel p-6 sm:p-8"
      >
        {status === "loading" ? (
          <p className="text-base text-copy-muted" role="status">
            {copy.loading}
          </p>
        ) : null}
        {status === "error" ? (
          <p
            className="text-base text-signal"
            data-widget-fallback="error"
            role="alert"
          >
            {copy.error}
          </p>
        ) : null}
        <div className="min-h-12 w-full" id={bsportMemberAreaElementId} />
      </div>

      <Script
        id="bsport-widget-cdn"
        onError={() => setStatus("error")}
        onReady={mountWidget}
        src={bsportWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </section>
  );
}
