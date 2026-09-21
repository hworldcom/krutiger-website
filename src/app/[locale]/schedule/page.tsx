import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { SchedulePage } from "@/components/marketing/schedule-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";

const route = createLocalizedPlaceholderRoute("schedule");

export const generateMetadata = route.generateMetadata;

type ScheduleRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function ScheduleRoute({ params }: ScheduleRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <SchedulePage
      content={dictionary.routes.schedule}
      integration={dictionary.integrations.schedule}
      locale={locale}
    />
  );
}
