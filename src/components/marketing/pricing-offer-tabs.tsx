"use client";

import { useState } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { MembershipPlan } from "@/lib/bsport/memberships";
import type { MonthlyPass } from "@/lib/bsport/passes";

import { MembershipPricing } from "./membership-pricing";
import { MonthlyPassPricing } from "./monthly-pass-pricing";

type PricingOffer = "memberships" | "passes";

type PricingOfferTabsProps = Readonly<{
  copy: Dictionary["integrations"]["pricing"];
  locale: Locale;
  memberships: readonly MembershipPlan[];
  passes: readonly MonthlyPass[];
}>;

const offers: readonly PricingOffer[] = ["memberships", "passes"];

export function PricingOfferTabs({
  copy,
  locale,
  memberships,
  passes,
}: PricingOfferTabsProps) {
  const [selectedOffer, setSelectedOffer] =
    useState<PricingOffer>("memberships");

  const selectOffer = (offer: PricingOffer) => {
    setSelectedOffer(offer);
    document.getElementById(`pricing-offer-tab-${offer}`)?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    offer: PricingOffer,
  ) => {
    const currentIndex = offers.indexOf(offer);
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % offers.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + offers.length) % offers.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = offers.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    selectOffer(offers[nextIndex]);
  };

  return (
    <div className="mt-12" data-pricing-offer-tabs>
      <div
        aria-label={copy.offerSelectorLabel}
        className="flex border-b border-line"
        role="tablist"
      >
        {offers.map((offer) => {
          const isSelected = selectedOffer === offer;
          const label =
            offer === "memberships" ? copy.membershipTab : copy.passesTab;

          return (
            <button
              aria-controls={`pricing-offer-panel-${offer}`}
              aria-selected={isSelected}
              className={`relative min-h-14 flex-1 px-3 py-3 font-display text-xl font-bold tracking-wide uppercase transition-colors duration-150 ease-brand sm:flex-none sm:px-10 sm:text-2xl ${
                isSelected ? "text-brand" : "text-copy-muted hover:text-copy"
              }`}
              id={`pricing-offer-tab-${offer}`}
              key={offer}
              onClick={() => setSelectedOffer(offer)}
              onKeyDown={(event) => handleTabKeyDown(event, offer)}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              {label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-1 bg-brand transition-opacity ${
                  isSelected ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby="pricing-offer-tab-memberships"
        hidden={selectedOffer !== "memberships"}
        id="pricing-offer-panel-memberships"
        role="tabpanel"
        tabIndex={0}
      >
        <MembershipPricing
          copy={copy}
          locale={locale}
          memberships={memberships}
        />
      </div>

      <div
        aria-labelledby="pricing-offer-tab-passes"
        hidden={selectedOffer !== "passes"}
        id="pricing-offer-panel-passes"
        role="tabpanel"
        tabIndex={0}
      >
        <MonthlyPassPricing
          copy={copy.monthlyPasses}
          locale={locale}
          passes={passes}
        />
      </div>
    </div>
  );
}
