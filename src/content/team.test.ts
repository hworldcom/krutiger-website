import { describe, expect, it } from "vitest";

import {
  getTeamMembers,
  localizeTeamMembers,
  type TeamMemberSource,
} from "./team";

function createSourceMember(
  overrides: Partial<TeamMemberSource>,
): TeamMemberSource {
  return {
    internalKey: "member",
    name: "Member",
    role: { de: "Trainer", en: "Coach" },
    photo: {
      src: "/member.jpg",
      alternativeText: {
        de: "Mitglied im Training.",
        en: "Member during training.",
      },
    },
    biography: {
      de: "Deutsche Biografie.",
      en: "English biography.",
    },
    order: 0,
    active: true,
    ...overrides,
  };
}

describe("team content adapter", () => {
  it("orders active members deterministically and omits inactive members", () => {
    const source = [
      createSourceMember({
        internalKey: "second",
        name: "Zulu",
        order: 2,
      }),
      createSourceMember({
        active: false,
        internalKey: "hidden",
        name: "Hidden",
        order: 0,
      }),
      createSourceMember({
        internalKey: "tie-b",
        name: "Beta",
        order: 1,
      }),
      createSourceMember({
        internalKey: "tie-a",
        name: "Alpha",
        order: 1,
      }),
    ] as const;

    expect(
      localizeTeamMembers(source, "de").map(({ internalKey }) => internalKey),
    ).toEqual(["tie-a", "tie-b", "second"]);
    expect(source.map(({ internalKey }) => internalKey)).toEqual([
      "second",
      "hidden",
      "tie-b",
      "tie-a",
    ]);
  });

  it("selects explicit values for each language without fallback", () => {
    const germanMember = getTeamMembers("de")[0];
    const englishMember = getTeamMembers("en")[0];

    expect(germanMember.role).toBe("Kru · Trainer");
    expect(englishMember.role).toBe("Kru · Coach");
    expect(englishMember.biography).not.toBe(germanMember.biography);
    expect(englishMember.photo.alternativeText).not.toBe(
      germanMember.photo.alternativeText,
    );
  });
});
