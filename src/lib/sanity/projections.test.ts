import { describe, expect, it } from "vitest";

import type {
  MEMBERSHIP_CARDS_QUERY_RESULT,
  MONTHLY_PASS_CARDS_QUERY_RESULT,
  TRAINING_CLASSES_QUERY_RESULT,
} from "./sanity.types";
import type { SanityImageUrlFactory } from "./images";
import {
  projectMembershipCards,
  projectMonthlyPassCards,
  projectTrainingClasses,
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

const trainingDocuments: TRAINING_CLASSES_QUERY_RESULT = [
  {
    _id: "class-basic",
    audience: localizedText("Für Einsteiger", "For beginners"),
    ctaLabel: localized("Kurs ansehen", "View class"),
    description: richText("Deutsche Beschreibung", "English description"),
    durationMinutes: 60,
    equipment: [
      { _key: "gloves", ...localized("Boxhandschuhe", "Boxing gloves") },
    ],
    image: {
      alternativeText: localizedAlternativeText(
        "Training im Ring",
        "Training in the ring",
      ),
      asset: {
        _ref: "image-928ac96d53b0c9049836c86ff25fd3c009039a16-2000x1200-jpg",
        _type: "reference",
      },
      caption: null,
      crop: null,
      decorative: false,
      hotspot: null,
    },
    internalKey: "muay-thai-basic",
    level: "beginners",
    name: localized("Muay Thai Basic", "Muay Thai Basic"),
    order: 10,
    summary: localizedText("Deutsche Zusammenfassung", "English summary"),
  },
];

describe("Sanity content projections", () => {
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
        _id: "membership-basic-12",
        accessType: "limited",
        benefits: ["muayThai", "yoga"],
        checkoutUrl:
          "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
        durationMonths: 12,
        internalKey: "basic-12",
        monthlyPriceCents: 6_900,
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
          benefits: ["muayThai", "yoga"],
          checkoutUrl:
            "https://backoffice.bsport.io/checkout/6720/subscription/55347?force=true",
          durationMonths: 12,
          id: "basic-12",
          monthlyPrice: 69,
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
        },
      ],
    });
  });
});
