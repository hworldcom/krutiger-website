import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import type { LegalPageEditorialContent } from "@/content/editorial";
import { createLegalPageFallback } from "@/content/page-fallbacks";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";
import type { SanityContentResult } from "@/lib/sanity/result";

import { LegalPage } from "./legal-page";

type LegalRouteId = "imprint" | "privacy";

type LocalizedLegalPageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

type LegalContentFetcher = (
  locale: Locale,
) => Promise<SanityContentResult<LegalPageEditorialContent>>;

export function createLocalizedLegalRoute(
  routeId: LegalRouteId,
  getContent: LegalContentFetcher,
) {
  const route = getRouteById(routeId);

  async function generateMetadata({
    params,
  }: LocalizedLegalPageProps): Promise<Metadata> {
    const { locale } = await params;

    if (!isLocale(locale)) {
      return {};
    }

    const dictionary = await getDictionary(locale);
    const sanityContent = await getContent(locale);
    const content = resolveContent(
      sanityContent,
      createLegalPageFallback(dictionary, routeId),
    ).value;

    return createLocalizedPageMetadata(
      locale,
      content.seo.title,
      content.seo.description,
      route.path,
      content.seo.shareImage,
    );
  }

  async function Page({ params }: LocalizedLegalPageProps) {
    const { locale } = await params;

    if (!isLocale(locale)) {
      notFound();
    }

    const dictionary = await getDictionary(locale);
    const content = resolveContent(
      await getContent(locale),
      createLegalPageFallback(dictionary, routeId),
    );
    const { isEnabled: isDraftPreview } = await draftMode();

    return (
      <LegalPage
        content={content.value}
        contentSource={content.source}
        draftContentIssue={
          isDraftPreview
            ? getDraftContentFallbackMessage(
                content.fallbackReason,
                dictionary.draftMode,
              )
            : undefined
        }
      />
    );
  }

  return { generateMetadata, Page };
}
