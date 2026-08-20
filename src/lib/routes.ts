export const routeIds = [
  "home",
  "training",
  "schedule",
  "prices",
  "coaches",
  "about",
  "faq",
  "contact",
  "giftCards",
  "imprint",
  "privacy",
] as const;

export type RouteId = (typeof routeIds)[number];
export type NavigationGroup = "primary" | "secondary" | "legal";
export type IntegrationArea = "schedule" | "pricing" | "giftCards";

export type SiteRoute = Readonly<{
  id: RouteId;
  path: `/${string}` | "/";
  navigation: NavigationGroup | null;
  showInFooter: boolean;
  integration?: IntegrationArea;
}>;

export const siteRoutes = [
  {
    id: "home",
    path: "/",
    navigation: "primary",
    showInFooter: false,
  },
  {
    id: "training",
    path: "/training",
    navigation: "primary",
    showInFooter: true,
  },
  {
    id: "schedule",
    path: "/schedule",
    navigation: "primary",
    showInFooter: true,
    integration: "schedule",
  },
  {
    id: "prices",
    path: "/prices",
    navigation: "primary",
    showInFooter: true,
    integration: "pricing",
  },
  {
    id: "coaches",
    path: "/coaches",
    navigation: "primary",
    showInFooter: true,
  },
  {
    id: "about",
    path: "/about",
    navigation: "primary",
    showInFooter: true,
  },
  {
    id: "faq",
    path: "/faq",
    navigation: "secondary",
    showInFooter: true,
  },
  {
    id: "contact",
    path: "/contact",
    navigation: "secondary",
    showInFooter: true,
  },
  {
    id: "giftCards",
    path: "/gift-cards",
    navigation: "secondary",
    showInFooter: true,
    integration: "giftCards",
  },
  {
    id: "imprint",
    path: "/impressum",
    navigation: "legal",
    showInFooter: true,
  },
  {
    id: "privacy",
    path: "/datenschutz",
    navigation: "legal",
    showInFooter: true,
  },
] as const satisfies readonly SiteRoute[];

export const primaryNavigationRoutes = siteRoutes.filter(
  (route) => route.navigation === "primary",
);

export const secondaryNavigationRoutes = siteRoutes.filter(
  (route) => route.navigation === "secondary",
);

export const legalNavigationRoutes = siteRoutes.filter(
  (route) => route.navigation === "legal",
);

export const footerRoutes = siteRoutes.filter((route) => route.showInFooter);

export const contentRoutes = siteRoutes.filter((route) => route.path !== "/");

export function getRouteBySegments(
  segments: readonly string[],
): SiteRoute | undefined {
  const path = `/${segments.join("/")}`;

  return siteRoutes.find((route) => route.path === path);
}

export function getRouteById(routeId: RouteId): SiteRoute {
  const route = siteRoutes.find((candidate) => candidate.id === routeId);

  if (!route) {
    throw new Error(`Unknown route id: ${routeId}`);
  }

  return route;
}
