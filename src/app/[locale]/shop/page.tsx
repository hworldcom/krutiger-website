import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { ShopPage } from "@/components/marketing/shop-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const route = createLocalizedPlaceholderRoute("shop");

export const generateMetadata = route.generateMetadata;

type ShopRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function ShopRoute({ params }: ShopRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <ShopPage
      content={dictionary.routes.shop}
      giftCards={dictionary.integrations.giftCards}
      integration={dictionary.integrations.shop}
    />
  );
}
