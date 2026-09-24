import { defineQuery } from "next-sanity";

/**
 * Query results deliberately keep localized values intact. Selecting the
 * requested language is the adapter's responsibility, which makes missing
 * translations observable instead of silently falling back to German.
 */
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"] | order(_updatedAt desc)[0] {
    _id,
    gymName,
    footerStatement,
    contactStatus,
    address,
    email,
    telephone,
    openingHours,
    instagramUrl,
    instagramHandle,
    defaultSeo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    }
  }
`);

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"] | order(_updatedAt desc)[0] {
    _id,
    heroEyebrow,
    heroTitleLines,
    heroIntroduction,
    heroImage {
      asset,
      crop,
      hotspot,
      decorative,
      alternativeText,
      caption
    },
    trialActionLabel,
    scheduleActionLabel,
    valuesEyebrow,
    valuesTitle,
    valuesTitleAccent,
    valuesIntroduction,
    features[] {
      internalKey,
      title,
      description
    },
    seo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    }
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"] | order(_updatedAt desc)[0] {
    _id,
    heroEyebrow,
    heroTitlePrimary,
    heroTitleSecondary,
    heroIntroduction,
    heroImage {
      asset,
      crop,
      hotspot,
      decorative,
      alternativeText,
      caption
    },
    storyHeading,
    chapters[] {
      internalKey,
      title,
      description,
      accent,
      primaryImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      },
      secondaryImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    },
    philosophyTitle,
    philosophyValues[] {
      internalKey,
      title,
      description
    },
    seo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    }
  }
`);

export const TRAINING_CLASSES_QUERY = defineQuery(`
  *[_type == "classType" && active == true]
    | order(order asc, name.de asc, internalKey.current asc) {
      _id,
      "internalKey": internalKey.current,
      name,
      summary,
      description,
      level,
      durationMinutes,
      audience,
      image {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      },
      ctaLabel,
      order
    }
`);

export const COACHES_QUERY = defineQuery(`
  *[_type == "coach" && active == true]
    | order(order asc, name asc, internalKey.current asc) {
      _id,
      "internalKey": internalKey.current,
      name,
      role,
      photo {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      },
      biography,
      socialUrl,
      order
    }
`);

export const FAQS_QUERY = defineQuery(`
  *[_type == "faq" && active == true]
    | order(order asc, question.de asc, internalKey.current asc) {
      _id,
      "internalKey": internalKey.current,
      question,
      answer,
      category,
      order
    }
`);

export const MEMBERSHIP_CARDS_QUERY = defineQuery(`
  *[_type == "membershipCard" && active == true]
    | order(audience asc, durationMonths desc, order asc, name.de asc, internalKey.current asc) {
      _id,
      "internalKey": internalKey.current,
      name,
      audience,
      monthlyPriceCents,
      durationMonths,
      accessType,
      monthlySessions,
      benefits,
      checkoutUrl,
      verifiedAt,
      order
    }
`);

export const MONTHLY_PASS_CARDS_QUERY = defineQuery(`
  *[_type == "monthlyPassCard" && active == true]
    | order(order asc, name.de asc, internalKey.current asc) {
      _id,
      "internalKey": internalKey.current,
      name,
      priceCents,
      validityMonths,
      accessType,
      sessions,
      checkoutUrl,
      verifiedAt,
      order
    }
`);

export const SEO_CONTENT_QUERY = defineQuery(`
  {
    "default": *[_type == "siteSettings"] | order(_updatedAt desc)[0].defaultSeo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    },
    "homepage": *[_type == "homepage"] | order(_updatedAt desc)[0].seo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    },
    "about": *[_type == "aboutPage"] | order(_updatedAt desc)[0].seo {
      title,
      description,
      shareImage {
        asset,
        crop,
        hotspot,
        decorative,
        alternativeText,
        caption
      }
    }
  }
`);
