import { Container, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import type { MembershipPlan } from "@/lib/bsport/memberships";
import type { MonthlyPass } from "@/lib/bsport/passes";

import { PricingOfferTabs } from "./pricing-offer-tabs";

type PricingPageProps = Readonly<{
  content: Dictionary["routes"]["prices"];
  contentSource: "sanity" | "fallback";
  draftContentIssue?: string;
  integration: Dictionary["integrations"]["pricing"];
  locale: Locale;
  memberships: readonly MembershipPlan[];
  monthlyPasses: readonly MonthlyPass[];
}>;

export function PricingPage({
  content,
  contentSource,
  draftContentIssue,
  integration,
  locale,
  memberships,
  monthlyPasses,
}: PricingPageProps) {
  return (
    <section
      className="min-h-screen py-section"
      data-content-source={contentSource}
    >
      <Container>
        <SectionHeader
          description={content.description}
          eyebrow={content.eyebrow}
          level={1}
          size="page"
          title={content.title}
        />
        {draftContentIssue ? (
          <p
            className="mt-8 border border-brand bg-brand/10 px-5 py-4 text-sm leading-6 text-copy sm:text-base"
            data-draft-content-issue
            role="alert"
          >
            {draftContentIssue}
          </p>
        ) : null}
        <PricingOfferTabs
          copy={integration}
          locale={locale}
          passes={monthlyPasses}
          memberships={memberships}
        />
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
