import { describe, expect, it } from "vitest";

import { createKidsPageFallback } from "@/content/page-fallbacks";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { projectKidsPage } from "./projections";
import { resolveContent } from "./resolve-content";
import type { KIDS_PAGE_QUERY_RESULT } from "./sanity.types";

const localized = (de: string, en: string) => ({
  _type: "localizedString" as const,
  de,
  en,
});
const text = (de: string, en: string) => ({
  _type: "localizedText" as const,
  de,
  en,
});
const imageUrl = () =>
  "https://cdn.sanity.io/images/nsznfiun/development/kids.png";

function fixture(): NonNullable<KIDS_PAGE_QUERY_RESULT> {
  const german = de.kidsPage;
  const english = en.kidsPage;
  const image = {
    asset: { _type: "reference" as const, _ref: "image-kids-1402x1122-png" },
    crop: null,
    hotspot: null,
    decorative: false,
    caption: null,
    alternativeText: {
      _type: "localizedAlternativeText" as const,
      de: german.hero.image.alternativeText,
      en: english.hero.image.alternativeText,
    },
  };
  return {
    _id: "kidsPage",
    heroEyebrow: localized(german.hero.eyebrow, english.hero.eyebrow),
    heroTitleLines: german.hero.titleLines.map((line, index) => ({
      _key: String(index),
      ...localized(line, english.hero.titleLines[index]),
    })),
    heroIntroduction: text(german.hero.introduction, english.hero.introduction),
    trialActionLabel: localized(
      german.hero.trialAction,
      english.hero.trialAction,
    ),
    heroImage: image,
    benefitsEyebrow: localized(
      german.benefits.eyebrow,
      english.benefits.eyebrow,
    ),
    benefitsHeading: localized(german.benefits.title, english.benefits.title),
    benefitsIntroduction: text(
      german.benefits.introduction,
      english.benefits.introduction,
    ),
    benefits: german.benefits.items.map((item, index) => ({
      internalKey: item.internalKey,
      title: localized(item.title, english.benefits.items[index].title),
      description: text(
        item.description,
        english.benefits.items[index].description,
      ),
    })),
    classesEyebrow: localized(german.classes.eyebrow, english.classes.eyebrow),
    classesHeading: localized(german.classes.title, english.classes.title),
    classesIntroduction: text(
      german.classes.introduction,
      english.classes.introduction,
    ),
    ageUnit: localized(german.classes.ageUnit, english.classes.ageUnit),
    classes: german.classes.items.map((item, index) => ({
      internalKey: item.internalKey,
      ageRange: item.ageRange,
      name: localized(item.name, english.classes.items[index].name),
      focus: localized(item.focus, english.classes.items[index].focus),
      description: text(
        item.description,
        english.classes.items[index].description,
      ),
    })),
    faqEyebrow: localized(german.faq.eyebrow, english.faq.eyebrow),
    faqHeading: localized(german.faq.title, english.faq.title),
    faqs: german.faq.items.map((item, index) => ({
      internalKey: item.internalKey,
      question: localized(item.question, english.faq.items[index].question),
      answer: text(item.answer, english.faq.items[index].answer),
    })),
    contactPrompt: localized(
      german.faq.contactPrompt,
      english.faq.contactPrompt,
    ),
    contactActionLabel: localized(
      german.faq.contactAction,
      english.faq.contactAction,
    ),
    nextStepsEyebrow: localized(
      german.nextSteps.eyebrow,
      english.nextSteps.eyebrow,
    ),
    nextStepsHeading: localized(
      german.nextSteps.title,
      english.nextSteps.title,
    ),
    scheduleActionLabel: localized(
      german.nextSteps.scheduleAction,
      english.nextSteps.scheduleAction,
    ),
    pricesActionLabel: localized(
      german.nextSteps.pricesAction,
      english.nextSteps.pricesAction,
    ),
    seo: {
      title: localized(de.routes.kids.title, en.routes.kids.title),
      description: text(de.routes.kids.description, en.routes.kids.description),
      shareImage: image,
    },
  };
}

describe("Kids page content projection", () => {
  it.each(["de", "en"] as const)(
    "projects the complete %s content without changing age groups",
    (locale) => {
      const result = projectKidsPage(fixture(), locale, imageUrl);
      expect(result.status).toBe("ready");
      if (result.status !== "ready") throw new Error("Expected localized page");
      expect(result.value.classes.items.map((item) => item.ageRange)).toEqual([
        "6–8",
        "9–12",
        "13+",
      ]);
      expect(result.value.hero.trialAction).toBe(
        (locale === "de" ? de : en).kidsPage.hero.trialAction,
      );
      expect(result.value.hero.image.src).toBe(imageUrl());
    },
  );

  it("falls back to English as a whole when an English FAQ answer is missing", () => {
    const document = fixture();
    if (!document.faqs?.[0].answer) throw new Error("Missing fixture answer");
    document.faqs[0].answer.en = undefined;
    const result = projectKidsPage(document, "en", imageUrl);
    expect(result.status).toBe("missingTranslation");
    const resolved = resolveContent(result, createKidsPageFallback(en));
    expect(resolved.source).toBe("fallback");
    expect(resolved.value.faq.items[0].answer).toBe(
      en.kidsPage.faq.items[0].answer,
    );
    expect(resolved.value.faq.items[0].answer).not.toBe(
      de.kidsPage.faq.items[0].answer,
    );
  });

  it("rejects duplicate or missing age-group keys", () => {
    const document = fixture();
    if (!document.classes) throw new Error("Missing fixture classes");
    document.classes[1] = document.classes[0];
    expect(projectKidsPage(document, "de", imageUrl).status).toBe("invalid");
  });

  it("rejects incomplete hero messages and a missing illustration", () => {
    const document = fixture();
    document.heroTitleLines = document.heroTitleLines?.slice(0, 2) ?? [];
    document.heroImage = null;
    expect(projectKidsPage(document, "en", imageUrl).status).toBe("invalid");
  });
});
