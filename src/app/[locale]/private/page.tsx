import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { PrivateTrainingPage } from "@/components/marketing/private-training-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const route = createLocalizedPlaceholderRoute("privateTraining");

export const generateMetadata = route.generateMetadata;

type PrivateTrainingRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function PrivateTrainingRoute({
  params,
}: PrivateTrainingRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <PrivateTrainingPage
      content={dictionary.routes.privateTraining}
      guide={dictionary.privateTrainingPage}
      integration={dictionary.integrations.privateTraining}
      locale={locale}
    />
  );
}
