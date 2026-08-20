const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "KRUTIGER Muay Thai Berlin",
  shortName: "KRUTIGER",
  thaiName: "ครูเสือ",
  description: "The new KRUTIGER Muay Thai website is in development.",
  url: configuredSiteUrl || "http://localhost:3000",
} as const;
