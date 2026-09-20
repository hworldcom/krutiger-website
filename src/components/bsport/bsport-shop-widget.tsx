"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  bsportGiftCardElementId,
  bsportShopElementId,
  bsportShopWidgetScriptUrl,
  createBsportGiftCardConfig,
  createBsportShopConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportShopWidgetProps = Readonly<{
  copy: Dictionary["integrations"]["shop"];
  giftCardCopy: Dictionary["integrations"]["giftCards"];
}>;

type WidgetStatus = "loading" | "mounted" | "error";

type WidgetSectionProps = Readonly<{
  boundary: "giftCards" | "shop";
  compact?: boolean;
  copy: Dictionary["integrations"]["shop"];
  elementId: string;
  headingId: string;
  sectionId?: string;
  status: WidgetStatus;
}>;

function useWidgetStatus(elementId: string) {
  const [status, setStatus] = useState<WidgetStatus>("loading");

  useEffect(() => {
    const mountElement = document.getElementById(elementId);

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
  }, [elementId]);

  return [status, setStatus] as const;
}

function WidgetSection({
  boundary,
  compact = false,
  copy,
  elementId,
  headingId,
  sectionId,
  status,
}: WidgetSectionProps) {
  const minimumHeight = compact ? "min-h-[24rem]" : "min-h-[32rem]";

  return (
    <section
      aria-labelledby={headingId}
      className={compact ? "mt-16 border-t border-line pt-16" : "mt-12"}
      data-integration-boundary={boundary}
      data-widget-environment="production"
      id={sectionId}
    >
      <div className="max-w-copy">
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id={headingId}
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
      </div>

      <div
        aria-busy={status === "loading"}
        className={`mt-8 ${minimumHeight} rounded-control border border-line bg-panel text-copy`}
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
        <div className={`${minimumHeight} w-full`} id={elementId} />
      </div>
    </section>
  );
}

export function BsportShopWidget({
  copy,
  giftCardCopy,
}: BsportShopWidgetProps) {
  const hasMounted = useRef({ giftCards: false, shop: false });
  const [shopStatus, setShopStatus] = useWidgetStatus(bsportShopElementId);
  const [giftCardStatus, setGiftCardStatus] = useWidgetStatus(
    bsportGiftCardElementId,
  );

  const mountWidgets = useCallback(() => {
    const shopMountElement = document.getElementById(bsportShopElementId);
    const giftCardMountElement = document.getElementById(
      bsportGiftCardElementId,
    );

    if (
      !shopMountElement ||
      !giftCardMountElement ||
      !window.BsportWidget ||
      !prepareBsportWidgetMount(bsportShopWidgetScriptUrl, shopMountElement)
    ) {
      return;
    }

    if (!hasMounted.current.shop) {
      try {
        window.BsportWidget.mount(createBsportShopConfig(bsportShopElementId));
        hasMounted.current.shop = true;
      } catch {
        setShopStatus("error");
      }
    }

    if (!hasMounted.current.giftCards) {
      try {
        window.BsportWidget.mount(
          createBsportGiftCardConfig(bsportGiftCardElementId),
        );
        hasMounted.current.giftCards = true;
      } catch {
        setGiftCardStatus("error");
      }
    }
  }, [setGiftCardStatus, setShopStatus]);

  useEffect(() => {
    const mountAttemptId = window.setTimeout(mountWidgets, 0);

    return () => window.clearTimeout(mountAttemptId);
  }, [mountWidgets]);

  return (
    <>
      <WidgetSection
        boundary="shop"
        copy={copy}
        elementId={bsportShopElementId}
        headingId="shop-integration-heading"
        status={shopStatus}
      />
      <WidgetSection
        boundary="giftCards"
        compact
        copy={giftCardCopy}
        elementId={bsportGiftCardElementId}
        headingId="gift-card-integration-heading"
        sectionId="gift-cards"
        status={giftCardStatus}
      />

      <Script
        id="bsport-shop-widget-cdn"
        onError={() => {
          setShopStatus("error");
          setGiftCardStatus("error");
        }}
        onReady={mountWidgets}
        src={bsportShopWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </>
  );
}
