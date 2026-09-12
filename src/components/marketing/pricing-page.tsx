import { Container, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

import { MembershipPricing } from "./membership-pricing";
import { MonthlyPassPricing } from "./monthly-pass-pricing";

type PricingPageProps = Readonly<{
  content: Dictionary["routes"]["prices"];
  integration: Dictionary["integrations"]["pricing"];
  locale: Locale;
}>;

export function PricingPage({
  content,
  integration,
  locale,
}: PricingPageProps) {
  return (
    <section className="min-h-screen py-section">
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          level={1}
          size="page"
          title={content.title}
        />
        <MembershipPricing copy={integration} locale={locale} />
        <MonthlyPassPricing copy={integration.monthlyPasses} locale={locale} />
        <p
          className="mt-10 border-t border-line pt-5 text-sm leading-6 text-copy-muted"
          id="pricing-secure-checkout-note"
        >
          <span aria-hidden="true">*</span>
          {integration.secureCheckoutNotice}
        </p>
      </Container>
    </section>
  );
}
