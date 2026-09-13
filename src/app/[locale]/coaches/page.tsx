import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TeamPage } from "@/components/marketing";
import { getTeamMembers } from "@/content/team";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedPageMetadata } from "@/i18n/metadata";
import { getRouteById } from "@/lib/routes";

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
  const content = dictionary.routes.coaches;

  return createLocalizedPageMetadata(
    locale,
    content.title,
    content.description,
    teamRoute.path,
  );
}

export default async function TeamRoute({ params }: TeamRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <TeamPage
      content={dictionary.routes.coaches}
      labels={dictionary.teamPage}
      members={getTeamMembers(locale)}
    />
  );
}
