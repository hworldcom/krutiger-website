import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { PricingPage } from "@/components/marketing/pricing-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  membershipDurations,
  membershipsByDuration,
} from "@/lib/bsport/memberships";
import { monthlyPasses } from "@/lib/bsport/passes";
import {
  getMembershipCardContent,
  getMonthlyPassCardContent,
} from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

const route = createLocalizedPlaceholderRoute("prices");

export const generateMetadata = route.generateMetadata;

type PricingRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function PricingRoute({ params }: PricingRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const [membershipContent, passContent] = await Promise.all([
    getMembershipCardContent(locale),
    getMonthlyPassCardContent(locale),
  ]);
  const memberships = resolveContent(
    membershipContent,
    membershipDurations.flatMap((duration) => membershipsByDuration[duration]),
  );
  const passes = resolveContent(passContent, monthlyPasses);
  const { isEnabled: isDraftPreview } = await draftMode();
  const fallbackReason = memberships.fallbackReason ?? passes.fallbackReason;

  return (
    <PricingPage
      content={dictionary.routes.prices}
      contentSource={
        memberships.source === "sanity" && passes.source === "sanity"
          ? "sanity"
          : "fallback"
      }
      draftContentIssue={
        isDraftPreview
          ? getDraftContentFallbackMessage(fallbackReason, dictionary.draftMode)
          : undefined
      }
      integration={dictionary.integrations.pricing}
      locale={locale}
      memberships={memberships.value}
      monthlyPasses={passes.value}
    />
  );
}
