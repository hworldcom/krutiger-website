import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { AboutPage } from "@/components/marketing/about-page";
import { createAboutPageFallback } from "@/content/page-fallbacks";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import { getAboutPageContent } from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type AboutRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const aboutRoute = getRouteById("about");

export async function generateMetadata({
  params,
}: AboutRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getAboutPageContent(locale);
  const content =
    sanityContent.status === "ready"
      ? sanityContent.value.seo
      : createAboutPageFallback(dictionary).seo;
  const shareImage =
    sanityContent.status === "ready" ? content.shareImage : undefined;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    aboutRoute.path,
    shareImage,
  );
}

export default async function AboutRoute({ params }: AboutRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getAboutPageContent(locale);
  const content = resolveContent(
    sanityContent,
    createAboutPageFallback(dictionary),
  );
  const { isEnabled: isDraftPreview } = await draftMode();

  return (
    <AboutPage
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
