import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutPage } from "@/components/marketing/about-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";

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
  const content = dictionary.routes.about;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    aboutRoute.path,
  );
}

export default async function AboutRoute({ params }: AboutRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return <AboutPage content={dictionary.aboutPage} />;
}
