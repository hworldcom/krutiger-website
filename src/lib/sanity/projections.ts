import type { SanityImageObject } from "@sanity/image-url";

import type {
  AboutChapterKey,
  AboutEditorialContent,
  EditorialImage,
  FaqCategory,
  FaqItem,
  HomepageEditorialContent,
  HomepageFeatureKey,
  PhilosophyValueKey,
  SeoContent,
  SiteEditorialContent,
} from "@/content/editorial";
import type { TrainingClass, TrainingLevel } from "@/content/training";
import type { TeamMember } from "@/content/team";
import type { Locale } from "@/i18n/config";
import type {
  MembershipBenefit,
  MembershipDuration,
  MembershipPlan,
} from "@/lib/bsport/memberships";
import type { MonthlyPass } from "@/lib/bsport/passes";

import type {
  ABOUT_PAGE_QUERY_RESULT,
  COACHES_QUERY_RESULT,
  FAQS_QUERY_RESULT,
  HOMEPAGE_QUERY_RESULT,
  MEMBERSHIP_CARDS_QUERY_RESULT,
  MONTHLY_PASS_CARDS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
  TRAINING_CLASSES_QUERY_RESULT,
} from "./sanity.types";
import type { ContentIssue, ProjectionResult } from "./result";
import type { SanityImageUrlFactory } from "./images";

type UnknownRecord = Record<string, unknown>;

const trainingLevels = new Set<TrainingLevel>([
  "beginners",
  "intermediate",
  "advanced",
  "allLevels",
]);
const homepageFeatureKeys = new Set<HomepageFeatureKey>([
  "authenticity",
  "allLevels",
  "community",
  "experiencedCoaches",
]);
const aboutChapterKeys = new Set<AboutChapterKey>([
  "kruTiger",
  "rootsThailand",
  "ringExperience",
  "thailandToBerlin",
]);
const philosophyValueKeys = new Set<PhilosophyValueKey>([
  "technique",
  "discipline",
  "respect",
  "community",
]);
const faqCategories = new Set<FaqCategory>([
  "gettingStarted",
  "equipment",
  "training",
  "memberships",
  "other",
]);
const membershipDurations = new Set<MembershipDuration>([3, 6, 12]);
const membershipBenefits = new Set<MembershipBenefit>([
  "muayThai",
  "openGym",
  "yoga",
  "strengthConditioning",
  "mobility",
]);

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function addIssue(
  issues: ContentIssue[],
  code: ContentIssue["code"],
  path: string,
  message: string,
) {
  issues.push({ code, path, message });
}

function requiredString(value: unknown, path: string, issues: ContentIssue[]) {
  if (typeof value !== "string" || !value.trim()) {
    addIssue(issues, "invalid", path, "Expected a non-empty string.");
    return "";
  }

  return value.trim();
}

function requiredNumber(value: unknown, path: string, issues: ContentIssue[]) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    addIssue(issues, "invalid", path, "Expected a finite number.");
    return 0;
  }

  return value;
}

function requiredPositiveInteger(
  value: unknown,
  path: string,
  issues: ContentIssue[],
) {
  const number = requiredNumber(value, path, issues);

  if (!Number.isInteger(number) || number < 1) {
    addIssue(issues, "invalid", path, "Expected a positive whole number.");
  }

  return number;
}

function localizedString(
  value: unknown,
  locale: Locale,
  path: string,
  issues: ContentIssue[],
) {
  if (!isRecord(value)) {
    addIssue(
      issues,
      "missingTranslation",
      `${path}.${locale}`,
      `The ${locale} translation is missing.`,
    );
    return "";
  }

  const localizedValue = value[locale];

  if (typeof localizedValue !== "string" || !localizedValue.trim()) {
    addIssue(
      issues,
      "missingTranslation",
      `${path}.${locale}`,
      `The ${locale} translation is missing.`,
    );
    return "";
  }

  return localizedValue.trim();
}

function optionalLocalizedString(
  value: unknown,
  locale: Locale,
  path: string,
  issues: ContentIssue[],
) {
  if (value == null) {
    return undefined;
  }

  if (!isRecord(value)) {
    addIssue(issues, "invalid", path, "Expected localized text.");
    return undefined;
  }

  const hasAnyTranslation = [value.de, value.en].some(
    (candidate) => typeof candidate === "string" && candidate.trim(),
  );

  if (!hasAnyTranslation) {
    return undefined;
  }

  return localizedString(value, locale, path, issues);
}

function portableTextToPlainText(
  value: unknown,
  locale: Locale,
  path: string,
  issues: ContentIssue[],
) {
  if (!isRecord(value) || !Array.isArray(value[locale])) {
    addIssue(
      issues,
      "missingTranslation",
      `${path}.${locale}`,
      `The ${locale} translation is missing.`,
    );
    return "";
  }

  const paragraphs: string[] = [];

  for (const [blockIndex, block] of value[locale].entries()) {
    if (!isRecord(block) || !Array.isArray(block.children)) {
      addIssue(
        issues,
        "invalid",
        `${path}.${locale}[${blockIndex}]`,
        "Expected a Portable Text block.",
      );
      continue;
    }

    const paragraph = block.children
      .map((child) =>
        isRecord(child) && typeof child.text === "string" ? child.text : "",
      )
      .join("")
      .trim();

    if (paragraph) {
      paragraphs.push(paragraph);
    }
  }

  if (paragraphs.length === 0) {
    addIssue(
      issues,
      "missingTranslation",
      `${path}.${locale}`,
      `The ${locale} translation has no readable text.`,
    );
  }

  return paragraphs.join("\n\n");
}

function requiredHttpsUrl(
  value: unknown,
  path: string,
  issues: ContentIssue[],
) {
  const candidate = requiredString(value, path, issues);

  try {
    const url = new URL(candidate);

    if (url.protocol !== "https:") {
      throw new Error("Unsupported protocol");
    }

    return url.href;
  } catch {
    addIssue(issues, "invalid", path, "Expected an absolute HTTPS URL.");
    return "";
  }
}

function imageSource(
  value: unknown,
  path: string,
  issues: ContentIssue[],
): SanityImageObject | null {
  if (!isRecord(value) || !isRecord(value.asset)) {
    addIssue(issues, "invalid", path, "Expected a Sanity image asset.");
    return null;
  }

  const reference = value.asset._ref;

  if (typeof reference !== "string" || !reference.startsWith("image-")) {
    addIssue(
      issues,
      "invalid",
      `${path}.asset`,
      "Expected a Sanity image reference.",
    );
    return null;
  }

  return {
    asset: { _ref: reference },
    ...(isRecord(value.crop)
      ? { crop: value.crop as unknown as SanityImageObject["crop"] }
      : {}),
    ...(isRecord(value.hotspot)
      ? {
          hotspot: value.hotspot as unknown as SanityImageObject["hotspot"],
        }
      : {}),
  };
}

function projectImage(
  value: unknown,
  locale: Locale,
  path: string,
  issues: ContentIssue[],
  createImageUrl: SanityImageUrlFactory,
  dimensions: Readonly<{ width: number; height: number }>,
): EditorialImage | null {
  const source = imageSource(value, path, issues);

  if (!isRecord(value) || !source) {
    return null;
  }

  const decorative = value.decorative === true;
  const alternativeText = decorative
    ? ""
    : localizedString(
        value.alternativeText,
        locale,
        `${path}.alternativeText`,
        issues,
      );
  const caption = optionalLocalizedString(
    value.caption,
    locale,
    `${path}.caption`,
    issues,
  );

  try {
    return {
      src: createImageUrl(source, dimensions),
      alternativeText,
      ...(caption ? { caption } : {}),
    };
  } catch {
    addIssue(issues, "invalid", path, "Could not build a safe image URL.");
    return null;
  }
}

function result<T>(issues: ContentIssue[], value: T): ProjectionResult<T> {
  if (issues.some(({ code }) => code === "missingTranslation")) {
    return { status: "missingTranslation", issues };
  }

  if (issues.length > 0) {
    return { status: "invalid", issues };
  }

  return { status: "ready", value };
}

function projectSeo(
  value: unknown,
  locale: Locale,
  path: string,
  issues: ContentIssue[],
  createImageUrl: SanityImageUrlFactory,
): SeoContent {
  const seo = isRecord(value) ? value : {};

  if (!isRecord(value)) {
    addIssue(issues, "invalid", path, "Expected SEO content.");
  }

  return {
    title: localizedString(seo.title, locale, `${path}.title`, issues),
    description: localizedString(
      seo.description,
      locale,
      `${path}.description`,
      issues,
    ),
    shareImage: projectImage(
      seo.shareImage,
      locale,
      `${path}.shareImage`,
      issues,
      createImageUrl,
      { width: 1_200, height: 630 },
    ) ?? { src: "", alternativeText: "" },
  };
}

export function projectTrainingClasses(
  documents: TRAINING_CLASSES_QUERY_RESULT,
  locale: Locale,
  createImageUrl: SanityImageUrlFactory,
): ProjectionResult<readonly TrainingClass[]> {
  const issues: ContentIssue[] = [];
  const classes: TrainingClass[] = [];

  if (!Array.isArray(documents)) {
    addIssue(issues, "invalid", "classTypes", "Expected a class list.");
    return result(issues, classes);
  }

  documents.forEach((document, index) => {
    const path = `classTypes[${index}]`;

    if (!isRecord(document)) {
      addIssue(issues, "invalid", path, "Expected a class document.");
      return;
    }

    const levelValue = document.level;
    let level: TrainingLevel = "allLevels";

    if (
      typeof levelValue === "string" &&
      trainingLevels.has(levelValue as TrainingLevel)
    ) {
      level = levelValue as TrainingLevel;
    } else {
      addIssue(
        issues,
        "invalid",
        `${path}.level`,
        "The class level is not supported by the current Training page.",
      );
    }

    const equipmentValue = document.equipment;
    const equipment = Array.isArray(equipmentValue)
      ? equipmentValue.map((item, itemIndex) =>
          localizedString(
            item,
            locale,
            `${path}.equipment[${itemIndex}]`,
            issues,
          ),
        )
      : [];

    if (!Array.isArray(equipmentValue) || equipmentValue.length === 0) {
      addIssue(
        issues,
        "invalid",
        `${path}.equipment`,
        "Expected at least one equipment item.",
      );
    }

    const image = projectImage(
      document.image,
      locale,
      `${path}.image`,
      issues,
      createImageUrl,
      { width: 1_600, height: 1_000 },
    );

    classes.push({
      internalKey: requiredString(
        document.internalKey,
        `${path}.internalKey`,
        issues,
      ),
      name: localizedString(document.name, locale, `${path}.name`, issues),
      summary: localizedString(
        document.summary,
        locale,
        `${path}.summary`,
        issues,
      ),
      description: portableTextToPlainText(
        document.description,
        locale,
        `${path}.description`,
        issues,
      ),
      level,
      durationMinutes: requiredPositiveInteger(
        document.durationMinutes,
        `${path}.durationMinutes`,
        issues,
      ),
      audience: localizedString(
        document.audience,
        locale,
        `${path}.audience`,
        issues,
      ),
      equipment,
      image: image ?? { src: "", alternativeText: "" },
      ctaLabel: localizedString(
        document.ctaLabel,
        locale,
        `${path}.ctaLabel`,
        issues,
      ),
    });
  });

  return result(issues, classes);
}

export function projectCoaches(
  documents: COACHES_QUERY_RESULT,
  locale: Locale,
  createImageUrl: SanityImageUrlFactory,
): ProjectionResult<readonly TeamMember[]> {
  const issues: ContentIssue[] = [];
  const coaches: TeamMember[] = [];

  if (!Array.isArray(documents)) {
    addIssue(issues, "invalid", "coaches", "Expected a coach list.");
    return result(issues, coaches);
  }

  documents.forEach((document, index) => {
    const path = `coaches[${index}]`;
    const specialtiesValue = document.specialties;
    const photo = projectImage(
      document.photo,
      locale,
      `${path}.photo`,
      issues,
      createImageUrl,
      { width: 1_200, height: 1_500 },
    );

    if (!Array.isArray(specialtiesValue) || specialtiesValue.length === 0) {
      addIssue(
        issues,
        "invalid",
        `${path}.specialties`,
        "Expected at least one specialty.",
      );
    }

    coaches.push({
      internalKey: requiredString(
        document.internalKey,
        `${path}.internalKey`,
        issues,
      ),
      name: requiredString(document.name, `${path}.name`, issues),
      role: localizedString(document.role, locale, `${path}.role`, issues),
      photo: photo ?? { src: "", alternativeText: "" },
      biography: portableTextToPlainText(
        document.biography,
        locale,
        `${path}.biography`,
        issues,
      ),
      specialties: Array.isArray(specialtiesValue)
        ? specialtiesValue.map((specialty, specialtyIndex) =>
            localizedString(
              specialty,
              locale,
              `${path}.specialties[${specialtyIndex}]`,
              issues,
            ),
          )
        : [],
      ...(document.socialUrl
        ? {
            socialUrl: requiredHttpsUrl(
              document.socialUrl,
              `${path}.socialUrl`,
              issues,
            ),
          }
        : {}),
    });
  });

  return result(issues, coaches);
}

export function projectFaqs(
  documents: FAQS_QUERY_RESULT,
  locale: Locale,
): ProjectionResult<readonly FaqItem[]> {
  const issues: ContentIssue[] = [];
  const faqs: FaqItem[] = [];

  if (!Array.isArray(documents)) {
    addIssue(issues, "invalid", "faqs", "Expected an FAQ list.");
    return result(issues, faqs);
  }

  documents.forEach((document, index) => {
    const path = `faqs[${index}]`;
    let category: FaqCategory = "other";

    if (
      typeof document.category === "string" &&
      faqCategories.has(document.category as FaqCategory)
    ) {
      category = document.category as FaqCategory;
    } else {
      addIssue(
        issues,
        "invalid",
        `${path}.category`,
        "Unsupported FAQ category.",
      );
    }

    faqs.push({
      internalKey: requiredString(
        document.internalKey,
        `${path}.internalKey`,
        issues,
      ),
      question: localizedString(
        document.question,
        locale,
        `${path}.question`,
        issues,
      ),
      answer: portableTextToPlainText(
        document.answer,
        locale,
        `${path}.answer`,
        issues,
      ),
      category,
    });
  });

  return result(issues, faqs);
}

function validateMembershipCheckout(
  value: unknown,
  kind: "membership" | "pass",
  path: string,
  issues: ContentIssue[],
) {
  const candidate = requiredHttpsUrl(value, path, issues);

  try {
    const url = new URL(candidate);
    const validPath =
      kind === "membership"
        ? /^\/checkout\/6720\/subscription\/\d+$/.test(url.pathname)
        : /^\/customer\/payment\/pass\/\d+\/$/.test(url.pathname);
    const validQuery =
      kind === "membership"
        ? url.searchParams.size === 1 &&
          url.searchParams.get("force") === "true"
        : url.searchParams.size === 2 &&
          url.searchParams.get("membership") === "6720" &&
          url.searchParams.get("force") === "true";

    if (url.hostname !== "backoffice.bsport.io" || !validPath || !validQuery) {
      throw new Error("Unsupported checkout destination");
    }
  } catch {
    addIssue(
      issues,
      "invalid",
      path,
      "Expected a verified KRUTIGER bSport checkout URL.",
    );
  }

  return candidate;
}

export function projectMembershipCards(
  documents: MEMBERSHIP_CARDS_QUERY_RESULT,
  locale: Locale,
): ProjectionResult<readonly MembershipPlan[]> {
  const issues: ContentIssue[] = [];
  const memberships: MembershipPlan[] = [];

  if (!Array.isArray(documents)) {
    addIssue(issues, "invalid", "memberships", "Expected a membership list.");
    return result(issues, memberships);
  }

  documents.forEach((document, index) => {
    const path = `memberships[${index}]`;
    const durationValue = document.durationMonths;
    const duration = membershipDurations.has(
      durationValue as MembershipDuration,
    )
      ? (durationValue as MembershipDuration)
      : 12;
    const accessType = document.accessType;
    const sessions =
      accessType === "unlimited"
        ? "unlimited"
        : requiredPositiveInteger(
            document.monthlySessions,
            `${path}.monthlySessions`,
            issues,
          );
    const benefitsValue = document.benefits;
    const benefits = Array.isArray(benefitsValue)
      ? benefitsValue.filter((benefit): benefit is MembershipBenefit => {
          if (membershipBenefits.has(benefit as MembershipBenefit)) {
            return true;
          }

          addIssue(
            issues,
            "invalid",
            `${path}.benefits`,
            "Unsupported membership benefit.",
          );
          return false;
        })
      : [];

    if (!membershipDurations.has(durationValue as MembershipDuration)) {
      addIssue(
        issues,
        "invalid",
        `${path}.durationMonths`,
        "Unsupported duration.",
      );
    }
    if (accessType !== "limited" && accessType !== "unlimited") {
      addIssue(
        issues,
        "invalid",
        `${path}.accessType`,
        "Unsupported access type.",
      );
    }
    if (benefits.length === 0) {
      addIssue(
        issues,
        "invalid",
        `${path}.benefits`,
        "Expected at least one benefit.",
      );
    }

    memberships.push({
      id: requiredString(document.internalKey, `${path}.internalKey`, issues),
      name: localizedString(document.name, locale, `${path}.name`, issues),
      monthlyPrice:
        requiredPositiveInteger(
          document.monthlyPriceCents,
          `${path}.monthlyPriceCents`,
          issues,
        ) / 100,
      durationMonths: duration,
      monthlySessions: sessions,
      benefits,
      checkoutUrl: validateMembershipCheckout(
        document.checkoutUrl,
        "membership",
        `${path}.checkoutUrl`,
        issues,
      ),
    });
  });

  return result(issues, memberships);
}

export function projectMonthlyPassCards(
  documents: MONTHLY_PASS_CARDS_QUERY_RESULT,
  locale: Locale,
): ProjectionResult<readonly MonthlyPass[]> {
  const issues: ContentIssue[] = [];
  const passes: MonthlyPass[] = [];

  if (!Array.isArray(documents)) {
    addIssue(issues, "invalid", "passes", "Expected a monthly-pass list.");
    return result(issues, passes);
  }

  documents.forEach((document, index) => {
    const path = `passes[${index}]`;
    const accessType = document.accessType;
    const sessions =
      accessType === "unlimited"
        ? "unlimited"
        : requiredPositiveInteger(
            document.sessions,
            `${path}.sessions`,
            issues,
          );

    if (accessType !== "limited" && accessType !== "unlimited") {
      addIssue(
        issues,
        "invalid",
        `${path}.accessType`,
        "Unsupported access type.",
      );
    }
    if (document.validityMonths !== 1) {
      addIssue(
        issues,
        "invalid",
        `${path}.validityMonths`,
        "The current website supports one-month passes only.",
      );
    }

    passes.push({
      id: requiredString(document.internalKey, `${path}.internalKey`, issues),
      name: localizedString(document.name, locale, `${path}.name`, issues),
      price:
        requiredPositiveInteger(
          document.priceCents,
          `${path}.priceCents`,
          issues,
        ) / 100,
      sessions,
      checkoutUrl: validateMembershipCheckout(
        document.checkoutUrl,
        "pass",
        `${path}.checkoutUrl`,
        issues,
      ),
    });
  });

  return result(issues, passes);
}

export function projectHomepage(
  document: HOMEPAGE_QUERY_RESULT,
  locale: Locale,
  createImageUrl: SanityImageUrlFactory,
): ProjectionResult<HomepageEditorialContent> {
  const issues: ContentIssue[] = [];
  const value: UnknownRecord = isRecord(document) ? document : {};

  if (!isRecord(document)) {
    addIssue(issues, "invalid", "homepage", "Expected a homepage document.");
  }

  const titleLinesValue = value.heroTitleLines;
  const titleLines = Array.isArray(titleLinesValue)
    ? titleLinesValue.map((line, index) =>
        localizedString(
          line,
          locale,
          `homepage.heroTitleLines[${index}]`,
          issues,
        ),
      )
    : [];
  const featuresValue = value.features;
  const features = Array.isArray(featuresValue)
    ? featuresValue.map((feature, index) => {
        const path = `homepage.features[${index}]`;
        const entry = isRecord(feature) ? feature : {};
        const key = entry.internalKey;

        if (!homepageFeatureKeys.has(key as HomepageFeatureKey)) {
          addIssue(
            issues,
            "invalid",
            `${path}.internalKey`,
            "Unsupported feature key.",
          );
        }

        return {
          internalKey: homepageFeatureKeys.has(key as HomepageFeatureKey)
            ? (key as HomepageFeatureKey)
            : "authenticity",
          title: localizedString(entry.title, locale, `${path}.title`, issues),
          description: localizedString(
            entry.description,
            locale,
            `${path}.description`,
            issues,
          ),
        };
      })
    : [];

  if (titleLines.length !== 3) {
    addIssue(
      issues,
      "invalid",
      "homepage.heroTitleLines",
      "Expected three title lines.",
    );
  }
  if (features.length !== 4) {
    addIssue(issues, "invalid", "homepage.features", "Expected four features.");
  }

  const homepage: HomepageEditorialContent = {
    hero: {
      eyebrow: localizedString(
        value.heroEyebrow,
        locale,
        "homepage.heroEyebrow",
        issues,
      ),
      titleLines: [
        titleLines[0] ?? "",
        titleLines[1] ?? "",
        titleLines[2] ?? "",
      ],
      introduction: localizedString(
        value.heroIntroduction,
        locale,
        "homepage.heroIntroduction",
        issues,
      ),
      image: projectImage(
        value.heroImage,
        locale,
        "homepage.heroImage",
        issues,
        createImageUrl,
        { width: 2_400, height: 1_500 },
      ) ?? { src: "", alternativeText: "" },
      trialActionLabel: localizedString(
        value.trialActionLabel,
        locale,
        "homepage.trialActionLabel",
        issues,
      ),
      scheduleActionLabel: localizedString(
        value.scheduleActionLabel,
        locale,
        "homepage.scheduleActionLabel",
        issues,
      ),
    },
    values: {
      eyebrow: localizedString(
        value.valuesEyebrow,
        locale,
        "homepage.valuesEyebrow",
        issues,
      ),
      title: localizedString(
        value.valuesTitle,
        locale,
        "homepage.valuesTitle",
        issues,
      ),
      titleAccent: localizedString(
        value.valuesTitleAccent,
        locale,
        "homepage.valuesTitleAccent",
        issues,
      ),
      introduction: localizedString(
        value.valuesIntroduction,
        locale,
        "homepage.valuesIntroduction",
        issues,
      ),
      features,
    },
    seo: projectSeo(value.seo, locale, "homepage.seo", issues, createImageUrl),
  };

  return result(issues, homepage);
}

export function projectAboutPage(
  document: ABOUT_PAGE_QUERY_RESULT,
  locale: Locale,
  createImageUrl: SanityImageUrlFactory,
): ProjectionResult<AboutEditorialContent> {
  const issues: ContentIssue[] = [];
  const value: UnknownRecord = isRecord(document) ? document : {};

  if (!isRecord(document)) {
    addIssue(
      issues,
      "invalid",
      "aboutPage",
      "Expected an About page document.",
    );
  }

  const chaptersValue = value.chapters;
  const chapters = Array.isArray(chaptersValue)
    ? chaptersValue.map((chapter, index) => {
        const path = `aboutPage.chapters[${index}]`;
        const entry = isRecord(chapter) ? chapter : {};
        const key = entry.internalKey;
        const primaryImage = projectImage(
          entry.primaryImage,
          locale,
          `${path}.primaryImage`,
          issues,
          createImageUrl,
          { width: 1_600, height: 900 },
        );
        const secondaryImage = entry.secondaryImage
          ? projectImage(
              entry.secondaryImage,
              locale,
              `${path}.secondaryImage`,
              issues,
              createImageUrl,
              { width: 1_200, height: 900 },
            )
          : undefined;

        if (!aboutChapterKeys.has(key as AboutChapterKey)) {
          addIssue(
            issues,
            "invalid",
            `${path}.internalKey`,
            "Unsupported chapter key.",
          );
        }

        return {
          internalKey: aboutChapterKeys.has(key as AboutChapterKey)
            ? (key as AboutChapterKey)
            : "kruTiger",
          title: localizedString(entry.title, locale, `${path}.title`, issues),
          description: localizedString(
            entry.description,
            locale,
            `${path}.description`,
            issues,
          ),
          accent: localizedString(
            entry.accent,
            locale,
            `${path}.accent`,
            issues,
          ),
          primaryImage: primaryImage ?? { src: "", alternativeText: "" },
          ...(secondaryImage ? { secondaryImage } : {}),
        };
      })
    : [];
  const valuesValue = value.philosophyValues;
  const philosophyValues = Array.isArray(valuesValue)
    ? valuesValue.map((philosophyValue, index) => {
        const path = `aboutPage.philosophyValues[${index}]`;
        const entry = isRecord(philosophyValue) ? philosophyValue : {};
        const key = entry.internalKey;

        if (!philosophyValueKeys.has(key as PhilosophyValueKey)) {
          addIssue(
            issues,
            "invalid",
            `${path}.internalKey`,
            "Unsupported value key.",
          );
        }

        return {
          internalKey: philosophyValueKeys.has(key as PhilosophyValueKey)
            ? (key as PhilosophyValueKey)
            : "technique",
          title: localizedString(entry.title, locale, `${path}.title`, issues),
          description: localizedString(
            entry.description,
            locale,
            `${path}.description`,
            issues,
          ),
        };
      })
    : [];

  if (chapters.length !== 4) {
    addIssue(
      issues,
      "invalid",
      "aboutPage.chapters",
      "Expected four chapters.",
    );
  }
  if (philosophyValues.length !== 4) {
    addIssue(
      issues,
      "invalid",
      "aboutPage.philosophyValues",
      "Expected four philosophy values.",
    );
  }

  const aboutPage: AboutEditorialContent = {
    hero: {
      eyebrow: localizedString(
        value.heroEyebrow,
        locale,
        "aboutPage.heroEyebrow",
        issues,
      ),
      titlePrimary: localizedString(
        value.heroTitlePrimary,
        locale,
        "aboutPage.heroTitlePrimary",
        issues,
      ),
      titleSecondary: localizedString(
        value.heroTitleSecondary,
        locale,
        "aboutPage.heroTitleSecondary",
        issues,
      ),
      introduction: localizedString(
        value.heroIntroduction,
        locale,
        "aboutPage.heroIntroduction",
        issues,
      ),
      image: projectImage(
        value.heroImage,
        locale,
        "aboutPage.heroImage",
        issues,
        createImageUrl,
        { width: 2_400, height: 1_500 },
      ) ?? { src: "", alternativeText: "" },
    },
    storyHeading: localizedString(
      value.storyHeading,
      locale,
      "aboutPage.storyHeading",
      issues,
    ),
    chapters,
    philosophy: {
      title: localizedString(
        value.philosophyTitle,
        locale,
        "aboutPage.philosophyTitle",
        issues,
      ),
      values: philosophyValues,
    },
    seo: projectSeo(value.seo, locale, "aboutPage.seo", issues, createImageUrl),
  };

  return result(issues, aboutPage);
}

export function projectSiteSettings(
  document: SITE_SETTINGS_QUERY_RESULT,
  locale: Locale,
  createImageUrl: SanityImageUrlFactory,
): ProjectionResult<SiteEditorialContent> {
  const issues: ContentIssue[] = [];
  const value: UnknownRecord = isRecord(document) ? document : {};

  if (!isRecord(document)) {
    addIssue(issues, "invalid", "siteSettings", "Expected site settings.");
  }

  const address = isRecord(value.address) ? value.address : {};
  const addressLines = Array.isArray(address.lines)
    ? address.lines.map((line, index) =>
        requiredString(line, `siteSettings.address.lines[${index}]`, issues),
      )
    : [];
  const openingHoursValue = value.openingHours;
  const openingHours = Array.isArray(openingHoursValue)
    ? openingHoursValue.map((entry, index) => {
        const path = `siteSettings.openingHours[${index}]`;
        const row = isRecord(entry) ? entry : {};

        return {
          days: localizedString(row.days, locale, `${path}.days`, issues),
          hours: localizedString(row.hours, locale, `${path}.hours`, issues),
        };
      })
    : [];

  if (addressLines.length === 0) {
    addIssue(
      issues,
      "invalid",
      "siteSettings.address.lines",
      "Expected an address.",
    );
  }
  if (openingHours.length === 0) {
    addIssue(
      issues,
      "invalid",
      "siteSettings.openingHours",
      "Expected opening information.",
    );
  }

  const email = requiredString(value.email, "siteSettings.email", issues);
  const phone = requiredString(
    value.telephone,
    "siteSettings.telephone",
    issues,
  );
  const contactStatus =
    value.contactStatus === "verified" ? "verified" : "placeholder";

  if (
    value.contactStatus !== "verified" &&
    value.contactStatus !== "placeholder"
  ) {
    addIssue(
      issues,
      "invalid",
      "siteSettings.contactStatus",
      "Unsupported contact status.",
    );
  }

  const siteContent: SiteEditorialContent = {
    gymName: localizedString(
      value.gymName,
      locale,
      "siteSettings.gymName",
      issues,
    ),
    footerStatement: localizedString(
      value.footerStatement,
      locale,
      "siteSettings.footerStatement",
      issues,
    ),
    contact: {
      status: contactStatus,
      address: {
        lines: addressLines,
        mapUrl: requiredHttpsUrl(
          address.mapUrl,
          "siteSettings.address.mapUrl",
          issues,
        ),
      },
      email: {
        displayValue: email,
        href: `mailto:${email}`,
      },
      phone: {
        displayValue: phone,
        href: `tel:${phone.replace(/[^+\d]/g, "")}`,
      },
      openingHours,
    },
    social: {
      instagram: {
        handle: requiredString(
          value.instagramHandle,
          "siteSettings.instagramHandle",
          issues,
        ),
        url: requiredHttpsUrl(
          value.instagramUrl,
          "siteSettings.instagramUrl",
          issues,
        ),
      },
    },
    defaultSeo: projectSeo(
      value.defaultSeo,
      locale,
      "siteSettings.defaultSeo",
      issues,
      createImageUrl,
    ),
  };

  return result(issues, siteContent);
}
