import type { Locale } from "../config";
import type { IntegrationArea, RouteId } from "../../lib/routes";

type PageCopy = Readonly<{
  navigationLabel: string;
  eyebrow: string;
  title: string;
  description: string;
}>;

type StateCopy = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

type IntegrationCopy = Readonly<{
  heading: string;
  description: string;
}>;

type WidgetIntegrationCopy = IntegrationCopy &
  Readonly<{
    loading: string;
    error: string;
  }>;

type PricingIntegrationCopy = WidgetIntegrationCopy &
  Readonly<{
    secureCheckoutNotice: string;
    termsLabel: string;
    durationSelectorLabel: string;
    durationLabels: Readonly<Record<12 | 6 | 3, string>>;
    membershipLabel: string;
    perMonth: string;
    billingDay: string;
    joiningFee: string;
    autoRenewal: string;
    monthlyAccess: string;
    unlimitedAccess: string;
    benefits: Readonly<{
      muayThai: string;
      openGym: string;
      yoga: string;
      strengthConditioning: string;
      mobility: string;
    }>;
    bookAction: string;
    unavailableHeading: string;
    unavailableDescription: string;
    monthlyPasses: Readonly<{
      heading: string;
      description: string;
      validityLabel: string;
      validity: string;
      passLabel: string;
      sessions: string;
      unlimitedSessions: string;
      buyAction: string;
    }>;
  }>;

type AboutChapterCopy = Readonly<{
  number: string;
  title: string;
  description: string;
  accent: string;
  imageAlt: string;
  secondaryImageAlt?: string;
}>;

type AboutValueCopy = Readonly<{
  title: string;
  description: string;
}>;

type HomeFeatureCopy = Readonly<{
  title: string;
  description: string;
}>;

export type HomePageCopy = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    titleLines: readonly [string, string, string];
    introduction: string;
    imageAlt: string;
    trialAction: string;
    scheduleAction: string;
  }>;
  schedule: Readonly<{
    title: string;
    action: string;
    loading: string;
    error: string;
    empty: string;
    nextLoading: string;
    nextUnavailable: string;
    allLevels: string;
    location: Readonly<{
      district: string;
      addressLineOne: string;
      addressLineTwo: string;
    }>;
  }>;
  values: Readonly<{
    eyebrow: string;
    titlePrimary: string;
    titleAccent: string;
    introduction: string;
    items: readonly [
      HomeFeatureCopy,
      HomeFeatureCopy,
      HomeFeatureCopy,
      HomeFeatureCopy,
    ];
  }>;
}>;

export type AboutPageCopy = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    titlePrimary: string;
    titleSecondary: string;
    introduction: string;
    imageAlt: string;
  }>;
  storyHeading: string;
  chapters: readonly [
    AboutChapterCopy,
    AboutChapterCopy,
    AboutChapterCopy,
    AboutChapterCopy,
  ];
  philosophy: Readonly<{
    number: string;
    title: string;
    values: readonly [
      AboutValueCopy,
      AboutValueCopy,
      AboutValueCopy,
      AboutValueCopy,
    ];
  }>;
}>;

export type TeamPageCopy = Readonly<{
  sectionHeading: string;
  specialtiesLabel: string;
  socialLinkAction: string;
  socialLinkLabel: string;
}>;

export type Dictionary = Readonly<{
  metadata: Readonly<{
    title: string;
    description: string;
  }>;
  locale: Readonly<{
    currentLanguage: string;
    currentLanguageLabel: string;
    navigationLabel: string;
    languageNames: Readonly<Record<Locale, string>>;
    switchTo: Readonly<Record<Locale, string>>;
  }>;
  shell: Readonly<{
    skipToContent: string;
    header: Readonly<{
      homeLinkLabel: string;
      primaryNavigationLabel: string;
      secondaryNavigationLabel: string;
      menuTitle: string;
      openMenu: string;
      closeMenu: string;
      currentPage: string;
      trialClassAction: string;
    }>;
    footer: Readonly<{
      brandStatement: string;
      primaryNavigationLabel: string;
      secondaryNavigationLabel: string;
      contactHeading: string;
      addressLabel: string;
      mapAction: string;
      emailLabel: string;
      phoneLabel: string;
      openingHoursLabel: string;
      socialHeading: string;
      instagramLinkLabel: string;
      legalNavigationLabel: string;
      placeholderDataLabel: string;
      placeholderDataDescription: string;
      rightsStatement: string;
    }>;
  }>;
  routes: Readonly<Record<RouteId, PageCopy>>;
  homePage: HomePageCopy;
  aboutPage: AboutPageCopy;
  teamPage: TeamPageCopy;
  integrations: Readonly<
    Record<IntegrationArea, IntegrationCopy> & {
      schedule: WidgetIntegrationCopy;
      memberArea: WidgetIntegrationCopy;
      pricing: PricingIntegrationCopy;
      shop: WidgetIntegrationCopy;
    }
  >;
  notFound: StateCopy &
    Readonly<{
      homeAction: string;
    }>;
  error: StateCopy &
    Readonly<{
      retryAction: string;
    }>;
  preview: Readonly<{
    eyebrow: string;
    heading: string;
    introduction: string;
    typographyAction: string;
    paletteAction: string;
    logoAlt: string;
    typography: Readonly<{
      displayLabel: string;
      displayDescription: string;
      bodyLabel: string;
      bodyDescription: string;
    }>;
    palette: Readonly<{
      label: string;
      heading: string;
      introduction: string;
      swatches: Readonly<{
        brand: string;
        signal: string;
        copy: string;
        warmCanvas: string;
      }>;
      darkSurfaceHeading: string;
      darkSurfaceDescription: string;
      lightSurfaceHeading: string;
      lightSurfaceDescription: string;
    }>;
  }>;
}>;
