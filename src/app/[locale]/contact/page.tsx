import { notFound } from "next/navigation";

import { createLocalizedPlaceholderRoute } from "@/components/marketing/localized-placeholder-route";
import { ContactPage } from "@/components/marketing/contact-page";
import { createSiteSettingsFallback } from "@/content/page-fallbacks";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSiteSettingsContent } from "@/lib/sanity/content";
import { resolveContent } from "@/lib/sanity/resolve-content";

const route = createLocalizedPlaceholderRoute("contact");

export const generateMetadata = route.generateMetadata;

type ContactRouteProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function ContactRoute({ params }: ContactRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const siteSettings = resolveContent(
    await getSiteSettingsContent(locale),
    createSiteSettingsFallback(dictionary, locale),
  );

  return (
    <ContactPage
      content={dictionary.routes.contact}
      details={dictionary.contactPage}
      locale={locale}
      siteContent={siteSettings.value}
    />
  );
}
