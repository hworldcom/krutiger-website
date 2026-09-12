"use client";

import { useState } from "react";

import { getButtonClassName } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  membershipDurations,
  membershipTerms,
  membershipsByDuration,
  type MembershipDuration,
} from "@/lib/bsport/memberships";

type MembershipPricingProps = Readonly<{
  copy: Dictionary["integrations"]["pricing"];
  locale: Locale;
}>;

export function MembershipPricing({ copy, locale }: MembershipPricingProps) {
  const [selectedDuration, setSelectedDuration] =
    useState<MembershipDuration>(12);
  const memberships = membershipsByDuration[selectedDuration];
  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const selectDuration = (duration: MembershipDuration) => {
    setSelectedDuration(duration);
    document.getElementById(`membership-duration-${duration}`)?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    duration: MembershipDuration,
  ) => {
    const currentIndex = membershipDurations.indexOf(duration);
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % membershipDurations.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + membershipDurations.length) %
        membershipDurations.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = membershipDurations.length - 1;
    }

    if (nextIndex === undefined) {
      return;
    }

    event.preventDefault();
    selectDuration(membershipDurations[nextIndex]);
  };

  return (
    <section
      aria-labelledby="membership-pricing-heading"
      className="mt-12"
      data-membership-pricing
    >
      <div className="max-w-copy">
        <div className="h-1 w-12 bg-brand" aria-hidden="true" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="membership-pricing-heading"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
      </div>

      <div className="mt-6 border-l-2 border-brand bg-panel/70 p-5">
        <p className="font-display text-sm font-bold tracking-[0.14em] text-brand uppercase">
          {copy.termsLabel}
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-copy-muted sm:grid-cols-3 sm:gap-5">
          <li>
            {copy.billingDay.replace(
              "{day}",
              String(membershipTerms.billingDay),
            )}
          </li>
          <li>
            {copy.joiningFee}:{" "}
            {currencyFormatter.format(membershipTerms.joiningFee)}
          </li>
          {membershipTerms.autoRenewal ? <li>{copy.autoRenewal}</li> : null}
        </ul>
      </div>

      <div
        aria-label={copy.durationSelectorLabel}
        className="mt-10 flex flex-wrap gap-2 border-b border-line"
        role="tablist"
      >
        {membershipDurations.map((duration) => {
          const isSelected = selectedDuration === duration;

          return (
            <button
              aria-controls={`membership-panel-${duration}`}
              aria-selected={isSelected}
              className={`relative min-h-12 px-5 py-3 font-display text-lg font-bold tracking-wide uppercase transition-colors duration-150 ease-brand sm:px-8 ${
                isSelected ? "text-brand" : "text-copy-muted hover:text-copy"
              }`}
              id={`membership-duration-${duration}`}
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              onKeyDown={(event) => handleTabKeyDown(event, duration)}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              {copy.durationLabels[duration]}
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
        aria-labelledby={`membership-duration-${selectedDuration}`}
        className="pt-8"
        id={`membership-panel-${selectedDuration}`}
        role="tabpanel"
        tabIndex={0}
      >
        {memberships.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {memberships.map((membership) => {
              const accessDescription =
                membership.monthlySessions === "unlimited"
                  ? copy.unlimitedAccess
                  : copy.monthlyAccess.replace(
                      "{count}",
                      String(membership.monthlySessions),
                    );

              return (
                <article
                  className="group relative flex min-h-full flex-col overflow-hidden border border-line bg-panel p-6 transition-colors hover:border-brand sm:p-8"
                  key={membership.id}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-brand"
                  />
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-sm font-bold tracking-[0.2em] text-brand uppercase">
                        {copy.membershipLabel}
                      </p>
                      <h3 className="mt-2 font-display text-4xl font-extrabold uppercase sm:text-5xl">
                        {membership.name}
                      </h3>
                    </div>
                    <p className="border border-line px-3 py-2 font-display text-sm font-bold tracking-wide text-copy-muted uppercase">
                      {copy.durationLabels[membership.durationMonths]}
                    </p>
                  </div>

                  <div className="mt-8 border-b border-line pb-7">
                    <p className="flex items-end gap-2">
                      <span className="font-display text-6xl leading-none font-extrabold text-copy">
                        {currencyFormatter.format(membership.monthlyPrice)}
                      </span>
                      <span className="pb-1 text-copy-muted">
                        {copy.perMonth}
                      </span>
                    </p>
                  </div>

                  <div className="flex-1 py-7">
                    <p className="font-semibold text-copy">
                      {accessDescription}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {membership.benefits.map((benefit) => (
                        <li
                          className="flex gap-3 leading-6 text-copy-muted"
                          key={benefit}
                        >
                          <span aria-hidden="true" className="text-brand">
                            +
                          </span>
                          <span>{copy.benefits[benefit]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    aria-describedby="pricing-secure-checkout-note"
                    aria-label={`${copy.bookAction}: ${membership.name}, ${copy.durationLabels[membership.durationMonths]}`}
                    className={getButtonClassName({ stretch: true })}
                    href={membership.checkoutUrl}
                  >
                    <span>
                      {copy.bookAction}
                      <sup aria-hidden="true">*</sup>
                    </span>
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-line bg-panel p-8 sm:p-12">
            <p className="font-display text-3xl font-bold uppercase">
              {copy.unavailableHeading}
            </p>
            <p className="mt-4 max-w-copy leading-7 text-copy-muted">
              {copy.unavailableDescription}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
