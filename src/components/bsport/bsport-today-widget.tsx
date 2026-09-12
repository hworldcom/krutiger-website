"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/i18n/config";
import type { HomePageCopy } from "@/i18n/dictionaries/types";
import {
  formatBsportClassDate,
  formatBsportClassTime,
  getNextAvailableClasses,
  type NextAvailableClasses,
} from "@/lib/bsport/offers";
import {
  bsportCalendarCompanyId,
  bsportCalendarWidgetScriptUrl,
  bsportTodayElementId,
  createBsportTodayConfig,
  prepareBsportWidgetMount,
} from "@/lib/bsport/widget";

type BsportTodayWidgetProps = Readonly<{
  copy: HomePageCopy["schedule"];
  locale: Locale;
}>;

type WidgetStatus = "loading" | "mounted" | "empty" | "error";
type UpcomingStatus = "idle" | "loading" | "loaded" | "unavailable";

export function BsportTodayWidget({ copy, locale }: BsportTodayWidgetProps) {
  const hasMounted = useRef(false);
  const hasRequestedUpcomingClasses = useRef(false);
  const upcomingRequest = useRef<AbortController | null>(null);
  const [nextAvailable, setNextAvailable] =
    useState<NextAvailableClasses | null>(null);
  const [status, setStatus] = useState<WidgetStatus>("loading");
  const [upcomingStatus, setUpcomingStatus] = useState<UpcomingStatus>("idle");

  useEffect(() => {
    const mountElement = document.getElementById(bsportTodayElementId);

    if (!mountElement) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setStatus((currentStatus) =>
        currentStatus === "loading" ? "error" : currentStatus,
      );
    }, 30_000);
    const markReadyWhenContentRenders = () => {
      if (mountElement.querySelector(".bs-calendar--no-offer")) {
        window.clearTimeout(timeoutId);
        setStatus("empty");

        if (!hasRequestedUpcomingClasses.current) {
          hasRequestedUpcomingClasses.current = true;
          setUpcomingStatus("loading");
          upcomingRequest.current = new AbortController();

          void getNextAvailableClasses({
            companyId: bsportCalendarCompanyId,
            signal: upcomingRequest.current.signal,
          })
            .then((result) => {
              if (!upcomingRequest.current?.signal.aborted && result) {
                setNextAvailable(result);
                setUpcomingStatus("loaded");
              } else if (!upcomingRequest.current?.signal.aborted) {
                setUpcomingStatus("unavailable");
              }
            })
            .catch(() => {
              if (!upcomingRequest.current?.signal.aborted) {
                setUpcomingStatus("unavailable");
              }
            });
        }

        return;
      }

      if (mountElement.childElementCount > 0) {
        window.clearTimeout(timeoutId);
        setStatus("mounted");
      }
    };
    const observer = new MutationObserver(markReadyWhenContentRenders);

    observer.observe(mountElement, { childList: true, subtree: true });
    markReadyWhenContentRenders();

    return () => {
      observer.disconnect();
      upcomingRequest.current?.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  const mountWidget = useCallback(() => {
    const mountElement = document.getElementById(bsportTodayElementId);

    if (
      hasMounted.current ||
      !window.BsportWidget ||
      !prepareBsportWidgetMount(bsportCalendarWidgetScriptUrl, mountElement)
    ) {
      return;
    }

    try {
      window.BsportWidget.mount(createBsportTodayConfig(bsportTodayElementId));
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
    <div
      aria-busy={status === "loading"}
      className="min-w-0 border-t border-line lg:border-l lg:border-t-0"
      data-integration-boundary="home-schedule"
      data-widget-environment="production"
    >
      {status === "loading" ? (
        <p className="p-6 text-sm text-copy-muted" role="status">
          {copy.loading}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="p-6 text-sm text-signal" role="alert">
          {copy.error}
        </p>
      ) : null}
      {status === "empty" ? (
        <div aria-live="polite">
          <div className="p-6 pb-4">
            <p className="text-sm leading-6 text-copy-muted">{copy.empty}</p>
            {upcomingStatus === "loading" ? (
              <p className="mt-2 text-sm text-copy-muted">{copy.nextLoading}</p>
            ) : null}
            {upcomingStatus === "unavailable" ? (
              <p className="mt-2 text-sm text-signal">{copy.nextUnavailable}</p>
            ) : null}
            {nextAvailable ? (
              <p className="mt-2 font-display text-lg font-bold tracking-wide text-brand uppercase">
                {formatBsportClassDate(
                  nextAvailable.date,
                  locale === "de" ? "de-DE" : "en-GB",
                )}
              </p>
            ) : null}
          </div>

          {nextAvailable ? (
            <ul className="grid border-t border-line sm:grid-cols-3">
              {nextAvailable.classes.map((offer) => (
                <li
                  className="border-t border-line first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0"
                  key={offer.id}
                >
                  <a
                    className="flex min-h-28 flex-col gap-2 p-5 transition-colors hover:bg-panel focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-focus"
                    href={`/${locale}/schedule`}
                  >
                    <span className="font-display text-xl leading-none font-extrabold text-brand">
                      {formatBsportClassTime(
                        offer,
                        locale === "de" ? "de-DE" : "en-GB",
                      )}
                    </span>
                    <span className="font-display text-lg leading-tight font-bold uppercase">
                      {offer.activityName}
                    </span>
                    {offer.levelId === 1 ? (
                      <span className="mt-auto w-fit border border-line px-2 py-1 font-display text-xs font-bold tracking-[0.06em] text-copy-muted uppercase">
                        {copy.allLevels}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <div
        className={status === "empty" ? "hidden" : "min-h-28 w-full"}
        id={bsportTodayElementId}
      />

      <Script
        id="bsport-today-widget-cdn"
        onError={() => setStatus("error")}
        onReady={mountWidget}
        src={bsportCalendarWidgetScriptUrl}
        strategy="afterInteractive"
      />
    </div>
  );
}
