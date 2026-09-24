import { describe, expect, it } from "vitest";

import type {
  MEMBERSHIP_CARDS_QUERY_RESULT,
  MONTHLY_PASS_CARDS_QUERY_RESULT,
  PRICING_PAGE_QUERY_RESULT,
  TEAM_PAGE_QUERY_RESULT,
  TRAINING_CLASSES_QUERY_RESULT,
  TRAINING_PAGE_QUERY_RESULT,
} from "./sanity.types";
import type { SanityImageUrlFactory } from "./images";
import {
  projectMembershipCards,
  projectMonthlyPassCards,
  projectPricingPage,
  projectTeamPage,
  projectTrainingClasses,
  projectTrainingPage,
} from "./projections";

const imageUrl: SanityImageUrlFactory = (_source, dimensions) =>
  `https://cdn.sanity.io/images/nsznfiun/development/test.jpg?w=${dimensions.width}&h=${dimensions.height}`;

const localized = (de: string, en: string) => ({
  _type: "localizedString" as const,
  de,
  en,
});

const localizedText = (de: string, en: string) => ({
  _type: "localizedText" as const,
  de,
  en,
});

const localizedAlternativeText = (de: string, en: string) => ({
  _type: "localizedAlternativeText" as const,
  de,
  en,
});

const richText = (de: string, en: string) => ({
  _type: "localizedRichText" as const,
  de: [
    {
      _key: "de-block",
      _type: "block" as const,
      children: [
        { _key: "de-span", _type: "span" as const, marks: [], text: de },
      ],
      markDefs: [],
      style: "normal" as const,
    },
  ],
  en: [
    {
      _key: "en-block",
      _type: "block" as const,
      children: [
        { _key: "en-span", _type: "span" as const, marks: [], text: en },
      ],
      markDefs: [],
      style: "normal" as const,
    },
  ],
});

const editorialImage = {
  alternativeText: localizedAlternativeText(
    "Training im Ring",
    "Training in the ring",
  ),
  asset: {
    _ref: "image-928ac96d53b0c9049836c86ff25fd3c009039a16-2000x1200-jpg",
    _type: "reference" as const,
  },
  caption: null,
  crop: null,
  decorative: false,
  hotspot: null,
};

const seo = {
  description: localizedText("Deutsche SEO", "English SEO"),
  shareImage: editorialImage,
  title: localized("Deutscher Titel", "English title"),
};

const trainingDocuments: TRAINING_CLASSES_QUERY_RESULT = [
  {
    _id: "class-basic",
    audience: localizedText("Für Einsteiger", "For beginners"),
    ctaLabel: localized("Kurs ansehen", "View class"),
    description: richText("Deutsche Beschreibung", "English description"),
    durationMinutes: 60,
    image: editorialImage,
    internalKey: "muay-thai-basic",
    level: "beginners",
    name: localized("Muay Thai Basic", "Muay Thai Basic"),
    order: 10,
    summary: localizedText("Deutsche Zusammenfassung", "English summary"),
  },
];

describe("Sanity content projections", () => {
  it("projects page-level Training, Team, and Pricing content", () => {
    const trainingPage: TRAINING_PAGE_QUERY_RESULT = {
      _id: "trainingPage",
      classesHeading: localized("Unsere Kurse", "Our classes"),
      classesIntroduction: localizedText(
        "Deutsche Kurseinführung",
        "English class introduction",
      ),
      heroEyebrow: localized("Training", "Training"),
      heroIntroduction: localizedText(
        "Deutsche Einführung",
        "English introduction",
      ),
      heroTitle: localized("Muay Thai lernen", "Learn Muay Thai"),
      scheduleNotice: localizedText(
        "Aktuelle Zeiten im Kursplan.",
        "Current times are in the schedule.",
      ),
      seo,
    };
    const teamPage: TEAM_PAGE_QUERY_RESULT = {
      _id: "teamPage",
      heroEyebrow: localized("Team", "Team"),
      heroIntroduction: localizedText(
        "Lerne unser Team kennen.",
        "Meet our team.",
      ),
      heroTitle: localized("Unser Team", "Our team"),
      seo,
      teamHeading: localized("Trainerteam", "Coaching team"),
    };
    const pricingPage: PRICING_PAGE_QUERY_RESULT = {
      _id: "pricingPage",
      adultAudienceDescription: localizedText("Erwachsene", "Adults"),
      autoRenewalExplanation: localizedText(
        "Verlängert sich automatisch.",
        "Renews automatically.",
      ),
      billingDay: 3,
      checkoutNotice: localizedText(
        "Abschluss über bSport.",
        "Checkout through bSport.",
      ),
      heroEyebrow: localized("Preise", "Pricing"),
      heroIntroduction: localizedText(
        "Finde dein Angebot.",
        "Find your option.",
      ),
      heroTitle: localized("Mitgliedschaften", "Memberships"),
      joiningFeeCents: 2_900,
      kidAudienceDescription: localizedText("Kinder", "Kids"),
      membershipHeading: localized("Mitgliedschaften", "Memberships"),
      membershipIntroduction: localizedText(
        "Wähle deine Mitgliedschaft.",
        "Choose your membership.",
      ),
      passesHeading: localized("Pässe", "Passes"),
      passesIntroduction: localizedText("Flexible Pässe.", "Flexible passes."),
      seo,
      studentAudienceDescription: localizedText("Studierende", "Students"),
      termsHeading: localized("Konditionen", "Terms"),
      termsVerifiedAt: "2026-09-21T00:00:00.000Z",
    };

    expect(projectTrainingPage(trainingPage, "en", imageUrl)).toMatchObject({
      status: "ready",
      value: { classes: { heading: "Our classes" } },
    });
    expect(projectTeamPage(teamPage, "de", imageUrl)).toMatchObject({
      status: "ready",
      value: { team: { heading: "Trainerteam" } },
    });
    expect(projectPricingPage(pricingPage, "en", imageUrl)).toMatchObject({
      status: "ready",
      value: {
        checkoutNotice: "Checkout through bSport.",
        memberships: {
          terms: { billingDay: 3, joiningFee: 29 },
        },
      },
    });
  });

  it("projects only the requested Training-page language", () => {
    const german = projectTrainingClasses(trainingDocuments, "de", imageUrl);
    const english = projectTrainingClasses(trainingDocuments, "en", imageUrl);

    expect(german).toMatchObject({
      status: "ready",
      value: [
        {
          audience: "Für Einsteiger",
          description: "Deutsche Beschreibung",
          summary: "Deutsche Zusammenfassung",
        },
      ],
    });
    expect(english).toMatchObject({
      status: "ready",
      value: [
        {
          audience: "For beginners",
          description: "English description",
          summary: "English summary",
        },
      ],
    });
    expect(JSON.stringify(english)).not.toContain("Deutsche Beschreibung");
  });

  it("reports a missing translation without substituting German", () => {
    const documents = structuredClone(trainingDocuments);
    documents[0].summary = localizedText("Nur Deutsch", "");

    const projection = projectTrainingClasses(documents, "en", imageUrl);

    expect(projection.status).toBe("missingTranslation");
    if (projection.status === "missingTranslation") {
      expect(projection.issues).toContainEqual(
        expect.objectContaining({
          code: "missingTranslation",
          path: "classTypes[0].summary.en",
        }),
      );
      expect(JSON.stringify(projection)).not.toContain("Nur Deutsch");
    }
  });

  it("reports malformed or unsupported class data", () => {
    const documents = structuredClone(trainingDocuments);
    documents[0].level = "fighters";

    const projection = projectTrainingClasses(documents, "de", imageUrl);

    expect(projection.status).toBe("invalid");
    if (projection.status === "invalid") {
      expect(projection.issues).toContainEqual(
        expect.objectContaining({ path: "classTypes[0].level" }),
      );
    }
  });

  it("maps Sanity membership mirrors into the existing card model", () => {
    const documents: MEMBERSHIP_CARDS_QUERY_RESULT = [
      {
        _id: "membership-basic-24",
        accessType: "limited",
        audience: "adult",
        benefits: ["muayThai", "yoga"],
        checkoutUrl:
          "https://backoffice.bsport.io/checkout/6720/subscription/55692?force=true",
        durationMonths: 24,
        internalKey: "basic-24",
        monthlyPriceCents: 4_900,
        monthlySessions: 4,
        name: localized("Basic", "Basic"),
        order: 10,
        verifiedAt: "2026-09-01T10:00:00Z",
      },
    ];

    expect(projectMembershipCards(documents, "en")).toEqual({
      status: "ready",
      value: [
        {
          audience: "adult",
          benefits: ["muayThai", "yoga"],
          checkoutUrl:
            "https://backoffice.bsport.io/checkout/6720/subscription/55692?force=true",
          durationMonths: 24,
          id: "basic-24",
          monthlyPrice: 49,
          monthlySessions: 4,
          name: "Basic",
        },
      ],
    });
  });

  it("maps Sanity pass mirrors without constructing checkout behavior", () => {
    const documents: MONTHLY_PASS_CARDS_QUERY_RESULT = [
      {
        _id: "pass-unlimited",
        accessType: "unlimited",
        checkoutUrl:
          "https://backoffice.bsport.io/customer/payment/pass/792762/?membership=6720&force=true",
        internalKey: "unlimited-monthly-pass",
        name: localized("Unlimited", "Unlimited"),
        order: 40,
        priceCents: 25_000,
        sessions: null,
        validityMonths: 1,
        verifiedAt: "2026-09-01T10:00:00Z",
      },
    ];

    expect(projectMonthlyPassCards(documents, "de")).toMatchObject({
      status: "ready",
      value: [
        {
          id: "unlimited-monthly-pass",
          price: 250,
          sessions: "unlimited",
          validityMonths: 1,
        },
      ],
    });
  });
});
