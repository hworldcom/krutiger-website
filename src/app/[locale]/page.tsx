import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/marketing/home-page";
import { createHomepageFallback } from "@/content/page-fallbacks";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import { getHomepageContent } from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

const homeRoute = getRouteById("home");

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getHomepageContent(locale);
  const content =
    sanityContent.status === "ready"
      ? sanityContent.value.seo
      : createHomepageFallback(dictionary).seo;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    homeRoute.path,
    content.shareImage,
  );
}

export default async function Home({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getHomepageContent(locale);
  const content = resolveContent(
    sanityContent,
    createHomepageFallback(dictionary),
  );
  const { isEnabled: isDraftPreview } = await draftMode();

  return (
    <HomePage
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
      locale={locale}
      schedule={dictionary.homePage.schedule}
    />
  );
}
