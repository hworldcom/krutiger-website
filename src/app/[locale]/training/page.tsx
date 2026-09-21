import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { TrainingPage } from "@/components/marketing";
import { getTrainingClasses } from "@/content/training";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import { getTrainingClassContent } from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type TrainingRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const trainingRoute = getRouteById("training");

export async function generateMetadata({
  params,
}: TrainingRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const content = dictionary.routes.training;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    trainingRoute.path,
  );
}

export default async function TrainingRoute({ params }: TrainingRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const classContent = await getTrainingClassContent(locale);
  const { isEnabled: isDraftPreview } = await draftMode();
  const trainingClasses = resolveContent(
    classContent,
    getTrainingClasses(locale),
  );

  return (
    <TrainingPage
      content={dictionary.routes.training}
      contentSource={trainingClasses.source}
      draftContentIssue={
        isDraftPreview
          ? getDraftContentFallbackMessage(
              trainingClasses.fallbackReason,
              dictionary.draftMode,
            )
          : undefined
      }
      labels={dictionary.trainingPage}
      locale={locale}
      trainingClasses={trainingClasses.value}
    />
  );
}
