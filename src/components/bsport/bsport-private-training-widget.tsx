"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  bsportPrivateTrainingElementId,
  bsportPrivateTrainingWidgetScriptUrl,
  createBsportPrivateTrainingConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportPrivateTrainingWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["privateTraining"];
  locale: Locale;
}>;

type WidgetStatus = "loading" | "mounted" | "error";

export function BsportPrivateTrainingWidget({
  copy,
  locale,
}: BsportPrivateTrainingWidgetProps) {
  const hasMounted = useRef(false);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(
      bsportPrivateTrainingElementId,
    );

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
    const mountElement = document.getElementById(
      bsportPrivateTrainingElementId,
    );

    if (
      !window.BsportWidget ||
      !prepareBsportWidgetMount(
        bsportPrivateTrainingWidgetScriptUrl,
        mountElement,
        locale,
      ) ||
      hasMounted.current
    ) {
      return;
    }

    try {
      window.BsportWidget.mount(
        createBsportPrivateTrainingConfig(
          bsportPrivateTrainingElementId,
          locale,
        ),
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
    <div
      className="mt-12"
      data-integration-boundary="privateTraining"
      data-widget-environment="production"
    >
      <div
        aria-busy={status === "loading"}
        className="min-h-[24rem] rounded-control border border-line bg-panel text-copy"
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
        <div
          className="min-h-[24rem] w-full"
          id={bsportPrivateTrainingElementId}
        />
      </div>

      <Script
        id="bsport-private-training-widget-cdn"
        onError={() => setStatus("error")}
        onReady={mountWidget}
        src={bsportPrivateTrainingWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </div>
  );
}
