import type { Locale } from "@/i18n/config";

type LocalizedValue = Readonly<Record<Locale, string>>;

export type TeamMemberSource = Readonly<{
  internalKey: string;
  name: string;
  role: LocalizedValue;
  photo: Readonly<{
    src: string;
    alternativeText: LocalizedValue;
    objectPosition?: string;
  }>;
  biography: LocalizedValue;
  socialUrl?: string;
  order: number;
  active: boolean;
}>;

export type TeamMember = Readonly<{
  internalKey: string;
  name: string;
  role: string;
  photo: Readonly<{
    src: string;
    alternativeText: string;
    objectPosition?: string;
  }>;
  biography: string;
  socialUrl?: string;
}>;

/**
 * Temporary application-owned content matching the editorial fields of the
 * Sanity `coach` document. The adapter below is the only part that needs to be
 * replaced when approved coach documents are fetched from Sanity.
 */
export const teamMemberSource: readonly TeamMemberSource[] = [
  {
    internalKey: "kru-tiger",
    name: "Kru Tiger",
    role: {
      de: "Kru · Trainer",
      en: "Kru · Coach",
    },
    photo: {
      src: "/images/about/main.png",
      alternativeText: {
        de: "Kru Tiger sitzt mit Meisterschaftsgürteln und Medaillen in einem Muay-Thai-Ring in Thailand.",
        en: "Kru Tiger sits with championship belts and medals in a Muay Thai ring in Thailand.",
      },
      objectPosition: "center 38%",
    },
    biography: {
      de: "Platzhaltertext für die Kurzbiografie. Die finalen Angaben zu Erfahrung und Trainingsschwerpunkten werden noch ergänzt.",
      en: "Placeholder text for the short biography. Final information about experience and training focus will be added later.",
    },
    order: 0,
    active: true,
  },
];

export function localizeTeamMembers(
  source: readonly TeamMemberSource[],
  locale: Locale,
): readonly TeamMember[] {
  return source
    .filter((member) => member.active)
    .toSorted(
      (first, second) =>
        first.order - second.order ||
        first.name.localeCompare(second.name) ||
        first.internalKey.localeCompare(second.internalKey),
    )
    .map((member) => ({
      internalKey: member.internalKey,
      name: member.name,
      role: member.role[locale],
      photo: {
        src: member.photo.src,
        alternativeText: member.photo.alternativeText[locale],
        ...(member.photo.objectPosition
          ? { objectPosition: member.photo.objectPosition }
          : {}),
      },
      biography: member.biography[locale],
      ...(member.socialUrl ? { socialUrl: member.socialUrl } : {}),
    }));
}

export function getTeamMembers(locale: Locale): readonly TeamMember[] {
  return localizeTeamMembers(teamMemberSource, locale);
}
