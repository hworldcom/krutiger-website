import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getTeamMembers, type TeamMember } from "@/content/team";
import de from "@/i18n/dictionaries/de";
import en from "@/i18n/dictionaries/en";

import { TeamMemberCard } from "./team-member-card";
import { TeamPage } from "./team-page";

describe("TeamPage", () => {
  it("renders one German page heading and approved team content", () => {
    const members = getTeamMembers("de");
    const markup = renderToStaticMarkup(
      <TeamPage
        content={de.routes.coaches}
        contentSource="fallback"
        labels={de.teamPage}
        members={members}
      />,
    );

    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain(de.routes.coaches.title);
    expect(markup).toContain('data-team-member="kru-tiger"');
    expect(markup).toContain(members[0].biography);
    expect(markup).toContain(`alt="${members[0].photo.alternativeText}"`);
    expect(markup).not.toContain('target="_blank"');
  });

  it("renders explicit English copy without leaking the German biography", () => {
    const englishMember = getTeamMembers("en")[0];
    const germanMember = getTeamMembers("de")[0];
    const markup = renderToStaticMarkup(
      <TeamPage
        content={en.routes.coaches}
        contentSource="fallback"
        labels={en.teamPage}
        members={[englishMember]}
      />,
    );

    expect(markup).toContain(en.routes.coaches.title);
    expect(markup).toContain(englishMember.biography);
    expect(markup).toContain(en.teamPage.specialtiesLabel);
    expect(markup).not.toContain(germanMember.biography);
  });
});

describe("TeamMemberCard", () => {
  it("gives an optional external social link a descriptive accessible name", () => {
    const member: TeamMember = {
      ...getTeamMembers("de")[0],
      socialUrl: "https://example.com/kru-tiger",
    };
    const markup = renderToStaticMarkup(
      <TeamMemberCard labels={de.teamPage} member={member} />,
    );

    expect(markup).toContain(
      'aria-label="Social-Media-Profil von Kru Tiger öffnen"',
    );
    expect(markup).toContain('href="https://example.com/kru-tiger"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noreferrer"');
  });
});
