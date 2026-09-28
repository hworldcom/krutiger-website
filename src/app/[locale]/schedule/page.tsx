import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { SchedulePage } from "@/components/marketing/schedule-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSchedulePageContent } from "@/lib/sanity/content";
import { getDraftContentFallbackMessage } from "@/lib/sanity/resolve-content";
import { draftMode } from "next/headers";
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
  const scheduleContent = await getSchedulePageContent(locale);
  const { isEnabled: isDraftPreview } = await draftMode();

  return (
    <SchedulePage
      content={dictionary.routes.schedule}
      draftContentIssue={
        isDraftPreview && scheduleContent.status !== "ready"
          ? getDraftContentFallbackMessage(
              scheduleContent.status,
              dictionary.draftMode,
            )
          : undefined
      }
      integration={dictionary.integrations.schedule}
      locale={locale}
      timetableImage={
        scheduleContent.status === "ready"
          ? scheduleContent.value.timetableImage
          : undefined
      }
    />
  );
}
