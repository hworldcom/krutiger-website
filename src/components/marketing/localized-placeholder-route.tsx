import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById, type RouteId } from "@/lib/routes";

import { PlaceholderPage } from "./placeholder-page";

type PlaceholderRouteId = Exclude<RouteId, "home">;

type LocalizedPlaceholderPageProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

export function createLocalizedPlaceholderRoute(routeId: PlaceholderRouteId) {
  const route = getRouteById(routeId);

  async function generateMetadata({
    params,
  }: LocalizedPlaceholderPageProps): Promise<Metadata> {
    const { locale } = await params;

    if (!isLocale(locale)) {
      return {};
    }

    const dictionary = await getDictionary(locale);
    const content = dictionary.routes[route.id];

    return createLocalizedPageMetadata(
      locale,
      content.title,
      content.description,
      route.path,
    );
  }

  async function Page({ params }: LocalizedPlaceholderPageProps) {
    const { locale } = await params;

    if (!isLocale(locale)) {
      notFound();
    }

    const dictionary = await getDictionary(locale);
    const content = dictionary.routes[route.id];
    const integration = route.integration
      ? {
          area: route.integration,
          ...dictionary.integrations[route.integration],
        }
      : undefined;

    return <PlaceholderPage {...content} integration={integration} />;
  }

  return { generateMetadata, Page };
}
