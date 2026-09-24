import type {
  AboutChapterKey,
  AboutEditorialContent,
  HomepageEditorialContent,
  HomepageFeatureKey,
  PhilosophyValueKey,
  PricingPageEditorialContent,
  TeamPageEditorialContent,
  TrainingPageEditorialContent,
} from "@/content/editorial";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { membershipTerms } from "@/lib/bsport/memberships";

const homepageFeatureKeys: readonly HomepageFeatureKey[] = [
  "authenticity",
  "allLevels",
  "community",
  "experiencedCoaches",
];
const aboutChapterKeys: readonly AboutChapterKey[] = [
  "kruTiger",
  "rootsThailand",
  "ringExperience",
  "thailandToBerlin",
];
const philosophyValueKeys: readonly PhilosophyValueKey[] = [
  "technique",
  "discipline",
  "respect",
  "community",
];
const aboutChapterImages = [
  "/images/about/second.png",
  "/images/about/third.jpg",
  "/images/about/fourth.jpg",
  "/images/about/fifth.jpg",
] as const;

export function createHomepageFallback(
  dictionary: Dictionary,
): HomepageEditorialContent {
  const { homePage } = dictionary;

  return {
    hero: {
      eyebrow: homePage.hero.eyebrow,
      titleLines: homePage.hero.titleLines,
      introduction: homePage.hero.introduction,
      image: {
        src: "/images/home/main.png",
        alternativeText: homePage.hero.imageAlt,
      },
      trialActionLabel: homePage.hero.trialAction,
      scheduleActionLabel: homePage.hero.scheduleAction,
    },
    values: {
      eyebrow: homePage.values.eyebrow,
      title: homePage.values.titlePrimary,
      titleAccent: homePage.values.titleAccent,
      introduction: homePage.values.introduction,
      features: homePage.values.items.map((feature, index) => ({
        internalKey: homepageFeatureKeys[index],
        ...feature,
      })),
    },
    seo: {
      title: dictionary.routes.home.title,
      description: dictionary.routes.home.description,
      shareImage: {
        src: "/images/home/main.png",
        alternativeText: homePage.hero.imageAlt,
      },
    },
  };
}

export function createAboutPageFallback(
  dictionary: Dictionary,
): AboutEditorialContent {
  const { aboutPage } = dictionary;

  return {
    hero: {
      eyebrow: aboutPage.hero.eyebrow,
      titlePrimary: aboutPage.hero.titlePrimary,
      titleSecondary: aboutPage.hero.titleSecondary,
      introduction: aboutPage.hero.introduction,
      image: {
        src: "/images/about/main.png",
        alternativeText: aboutPage.hero.imageAlt,
      },
    },
    storyHeading: aboutPage.storyHeading,
    chapters: aboutPage.chapters.map((chapter, index) => ({
      internalKey: aboutChapterKeys[index],
      title: chapter.title,
      description: chapter.description,
      accent: chapter.accent,
      primaryImage: {
        src: aboutChapterImages[index],
        alternativeText: chapter.imageAlt,
      },
      ...(chapter.secondaryImageAlt
        ? {
            secondaryImage: {
              src: "/images/about/six.jpg",
              alternativeText: chapter.secondaryImageAlt,
            },
          }
        : {}),
    })),
    philosophy: {
      title: aboutPage.philosophy.title,
      values: aboutPage.philosophy.values.map((value, index) => ({
        internalKey: philosophyValueKeys[index],
        ...value,
      })),
    },
    seo: {
      title: dictionary.routes.about.title,
      description: dictionary.routes.about.description,
      shareImage: {
        src: "/images/about/main.png",
        alternativeText: aboutPage.hero.imageAlt,
      },
    },
  };
}

function createPageSeo(
  dictionary: Dictionary,
  route: "training" | "coaches" | "prices",
) {
  return {
    title: dictionary.routes[route].title,
    description: dictionary.routes[route].description,
    shareImage: {
      src: "/images/home/main.png",
      alternativeText: dictionary.homePage.hero.imageAlt,
    },
  };
}

export function createTrainingPageFallback(
  dictionary: Dictionary,
): TrainingPageEditorialContent {
  const route = dictionary.routes.training;
  const page = dictionary.trainingPage;

  return {
    hero: route,
    classes: {
      heading: page.sectionHeading,
      introduction: page.sectionIntroduction,
      scheduleNotice: page.scheduleNotice,
    },
    seo: createPageSeo(dictionary, "training"),
  };
}

export function createTeamPageFallback(
  dictionary: Dictionary,
): TeamPageEditorialContent {
  const route = dictionary.routes.coaches;

  return {
    hero: route,
    team: {
      heading: dictionary.teamPage.sectionHeading,
    },
    seo: createPageSeo(dictionary, "coaches"),
  };
}

export function createPricingPageFallback(
  dictionary: Dictionary,
): PricingPageEditorialContent {
  const route = dictionary.routes.prices;
  const pricing = dictionary.integrations.pricing;

  return {
    hero: route,
    memberships: {
      heading: pricing.heading,
      introduction: pricing.description,
      audienceDescriptions: pricing.audienceDescriptions,
      terms: {
        heading: pricing.termsLabel,
        billingDay: membershipTerms.billingDay,
        joiningFee: membershipTerms.joiningFee,
        autoRenewal: pricing.autoRenewal,
        verifiedAt: "2026-09-21T00:00:00.000Z",
      },
    },
    passes: {
      heading: pricing.monthlyPasses.heading,
      introduction: pricing.monthlyPasses.description,
    },
    checkoutNotice: pricing.secureCheckoutNotice,
    seo: createPageSeo(dictionary, "prices"),
  };
}
