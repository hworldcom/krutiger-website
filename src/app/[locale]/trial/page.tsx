import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { TrialPage } from "@/components/marketing/trial-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const route = createLocalizedPlaceholderRoute("trialClass");

export const generateMetadata = route.generateMetadata;

type TrialRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function TrialRoute({ params }: TrialRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <TrialPage
      content={dictionary.routes.trialClass}
      details={dictionary.trialPage}
    />
  );
}
