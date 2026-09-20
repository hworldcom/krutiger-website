import { readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { getCliClient } from "sanity/cli";

import { teamMemberSource } from "../../src/content/team";
import { trainingClassSource } from "../../src/content/training";
import de from "../../src/i18n/dictionaries/de";
import en from "../../src/i18n/dictionaries/en";
import {
  membershipDurations,
  membershipsByDuration,
} from "../../src/lib/bsport/memberships";
import {
  monthlyPasses,
  monthlyPassValidityMonths,
} from "../../src/lib/bsport/passes";
import { siteSettings } from "../../src/lib/site-settings";
import { studioEnvironment } from "../environment";

type SeedStage = "draft" | "published";
type SeedDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};
type AssetMap = ReadonlyMap<string, string>;

type SeedDefinition = Readonly<{
  canonicalId: string;
  stage: SeedStage;
  build: (assets: AssetMap) => SeedDocument;
}>;

const baselineVerifiedAt = "2026-09-14T00:00:00.000Z";
const repositoryRoot = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const imagePaths = [
  "/images/home/main.png",
  "/images/about/main.png",
  "/images/about/second.png",
  "/images/about/third.jpg",
  "/images/about/fourth.jpg",
  "/images/about/fifth.jpg",
  "/images/about/six.jpg",
] as const;

const aboutChapterKeys = [
  "kruTiger",
  "rootsThailand",
  "ringExperience",
  "thailandToBerlin",
] as const;
const aboutChapterImagePaths = [
  "/images/about/second.png",
  "/images/about/third.jpg",
  "/images/about/fourth.jpg",
  "/images/about/fifth.jpg",
] as const;
const aboutChapterHotspots = [0.14, 0.2, 0.12, 0.48] as const;
const homepageFeatureKeys = [
  "authenticity",
  "allLevels",
  "community",
  "experiencedCoaches",
] as const;
const philosophyValueKeys = [
  "technique",
  "discipline",
  "respect",
  "community",
] as const;

function targetId(canonicalId: string, stage: SeedStage) {
  return stage === "draft" ? `drafts.${canonicalId}` : canonicalId;
}

function keyed(prefix: string, index: number) {
  return `${prefix}-${String(index + 1).padStart(2, "0")}`;
}

function localizedString(german: string, english: string) {
  return { _type: "localizedString", de: german, en: english };
}

function localizedText(german: string, english: string) {
  return { _type: "localizedText", de: german, en: english };
}

function portableText(value: string, key: string) {
  return [
    {
      _key: `${key}-block`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `${key}-span`,
          _type: "span",
          marks: [],
          text: value,
        },
      ],
    },
  ];
}

function localizedRichText(german: string, english: string, key: string) {
  return {
    _type: "localizedRichText",
    de: portableText(german, `${key}-de`),
    en: portableText(english, `${key}-en`),
  };
}

function image(
  assets: AssetMap,
  path: (typeof imagePaths)[number],
  alternativeText: Readonly<{ de: string; en: string }>,
  hotspotY: number,
) {
  const assetId = assets.get(path);

  if (!assetId) {
    throw new Error(`Missing uploaded asset for ${path}.`);
  }

  return {
    _type: "editorialImage",
    asset: { _type: "reference", _ref: assetId },
    hotspot: {
      _type: "sanity.imageHotspot",
      x: 0.5,
      y: hotspotY,
      height: 1,
      width: 1,
    },
    decorative: false,
    alternativeText: {
      _type: "localizedAlternativeText",
      de: alternativeText.de,
      en: alternativeText.en,
    },
    source: `Client-supplied KRUTIGER website asset: public${path}`,
    rightsHolder: "Confirmation required from KRUTIGER",
    rightsStatus: "pending",
    peopleConsent: "pending",
  };
}

function seo(
  assets: AssetMap,
  title: Readonly<{ de: string; en: string }>,
  description: Readonly<{ de: string; en: string }>,
  shareImage: ReturnType<typeof image>,
) {
  return {
    _type: "seoMetadata",
    title: localizedString(title.de, title.en),
    description: localizedText(description.de, description.en),
    shareImage,
  };
}

function buildHomepage(assets: AssetMap): SeedDocument {
  const heroImage = image(
    assets,
    "/images/home/main.png",
    {
      de: de.homePage.hero.imageAlt,
      en: en.homePage.hero.imageAlt,
    },
    0.42,
  );

  return {
    _id: "drafts.homepage",
    _type: "homepage",
    heroEyebrow: localizedString(
      de.homePage.hero.eyebrow,
      en.homePage.hero.eyebrow,
    ),
    heroTitleLines: de.homePage.hero.titleLines.map((line, index) => ({
      _key: keyed("hero-title", index),
      ...localizedString(line, en.homePage.hero.titleLines[index]),
    })),
    heroIntroduction: localizedText(
      de.homePage.hero.introduction,
      en.homePage.hero.introduction,
    ),
    heroImage,
    trialActionLabel: localizedString(
      de.homePage.hero.trialAction,
      en.homePage.hero.trialAction,
    ),
    scheduleActionLabel: localizedString(
      de.homePage.hero.scheduleAction,
      en.homePage.hero.scheduleAction,
    ),
    valuesEyebrow: localizedString(
      de.homePage.values.eyebrow,
      en.homePage.values.eyebrow,
    ),
    valuesTitle: localizedString(
      de.homePage.values.titlePrimary,
      en.homePage.values.titlePrimary,
    ),
    valuesTitleAccent: localizedString(
      de.homePage.values.titleAccent,
      en.homePage.values.titleAccent,
    ),
    valuesIntroduction: localizedText(
      de.homePage.values.introduction,
      en.homePage.values.introduction,
    ),
    features: homepageFeatureKeys.map((internalKey, index) => ({
      _key: internalKey,
      _type: "homepageFeature",
      internalKey,
      title: localizedString(
        de.homePage.values.items[index].title,
        en.homePage.values.items[index].title,
      ),
      description: localizedText(
        de.homePage.values.items[index].description,
        en.homePage.values.items[index].description,
      ),
    })),
    seo: seo(
      assets,
      { de: de.routes.home.title, en: en.routes.home.title },
      { de: de.routes.home.description, en: en.routes.home.description },
      heroImage,
    ),
    editorialState: "review",
  };
}

function buildAboutPage(assets: AssetMap): SeedDocument {
  const heroImage = image(
    assets,
    "/images/about/main.png",
    {
      de: de.aboutPage.hero.imageAlt,
      en: en.aboutPage.hero.imageAlt,
    },
    0.35,
  );

  return {
    _id: "drafts.aboutPage",
    _type: "aboutPage",
    heroEyebrow: localizedString(
      de.aboutPage.hero.eyebrow,
      en.aboutPage.hero.eyebrow,
    ),
    heroTitlePrimary: localizedString(
      de.aboutPage.hero.titlePrimary,
      en.aboutPage.hero.titlePrimary,
    ),
    heroTitleSecondary: localizedString(
      de.aboutPage.hero.titleSecondary,
      en.aboutPage.hero.titleSecondary,
    ),
    heroIntroduction: localizedText(
      de.aboutPage.hero.introduction,
      en.aboutPage.hero.introduction,
    ),
    heroImage,
    storyHeading: localizedString(
      de.aboutPage.storyHeading,
      en.aboutPage.storyHeading,
    ),
    chapters: aboutChapterKeys.map((internalKey, index) => {
      const german = de.aboutPage.chapters[index];
      const english = en.aboutPage.chapters[index];
      const primaryImage = image(
        assets,
        aboutChapterImagePaths[index],
        { de: german.imageAlt, en: english.imageAlt },
        aboutChapterHotspots[index],
      );

      return {
        _key: internalKey,
        _type: "aboutChapter",
        internalKey,
        title: localizedString(german.title, english.title),
        description: localizedText(german.description, english.description),
        accent: localizedString(german.accent, english.accent),
        primaryImage,
        ...(index === 3
          ? {
              secondaryImage: image(
                assets,
                "/images/about/six.jpg",
                {
                  de:
                    "secondaryImageAlt" in german
                      ? german.secondaryImageAlt
                      : "",
                  en:
                    "secondaryImageAlt" in english
                      ? english.secondaryImageAlt
                      : "",
                },
                0.12,
              ),
            }
          : {}),
      };
    }),
    philosophyTitle: localizedString(
      de.aboutPage.philosophy.title,
      en.aboutPage.philosophy.title,
    ),
    philosophyValues: philosophyValueKeys.map((internalKey, index) => ({
      _key: internalKey,
      _type: "philosophyValue",
      internalKey,
      title: localizedString(
        de.aboutPage.philosophy.values[index].title,
        en.aboutPage.philosophy.values[index].title,
      ),
      description: localizedText(
        de.aboutPage.philosophy.values[index].description,
        en.aboutPage.philosophy.values[index].description,
      ),
    })),
    seo: seo(
      assets,
      { de: de.routes.about.title, en: en.routes.about.title },
      { de: de.routes.about.description, en: en.routes.about.description },
      heroImage,
    ),
    editorialState: "review",
  };
}

function buildTrainingClasses(assets: AssetMap): SeedDocument[] {
  return trainingClassSource.map((trainingClass) => {
    const path = trainingClass.image.src as (typeof imagePaths)[number];
    const position = trainingClass.image.objectPosition?.match(/(\d+)%$/)?.[1];

    return {
      _id: `drafts.class-type-${trainingClass.internalKey}`,
      _type: "classType",
      internalKey: { _type: "slug", current: trainingClass.internalKey },
      name: localizedString(trainingClass.name.de, trainingClass.name.en),
      summary: localizedText(
        trainingClass.summary.de,
        trainingClass.summary.en,
      ),
      description: localizedRichText(
        trainingClass.description.de,
        trainingClass.description.en,
        trainingClass.internalKey,
      ),
      level: trainingClass.level,
      durationMinutes: trainingClass.durationMinutes,
      audience: localizedText(
        trainingClass.audience.de,
        trainingClass.audience.en,
      ),
      equipment: trainingClass.equipment.map((entry, index) => ({
        _key: keyed(`${trainingClass.internalKey}-equipment`, index),
        ...localizedString(entry.de, entry.en),
      })),
      image: image(
        assets,
        path,
        trainingClass.image.alternativeText,
        position ? Number(position) / 100 : 0.5,
      ),
      ctaLabel: localizedString(
        trainingClass.ctaLabel.de,
        trainingClass.ctaLabel.en,
      ),
      order: trainingClass.order,
      active: trainingClass.active,
      editorialState: "review",
    };
  });
}

function buildCoaches(assets: AssetMap): SeedDocument[] {
  return teamMemberSource.map((member) => ({
    _id: `drafts.coach-${member.internalKey}`,
    _type: "coach",
    internalKey: { _type: "slug", current: member.internalKey },
    name: member.name,
    role: localizedString(member.role.de, member.role.en),
    photo: image(
      assets,
      "/images/about/main.png",
      member.photo.alternativeText,
      0.38,
    ),
    biography: localizedRichText(
      member.biography.de,
      member.biography.en,
      `${member.internalKey}-biography`,
    ),
    specialties: member.specialties.map((entry, index) => ({
      _key: keyed(`${member.internalKey}-specialty`, index),
      ...localizedString(entry.de, entry.en),
    })),
    ...(member.socialUrl ? { socialUrl: member.socialUrl } : {}),
    order: member.order,
    active: member.active,
    editorialState: "draft",
  }));
}

function buildFaqs(): SeedDocument[] {
  const faqs = [
    {
      key: "first-training-class",
      category: "gettingStarted",
      question: {
        de: "Welcher Kurs passt für mein erstes Training?",
        en: "Which class should I choose for my first session?",
      },
      answer: {
        de: "Muay Thai Basic ist der klare Einstieg ohne Vorerfahrung. Wenn du bereits trainiert hast und dein Level nicht sicher einschätzen kannst, sprich vor dem Training mit unserem Trainerteam.",
        en: "Muay Thai Basic is the clear starting point if you have no previous experience. If you have trained before and are unsure about your level, speak with our coaching team before the session.",
      },
    },
    {
      key: "basic-equipment",
      category: "equipment",
      question: {
        de: "Was brauche ich für das Training?",
        en: "What do I need for training?",
      },
      answer: {
        de: "Für den Einstieg brauchst du bequeme Sportkleidung und eine Wasserflasche. Falls vorhanden, bring Boxhandschuhe und Bandagen mit. Die jeweilige Kurskarte nennt weitere empfohlene Ausrüstung.",
        en: "To get started, bring comfortable sportswear and a water bottle. If available, bring boxing gloves and hand wraps. Each class card lists any additional recommended equipment.",
      },
    },
    {
      key: "current-schedule",
      category: "training",
      question: {
        de: "Wo finde ich aktuelle Kurszeiten und freie Plätze?",
        en: "Where can I find current class times and availability?",
      },
      answer: {
        de: "Aktuelle Termine, Trainer und verfügbare Plätze findest du immer im Live-Kursplan von bSport.",
        en: "Current dates, coaches, and available places are always shown in the live bSport schedule.",
      },
    },
  ] as const;

  return faqs.map((faq, index) => ({
    _id: `drafts.faq-${faq.key}`,
    _type: "faq",
    internalKey: { _type: "slug", current: faq.key },
    question: localizedString(faq.question.de, faq.question.en),
    answer: localizedRichText(faq.answer.de, faq.answer.en, faq.key),
    category: faq.category,
    order: (index + 1) * 10,
    active: true,
    editorialState: "draft",
  }));
}

function buildMembershipCards(): SeedDocument[] {
  return membershipDurations.flatMap((duration) =>
    membershipsByDuration[duration].map((membership, index) => ({
      _id: `membership-card-${membership.id}`,
      _type: "membershipCard",
      internalKey: { _type: "slug", current: membership.id },
      name: localizedString(membership.name, membership.name),
      monthlyPriceCents: Math.round(membership.monthlyPrice * 100),
      durationMonths: membership.durationMonths,
      accessType:
        membership.monthlySessions === "unlimited" ? "unlimited" : "limited",
      ...(membership.monthlySessions === "unlimited"
        ? {}
        : { monthlySessions: membership.monthlySessions }),
      benefits: [...membership.benefits],
      checkoutUrl: membership.checkoutUrl,
      verifiedAt: baselineVerifiedAt,
      order: (index + 1) * 10,
      active: true,
      editorialState: "ready",
    })),
  );
}

function buildMonthlyPassCards(): SeedDocument[] {
  return monthlyPasses.map((pass, index) => ({
    _id: `monthly-pass-card-${pass.id}`,
    _type: "monthlyPassCard",
    internalKey: { _type: "slug", current: pass.id },
    name: localizedString(pass.name, pass.name),
    priceCents: Math.round(pass.price * 100),
    validityMonths: monthlyPassValidityMonths,
    accessType: pass.sessions === "unlimited" ? "unlimited" : "limited",
    ...(pass.sessions === "unlimited" ? {} : { sessions: pass.sessions }),
    checkoutUrl: pass.checkoutUrl,
    verifiedAt: baselineVerifiedAt,
    order: (index + 1) * 10,
    active: true,
    editorialState: "ready",
  }));
}

function buildSiteSettings(assets: AssetMap): SeedDocument {
  const shareImage = image(
    assets,
    "/images/home/main.png",
    {
      de: de.homePage.hero.imageAlt,
      en: en.homePage.hero.imageAlt,
    },
    0.42,
  );

  return {
    _id: "drafts.siteSettings",
    _type: "siteSettings",
    gymName: localizedString(
      "KRUTIGER Muay Thai Berlin",
      "KRUTIGER Muay Thai Berlin",
    ),
    footerStatement: localizedText(
      de.shell.footer.brandStatement,
      en.shell.footer.brandStatement,
    ),
    contactStatus: "placeholder",
    address: {
      _type: "postalAddress",
      lines: [...siteSettings.contact.address.lines],
      mapUrl: siteSettings.contact.address.mapUrl,
    },
    email: siteSettings.contact.email.displayValue,
    telephone: siteSettings.contact.phone.displayValue,
    openingHours: siteSettings.contact.openingHours.map((entry, index) => ({
      _key: keyed("opening-hours", index),
      _type: "openingHoursEntry",
      days: localizedString(entry.days.de, entry.days.en),
      hours: localizedString(entry.hours.de, entry.hours.en),
    })),
    instagramUrl: siteSettings.social.instagram.url,
    instagramHandle: siteSettings.social.instagram.handle,
    defaultSeo: seo(
      assets,
      { de: de.metadata.title, en: en.metadata.title },
      { de: de.metadata.description, en: en.metadata.description },
      shareImage,
    ),
    editorialState: "draft",
  };
}

function buildDefinitions(assets: AssetMap): SeedDefinition[] {
  const draftDocuments = [
    buildHomepage(assets),
    buildAboutPage(assets),
    buildSiteSettings(assets),
    ...buildTrainingClasses(assets),
    ...buildCoaches(assets),
    ...buildFaqs(),
  ];
  const publishedDocuments = [
    ...buildMembershipCards(),
    ...buildMonthlyPassCards(),
  ];

  return [
    ...draftDocuments.map((document) => ({
      canonicalId: document._id.replace(/^drafts\./, ""),
      stage: "draft" as const,
      build: () => document,
    })),
    ...publishedDocuments.map((document) => ({
      canonicalId: document._id,
      stage: "published" as const,
      build: () => document,
    })),
  ];
}

async function uploadAssets(client: ReturnType<typeof getCliClient>) {
  const assets = new Map<string, string>();

  for (const path of imagePaths) {
    const filePath = join(repositoryRoot, "public", path);
    const data = await readFile(filePath);
    const asset = await client.assets.upload("image", data, {
      filename: basename(filePath),
    });
    assets.set(path, asset._id);
    console.log(`Asset ready: ${path}`);
  }

  return assets;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const client = getCliClient({ apiVersion: studioEnvironment.apiVersion });
  const dataset = client.config().dataset;

  if (dataset !== "development") {
    throw new Error(
      `The baseline seed only targets the development dataset; received ${String(dataset)}.`,
    );
  }

  const emptyAssets = new Map(
    imagePaths.map((path) => [path, `dry-run-${basename(path)}`]),
  );
  const candidates = buildDefinitions(emptyAssets);

  for (const { canonicalId } of candidates) {
    if (canonicalId.includes(".")) {
      throw new Error(
        `Published Sanity IDs must stay on the public root path: ${canonicalId}.`,
      );
    }
  }

  const ids = candidates.flatMap(({ canonicalId }) => [
    canonicalId,
    `drafts.${canonicalId}`,
  ]);
  const existingIds = new Set(
    await client.fetch<string[]>(
      `*[_id in $ids][]._id`,
      { ids },
      { perspective: "raw" },
    ),
  );
  const missing = candidates.filter(
    ({ canonicalId }) =>
      !existingIds.has(canonicalId) &&
      !existingIds.has(`drafts.${canonicalId}`),
  );

  console.log(
    `${missing.length} of ${candidates.length} baseline documents are missing from ${dataset}.`,
  );

  for (const definition of missing) {
    console.log(`- ${definition.stage}: ${definition.canonicalId}`);
  }

  if (!apply) {
    console.log(
      "Dry run only. Re-run the apply script to create missing documents.",
    );
    return;
  }

  if (missing.length === 0) {
    console.log("Nothing to create; the seed is already applied.");
    return;
  }

  const assets = await uploadAssets(client);
  const documentsById = new Map(
    buildDefinitions(assets).map((definition) => [
      definition.canonicalId,
      definition.build(assets),
    ]),
  );

  for (let index = 0; index < missing.length; index += 20) {
    const batch = missing.slice(index, index + 20);
    let transaction = client.transaction();

    for (const definition of batch) {
      const document = documentsById.get(definition.canonicalId);

      if (!document) {
        throw new Error(`Missing seed document ${definition.canonicalId}.`);
      }

      transaction = transaction.createIfNotExists({
        ...document,
        _id: targetId(definition.canonicalId, definition.stage),
      });
    }

    await transaction.commit();
  }

  console.log(`Created ${missing.length} baseline documents.`);
}

await main();
