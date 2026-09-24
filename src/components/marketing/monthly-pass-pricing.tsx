import { getButtonClassName } from "@/components/ui";
import type { PricingPageEditorialContent } from "@/content/editorial";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { MonthlyPass } from "@/lib/bsport/passes";

type MonthlyPassPricingProps = Readonly<{
  copy: Dictionary["integrations"]["pricing"]["monthlyPasses"];
  editorial: PricingPageEditorialContent["passes"];
  locale: Locale;
  passes: readonly MonthlyPass[];
}>;

export function MonthlyPassPricing({
  copy,
  editorial,
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
      className="mt-12"
      data-monthly-pass-pricing
    >
      <div className="max-w-copy">
        <div aria-hidden="true" className="h-1 w-12 bg-brand" />
        <h2
          className="mt-6 font-display text-3xl font-bold uppercase sm:text-4xl"
          id="monthly-pass-pricing-heading"
        >
          {editorial.heading}
        </h2>
        <p className="mt-4 leading-7 text-copy-muted">
          {editorial.introduction}
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {passes.map((pass) => {
          const sessions =
            pass.sessions === "unlimited"
              ? copy.unlimitedSessions
              : pass.sessions === 1
                ? copy.singleSession
                : copy.sessions.replace("{count}", String(pass.sessions));
          const validity = (
            pass.validityMonths === 1 ? copy.validityOne : copy.validityMany
          ).replace("{count}", String(pass.validityMonths));

          return (
            <article
              className="relative flex min-h-80 flex-col overflow-hidden border border-line bg-panel p-4 transition-colors hover:border-brand xs:p-6 sm:p-8"
              key={pass.id}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-brand"
              />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-brand uppercase">
                    {copy.passLabel}
                  </p>
                  <h3 className="mt-2 break-words font-display text-3xl font-extrabold uppercase xs:text-4xl sm:text-5xl">
                    {pass.name}
                  </h3>
                </div>
                <p className="shrink-0 border border-line px-3 py-2 font-display text-sm font-bold tracking-wide text-copy-muted uppercase">
                  <span className="sr-only">{copy.validityLabel}: </span>
                  {validity}
                </p>
              </div>

              <div className="mt-8 border-b border-line pb-7">
                <p className="break-words font-display text-5xl leading-none font-extrabold text-copy xs:text-6xl">
                  {currencyFormatter.format(pass.price)}
                </p>
                <p className="mt-4 break-words font-display text-xl font-bold tracking-wide text-copy uppercase">
                  {sessions}
                </p>
              </div>

              <a
                aria-describedby="pricing-secure-checkout-note"
                aria-label={`${copy.buyAction}: ${pass.name}, ${sessions}`}
                className={`${getButtonClassName({ stretch: true })} mt-auto`}
                href={pass.checkoutUrl}
              >
                <span className="min-w-0 break-words">
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
