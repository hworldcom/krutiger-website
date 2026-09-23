"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  bsportGiftCardElementId,
  bsportGiftCardWidgetScriptUrl,
  createBsportGiftCardConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportGiftCardWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["giftCards"];
  locale: Locale;
}>;

type WidgetStatus = "loading" | "mounted" | "error";

export function BsportGiftCardWidget({
  copy,
  locale,
}: BsportGiftCardWidgetProps) {
  const hasMounted = useRef(false);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(bsportGiftCardElementId);

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
    const mountElement = document.getElementById(bsportGiftCardElementId);

    if (
      !window.BsportWidget ||
      !prepareBsportWidgetMount(
        bsportGiftCardWidgetScriptUrl,
        mountElement,
        locale,
      ) ||
      hasMounted.current
    ) {
      return;
    }

    try {
      window.BsportWidget.mount(
        createBsportGiftCardConfig(bsportGiftCardElementId, locale),
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
      data-integration-boundary="giftCards"
      data-widget-environment="production"
    >
      <div
        aria-busy={status === "loading"}
        className="min-h-[32rem] rounded-control border border-line bg-panel text-copy"
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
        <div className="min-h-[32rem] w-full" id={bsportGiftCardElementId} />
      </div>

      <Script
        id="bsport-gift-card-widget-cdn"
        onError={() => setStatus("error")}
        onReady={mountWidget}
        src={bsportGiftCardWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </div>
  );
}
