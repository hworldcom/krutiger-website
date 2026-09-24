import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { TeamPage } from "@/components/marketing";
import { createTeamPageFallback } from "@/content/page-fallbacks";
import { getTeamMembers } from "@/content/team";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";
import { getCoachContent, getTeamPageContent } from "@/lib/sanity/content";
import {
  getDraftContentFallbackMessage,
  resolveContent,
} from "@/lib/sanity/resolve-content";

type TeamRouteProps = Readonly<{
  params: Promise<{
    locale: string;
  }>;
}>;

const teamRoute = getRouteById("coaches");

export async function generateMetadata({
  params,
}: TeamRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);
  const sanityContent = await getTeamPageContent(locale);
  const content =
    sanityContent.status === "ready"
      ? sanityContent.value.seo
      : createTeamPageFallback(dictionary).seo;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    teamRoute.path,
    content.shareImage,
  );
}

export default async function TeamRoute({ params }: TeamRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const [pageContent, coachContent] = await Promise.all([
    getTeamPageContent(locale),
    getCoachContent(locale),
  ]);
  const page = resolveContent(pageContent, createTeamPageFallback(dictionary));
  const members = resolveContent(coachContent, getTeamMembers(locale));
  const { isEnabled: isDraftPreview } = await draftMode();

  return (
    <TeamPage
      content={page.value}
      contentSource={
        page.source === "sanity" && members.source === "sanity"
          ? "sanity"
          : "fallback"
      }
      draftContentIssue={
        isDraftPreview
          ? getDraftContentFallbackMessage(
              page.fallbackReason ?? members.fallbackReason,
              dictionary.draftMode,
            )
          : undefined
      }
      labels={dictionary.teamPage}
      members={members.value}
    />
  );
}
