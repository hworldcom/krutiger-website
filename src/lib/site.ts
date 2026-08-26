export const developmentSiteUrl = "http://localhost:3000";

export function resolveSiteUrl(configuredUrl?: string) {
  const candidate = configuredUrl?.trim() || developmentSiteUrl;
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

  return url.origin;
}

export const siteConfig = {
  name: "KRUTIGER Muay Thai Berlin",
  shortName: "KRUTIGER",
  thaiName: "ครูเสือ",
  description: "The new KRUTIGER Muay Thai website is in development.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
} as const;
