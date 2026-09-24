import Image from "next/image";

import type { TeamMember } from "@/content/team";
import type { TeamPageCopy } from "@/i18n/dictionaries/types";

type TeamMemberCardProps = Readonly<{
  labels: Pick<TeamPageCopy, "socialLinkAction" | "socialLinkLabel">;
  member: TeamMember;
}>;

function getSocialLinkLabel(template: string, name: string) {
  return template.replace("{name}", name);
}

export function TeamMemberCard({ labels, member }: TeamMemberCardProps) {
  const headingId = `team-member-${member.internalKey}`;

  return (
    <article
      aria-labelledby={headingId}
      className="group overflow-hidden rounded-card border border-line bg-panel shadow-card"
      data-team-member={member.internalKey}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-panel-raised">
        <Image
          alt={member.photo.alternativeText}
          className="object-cover grayscale-[.12] contrast-[1.05] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.025]"
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
          src={member.photo.src}
          style={{ objectPosition: member.photo.objectPosition }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel via-panel/45 to-transparent"
        />
      </div>

      <div className="relative -mt-24 px-6 pb-7 sm:px-7 sm:pb-8">
        <p className="font-display text-sm font-bold tracking-[0.18em] text-brand uppercase">
          {member.role}
        </p>
        <h3
          className="mt-2 font-display text-4xl leading-none font-extrabold tracking-tight uppercase"
          id={headingId}
        >
          {member.name}
        </h3>
        <p className="mt-5 text-base leading-7 text-copy-muted">
          {member.biography}
        </p>

        {member.socialUrl ? (
          <a
            aria-label={getSocialLinkLabel(labels.socialLinkLabel, member.name)}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-display text-base font-bold tracking-[0.08em] text-brand uppercase underline-offset-4 hover:text-brand-hover hover:underline"
            href={member.socialUrl}
            rel="noreferrer"
            target="_blank"
          >
            {labels.socialLinkAction}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
