import type { SiteEditorialContent } from "@/content/editorial";

import { siteConfig } from "./site";

function createPostalAddress(lines: readonly string[]) {
  const [streetAddress = "", cityLine = ""] = lines;
  const cityMatch = /^(\d{5})\s+(.+)$/u.exec(cityLine);

  return {
    "@type": "PostalAddress",
    streetAddress,
    ...(cityMatch
      ? {
          postalCode: cityMatch[1],
          addressLocality: cityMatch[2],
        }
      : { addressLocality: cityLine }),
    addressCountry: "DE",
  };
}

export function createSiteStructuredData(content: SiteEditorialContent) {
  const origin = siteConfig.url;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: siteConfig.shortName,
        alternateName: [siteConfig.name, "Kru Tiger Muay Thai"],
        publisher: { "@id": `${origin}/#business` },
      },
      {
        "@type": "SportsActivityLocation",
        "@id": `${origin}/#business`,
        name: content.gymName || siteConfig.name,
        alternateName: siteConfig.shortName,
        description: content.defaultSeo.description,
        url: `${origin}/`,
        logo: `${origin}/images/home/kru-tiger-logo.png`,
        image: `${origin}/images/home/main.png`,
        email: content.contact.email.displayValue,
        ...(content.contact.phone
          ? { telephone: content.contact.phone.displayValue }
          : {}),
        address: createPostalAddress(content.contact.address.lines),
        sameAs: [content.social.instagram.url],
      },
    ],
  };
}

export function serializeStructuredData(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}
