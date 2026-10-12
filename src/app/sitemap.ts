import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { getLanguageAlternates, getLocalizedPath } from "@/i18n/routing";
import { siteRoutes } from "@/lib/routes";
import { siteConfig } from "@/lib/site";

function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.flatMap((route) => {
    const languages = Object.fromEntries(
      Object.entries(getLanguageAlternates(route.path)).map(
        ([language, path]) => [language, absoluteUrl(path)],
      ),
    );

    return locales.map((locale) => ({
      url: absoluteUrl(getLocalizedPath(locale, route.path)),
      alternates: { languages },
    }));
  });
}
