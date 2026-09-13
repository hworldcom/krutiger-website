import type { TeamMember } from "@/content/team";
import type { TeamPageCopy } from "@/i18n/dictionaries/types";

import { Container } from "../ui";
import { TeamMemberCard } from "./team-member-card";

type TeamPageProps = Readonly<{
  content: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
  }>;
  labels: TeamPageCopy;
  members: readonly TeamMember[];
}>;

export function TeamPage({ content, labels, members }: TeamPageProps) {
  return (
    <div className="overflow-hidden bg-canvas text-copy">
      <section
        aria-labelledby="team-page-title"
        className="relative isolate overflow-hidden border-b border-brand/30 pb-20 pt-36 sm:pb-24 sm:pt-44"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_36%,rgba(249,105,0,0.18),transparent_24%),radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.06),transparent_28%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-10 bottom-[-0.2em] -z-10 font-display text-[clamp(9rem,31vw,30rem)] leading-[0.68] font-extrabold tracking-[-0.06em] text-copy/[0.025] uppercase"
        >
          Team
        </div>

        <Container>
          <header className="max-w-4xl">
            <p className="font-display text-sm font-bold tracking-[0.24em] text-brand uppercase sm:text-base">
              {content.eyebrow}
            </p>
            <h1
              className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
              id="team-page-title"
            >
              {content.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-copy-muted sm:text-lg sm:leading-8">
              {content.description}
            </p>
          </header>
        </Container>
      </section>

      <section
        aria-labelledby="team-members-title"
        className="bg-panel/30 py-16 sm:py-24"
      >
        <Container>
          <h2
            className="font-display text-4xl leading-none font-extrabold tracking-tight uppercase sm:text-5xl"
            id="team-members-title"
          >
            {labels.sectionHeading}
          </h2>

          <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),22rem))] justify-center gap-8 lg:justify-start">
            {members.map((member) => (
              <TeamMemberCard
                key={member.internalKey}
                labels={labels}
                member={member}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
