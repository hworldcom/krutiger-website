import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { MemberAreaPage } from "@/components/marketing/member-area-page";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const route = createLocalizedPlaceholderRoute("memberArea");

export const generateMetadata = route.generateMetadata;

type MemberAreaRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function MemberAreaRoute({
  params,
}: MemberAreaRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <MemberAreaPage
      content={dictionary.routes.memberArea}
      integration={dictionary.integrations.memberArea}
    />
  );
}
