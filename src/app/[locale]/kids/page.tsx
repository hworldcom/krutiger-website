import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { KidsPage } from "@/components/marketing";
import { createKidsPageFallback } from "@/content/page-fallbacks";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import { getKidsPageContent } from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type KidsRouteProps = Readonly<{ params: Promise<{ locale: string }> }>;
const kidsRoute = getRouteById("kids");

export async function generateMetadata({
  params,
}: KidsRouteProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dictionary = await getDictionary(locale);
  const page = resolveContent(
    await getKidsPageContent(locale),
    createKidsPageFallback(dictionary),
  );
  return createLocalizedPageMetadata(
    locale,
    page.value.seo.title,
    page.value.seo.description,
    kidsRoute.path,
    page.value.seo.shareImage,
  );
}

export default async function KidsRoute({ params }: KidsRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);
  const [content, { isEnabled: isDraftPreview }] = await Promise.all([
    getKidsPageContent(locale),
    draftMode(),
  ]);
  const page = resolveContent(content, createKidsPageFallback(dictionary));
  return (
    <KidsPage
      content={page.value}
      contentSource={page.source}
      locale={locale}
      draftContentIssue={
        isDraftPreview
          ? getDraftContentFallbackMessage(
              page.fallbackReason,
              dictionary.draftMode,
            )
          : undefined
      }
    />
  );
}
