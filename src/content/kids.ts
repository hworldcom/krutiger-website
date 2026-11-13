import type { Locale } from "@/i18n/config";

import type { EditorialImage, SeoContent } from "./editorial";

export const kidsBenefitKeys = [
  "coordination",
  "confidence",
  "discipline",
  "fairness",
] as const;
export type KidsBenefitKey = (typeof kidsBenefitKeys)[number];

export const kidsClassKeys = ["youngerKids", "olderKids", "teens"] as const;
export type KidsClassKey = (typeof kidsClassKeys)[number];

export const kidsIllustrationPath = "/images/kids/kru-tiger-training.png";

export type KidsPageCopy = Readonly<{
  hero: Readonly<{
    eyebrow: string;
    titleLines: readonly [string, string, string];
    introduction: string;
    trialAction: string;
    image: EditorialImage;
  }>;
  benefits: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    items: readonly Readonly<{
      internalKey: KidsBenefitKey;
      title: string;
      description: string;
    }>[];
  }>;
  classes: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    ageUnit: string;
    items: readonly Readonly<{
      internalKey: KidsClassKey;
      ageRange: string;
      name: string;
      focus: string;
      description: string;
    }>[];
  }>;
  faq: Readonly<{
    eyebrow: string;
    title: string;
    items: readonly Readonly<{
      internalKey: string;
      question: string;
      answer: string;
    }>[];
    contactPrompt: string;
    contactAction: string;
  }>;
  nextSteps: Readonly<{
    eyebrow: string;
    title: string;
    scheduleAction: string;
    pricesAction: string;
  }>;
}>;

export type KidsPageEditorialContent = KidsPageCopy &
  Readonly<{ seo: SeoContent }>;

/** Approved DE-v5 / EN-v3 baseline. Dates, availability and checkout remain in bsport. */
export const kidsPageCopy: Readonly<Record<Locale, KidsPageCopy>> = {
  de: {
    hero: {
      eyebrow: "Muay Thai für Kinder & Jugendliche · Berlin",
      titleLines: [
        "Stark werden.",
        "Selbstvertrauen entwickeln.",
        "Respekt lernen.",
      ],
      introduction:
        "Muay Thai ist weit mehr als ein Kampfsport: Es stärkt Kinder und Jugendliche körperlich und mental. Bei KRUTIGER in Berlin trainieren sie ab 6 Jahren in drei Altersgruppen – Vorerfahrung ist nicht nötig.",
      trialAction: "Kostenloses Probetraining buchen",
      image: {
        src: kidsIllustrationPath,
        alternativeText:
          "Illustration: Kru Tiger begleitet zwei Kinder beim spielerischen Muay-Thai-Pratzentraining.",
      },
    },
    benefits: {
      eyebrow: "Für Körper und Kopf",
      title: "Warum Muay Thai?",
      introduction:
        "Wahre Stärke liegt nicht darin, andere zu besiegen, sondern sich selbst zu beherrschen.",
      items: [
        {
          internalKey: "coordination",
          title: "Koordination & Fitness",
          description:
            "Koordination, Kraft, Ausdauer und Konzentration fördern und den eigenen Körper bewusst wahrnehmen.",
        },
        {
          internalKey: "confidence",
          title: "Mut & Selbstvertrauen",
          description:
            "An sich selbst glauben, Herausforderungen annehmen und eigene Grenzen erkennen – Schritt für Schritt.",
        },
        {
          internalKey: "discipline",
          title: "Disziplin & Selbstkontrolle",
          description:
            "Konzentriert arbeiten, sich selbst beherrschen und Verantwortung für das eigene Handeln übernehmen.",
        },
        {
          internalKey: "fairness",
          title: "Respekt & Fairness",
          description:
            "Respektvoll miteinander umgehen, fair trainieren und sich gegenseitig unterstützen.",
        },
      ],
    },
    classes: {
      eyebrow: "Unsere Kurse",
      title: "Die passende Altersgruppe.",
      introduction:
        "Vom spielerischen Einstieg bis zur technischen Anwendung: Jede Gruppe hat ihren eigenen Schwerpunkt – und dein Kind kann in allen Gruppen ohne Vorerfahrung einsteigen.",
      ageUnit: "Jahre",
      items: [
        {
          internalKey: "youngerKids",
          ageRange: "6–8",
          name: "Muay Thai Kids",
          focus: "Spielerischer Einstieg",
          description:
            "Mit altersgerechten Spielen, Bewegungsübungen und ersten Muay-Thai-Techniken lernen die Kinder, ihren Körper bewusst wahrzunehmen und sich sicher zu bewegen. Dabei vermitteln wir Respekt, Fairness und Aufmerksamkeit.",
        },
        {
          internalKey: "olderKids",
          ageRange: "9–12",
          name: "Muay Thai Kids",
          focus: "Grundlagen & Partnerübungen",
          description:
            "Die Kinder lernen Schlag-, Tritt-, Knie- und Blocktechniken, Beinarbeit, Kondition und Reaktion. Erste Partnerübungen vermitteln Distanz und Timing – altersgerecht und mit klaren Regeln. Dazu gehört, konzentriert zu arbeiten und Verantwortung zu übernehmen.",
        },
        {
          internalKey: "teens",
          ageRange: "13+",
          name: "Muay Thai Teens",
          focus: "Technik & Entwicklung",
          description:
            "Auch ohne Vorerfahrung lernen die Jugendlichen Schritt für Schritt Schlag-, Tritt-, Knie- und Ellenbogentechniken, Defensive, Beinarbeit und Pratzenarbeit. Je nach Trainingsstand kommen kontrollierte Sparringsformen dazu. Im Fokus: Kraft, Ausdauer, Disziplin und Selbstkontrolle.",
        },
      ],
    },
    faq: {
      eyebrow: "Vor dem ersten Besuch",
      title: "Gut zu wissen.",
      items: [
        {
          internalKey: "beginners",
          question: "Braucht mein Kind Vorerfahrung?",
          answer:
            "Nein. Alle Kurse sind für Einsteiger geeignet – auch der Teens-Kurs. Die Grundlagen des Muay Thai werden Schritt für Schritt vermittelt, die Übungen richten sich nach Alter und Trainingsstand.",
        },
        {
          internalKey: "equipment",
          question: "Welche Ausrüstung braucht mein Kind?",
          answer:
            "Für den Kurs von 6–8 Jahren werden Boxhandschuhe benötigt. Zum Probetraining stehen in dieser Gruppe Leihhandschuhe zur Verfügung. Zur Ausrüstung für die anderen Gruppen kannst du unser Team fragen.",
        },
        {
          internalKey: "ageGroups",
          question: "Welche Gruppe passt zu meinem Kind?",
          answer:
            "Die Gruppen richten sich nach dem Alter: 6–8 Jahre, 9–12 Jahre und ab 13 Jahren. Bei der Wahl der Gruppe hilft dir unser Team.",
        },
      ],
      contactPrompt: "Bist du noch unsicher?",
      contactAction: "Unser Team beantwortet gerne deine Fragen.",
    },
    nextSteps: {
      eyebrow: "Der nächste Schritt",
      title: "Bereit fürs erste Training?",
      scheduleAction: "Kursplan ansehen",
      pricesAction: "Kids-Mitgliedschaften",
    },
  },
  en: {
    hero: {
      eyebrow: "Muay Thai for kids & teens · Berlin",
      titleLines: ["Get strong.", "Build confidence.", "Learn respect."],
      introduction:
        "Muay Thai is much more than a combat sport: it builds physical and mental strength in kids and teens. At KRUTIGER in Berlin, they train in three age groups from age 6 – no prior training needed.",
      trialAction: "Book your free trial class",
      image: {
        src: kidsIllustrationPath,
        alternativeText:
          "Illustration: Kru Tiger guides two children through playful Muay Thai pad training.",
      },
    },
    benefits: {
      eyebrow: "For body and mind",
      title: "Why Muay Thai?",
      introduction:
        "True strength is not about beating others – it is about mastering yourself.",
      items: [
        {
          internalKey: "coordination",
          title: "Coordination & fitness",
          description:
            "Building coordination, strength, stamina and focus while becoming more aware of their own body.",
        },
        {
          internalKey: "confidence",
          title: "Courage & confidence",
          description:
            "Believing in themselves, taking on challenges and recognising their own limits – step by step.",
        },
        {
          internalKey: "discipline",
          title: "Discipline & self-control",
          description:
            "Working with focus, staying in control and taking responsibility for their own actions.",
        },
        {
          internalKey: "fairness",
          title: "Respect & fairness",
          description:
            "Treating each other with respect, training fairly and supporting one another.",
        },
      ],
    },
    classes: {
      eyebrow: "Our classes",
      title: "The right age group.",
      introduction:
        "From a playful start to applying skills with a partner: each group has its own focus – and every group is open to beginners.",
      ageUnit: "years",
      items: [
        {
          internalKey: "youngerKids",
          ageRange: "6–8",
          name: "Muay Thai Kids",
          focus: "Playful first steps",
          description:
            "Through age-appropriate games, movement drills and first Muay Thai moves, kids learn to be aware of their body and move with confidence. Along the way, we teach respect, fairness and attentiveness.",
        },
        {
          internalKey: "olderKids",
          ageRange: "9–12",
          name: "Muay Thai Kids",
          focus: "Basics & partner drills",
          description:
            "Kids learn punches, kicks, knees and blocks, footwork, fitness and reactions. First partner drills build a feel for distance and timing – age-appropriate and with clear rules. They also learn to work with focus and take responsibility.",
        },
        {
          internalKey: "teens",
          ageRange: "13+",
          name: "Muay Thai Teens",
          focus: "Skills & development",
          description:
            "Even without prior training, teens learn step by step: punches, kicks, knees and elbows, defence, footwork and pad work. Depending on their level, controlled sparring can be added. The focus: strength, stamina, discipline and self-control.",
        },
      ],
    },
    faq: {
      eyebrow: "Before your first visit",
      title: "Good to know.",
      items: [
        {
          internalKey: "beginners",
          question: "Is it suitable for beginners?",
          answer:
            "Yes. All classes are open to beginners – including the teens class. The basics of Muay Thai are taught step by step, and training is adapted to age and level.",
        },
        {
          internalKey: "equipment",
          question: "What gear does a child need?",
          answer:
            "For the 6–8 age group, boxing gloves are needed. Loaner gloves are available in this group for the trial session. For the other groups, the team will be happy to advise you on gear.",
        },
        {
          internalKey: "ageGroups",
          question: "Which group is the right one?",
          answer:
            "The groups are based on age: 6–8 years, 9–12 years and 13 years and up. The team will be happy to help you choose.",
        },
      ],
      contactPrompt: "Still unsure?",
      contactAction: "The KRUTIGER team is happy to help.",
    },
    nextSteps: {
      eyebrow: "Get started",
      title: "Ready for your first class?",
      scheduleAction: "Kids schedule",
      pricesAction: "Kids pricing",
    },
  },
};
