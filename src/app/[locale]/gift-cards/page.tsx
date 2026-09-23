import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { GiftCardsPage } from "@/components/marketing/gift-cards-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const route = createLocalizedPlaceholderRoute("giftCards");

export const generateMetadata = route.generateMetadata;

type GiftCardsRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function GiftCardsRoute({ params }: GiftCardsRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <GiftCardsPage
      content={dictionary.routes.giftCards}
      integration={dictionary.integrations.giftCards}
      locale={locale}
    />
  );
}
