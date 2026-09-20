import { getButtonClassName } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import {
  monthlyPassValidityMonths,
  type MonthlyPass,
} from "@/lib/bsport/passes";

type MonthlyPassPricingProps = Readonly<{
  copy: Dictionary["integrations"]["pricing"]["monthlyPasses"];
  locale: Locale;
  passes: readonly MonthlyPass[];
}>;

export function MonthlyPassPricing({
  copy,
  locale,
  passes,
}: MonthlyPassPricingProps) {
  const currencyFormatter = new Intl.NumberFormat(locale, {
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
  });

  return (
    <section
      aria-labelledby="monthly-pass-pricing-heading"
      className="mt-20"
      data-monthly-pass-pricing
    >
      <div className="max-w-copy">
        <div aria-hidden="true" className="h-1 w-12 bg-brand" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="monthly-pass-pricing-heading"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">{copy.description}</p>
      </div>

      <div className="mt-6 border-l-2 border-brand bg-panel/70 p-5">
        <p className="font-display text-sm font-bold tracking-[0.14em] text-brand uppercase">
          {copy.validityLabel}
        </p>
        <p className="mt-2 text-sm leading-6 text-copy-muted">
          {copy.validity.replace("{count}", String(monthlyPassValidityMonths))}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {passes.map((pass) => {
          const sessions =
            pass.sessions === "unlimited"
              ? copy.unlimitedSessions
              : copy.sessions.replace("{count}", String(pass.sessions));

          return (
            <article
              className="relative flex min-h-80 flex-col overflow-hidden border border-line bg-panel p-6 transition-colors hover:border-brand sm:p-8"
              key={pass.id}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-brand"
              />
              <p className="font-display text-sm font-bold tracking-[0.2em] text-brand uppercase">
                {copy.passLabel}
              </p>
              <h3 className="mt-2 font-display text-4xl font-extrabold uppercase sm:text-5xl">
                {pass.name}
              </h3>

              <div className="mt-8 border-y border-line py-7">
                <p className="font-display text-6xl leading-none font-extrabold text-copy">
                  {currencyFormatter.format(pass.price)}
                </p>
                <p className="mt-5 font-display text-xl font-bold tracking-wide text-copy uppercase">
                  {sessions}
                </p>
              </div>

              <a
                aria-describedby="pricing-secure-checkout-note"
                aria-label={`${copy.buyAction}: ${pass.name}, ${sessions}`}
                className={`${getButtonClassName({ stretch: true })} mt-auto`}
                href={pass.checkoutUrl}
              >
                <span>
                  {copy.buyAction}
                  <sup aria-hidden="true">*</sup>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
