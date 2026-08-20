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
  integrations: Readonly<
    Record<
      IntegrationArea,
      Readonly<{
        heading: string;
        description: string;
      }>
    >
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
