import type { Locale } from "../i18n/config";
import { getLocalizedPath } from "../i18n/routing";

import { trialSessionPassCheckoutUrl } from "./bsport/passes";
import { getRouteById, type RouteId } from "./routes";

export type HeaderCtaDestination =
  | Readonly<{
      kind: "internal";
      routeId: RouteId;
    }>
  | Readonly<{
      kind: "external";
      href: string;
    }>;

export const headerNavigationConfig = {
  trialClassDestination: {
    kind: "external",
    href: trialSessionPassCheckoutUrl,
  },
} as const satisfies Readonly<{
  trialClassDestination: HeaderCtaDestination;
}>;

export function getHeaderCtaHref(
  locale: Locale,
  destination: HeaderCtaDestination = headerNavigationConfig.trialClassDestination,
): string {
  if (destination.kind === "external") {
    return destination.href;
  }

  return getLocalizedPath(locale, getRouteById(destination.routeId).path);
}

function normalizePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || "/";

  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

export function isNavigationPathActive(
  pathname: string,
  href: string,
  exact = false,
): boolean {
  const currentPath = normalizePath(pathname);
  const destinationPath = normalizePath(href);

  if (exact) {
    return currentPath === destinationPath;
  }

  return (
    currentPath === destinationPath ||
    (destinationPath !== "/" && currentPath.startsWith(`${destinationPath}/`))
  );
}
