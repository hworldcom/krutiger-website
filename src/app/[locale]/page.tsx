import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "@/components/marketing/home-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";

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
  const content = dictionary.routes.home;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    homeRoute.path,
  );
}

export default async function Home({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <HomePage content={dictionary.homePage} locale={locale} />;
}
