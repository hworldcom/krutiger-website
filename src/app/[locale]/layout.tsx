import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/layout/site-shell";
import { PreviewBanner } from "@/components/preview/preview-banner";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { createLocalizedMetadata } from "@/i18n/metadata";
import { getLocalizedPath } from "@/i18n/routing";
import { bodyFont, headingFont, thaiFont } from "@/styles/fonts";

import "../globals.css";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#080808",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale);

  return createLocalizedMetadata(locale, dictionary);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const activeLocale = isLocale(locale) ? locale : defaultLocale;
  const dictionary = await getDictionary(activeLocale);
  const { isEnabled: isDraftPreview } = await draftMode();

  return (
    <html
      data-scroll-behavior="smooth"
      lang={activeLocale}
      className={`${bodyFont.variable} ${headingFont.variable} ${thaiFont.variable}`}
    >
      <body>
        <SiteShell dictionary={dictionary} locale={activeLocale}>
          {children}
        </SiteShell>
        {isDraftPreview ? (
          <>
            <PreviewBanner
              fallbackDestination={getLocalizedPath(activeLocale)}
              labels={dictionary.draftMode}
            />
            <VisualEditing />
          </>
        ) : null}
      </body>
    </html>
  );
}
