export const developmentSiteUrl = "http://localhost:3000";
export const productionSiteUrl = "https://www.krutigermuaythai.de";

export function resolveSiteUrl(
  configuredUrl?: string,
  environment = process.env.NODE_ENV,
) {
  const candidate =
    configuredUrl?.trim() ||
    (environment === "production" ? productionSiteUrl : developmentSiteUrl);
  const url = new URL(candidate);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must use the http or https protocol.",
    );
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be an origin without a path, query, or hash.",
    );
  }

  // Preview and production aliases must never become the public canonical.
  // Vercel builds still receive NODE_ENV=production, even when their own
  // hostname is injected into NEXT_PUBLIC_SITE_URL.
  if (
    environment === "production" &&
    url.hostname.toLowerCase().endsWith(".vercel.app")
  ) {
    return productionSiteUrl;
  }

  return url.origin;
}

export const siteConfig = {
  name: "KRUTIGER Muay Thai Berlin",
  shortName: "KRUTIGER",
  thaiName: "ครูเสือ",
  description: "The new KRUTIGER Muay Thai website is in development.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
