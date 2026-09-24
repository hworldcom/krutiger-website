import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { PricingPage } from "@/components/marketing/pricing-page";
import { createPricingPageFallback } from "@/content/page-fallbacks";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import {
  membershipDurations,
  membershipsByDuration,
} from "@/lib/bsport/memberships";
import { monthlyPasses } from "@/lib/bsport/passes";
import {
  getMembershipCardContent,
  getMonthlyPassCardContent,
  getPricingPageContent,
} from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type PricingRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PricingRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getPricingPageContent(locale);
  const content =
    sanityContent.status === "ready"
      ? sanityContent.value.seo
      : createPricingPageFallback(dictionary).seo;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    "/prices",
    content.shareImage,
  );
}

export default async function PricingRoute({ params }: PricingRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const [pageContent, membershipContent, passContent] = await Promise.all([
    getPricingPageContent(locale),
    getMembershipCardContent(locale),
    getMonthlyPassCardContent(locale),
  ]);
  const page = resolveContent(
    pageContent,
    createPricingPageFallback(dictionary),
  );
  const memberships = resolveContent(
    membershipContent,
    membershipDurations.flatMap((duration) => membershipsByDuration[duration]),
  );
  const passes = resolveContent(passContent, monthlyPasses);
  const { isEnabled: isDraftPreview } = await draftMode();
  const fallbackReason =
    page.fallbackReason ?? memberships.fallbackReason ?? passes.fallbackReason;

  return (
    <PricingPage
      content={page.value}
      contentSource={
        page.source === "sanity" &&
        memberships.source === "sanity" &&
        passes.source === "sanity"
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
