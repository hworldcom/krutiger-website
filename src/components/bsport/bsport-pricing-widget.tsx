"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  bsportPricingElementId,
  bsportWidgetScriptUrl,
  createBsportPassConfig,
} from "@/lib/bsport/widget";

type BsportPricingWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["pricing"];
}>;

type WidgetStatus = "loading" | "mounted" | "error";

export function BsportPricingWidget({ copy }: BsportPricingWidgetProps) {
  const hasMounted = useRef(false);
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(bsportPricingElementId);

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
    if (hasMounted.current || !window.BsportWidget) {
      return;
    }

    try {
      window.BsportWidget.mount(createBsportPassConfig(bsportPricingElementId));
      hasMounted.current = true;
    } catch {
      setStatus("error");
    }
  }, []);

  return (
    <section
      aria-labelledby="pricing-integration-heading"
      className="mt-12"
      data-integration-boundary="pricing"
      data-widget-environment="staging"
    >
      <div className="max-w-copy">
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="pricing-integration-heading"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
        <p className="mt-5 border-l-2 border-signal pl-4 text-sm leading-6 text-signal">
          {copy.stagingNotice}
        </p>
      </div>

      <div
        aria-busy={status === "loading"}
        className="mt-8 min-h-[32rem] rounded-control border border-line bg-panel text-copy"
      >
        {status === "loading" ? (
          <p className="p-6 text-base text-copy-muted" role="status">
            {copy.loading}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="p-6 text-base text-signal" role="alert">
            {copy.error}
          </p>
        ) : null}
        <div className="min-h-[32rem] w-full" id={bsportPricingElementId} />
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
