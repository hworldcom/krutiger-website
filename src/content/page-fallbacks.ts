import type {
  AboutChapterKey,
  AboutEditorialContent,
  HomepageEditorialContent,
  HomepageFeatureKey,
  PhilosophyValueKey,
} from "@/content/editorial";
import type { Dictionary } from "@/i18n/dictionaries/types";

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
