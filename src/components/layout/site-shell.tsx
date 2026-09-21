import type { ReactNode } from "react";

import { BsportNavigationBoundary } from "@/components/bsport/bsport-navigation-boundary";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { siteRoutes, type RouteId } from "@/lib/routes";

import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type SiteShellProps = Readonly<{
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}>;

export function SiteShell({ children, dictionary, locale }: SiteShellProps) {
  const routeLabels = Object.fromEntries(
    siteRoutes.map((route) => [
      route.id,
      dictionary.routes[route.id].navigationLabel,
    ]),
  ) as Record<RouteId, string>;

  return (
    <BsportNavigationBoundary>
      <a
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-control bg-brand px-4 py-3 font-bold text-brand-ink transition-transform focus:translate-y-0"
        href="#main-content"
      >
        {dictionary.shell.skipToContent}
      </a>
      <SiteHeader
        headerLabels={dictionary.shell.header}
        locale={locale}
        localeLabels={dictionary.locale}
        routeLabels={routeLabels}
      />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter
        homeLinkLabel={dictionary.shell.header.homeLinkLabel}
        labels={dictionary.shell.footer}
        locale={locale}
        routeLabels={routeLabels}
      />
    </BsportNavigationBoundary>
  );
}
