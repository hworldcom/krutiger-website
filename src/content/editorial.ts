export type EditorialImage = Readonly<{
  src: string;
  alternativeText: string;
  caption?: string;
}>;

export type SeoContent = Readonly<{
  title: string;
  description: string;
  shareImage: EditorialImage;
}>;

export type SiteEditorialContent = Readonly<{
  gymName: string;
  footerStatement: string;
  contact: Readonly<{
    status: "placeholder" | "verified";
    address: Readonly<{
      lines: readonly string[];
      mapUrl: string;
    }>;
    email: Readonly<{
      displayValue: string;
      href: `mailto:${string}`;
    }>;
    phone: Readonly<{
      displayValue: string;
      href: `tel:${string}`;
    }>;
    openingHours: readonly Readonly<{
      days: string;
      hours: string;
    }>[];
  }>;
  social: Readonly<{
    instagram: Readonly<{
      handle: string;
      url: string;
    }>;
  }>;
  defaultSeo: SeoContent;
}>;

export type HomepageFeatureKey =
  "authenticity" | "allLevels" | "community" | "experiencedCoaches";

export type HomepageEditorialContent = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    titleLines: readonly [string, string, string];
    introduction: string;
    image: EditorialImage;
    trialActionLabel: string;
    scheduleActionLabel: string;
  }>;
  values: Readonly<{
    eyebrow: string;
    title: string;
    titleAccent: string;
    introduction: string;
    features: readonly Readonly<{
      internalKey: HomepageFeatureKey;
      title: string;
      description: string;
    }>[];
  }>;
  seo: SeoContent;
}>;

export type AboutChapterKey =
  "kruTiger" | "rootsThailand" | "ringExperience" | "thailandToBerlin";

export type PhilosophyValueKey =
  "technique" | "discipline" | "respect" | "community";

export type AboutEditorialContent = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    titlePrimary: string;
    titleSecondary: string;
    introduction: string;
    image: EditorialImage;
  }>;
  storyHeading: string;
  chapters: readonly Readonly<{
    internalKey: AboutChapterKey;
    title: string;
    description: string;
    accent: string;
    primaryImage: EditorialImage;
    secondaryImage?: EditorialImage;
  }>[];
  philosophy: Readonly<{
    title: string;
    values: readonly Readonly<{
      internalKey: PhilosophyValueKey;
      title: string;
      description: string;
    }>[];
  }>;
  seo: SeoContent;
}>;

export type FaqCategory =
  "gettingStarted" | "equipment" | "training" | "memberships" | "other";

export type FaqItem = Readonly<{
  internalKey: string;
  question: string;
  answer: string;
  category: FaqCategory;
}>;
