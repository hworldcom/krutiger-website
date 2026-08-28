import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { PricingPage } from "@/components/marketing/pricing-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

const route = createLocalizedPlaceholderRoute("prices");

export const generateMetadata = route.generateMetadata;

type PricingRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function PricingRoute({ params }: PricingRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <PricingPage
      content={dictionary.routes.prices}
      integration={dictionary.integrations.pricing}
    />
  );
}
