import type { Locale } from "@/i18n/config";

type LocalizedValue = Readonly<Record<Locale, string>>;

export type TrainingLevel =
  "beginners" | "intermediate" | "advanced" | "allLevels";

export type TrainingClassSource = Readonly<{
  internalKey: string;
  name: LocalizedValue;
  summary: LocalizedValue;
  description: LocalizedValue;
  level: TrainingLevel;
  durationMinutes: number;
  audience: LocalizedValue;
  image: Readonly<{
    src: string;
    alternativeText: LocalizedValue;
    objectPosition?: string;
  }>;
  ctaLabel: LocalizedValue;
  order: number;
  active: boolean;
}>;

export type TrainingClass = Readonly<{
  internalKey: string;
  name: string;
  summary: string;
  description: string;
  level: TrainingLevel;
  durationMinutes: number;
  audience: string;
  image: Readonly<{
    src: string;
    alternativeText: string;
    objectPosition?: string;
  }>;
  ctaLabel: string;
}>;

/**
 * Temporary application-owned content matching the editorial fields of the
 * Sanity `classType` document. Live dates, availability, and booking continue
 * to come exclusively from bsport.
 */
export const trainingClassSource: readonly TrainingClassSource[] = [
  {
    internalKey: "muay-thai-basic",
    name: {
      de: "Muay Thai Basic",
      en: "Muay Thai Basic",
    },
    summary: {
      de: "Dein Einstieg ins Muay Thai: klare Grundlagen, ruhiges Tempo und saubere Technik von Anfang an.",
      en: "Your introduction to Muay Thai: clear foundations, a steady pace, and clean technique from the start.",
    },
    description: {
      de: "Du lernst eine stabile Kampfstellung, Deckung und Beinarbeit sowie grundlegende Schläge, Kicks und Knie. Partnerübungen werden Schritt für Schritt aufgebaut, damit du Bewegungen kontrolliert und sicher ausführen kannst.",
      en: "Learn a stable stance, guard, and footwork alongside fundamental punches, kicks, and knees. Partner drills are introduced step by step so you can practise each movement with control and confidence.",
    },
    level: "beginners",
    durationMinutes: 60,
    audience: {
      de: "Für Einsteigerinnen und Einsteiger ohne Vorerfahrung sowie alle, die ihre Grundlagen neu aufbauen möchten.",
      en: "For complete beginners and anyone who wants to rebuild their fundamentals carefully.",
    },
    image: {
      src: "/images/home/main.png",
      alternativeText: {
        de: "Kru Tiger steht mit erhobenem Daumen in einem Muay-Thai-Ring.",
        en: "Kru Tiger gives a thumbs-up while standing in a Muay Thai ring.",
      },
      objectPosition: "center 34%",
    },
    ctaLabel: {
      de: "Basic-Kurse ansehen",
      en: "View Basic classes",
    },
    order: 10,
    active: true,
  },
  {
    internalKey: "muay-thai-intermediate",
    name: {
      de: "Muay Thai Intermediate",
      en: "Muay Thai Intermediate",
    },
    summary: {
      de: "Entwickle sichere Grundlagen zu flüssigen Kombinationen, besserem Timing und kontrollierter Partnerarbeit weiter.",
      en: "Develop sound fundamentals into fluid combinations, sharper timing, and controlled partner work.",
    },
    description: {
      de: "Bekannte Grundtechniken werden zu Kombinationen verbunden und unter wechselnden Bedingungen angewendet. Der Fokus liegt auf Distanz, Timing, Verteidigung, Kontern sowie kontrollierter Arbeit an Pratzen und im Clinch.",
      en: "Connect familiar fundamentals into combinations and apply them under changing conditions. The focus is on distance, timing, defence, counters, and controlled work on pads and in the clinch.",
    },
    level: "intermediate",
    durationMinutes: 60,
    audience: {
      de: "Für Trainierende, die Grundstellung, Beinarbeit und Basistechniken bereits sicher beherrschen.",
      en: "For students who already have a reliable stance, footwork, and command of the basic techniques.",
    },
    image: {
      src: "/images/about/second.png",
      alternativeText: {
        de: "Historischer Zeitungsausschnitt mit zwei Muay-Thai-Kämpfern im Ring.",
        en: "Historic newspaper clipping showing two Muay Thai fighters in the ring.",
      },
      objectPosition: "center 25%",
    },
    ctaLabel: {
      de: "Intermediate-Kurse ansehen",
      en: "View Intermediate classes",
    },
    order: 20,
    active: true,
  },
  {
    internalKey: "muay-thai-advanced",
    name: {
      de: "Muay Thai Advanced",
      en: "Muay Thai Advanced",
    },
    summary: {
      de: "Anspruchsvolles Training für erfahrene Muay-Thai-Sportlerinnen und -Sportler mit stabiler technischer Basis.",
      en: "Demanding training for experienced Muay Thai practitioners with a strong technical base.",
    },
    description: {
      de: "Komplexere Kombinationen, taktische Entscheidungen, Clinch und kontrolliertes Sparring stehen im Mittelpunkt. Du arbeitest daran, auch unter höherem Tempo ruhig zu bleiben, Situationen zu lesen und Technik präzise einzusetzen.",
      en: "Complex combinations, tactical decisions, clinch work, and controlled sparring take centre stage. You practise staying composed at a higher pace, reading situations, and applying technique with precision.",
    },
    level: "advanced",
    durationMinutes: 60,
    audience: {
      de: "Für erfahrene Trainierende mit sicherer Technik und Erfahrung in kontrollierter Partnerarbeit; Teilnahme nach Rücksprache mit dem Trainerteam.",
      en: "For experienced students with sound technique and controlled partner-work experience; join after consulting the coaching team.",
    },
    image: {
      src: "/images/about/fourth.jpg",
      alternativeText: {
        de: "Historische Farbfotografie eines Muay-Thai-Kampfes im Ring.",
        en: "Historic colour photograph of a Muay Thai bout in the ring.",
      },
      objectPosition: "center 36%",
    },
    ctaLabel: {
      de: "Advanced-Kurse ansehen",
      en: "View Advanced classes",
    },
    order: 30,
    active: true,
  },
  {
    internalKey: "muay-thai-all-levels",
    name: {
      de: "Muay Thai All Levels",
      en: "Muay Thai All Levels",
    },
    summary: {
      de: "Gemeinsames Training mit einem klaren Thema und Varianten für unterschiedliche Erfahrungsstufen.",
      en: "Train together around one clear theme, with variations for different levels of experience.",
    },
    description: {
      de: "Alle arbeiten an denselben technischen Prinzipien, während Komplexität und Intensität passend zum eigenen Stand angepasst werden. So trainieren Einsteiger und Erfahrene konzentriert miteinander und lernen als Team.",
      en: "Everyone works on the same technical principles while complexity and intensity are adjusted to individual experience. Beginners and experienced students can train with focus, learn from one another, and grow as a team.",
    },
    level: "allLevels",
    durationMinutes: 60,
    audience: {
      de: "Für alle Erfahrungsstufen, die gemeinsam und respektvoll an Technik und Kondition arbeiten möchten.",
      en: "For every experience level looking to work on technique and conditioning together in a respectful setting.",
    },
    image: {
      src: "/images/about/six.jpg",
      alternativeText: {
        de: "Historisches Gruppenfoto von Kru Tiger mit Kämpfern und Begleitern nach einem Wettkampf.",
        en: "Historic group photograph of Kru Tiger with fighters and companions after a bout.",
      },
      objectPosition: "center 30%",
    },
    ctaLabel: {
      de: "All-Levels-Kurse ansehen",
      en: "View All Levels classes",
    },
    order: 40,
    active: true,
  },
];

export function localizeTrainingClasses(
  source: readonly TrainingClassSource[],
  locale: Locale,
): readonly TrainingClass[] {
  return source
    .filter((trainingClass) => trainingClass.active)
    .toSorted(
      (first, second) =>
        first.order - second.order ||
        first.name[locale].localeCompare(second.name[locale]) ||
        first.internalKey.localeCompare(second.internalKey),
    )
    .map((trainingClass) => ({
      internalKey: trainingClass.internalKey,
      name: trainingClass.name[locale],
      summary: trainingClass.summary[locale],
      description: trainingClass.description[locale],
      level: trainingClass.level,
      durationMinutes: trainingClass.durationMinutes,
      audience: trainingClass.audience[locale],
      image: {
        src: trainingClass.image.src,
        alternativeText: trainingClass.image.alternativeText[locale],
        ...(trainingClass.image.objectPosition
          ? { objectPosition: trainingClass.image.objectPosition }
          : {}),
      },
      ctaLabel: trainingClass.ctaLabel[locale],
    }));
}

export function getTrainingClasses(locale: Locale): readonly TrainingClass[] {
  return localizeTrainingClasses(trainingClassSource, locale);
}
